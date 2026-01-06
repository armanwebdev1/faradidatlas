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
      color: "from-accent-warm-gold/20 to-accent-warm-orange/10",
      borderColor: "border-accent-warm-gold/40",
    },
    {
      icon: CheckCircle,
      title: "Quality Control",
      description:
        "Rigorous testing at every stage: harvest, processing, packaging, shipping",
      color: "from-accent-warm-red/20 to-accent-warm-orange/10",
      borderColor: "border-accent-warm-red/40",
    },
    {
      icon: Tag,
      title: "Private Labeling",
      description:
        "White-label solutions with flexible MOQs and custom packaging",
      color: "from-accent/20 to-accent-warm-gold/10",
      borderColor: "border-accent/40",
    },
    {
      icon: Package,
      title: "Export Ready",
      description:
        "All products certified for international export with full documentation",
      color: "from-accent-warm-orange/20 to-accent-warm-red/10",
      borderColor: "border-accent-warm-orange/40",
    },
  ],
  fa: [
    {
      icon: Globe,
      title: "تامین بین‌المللی",
      description: "همکاری مستقیم با تولیدکنندگان برتر در بیش از ۱۵ کشور",
      color: "from-accent-warm-gold/20 to-accent-warm-orange/10",
      borderColor: "border-accent-warm-gold/40",
    },
    {
      icon: CheckCircle,
      title: "کنترل کیفیت",
      description:
        "آزمایش دقیق در هر مرحله: برداشت، فرآوری، بسته‌بندی، حمل‌ونقل",
      color: "from-accent-warm-red/20 to-accent-warm-orange/10",
      borderColor: "border-accent-warm-red/40",
    },
    {
      icon: Tag,
      title: "علامت‌گذاری خصوصی",
      description:
        "راه‌حل‌های برچسب سفید با حداقل سفارش انعطاف‌پذیر و بسته‌بندی سفارشی",
      color: "from-accent/20 to-accent-warm-gold/10",
      borderColor: "border-accent/40",
    },
    {
      icon: Package,
      title: "آماده صادرات",
      description: "تمام محصولات معتبر برای صادرات بین‌المللی با اسناد کامل",
      color: "from-accent-warm-orange/20 to-accent-warm-red/10",
      borderColor: "border-accent-warm-orange/40",
    },
  ],
};

export function ValueProps({ lang }: ValuePropsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const itemWidth = carousel.children[0]?.getBoundingClientRect().width || 0;
    const gap = 32;
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
      duration: 30,
      ease: "none",
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
        duration: 30,
        ease: "none",
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

    gsap.set([labelRef.current, titleRef.current, subtitleRef.current], {
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
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const items = lang === "en" ? valueItems.en : valueItems.fa;

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 px-6 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-warm-gold/5 to-accent-warm-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-accent-warm-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p
            ref={labelRef}
            className="category-label text-accent-warm-gold mb-6"
            style={{
              fontFamily:
                lang === "en"
                  ? "Satoshi, var(--font-label)"
                  : "Shabnam, var(--font-label)",
              fontSize: "clamp(12px, 2vw, 16px)",
            }}
          >
            Why Choose Us
          </p>
          <h2
            ref={titleRef}
            className="section-title mb-8"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            {lang === "en"
              ? "Excellence in Every Partnership"
              : "تعالی در هر مشارکت"}
          </h2>
          <p
            ref={subtitleRef}
            className="body-text text-foreground/70 max-w-3xl mx-auto"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontSize: "clamp(16px, 2vw, 18px)",
            }}
          >
            {lang === "en"
              ? "Trusted by distributors and retailers worldwide for premium sourcing, rigorous quality control, and reliable partnerships that drive growth"
              : "توسط توزیع‌کنندگان و فروشندگان جهانی برای تامین برتر، کنترل کیفیت دقیق و مشارکت‌های قابل‌اعتمادی که رشد را تسهیل می‌کنند"}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none" />

          <div className="overflow-hidden">
            <div ref={carouselRef} className="flex gap-8 w-max">
              {items.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    className={`flex-shrink-0 w-full sm:w-96 p-8 md:p-10 rounded-3xl border-2 ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm hover:shadow-2xl hover:shadow-accent-warm-gold/20 transition-all duration-500 group cursor-default`}
                  >
                    <div className="mb-8 inline-flex p-4 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm group-hover:from-white/60 group-hover:to-white/40 transition-all duration-300">
                      <IconComponent
                        size={32}
                        className="text-primary group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-semibold text-primary mb-4 group-hover:text-accent-warm-gold transition-colors duration-300 tracking-tight leading-[1.3]"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-hero)"
                            : "Estedad, var(--font-hero)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-foreground/75 leading-[1.6] group-hover:text-foreground/85 transition-colors duration-300"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-body)"
                            : "Shabnam, var(--font-body)",
                      }}
                    >
                      {item.description}
                    </p>
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
