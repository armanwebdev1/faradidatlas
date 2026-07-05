import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Image from "next/image";

interface BlogHeroProps {
  lang: Language;
}

export function BlogHero({ lang }: BlogHeroProps) {
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";
  const revealClass =
    "opacity-0 translate-y-6 animate-fade-in-up motion-reduce:translate-y-0 motion-reduce:opacity-100";

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-neutral-950">
      <Image
        src="/optimized/products-hero.webp"
        alt=""
        fill
        sizes="100vw"
        quality={84}
        priority
        className="object-cover"
      />
      <div
        className={`absolute inset-0 ${
          isRTL
            ? "bg-gradient-to-l from-black/80 via-black/60 to-black/10"
            : "bg-gradient-to-r from-black/80 via-black/60 to-black/10"
        }`}
      />

      <div className="relative z-10 flex min-h-[70vh] items-center px-4 sm:px-6">
        <div className="container-full">
          <div
            className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <p className={`eyebrow mb-4 text-accent-warm-gold ${revealClass}`}>
              {t.pages.blog.subtitle}
            </p>
            <h1
              className={`mb-8 font-hero text-white ${revealClass}`}
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
                textAlign: isRTL ? "right" : "left",
                animationDelay: "90ms",
              }}
            >
              {t.pages.blog.title}
            </h1>

            <p
              className={`mb-10 max-w-2xl leading-[1.6] text-white/85 ${revealClass}`}
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                textAlign: isRTL ? "right" : "left",
                animationDelay: "180ms",
              }}
            >
              {t.pages.blog.description}
            </p>

            <div
              className={`mt-8 flex flex-col sm:flex-row gap-4 ${revealClass} ${
                isRTL
                  ? "sm:flex-row-reverse sm:justify-end items-end"
                  : "sm:justify-start items-start"
              }`}
              style={{ animationDelay: "270ms" }}
            >
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-foreground/10 border border-white/10"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "600",
                }}
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
