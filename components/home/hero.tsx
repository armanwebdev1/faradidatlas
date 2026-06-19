import type { Language } from "@/lib/i18n";

interface HeroProps {
  lang: Language;
}

const heroWidths = [640, 1280, 1920] as const;

function heroSrcSet(id: number, format: "avif" | "webp") {
  return heroWidths
    .map((width) => `/hero/${id}-${width}.${format} ${width}w`)
    .join(", ");
}

const slide = {
  id: 1,
  image: {
    avif: heroSrcSet(1, "avif"),
    webp: heroSrcSet(1, "webp"),
    fallback: "/hero/1-1280.webp",
  },
  title: {
    en: "Reliable Food Supply",
    fa: "تامین مطمئن مواد غذایی",
  },
  subtitle: {
    en: "Food Security in Practice",
    fa: "امنیت غذایی در عمل",
  },
  description: {
    en: "Established in 2009, Faradid Atlas sources, imports, and distributes essential food products with disciplined quality standards and dependable regional operations.",
    fa: "فرادید اطلس که در سال ۱۳۸۸ بنیان گذاشته شد، محصولات غذایی اساسی را با انتخاب دقیق، استانداردهای کیفی منظم و عملیات منطقه‌ای قابل اتکا تامین، وارد و توزیع می‌کند.",
  },
};

export function Hero({ lang }: HeroProps) {
  const isRTL = lang === "fa";
  const titleParts = slide.title[lang].split(" ");
  const textShiftClass = isRTL
    ? "-translate-x-4 sm:-translate-x-6 md:-translate-x-8"
    : "translate-x-4 sm:translate-x-6 md:translate-x-8";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-900">
      <div className="relative h-full w-full">
        <picture className="absolute inset-0 block">
          <source type="image/avif" srcSet={slide.image.avif} sizes="100vw" />
          <source type="image/webp" srcSet={slide.image.webp} sizes="100vw" />
          <img
            src={slide.image.fallback}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover scale-[1.03] transform-gpu animate-hero-image-zoom"
          />
        </picture>
        <div className="hero-premium-sheen" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
      </div>

      <div className="absolute bottom-0 inset-x-0 z-20">
        <div
          className={`max-w-5xl px-8 md:px-12 lg:px-20 pb-20 md:pb-28 transform-gpu text-left ${textShiftClass}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <p
            className="eyebrow mb-6 text-accent-warm-gold animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            {slide.subtitle[lang]}
          </p>

          <h1
            className="mb-8 text-responsive-hero text-white animate-fade-in-up"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="block">{titleParts[0]}</span>
            <span className="block">{titleParts.slice(1).join(" ")}</span>
          </h1>

          <p
            className="mb-10 max-w-2xl text-responsive-body text-white/85 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {slide.description[lang]}
          </p>

          <div
            className={`flex gap-2 animate-fade-in-up ${isRTL ? "flex-row-reverse" : ""}`}
            style={{ animationDelay: "0.28s" }}
            aria-hidden="true"
          >
            <span className="h-1 w-12 bg-white" />
            <span className="h-1 w-6 bg-white/40" />
            <span className="h-1 w-6 bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
