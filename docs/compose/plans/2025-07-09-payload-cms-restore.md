# Payload CMS Restore Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore Payload CMS collections (Categories, ProductBrands, Products) from `product-data.ts`, linking already-uploaded media by filename — a one-time recovery after database wipe.

**Architecture:** Single TypeScript script using Payload Local API. Queries existing media by filename (basename of image path), creates documents with proper relationships, handles localization (en/fa/ar), and is idempotent (checks by slug before creating). Executed via `npx tsx scripts/restore-cms.ts`.

**Tech Stack:** TypeScript, Payload CMS Local API, Node.js, `@next/env`

## Global Constraints

- This is a one-time recovery script, NOT a reusable seeding system
- Do NOT re-upload media — files already exist in Payload/Blob
- Do NOT modify existing Media documents
- Do NOT create duplicate records — upsert by slug, reuse existing
- Use Payload Local API only — no SQL, no Prisma, no Supabase client
- Script must be idempotent (safe to re-run)
- Delete the script after successful verification
- Match media using `path.basename(imagePath)` against `media.filename` — never hardcode IDs, never match by alt text

---

## Collection Schemas Reference

### Categories (`categories`)
| Field | Type | Required | Localized |
|-------|------|----------|-----------|
| name | text | yes | yes |
| slug | text (sidebar) | yes | no |
| description | textarea | no | yes |
| seo.title | text | no | yes |
| seo.description | textarea | no | yes |

### Product Brands (`product-brands`)
| Field | Type | Required | Localized |
|-------|------|----------|-----------|
| name | text | yes | yes |
| slug | text | yes | no |
| logo | upload → media | no | no |

### Products (`products`)
| Field | Type | Required | Localized |
|-------|------|----------|-----------|
| name | text | yes | yes |
| slug | text (sidebar) | yes | no |
| category | relationship → categories | yes | no |
| brand | relationship → product-brands | no | no |
| type | select | no | no |
| description | textarea | no | yes |
| alias | text | no | yes |
| specs | array (label + value) | no | yes |
| featuredImage | upload → media | no | no |
| gallery | array of upload → media | no | no |
| seo.title | text | no | yes |
| seo.description | textarea | no | yes |
| seo.ogImage | upload → media | no | no |

### Media (`media`)
Already populated. Fields: `alt` (required, localized), `caption` (localized). Upload config: `mimeTypes: ['image/*']`.

---

## File Structure

- **Create:** `scripts/restore-cms.ts` — One-time restoration script
- **Delete after execution:** `scripts/restore-cms.ts`

---

## Task 1: Pre-flight — Discover Media Filenames

Before writing the restore script, verify what media files actually exist in the Payload media collection so the script can match correctly.

**Files:**
- None (information gathering)

**Step 1: Query existing media filenames**

Run against the running Payload instance to see what's available:

```bash
npx tsx -e "
const { loadEnvConfig } = await import('@next/env');
import { resolve } from 'path';
loadEnvConfig(resolve(process.cwd()), process.env.NODE_ENV !== 'production');
const { getPayload } = await import('payload');
const { default: config } = await import('./payload.config');
const payload = await getPayload({ config });
const media = await payload.find({ collection: 'media', limit: 200 });
media.docs.forEach(m => console.log(m.filename));
process.exit(0);
"
```

**Expected:** A list of all media filenames. We need to confirm:
- Product images exist (e.g., `mizban-super-basmati.webp`)
- Brand logos exist (e.g., filenames for twenty-one, mizban, golbanoo, hayat logos)
- All 30 product image filenames from `productImages` in `product-data.ts` are present

**Step 2: Identify brand logo filenames**

From the media list, identify the logo filenames for each brand. They are likely named like:
- `twenty-one-*.png` or `21-*.png`
- `mizban-*.png`
- `golbanoo-*.png`
- `hayat-*.png`

Record the exact filenames for use in Task 2.

---

## Task 2: Create the Restore Script

**Covers:** Full CMS recovery — categories, brands, products, media linking, localization

