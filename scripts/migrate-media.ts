import type { Payload } from 'payload'
import fs from 'fs'
import path from 'path'

// Map product image keys to their file paths
const productImageMap: Record<string, string> = {
  'mizban-super-basmati-rice': '/product_images/optimized/mizban-super-basmati.webp',
  'mizban-1121-white-basmati-rice': '/product_images/optimized/mizban-white-basmati.webp',
  'golbanoo-386-basmati-rice': '/product_images/optimized/golbanoo-386-basmati.webp',
  'golbanoo-sella-basmati-rice': '/product_images/optimized/golbanoo-sella-basmati.webp',
  'twenty-one-sella-basmati-rice': '/product_images/optimized/twenty-one-sella-basmati.webp',
  'hayat-thai-jasmine-rice': '/product_images/optimized/hayat-thai-jasmine.webp',
  'white-beans-box': '/product_images/optimized/white-beans-box.webp',
  'white-beans-bag': '/product_images/optimized/white-bean-bag.webp',
  'red-lentil': '/product_images/optimized/red-lentil.webp',
  'green-lentils': '/product_images/optimized/green-lentils.webp',
  'mung-bean': '/product_images/optimized/mung-bean.webp',
  'kidney-bean': '/product_images/optimized/kidney-bean.webp',
  'pinto-beans': '/product_images/optimized/pinto-beans.webp',
  'black-eyed-peas': '/product_images/optimized/black-eyed-peas.webp',
  'chickpeas': '/product_images/optimized/chickpeas.webp',
  'desi-chickpea': '/product_images/optimized/desi-chickpea.webp',
  'sunflower-seeds': '/product_images/optimized/sunflower-seeds.webp',
  'sunflower-seed-kernels': '/product_images/optimized/sunflower-seed-kernels.webp',
  'pumpkin-seeds': '/product_images/optimized/pumpkin-seeds.webp',
  'pumpkin-seed-kernels': '/product_images/optimized/pumpkin-seed-kernels.webp',
  'sesame-seeds': '/product_images/optimized/sesame-seeds.webp',
  'popcorn-corn': '/product_images/optimized/popcorn-corn.webp',
  'walnut-kernels': '/product_images/optimized/walnut-kernels.webp',
  'cashew-nuts': '/product_images/optimized/cashew-nuts.webp',
  'peanuts': '/product_images/optimized/peanuts.webp',
  'black-pepper': '/product_images/optimized/black-pepper.webp',
  'cardamom': '/product_images/optimized/cardamom.webp',
  'turmeric': '/product_images/optimized/turmeric.webp',
  'desiccated-coconut': '/product_images/optimized/desiccated-coconut.webp',
  'sugar': '/product_images/optimized/sugar.webp',
}

// Other important images to import
const otherImages = [
  { path: '/hero/optimized/home-hero-1.webp', alt: { en: 'Faradid Atlas Hero 1', fa: 'تصویر اصلی فرادید اطلس ۱', ar: 'صورة فراديد اطلس الرئيسية ١' } },
  { path: '/hero/optimized/home-hero-2.webp', alt: { en: 'Faradid Atlas Hero 2', fa: 'تصویر اصلی فرادید اطلس ۲', ar: 'صورة فراديد اطلس الرئيسية ٢' } },
  { path: '/hero/optimized/home-hero-3.webp', alt: { en: 'Faradid Atlas Hero 3', fa: 'تصویر اصلی فرادید اطلس ۳', ar: 'صورة فراديد اطلس الرئيسية ٣' } },
  { path: '/ceo.webp', alt: { en: 'CEO Profile', fa: 'تصویر مدیرعامل', ar: 'صورة المدير التنفيذي' } },
  { path: '/brands/twenty-one-4k.png', alt: { en: '21 Brand', fa: 'برند ۲۱', ar: 'علامة ٢١ التجارية' } },
  { path: '/brands/mizban-4k.png', alt: { en: 'Mizban Brand', fa: 'برند میزبان', ar: 'علامة ميزبان التجارية' } },
  { path: '/brands/golbanoo-4k.png', alt: { en: 'Golbanoo Brand', fa: 'برند گلبانو', ar: 'علامة گلبنو التجارية' } },
  { path: '/brands/hayat-4k.png', alt: { en: 'Hayat Brand', fa: 'برند حیات', ar: 'علامة حياة التجارية' } },
]

