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
        "Prompt responses, practical solutions, and long-term relationships built on trust.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Responsible sourcing, reduced waste, recyclable packaging, and support for local communities.",
    },
    {
      icon: Scale,
      title: "Professional Ethics",
      description:
        "Transparent supplier relationships, fair contracts, compliance, and accountable operations.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "New products, digital sales channels, and better traceability across the supply chain.",
    },
    {
      icon: ShieldCheck,
      title: "Superior Quality",
      description:
        "Rigorous control at import, warehousing, and distribution stages to protect brand trust.",
    },
  ],
  fa: [
    {
      icon: BadgeCheck,
      title: "مشتری‌مداری",
      description:
        "پاسخ‌گویی سریع، راهکارهای کاربردی و روابط بلندمدت بر پایه اعتماد.",
    },
    {
      icon: Leaf,
      title: "پایداری",
      description:
        "تامین مسئولانه، کاهش ضایعات، بسته‌بندی قابل بازیافت و حمایت از جوامع محلی.",
    },
    {
      icon: Scale,
      title: "اخلاق حرفه‌ای",
      description:
        "روابط شفاف با تامین‌کنندگان، قراردادهای منصفانه، رعایت مقررات و عملیات پاسخ‌گو.",
    },
    {
      icon: Lightbulb,
      title: "نوآوری",
      description:
        "محصولات جدید، کانال‌های فروش دیجیتال و رهگیری بهتر در سراسر زنجیره تامین.",
    },
    {
      icon: ShieldCheck,
      title: "کیفیت برتر",
      description:
        "کنترل دقیق در مراحل واردات، انبارداری و توزیع برای حفظ اعتماد به برند.",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
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
