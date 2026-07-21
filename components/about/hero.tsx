import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeadline } from "./animated-headline";
import { AnimatedSection } from "./animated-section";
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

const impactTitle: Record<Language, string> = {
  en: "Our Impact",
  fa: "دستاوردهای ما",
  ar: "تأثيرنا",
};

const defaultStats = [
  { value: 2009, labelEn: "Established", labelFa: "سال آغاز فعالیت", labelAr: "سنة التأسيس" },
  { value: 4, labelEn: "Rice brands", labelFa: "برند برنج", labelAr: "علامات أرز تجارية" },
  { value: 5, labelEn: "Company offices", labelFa: "دفتر شرکت", labelAr: "مكاتب الشركة" },
  { value: 25, labelEn: "Portfolio products", labelFa: "محصول در سبد تامین", labelAr: "منتجات المحفظة" },
];

export function AboutHero({ lang, companyInfo }: AboutHeroProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const stats = companyInfo?.aboutStats?.length > 0 ? companyInfo.aboutStats : defaultStats;
  const hero = companyInfo?.hero;

  return (
    <>
      {/* ─── SECTION 1: Hero ─── */}
      <section
        className="relative w-full overflow-hidden bg-background"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container-full">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-16 md:py-24">
            {/* Image — decorative side element */}
            <div className="relative w-full lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden opacity-0 translate-y-6 shrink-0 order-2 lg:order-1" data-animate>
              <Image
                src={hero?.image?.url || "/optimized/about-hero.webp"}
                alt={hero?.imageAlt || t.pages.about.heroImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Text — centered block */}
            <AnimatedHeadline className="flex-1 max-w-xl text-center order-1 lg:order-2">
              <p
                className="eyebrow text-brand-navy opacity-0 translate-y-6"
                data-animate
              >
                {hero?.eyebrow || t.pages.about.heroEyebrow}
              </p>
              <h1
                className="font-semibold text-[clamp(2rem,2.2vw+1rem,3.25rem)] leading-[1.15] tracking-normal text-primary opacity-0 translate-y-6"
                data-animate
              >
                {hero?.headline || t.pages.about.heroHeadline}
              </h1>
              <p
                className="text-responsive-body text-foreground/70 max-w-md mx-auto opacity-0 translate-y-6"
                dir={isRTL ? "rtl" : "ltr"}
                style={{ unicodeBidi: "plaintext" }}
                data-animate
              >
                {hero?.description || heroDescription[lang]}
              </p>
              <div className="pt-2 opacity-0 translate-y-6" data-animate>
                <Link
                  href={`/${lang}/contact`}
                  className="btn btn-primary btn-md"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </AnimatedHeadline>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Statistics ─── */}
      <AnimatedSection className="w-full bg-surface-muted">
        <div className="container-full" dir={isRTL ? "rtl" : "ltr"}>
          <div className="py-16 md:py-20">
            <div className="text-center mb-12 opacity-0 translate-y-6" data-animate>
              <h2 className="text-responsive-title text-primary">
                {impactTitle[lang]}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface p-6 md:p-8 text-center space-y-2 opacity-0 translate-y-6 transition-shadow duration-300 hover:shadow-sm"
                  data-animate
                >
                  <Stat
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={0}
                    labelEn={stat.labelEn}
                    labelFa={stat.labelFa}
                    labelAr={stat.labelAr}
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
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
    <>
      <CountUpValue target={value} suffix={suffix} decimals={decimals} />
      <p className="text-sm text-muted-foreground">
        {lang === "en" ? labelEn : lang === "fa" ? labelFa : labelAr}
      </p>
    </>
  );
}
