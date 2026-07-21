# Vercel Build Failure Investigation Report

## Error
`EMAXCONNSESSION` during "Collecting page data" — the 15-session Postgres pool limit is exceeded.

## Root Cause (Summary)

During static generation, Next.js renders multiple pages concurrently. Every page embeds `<Header>` and `<Footer>` server components, each making independent database calls. The `react/cache()` wrapper in every fetch function only deduplicates within a single render scope — it provides **zero cross-page deduplication**. With dozens of concurrent page renders, the connection demand vastly exceeds the configured pool size.

---

## 1. Pool Configuration

**File**: `payload.config.ts:66-76`

```ts
pool: {
  max: 3,
  min: 0,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 10000,
}
```

The Postgres adapter creates exactly **one `pg.Pool`** instance (`node_modules/@payloadcms/db-postgres/dist/connect.js:44-45`). All Payload queries share this pool. The `max: 3` in your config is the app-level pool limit, but the **Vercel Postgres database itself** has a `pool_size: 15` limit (the EMAXCONNSESSION error comes from the database server, not your local pool). Your local pool of 3 means at most 3 of your own connections are active, but Payload's internal query patterns may open additional connections beyond what `max: 3` suggests.

**Key detail from `node_modules/@payloadcms/drizzle/dist/find/findMany.js:125-131`**: Every `payload.find()` call with pagination enabled (the default) executes **two** SQL statements — a SELECT and a COUNT query — in sequence but both borrowing a pool connection.

---

## 2. The `react/cache()` Illusion

Every data-fetching function wraps itself in `cache()` from `react`:

- `lib/fetch/jobs.ts:5` — `getJobs`
- `lib/fetch/jobs.ts:44` — `getJobById`
- `lib/fetch/products.ts:42` — `getProducts`
- `lib/fetch/products.ts:72` — `getProductBySlug`
- `lib/fetch/products.ts:156` — `getCategories`
- `lib/fetch/homepage.ts:11` — `getHomepage`
- `lib/fetch/contact-info.ts:4` — `getContactInfo`
- `lib/fetch/site-settings.ts:4` — `getSiteSettings`

**Why this fails**: React's `cache()` deduplicates only within a single React render pass. During `next build`, each statically generated page is an independent render. When 10 pages render concurrently and each calls `getProducts("en")`, that is 10 independent invocations — `cache()` does not share results across them.

---

## 3. Pages Contributing to the Problem

### 3a. Pages with `generateStaticParams` (static param collection)

| Page | Params generated | DB calls during param collection |
|------|-----------------|----------------------------------|
| `/[lang]` (home) | 3 (en/fa/ar) | None |
| `/[lang]/products` | 3 | None |
| `/[lang]/products/[slug]` | (products + categories) × 3 langs | `payload.find(products)` + `payload.find(categories)` via `Promise.all` — **4 SQL queries** (find + count each) |
| `/[lang]/careers` | 3 | None |
| `/[lang]/careers/[id]` | jobs × 3 langs | `getJobs()` × 3 — **6 SQL queries** |
| `/[lang]/careers/[id]/apply` | jobs × 3 langs | `getJobs()` × 3 — **6 SQL queries** (same jobs as above, **duplicated**) |
| `/[lang]/faq` | 3 | None |
| `/[lang]/contact` | 3 | None |
| `/[lang]/about` | 3 | None |
| `/[lang]/blog` | 3 | None |

### 3b. Per-page database calls during HTML rendering

For each statically generated page, the render function runs, and it embeds `<Header>` and `<Footer>`:

| Component | Function called | Payload call |
|-----------|----------------|--------------|
| `components/layout/header/index.tsx:12` | `getProducts(lang)` | `payload.find(products, limit: 100, locale: 'all')` → 2 SQL |
| `components/layout/footer.tsx:34-37` | `getProducts(lang)` + `getContactInfo(lang)` | `Promise.all` → 3 SQL (find+count for products, findGlobal for contact) |

