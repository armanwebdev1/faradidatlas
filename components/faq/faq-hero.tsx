import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { StaggeredFade } from "@/components/shared/staggered-fade";

interface FAQHeroProps {
  lang: Language;
}

export function FAQHero({ lang }: FAQHeroProps) {
  const isRTL = lang === "fa";

  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute -top-20 right-[-10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-accent/25 via-white to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-[-5%] w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-secondary/40 via-white to-transparent blur-3xl" />

      <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-12">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          <StaggeredFade className="text-center">
            <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-warm-gold animate-fade-in-up">
              {lang === "en" ? "Help Center" : "مرکز کمک"}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-5 animate-fade-in-up"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {lang === "en"
                ? "Frequently Asked Questions"
                : "سوالات متداول"}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              {lang === "en"
                ? "Find answers to common questions about sourcing, certifications, logistics, and private labeling."
                : "پاسخ سوالات متداول درباره تامین، تاییدیه‌ها، لجستیک و علامت‌گذاری خصوصی را بیابید."}
            </p>
            <div className="mt-6 flex justify-center animate-fade-in-up">
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {lang === "en" ? "Contact Us" : "تماس با ما"}
              </a>
            </div>
          </StaggeredFade>

          <div className="animate-fade-in-up">
            <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/featured2.jpg"
                alt={lang === "en" ? "Support team" : "تیم پشتیبانی"}
                fill
                sizes="100vw"
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
