# Faradid Atlas Headless CMS Migration Design

**Date:** 2026-07-06
**Status:** Approved
**Author:** MiMo Code Agent

## [S1] Overall Architecture

**Full Integration Approach:**
- Payload CMS integrated as `/admin` route in the same Next.js project
- Single deployment on Vercel with custom domain `faradidatlas.com`
- Frontend remains unchanged visually/functionally
- Admin panel accessible at `faradidatlas.com/admin`

**Key Components:**
1. **Payload CMS Collections:**
   - `Homepage` (Global) - Hero slides, value props, brand showcase, signature products, global markets, CTA
   - `Products` - Multilingual product data with specs, images, categories
   - `Categories` - Product categories with descriptions
   - `BlogPosts` - Articles with authors, tags, content
   - `FAQs` - Questions/answers by category
   - `Jobs` - Career listings with responsibilities, requirements
   - `CompanyInfo` (Global) - About content, CEO profile, team, offices
   - `ContactInfo` (Global) - Email, phones, addresses
   - `Navigation` (Global) - Main menu, footer menu
   - `SiteSettings` (Global) - Site name, logo, description
   - `Redirects` (Global) - URL redirects (301/302)
   - `Translations` (Global) - UI strings only
   - `Media` - Images/files with Cloudinary storage

2. **Data Flow:**
   - Frontend fetches via Payload Local API (preferred) or REST API
   - ISR with 60-second revalidation + webhooks for instant updates
   - Cloudinary for image optimization/CDN

3. **Admin Organization:**
   - Grouped by page/section (Homepage, Products, Blog, FAQ, Careers, Contact, Company, Settings, Media)
   - Clean, intuitive interface for non-technical users

## [S2] Data Model & Collections

**Payload Collections:**

1. **Homepage (Global)**
   - Hero slides (array): image, title, subtitle, description (localized)
   - Value propositions (array): icon, title, description (localized)
   - Brand showcase (array): brand name, logo, description
   - Signature products (array): product references
   - Global markets (array): country, description (localized)
   - CTA section: headline, description, button text (localized)

2. **Products**
   - Basic fields: slug, category (relationship), brand (relationship), type
   - Multilingual (using Payload localization): name, description, alias
   - Specs (array): label, value (localized)
   - Images: featured image, gallery (Cloudinary)
   - SEO: title, description, ogImage (per document)
   - Status: draft/published, scheduled publish date

3. **Categories**
   - Slug, name, description (localized)
   - SEO fields per category

4. **BlogPosts**
   - Title, slug, content (rich text)
   - Author (relationship), tags (array)
   - Featured image, excerpt
   - SEO fields per post
   - Draft mode, scheduled publishing

5. **FAQs**
   - Question, answer (localized)
   - Category (company, products, sourcing, quality, etc.)

6. **Jobs**
   - Title, department, location (localized)
   - Type (full-time/part-time/contract)
   - Description, responsibilities, requirements, benefits (localized)

7. **CompanyInfo (Global)**
   - About content, CEO profile, team members
   - Office locations, values, mission/vision

8. **ContactInfo (Global)**
   - Email, phone numbers, office addresses
   - Response SLA text

9. **Navigation (Global)**
   - Main menu items (array): label, url, children
   - Footer menu items

10. **SiteSettings (Global)**
    - Site name, logo, description
    - Social links, legal info

11. **Redirects (Global)**
    - From path, to path, type (301/302)

12. **Translations (Global)**
    - UI strings only: nav labels, button text, error messages

13. **Media**
    - Cloudinary storage
    - Alt text (localized)

**Key Design Decisions:**
- Use Payload's built-in localization for multilingual content
- SEO fields stored per document (not global)
- Translations global only for UI strings
- Draft mode + live previews + scheduled publishing enabled

## [S3] Admin Panel Organization

**Dashboard Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  Faradid Atlas CMS                                          │
├─────────────────────────────────────────────────────────────┤
│  📊 Dashboard Overview                                      │
│  - Recent edits, draft count, scheduled posts               │
│  - Quick actions: New Product, New Post, New FAQ            │
├─────────────────────────────────────────────────────────────┤
│  🏠 Homepage                                                │
│  - Hero Slides                                              │
│  - Value Propositions                                       │
│  - Brand Showcase                                           │
│  - Signature Products                                       │
│  - Global Markets                                           │
│  - CTA Section                                              │
├─────────────────────────────────────────────────────────────┤
│  📦 Products                                                │
│  - All Products (table view with filters)                   │
│  - Categories                                               │
│  - Product Brands                                           │
│  - Product Types                                            │
├─────────────────────────────────────────────────────────────┤
│  📝 Content                                                 │
│  - Blog Posts                                               │
│  - FAQ Items                                                │
│  - Careers/Jobs                                             │
├─────────────────────────────────────────────────────────────┤
│  🏢 Company                                                 │
│  - About Content                                            │
│  - Team Members                                             │
│  - Office Locations                                         │
├─────────────────────────────────────────────────────────────┤
│  📞 Contact                                                 │
│  - Contact Information                                      │
│  - Response SLA                                             │
├─────────────────────────────────────────────────────────────┤
│  ⚙️ Settings                                                │
│  - Site Settings (name, logo, description)                  │
│  - Navigation (menus)                                       │
│  - SEO Defaults                                             │
│  - Redirects                                                │
│  - Translations (UI strings)                                │
├─────────────────────────────────────────────────────────────┤
│  🖼️ Media                                                   │
│  - Image Library (Cloudinary)                               │
│  - Upload new media                                         │
└─────────────────────────────────────────────────────────────┘
```

**Key UX Features:**
- Language switcher in admin header (EN/FA/AR)
- Draft mode toggle per document
- Live preview panel
- Scheduled publishing calendar
- Bulk operations (publish, unpublish, delete)
- Search and filters across all collections
- Drag-and-drop reorder for homepage sections

## [S4] Data Fetching & Caching

**Data Fetching Strategy:**

1. **Payload Local API** (primary):
   - Direct function calls from server components
   - Best performance, full type safety
   - Used for all page data fetching

2. **ISR (Incremental Static Regeneration)**:
   - Static generation at build time
   - Revalidation: 60 seconds for most content
   - Webhooks for instant revalidation on content changes

3. **Webhook Integration**:
   - Payload sends webhooks on content changes
   - Vercel ISR revalidates specific paths
   - Instant updates without waiting for cache expiry

**Implementation Pattern:**

```typescript
// Example: Fetching products
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getProducts(locale: string) {
  const payload = await getPayload({ config })
  
  const products = await payload.find({
    collection: 'products',
    locale,
    limit: 100,
  })
  
  return products.docs
}

