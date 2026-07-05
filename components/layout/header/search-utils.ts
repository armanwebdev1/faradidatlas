import {
  categoryLabels,
  getProductBrand,
  getProductType,
  productBrandLabels,
  productTypeLabels,
  type Product,
} from "@/components/products/product-data";

export function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function productSearchText(product: Product) {
  const category = categoryLabels[product.category];
  const brand = productBrandLabels[getProductBrand(product)];
  const type = productTypeLabels[getProductType(product)];

  return [
    product.slug,
    product.nameEn,
    product.nameFa,
    product.aliasEn,
    product.aliasFa,
    product.descriptionEn,
    product.descriptionFa,
    category.en,
    category.fa,
    brand.en,
    brand.fa,
    type.en,
    type.fa,
    product.category,
  ]
    .filter(Boolean)
    .join(" ");
}

export type ProductSearchEntry = {
  product: Product;
  text: string;
};

export function searchProducts(query: string, entries: ProductSearchEntry[]) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return [];

  return entries
    .filter((entry) => entry.text.includes(normalizedQuery))
    .map((entry) => entry.product);
}
