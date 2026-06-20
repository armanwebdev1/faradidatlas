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
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-surface via-surface/70 to-transparent z-20 pointer-events-none"
            style={{ left: 0 }}
          />
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-surface via-surface/70 to-transparent z-20 pointer-events-none"
            style={{ right: 0 }}
          />

          <div className="overflow-hidden rounded-lg">
            <div
              className={`flex w-max py-2 value-props-marquee ${
                isRTL ? "value-props-marquee-reverse" : ""
              }`}
            >
              {marqueeGroups.map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8"
                  aria-hidden={groupIndex === 1}
                >
                  {items.map((item, idx) => {
                    const IconComponent = item.icon;

                    return (
                  <div
                    key={`${groupIndex}-${item.title}-${idx}`}
                    className="flex-shrink-0 w-80 sm:w-96 md:w-[28rem]"
                  >
                    <div className="h-full flex flex-col p-6 sm:p-8 rounded-lg border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01] backdrop-blur-md shadow-[0_18px_45px_-38px_rgba(30,35,39,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/25 hover:bg-gradient-to-br hover:from-foreground/[0.05] hover:to-foreground/[0.02]">
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
