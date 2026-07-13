import { cache } from 'react'
import { getPayloadClient } from '../payload'

export const getHomepage = cache(async function getHomepage(locale: string = 'en') {
  const payload = await getPayloadClient()

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 0,
  })

  return homepage
})

export function resolveHomepageImage(homepage: any, field: string): string | undefined {
  const val = homepage?.[field]
  if (!val) return undefined
  if (typeof val === 'string') return val
  if (typeof val === 'object') return val.url ?? val.filename ?? undefined
  return undefined
}
