import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getAllGlobals = cache(async function getAllGlobals(locale: string = 'en') {
  const payload = await getPayloadClient()

  const [homepage, contactInfo, siteSettings, navigation] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale: locale as 'en' | 'fa' | 'ar', depth: 1 }),
    payload.findGlobal({ slug: 'contact-info', locale: locale as 'en' | 'fa' | 'ar', depth: 1 }),
    payload.findGlobal({ slug: 'site-settings', locale: locale as 'en' | 'fa' | 'ar', depth: 1 }),
    payload.findGlobal({ slug: 'navigation', locale: locale as 'en' | 'fa' | 'ar', depth: 1 }),
  ])

  return { homepage, contactInfo, siteSettings, navigation }
})
