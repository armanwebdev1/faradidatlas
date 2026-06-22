"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
import {
  categoryLabels,
  productCategories,
  type Product,
  type ProductCategory,
} from "./product-data";
import { Filters } from "./filters";
import { Sorting, type ProductSortValue } from "./sorting";
import { ProductCard } from "./product-card";

interface ProductsContentProps {
  lang: Language;
  products: Product[];
  initialQuery?: string;
  initialCategory?: ProductCategory | null;
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
    product.aliasEn,
    product.aliasFa,
    product.descriptionEn,
    product.descriptionFa,
    category.en,
    category.fa,
    product.category,
  ]
    .filter(Boolean)
    .join(" ");
}

function sortProducts(
  products: Product[],
  sortValue: ProductSortValue,
  lang: Language,
) {
  const sorted = [...products];

  switch (sortValue) {
    case "name-asc":
      return sorted.sort((a, b) => {
        const aName = lang === "en" ? a.nameEn : a.nameFa;
        const bName = lang === "en" ? b.nameEn : b.nameFa;
        return aName.localeCompare(bName);
      });
    case "name-desc":
      return sorted.sort((a, b) => {
        const aName = lang === "en" ? a.nameEn : a.nameFa;
        const bName = lang === "en" ? b.nameEn : b.nameFa;
        return bName.localeCompare(aName);
      });
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
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

export function ProductsContent({
  lang,
  products,
  initialQuery = "",
  initialCategory = null,
}: ProductsContentProps) {
  const [clientQuery, setClientQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(initialCategory);
  const [sortValue, setSortValue] = useState<ProductSortValue>("relevance");

  useEffect(() => {
    const syncQueryFromUrl = () => {
      const url = new URL(window.location.href);
      setClientQuery(url.searchParams.get("q") ?? initialQuery);
      setSelectedCategory(readCategoryFromUrl(url.searchParams));
    };
    const frame = window.requestAnimationFrame(syncQueryFromUrl);

    window.addEventListener("popstate", syncQueryFromUrl);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", syncQueryFromUrl);
    };
  }, [initialQuery]);

  const handleCategoryChange = (category: ProductCategory | null) => {
    setSelectedCategory(category);

    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set("category", category);
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const query = clientQuery.trim();
  const searchedProducts = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) return products;

    return products.filter((product) =>
      normalizeSearchText(productSearchText(product)).includes(
        normalizedQuery,
      ),
    );
  }, [products, query]);
  const categoryFilteredProducts = useMemo(() => {
    if (!selectedCategory) return searchedProducts;

    return searchedProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }, [searchedProducts, selectedCategory]);
  const visibleProducts = useMemo(
    () => sortProducts(categoryFilteredProducts, sortValue, lang),
    [categoryFilteredProducts, lang, sortValue],
  );

  return (
    <section
      id="product-catalog"
      className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">
                {lang === "en" ? "Filter" : "فیلتر"}
              </h3>
              <Filters
                key={selectedCategory ?? "all"}
                lang={lang}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-10 sm:mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {lang === "en" ? "Core Portfolio" : "سبد اصلی"}
                </span>
                {query && (
                  <p className="mt-2 text-sm text-foreground/65">
                    {lang === "en" ? "Search" : "جستجو"}:{" "}
                    <span className="font-medium text-foreground">
                      {query}
                    </span>
                  </p>
                )}
              </div>
              <Sorting
                lang={lang}
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
                    <ProductCard product={product} lang={lang} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 md:py-28">
                <p className="text-base sm:text-lg text-muted-foreground">
                  {lang === "en" ? "No products found" : "محصولی پیدا نشد"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