These run on **every single page**. The header and footer queries alone account for 3-5 SQL connections per page render.

### 3c. Page-specific database calls

| Page | Additional DB calls beyond header/footer |
|------|------------------------------------------|
| `/[lang]` | `getHomepage()` + `getContactInfo()` + `getSiteSettings()` = 3 more queries |
| `/[lang]/products` | `getProducts(lang)` via `Suspense` boundary = 2 more queries |
| `/[lang]/products/[slug]` | `getProductBySlug()` + `getCategories()` + `getRelatedProducts()` = 6 more queries |
| `/[lang]/careers/[id]` | `getJobById()` = 2 more queries |
| `/[lang]/careers/[id]/apply` | `getJobById()` = 2 more queries |
| `/[lang]/faq` | `getFAQs()` = 2 more queries |
| `/[lang]/contact` | `getContactInfo()` = 1 more query (possibly + `getProductBySlug` if product param present) |
| `/[lang]/about` | Unknown (not inspected in detail) |
| `/[lang]/blog` | Unknown (not inspected in detail) |
| `sitemap.ts` | `getProducts("en")` + `getJobs("en")` = 4 queries |

---

## 4. `app/api/careers/route.ts` — Does NOT Execute During Build

This file exports a `POST` handler only (line 74). It has `runtime = "nodejs"` (line 8). Next.js does **not** invoke API route handlers during static generation — they are serverless functions, not pages. The `getJobs("en")` on line 102 runs only when a real POST request arrives. **This file is irrelevant to the build failure.**

---

## 5. Duplicate Queries Across Pages

### Duplicate 1: Products fetched repeatedly
`getProducts("en")` is called by:
- Header component (on every page render)
- Footer component (on every page render)
- Products page body
- Products page `ProductGridLoader`
- Products `[slug]` page `generateStaticParams`
- Sitemap

During build, if 20 pages render concurrently and each invokes header + footer, that is **40+ independent calls** to `getProducts("en")`.

### Duplicate 2: Jobs fetched twice for same data
`getJobs(lang)` is called by:
- `careers/[id]/page.tsx` `generateStaticParams`
- `careers/[id]/apply/page.tsx` `generateStaticParams`

Both iterate all 3 languages, fetching the same job list each time. This is 6 queries that could be 3 (or even 1 if shared).

### Duplicate 3: `getJobById` called twice per page
On `/[lang]/careers/[id]/page.tsx`, `getJobById` is called once in `generateMetadata` (line 36) and once in the page component (line 66). Same for the `/apply` variant. These are separate render passes, so `cache()` does not help.

---

## 6. All Parallel Query Points

| Location | Pattern | Connections needed |
|----------|---------|-------------------|
| `products/[slug]/page.tsx:45` | `Promise.all([products, categories])` | 2 concurrent |
| `lib/fetch/navigation.ts:22` | `Promise.all([navigation, categories])` | 2 concurrent |
| `components/layout/footer.tsx:34` | `Promise.all([getProducts, getContactInfo])` | 2 concurrent |
| `app/sitemap.ts:14` | `Promise.all([getProducts, getJobs])` | 2 concurrent |
| `app/[lang]/page.tsx:61` | `Promise.all([homepage, contactInfo, siteSettings])` | 3 concurrent |
| `app/[lang]/contact/page.tsx:55` | `Promise.all([getProductBySlug, getContactInfo])` | 2 concurrent |

---

## 7. Estimated Peak Connection Demand

**Worst case during concurrent page rendering:**

Next.js's "Collecting page data" phase renders pages in batches. With 3 locales and ~10 route patterns plus dynamic variants:

