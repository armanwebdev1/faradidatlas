import type { Payload } from 'payload'
import {
  products,
  productCategories,
  productBrands,
  categoryLabels,
  productBrandLabels,
  type ProductCategory,
} from '../components/products/product-data'

export async function importCategories(payload: Payload) {
  for (const category of productCategories) {
    const labels = categoryLabels[category]
    try {
      await payload.create({
        collection: 'categories',
        data: {
          name: labels.en,
          slug: category,
          description: `Browse our ${labels.en} products`,
        },
      })
      console.log(`  Created category: ${labels.en}`)
    } catch {
      console.log(`  Category ${category} may already exist, skipping...`)
    }
  }
}

export async function importProductBrands(payload: Payload) {
  for (const brand of productBrands) {
    const labels = productBrandLabels[brand]
    try {
      await payload.create({
        collection: 'product-brands',
        data: {
          name: labels.en,
          slug: brand,
        },
      })
      console.log(`  Created brand: ${labels.en}`)
    } catch {
      console.log(`  Brand ${brand} may already exist, skipping...`)
    }
  }
}

export async function importProducts(payload: Payload) {
  for (const product of products) {
    const category = await payload.find({
      collection: 'categories',
      where: { slug: { equals: product.category } },
    })

    const brandName = product.nameEn.startsWith('Mizban')
      ? 'mizban'
      : product.nameEn.startsWith('Golbanoo')
        ? 'golbanoo'
        : product.nameEn.startsWith('Hayat')
          ? 'hayat'
          : 'twenty-one'

    const brand = await payload.find({
      collection: 'product-brands',
      where: { slug: { equals: brandName } },
    })

    try {
      await payload.create({
        collection: 'products',
        data: {
          name: product.nameEn,
          slug: product.slug,
          category: category.docs[0]?.id,
          brand: brand.docs[0]?.id,
          type: getProductType(product) as 'basmati-rice' | 'jasmine-rice' | 'beans' | 'lentils' | 'chickpeas' | 'seeds-kernels' | 'nuts' | 'spices' | 'sweeteners',
          description: product.descriptionEn,
          alias: product.aliasEn || '',
          featuredImage: product.image || '',
          specs: product.specs?.map((spec) => ({
            label: spec.label.en,
            value: spec.value.en,
          })) || [],
          gallery: product.images?.map((img) => ({ image: img })) || [],
        },
      })
      console.log(`  Created product: ${product.nameEn}`)
    } catch {
      console.log(`  Product ${product.slug} may already exist, skipping...`)
    }
  }
}

function getProductType(product: { category: ProductCategory; nameEn: string; aliasEn?: string }): string {
  const searchText = `${product.nameEn} ${product.aliasEn ?? ''}`.toLowerCase()

  if (product.category === 'rice') {
    return searchText.includes('jasmine') ? 'jasmine-rice' : 'basmati-rice'
  }
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
