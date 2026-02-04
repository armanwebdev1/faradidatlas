"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Language } from "@/lib/i18n";
import { Globe, CheckCircle, Tag, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ValuePropsProps {
  lang: Language;
}

const valueItems = {
  en: [
    {
      icon: Globe,
      title: "Global Sourcing",
      description:
        "Direct partnerships with premium producers across 15+ countries",
      accentColor: "accent-warm-gold",
    },
    {
      icon: CheckCircle,
      title: "Quality Control",
      description:
        "Rigorous testing at every stage: harvest, processing, packaging, shipping",
      accentColor: "accent-warm-red",
    },
    {
      icon: Tag,
      title: "Private Labeling",
      description:
        "White-label solutions with flexible MOQs and custom packaging",
      accentColor: "accent",
    },
    {
      icon: Package,
      title: "Export Ready",
      description:
        "All products certified for international export with full documentation",
      accentColor: "accent-warm-orange",
    },
  ],
  fa: [
    {
      icon: Globe,
      title: "تامین بین‌المللی",
      description: "همکاری مستقیم با تولیدکنندگان برتر در بیش از ۱۵ کشور",
      accentColor: "accent-warm-gold",
    },
    {
      icon: CheckCircle,
      title: "کنترل کیفیت",
      description:
        "آزمایش دقیق در هر مرحله: برداشت، فرآوری، بسته‌بندی، حمل‌ونقل",
      accentColor: "accent-warm-red",
    },
    {
      icon: Tag,
      title: "علامت‌گذاری خصوصی",
      description:
        "راه‌حل‌های برچسب سفید با حداقل سفارش انعطاف‌پذیر و بسته‌بندی سفارشی",
      accentColor: "accent",
    },
    {
      icon: Package,
      title: "آماده صادرات",
      description: "تمام محصولات معتبر برای صادرات بین‌المللی با اسناد کامل",
      accentColor: "accent-warm-orange",
    },
  ],
};

export function ValueProps({ lang }: ValuePropsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const itemWidth = carousel.children[0]?.getBoundingClientRect().width || 0;
    const gap = 24;
    const itemWithGap = itemWidth + gap;
    const totalWidth = itemWithGap * 4;

    const originalChildren = Array.from(carousel.children);
    originalChildren.forEach((child) => {
      const clone = child.cloneNode(true);
      carousel.appendChild(clone);
    });

    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(carousel, {
      x: -totalWidth,
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
        x: -newTotalWidth,
        duration: 40,
        ease: "linear",
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      timeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      className="space-responsive px-4 sm:px-6 bg-white relative overflow-hidden"
    >
      {/* Subtle decorative gradient elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-accent-warm-gold/3 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/2 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Premium Section Header - No yellow label */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="text-responsive-title md:text-5xl lg:text-6xl mb-5 sm:mb-7 md:mb-8 leading-tight text-foreground"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            }}
          >
            {lang === "en"
              ? "Excellence in Every Partnership"
              : "تعالی در هر مشارکت"}
          </h2>
          <p
            ref={subtitleRef}
            className="text-responsive-body text-foreground/70 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontSize: "clamp(14px, 2vw, 17px)",
              fontWeight: "400",
            }}
          >
            {lang === "en"
              ? "Trusted by distributors and retailers worldwide for premium sourcing, rigorous quality control, and reliable partnerships"
              : "توسط توزیع‌کنندگان و فروشندگان جهانی برای تامین برتر، کنترل کیفیت دقیق و مشارکت‌های قابل‌اعتماد"}
          </p>
        </div>

        {/* Premium Carousel Container */}
        <div className="relative">
          {/* Gradient fade overlays - smoother and more elegant */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none" />

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
                    {/* Premium Card with minimalist design */}
                    <div className="h-full flex flex-col p-6 sm:p-8 rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01] backdrop-blur-md transition-colors duration-500 hover:bg-gradient-to-br hover:from-foreground/[0.05] hover:to-foreground/[0.02]">
                      {/* Icon Container with accent underline */}
                      <div className="relative mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/8 to-foreground/4" />
                        <IconComponent
                          size={32}
                          className="relative text-foreground sm:w-10 sm:h-10"
                          strokeWidth={1.2}
                        />
                        {/* Accent line below icon */}
                        <div
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 sm:w-10 rounded-full`}
                          style={{
                            backgroundColor: `var(--${item.accentColor})`,
                          }}
                        />
                      </div>

                      {/* Title with premium typography */}
                      <h3
                        className="text-xl sm:text-2xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight leading-snug"
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

                      {/* Description with refined typography */}
                      <p
                        className="text-sm sm:text-base text-foreground/65 leading-relaxed flex-grow"
                        style={{
                          fontFamily:
                            lang === "en"
                              ? "var(--font-body)"
                              : "Shabnam, var(--font-body)",
                          fontWeight: "400",
                          lineHeight: "1.65",
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Accent dot in bottom right */}
                      <div className="flex justify-end mt-6 sm:mt-8">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: `var(--${item.accentColor})`,
                          }}
                        />
                      </div>
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
