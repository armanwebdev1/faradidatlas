"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AboutHeroProps {
  lang: Language;
}

export function AboutHero({ lang }: AboutHeroProps) {
  const isRTL = lang === "fa";
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    const elements = headlineRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.12}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section-hero relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-full">
        <div className="space-y-20">
          {/* Headline */}
          <div ref={headlineRef} className="text-center">
            <p
              className="eyebrow mb-4 text-accent-warm-gold opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "About Us" : "درباره ما"}
            </p>
            <h1
              className="text-responsive-hero text-primary mb-8 max-w-5xl mx-auto opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en"
                ? "We focuses on the development of retail-oriented properties that strategically position retailers and reward investors."
                : "ما بر توسعه ملک‌های تجاری متمرکز هستیم که استراتژیک‌الانه خرده‌فروشان را قرار می‌دهند و سرمایه‌گذاران را پاداش می‌دهند."}
            </h1>
            <button
              className="btn btn-primary btn-md opacity-0 translate-y-6"
              data-animate
            >
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </button>
          </div>

          {/* Image */}
          <div>
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                alt="Retail property"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <h2 className="text-responsive-title text-primary">
              {lang === "en" ? "Get to know us more" : "بیشتر درباره ما بدانید"}
            </h2>

            {/* Keep English LTR, Persian RTL */}
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="space-y-6"
              style={{
                unicodeBidi: "plaintext",
                direction: isRTL ? "rtl" : "ltr",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Owned and run by a group of commercial property experts, we provide property consultancy services for owners, occupiers, investors, developers and financial advisors of property and associated assets."
                  : "صاحب و اداره‌شده توسط گروهی از متخصصان املاک تجاری، ما خدمات مشاوره املاک را برای مالکان، بهره‌برداران، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ارائه می‌دهیم."}
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and skills to provide complete property advice, ultimately making you and your business more successful. The property industry continues to transform through influences in technology, culture and economy and we are excited to be a part of the journey, making an impact where we can, and adapting where needed."
                  : "ما با فعالیت از دفاتر خود در شهرهای مختلف، دانش و مهارت‌های خود را برای ارائه مشاوره جامع ملکی ترکیب می‌کنیم و به موفقیت بیشتر شما و کسب‌وکارتان کمک می‌کنیم."}
              </p>
            </div>
          </div>

          {/* Founder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* CEO */}
            <div className="flex gap-4 items-center">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lang === "en" ? "Daniel Redcliff" : "دنیل ردکلیف"}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-xl">
              {lang === "en"
                ? "“Our goal is to provide house for the people who are in a tight budget could not afford to check houses from places to places. We tries to cut off that travel expenses and motivate them to increase the budget.”"
                : "«هدف ما فراهم کردن خانه برای افرادی است که بودجه محدودی دارند و نمی‌توانند برای بازدید از خانه‌ها سفر کنند.»"}
            </blockquote>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <Stat
              value={8.93}
              suffix="%"
              decimals={2}
              labelEn="Profit return rate"
              labelFa="نرخ بازده سود"
              lang={lang}
            />
            <Stat
              value={12.6}
              suffix="K"
              decimals={1}
              labelEn="Listed property"
              labelFa="ملک موجود"
              lang={lang}
            />
            <Stat
              value={16}
              suffix="+"
              labelEn="Operational area"
              labelFa="منطقه فعالیت"
              lang={lang}
            />
            <Stat
              value={12}
              suffix="+"
              labelEn="Awards won"
              labelFa="جوایز کسب شده"
              lang={lang}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUpValue({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1.2;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const interval = setInterval(
            () => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(interval);
              } else if (decimals > 0) {
                setCount(Number(current.toFixed(decimals)));
              } else {
                setCount(Math.floor(current));
              }
            },
            (duration * 1000) / steps,
          );

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [target, decimals]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <p ref={containerRef} className="text-3xl font-bold text-primary">
      {display}
      {suffix}
    </p>
  );
}

function Stat({
  value,
  suffix,
  decimals = 0,
  labelEn,
  labelFa,
  lang,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  labelEn: string;
  labelFa: string;
  lang: Language;
}) {
  return (
    <div>
      <CountUpValue target={value} suffix={suffix} decimals={decimals} />
      <p className="text-xs text-muted-foreground">
        {lang === "en" ? labelEn : labelFa}
      </p>
    </div>
  );
}
