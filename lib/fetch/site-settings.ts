import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getSiteSettings = cache(async function getSiteSettings(locale: string = 'en') {
  console.log(`\n[INSTR] getSiteSettings ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 1,
  })

  console.log(`[INSTR] getSiteSettings EXIT  ${Date.now() - t}ms`)
  return settings
})
