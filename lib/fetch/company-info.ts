import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getCompanyInfo = cache(async function getCompanyInfo(locale: string = 'en') {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'company-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
  })

  return info
})
