import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { StaggeredFade } from "@/components/shared/staggered-fade";

interface ContactHeroProps {
  lang: Language;
}

export function ContactHero({ lang }: ContactHeroProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];

  const badges = [
    { text: t.pages.contact.badgeInquiryReview },
    { text: t.pages.contact.badgeB2BPlanning },
    { text: t.pages.contact.badgeRegion },
  ];

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-wide">
        <div className="space-y-8 md:space-y-10">
          <StaggeredFade className="text-center">
            <p className="eyebrow mb-4 text-brand-navy animate-fade-in-up">
              {t.pages.contact.heroEyebrow}
            </p>
            <h1 className="font-semibold text-[clamp(2.05rem,2.2vw+1rem,3.45rem)] leading-[1.18] sm:leading-[1.15] md:leading-[1.12] tracking-normal text-primary mb-5 animate-fade-in-up">
              {t.pages.contact.heroTitle}
            </h1>
            <p className="text-responsive-body text-foreground/70 max-w-3xl mx-auto animate-fade-in-up">
              {t.pages.contact.heroDescription}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <a href="#contact-form" className="btn btn-primary btn-md">
                {t.pages.contact.startInquiry}
              </a>
              <a href="#contact-offices" className="btn btn-outline btn-md">
                {t.pages.contact.viewOffices}
              </a>
            </div>
          </StaggeredFade>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up">
            {badges.map((badge) => (
              <span
                key={badge.text}
                className="rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-sm"
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
