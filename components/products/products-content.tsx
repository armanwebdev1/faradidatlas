"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import {
  categoryLabels,
  getProductBrand,
  getProductType,
  productBrands,
  productCategories,
  productBrandLabels,
  productTypes,
  productTypeLabels,
  type Product,
  type ProductBrand,
  type ProductCategory,
  type ProductType,
} from "./product-data";
import { Filters, type ProductFilterSelection } from "./filters";
import { Sorting, type ProductSortValue } from "./sorting";
import { ProductCard } from "./product-card";
import { CategoryDescription } from "./category-description";

interface ProductsContentProps {
  lang: Language;
  t: (typeof translations)[Language];
  products: Product[];
  initialQuery?: string;
  initialCategory?: ProductCategory | null;
  initialBrand?: ProductBrand | null;
  initialType?: ProductType | null;
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function productSearchText(product: Product) {
  const category = categoryLabels[product.category];

  return [
    product.nameEn,
    product.nameFa,
    product.nameAr,
    product.aliasEn,
    product.aliasFa,
    product.aliasAr,
    product.descriptionEn,
    product.descriptionFa,
    product.descriptionAr,
    category.en,
    category.fa,
    category.ar,
    productBrandLabels[getProductBrand(product)].en,
    productBrandLabels[getProductBrand(product)].fa,
    productBrandLabels[getProductBrand(product)].ar,
    productTypeLabels[getProductType(product)].en,
    productTypeLabels[getProductType(product)].fa,
    productTypeLabels[getProductType(product)].ar,
    product.category,
  ]
    .filter(Boolean)
    .join(" ");
}

function sortProducts(products: Product[], sortValue: ProductSortValue) {
  const sorted = [...products];

  switch (sortValue) {
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);

    case "brand":
      return sorted.sort((a, b) => {
        const brandA = productBrandLabels[getProductBrand(a)].en;
        const brandB = productBrandLabels[getProductBrand(b)].en;

        return brandA.localeCompare(brandB);
      });

    case "relevance":
    default:
      return sorted;
  }
}
function readCategoryFromUrl(searchParams: URLSearchParams) {
  const category = searchParams.get("category");

  return productCategories.includes(category as ProductCategory)
    ? (category as ProductCategory)
    : null;
}

function readBrandFromUrl(searchParams: URLSearchParams) {
  const brand = searchParams.get("brand");

  return productBrands.includes(brand as ProductBrand)
    ? (brand as ProductBrand)
    : null;
}

function readTypeFromUrl(searchParams: URLSearchParams) {
  const type = searchParams.get("type");

  return productTypes.includes(type as ProductType)
    ? (type as ProductType)
    : null;
}

export function ProductsContent({
  lang,
  t,
  products,
  initialQuery = "",
  initialCategory = null,
  initialBrand = null,
  initialType = null,
}: ProductsContentProps) {
  const [clientQuery, setClientQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<ProductBrand | null>(
    initialBrand,
  );
  const [selectedType, setSelectedType] = useState<ProductType | null>(
    initialType,
  );
  const [sortValue, setSortValue] = useState<ProductSortValue>("relevance");
  const deferredQuery = useDeferredValue(clientQuery);

  useEffect(() => {
    const syncQueryFromUrl = () => {
      const url = new URL(window.location.href);
      setClientQuery(url.searchParams.get("q") ?? initialQuery);
      setSelectedCategory(readCategoryFromUrl(url.searchParams));
      setSelectedBrand(readBrandFromUrl(url.searchParams));
      setSelectedType(readTypeFromUrl(url.searchParams));
    };
    const frame = window.requestAnimationFrame(syncQueryFromUrl);

    window.addEventListener("popstate", syncQueryFromUrl);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", syncQueryFromUrl);
    };
  }, [initialQuery, initialCategory, initialBrand, initialType]);

  const handleFiltersChange = (filters: ProductFilterSelection) => {
    setSelectedCategory(filters.category);
    setSelectedBrand(filters.brand);
    setSelectedType(filters.type);

    const url = new URL(window.location.href);
    if (filters.category) {
      url.searchParams.set("category", filters.category);
    } else {
      url.searchParams.delete("category");
    }

    if (filters.brand) {
      url.searchParams.set("brand", filters.brand);
    } else {
      url.searchParams.delete("brand");
    }

    if (filters.type) {
      url.searchParams.set("type", filters.type);
    } else {
      url.searchParams.delete("type");
    }

    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  };

  const availableCategories = useMemo(
    () =>
      productCategories.filter((category) =>
        products.some((product) => product.category === category),
      ),
    [products],
  );
  const availableBrands = useMemo(
    () =>
      productBrands.filter((brand) =>
        products.some((product) => getProductBrand(product) === brand),
      ),
    [products],
  );
  const availableTypes = useMemo(
    () =>
      productTypes.filter((type) =>
        products.some((product) => getProductType(product) === type),
      ),
    [products],
  );

  const searchIndex = useMemo(
    () =>
      products.map((product) => ({
        product,
        text: normalizeSearchText(productSearchText(product)),
      })),
    [products],
  );
  const query = deferredQuery.trim();
  const searchedProducts = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) return products;

    return searchIndex
      .filter((item) => item.text.includes(normalizedQuery))
      .map((item) => item.product);
  }, [products, query, searchIndex]);
  const filteredProducts = useMemo(
    () =>
      searchedProducts.filter((product) => {
        const categoryMatches =
          !selectedCategory || product.category === selectedCategory;
        const brandMatches =
          !selectedBrand || getProductBrand(product) === selectedBrand;
        const typeMatches =
          !selectedType || getProductType(product) === selectedType;

        return categoryMatches && brandMatches && typeMatches;
      }),
    [searchedProducts, selectedBrand, selectedCategory, selectedType],
  );
  const visibleProducts = useMemo(
    () => sortProducts(filteredProducts, sortValue),
    [filteredProducts, sortValue],
  );
  const activeFilterLabels = [
    selectedCategory ? categoryLabels[selectedCategory][lang] : null,
    selectedBrand ? productBrandLabels[selectedBrand][lang] : null,
    selectedType ? productTypeLabels[selectedType][lang] : null,
  ].filter(Boolean);

  return (
    <section
      id="product-catalog"
      className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-linear-to-b from-background to-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
          <div className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">
                {t.common.filter}
              </h2>
              <Filters
                key={`${selectedCategory ?? "all"}-${selectedBrand ?? "all"}-${
                  selectedType ?? "all"
                }`}
                lang={lang}
                t={t}
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                selectedType={selectedType}
                categoryOptions={availableCategories}
                brandOptions={availableBrands}
                typeOptions={availableTypes}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          <div className="flex-1">
            {selectedCategory && (
              <CategoryDescription lang={lang} category={selectedCategory} />
            )}
            <div className="mb-10 sm:mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t.pages.products.corePortfolio}
                </span>
                {query && (
                  <p className="mt-2 text-sm text-foreground/65">
                    {t.common.search}:{" "}
                    <span className="font-medium text-foreground">{query}</span>
                  </p>
                )}
                {activeFilterLabels.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeFilterLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-foreground/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Sorting
                lang={lang}
                t={t}
                value={sortValue}
                onChange={setSortValue}
              />
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {visibleProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <ProductCard product={product} lang={lang} t={t} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 md:py-28">
                <p className="text-base sm:text-lg text-muted-foreground">
                  {t.pages.products.noProducts}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
