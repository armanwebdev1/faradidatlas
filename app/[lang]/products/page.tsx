"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Filters } from "@/components/products/filters";
import { Sorting } from "@/components/products/sorting";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/components/products/product-data";
import type { Language } from "@/lib/i18n";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductsPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const isRTL = lang === "fa";
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleFilter = (filtered: typeof products) => {
    setFilteredProducts(filtered);
    setSortedProducts(filtered);
  };

  const handleSort = (sorted: typeof products) => {
    setSortedProducts(sorted);
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Small Hero Image */}
        <section className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1600&h=400&fit=crop"
            alt="Premium products showcase"
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* Minimal Page Header */}
        <section className="px-4 sm:px-6 py-8 sm:py-10 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-8">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-primary tracking-tight mb-2">
                  {lang === "en" ? "Products" : "محصولات"}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-light">
                  {lang === "en"
                    ? "All products are certified and ready for export"
                    : "تمام محصولات معتبر و آماده صادرات هستند"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-600">{sortedProducts.length}</span>
                  <span className="text-gray-600">
                    {lang === "en" ? "Result" : "نتیجه"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section with Sidebar */}
        <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
              {/* Filters Sidebar */}
              <div className="lg:w-56 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-sm font-semibold text-primary mb-6 uppercase tracking-wide">
                    {lang === "en" ? "Filter" : "فیلتر"}
                  </h3>
                  <Filters
                    lang={lang}
                    products={products}
                    onFilter={handleFilter}
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Sorting Header */}
                <div className="mb-8 sm:mb-10 flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                    {lang === "en" ? "Best Seller" : "پرفروش‌ترین"}
                  </span>
                  <Sorting
                    lang={lang}
                    products={filteredProducts}
                    onSort={handleSort}
                  />
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {sortedProducts.map((product, idx) => (
                      <div
                        key={product.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                      >
                        <ProductCard product={product} lang={lang} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 md:py-24">
                    <p className="text-sm sm:text-base text-gray-600">
                      {lang === "en" ? "No products found" : "محصولی پیدا نشد"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
