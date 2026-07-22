import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getCareersInfo = cache(async function getCareersInfo(locale: string = 'en', draft: boolean = false) {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'careers-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
    draft,
  })

  return info
})
