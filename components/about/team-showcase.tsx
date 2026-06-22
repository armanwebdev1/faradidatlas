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
};

export function TeamShowcase({ lang }: TeamShowcaseProps) {
  const valueList = lang === "en" ? values.en : values.fa;
  const isRTL = lang === "fa";
  const sectionIntro =
    lang === "en"
      ? "A compact set of standards guides how the team selects partners, protects quality, and builds long-term commercial trust."
      : "مجموعه‌ای روشن از ارزش‌ها، شیوه انتخاب همکاران، حفاظت از کیفیت و ایجاد اعتماد بلندمدت تجاری را هدایت می‌کند.";

  return (
    <AnimatedSection className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-28">
      <div
        className="relative z-10 mx-auto max-w-7xl"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="mb-12 grid gap-6 border-b border-foreground/10 pb-10 md:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 text-accent-warm-gold">
            {lang === "en" ? "Core Values" : "ارزش‌های بنیادین"}
            </p>
            <h2 className="max-w-4xl text-responsive-title text-primary">
            {lang === "en"
              ? "The principles behind every decision"
              : "اصولی که پشت هر تصمیم قرار دارد"}
            </h2>
          </div>
          <p className="text-responsive-body leading-relaxed text-foreground/70 lg:col-span-5">
            {sectionIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 shadow-[0_18px_45px_rgba(30,35,39,0.06)] sm:grid-cols-2 lg:grid-cols-6">
          {valueList.map((value, idx) => {
            const Icon = value.icon;
            const tileSpan = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <div
                key={idx}
                className={`${tileSpan} opacity-0 translate-y-6`}
                data-animate
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="relative flex h-full min-h-[230px] flex-col bg-white p-6 sm:p-7">
                  <div className="mb-7 flex items-start justify-between gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-warm-gold/25 bg-accent-warm-gold/10 text-accent-warm-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="font-hero text-4xl leading-none text-foreground/[0.08]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
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
