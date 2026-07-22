import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getSiteSettings = cache(async function getSiteSettings(locale: string = 'en', draft: boolean = false) {
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
    draft,
  })

  return settings
})
