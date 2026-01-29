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
      image: "/featured1.jpg",
      description:
        "Hand-picked saffron threads with exceptional color and aroma.",
    },
    {
      id: 2,
      name: "Organic Dates",
      origin: "Iran, Yazd",
      grade: "Premium",
      image: "/featured2.png",
      description:
        "Sweet, succulent dates perfect for retail and food production.",
    },
    {
      id: 3,
      name: "Pistachios",
      origin: "Iran, Rafsanjan",
      grade: "Grade A",
      image: "/featured3.jpg",
      description:
        "Roasted and salted pistachios with premium quality control.",
    },
    {
      id: 4,
      name: "Dried Herbs",
      origin: "Iran, Various",
      grade: "Certified",
      image: "/featured4.jpg",
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
    <section
      id="products"
      className="space-responsive px-4 sm:px-6 bg-background/50"
    >
      <div className="container-wide">
        {/* Section heading - responsive */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-responsive-title text-primary mb-3 sm:mb-4">
            {lang === "en" ? "Signature Products" : "محصولات امضاء‌شده"}
          </h2>
          <p className="text-responsive-body text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Explore our most sought-after products, sourced directly from premium producers"
              : "محصولات پر تقاضای ما را بررسی کنید که مستقیماً از تولیدکنندگان برتر تامین می‌شوند"}
          </p>
        </div>

        {/* Products grid - responsive with improved touch targets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {productList.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/products/${product.id}`}
              className="group bg-white rounded-lg sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-amber-400 transition-all duration-500 hover:shadow-xl flex flex-col h-full"
            >
              {/* Image - responsive aspect ratio */}
              <div className="relative aspect-square sm:aspect-square bg-gray-200 overflow-hidden flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Grade badge - responsive positioning */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-amber-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold">
                  {product.grade}
                </div>
              </div>

              {/* Content - responsive padding */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary mb-1.5 sm:mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-700 mb-3 sm:mb-4 font-medium">
                  {product.origin}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Call to action - responsive */}
                <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors gap-1.5">
                  {lang === "en" ? "View Details" : "مشاهده جزئیات"}
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button - responsive and touch-friendly */}
        <div className="text-center mt-10 sm:mt-14 md:mt-16">
          <Link
            href={`/${lang}/products`}
            className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-primary text-white font-semibold text-sm sm:text-base rounded-full hover:bg-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/30 active:scale-95"
          >
            {lang === "en" ? "Explore All Products" : "مشاهده تمام محصولات"}
          </Link>
        </div>
      </div>
    </section>
  );
}
