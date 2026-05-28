import type { Language } from "@/lib/i18n";
import { StaggeredFade } from "@/components/shared/staggered-fade";

interface ContactHeroProps {
  lang: Language;
}

export function ContactHero({ lang }: ContactHeroProps) {
  const isRTL = lang === "fa";

  const badges = [
    {
      en: "24-48h response",
      fa: "پاسخ ۲۴ تا ۴۸ ساعته",
    },
    {
      en: "B2B supply planning",
      fa: "برنامه‌ریزی تامین B2B",
    },
    {
      en: "Iran, UAE & Oman",
      fa: "ایران، امارات و عمان",
    },
  ];

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-wide">
        <div className="space-y-8 md:space-y-10">
          <StaggeredFade className="text-center">
            <p className="eyebrow mb-4 text-accent-warm-gold animate-fade-in-up">
              {lang === "en" ? "Get in Touch" : "در ارتباط باشید"}
            </p>
            <h1 className="text-responsive-hero text-primary mb-5 animate-fade-in-up">
              {lang === "en"
                ? "Tell us what you need to supply next"
                : "بگویید برای تامین بعدی به چه نیاز دارید"}
            </h1>
            <p className="text-responsive-body text-foreground/70 max-w-3xl mx-auto animate-fade-in-up">
              {lang === "en"
                ? "Share the product, destination, volume, and timeline. Our team will respond with practical sourcing and distribution next steps."
                : "محصول، مقصد، حجم و زمان‌بندی را اعلام کنید تا تیم ما با گام‌های عملی تامین و توزیع پاسخ دهد."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <a href="#contact-form" className="btn btn-primary btn-md">
                {lang === "en" ? "Start an Inquiry" : "شروع درخواست"}
              </a>
              <a href="#contact-offices" className="btn btn-outline btn-md">
                {lang === "en" ? "View Offices" : "مشاهده دفاتر"}
              </a>
            </div>
          </StaggeredFade>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up">
            {badges.map((badge) => (
              <span
                key={badge.en}
                className="rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-sm"
              >
                {lang === "en" ? badge.en : badge.fa}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
