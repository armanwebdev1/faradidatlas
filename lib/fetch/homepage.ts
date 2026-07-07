import { getPayloadClient } from '../payload'

function resolveMediaUrl(media: any): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (typeof media === 'object') return media.url ?? media.filename ?? undefined
  return undefined
}

export async function getHomepage(locale: string = 'en') {
  const payload = await getPayloadClient()

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fa' | 'ar',
    depth: 2,
  })

  return homepage
}

export function resolveHomepageImage(homepage: any, field: string): string | undefined {
  const val = homepage?.[field]
  return resolveMediaUrl(val)
}
