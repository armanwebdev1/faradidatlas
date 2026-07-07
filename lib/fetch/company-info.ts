import { getPayloadClient } from '../payload'

export async function getCompanyInfo(locale: string = 'en') {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'company-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  return info
}
