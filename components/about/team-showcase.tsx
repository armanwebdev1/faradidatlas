import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { AnimatedSection } from "./animated-section";
import { BadgeCheck, Leaf, Lightbulb, Scale, ShieldCheck } from "lucide-react";

interface TeamShowcaseProps {
  lang: Language;
  companyInfo?: any;
}

const values = {
  en: [
    {
      icon: BadgeCheck,
      title: "Customer-Centricity",
      description:
        "Prompt feedback, practical buyer-specific solutions, and long-term trust reflected in strong customer retention goals.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Responsible sourcing, recyclable packaging, local community support, and a stated goal to reduce waste by 20% by 1407 SH.",
    },
    {
      icon: Scale,
      title: "Professional Ethics",
      description:
        "Transparency, integrity, fair contracts, anti-corruption discipline, and customs-regulation compliance.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Digital sales channels, supply-chain traceability, ready-to-use spice blends, and agility toward plant-based demand.",
    },
    {
      icon: ShieldCheck,
      title: "Superior Quality",
      description:
        "Rigorous control at import, warehousing, and distribution stages to protect product trust and brand reputation.",
    },
  ],
  fa: [
    {
      icon: BadgeCheck,
      title: "مشتری‌مداری",
      description:
        "پاسخ‌گویی دقیق، درک نیاز خریداران و ارائه راهکارهایی متناسب با شرایط هر همکاری، پایه شکل‌گیری اعتماد بلندمدت با مشتریان ماست.",
    },
    {
      icon: Leaf,
      title: "پایداری",
      description:
        "ما به تأمین مسئولانه، کاهش ضایعات، استفاده بهتر از منابع و حمایت از جوامع محلی در مسیر زنجیره تأمین توجه داریم.",
    },
    {
      icon: Scale,
      title: "اخلاق حرفه‌ای",
      description:
        "شفافیت، درستکاری، قراردادهای منصفانه، رعایت مقررات گمرکی و پایبندی به اصول حرفه‌ای، اساس همکاری‌های ما را شکل می‌دهد.",
    },
    {
      icon: Lightbulb,
      title: "نوآوری",
      description:
        "توسعه کانال‌های فروش دیجیتال، بهبود ردیابی زنجیره تأمین و توجه به نیازهای تازه بازار، بخشی از نگاه نوآورانه ماست.",
    },
    {
      icon: ShieldCheck,
      title: "کیفیت برتر",
      description:
        "کنترل دقیق در مراحل واردات، انبارداری و توزیع به ما کمک می‌کند کیفیت محصول، اعتماد خریداران و اعتبار برندها حفظ شود.",
    },
  ],
  ar: [
    {
      icon: BadgeCheck,
      title: "التركيز على العميل",
      description:
        "الاستجابة الدقيقة وفهم احتياجات المشترين وتقديم حلول مخصصة لكل تعاون هي أساس بناء الثقة طويلة الأمد مع عملائنا.",
    },
    {
      icon: Leaf,
      title: "الاستدامة",
      description:
        "نحرص على التوريد المسؤول وتقليل الهدر واستخدام الموارد بشكل أفضل ودعم المجتمعات المحلية على طول سلسلة التوريد.",
    },
    {
      icon: Scale,
      title: "الأخلاق المهنية",
      description:
        "الشفافية والنزاهة والعقود العادلة والامتثال للوائح الجمارك والالتزام بالمبادئ المهنية هي أساس تعاوننا.",
    },
    {
      icon: Lightbulb,
      title: "الابتكار",
      description:
        "توسيع قنوات المبيعات الرقمية وتحسين التتبع عبر سلسلة التوريد والاستجابة لاحتياجات السوق الجديدة هي جزء من رؤيتنا المبتكرة.",
    },
    {
      icon: ShieldCheck,
      title: "جودة عالية",
      description:
        "المراقبة الدقيقة في مراحل الاستيراد والتخزين والتوزيع تساعدنا على الحفاظ على جودة المنتج وثقة المشترين وسمعة العلامات التجارية.",
    },
  ],
};

function getLocalized(value: any, lang: Language): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value[lang]) return value[lang]
  if (typeof value === 'object' && value.en) return value.en
  return ''
}

const iconArray = [BadgeCheck, Leaf, Scale, Lightbulb, ShieldCheck];

export function TeamShowcase({ lang, companyInfo }: TeamShowcaseProps) {
  const fallbackList = lang === "en" ? values.en : lang === "fa" ? values.fa : values.ar;
  const payloadValues = companyInfo?.values;
  const valueList = (payloadValues?.length > 0)
    ? payloadValues.map((v: any, idx: number) => ({
        icon: iconArray[idx % iconArray.length],
        title: getLocalized(v.title, lang),
        description: getLocalized(v.description, lang),
      }))
    : fallbackList;
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const sectionIntro = t.pages.about.valuesIntro;

  return (
    <AnimatedSection className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-28">
      <div
        className="relative z-10 mx-auto max-w-7xl"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div>
            <p className="eyebrow mb-4 text-brand-navy">
            {t.pages.about.coreValues}
            </p>
            <h2 className="max-w-4xl text-responsive-title text-primary">
            {t.pages.about.principlesTitle}
            </h2>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70">
            {sectionIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {valueList.map((value: any, idx: number) => {
            const Icon = value.icon;
            return (
              <div
                key={idx}
                className="opacity-0 translate-y-6"
                data-animate
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="relative flex h-full min-h-[260px] flex-col rounded-xl border border-foreground/10 bg-white p-6 shadow-sm sm:p-7">
                  <div className="mb-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-warm-gold/25 bg-accent-warm-gold/10 text-accent-warm-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
