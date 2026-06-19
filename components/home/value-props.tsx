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
      title: "تامین مستقیم جهانی",
      description:
        "همکاری با تامین‌کنندگان رده‌اول در بازارهای کلیدی مواد غذایی، از جمله هند و پاکستان.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: CheckCircle,
      title: "کیفیت مهم‌تر از حجم",
      description:
        "محصولات بر اساس استانداردهای بین‌المللی کیفیت و بهداشت مانند ISO 22000 انتخاب می‌شوند.",
      accentColor: "accent-warm-red",
    },
    {
      icon: Route,
      title: "کانال تامین پایدار",
      description:
        "دفاتر، شعب و انبارهای منطقه‌ای از تامین مستمر برای خریداران B2B پشتیبانی می‌کنند.",
      accentColor: "accent",
    },
    {
      icon: Package,
      title: "کانال‌های در دسترس",
      description:
        "دفاتر، عملیات منطقه‌ای و کانال‌های فروش دیجیتال از افراد، عمده‌فروشان، سازمان‌ها و خدمات غذایی پشتیبانی می‌کند.",
      accentColor: "accent-warm-orange",
    },
  ],
};

export function ValueProps({ lang }: ValuePropsProps) {
  const isRTL = lang === "fa";
  const items = lang === "en" ? valueItems.en : valueItems.fa;
  const marqueeItems = [...items, ...items];

  return (
    <section className="section bg-surface relative overflow-hidden">
      <div
        className="absolute top-20 w-96 h-96 bg-gradient-to-br from-accent-warm-gold/3 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ right: 0 }}
      />
      <div
        className="absolute bottom-0 w-80 h-80 bg-gradient-to-tr from-accent/2 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ left: 0 }}
      />

      <div className="container-wide relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Why Faradid Atlas" : "چرا فرادید اطلس؟"}
          </p>
          <h2
            className="text-responsive-title mb-5 sm:mb-7 md:mb-8 text-foreground"
          >
            {lang === "en"
              ? "Built for Continuity, Quality, and Trust"
              : "استمرار، کیفیت و اعتماد"}
          </h2>
          <p
            className="text-responsive-body text-foreground/70 max-w-2xl mx-auto"
          >
            {lang === "en"
              ? "Our work is practical: reliable sourcing, fair pricing discipline, clear documentation, and steady access to essential foods."
              : "کار ما عملی و دقیق است: تامین قابل اتکا، نظم در قیمت‌گذاری، مستندسازی روشن و دسترسی پایدار به مواد غذایی اساسی."}
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none"
            style={{ left: 0 }}
          />
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none"
            style={{ right: 0 }}
          />

          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex gap-6 sm:gap-8 w-max py-2 value-props-marquee ${
                isRTL ? "value-props-marquee-reverse" : ""
              }`}
            >
              {marqueeItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.title}-${idx}`}
                    className="flex-shrink-0 w-80 sm:w-96 md:w-[28rem]"
                    aria-hidden={idx >= items.length}
                  >
                    <div className="h-full flex flex-col p-6 sm:p-8 rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01] backdrop-blur-md transition-colors duration-500 hover:bg-gradient-to-br hover:from-foreground/[0.05] hover:to-foreground/[0.02]">
                      <div className="relative mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/8 to-foreground/4" />
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
          </div>
        </div>
      </div>

    </section>
  );
}
