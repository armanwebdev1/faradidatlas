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
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
    depth: 2,
  })

  return products.docs.map((p) => ({
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
}

export async function getProductBySlug(
  slug: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 1,
    depth: 2,
  })

  const p = products.docs[0]
  if (!p) return null

  return {
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
}

export async function getProductsByCategory(
  category: string,
  locale: string = 'en',
) {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: category } },
    limit: 1,
  })

  if (!categories.docs[0]) return []

  const products = await payload.find({
    collection: 'products',
    where: { category: { equals: categories.docs[0].id } },
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
    depth: 2,
  })

  return products.docs.map((p) => ({
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
}

export async function getCategories(locale: string = 'en') {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

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
