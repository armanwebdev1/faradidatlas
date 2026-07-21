"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";

interface SignatureProductsProps {
  lang: Language;
  t: (typeof translations)[Language];
  section?: {
    eyebrow?: any;
    title?: any;
    description?: any;
    ctaText?: any;
    ctaUrl?: string | null;
  };
  products?: Array<{
    id?: number | string | null;
    product?: any;
    isActive?: boolean | null;
    name?: any;
    category?: any;
    image?: any;
    description?: any;
  }>;
}

interface LocalizedText {
  en: string;
  fa: string;
  ar: string;
}

function resolveMediaUrl(media: any): string {
  if (!media) return "/signature-products/optimized/twenty-one.webp";
  if (typeof media === "string") return media;
  if (typeof media === "object")
    return (
      media.url ??
      media.filename ??
      "/signature-products/optimized/twenty-one.webp"
    );
  return "/signature-products/optimized/twenty-one.webp";
}

import { getLocalized } from "@/lib/localized";

const defaultProducts = [
  {
    id: 1,
    name: { en: "21 Rice Brand", fa: "برنج ۲۱", ar: "أرز ٢١" },
    category: { en: "Rice Portfolio", fa: "برندهای برنج", ar: "سلسلة الأرز" },
    image: { src: "/signature-products/optimized/twenty-one.webp" },
    description: {
      en: "One of Faradid Atlas' recognized rice brands, built around dependable quality and everyday availability.",
      fa: "یکی از برندهای شناخته‌شده برنج فرادید اطلس؛ انتخابی برای تأمین روزمره با کیفیتی قابل اتکا.",
      ar: "واحدة من علامات الأرز المعترف بها في فراديد أطلس، مبنية على جودة موثوقة.",
    },
  },
  {
    id: 2,
    name: { en: "Mizban Rice", fa: "برنج میزبان", ar: "أرز ميزبان" },
    category: { en: "Rice Portfolio", fa: "برندهای برنج", ar: "سلسلة الأرز" },
    image: { src: "/signature-products/optimized/mizban.webp" },
    description: {
      en: "A trusted rice line designed for households, retailers, and foodservice partners.",
      fa: "نامی آشنا در سبد برنج فرادید اطلس؛ مناسب خانواده‌ها و فروشگاه‌ها.",
      ar: "خط أرز موثوق مصمم للأسر والتجار وشركاء خدمات الطعام.",
    },
  },
  {
    id: 3,
    name: { en: "Hayat Rice", fa: "برنج حیات", ar: "أرز حياة" },
    category: { en: "Rice Portfolio", fa: "برندهای برنج", ar: "سلسلة الأرز" },
    image: { src: "/signature-products/optimized/hayat.webp" },
    description: {
      en: "Selected for consistent cooking quality, clear sourcing, and steady market supply.",
      fa: "برندی با تمرکز بر کیفیت پخت یکنواخت، مسیر تأمین شفاف و عرضه‌ای پایدار.",
      ar: "مختار لجودة الطبخ المتسقة وتوريد واضح وعرض مستقر في السوق.",
    },
  },
  {
    id: 4,
    name: { en: "Golbanou Rice", fa: "برنج گلبانو", ar: "أرز گلبنو" },
    category: { en: "Rice Portfolio", fa: "برندهای برنج", ar: "سلسلة الأرز" },
    image: { src: "/signature-products/optimized/golbanoo.webp" },
    description: {
      en: "A familiar rice brand serving demand across Iran and the wider Middle East region.",
      fa: "برندی آشنا در بازار برنج، برای پاسخ‌گویی به نیاز خریداران در ایران و بازارهای منطقه‌ای.",
      ar: "علامة أرز معروفة تلبي الطلب في إيران والشرق الأوسط الأوسع.",
    },
  },
  {
    id: 5,
    name: {
      en: "Essential Food Staples",
      fa: "مواد غذایی اساسی",
      ar: "الأساسيات الغذائية",
    },
    category: {
      en: "Core Products",
      fa: "محصولات اصلی",
      ar: "المنتجات الأساسية",
    },
    image: { src: "/signature-products/optimized/red-lentil.webp" },
    description: {
      en: "Legumes, spices, nuts, seeds, sugar, and other essentials selected for dependable B2B supply.",
      fa: "حبوبات، ادویه‌ها، آجیل، خشکبار، شکر، و سایر اقلام ضروری برای تأمین قابل اتکا.",
      ar: "بقوليات وتوابل ومكسرات وبذور وسكر وأساسيات أخرى مختارة لتوريد B2B موثوق.",
    },
  },
];

