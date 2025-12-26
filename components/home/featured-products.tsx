"use client"

import Image from "next/image"
import Link from "next/link"
import type { Language } from "@/lib/i18n"

interface FeaturedProductsProps {
  lang: Language
}

const products = {
  en: [
    {
      id: 1,
      name: "Premium Saffron",
      origin: "Iran, Khorasan",
      grade: "Grade A",
      image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "Hand-picked saffron threads with exceptional color and aroma.",
    },
    {
      id: 2,
      name: "Organic Dates",
      origin: "Iran, Yazd",
      grade: "Premium",
      image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "Sweet, succulent dates perfect for retail and food production.",
    },
    {
      id: 3,
      name: "Pistachios",
      origin: "Iran, Rafsanjan",
      grade: "Grade A",
      image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "Roasted and salted pistachios with premium quality control.",
    },
    {
      id: 4,
      name: "Dried Herbs",
      origin: "Iran, Various",
      grade: "Certified",
      image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "Aromatic dried herbs and spices for culinary and industrial use.",
    },
  ],
  fa: [
    {
      id: 1,
      name: "زعفران پرمیوم",
      origin: "ایران، خراسان",
      grade: "درجه اول",
      image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "رشته‌های زعفران دستچین با رنگ و بوی استثنایی.",
    },
    {
      id: 2,
      name: "خرما ارگانیک",
      origin: "ایران، یزد",
      grade: "بسیار خوب",
      image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "خرماهای شیرین و نرم برای فروش خرده‌ای و تولید مواد غذایی.",
    },
    {
      id: 3,
      name: "فستق",
      origin: "ایران، رفسنجان",
      grade: "درجه اول",
      image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "فستق‌های سرخ شده و شور با کنترل کیفیت بسیار خوب.",
    },
    {
      id: 4,
      name: "گیاهان خشک",
      origin: "ایران، مختلف",
      grade: "معتبر",
      image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "گیاهان خشک معطر و ادویه برای استفاده آشپزی و صنعتی.",
    },
  ],
}

export function FeaturedProducts({ lang }: FeaturedProductsProps) {
  const isRTL = lang === "fa"
  const productList = lang === "en" ? products.en : products.fa

  return (
    <section id="products" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Signature Products</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Explore our most sought-after products, sourced directly from premium producers"
            : "محصولات پر تقاضای ما را بررسی کنید که مستقیماً از تولیدکنندگان برتر تامین می‌شوند"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-square bg-gray-200">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-accent-warm-gold text-white px-3 py-1 rounded text-xs font-semibold">
                  {product.grade}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">{product.name}</h3>
                <p className="text-sm text-neutral mb-3">{product.origin}</p>
                <p className="text-sm text-foreground leading-relaxed mb-4">{product.description}</p>
                <Link
                  href={`/${lang}/products/${product.id}`}
                  className="inline-block text-sm font-medium text-accent-warm-orange hover:text-accent-warm-red transition-colors"
                >
                  {lang === "en" ? "View Details" : "مشاهده جزئیات"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${lang}/products`}
            className="inline-block px-8 py-3 bg-primary text-white font-medium rounded hover:bg-accent-warm-orange transition-colors"
          >
            {lang === "en" ? "Explore All Products" : "مشاهده تمام محصولات"}
          </Link>
        </div>
      </div>
    </section>
  )
}
