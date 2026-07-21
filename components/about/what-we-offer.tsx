import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";

interface WhatWeOfferProps {
  lang: Language;
  companyInfo?: any;
}

const offerings = {
  en: [
    {
      image: "/what-we-offer/optimized/sourcing-import.webp",
      title: "Sourcing & Import",
      description:
        "Direct supplier coordination for rice, legumes, spices, nuts, seeds, sugar, and other essentials.",
    },
    {
      image: "/what-we-offer/optimized/featured2.webp",
      title: "Quality & Documentation",
      description:
        "Quality checks, hygiene standards, import documentation, and ISO-led operating discipline.",
    },
    {
      image: "/what-we-offer/optimized/quality-documentation.webp",
      title: "Distribution & Access",
      description:
        "Regional offices, branches, and warehouses that support retailers, wholesalers, and institutions.",
    },
  ],
  fa: [
    {
      image: "/what-we-offer/optimized/sourcing-import.webp",
      title: "تأمین و واردات",
      description:
        "هماهنگی مستقیم با تأمین‌کنندگان معتبر برای تأمین برنج، حبوبات، ادویه‌جات، آجیل، خشکبار، شکر، و سایر کالاهای اساسی.",
    },
    {
      image: "/what-we-offer/optimized/featured2.webp",
      title: "کنترل کیفیت و مستندات",
      description:
        "بررسی کیفیت، رعایت معیارهای بهداشتی، آماده‌سازی اسناد واردات و پیشبرد فرایندها بر پایه نظم عملیاتی و استانداردهای معتبر.",
    },
    {
      image: "/what-we-offer/optimized/quality-documentation.webp",
      title: "توزیع و دسترسی",
      description:
        "دفاتر، شعب و پشتیبانی انبار در منطقه، برای پاسخ‌گویی به نیاز خرده‌فروشان، عمده‌فروشان، سازمان‌ها و خریداران تجاری.",
    },
  ],
  ar: [
    {
      image: "/what-we-offer/optimized/sourcing-import.webp",
      title: "التوريد والاستيراد",
      description:
        "التنسيق المباشر مع الموردين الموثوقين لتوريد الأرز والبقوليات والتوابل والمكسرات والبذور والسكر والسلع الغذائية الأساسية الأخرى.",
    },
    {
      image: "/what-we-offer/optimized/featured2.webp",
      title: "مراقبة الجودة والتوثيق",
      description:
        "فحوصات الجودة والالتزام بمعايير النظافة وإعداد وثائق الاستيراد ودفع العمليات بناءً على نظام تشغيل راقب ومعايير موثوقة.",
    },
    {
      image: "/what-we-offer/optimized/quality-documentation.webp",
      title: "التوزيع والوصول",
      description:
        "المكاتب والفرع والمستودعات الإقليمية لدعم تجار التجزئة والجملة والمؤسسات والمشترين التجاريين.",
    },
  ],
};

import { getLocalized } from "@/lib/localized";

function resolveMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media;
  if (typeof media === "object")
    return media.url ?? media.filename ?? undefined;
  return undefined;
}

export function WhatWeOffer({ lang, companyInfo }: WhatWeOfferProps) {
  const fallback =
    lang === "en" ? offerings.en : lang === "fa" ? offerings.fa : offerings.ar;
  const t = translations[lang];

  const cmsOfferings = companyInfo?.offerings;
  const offers =
    cmsOfferings?.length > 0
      ? cmsOfferings.map((o: any) => ({
          image: resolveMediaUrl(o.image) || fallback[0]?.image || "",
          title: getLocalized(o.title, lang) || "",
          description: getLocalized(o.description, lang) || "",
        }))
      : fallback;

  const sectionTitle =
    companyInfo?.offeringsSection?.title || t.pages.about.whatWeOffer;
  const sectionDescription =
    companyInfo?.offeringsSection?.description ||
    t.pages.about.whatWeOfferDescription;

  return (
    <AnimatedSection className="section relative px-4 sm:px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {offers.map(
            (
              offer: { image: string; title: string; description: string },
              idx: number,
            ) => {
              const offsetClass =
                idx === 0 ? "lg:mt-0" : idx === 1 ? "lg:mt-12" : "lg:mt-24";
              return (
                <div
                  key={idx}
                  className={`group ${offsetClass} opacity-0 translate-y-6`}
                  data-animate
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-border h-full flex flex-col md:hover:border-accent-warm-gold md:hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden bg-linear-to-br from-secondary/40 to-secondary/60">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 motion-safe:md:group-hover:scale-110"
                      />
                    </div>

                    <div className="p-8 flex flex-col grow">
                      <h3 className="text-xl font-bold text-primary mb-3 transition-colors md:group-hover:text-accent-warm-gold">
                        {offer.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed grow">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
