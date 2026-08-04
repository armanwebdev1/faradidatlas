import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { Globe, CheckCircle, Route, Package } from "lucide-react";
import { getLocalized } from "@/lib/localized";

interface ValuePropsProps {
  lang: Language;
  items?: Array<{
    icon?: string;
    title?: any;
    description?: any;
    isActive?: boolean | null;
  }>;
  section?: {
    eyebrow?: any;
    title?: any;
    description?: any;
  };
}

const iconMap: Record<string, any> = {
  Globe,
  CheckCircle,
  Route,
  Package,
};

const defaultItems = {
  en: [
    {
      icon: "Globe",
      title: "Direct Global Sourcing",
      description:
        "First-tier supplier relationships in key food-producing markets, including India and Pakistan.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: "CheckCircle",
      title: "Quality Before Volume",
      description:
        "Products are selected against international hygiene and quality standards such as ISO 22000.",
      accentColor: "accent-warm-red",
    },
    {
      icon: "Route",
      title: "Stable Supply Channels",
      description:
        "Regional branches, offices, and warehouses support continuous supply for B2B buyers.",
      accentColor: "accent",
    },
    {
      icon: "Package",
      title: "Accessible Buyer Channels",
      description:
        "Offices, regional operations, and digital sales channels support individuals, wholesalers, organizations, and foodservice buyers.",
      accentColor: "accent-warm-orange",
    },
  ],
  fa: [
    {
      icon: "Globe",
      title: "تأمین مستقیم از مبدا",
      description:
        "با تأمین‌کنندگان معتبر در بازارهای اصلی تولید غذا، از جمله چین، هند، و پاکستان، همکاری می‌کنیم.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: "CheckCircle",
      title: "کیفیت؛ شرط اول همکاری",
      description:
        "پیش از هر همکاری، محصول از نظر سلامت، کیفیت و ثبات بررسی می‌شود.",
      accentColor: "accent-warm-red",
    },
    {
      icon: "Route",
      title: "تأمین منظم برای خرید عمده",
      description:
        "با شبکه منطقه‌ای دفتر، شعبه و انبار، سفارش‌های عمده و سازمانی را پشتیبانی می‌کنیم.",
      accentColor: "accent",
    },
    {
      icon: "Package",
      title: "مسیر ساده‌تر برای خرید",
      description:
        "از تماس حضوری تا فروش دیجیتال، مسیر خرید را ساده و سریع نگه می‌داریم.",
      accentColor: "accent-warm-orange",
    },
  ],
  ar: [
    {
      icon: "Globe",
      title: "توريد مباشر من المصدر",
      description: "نتعاون مع موردين موثوقين في أسواق إنتاج الغذاء الرئيسية.",
      accentColor: "accent-warm-gold",
    },
    {
      icon: "CheckCircle",
      title: "الجودة شرط التعاون الأول",
      description:
        "قبل أي تعاون، يتم فحص المنتج من حيث السلامة والجودة والاستقرار.",
      accentColor: "accent-warm-red",
    },
    {
      icon: "Route",
      title: "توريد منتظم للشراء بالجملة",
      description:
        "بشبكة إقليمية من المكاتب والفرع والمستودعات، ندعم طلبات الجملة والمؤسسات.",
      accentColor: "accent",
    },
    {
      icon: "Package",
      title: "مسار أبسط للشراء",
      description:
        "من الاتصال المباشر إلى المبيعات الرقمية، نحافظ على مسار شراء بسيط وسريع.",
      accentColor: "accent-warm-orange",
    },
  ],
};

export function ValueProps({ lang, items: payloadItems, section }: ValuePropsProps) {
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";

  const eyebrow = getLocalized(section?.eyebrow, lang) || t.pages.home.valuePropsEyebrow;
  const title = getLocalized(section?.title, lang) || t.pages.home.valuePropsTitle;
  const description = getLocalized(section?.description, lang) || t.pages.home.valuePropsDescription;

  const items = payloadItems?.length
    ? payloadItems
        .filter((item: any) => item.isActive !== false)
        .map((item) => {
          const iconName = item.icon ?? "Globe";
          const IconComponent = iconMap[iconName] ?? Globe;
          return {
            icon: IconComponent,
            title: getLocalized(item.title, lang),
            description: getLocalized(item.description, lang),
          };
        })
    : (defaultItems[lang] || defaultItems.en).map((item) => ({
        ...item,
        icon: iconMap[item.icon] ?? Globe,
      }));

  const marqueeGroups = [0, 1];

  return (
    <section className="section bg-surface relative">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-navy/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="eyebrow text-brand-navy mb-4 sm:mb-5 md:mb-6">
            {eyebrow}
          </p>
          <h2 className="text-responsive-title mb-5 sm:mb-7 md:mb-8 text-foreground">
            {title}
          </h2>
          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          {/* Inline gradients keep the physical fade direction fixed: the global
              [dir="rtl"] rules flip bg-linear-to-r/l, which would put the
              transparent end on the wrong side under RTL. */}
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 z-20 pointer-events-none"
            style={{
              left: 0,
              backgroundImage:
                "linear-gradient(to right, var(--surface) 0%, var(--surface-90) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-24 sm:w-32 md:w-40 z-20 pointer-events-none"
            style={{
              right: 0,
              backgroundImage:
                "linear-gradient(to left, var(--surface) 0%, var(--surface-90) 50%, transparent 100%)",
            }}
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
                        className={`shrink-0 w-[min(20rem,calc(100vw-2rem))] sm:w-96 md:w-md ${
                          isRTL ? "text-right" : ""
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <div className="h-full flex flex-col p-6 sm:p-8 rounded-lg border border-foreground/10 bg-background shadow-lg">
                          <div className="relative mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-brand-navy/10 to-brand-navy/4" />
                            <IconComponent
                              size={32}
                              className="relative text-brand-navy sm:w-10 sm:h-10"
                              strokeWidth={1.2}
                            />
                          </div>

                          <h3 className="text-responsive-subheading text-foreground mb-3 sm:mb-4">
                            {item.title}
                          </h3>

                          <p className="text-sm sm:text-base text-foreground/65 leading-relaxed grow">
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
