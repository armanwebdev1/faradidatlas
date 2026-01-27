"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Filters } from "@/components/products/filters"
import { Sorting } from "@/components/products/sorting"
import { ProductCard } from "@/components/products/product-card"
import { products } from "@/components/products/product-data"
import type { Language } from "@/lib/i18n"
import { useParams } from "next/navigation"

export default function ProductsPage() {
  const params = useParams()
  const lang = (params.lang as Language) || "en"
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortedProducts, setSortedProducts] = useState(products)

  const handleFilter = (filtered: typeof products) => {
    setFilteredProducts(filtered)
    setSortedProducts(filtered)
  }

  const handleSort = (sorted: typeof products) => {
    setSortedProducts(sorted)
  }

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 inline-block px-4 py-2 bg-amber-100/50 rounded-full border border-amber-200/50">
              <span className="text-sm font-semibold text-primary">
                {lang === "en" ? "Premium Selection" : "انتخاب برتر"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
              {lang === "en" ? "Our Products" : "محصولات ما"}
            </h1>
            <div className="divider-premium w-24 h-1 mb-8" />
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Browse our complete catalog of premium food products, all certified for international export with exceptional quality standards."
                : "کاتالوگ کامل محصولات غذایی برتر ما را مرور کنید، همه‌ی آنها برای صادرات بین‌المللی معتبر و با استانداردهای کیفیتی استثنایی هستند."}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <div className="lg:w-72 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-lg font-semibold text-primary mb-6">
                    {lang === "en" ? "Filters" : "فیلترها"}
                  </h3>
                  <Filters lang={lang} products={products} onFilter={handleFilter} />
                </div>
              </div>

              <div className="flex-1">
                {/* Sorting */}
                <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-3">
                      {sortedProducts.length} {lang === "en" ? "Products" : "محصول"}
                    </h2>
                    <p className="text-gray-600">
                      {lang === "en"
                        ? "All products are certified and ready for export"
                        : "تمام محصولات معتبر و آماده صادرات هستند"}
                    </p>
                  </div>
                  <Sorting lang={lang} products={filteredProducts} onSort={handleSort} />
                </div>

                {/* Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map((product, idx) => (
                      <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <ProductCard product={product} lang={lang} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-gray-600">{lang === "en" ? "No products found" : "محصولی پیدا نشد"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
