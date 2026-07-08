import { getPayloadClient } from '../payload'

export async function getNavigation(locale: string = 'en') {
  console.log(`\n[INSTR] getNavigation ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 2,
  })

  console.log(`[INSTR] getNavigation EXIT  ${Date.now() - t}ms`)
  return navigation
}

export async function getNavigationWithCategories(locale: string = 'en') {
  console.log(`\n[INSTR] getNavigationWithCategories ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
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

  console.log(`[INSTR] getNavigationWithCategories EXIT  ${Date.now() - t}ms`)
  return { navigation, categories: categories.docs }
}
