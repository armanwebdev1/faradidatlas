import { getPayloadClient } from '../payload'

export async function getContactInfo(locale: string = 'en') {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'contact-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  return info
}
