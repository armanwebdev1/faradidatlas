import { getPayloadClient } from '../payload'

export async function getProducts(locale: string = 'en') {
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return products.docs
}

export async function getProductBySlug(
  slug: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return products.docs[0] || null
}

export async function getProductsByCategory(
  category: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: category } },
    limit: 1,
  })

  if (!categories.docs[0]) {
    return []
  }

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { category: { equals: categories.docs[0].id } },
    limit: 100,
  })

  return products.docs
}

export async function getCategories(locale: string = 'en') {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return categories.docs
}
