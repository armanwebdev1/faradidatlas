import { getPayloadClient } from '../payload'

export async function getSiteSettings(locale: string = 'en') {
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  return settings
}
