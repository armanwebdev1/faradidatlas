import { getPayloadClient } from '../payload'

export async function getFAQs(locale: string = 'en') {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return faqs.docs
}

export async function getFAQsByCategory(
  category: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { category: { equals: category } },
    limit: 100,
  })

  return faqs.docs
}
