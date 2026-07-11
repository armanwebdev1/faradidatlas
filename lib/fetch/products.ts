import { cache } from "react";
import { getPayloadClient } from "../payload";
import type {
  Product,
  ProductCategory,
  ProductSpec,
} from "../../components/products/product-data";

const categorySlugMap: Record<string, ProductCategory> = {
  rice: "rice",
  legumes: "legumes",
  seeds: "seeds",
  nuts: "nuts",
  spices: "spices",
  sugar: "sugar",
};

const listingSelect = {
  name: true,
  slug: true,
  category: true,
  brand: true,
  featuredImage: true,
  alias: true,
  description: true,
} as const;

const detailSelect = {
  name: true,
  slug: true,
  category: true,
  brand: true,
  featuredImage: true,
  gallery: true,
  alias: true,
  description: true,
  specs: true,
} as const;

export const getProducts = cache(async function getProducts(locale: string = "en") {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    limit: 100,
    depth: 1,
    select: listingSelect,
  });

  return products.docs.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameEn: (p.name as any)?.en ?? "",
    nameFa: (p.name as any)?.fa ?? "",
    nameAr: (p.name as any)?.ar ?? "",
    aliasEn: (p.alias as any)?.en ?? undefined,
    aliasFa: (p.alias as any)?.fa ?? undefined,
    aliasAr: (p.alias as any)?.ar ?? undefined,
    category: resolveCategory(p.category),
    descriptionEn: (p.description as any)?.en ?? "",
    descriptionFa: (p.description as any)?.fa ?? "",
    descriptionAr: (p.description as any)?.ar ?? "",
    image: resolveImageUrl(p.featuredImage),
    images: [] as string[],
    specs: [] as ProductSpec[],
  })) as Product[];
});

export const getProductBySlug = cache(async function getProductBySlug(slug: string, locale: string = "en") {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    select: detailSelect,
  });

  const p = products.docs[0];
  if (!p) return null;

  const mapped = {
    id: p.id,
    slug: p.slug,
    nameEn: (p.name as any)?.en ?? "",
    nameFa: (p.name as any)?.fa ?? "",
    nameAr: (p.name as any)?.ar ?? "",
    aliasEn: (p.alias as any)?.en ?? undefined,
    aliasFa: (p.alias as any)?.fa ?? undefined,
    aliasAr: (p.alias as any)?.ar ?? undefined,
    category: resolveCategory(p.category),
    descriptionEn: (p.description as any)?.en ?? "",
    descriptionFa: (p.description as any)?.fa ?? "",
    descriptionAr: (p.description as any)?.ar ?? "",
    image: resolveImageUrl(p.featuredImage),
    images: ((p.gallery as any[])
      ?.map((g: any) => resolveImageUrl(g.image))
      .filter(Boolean) ?? []) as string[],
    specs: resolveSpecs(p.specs),
  } as Product;

  return mapped;
});

export async function getProductsByCategory(
  category: string,
  locale: string = "en",
) {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "categories",
    where: { slug: { equals: category } },
    limit: 1,
    depth: 0,
    select: { id: true },
  });

  if (!categories.docs[0]) return [];

  const products = await payload.find({
    collection: "products",
    locale: "all",
    where: { category: { equals: categories.docs[0].id } },
    limit: 100,
    depth: 1,
    select: listingSelect,
  });

  const result = products.docs.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameEn: (p.name as any)?.en ?? "",
    nameFa: (p.name as any)?.fa ?? "",
    nameAr: (p.name as any)?.ar ?? "",
    aliasEn: (p.alias as any)?.en ?? undefined,
    aliasFa: (p.alias as any)?.fa ?? undefined,
    aliasAr: (p.alias as any)?.ar ?? undefined,
    category: resolveCategory(p.category),
    descriptionEn: (p.description as any)?.en ?? "",
    descriptionFa: (p.description as any)?.fa ?? "",
    descriptionAr: (p.description as any)?.ar ?? "",
    image: resolveImageUrl(p.featuredImage),
    images: [] as string[],
    specs: [] as ProductSpec[],
  })) as Product[];

  return result;
}

export const getCategories = cache(async function getCategories(locale: string = "en") {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "categories",
    locale: locale as "en" | "fa" | "ar",
    limit: 100,
  });

  return categories.docs;
});

export const getRelatedProducts = cache(async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  locale: string = "en",
) {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    where: {
      and: [
        { category: { equals: categoryId } },
        { id: { not_equals: excludeId } },
      ],
    },
    limit: 4,
    depth: 1,
    select: listingSelect,
  });

  const result = products.docs.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameEn: (p.name as any)?.en ?? "",
    nameFa: (p.name as any)?.fa ?? "",
    nameAr: (p.name as any)?.ar ?? "",
    aliasEn: (p.alias as any)?.en ?? undefined,
    aliasFa: (p.alias as any)?.fa ?? undefined,
    aliasAr: (p.alias as any)?.ar ?? undefined,
    category: resolveCategory(p.category),
    descriptionEn: (p.description as any)?.en ?? "",
    descriptionFa: (p.description as any)?.fa ?? "",
    descriptionAr: (p.description as any)?.ar ?? "",
    image: resolveImageUrl(p.featuredImage),
    images: [] as string[],
    specs: [] as ProductSpec[],
  })) as Product[];

  return result;
});

function resolveCategory(category: any): ProductCategory {
  if (!category) return "rice";
  if (typeof category === "string") return categorySlugMap[category] ?? "rice";
  if (typeof category === "object" && category.slug)
    return categorySlugMap[category.slug] ?? "rice";
  return "rice";
}

function resolveImageUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (typeof image === "object") {
    return image.url ?? image.filename ?? undefined;
  }
  return undefined;
}

function resolveSpecs(specs: any): ProductSpec[] {
  if (!specs || !Array.isArray(specs)) return [];
  return specs.map((spec: any) => ({
    label: {
      en: (spec.label as any)?.en ?? spec.label ?? "",
      fa: (spec.label as any)?.fa ?? spec.label ?? "",
      ar: (spec.label as any)?.ar ?? spec.label ?? "",
    },
    value: {
      en: (spec.value as any)?.en ?? spec.value ?? "",
      fa: (spec.value as any)?.fa ?? spec.value ?? "",
      ar: (spec.value as any)?.ar ?? spec.value ?? "",
    },
  }));
}
