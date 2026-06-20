"use client";

import { useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
import { categoryLabels, type Product } from "./product-data";
import { Filters } from "./filters";
import { Sorting } from "./sorting";
import { ProductCard } from "./product-card";

interface ProductsContentProps {
  lang: Language;
  products: Product[];
  initialQuery?: string;
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

export function ProductsContent(props: ProductsContentProps) {
  return (
    <ProductsContentInner
      key={props.initialQuery ?? ""}
      {...props}
    />
  );
}

function ProductsContentInner({
  lang,
  products,
  initialQuery = "",
}: ProductsContentProps) {
  const query = initialQuery.trim();
  const searchedProducts = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) return products;

    return products.filter((product) =>
      normalizeSearchText(productSearchText(product)).includes(
        normalizedQuery,
      ),
    );
  }, [products, query]);
  const [filteredProducts, setFilteredProducts] = useState(searchedProducts);
  const [sortedProducts, setSortedProducts] = useState(searchedProducts);

  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    setSortedProducts(filtered);
  };

  const handleSort = (sorted: Product[]) => {
    setSortedProducts(sorted);
  };

  return (
    <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">
                {lang === "en" ? "Filter" : "فیلتر"}
              </h3>
              <Filters
                lang={lang}
                products={searchedProducts}
                onFilter={handleFilter}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-10 sm:mb-12 flex justify-between items-center gap-4">
              <div>
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
                products={filteredProducts}
                onSort={handleSort}
              />
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {sortedProducts.map((product, idx) => (
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
