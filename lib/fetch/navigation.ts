import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getNavigation = cache(async function getNavigation(locale: string = 'en') {
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  return navigation
})

export const getNavigationWithCategories = cache(async function getNavigationWithCategories(locale: string = 'en') {
  const payload = await getPayloadClient()

  const [navigation, categories] = await Promise.all([
    payload.findGlobal({
      slug: 'navigation',
      locale: locale as 'en' | 'fa' | 'ar',
      depth: 1,
    }),
    payload.find({
      collection: 'categories',
      locale: locale as 'en' | 'fa' | 'ar',
      limit: 100,
    }),
  ])

  return { navigation, categories: categories.docs }
})
