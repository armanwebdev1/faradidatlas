import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'

async function main() {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'twenty-one-sesame-seeds' } },
    limit: 1,
    depth: 2,
  })

  const p = products.docs[0]
  if (!p) {
    fs.writeFileSync('debug-output.txt', 'NO PRODUCT FOUND\n')
    process.exit(1)
  }

  const lines: string[] = []
  lines.push('=== RAW PAYLOAD DOC ===')
  lines.push(JSON.stringify(p, null, 2))
  lines.push('=== END RAW PAYLOAD DOC ===')
  lines.push('')

  // Replicate the exact mapping from getProductBySlug
  function resolveCategory(category: any) {
    const categorySlugMap: Record<string, string> = {
      rice: 'rice', legumes: 'legumes', seeds: 'seeds',
      nuts: 'nuts', spices: 'spices', sugar: 'sugar',
    }
    if (!category) return 'rice'
    if (typeof category === 'string') return categorySlugMap[category] ?? 'rice'
    if (typeof category === 'object' && category.slug) return categorySlugMap[category.slug] ?? 'rice'
    return 'rice'
  }

  function resolveImageUrl(image: any): string | undefined {
    if (!image) return undefined
    if (typeof image === 'string') return image
    if (typeof image === 'object') return image.url ?? image.filename ?? undefined
    return undefined
  }

  function resolveSpecs(specs: any) {
    if (!specs || !Array.isArray(specs)) return []
    return specs.map((spec: any) => ({
      label: {
        en: (spec.label as any)?.en ?? spec.label ?? '',
        fa: (spec.label as any)?.fa ?? spec.label ?? '',
        ar: (spec.label as any)?.ar ?? spec.label ?? '',
      },
      value: {
        en: (spec.value as any)?.en ?? spec.value ?? '',
        fa: (spec.value as any)?.fa ?? spec.value ?? '',
        ar: (spec.value as any)?.ar ?? spec.value ?? '',
      },
    }))
  }

  const mapped = {
    id: p.id,
    slug: p.slug,
    nameEn: (p.name as any)?.en ?? '',
    nameFa: (p.name as any)?.fa ?? '',
    nameAr: (p.name as any)?.ar ?? '',
    aliasEn: (p.alias as any)?.en ?? undefined,
    aliasFa: (p.alias as any)?.fa ?? undefined,
    aliasAr: (p.alias as any)?.ar ?? undefined,
    category: resolveCategory(p.category),
    descriptionEn: (p.description as any)?.en ?? '',
    descriptionFa: (p.description as any)?.fa ?? '',
    descriptionAr: (p.description as any)?.ar ?? '',
    image: resolveImageUrl(p.featuredImage),
    images: ((p.gallery as any[])?.map((g: any) => resolveImageUrl(g.image)).filter(Boolean) ?? []) as string[],
    specs: resolveSpecs(p.specs),
  }

  lines.push('=== MAPPED PRODUCT ===')
  lines.push(JSON.stringify(mapped, null, 2))
  lines.push('=== END MAPPED PRODUCT ===')

  fs.writeFileSync('public/debug-output.txt', lines.join('\n'), 'utf-8')
  console.log('DONE - wrote public/debug-output.txt')

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
