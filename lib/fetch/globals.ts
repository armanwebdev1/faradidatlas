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
  const loc = locale as 'en' | 'fa' | 'ar'

  const [homepage, contactInfo, siteSettings, navigation] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', locale: loc, depth: 0 }) as Promise<Homepage>,
    payload.findGlobal({ slug: 'contact-info', locale: loc, depth: 0 }) as Promise<ContactInfo>,
    payload.findGlobal({ slug: 'site-settings', locale: loc, depth: 0 }) as Promise<SiteSetting>,
    payload.findGlobal({ slug: 'navigation', locale: loc, depth: 0 }) as Promise<Navigation>,
  ])

  return { homepage, contactInfo, siteSettings, navigation }
})
