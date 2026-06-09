import type { Language } from "@/lib/i18n";
import { AnimatedSection } from "./animated-section";
import { BadgeCheck, Leaf, Lightbulb, Scale, ShieldCheck } from "lucide-react";

interface TeamShowcaseProps {
  lang: Language;
}

const values = {
  en: [
    {
      icon: BadgeCheck,
      title: "Customer-Centricity",
      description:
        "Prompt feedback, practical buyer-specific solutions, and long-term trust reflected in the DOCX's retention focus above 80%.",
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
        "پاسخ‌گویی سریع، راهکارهای متناسب با خریدار و اعتماد بلندمدت که در متن مرجع با تمرکز بر حفظ مشتری بیش از ۸۰ درصد بیان شده است.",
    },
    {
      icon: Leaf,
      title: "پایداری",
      description:
        "تامین مسئولانه، بسته‌بندی قابل بازیافت، حمایت از جوامع محلی و هدف کاهش ۲۰ درصدی ضایعات تا سال ۱۴۰۷.",
    },
    {
      icon: Scale,
      title: "اخلاق حرفه‌ای",
      description:
        "شفافیت، درستکاری، قراردادهای منصفانه، انضباط ضدفساد و رعایت مقررات گمرکی.",
    },
    {
      icon: Lightbulb,
      title: "نوآوری",
      description:
        "کانال‌های فروش دیجیتال، رهگیری زنجیره تامین، ترکیب‌های ادویه آماده مصرف و چابکی در برابر تقاضای محصولات گیاهی.",
    },
    {
      icon: ShieldCheck,
      title: "کیفیت برتر",
      description:
        "کنترل دقیق در مراحل واردات، انبارداری و توزیع برای حفظ اعتماد به محصول و اعتبار برند.",
    },
  ],
};

export function TeamShowcase({ lang }: TeamShowcaseProps) {
  const valueList = lang === "en" ? values.en : values.fa;

  return (
    <AnimatedSection className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
            {lang === "en" ? "Core Values" : "ارزش‌های بنیادین"}
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-hero"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {lang === "en"
              ? "The principles behind every decision"
              : "اصولی که پشت هر تصمیم قرار دارد"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {valueList.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={idx}
                className="group opacity-0 translate-y-6"
                data-animate
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden border border-border hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500 h-full p-6">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-warm-gold/15 text-accent-warm-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent-warm-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