export function SignatureProducts({
  lang,
  t,
  section,
  products: payloadProducts,
}: SignatureProductsProps) {
  const router = useRouter();
  const params = useParams();
  const effectiveLang = lang ?? (params?.lang as Language) ?? "en";
  const isRTL = effectiveLang === "fa" || effectiveLang === "ar";
  const localize = (value: any) => getLocalized(value, effectiveLang);

  const eyebrow = localize(section?.eyebrow) || t.pages.home.recognizedPortfolio;
  const title = localize(section?.title) || t.pages.home.brandsAndCoreProducts;
  const description = localize(section?.description) || t.pages.home.portfolioDescription;
  const ctaText = localize(section?.ctaText) || t.pages.home.exploreAllProducts;
  const ctaUrl = section?.ctaUrl;
  const textShiftClass = isRTL
    ? "-translate-x-4 sm:-translate-x-6 md:-translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
    : "translate-x-4 sm:translate-x-6 md:translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-8";

  const products = payloadProducts?.length
    ? payloadProducts
        .filter((p: any) => p.isActive !== false)
        .map((p: any) => {
          const resolved =
            p.product && typeof p.product === "object" ? p.product : p;
          return {
            id: resolved.id ?? p.id,
            name: resolved.name ?? p.name,
            category: resolved.category ?? p.category,
            image: resolved.featuredImage ?? resolved.image ?? p.image,
            description: resolved.description ?? p.description,
          };
        })
    : defaultProducts;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setHasEntered(true);
        if (!prefersReducedMotion.current) {
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
    if (!isAutoplay || !hasEntered || prefersReducedMotion.current) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [hasEntered, isAutoplay, products.length]);

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
    router.push(`/${effectiveLang}/products`);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section relative w-full overflow-hidden bg-linear-to-b from-background via-background to-muted/20 opacity-0 translate-y-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 animate-fade-in">
          <p className="eyebrow text-brand-navy mb-4 sm:mb-5 md:mb-6">
            {eyebrow}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8">
            {title}
          </h2>
          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto mb-8">
            {description}
          </p>

          {ctaUrl ? (
            <a
              href={ctaUrl}
              className="btn btn-outline btn-md"
            >
              {ctaText}
            </a>
          ) : (
            <button
              onClick={() => router.push(`/${effectiveLang}/products`)}
              className="btn btn-outline btn-md"
            >
              {ctaText}
            </button>
          )}

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
            {(
              ["rice", "legumes", "nuts", "seeds", "spices", "sugar"] as const
            ).map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  router.push(`/${effectiveLang}/products?category=${cat}`)
                }
                className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full border border-foreground/15 bg-background/60 text-foreground/70 hover:bg-brand-navy/10 hover:text-brand-navy hover:border-brand-navy/30 transition-all duration-300"
              >
                {cat === "rice" &&
                  (effectiveLang === "en"
                    ? "Rice"
                    : effectiveLang === "fa"
                      ? "برنج"
                      : "أرز")}
                {cat === "legumes" &&
                  (effectiveLang === "en"
                    ? "Legumes"
                    : effectiveLang === "fa"
                      ? "حبوبات"
                      : "بقوليات")}
                {cat === "nuts" &&
                  (effectiveLang === "en"
                    ? "Nuts"
                    : effectiveLang === "fa"
                      ? "آجیل"
                      : "مكسرات")}
                {cat === "seeds" &&
                  (effectiveLang === "en"
                    ? "Seeds"
                    : effectiveLang === "fa"
                      ? "خشکبار"
                      : "بذور")}
                {cat === "spices" &&
                  (effectiveLang === "en"
                    ? "Spices"
                    : effectiveLang === "fa"
                      ? "ادویه‌ها"
                      : "توابل")}
                {cat === "sugar" &&
                  (effectiveLang === "en"
                    ? "Sugar"
                    : effectiveLang === "fa"
                      ? "شکر"
                      : "سكر")}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative h-80 sm:h-96 md:h-120 lg:h-135 overflow-hidden rounded-2xl sm:rounded-3xl">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={handleProductClick}
                  className="relative h-full w-full bg-muted overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={`${t.pages.home.viewProductAria} ${localize(product.name)}`}
                >
                  {hasEntered && index === currentIndex && (
                    <Image
                      src={
                        localize(product.image) ||
                        (typeof product.image === "object"
                          ? product.image?.src
                          : "") ||
                        "/signature-products/optimized/twenty-one.webp"
                      }
                      alt={localize(product.name)}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                        !isTransitioning ? "scale-100" : "scale-105"
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-black/90" />
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
                      {localize(product.category)}
                    </span>
                    <h3 className="text-responsive-subheading text-white my-3 sm:my-4">
                      {localize(product.name)}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm sm:text-base md:text-base leading-relaxed max-w-2xl">
                      {localize(product.description)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-between px-4 pointer-events-none sm:flex md:px-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 flex items-center justify-center"
                aria-label={t.pages.home.prevProduct}
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
                aria-label={t.pages.home.nextProduct}
              >
                {isRTL ? (
                  <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                ) : (
                  <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-10 w-10 rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-navy/25 hover:bg-brand-navy/5 hover:text-brand-navy"
              aria-label={t.pages.home.prevProduct}
            >
              {isRTL ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
            <span className="min-w-14 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-center text-xs font-semibold text-foreground/65 shadow-sm">
              {currentIndex + 1} / {products.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-10 w-10 rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-navy/25 hover:bg-brand-navy/5 hover:text-brand-navy"
              aria-label={t.pages.home.nextProduct}
            >
              {isRTL ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
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
                aria-label={`${t.pages.home.goToProduct} ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
            <Button
              variant="outline"
              size="sm"
              aria-pressed={isAutoplay}
              onClick={() => setIsAutoplay(!isAutoplay)}
            >
              {isAutoplay ? t.pages.home.pause : t.pages.home.play}
            </Button>
            <span className="hidden text-xs text-foreground/60 sm:inline sm:text-sm">
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
