import { getPayloadClient } from '../payload'

export async function getNavigation(locale: string = 'en') {
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
  })

  return navigation
}
