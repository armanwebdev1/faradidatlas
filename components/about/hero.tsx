import type { Language } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
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
          <AnimatedHeadline className="text-center">
            <p
              className="eyebrow mb-4 text-brand-navy opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "About Faradid Atlas" : "درباره فرادید اطلس"}
            </p>
            <h1
              className="text-responsive-hero font-bold leading-[1.14] sm:leading-[1.13] md:leading-[1.12] tracking-normal text-primary mb-8 max-w-5xl mx-auto opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en"
                ? "Since 2009, we have connected reliable global food supply with the essential needs of the Iranian market."
                : "از سال ۱۳۸۸، فرادید اطلس تأمین مطمئن مواد غذایی را به نیازهای اساسی بازار ایران پیوند می‌دهد."}
            </h1>
            <Link
              href={`/${lang}/contact`}
              className="btn btn-primary btn-md opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </Link>
          </AnimatedHeadline>

          <div>
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/optimized/about-hero.webp"
                alt={
                  lang === "en"
                    ? "Faradid Atlas operations"
                    : "فعالیت‌های فرادید اطلس در تأمین مواد غذایی"
                }
                fill
                priority
                sizes="100vw"
                quality={84}
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <h2 className="text-responsive-title text-primary">
              {lang === "en"
                ? "Food security, made practical"
                : "امنیت غذایی، در مسیر عمل"}
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
                {lang === "en"
                  ? "Faradid Atlas was established in 2009 to help strengthen food security and support access to essential foods. The company imports and distributes rice, legumes, spices, nuts, seeds, and sugar selected against global quality and hygiene standards."
                  : "فرادید اطلس در سال ۱۳۸۸ با هدف تقویت امنیت غذایی و آسان‌تر کردن دسترسی به مواد غذایی اساسی آغاز به کار کرد. این شرکت برنج، حبوبات، ادویه‌ها، مغزها، دانه‌ها و شکر را بر پایه معیارهای معتبر کیفی و بهداشتی وارد و توزیع می‌کند."}
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Its recognized rice brands are 21, Mizban, Hayat, and Golbanou. Offices in Tehran, Isfahan, Dubai, and Oman, supported by operational storage access including Shahrekord, help keep supply accessible for retailers, wholesalers, organizations, and foodservice partners."
                  : "برندهای برنج فرادید اطلس شامل ۲۱، میزبان، حیات و گلبانو هستند. دفاتر تهران، اصفهان، دبی و عمان، همراه با پشتیبانی انبار و دسترسی عملیاتی از جمله شهرکرد، مسیر تأمین را برای خرده‌فروشان، عمده‌فروشان، سازمان‌ها و فعالان خدمات غذایی منظم‌تر و قابل اتکاتر می‌کند."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
                {lang === "en" ? "Mission" : "ماموریت"}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Our mission is to remove unnecessary intermediaries, protect supply chain continuity, and create lasting value for customers and the wider community."
                  : "مأموریت ما کاهش واسطه‌های غیرضروری، حفظ تداوم زنجیره تأمین و ایجاد ارزشی ماندگار برای مشتریان و جامعه است."}
              </p>
            </div>

            <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-xl">
              {lang === "en"
                ? "Healthy, quality food should be accessible. That belief guides every sourcing and distribution decision we make."
                : "دسترسی به غذای سالم و باکیفیت باید ممکن باشد؛ همین باور، راهنمای تصمیم‌های ما در تأمین و توزیع است."}
            </blockquote>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <Stat
              value={2009}
              labelEn="Established"
              labelFa="سال آغاز فعالیت"
              lang={lang}
            />
            <Stat
              value={4}
              labelEn="Rice brands"
              labelFa="برند برنج"
              lang={lang}
            />
            <Stat
              value={4}
              labelEn="Company offices"
              labelFa="دفتر شرکت"
              lang={lang}
            />
            <Stat
              value={25}
              labelEn="DOCX-listed products"
              labelFa="محصول در سبد تامین"
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
