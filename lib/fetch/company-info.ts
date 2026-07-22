import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getCompanyInfo = cache(async function getCompanyInfo(locale: string = 'en', draft: boolean = false) {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'company-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
    draft,
  })

  return info
})
