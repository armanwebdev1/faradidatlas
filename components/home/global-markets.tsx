"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";

interface GlobalMarketsProps {
  lang: Language;
}

const markets = {
  en: [
    {
      region: "European Union",
      countries: "France, Germany, Italy, Spain",
      percentage: 28,
    },
    {
      region: "Middle East & GCC",
      countries: "Saudi Arabia, UAE, Qatar",
      percentage: 22,
    },
    {
      region: "Asian Markets",
      countries: "Japan, South Korea, China",
      percentage: 31,
    },
    { region: "Americas", countries: "USA, Canada, Brazil", percentage: 19 },
  ],
  fa: [
    {
      region: "اتحادیه اروپا",
      countries: "فرانسه، آلمان، ایتالیا، اسپانیا",
      percentage: 28,
    },
    {
      region: "خاورمیانه و کشورهای خلیج فارس",
      countries: "عربستان سعودی، امارات، قطر",
      percentage: 22,
    },
    {
      region: "بازارهای آسیایی",
      countries: "ژاپن، کره جنوبی، چین",
      percentage: 31,
    },
    {
      region: "آمریکا",
      countries: "ایالات متحده، کانادا، برزیل",
      percentage: 19,
    },
  ],
};

// Animated counter component
function CountUpPercentage({ target }: { target: number }) {
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

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, (duration * 1000) / steps);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={containerRef} className="text-4xl md:text-5xl font-sans font-bold text-accent-warm-gold">
      {count}%
    </div>
  );
}

export function GlobalMarkets({ lang }: GlobalMarketsProps) {
  const isRTL = lang === "fa";
  const marketList = lang === "en" ? markets.en : markets.fa;

  return (
    <section
      id="markets"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50/50 to-slate-100/70"
    >
      {/* Markets Section */}
      <div className="relative py-12 md:py-16 px-6">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-6 text-foreground">
              <span
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                {lang === "en" ? "Global" : "حضور"}
              </span>
              <span
                className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {lang === "en" ? "Presence" : "جهانی"}
              </span>
            </h2>

            <p
              className="body-text max-w-2xl mx-auto text-foreground/70 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {lang === "en"
                ? "Serving international importers and retailers across four continents with uncompromising quality and trusted partnerships"
                : "خدمات رسانی به واردکنندگان و فروشندگان بین‌المللی در چهار قاره با کیفیت بدون سازش و مراتب اعتماد"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {marketList.map((market, idx) => (
              <div
                key={idx}
                className="group relative animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className="relative p-8 md:p-10 border border-border/50 rounded-lg transition-all duration-500 ease-out group-hover:border-accent-warm-gold/60 group-hover:shadow-xl"
                  style={{
                    backgroundColor: "hsl(var(--card) / 0.8)",
                  }}
                >
                  <div className="mb-6 relative">
                    <CountUpPercentage target={market.percentage} />
                  </div>

                  <div className="mb-4 pb-4 border-b border-border/30">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                      {market.region}
                    </h3>
                  </div>

                  <p className="body-text text-foreground/60">
                    {market.countries}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
