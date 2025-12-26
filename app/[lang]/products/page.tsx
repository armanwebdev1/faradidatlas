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
        <section className="py-12 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              {lang === "en" ? "Our Products" : "محصولات ما"}
            </h1>
            <p className="text-lg text-neutral max-w-2xl">
              {lang === "en"
                ? "Browse our complete catalog of premium food products, all certified for international export."
                : "کاتالوگ کامل محصولات غذایی برتر ما را مرور کنید، همه‌ی آنها برای صادرات بین‌المللی معتبر هستند."}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              <div className="lg:w-64 flex-shrink-0">
                <Filters lang={lang} products={products} onFilter={handleFilter} />
              </div>

              <div className="flex-1">
                {/* Sorting */}
                <div className="mb-8 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {sortedProducts.length} {lang === "en" ? "Products" : "محصول"}
                    </h2>
                    <p className="text-sm text-neutral">
                      {lang === "en"
                        ? "All products are certified and ready for export"
                        : "تمام محصولات معتبر و آماده صادرات هستند"}
                    </p>
                  </div>
                  <Sorting lang={lang} products={filteredProducts} onSort={handleSort} />
                </div>

                {/* Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} lang={lang} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-neutral">{lang === "en" ? "No products found" : "محصولی پیدا نشد"}</p>
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
