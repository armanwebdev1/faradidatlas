import { cache } from 'react'
import { getPayloadClient } from '../payload'
import type { Homepage, ContactInfo, SiteSetting, Navigation } from '@/payload-types'

export interface AllGlobals {
  homepage: Homepage
  contactInfo: ContactInfo
  siteSettings: SiteSetting
  navigation: Navigation
}

export const getAllGlobals = cache(async function getAllGlobals(locale: string = 'en'): Promise<AllGlobals> {
  const payload = await getPayloadClient()

  const [homepage, contactInfo, siteSettings, navigation] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale: locale as 'en' | 'fa' | 'ar', depth: 0 }),
    payload.findGlobal({ slug: 'contact-info', locale: locale as 'en' | 'fa' | 'ar', depth: 0 }),
    payload.findGlobal({ slug: 'site-settings', locale: locale as 'en' | 'fa' | 'ar', depth: 0 }),
    payload.findGlobal({ slug: 'navigation', locale: locale as 'en' | 'fa' | 'ar', depth: 0 }),
  ])

  return { homepage, contactInfo, siteSettings, navigation }
})
