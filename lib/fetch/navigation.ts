import { getPayloadClient } from '../payload'

export async function getNavigation(locale: string = 'en') {
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 2,
  })

  return navigation
}

export async function getNavigationWithCategories(locale: string = 'en') {
  const payload = await getPayloadClient()

  const [navigation, categories] = await Promise.all([
    payload.findGlobal({
      slug: 'navigation',
      locale: locale as 'en' | 'fa' | 'ar',
      depth: 2,
    }),
    payload.find({
      collection: 'categories',
      locale: locale as 'en' | 'fa' | 'ar',
      limit: 100,
    }),
  ])

  return { navigation, categories: categories.docs }
}
