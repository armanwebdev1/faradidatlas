"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Globe2, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import type { Language } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface CareersCultureProps {
  lang: Language;
}

const cultureItems = {
  en: [
    {
      title: "Safety First",
      description: "Food safety is not just policy—it's our identity.",
      icon: ShieldCheck,
    },
    {
      title: "Growth & Learning",
      description: "Continuous development with training and certifications.",
      icon: TrendingUp,
    },
    {
      title: "Global Impact",
      description: "Work across 50+ countries with diverse teams.",
      icon: Globe2,
    },
    {
      title: "Work-Life Balance",
      description: "Flexible arrangements and supportive culture.",
      icon: Scale,
    },
  ],
  fa: [
    {
      title: "ایمنی اول",
      description: "ایمنی غذایی فقط یک سیاست نیست—این هویت ما است.",
      icon: ShieldCheck,
    },
    {
      title: "رشد و یادگیری",
      description: "توسعه مداوم با برنامه‌های آموزشی و گواهی‌ها.",
      icon: TrendingUp,
    },
    {
      title: "تأثیر جهانی",
      description: "کار در بیش از ۵۰ کشور با تیم‌های متنوع.",
      icon: Globe2,
    },
    {
      title: "تعادل کاری-زندگی",
      description: "ترتیبات انعطاف‌پذیر و فرهنگ حمایتی.",
      icon: Scale,
    },
  ],
};

export function CareersCulture({ lang }: CareersCultureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards = cardRefs.current.filter(Boolean);
    const textTargets = [
      eyebrowRef.current,
      titleRef.current,
      subtitleRef.current,
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([...textTargets, ...cards], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(textTargets, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 30 });

      const timeline = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 98%",
        },
      });

      timeline
        .to(textTargets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = lang === "en" ? cultureItems.en : cultureItems.fa;

  return (
    <section
      id="culture"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-background overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-accent-warm-gold/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p
            ref={eyebrowRef}
            className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6"
          >
            {lang === "en" ? "Culture" : "فرهنگ سازمانی"}
          </p>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 sm:mb-6 tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            }}
          >
            {lang === "en" ? "Why Join Us" : "چرا به ما بپیوندید"}
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: "400",
            }}
          >
            {lang === "en"
              ? "We believe in creating a workplace where talent thrives, innovation flourishes, and your career matters."
              : "ما معتقدیم که در محیط کاری می‌تواند استعداد رشد کند، نوآوری شکوفا شود و حرفه شما اهمیت پیدا کند."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] to-transparent p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon
                      className="h-6 w-6 text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <h3
                  className="mt-6 text-lg sm:text-xl font-semibold text-foreground tracking-tight"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-hero)"
                        : "Estedad, var(--font-hero)",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm sm:text-base text-foreground/70 leading-relaxed"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                    fontWeight: "400",
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
