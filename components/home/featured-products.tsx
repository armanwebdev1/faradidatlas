"use client";

import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/lib/i18n";

interface FeaturedProductsProps {
  lang: Language;
}

const products = {
  en: [
    {
      id: 1,
      name: "Premium Saffron",
      origin: "Iran, Khorasan",
      grade: "Grade A",
      image:
        "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description:
        "Hand-picked saffron threads with exceptional color and aroma.",
    },
    {
      id: 2,
      name: "Organic Dates",
      origin: "Iran, Yazd",
      grade: "Premium",
      image:
        "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description:
        "Sweet, succulent dates perfect for retail and food production.",
    },
    {
      id: 3,
      name: "Pistachios",
      origin: "Iran, Rafsanjan",
      grade: "Grade A",
      image:
        "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description:
        "Roasted and salted pistachios with premium quality control.",
    },
    {
      id: 4,
      name: "Dried Herbs",
      origin: "Iran, Various",
      grade: "Certified",
      image:
        "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description:
        "Aromatic dried herbs and spices for culinary and industrial use.",
    },
  ],
  fa: [
    {
      id: 1,
      name: "زعفران پرمیوم",
      origin: "ایران، خراسان",
      grade: "درجه اول",
      image:
        "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "رشته‌های زعفران دستچین با رنگ و بوی استثنایی.",
    },
    {
      id: 2,
      name: "خرما ارگانیک",
      origin: "ایران، یزد",
      grade: "بسیار خوب",
      image:
        "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "خرماهای شیرین و نرم برای فروش خرده‌ای و تولید مواد غذایی.",
    },
    {
      id: 3,
      name: "فستق",
      origin: "ایران، رفسنجان",
      grade: "درجه اول",
      image:
        "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=500&h=500&fit=crop",
      description: "فستق‌های سرخ شده و شور با کنترل کیفیت بسیار خوب.",
    },
    {
      id: 4,
      name: "گیاهان خشک",
      origin: "ایران، مختلف",
      grade: "معتبر",
      image:
        "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=500&h=500&fit=crop",
      description: "گیاهان خشک معطر و ادویه برای استفاده آشپزی و صنعتی.",
    },
  ],
};

export function FeaturedProducts({ lang }: FeaturedProductsProps) {
  const isRTL = lang === "fa";
  const productList = lang === "en" ? products.en : products.fa;

  return (
    <section id="products" className="py-32 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Signature Products
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            {lang === "en"
              ? "Explore our most sought-after products, sourced directly from premium producers"
              : "محصولات پر تقاضای ما را بررسی کنید که مستقیماً از تولیدکنندگان برتر تامین می‌شوند"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productList.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-border/30 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10"
            >
              <div className="relative aspect-square bg-gray-200 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-xs font-semibold">
                  {product.grade}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral mb-4">{product.origin}</p>
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                <Link
                  href={`/${lang}/products/${product.id}`}
                  className="inline-block text-sm font-semibold text-accent hover:text-accent-warm-orange transition-colors duration-300"
                >
                  {lang === "en" ? "View Details →" : "مشاهده جزئیات →"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href={`/${lang}/products`}
            className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
          >
            {lang === "en" ? "Explore All Products" : "مشاهده تمام محصولات"}
          </Link>
        </div>
      </div>
    </section>
  );
}