**Files:**
- Create: `scripts/restore-cms.ts`

**Interfaces:**
- Consumes: Payload Local API, `product-data.ts` exports, media filenames from Task 1
- Produces: Populated categories, product-brands, and products collections with media linked

- [ ] **Step 1: Create `scripts/restore-cms.ts`**

```typescript
// scripts/restore-cms.ts
// One-time Payload CMS restoration after database wipe
// Usage: npx tsx scripts/restore-cms.ts

const { loadEnvConfig } = await import('@next/env')
import { resolve } from 'path'
loadEnvConfig(resolve(process.cwd()), process.env.NODE_ENV !== 'production')

const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
import {
  products,
  productCategories,
  productBrands,
  categoryLabels,
  categoryDescriptions,
  productBrandLabels,
  type ProductCategory,
} from '../components/products/product-data'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProductType(product: { category: ProductCategory; nameEn: string; aliasEn?: string }): string {
  const searchText = `${product.nameEn} ${product.aliasEn ?? ''}`.toLowerCase()
  if (product.category === 'rice') return searchText.includes('jasmine') ? 'jasmine-rice' : 'basmati-rice'
  if (product.category === 'legumes') {
    if (searchText.includes('lentil')) return 'lentils'
    if (searchText.includes('chickpea')) return 'chickpeas'
    return 'beans'
  }
  if (product.category === 'seeds') return 'seeds-kernels'
  if (product.category === 'nuts') return 'nuts'
  if (product.category === 'sugar') return 'sweeteners'
  return 'spices'
}

function getBrandSlug(product: { nameEn: string }): string {
  if (product.nameEn.startsWith('Mizban')) return 'mizban'
  if (product.nameEn.startsWith('Golbanoo')) return 'golbanoo'
  if (product.nameEn.startsWith('Hayat')) return 'hayat'
  return 'twenty-one'
}

async function findMediaByFilename(payload: any, filename: string): Promise<string | null> {
  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  return result.docs[0]?.id ?? null
}

async function upsertBySlug(
  payload: any,
  collection: string,
  slug: string,
  data: Record<string, any>,
): Promise<{ id: string; created: boolean }> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (existing.docs[0]) {
    const updated = await payload.update({ collection, id: existing.docs[0].id, data })
    return { id: updated.id, created: false }
  }
  const created = await payload.create({ collection, data: { ...data, slug } })
  return { id: created.id, created: true }
}

// ─── Brand logo filenames (discovered in Task 1) ──────────────────────────────
// UPDATE THESE after running Task 1 to get actual filenames from media collection
const brandLogoFilenames: Record<string, string> = {
  'twenty-one': 'twenty-one-logo.png',
  'mizban': 'mizban-logo.png',
  'golbanoo': 'golbanoo-logo.png',
  'hayat': 'hayat-logo.png',
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function restore() {
  const payload = await getPayload({ config })
  const stats = {
    categoriesCreated: 0, categoriesUpdated: 0,
    brandsCreated: 0, brandsUpdated: 0, logosLinked: 0,
    productsCreated: 0, productsUpdated: 0, imagesLinked: 0,
    missingMedia: [] as string[],
  }

  console.log('Starting Payload CMS restoration...\n')

  // Phase 1: Categories
  console.log('Phase 1: Creating categories...')
  for (const cat of productCategories) {
    const labels = categoryLabels[cat]
    const desc = categoryDescriptions[cat]
    const { id, created } = await upsertBySlug(payload, 'categories', cat, {
      name: labels.en,
      description: desc.description.en,
      seo: { title: labels.en, description: desc.description.en },
    })
    await payload.update({
      collection: 'categories', id, locale: 'fa',
      data: { name: labels.fa, description: desc.description.fa, seo: { title: labels.fa, description: desc.description.fa } },
    })
    await payload.update({
      collection: 'categories', id, locale: 'ar',
      data: { name: labels.ar, description: desc.description.ar, seo: { title: labels.ar, description: desc.description.ar } },
    })
    created ? stats.categoriesCreated++ : stats.categoriesUpdated++
    console.log(`  ${created ? 'Created' : 'Updated'}: ${labels.en}`)
  }
  console.log(`  Categories: ${stats.categoriesCreated} created, ${stats.categoriesUpdated} updated\n`)

  // Phase 2: Product Brands
  console.log('Phase 2: Creating product brands...')
  for (const brand of productBrands) {
    const labels = productBrandLabels[brand]
    const logoFilename = brandLogoFilenames[brand]
    const logoId = logoFilename ? await findMediaByFilename(payload, logoFilename) : null
    if (logoFilename && !logoId) stats.missingMedia.push(`Brand logo: ${logoFilename}`)

    const data: Record<string, any> = { name: labels.en }
    if (logoId) data.logo = logoId

    const { id, created } = await upsertBySlug(payload, 'product-brands', brand, data)
    await payload.update({ collection: 'product-brands', id, locale: 'fa', data: { name: labels.fa } })
    await payload.update({ collection: 'product-brands', id, locale: 'ar', data: { name: labels.ar } })
    if (logoId) stats.logosLinked++
    created ? stats.brandsCreated++ : stats.brandsUpdated++
    console.log(`  ${created ? 'Created' : 'Updated'}: ${labels.en}${logoId ? ' (logo linked)' : ''}`)
  }
  console.log(`  Brands: ${stats.brandsCreated} created, ${stats.brandsUpdated} updated, ${stats.logosLinked} logos linked\n`)

  // Phase 3: Build relationship lookups
  console.log('Phase 3: Building relationship lookups...')
  const categoryLookup: Record<string, string> = {}
  for (const cat of productCategories) {
    const r = await payload.find({ collection: 'categories', where: { slug: { equals: cat } }, limit: 1 })
    if (r.docs[0]) categoryLookup[cat] = r.docs[0].id
  }
  const brandLookup: Record<string, string> = {}
  for (const brand of productBrands) {
    const r = await payload.find({ collection: 'product-brands', where: { slug: { equals: brand } }, limit: 1 })
    if (r.docs[0]) brandLookup[brand] = r.docs[0].id
  }

  // Phase 4: Products
  console.log('Phase 4: Creating products...')
  for (const product of products) {
    const brandSlug = getBrandSlug(product)
    const categoryId = categoryLookup[product.category]
    const brandId = brandLookup[brandSlug]
    const productType = getProductType(product)

    // Match media by basename
    const imagePath = product.image ?? product.images?.[0]
    const imageFilename = imagePath ? imagePath.split('/').pop()! : null
    const featuredImageId = imageFilename ? await findMediaByFilename(payload, imageFilename) : null
    if (imageFilename && !featuredImageId) stats.missingMedia.push(`Product image: ${imageFilename} (${product.nameEn})`)

    const { id, created } = await upsertBySlug(payload, 'products', product.slug, {
      name: product.nameEn,
      category: categoryId,
      brand: brandId,
      type: productType,
      description: product.descriptionEn,
      alias: product.aliasEn || '',
      specs: product.specs?.map(s => ({ label: s.label.en, value: s.value.en })) || [],
      ...(featuredImageId ? { featuredImage: featuredImageId, gallery: [{ image: featuredImageId }] } : {}),
    })

    await payload.update({
      collection: 'products', id, locale: 'fa',
      data: {
        name: product.nameFa, description: product.descriptionFa, alias: product.aliasFa || '',
        specs: product.specs?.map(s => ({ label: s.label.fa, value: s.value.fa })) || [],
      },
    })
    await payload.update({
      collection: 'products', id, locale: 'ar',
      data: {
        name: product.nameAr, description: product.descriptionAr, alias: product.aliasAr || '',
        specs: product.specs?.map(s => ({ label: s.label.ar, value: s.value.ar })) || [],
      },
    })

    if (featuredImageId) stats.imagesLinked++
    created ? stats.productsCreated++ : stats.productsUpdated++
    console.log(`  ${created ? 'Created' : 'Updated'}: ${product.nameEn}${featuredImageId ? ' (image linked)' : ''}`)
  }
  console.log(`  Products: ${stats.productsCreated} created, ${stats.productsUpdated} updated, ${stats.imagesLinked} images linked\n`)

  // Summary
  console.log('=== Restoration Complete ===')
  console.log(`  Categories: ${stats.categoriesCreated} created, ${stats.categoriesUpdated} updated`)
  console.log(`  Brands:     ${stats.brandsCreated} created, ${stats.brandsUpdated} updated, ${stats.logosLinked} logos linked`)
  console.log(`  Products:   ${stats.productsCreated} created, ${stats.productsUpdated} updated, ${stats.imagesLinked} images linked`)
  if (stats.missingMedia.length) {
    console.log(`\n  Missing media (${stats.missingMedia.length}):`)
    stats.missingMedia.forEach(m => console.log(`    - ${m}`))
  }
  console.log('===========================\n')

  process.exit(0)
}

restore().catch((err) => {
  console.error('Restoration failed:', err)
  process.exit(1)
})
```

