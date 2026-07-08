import { getPayloadClient } from '../payload'
import type { Product, ProductCategory, ProductSpec } from '../../components/products/product-data'

const categorySlugMap: Record<string, ProductCategory> = {
  rice: 'rice',
  legumes: 'legumes',
  seeds: 'seeds',
  nuts: 'nuts',
  spices: 'spices',
  sugar: 'sugar',
}

export async function getProducts(locale: string = 'en') {
  console.log(`\n[INSTR] getProducts ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()
  console.log(`[INSTR] getProducts payload ready  ${Date.now() - t}ms`)

  const t2 = Date.now()
  const products = await payload.find({
    collection: 'products',
    locale: 'all',
    limit: 100,
    depth: 2,
  })
  console.log(`[INSTR] getProducts payload.find done  ${Date.now() - t2}ms`)
  console.log(`[INSTR] getProducts sample typeof name=${typeof (products.docs[0] as any)?.name}  name=${JSON.stringify((products.docs[0] as any)?.name)}`)

  const result = products.docs.map((p) => ({
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
  })) as Product[]

  console.log(`[INSTR] getProducts EXIT  ${Date.now() - t}ms  docs=${result.length}`)
  return result
}

export async function getProductBySlug(
  slug: string,
  locale: string = 'en',
) {
  console.log(`\n[INSTR] getProductBySlug("${slug}") ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()
  console.log(`[INSTR] getProductBySlug payload ready  ${Date.now() - t}ms`)

  const t2 = Date.now()
  const products = await payload.find({
    collection: 'products',
    locale: 'all',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  console.log(`[INSTR] getProductBySlug payload.find done  ${Date.now() - t2}ms`)
  console.log(`[INSTR] getProductBySlug sample typeof name=${typeof (products.docs[0] as any)?.name}  name=${JSON.stringify((products.docs[0] as any)?.name)}`)

  const p = products.docs[0]
  if (!p) {
    console.log(`[INSTR] getProductBySlug EXIT (not found)  ${Date.now() - t}ms`)
    return null
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
  } as Product

  console.log(`[INSTR] getProductBySlug EXIT  ${Date.now() - t}ms`)
  return mapped
}

export async function getProductsByCategory(
  category: string,
  locale: string = 'en',
) {
  console.log(`\n[INSTR] getProductsByCategory("${category}") ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: category } },
    limit: 1,
  })

  if (!categories.docs[0]) return []

  const products = await payload.find({
    collection: 'products',
    locale: 'all',
    where: { category: { equals: categories.docs[0].id } },
    limit: 100,
    depth: 2,
  })
  console.log(`[INSTR] getProductsByCategory sample typeof name=${typeof (products.docs[0] as any)?.name}  name=${JSON.stringify((products.docs[0] as any)?.name)}`)

  const result = products.docs.map((p) => ({
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
  })) as Product[]

  console.log(`[INSTR] getProductsByCategory EXIT  ${Date.now() - t}ms`)
  return result
}

export async function getCategories(locale: string = 'en') {
  console.log(`\n[INSTR] getCategories ENTER  caller=${new Error().stack?.split('\n')[2]?.trim()}`)
  const t = Date.now()
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  console.log(`[INSTR] getCategories EXIT  ${Date.now() - t}ms`)
  return categories.docs
}

function resolveCategory(category: any): ProductCategory {
  if (!category) return 'rice'
  if (typeof category === 'string') return categorySlugMap[category] ?? 'rice'
  if (typeof category === 'object' && category.slug) return categorySlugMap[category.slug] ?? 'rice'
  return 'rice'
}

function resolveImageUrl(image: any): string | undefined {
  if (!image) return undefined
  if (typeof image === 'string') return image
  if (typeof image === 'object') {
    return image.url ?? image.filename ?? undefined
  }
  return undefined
}

function resolveSpecs(specs: any): ProductSpec[] {
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
