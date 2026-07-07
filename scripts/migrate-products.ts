import type { Payload } from 'payload'
import {
  products,
  productCategories,
  productBrands,
  categoryLabels,
  categoryDescriptions,
  productBrandLabels,
  type ProductCategory,
} from '../components/products/product-data'

export async function importCategories(payload: Payload) {
  for (const category of productCategories) {
    const labels = categoryLabels[category]
    const descriptions = categoryDescriptions[category]
    try {
      const doc = await payload.create({
        collection: 'categories',
        locale: 'en',
        data: {
          name: labels.en,
          slug: category,
          description: descriptions.description.en,
        },
      })
      await payload.update({
        collection: 'categories',
        id: doc.id,
        locale: 'fa',
        data: { name: labels.fa, description: descriptions.description.fa },
      })
      await payload.update({
        collection: 'categories',
        id: doc.id,
        locale: 'ar',
        data: { name: labels.ar, description: descriptions.description.ar },
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
      const doc = await payload.create({
        collection: 'product-brands',
        locale: 'en',
        data: { name: labels.en, slug: brand },
      })
      await payload.update({
        collection: 'product-brands',
        id: doc.id,
        locale: 'fa',
        data: { name: labels.fa },
      })
      await payload.update({
        collection: 'product-brands',
        id: doc.id,
        locale: 'ar',
        data: { name: labels.ar },
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

    const productType = getProductType(product)

    try {
      const doc = await payload.create({
        collection: 'products',
        locale: 'en',
        data: {
          name: product.nameEn,
          slug: product.slug,
          category: category.docs[0]?.id,
          brand: brand.docs[0]?.id,
          type: productType as any,
          description: product.descriptionEn,
          alias: product.aliasEn || '',
          specs: product.specs?.map((spec) => ({
            label: spec.label.en,
            value: spec.value.en,
          })) || [],
        },
      })
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: 'fa',
        data: {
          name: product.nameFa,
          description: product.descriptionFa,
          alias: product.aliasFa || '',
          specs: product.specs?.map((spec) => ({
            label: spec.label.fa,
            value: spec.value.fa,
          })) || [],
        },
      })
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: 'ar',
        data: {
          name: product.nameAr,
          description: product.descriptionAr,
          alias: product.aliasAr || '',
          specs: product.specs?.map((spec) => ({
            label: spec.label.ar,
            value: spec.value.ar,
          })) || [],
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
