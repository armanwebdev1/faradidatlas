"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Language } from "@/lib/i18n";
import { Globe, CheckCircle, Route, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
      title: "کیفیت پیش از حجم",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = containerRef.current;
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

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const direction = isRTL ? 1 : -1;
    const existingClones = carousel.querySelectorAll("[data-clone='true']");
    existingClones.forEach((node) => node.remove());
    const itemWidth = carousel.children[0]?.getBoundingClientRect().width || 0;
    const gap = 24;
    const itemWithGap = itemWidth + gap;
    const totalWidth = itemWithGap * 4;

    const originalChildren = Array.from(carousel.children);
    originalChildren.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-clone", "true");
      carousel.appendChild(clone);
    });

    let timeline = gsap.timeline({ repeat: -1 });
    timeline.to(carousel, {
      x: direction * totalWidth,
      duration: 40,
      ease: "linear",
    });

    const handleResize = () => {
      timeline.kill();
      carousel.style.transform = "translateX(0)";

      const newItemWidth =
        carousel.children[0]?.getBoundingClientRect().width || 0;
      const newItemWithGap = newItemWidth + gap;
      const newTotalWidth = newItemWithGap * 4;

      const newTimeline = gsap.timeline({ repeat: -1 });
      newTimeline.to(carousel, {
        x: direction * newTotalWidth,
        duration: 40,
        ease: "linear",
      });
      timeline = newTimeline;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      timeline.kill();
      window.removeEventListener("resize", handleResize);
      const clones = carousel.querySelectorAll("[data-clone='true']");
      clones.forEach((node) => node.remove());
    };
  }, [isRTL]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 40,
    });

    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
      },
    });

    headerTimeline
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const items = lang === "en" ? valueItems.en : valueItems.fa;

  return (
    <section
      ref={containerRef}
      className="section bg-surface relative overflow-hidden opacity-0 translate-y-6"
    >
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
            ref={titleRef}
            className="text-responsive-title mb-5 sm:mb-7 md:mb-8 text-foreground"
          >
            {lang === "en"
              ? "Built for Continuity, Quality, and Trust"
              : "ساخته‌شده برای استمرار، کیفیت و اعتماد"}
          </h2>
          <p
            ref={subtitleRef}
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
            <div ref={carouselRef} className="flex gap-6 sm:gap-8 w-max py-2">
              {items.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    className="flex-shrink-0 w-80 sm:w-96 md:w-[28rem]"
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