export async function importMedia(payload: Payload) {
  const publicDir = path.resolve(process.cwd(), 'public')
  const mediaDocs: Record<string, any> = {}

  // Import product images
  console.log('  Importing product images...')
  for (const [slug, imgPath] of Object.entries(productImageMap)) {
    const filePath = path.join(publicDir, imgPath)
    if (!fs.existsSync(filePath)) {
      console.log(`    Skipping ${slug}: file not found at ${imgPath}`)
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(filePath).slice(1)
    const mimeType = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : `image/${ext}`
    const filename = path.basename(filePath)

    try {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: slug.replace(/-/g, ' '),
        },
        filePath,
      })
      mediaDocs[slug] = mediaDoc
      console.log(`    Uploaded: ${filename} -> media #${mediaDoc.id}`)
    } catch (e) {
      console.log(`    Failed to upload ${filename}: ${(e as Error).message}`)
    }
  }

  // Import other images
  console.log('  Importing other images...')
  for (const img of otherImages) {
    const filePath = path.join(publicDir, img.path)
    if (!fs.existsSync(filePath)) {
      console.log(`    Skipping ${img.path}: file not found`)
      continue
    }

    try {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: img.alt.en,
        },
        filePath,
      })
      mediaDocs[img.path] = mediaDoc
      console.log(`    Uploaded: ${path.basename(filePath)} -> media #${mediaDoc.id}`)
    } catch (e) {
      console.log(`    Failed to upload ${path.basename(filePath)}: ${(e as Error).message}`)
    }
  }

  // Link product images to products
  console.log('  Linking images to products...')
  const productsResult = await payload.find({ collection: 'products', limit: 100 })
  for (const product of productsResult.docs) {
    const slug = (product as any).slug
    const mediaDoc = mediaDocs[slug]
    if (!mediaDoc) continue

    try {
      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          featuredImage: mediaDoc.id,
          gallery: [{ image: mediaDoc.id }],
        },
      })
      console.log(`    Linked image to product: ${slug}`)
    } catch (e) {
      console.log(`    Failed to link image to ${slug}: ${(e as Error).message}`)
    }
  }

  // Link hero images to homepage
  console.log('  Linking hero images to homepage...')
  const heroImages = ['/hero/optimized/home-hero-1.webp', '/hero/optimized/home-hero-2.webp', '/hero/optimized/home-hero-3.webp']
  const heroMediaIds = heroImages.map(p => mediaDocs[p]?.id).filter(Boolean)

  if (heroMediaIds.length > 0) {
    try {
      const homepage = await payload.findGlobal({ slug: 'homepage' })
      const existingSlides = (homepage as any).heroSlides || []
      const updatedSlides = existingSlides.map((slide: any, i: number) => ({
        ...slide,
        image: heroMediaIds[i] || heroMediaIds[0],
      }))
      await payload.updateGlobal({
        slug: 'homepage',
        data: { heroSlides: updatedSlides },
      })
      console.log(`    Linked ${heroMediaIds.length} hero images`)
    } catch (e) {
      console.log(`    Failed to link hero images: ${(e as Error).message}`)
    }
  }

  // Link brand logos
  console.log('  Linking brand logos...')
  const brandLogos = [
    { path: '/brands/twenty-one-4k.png', brandSlug: 'twenty-one' },
    { path: '/brands/mizban-4k.png', brandSlug: 'mizban' },
    { path: '/brands/golbanoo-4k.png', brandSlug: 'golbanoo' },
    { path: '/brands/hayat-4k.png', brandSlug: 'hayat' },
  ]

  for (const bl of brandLogos) {
    const mediaDoc = mediaDocs[bl.path]
    if (!mediaDoc) continue
    try {
      const brands = await payload.find({ collection: 'product-brands', where: { slug: { equals: bl.brandSlug } }, limit: 1 })
      if (brands.docs[0]) {
        await payload.update({ collection: 'product-brands', id: brands.docs[0].id, data: { logo: mediaDoc.id } as any })
        console.log(`    Linked logo to brand: ${bl.brandSlug}`)
      }
    } catch (e) {
      console.log(`    Failed to link logo to ${bl.brandSlug}: ${(e as Error).message}`)
    }
  }

  const totalMedia = await payload.find({ collection: 'media', limit: 1 })
  console.log(`\n  Media import complete: ${totalMedia.totalDocs} total media documents`)
}
