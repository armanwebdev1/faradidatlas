import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeadline } from "./animated-headline";
import { CountUpValue } from "./count-up-value";

interface AboutHeroProps {
  lang: Language;
  companyInfo?: any;
}

const heroDescription: Record<Language, string> = {
  en: "With over fifteen years of experience in food sourcing and trading, Faradid Atlas provide reliable import and distribution solutions through a strong network of suppliers and business partners.",
  fa: "با بیش از پانزده سال تجربه در تأمین و تجارت مواد غذایی، فرادید اطلس راهکارهای قابل اعتماد واردات و توزیع را از طریق شبکه‌ای قوی از تأمین‌کنندگان و شرکای تجاری ارائه می‌دهد.",
  ar: "بخبرة تمتد لأكثر من خمسة عشر عامًا في تزوين وتجارة المواد الغذائية، توفر فراديد أطلس حلول استيراد وتوزيع موثوقة من خلال شبكة قوية من الموردين وشركاء الأعمال.",
};

const defaultStats = [
  { value: 2009, labelEn: "Established", labelFa: "سال آغاز فعالیت", labelAr: "سنة التأسيس" },
  { value: 4, labelEn: "Rice brands", labelFa: "برند برنج", labelAr: "علامات أرز تجارية" },
  { value: 4, labelEn: "Company offices", labelFa: "دفتر شرکت", labelAr: "مكاتب الشركة" },
  { value: 25, labelEn: "Portfolio products", labelFa: "محصول در سبد تامین", labelAr: "منتجات المحفظة" },
];

export function AboutHero({ lang, companyInfo }: AboutHeroProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const stats = companyInfo?.aboutStats?.length > 0 ? companyInfo.aboutStats : defaultStats;

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-full">
        <div className="space-y-28">
          <AnimatedHeadline className="text-center">
            <p
              className="eyebrow mb-4 text-brand-navy opacity-0 translate-y-6"
              data-animate
            >
              {t.pages.about.heroEyebrow}
            </p>
            <h1
              className="font-semibold text-[clamp(2.2rem,2.45vw+1.05rem,3.75rem)] leading-[1.18] sm:leading-[1.16] md:leading-[1.14] tracking-normal text-primary mb-5 max-w-5xl mx-auto opacity-0 translate-y-6"
              data-animate
            >
              {t.pages.about.heroHeadline}
            </h1>
            <p className="text-responsive-body text-foreground/70 max-w-3xl mx-auto opacity-0 translate-y-6" data-animate>
              {heroDescription[lang]}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="btn btn-primary btn-md mt-8 opacity-0 translate-y-6"
              data-animate
            >
              {t.nav.contact}
            </Link>
          </AnimatedHeadline>

          <div>
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/optimized/about-hero.webp"
                alt={t.pages.about.heroImageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <h2 className="text-responsive-title text-primary">
              {t.pages.about.foodSecurityPractical}
            </h2>

            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="space-y-6"
              style={{
                unicodeBidi: "plaintext",
                direction: isRTL ? "rtl" : "ltr",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed max-w-xl">
                {t.pages.about.storyP1}
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {t.pages.about.storyP2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
                {t.pages.about.missionLabel}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {t.pages.about.missionText}
              </p>
            </div>

            <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-xl">
              {t.pages.about.blockquote}
            </blockquote>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat: any, idx: number) => (
              <Stat
                key={idx}
                value={stat.value}
                suffix={stat.suffix}
                decimals={0}
                labelEn={stat.labelEn}
                labelFa={stat.labelFa}
                labelAr={stat.labelAr}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  decimals = 0,
  labelEn,
  labelFa,
  labelAr,
  lang,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  labelEn: string;
  labelFa: string;
  labelAr: string;
  lang: Language;
}) {
  return (
    <div>
      <CountUpValue target={value} suffix={suffix} decimals={decimals} />
      <p className="text-xs text-muted-foreground">
        {lang === "en" ? labelEn : lang === "fa" ? labelFa : labelAr}
      </p>
    </div>
  );
}
