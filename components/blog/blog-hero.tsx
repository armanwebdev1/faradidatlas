import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { StaggeredFade } from "@/components/shared/staggered-fade";

interface BlogHeroProps {
  lang: Language;
}

export function BlogHero({ lang }: BlogHeroProps) {
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
              {t.pages.blog.subtitle}
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
              {t.pages.blog.title}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              {t.pages.blog.description}
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
        </div>
      </div>
    </section>
  );
}