// ISR with revalidation
export const revalidate = 60 // seconds
```

**Webhook Handler:**

```typescript
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  const { collection, doc } = await req.json()
  
  // Revalidate specific paths based on collection
  if (collection === 'products') {
    revalidatePath(`/products`)
    revalidatePath(`/products/${doc.slug}`)
  }
  
  return Response.json({ revalidated: true })
}
```

**Caching Layers:**
1. **Browser cache**: Standard HTTP caching headers
2. **Vercel Edge cache**: CDN-level caching
3. **Next.js Data Cache**: ISR revalidation
4. **Payload cache**: Database query caching

## [S5] Migration Strategy

**Automated Migration Script:**

1. **Data Extraction:**
   - Parse existing TypeScript data files (product-data.ts, job-data.ts, faq-data.ts)
   - Extract translation strings from i18n JSON files
   - Extract SEO metadata from page components
   - Extract company info from various components

2. **Payload Import:**
   - Create collections in Payload admin
   - Import data via Payload Local API
   - Handle relationships (products → categories, jobs → departments)
   - Upload images to Cloudinary

3. **Migration Steps:**

```bash
# Step 1: Set up Payload collections
npm run payload generate:types

# Step 2: Run migration script
npm run migrate:import

# Step 3: Verify data in admin panel
# Step 4: Update frontend to use Payload data
# Step 5: Visual regression testing
```

**Migration Script Structure:**

```typescript
// scripts/migrate.ts
import { getPayload } from 'payload'
import config from '@payload-config'

async function migrate() {
  const payload = await getPayload({ config })
  
  // 1. Import categories
  await importCategories(payload)
  
  // 2. Import products
  await importProducts(payload)
  
  // 3. Import FAQs
  await importFAQs(payload)
  
  // 4. Import jobs
  await importJobs(payload)
  
  // 5. Import translations
  await importTranslations(payload)
  
  // 6. Import SEO metadata
  await importSEO(payload)
}

async function importProducts(payload: any) {
  // Read from components/products/product-data.ts
  // Transform to Payload format
  // Upload images to Cloudinary
  // Create products via payload.create()
}
```

**Verification:**
- Automated comparison of old vs new data
- Visual regression testing (before/after screenshots)
- SEO metadata verification
- Multilingual content verification

## [S6] SEO Preservation & Performance

**SEO Preservation Strategy:**

1. **Metadata Migration:**
   - Extract existing SEO from page components
   - Store per-document in Payload (title, description, ogImage)
   - Maintain localized alternates (en, fa, ar)
   - Preserve canonical URLs

2. **Structured Data:**
   - Keep existing JSON-LD schemas (Organization, BreadcrumbList, FAQPage, etc.)
   - Generate from Payload data at build time
   - Maintain same structure for Google

3. **Sitemaps:**
   - Auto-generate from Payload collections
   - Include all localized versions
   - Update on content changes via webhooks

4. **Open Graph:**
   - Per-document ogImage, ogTitle, ogDescription
   - Localized OG tags for each language

**Performance Optimizations:**

1. **Image Optimization:**
   - Cloudinary for automatic WebP/AVIF conversion
   - Responsive images with srcset
   - Lazy loading for below-fold images

2. **Bundle Optimization:**
   - Tree-shaking for unused code
   - Dynamic imports for heavy components
   - Payload admin panel code-split from frontend

3. **Caching Headers:**
   - Static assets: 1 year cache
   - ISR pages: 60-second revalidation
   - API responses: appropriate cache headers

4. **Core Web Vitals:**
   - LCP: Hero images preloaded
   - CLS: Reserved space for images
   - FID: Minimal JavaScript blocking

**Verification Checklist:**
- [ ] All SEO metadata preserved
- [ ] Structured data identical
- [ ] Sitemaps generated correctly
- [ ] Open Graph tags working
- [ ] Page speed scores maintained
- [ ] No regressions in Lighthouse audit

## Summary

This design provides a comprehensive headless CMS migration using Payload CMS that:

1. **Preserves the existing frontend** - No visual or functional changes
2. **Provides a professional admin experience** - Draft mode, live previews, scheduled publishing
3. **Maintains SEO** - All metadata, structured data, and performance preserved
4. **Scales with the business** - Modular collections, easy to extend
5. **Empowers non-technical users** - Intuitive admin panel organized by page/section

The migration will be executed through an automated script that imports existing data, followed by visual regression testing to ensure no regressions.
