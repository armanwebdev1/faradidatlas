"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  image: string;
  description: LocalizedText;
}

const products: Product[] = [
  {
    id: 1,
    name: { en: "Heritage Spice Blend", fa: "ترکیب ادویه اصیل" },
    category: { en: "Premium Spices", fa: "ادویه‌های ممتاز" },
    image: "/featured1.jpg",
    description: {
      en: "Carefully curated blend of the finest spices from around the world",
      fa: "ترکیبی دقیق از بهترین ادویه‌های سراسر جهان",
    },
  },
  {
    id: 2,
    name: { en: "Golden Olive Oil", fa: "روغن زیتون طلایی" },
    category: { en: "Specialty Oils", fa: "روغن‌های ویژه" },
    image: "/featured2.jpg",
    description: {
      en: "Cold-pressed extra virgin olive oil from Mediterranean estates",
      fa: "روغن زیتون فرابکر سرد‌فشار از باغ‌های مدیترانه‌ای",
    },
  },
  {
    id: 3,
    name: { en: "Artisan Coffee Selection", fa: "گزینش قهوه هنرمندانه" },
    category: { en: "Premium Coffee", fa: "قهوه ممتاز" },
    image: "/featured3.jpg",
    description: {
      en: "Single-origin, hand-roasted coffee beans from exclusive plantations",
      fa: "دانه‌های قهوه تک‌خاستگاه، برشته‌کاری دستی از مزارع منتخب",
    },
  },
  {
    id: 4,
    name: { en: "Saffron Reserve", fa: "ذخیره زعفران" },
    category: { en: "Precious Ingredients", fa: "مواد اولیه نفیس" },
    image: "/featured4.jpg",
    description: {
      en: "Premium grade saffron threads sourced directly from renowned producers",
      fa: "رشته‌های زعفران درجه ممتاز، تهیه‌شده مستقیم از تولیدکنندگان نامدار",
    },
  },
  {
    id: 5,
    name: { en: "Pure Vanilla Extract", fa: "عصاره وانیل خالص" },
    category: { en: "Gourmet Essentials", fa: "ملزومات گورمه" },
    image: "/featured5.jpg",
    description: {
      en: "Madagascar vanilla beans processed to perfection for culinary excellence",
      fa: "دانه‌های وانیل ماداگاسکار با فرآوری دقیق برای برتری آشپزی",
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
  const autoplayRef = useRef<NodeJS.Timeout>();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      section.classList.remove("opacity-0", "translate-y-6");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        section.classList.add("animate-fade-in-up");
        section.classList.remove("opacity-0", "translate-y-6");
        observer.unobserve(section);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoplay) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay]);

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
    router.push(`/${lang}/products/${products[currentIndex].id}`);
  };

  return (
    <section
      ref={sectionRef}
      className="section relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 opacity-0 translate-y-6"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 animate-fade-in">
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Signature Collection" : "مجموعه برگزیده"}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8">
            {lang === "en" ? "Signature Products" : "محصولات شاخص"}
          </h2>
          <p
            className="text-responsive-body text-foreground/70 max-w-2xl mx-auto mb-8"
          >
            {lang === "en"
              ? "Discover our handpicked collection of premium products, each selected for exceptional quality and distinctive character"
              : "مجموعه‌ای دست‌چین از محصولات ممتاز ما را کشف کنید که هرکدام برای کیفیت استثنایی و هویت متمایز انتخاب شده‌اند"}
          </p>

          {/* Explore All Products button */}
          <button
            onClick={() => router.push(`/${lang}/products`)}
            className="btn btn-outline btn-md"
          >
            {lang === "en" ? "Explore All Products" : "مشاهده همه محصولات"}
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel - Reduced height for better proportions */}
          <div className="relative h-80 sm:h-96 md:h-[480px] lg:h-[540px] overflow-hidden rounded-2xl sm:rounded-3xl">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Product Image */}
                <button
                  onClick={handleProductClick}
                  className="relative h-full w-full bg-muted overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={
                    lang === "en"
                      ? `View ${t(product.name)} details`
                      : `مشاهده جزئیات ${t(product.name)}`
                  }
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={t(product.name)}
                    fill
                    sizes="100vw"
                    className={`object-cover transition-transform duration-700 ${
                      index === currentIndex && !isTransitioning
                        ? "scale-100"
                        : "scale-105"
                    }`}
                    priority={index === currentIndex}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
                </button>

                <div className={`absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-10 lg:p-12 pointer-events-none transform-gpu ${textShiftClass}`}>
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
              {isAutoplay ? (lang === "en" ? "Pause" : "توقف") : lang === "en" ? "Play" : "پخش"}
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
