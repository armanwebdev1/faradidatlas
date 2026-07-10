import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getCompanyInfo = cache(async function getCompanyInfo(locale: string = 'en') {
  const t = Date.now()
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'company-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  console.log(`[CompanyInfo] fetched in ${Date.now() - t}ms`)
  return info
})
