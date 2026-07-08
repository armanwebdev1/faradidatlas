import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'twenty-one-sesame-seeds' } },
    limit: 1,
    depth: 2,
  })

  if (!result.docs[0]) {
    console.log('No product found with slug twenty-one-sesame-seeds')
    process.exit(1)
  }

  const p = result.docs[0]

  console.log('========== 1. RAW PAYLOAD DOCUMENT ==========')
  console.log(JSON.stringify(p, null, 2))

  console.log('\n========== 2. MAPPED OBJECT (getProductBySlug output) ==========')

  function resolveCategory(category: any) {
    const map: Record<string, string> = {
      rice: 'rice', legumes: 'legumes', seeds: 'seeds',
      nuts: 'nuts', spices: 'spices', sugar: 'sugar',
    }
    if (!category) return 'rice'
    if (typeof category === 'string') return map[category] ?? 'rice'
    if (typeof category === 'object' && category.slug) return map[category.slug] ?? 'rice'
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
    images: ((p.gallery as any[])?.map((g: any) => resolveImageUrl(g.image)).filter(Boolean) ?? []),
    specs: resolveSpecs(p.specs),
  }

  console.log(JSON.stringify(mapped, null, 2))

  console.log('\n========== 3. FIELD-BY-FIELD COMPARISON ==========')

  console.log('\n--- name ---')
  console.log('Payload value :', JSON.stringify(p.name))
  console.log('Mapped values : nameEn=' + JSON.stringify(mapped.nameEn))
  console.log('                nameFa=' + JSON.stringify(mapped.nameFa))
  console.log('                nameAr=' + JSON.stringify(mapped.nameAr))

  console.log('\n--- alias ---')
  console.log('Payload value :', JSON.stringify(p.alias))
  console.log('Mapped values : aliasEn=' + JSON.stringify(mapped.aliasEn))
  console.log('                aliasFa=' + JSON.stringify(mapped.aliasFa))
  console.log('                aliasAr=' + JSON.stringify(mapped.aliasAr))

  console.log('\n--- description ---')
  console.log('Payload value :', JSON.stringify(p.description))
  console.log('Mapped values : descriptionEn=' + JSON.stringify(mapped.descriptionEn))
  console.log('                descriptionFa=' + JSON.stringify(mapped.descriptionFa))
  console.log('                descriptionAr=' + JSON.stringify(mapped.descriptionAr))

  console.log('\n--- image (featuredImage) ---')
  console.log('Payload value :', JSON.stringify(p.featuredImage))
  console.log('Mapped value  :', JSON.stringify(mapped.image))

  console.log('\n--- images (gallery) ---')
  console.log('Payload value :', JSON.stringify(p.gallery))
  console.log('Mapped value  :', JSON.stringify(mapped.images))

  console.log('\n--- specs ---')
  console.log('Payload value :', JSON.stringify(p.specs))
  console.log('Mapped value  :', JSON.stringify(mapped.specs))

  console.log('\n--- category ---')
  console.log('Payload value :', JSON.stringify(p.category))
  console.log('Mapped value  :', JSON.stringify(mapped.category))

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
