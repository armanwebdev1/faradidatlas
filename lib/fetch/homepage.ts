import { getPayloadClient } from '../payload'

export async function getHomepage(locale: string = 'en') {
  const payload = await getPayloadClient()

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fa' | 'ar',
  })

  return homepage
}
