"use client";

import Link from "next/link";
import type { Language } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

interface CTASectionProps {
  lang: Language;
}

// Animated counter component for statistics
function CountUpNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1.2; // 1.2 seconds for smooth count-up
          const steps = 60; // 60 frames for smooth animation
          const increment = target / steps;
          let current = 0;

          const interval = setInterval(
            () => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(interval);
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
  }, [target]);

  return (
    <div
      ref={containerRef}
      className="text-2xl sm:text-3xl md:text-4xl font-bold"
    >
      {count}
      {suffix}
    </div>
  );
}

export function CTASection({ lang }: CTASectionProps) {
  const isRTL = lang === "fa";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      section.classList.remove("opacity-0", "translate-y-6");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        section.classList.add("animate-fade-in-up");
        section.classList.remove("opacity-0", "translate-y-6");
        observer.unobserve(section);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden bg-background-alt opacity-0 translate-y-6"
    >
      {/* Updated background and simplified decorative elements - responsive sizing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/2 w-96 sm:w-[500px] md:w-[800px] h-96 sm:h-[500px] md:h-[800px] rounded-full bg-accent/5 blur-[80px] md:blur-[120px]" />
      </div>

      <div className="relative container-wide">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p
            className="eyebrow text-accent"
          >
            {lang === "en" ? "Exclusive Sourcing" : "تامین انحصاری"}
          </p>
        </div>

        {/* Split layout with responsive flex direction */}
        <div
          className={`flex flex-col lg:flex-row items-stretch gap-6 md:gap-12 lg:gap-16 xl:gap-20 mb-12 md:mb-20 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Part - responsive sizing */}
          <div className="flex-1 lg:w-1/2 min-h-64 sm:min-h-80 md:min-h-96 lg:min-h-full">
            <div className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-xl md:shadow-2xl h-full">
              <img
                src="/cta.jpg"
                alt="Partnership"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg sm:rounded-2xl" />
            </div>
          </div>

          {/* Text & Buttons - responsive typography and spacing */}
          <div
            className={`flex-1 lg:w-1/2 flex flex-col justify-center py-4 sm:py-6 lg:py-8 text-center ${
              isRTL ? "lg:text-right" : "lg:text-left"
            }`}
          >
            <h2 className="text-responsive-title mb-4 sm:mb-6 md:mb-8">
              {lang === "en" ? (
                <>
                  Optimal <span className="italic font-light">growth</span>{" "}
                  meets exquisite design
                </>
              ) : (
                "رشد بهینه با طراحی نفیس"
              )}
            </h2>

            {/* Body text - responsive */}
            <p
              className="text-responsive-body text-muted-foreground max-w-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-light"
            >
              {lang === "en"
                ? "Experience a partnership that transforms your supply chain into a functional work of art with our custom global solutions."
                : "مشارکتی را تجربه کنید که زنجیره تأمین شما را با راهکارهای جهانی سفارشی ما به یک اثر هنری کاربردی تبدیل می‌کند."}
            </p>

            {/* CTA Buttons - responsive stack */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href={`/${lang}/contact`}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {lang === "en" ? "Get Started" : "???????? ????????"}
              </Link>

              <Link
                href={`/${lang}/about`}
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                {lang === "en" ? "Learn More" : "?????????? ????????????"}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom part - responsive trust stats */}
        <div className="relative pt-8 sm:pt-12 md:pt-16 border-t border-foreground/10">
          {/* Center decoration - responsive sizing */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 sm:w-8 h-6 sm:h-8 border border-accent rounded-full flex items-center justify-center bg-background">
              <span className="text-xs sm:text-sm bg-gradient-to-r from-foreground to-accent-warm-copper bg-clip-text text-transparent font-bold">
                +
              </span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            {/* Label - responsive */}
            <p
              className="eyebrow text-foreground/60 mb-4 md:mb-6"
            >
              {lang === "en" ? "Trusted Partnership" : "مشارکت معتبر"}
            </p>

            {/* Description - responsive */}
            <p
              className="text-responsive-body text-muted-foreground font-light px-2 sm:px-0"
            >
              {lang === "en"
                ? "Hundreds of international importers and retailers partner with us for reliability, quality assurance, and specialized B2B support that drives sustainable growth."
                : "صدها واردکننده و فروشنده بین‌المللی برای قابلیت اعتماد، اطمینان کیفیت و پشتیبانی تخصصی B2B که رشد پایدار را تعزیز می‌کند، با ما مشارکت دارند."}
            </p>

            {/* Stats Grid - responsive layout */}
            <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-foreground/20 flex-wrap sm:flex-nowrap">
              {/* Partners stat */}
              <div className="text-center group cursor-default flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent transition-all duration-500 group-hover:from-accent group-hover:to-accent-warm-copper">
                  <CountUpNumber target={150} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50 transition-colors duration-500 group-hover:text-accent">
                  {lang === "en" ? "Partners" : "همکاران"}
                </p>
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-accent to-transparent" />

              {/* Countries stat */}
              <div className="text-center group cursor-default flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent-warm-copper bg-clip-text text-transparent transition-all duration-500 group-hover:from-accent-warm-copper group-hover:to-accent">
                  <CountUpNumber target={50} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50 transition-colors duration-500 group-hover:text-accent-warm-copper">
                  {lang === "en" ? "Countries" : "کشورها"}
                </p>
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-accent to-transparent" />

              {/* Experience stat */}
              <div className="text-center group cursor-default flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent transition-all duration-500 group-hover:from-accent-warm-copper group-hover:to-accent">
                  <CountUpNumber target={20} suffix="y" />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50 transition-colors duration-500 group-hover:text-accent-warm-copper">
                  {lang === "en" ? "Experience" : "تجربه"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
