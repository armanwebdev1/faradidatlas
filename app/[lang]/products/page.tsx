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
        {/* Premium Hero Section - Small Height */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Subtle background accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-warm-gold/10 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent-warm-gold/5 to-transparent rounded-full blur-3xl -z-10" />

          <div className="max-w-6xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-warm-gold/15 rounded-full text-xs sm:text-sm font-bold text-accent-warm-gold mb-4 sm:mb-6 uppercase tracking-widest">
              {lang === "en" ? "Premium Collection" : "مجموعه برتر"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 tracking-tight font-hero text-balance">
              {lang === "en" ? "Our Products" : "محصولات ما"}
            </h1>
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-80" />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {lang === "en"
                ? "Explore our curated selection of premium food products, all certified for international export with exceptional quality standards."
                : "انتخاب برگزیده‌شده‌ی محصولات غذایی برتر ما را کاوش کنید، همه آنها برای صادرات بین‌المللی معتبر و با استانداردهای کیفیتی استثنایی هستند."}
            </p>
          </div>
        </section>

        {/* Hero Image - Optional small featured image */}
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&q=80"
                alt="Premium products showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Accent Divider */}
        <div className="flex justify-center py-4 sm:py-6 md:py-8">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
        </div>

        {/* Products Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Controls with improved responsive layout */}
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
              {/* Filters Sidebar */}
              <div className="lg:w-72 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-6 md:mb-8">
                    {lang === "en" ? "Filters" : "فیلترها"}
                  </h3>
                  <Filters
                    lang={lang}
                    products={products}
                    onFilter={handleFilter}
                  />
                </div>
              </div>

              {/* Products Display */}
              <div className="flex-1">
                {/* Header with sorting */}
                <div className="mb-10 md:mb-14 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-3">
                      {sortedProducts.length}{" "}
                      {lang === "en" ? "Products" : "محصول"}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      {lang === "en"
                        ? "All products are certified and ready for export"
                        : "تمام محصولات معتبر و آماده صادرات هستند"}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Sorting
                      lang={lang}
                      products={filteredProducts}
                      onSort={handleSort}
                    />
                  </div>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="text-center py-16 md:py-24">
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
