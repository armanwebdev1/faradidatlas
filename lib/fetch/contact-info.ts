import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getContactInfo = cache(async function getContactInfo(locale: string = 'en', draft: boolean = false) {
  const payload = await getPayloadClient()

  const info = await payload.findGlobal({
    slug: 'contact-info',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
    draft,
  })

  return info
})
