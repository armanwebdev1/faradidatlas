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
      en: "WhatsApp available",
      fa: "پشتیبانی واتساپ",
    },
    {
      en: "Tehran & Alborz offices",
      fa: "دفاتر تهران و البرز",
    },
  ];

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute -top-16 right-[-10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-accent/25 via-white to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-[-5%] w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-secondary/40 via-white to-transparent blur-3xl" />

      <div className="container-wide">
        <div className="space-y-8 md:space-y-10">
          <StaggeredFade className="text-center">
            <p className="eyebrow mb-4 text-accent-warm-gold animate-fade-in-up">
              {lang === "en" ? "Get in Touch" : "تماس بگیرید"}
            </p>
            <h1 className="text-responsive-hero text-primary mb-5 animate-fade-in-up">
              {lang === "en"
                ? "Let’s Talk About Your Next Order"
                : "برای سفارش بعدی‌تان با ما گفتگو کنید"}
            </h1>
            <p className="text-responsive-body text-foreground/70 max-w-3xl mx-auto animate-fade-in-up">
              {lang === "en"
                ? "Have questions about sourcing, certifications, or logistics? Our B2B team is ready to help."
                : "درباره تامین، تاییدیه‌ها یا لجستیک سوال دارید؟ تیم B2B ما آماده راهنمایی است."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <a
                href="#contact-form"
                className="btn btn-primary btn-md"
              >
                {lang === "en" ? "Start an Inquiry" : "شروع درخواست"}
              </a>
              <a
                href="#contact-offices"
                className="btn btn-outline btn-md"
              >
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
