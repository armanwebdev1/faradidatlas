export function resolveMediaUrl(media: any): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (typeof media === 'object') return media.url ?? media.filename ?? undefined
  return undefined
}
