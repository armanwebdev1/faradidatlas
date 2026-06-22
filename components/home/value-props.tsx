import type { Language } from "@/lib/i18n";
import { Globe, CheckCircle, Route, Package } from "lucide-react";

interface ValuePropsProps {
  lang: Language;
}

const valueItems = {
  en: [
    {
      icon: Globe,
      title: "Direct Global Sourcing",
      description:
        "First-tier supplier relationships in key food-producing markets, including India and Pakistan.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: CheckCircle,
      title: "Quality Before Volume",
      description:
        "Products are selected against international hygiene and quality standards such as ISO 22000.",
      accentColor: "accent-warm-red",
    },
    {
      icon: Route,
      title: "Stable Supply Channels",
      description:
        "Regional branches, offices, and warehouses support continuous supply for B2B buyers.",
      accentColor: "accent",
    },
    {
      icon: Package,
      title: "Accessible Buyer Channels",
      description:
        "Offices, regional operations, and digital sales channels support individuals, wholesalers, organizations, and foodservice buyers.",
      accentColor: "accent-warm-orange",
    },
  ],
  fa: [
    {
      icon: Globe,
      title: "تأمین مستقیم از بازارهای جهانی",
      description:
        "ارتباط با تأمین‌کنندگان معتبر در بازارهای اصلی تولید غذا، از جمله هند و پاکستان.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: CheckCircle,
      title: "اول کیفیت، بعد حجم",
      description:
        "انتخاب محصولات بر پایه استانداردهای معتبر بهداشتی و کیفی، از جمله ISO 22000 انجام می‌شود.",
      accentColor: "accent-warm-red",
    },
    {
      icon: Route,
      title: "مسیرهای پایدار تأمین",
      description:
        "دفاتر، شعب و پشتیبانی انبار در منطقه، امکان تأمین مستمر را برای خریداران عمده و سازمانی فراهم می‌کند.",
      accentColor: "accent",
    },
    {
      icon: Package,
      title: "دسترسی آسان برای خریداران",
      description:
        "دفاتر فعال، عملیات منطقه‌ای و کانال‌های فروش دیجیتال، پاسخ‌گوی نیاز مصرف‌کنندگان، عمده‌فروشان، سازمان‌ها و فعالان خدمات غذایی است.",
      accentColor: "accent-warm-orange",
    },
  ],
};

export function ValueProps({ lang }: ValuePropsProps) {
  const isRTL = lang === "fa";
  const items = lang === "en" ? valueItems.en : valueItems.fa;
  const marqueeGroups = [0, 1];

  return (
    <section className="section bg-surface relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Why Faradid Atlas" : "چرا فرادید اطلس؟"}
          </p>
          <h2 className="text-responsive-title mb-5 sm:mb-7 md:mb-8 text-foreground">
            {lang === "en"
              ? "Built for Continuity, Quality, and Trust"
              : "استمرار، کیفیت و اعتماد"}
          </h2>
          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto">
            {lang === "en"
              ? "Our work is practical: reliable sourcing, fair pricing discipline, clear documentation, and steady access to essential foods."
              : "کار ما بر پایه عمل و تجربه شکل گرفته است: تأمین قابل اتکا، قیمت‌گذاری منطقی، مستندسازی شفاف و دسترسی پایدار به مواد غذایی اساسی."}
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-surface via-surface/70 to-transparent z-20 pointer-events-none"
            style={{ left: 0 }}
          />
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-surface via-surface/70 to-transparent z-20 pointer-events-none"
            style={{ right: 0 }}
          />

          <div className="overflow-hidden rounded-lg" dir="ltr">
            <div
              className={`flex w-max py-2 value-props-marquee ${
                isRTL ? "value-props-marquee-reverse" : ""
              }`}
            >
              {marqueeGroups.map((groupIndex) => (
                <div
                  key={groupIndex}
                  className={`flex shrink-0 gap-6 sm:gap-8 ${
                    isRTL ? "pl-6 sm:pl-8" : "pr-6 sm:pr-8"
                  }`}
                  aria-hidden={groupIndex === 1}
                >
                  {items.map((item, idx) => {
                    const IconComponent = item.icon;

                    return (
                      <div
                        key={`${groupIndex}-${item.title}-${idx}`}
                        className={`flex-shrink-0 w-[min(20rem,calc(100vw-2rem))] sm:w-96 md:w-[28rem] ${
                          isRTL ? "text-right" : ""
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <div className="h-full flex flex-col p-6 sm:p-8 rounded-lg border border-foreground/10 bg-background/85 backdrop-blur-md shadow-[0_16px_42px_-30px_rgba(12,18,24,0.35),0_1px_0_rgba(255,255,255,0.55)_inset]">
                          <div className="relative mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-foreground/8 to-foreground/4" />
                            <IconComponent
                              size={32}
                              className="relative text-foreground sm:w-10 sm:h-10"
                              strokeWidth={1.2}
                            />
                          </div>

                          <h3 className="text-responsive-subheading text-foreground mb-3 sm:mb-4">
                            {item.title}
                          </h3>

                          <p className="text-sm sm:text-base text-foreground/65 leading-relaxed flex-grow">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