- If 8 pages render concurrently
- Each page: header (2 SQL) + footer (3 SQL) + page body (2-6 SQL)
- Minimum per page: 7 SQL queries
- Peak concurrent demand: 8 × 7 = **56 SQL queries in flight**
- Even with a local pool of 3, each query takes 50-200ms
- Connections are borrowed and released rapidly, but bursts of parallel `Promise.all` calls can exhaust the **server-side 15-session limit** momentarily

The Vercel Postgres `pool_size: 15` is a **server-side** connection limit. With your local pool at `max: 3`, you'd think only 3 connections are used — but Payload's drizzle layer may open connections beyond the configured pool if requests queue up and the pool creates temporary connections, or if multiple serverless invocations (warm containers) each hold their own pool.

---

## 8. Payload Query Caching

**There is no application-level query caching.** The `cache()` from React only deduplicates within one render pass. Payload itself does not cache query results — each `payload.find()` issues fresh SQL.

The only "caching" is the singleton `getPayloadClient()` in `lib/payload.ts:24` which avoids reinitializing Payload, but this does not cache query results.

---

## 9. Single vs. Multiple Pool Instances

**Confirmed: ONE pool instance.** The singleton pattern at `lib/payload.ts:4,24-29` ensures `getPayloadClient()` returns the same Payload instance (and thus the same pool) across the Node.js process. However, on Vercel, if multiple serverless functions or build workers run in separate processes, **each gets its own pool** — meaning the 15-connection limit is shared across all of them.

---

## 10. Why the 15-Session Limit Is Exceeded

The `EMAXCONNSESSION` error originates from the Postgres server, not your application pool. Contributing factors ranked by confidence:

| Rank | Factor | Confidence |
|------|--------|------------|
| 1 | **Concurrent page renders during build** — multiple pages render in parallel, each embedding header + footer which both query the DB independently | 95% |
| 2 | **`react/cache()` provides no cross-page deduplication** — same data fetched N times for N concurrent renders | 90% |
| 3 | **Header + Footer embed DB queries on every page** — this is the single largest multiplier, adding 5+ queries per page render | 90% |
| 4 | **Duplicate query patterns** — jobs fetched twice for same data in careers pages; getJobById called twice per page | 75% |
| 5 | **`payload.find()` runs 2 SQL per call** (find + count) due to pagination being enabled by default | 70% |
| 6 | **Multiple Vercel build workers** — if the build spawns multiple Node.js processes, each opens its own pool, all sharing the 15-session server limit | 65% |
| 7 | **Drafts enabled on 5 collections** adds version table joins, increasing query complexity and connection hold time | 50% |

---

## 11. Recommended Fix

**Primary fix — Remove DB queries from Header and Footer:**

The header (`components/layout/header/index.tsx:12`) and footer (`components/layout/footer.tsx:34-37`) make database calls on **every page render**. These are layout-level components shared across all pages. During build, this multiplies connection demand by the total number of pages.

**Option A (recommended): Move product/contact data to props from parent layouts, or use a lightweight JSON cache.** Fetch the data once at the start of the build, write it to a JSON file or in-memory store, and have Header/Footer read from that instead of querying the database.

**Option B: Make Header and Footer client components.** Fetch product navigation data via a client-side API call (or static JSON) instead of server-side Payload queries. This eliminates all header/footer DB connections during build.

**Option C: Use `generateStaticParams` with a shared data fetch.** Create a single shared module that fetches all needed data once and caches it for the entire build process using a module-level variable (not React `cache`, which is per-request).

**Secondary fixes (apply after primary):**
1. Deduplicate `getJobs()` calls between `careers/[id]/page.tsx` and `careers/[id]/apply/page.tsx` — share the param generation.
2. Deduplicate `getJobById()` within each page — call once and pass the result to both `generateMetadata` and the page body.
3. Set `pagination: false` on `payload.find()` calls where total count is not needed (e.g., `getJobs`, `getProducts` when only `.docs` is used).
4. Consider increasing `max` in the pool config to 6-8 to better absorb concurrent bursts, though this alone won't solve the problem without the structural fixes above.
