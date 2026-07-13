import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getNavigation = cache(async function getNavigation(locale: string = 'en') {
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
  })

  return navigation
})

export const getNavigationWithCategories = cache(async function getNavigationWithCategories(locale: string = 'en') {
  const payload = await getPayloadClient()

  const [navigation, categories] = await Promise.all([
    payload.findGlobal({
      slug: 'navigation',
      locale: locale as 'en' | 'fa' | 'ar',
      depth: 0,
    }),
    payload.find({
      collection: 'categories',
      locale: locale as 'en' | 'fa' | 'ar',
      limit: 100,
      depth: 0,
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        image: true,
      },
    }),
  ])

  return { navigation, categories: categories.docs }
})
