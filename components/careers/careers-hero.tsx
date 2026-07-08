import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Image from "next/image";

interface CareersHeroProps {
  lang: Language;
}

export function CareersHero({ lang }: CareersHeroProps) {
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";
  const revealClass =
    "opacity-0 translate-y-6 animate-fade-in-up motion-reduce:translate-y-0 motion-reduce:opacity-100";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      <Image
        src="/optimized/careers-hero.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div
        className={`absolute inset-0 ${
          isRTL
            ? "bg-linear-to-l from-black/80 via-black/60 to-black/10"
            : "bg-linear-to-r from-black/80 via-black/60 to-black/10"
        }`}
      />

      <div className="relative z-10 flex min-h-screen items-center px-4 sm:px-6">
        <div className="container-full">
          <div
            className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <p className={`eyebrow mb-4 text-accent-warm-gold ${revealClass}`}>
              {t.nav.careers}
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
              <span className="block">{t.pages.careers.heroBuild}</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">
                {t.pages.careers.heroContinuity}
              </span>
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
              {t.pages.careers.heroDescription}
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
                href="#open-roles"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-foreground/10 border border-white/10"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "600",
                }}
              >
                {t.pages.careers.heroViewOpenPositions}
              </a>
              <a
                href="#culture"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "600",
                }}
              >
                {t.pages.careers.culture}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
