"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocalizedText = {
  en: string;
  fa: string;
};

interface Product {
  id: number;
  name: LocalizedText;
  category: LocalizedText;
  image: OptimizedProductImage;
  description: LocalizedText;
}

interface OptimizedProductImage {
  avif: string;
  webp: string;
  fallback: string;
}

const productImageWidths = [640, 1280] as const;

function productImage(id: string): OptimizedProductImage {
  return {
    avif: productImageWidths
      .map((width) => `/signature-products/${id}-${width}.avif ${width}w`)
      .join(", "),
    webp: productImageWidths
      .map((width) => `/signature-products/${id}-${width}.webp ${width}w`)
      .join(", "),
    fallback: `/signature-products/${id}-640.webp`,
  };
}

const products: Product[] = [
  {
    id: 1,
    name: { en: "21 Rice Brand", fa: "برند برنج ۲۱" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("twenty-one"),
    description: {
      en: "One of Faradid Atlas' recognized rice brands, built around dependable quality and everyday availability.",
      fa: "یکی از برندهای شناخته‌شده برنج فرادید اطلس با تمرکز بر کیفیت قابل اتکا و دسترسی روزمره.",
    },
  },
  {
    id: 2,
    name: { en: "Mizban Rice", fa: "برنج میزبان" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("mizban"),
    description: {
      en: "A trusted rice line designed for households, retailers, and foodservice partners.",
      fa: "برندی قابل اعتماد برای خانواده‌ها، فروشگاه‌ها و شرکای خدمات غذایی.",
    },
  },
  {
    id: 3,
    name: { en: "Hayat Rice", fa: "برنج حیات" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("hayat"),
    description: {
      en: "Selected for consistent cooking quality, clear sourcing, and steady market supply.",
      fa: "انتخاب‌شده برای کیفیت پخت یکنواخت، تامین شفاف و عرضه پایدار در بازار.",
    },
  },
  {
    id: 4,
    name: { en: "Golbanou Rice", fa: "برنج گل‌بانو" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("golbanoo"),
    description: {
      en: "A familiar rice brand serving demand across Iran and the wider Middle East region.",
      fa: "برندی آشنا در بازار برنج برای پاسخ‌گویی به تقاضا در ایران و منطقه خاورمیانه.",
    },
  },
  {
    id: 5,
    name: { en: "Essential Food Staples", fa: "مواد غذایی اساسی" },
    category: { en: "Core Products", fa: "محصولات اصلی" },
    image: productImage("red-lentil"),
    description: {
      en: "Legumes, spices, nuts, seeds, sugar, and other essentials selected for dependable B2B supply.",
      fa: "حبوبات، ادویه‌جات، آجیل، دانه‌ها، شکر و سایر اقلام اساسی برای تامین B2B قابل اتکا.",
    },
  },
];

export function SignatureProducts() {
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as "en" | "fa") ?? "en";
  const isRTL = lang === "fa";
  const t = (value: LocalizedText) => value[lang];
  const textShiftClass = isRTL
    ? "-translate-x-4 sm:-translate-x-6 md:-translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
    : "translate-x-4 sm:translate-x-6 md:translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-8";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setHasEntered(true);
        if (!reduceMotion) {
          section.classList.add("animate-fade-in-up");
        }
        section.classList.remove("opacity-0", "translate-y-6");
        observer.unobserve(section);
      },
      { rootMargin: "260px 0px", threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoplay || !hasEntered) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [hasEntered, isAutoplay]);

  const handleNavigation = (newIndex: number) => {
    setIsTransitioning(true);
    setIsAutoplay(false);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToPrevious = () => {
    handleNavigation((currentIndex - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    handleNavigation((currentIndex + 1) % products.length);
  };

  const handleProductClick = () => {
    router.push(`/${lang}/products`);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 opacity-0 translate-y-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 animate-fade-in">
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Recognized Portfolio" : "سبد سرمایه‌گذاری معتبر"}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8">
            {lang === "en"
              ? "Brands and Core Products"
              : "برندها و محصولات اصلی"}
          </h2>
          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto mb-8">
            {lang === "en"
              ? "From rice brands to essential staples, our portfolio is shaped around reliable supply and consistent quality."
              : "از برندهای برنج تا اقلام غذایی اساسی، سبد ما بر پایه تامین پایدار و کیفیت یکنواخت شکل گرفته است."}
          </p>

          <button
            onClick={() => router.push(`/${lang}/products`)}
            className="btn btn-outline btn-md"
          >
            {lang === "en" ? "Explore All Products" : "مشاهده همه محصولات"}
          </button>
        </div>

        <div className="relative">
          <div className="relative h-80 sm:h-96 md:h-[480px] lg:h-[540px] overflow-hidden rounded-2xl sm:rounded-3xl">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={handleProductClick}
                  className="relative h-full w-full bg-muted overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={
                    lang === "en"
                      ? `View ${t(product.name)} products`
                      : `مشاهده محصولات ${t(product.name)}`
                  }
                >
                  {hasEntered && (
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={product.image.avif}
                        sizes="100vw"
                      />
                      <source
                        type="image/webp"
                        srcSet={product.image.webp}
                        sizes="100vw"
                      />
                      <img
                        src={product.image.fallback}
                        alt={t(product.name)}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                          index === currentIndex && !isTransitioning
                            ? "scale-100"
                            : "scale-105"
                        }`}
                      />
                    </picture>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
                </button>

                <div
                  className={`absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-10 lg:p-12 pointer-events-none transform-gpu ${textShiftClass}`}
                >
                  <div
                    className={`transition-all duration-700 transform ${
                      index === currentIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="eyebrow text-accent">
                      {t(product.category)}
                    </span>
                    <h3 className="text-responsive-subheading text-white my-3 sm:my-4">
                      {t(product.name)}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm sm:text-base md:text-base leading-relaxed max-w-2xl">
                      {t(product.description)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 md:px-8 pointer-events-none z-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 flex items-center justify-center"
                aria-label={lang === "en" ? "Previous product" : "محصول قبلی"}
              >
                {isRTL ? (
                  <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                ) : (
                  <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="pointer-events-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 flex items-center justify-center"
                aria-label={lang === "en" ? "Next product" : "محصول بعدی"}
              >
                {isRTL ? (
                  <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                ) : (
                  <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-8 sm:w-10 md:w-12 h-2 bg-foreground"
                    : "w-2 h-2 bg-foreground/25 hover:bg-foreground/40"
                }`}
                aria-label={
                  lang === "en"
                    ? `Go to product ${index + 1}`
                    : `رفتن به محصول ${index + 1}`
                }
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoplay(!isAutoplay)}
            >
              {isAutoplay
                ? lang === "en"
                  ? "Pause"
                  : "توقف"
                : lang === "en"
                  ? "Play"
                  : "پخش"}
            </Button>
            <span className="text-xs sm:text-sm text-foreground/60">
              {currentIndex + 1} / {products.length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