- [ ] **Step 2: Update brand logo filenames**

After Task 1 discovers actual media filenames, update the `brandLogoFilenames` map in the script to match real filenames. The current values are placeholders.

- [ ] **Step 3: Run the restore script**

```bash
npx tsx scripts/restore-cms.ts
```

Expected output:
- 6 categories created
- 4 brands created with logos linked
- 30 products created with images linked
- No missing media warnings (or warnings for any genuinely missing files)

---

## Task 3: Verify Restoration

**Covers:** Validation — all collections populated, media linked, frontend working

**Files:**
- None (verification only)

- [ ] **Step 1: Verify via Payload Local API**

```bash
npx tsx -e "
const { loadEnvConfig } = await import('@next/env');
import { resolve } from 'path';
loadEnvConfig(resolve(process.cwd()), process.env.NODE_ENV !== 'production');
const { getPayload } = await import('payload');
const { default: config } = await import('./payload.config');
const payload = await getPayload({ config });

const cats = await payload.find({ collection: 'categories', limit: 10 });
const brands = await payload.find({ collection: 'product-brands', limit: 10 });
const prods = await payload.find({ collection: 'products', limit: 50 });

console.log('Categories:', cats.totalDocs);
console.log('Brands:', brands.totalDocs);
console.log('Products:', prods.totalDocs);

// Check media links
const brokenImages = prods.docs.filter(p => !p.featuredImage);
const brokenLogos = brands.docs.filter(b => !b.logo);
console.log('Products without image:', brokenImages.length);
console.log('Brands without logo:', brokenLogos.length);

if (brokenImages.length) brokenImages.forEach(p => console.log('  Missing image:', p.name));
if (brokenLogos.length) brokenLogos.forEach(b => console.log('  Missing logo:', b.name));

process.exit(0);
"
```

Expected: 6 categories, 4 brands, 30 products, 0 broken images, 0 broken logos.

- [ ] **Step 2: Verify via API endpoint**

```bash
curl -s http://localhost:3000/api/products?limit=1 | head -c 500
```

Expected: JSON response with product data.

- [ ] **Step 3: Verify frontend renders**

Navigate to `/products` in the browser. Confirm:
- Products display with images
- Category filtering works
- Product detail pages show localized content
- Brand logos appear on brand pages

- [ ] **Step 4: Delete the restore script**

```bash
rm scripts/restore-cms.ts
```

This is a one-time script. Remove it after successful verification.

---

## Success Criteria

- [ ] 6 categories populated with localized names and descriptions
- [ ] 4 brands populated with localized names and linked logos
- [ ] 30 products populated with localized fields, categories, brands, types
- [ ] All featured images linked via media filename matching
- [ ] All galleries populated with featured image
- [ ] No broken media references
- [ ] `/api/products` returns restored products
- [ ] Frontend product pages render correctly
- [ ] Restore script deleted after verification
