import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedHeadline } from "./animated-headline";
import { CountUpValue } from "./count-up-value";

interface AboutHeroProps {
  lang: Language;
}

export function AboutHero({ lang }: AboutHeroProps) {
  const isRTL = lang === "fa";

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-full">
        <div className="space-y-20">
          {/* Headline */}
          <AnimatedHeadline className="text-center">
            <p
              className="eyebrow mb-4 text-accent-warm-gold opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "About Us" : "درباره ما"}
            </p>
            <h1
              className="text-responsive-hero text-primary mb-8 max-w-5xl mx-auto opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en"
                ? "We build trusted B2B food supply chains that connect premium producers with global buyers."
                : "ما زنجیره‌های تأمین غذایی B2B قابل‌اعتماد می‌سازیم که تولیدکنندگان ممتاز را به خریداران جهانی متصل می‌کند."}
            </h1>
            <button
              className="btn btn-primary btn-md opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </button>
          </AnimatedHeadline>

          {/* Image */}
          <div>
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                alt="Tehran"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <h2 className="text-responsive-title text-primary">
              {lang === "en" ? "Get to know us more" : "بیشتر درباره ما بدانید"}
            </h2>

            {/* Keep English LTR, Persian RTL */}
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
                {lang === "en"
                  ? "Led by specialists in sourcing, quality, and export logistics, we provide end-to-end food trading services for importers, distributors, retailers, and foodservice partners."
                  : "با هدایت متخصصان تأمین، کیفیت و لجستیک صادرات، خدمات تجارت غذایی سرتاسری را برای واردکنندگان، توزیع‌کنندگان، خرده‌فروشان و شرکای خدمات غذایی ارائه می‌دهیم."}
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {lang === "en"
                  ? "From producer partnerships to compliance and documentation, our teams manage every step so you can grow with consistency, transparency, and confidence."
                  : "از مشارکت با تولیدکنندگان تا انطباق و مستندسازی، تیم‌های ما هر مرحله را مدیریت می‌کنند تا با ثبات، شفافیت و اطمینان رشد کنید."}
              </p>
            </div>
          </div>

          {/* Founder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* CEO */}
            <div className="flex gap-4 items-center">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                  alt="CEO"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lang === "en" ? "Mohsen Ahmadi" : "محسن احمدی"}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-xl">
              {lang === "en"
                ? "“Our mission is to deliver premium foods with reliable timelines and documentation, so partners can scale confidently.”"
                : "«ماموریت ما تحویل مواد غذایی ممتاز با زمان‌بندی و مستندسازی قابل‌اعتماد است تا شرکای ما با اطمینان مقیاس بگیرند.»"}
            </blockquote>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <Stat
              value={8.93}
              suffix="%"
              decimals={2}
              labelEn="Annual export growth"
              labelFa="رشد سالانه صادرات"
              lang={lang}
            />
            <Stat
              value={12.6}
              suffix={lang === "en" ? "K" : " هزار"}
              decimals={1}
              labelEn="Shipments delivered"
              labelFa="مرسوله‌های تحویل‌شده"
              lang={lang}
            />
            <Stat
              value={16}
              suffix="+"
              labelEn="Countries served"
              labelFa="کشورهای تحت پوشش"
              lang={lang}
            />
            <Stat
              value={12}
              suffix="+"
              labelEn="Quality certifications"
              labelFa="گواهی‌های کیفیت"
              lang={lang}
            />
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
  lang,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  labelEn: string;
  labelFa: string;
  lang: Language;
}) {
  return (
    <div>
      <CountUpValue target={value} suffix={suffix} decimals={decimals} />
      <p className="text-xs text-muted-foreground">
        {lang === "en" ? labelEn : labelFa}
      </p>
    </div>
  );
}
