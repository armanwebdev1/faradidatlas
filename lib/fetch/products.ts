import { cache } from "react";
import { getPayloadClient } from "../payload";
import type {
  Product,
  ProductCategory,
  ProductSpec,
} from "../../components/products/product-data";
import { productCategories } from "../../components/products/product-data";

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
  howWeSupplyDescription: true,
  specs: true,
  seo: true,
} as const;

export const getProducts = cache(async function getProducts(locale: string = "en", draft: boolean = false) {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    limit: 100,
    depth: 1,
    draft,
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

export const getProductBySlug = cache(async function getProductBySlug(slug: string, locale: string = "en", draft: boolean = false) {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft,
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
    howWeSupplyDescription: (p as any).howWeSupplyDescription ?? undefined,
  } as Product;

  return mapped;
});

export async function getProductsByCategory(
  category: string,
  locale: string = "en",
  draft: boolean = false,
) {
  const payload = await getPayloadClient();

  const products = await payload.find({
    collection: "products",
    locale: "all",
    where: { "category.slug": { equals: category } },
    limit: 100,
    depth: 1,
    draft,
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
}

export const getCategories = cache(async function getCategories(locale: string = "en", draft: boolean = false) {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "categories",
    locale: locale as "en" | "fa" | "ar",
    limit: 100,
    depth: 0,
    draft,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      icon: true,
      image: true,
      ordering: true,
      seo: true,
    },
  });

  return categories.docs;
});

export const getRelatedProducts = cache(async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  locale: string = "en",
  draft: boolean = false,
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
    draft,
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
  if (typeof category === "string")
    return (productCategories as string[]).includes(category)
      ? (category as ProductCategory)
      : "rice";
  if (typeof category === "object" && category.slug)
    return (productCategories as string[]).includes(category.slug)
      ? (category.slug as ProductCategory)
      : "rice";
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
