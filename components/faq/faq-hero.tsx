import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { StaggeredFade } from "@/components/shared/staggered-fade";

interface FAQHeroProps {
  lang: Language;
}

export function FAQHero({ lang }: FAQHeroProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];

  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-12">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          <StaggeredFade className="text-center">
            <p className="eyebrow mb-4 text-brand-navy animate-fade-in-up">
              {t.pages.faq.subtitle}
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-5 animate-fade-in-up"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {t.pages.faq.title}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              {t.pages.faq.heroDescription}
            </p>
            <div className="mt-6 flex justify-center animate-fade-in-up">
              <a
                href={`/${lang}/contact`}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:text-base"
              >
                {t.nav.contact}
              </a>
            </div>
          </StaggeredFade>

          <div className="animate-fade-in-up">
            <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/optimized/faq-image.webp"
                alt={t.pages.faq.heroImageAlt}
                fill
                sizes="100vw"
                quality={84}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
