import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { RevealSection } from "@/components/shared/reveal-section";

interface BrandShowcaseProps {
  lang: Language;
}

const content = {
  en: {
    eyebrow: "Trusted Brands",
    titleLead: "Names Your Family",
    titleAccent: "Already Trusts",
    body: "From everyday staples to premium picks, our basket brings together brands shoppers already know and reach for, backed by consistent quality and reliable supply.",
    brands: ["Mizban", "21", "Hayat", "Golbanoo"],
    alt: "Faradid Atlas, a leader in supplying food products, featuring the recognized brands Mizban, 21, Hayat, and Golbanoo.",
  },
  fa: {
    eyebrow: "نام‌های آشنا",
    titleLead: "برندهایی که",
    titleAccent: "خانواده‌ها می‌شناسند",
    body: "از کالاهای اساسی روزمره تا انتخاب‌های ویژه، سبد ما نام‌هایی را گرد هم آورده که مصرف‌کننده به آن‌ها اعتماد دارد؛ با کیفیتی پایدار و تأمینی مطمئن.",
    brands: ["میزبان", "۲۱", "حیات", "گلبانو"],
    alt: "شرکت فرادید اطلس، پیشرو در عرضه محصولات غذایی، با نام‌های شناخته‌شده میزبان، ۲۱، حیات و گلبانو.",
  },
};

export function BrandShowcase({ lang }: BrandShowcaseProps) {
  const t = lang === "en" ? content.en : content.fa;

  return (
    <RevealSection className="section relative overflow-hidden bg-background opacity-0 translate-y-6">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-navy/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <p className="eyebrow text-brand-navy mb-4 sm:mb-5 md:mb-6">
              {t.eyebrow}
            </p>
            <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8">
              <span className="inline-block">{t.titleLead}</span>
              <span className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-linear-to-r from-accent-warm-gold to-accent-warm-orange">
                {t.titleAccent}
              </span>
            </h2>
            <p className="text-responsive-body text-foreground/70 max-w-xl mb-8 sm:mb-10">
              {t.body}
            </p>

            <ul className="flex flex-wrap gap-3">
              {t.brands.map((brand) => (
                <li
                  key={brand}
                  className="px-4 py-2 rounded-full border border-border/40 bg-card/50 text-sm sm:text-base text-foreground/75"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-background shadow-[0_40px_90px_-60px_rgba(12,18,24,0.5),0_16px_40px_-30px_rgba(12,18,24,0.2)]">
              <Image
                src="/brand-showcase/faradid-atlas-brands.jpg"
                alt={t.alt}
                width={1270}
                height={1239}
                loading="lazy"
                quality={88}
                sizes="(min-width: 768px) 28rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
