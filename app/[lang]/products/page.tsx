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
        {/* Hero Section with Overlay Content */}
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1600&h=400&fit=crop"
            alt="Premium products showcase"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
                {/* Left - Heading */}
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-hero">
                    {lang === "en" ? "Our Products" : "محصولات ما"}
                  </h1>
                </div>

                {/* Right - Description */}
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                    {lang === "en"
                      ? "Discover our curated collection of premium products, all certified and ready for export"
                      : "مجموعه برگزیده‌شده‌ی محصولات برتر ما را کاوش کنید، همه آنها معتبر و آماده صادرات"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section with Sidebar */}
        <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
              {/* Filters Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">
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
                <div className="mb-10 sm:mb-12 flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
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
                    <p className="text-base sm:text-lg text-gray-600">
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
