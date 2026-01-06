"use client";

import type { Language } from "@/lib/i18n";

interface GlobalMarketsProps {
  lang: Language;
}

const markets = {
  en: [
    {
      region: "European Union",
      countries: "France, Germany, Italy, Spain",
      percentage: "28%",
    },
    {
      region: "Middle East & GCC",
      countries: "Saudi Arabia, UAE, Qatar",
      percentage: "22%",
    },
    {
      region: "Asian Markets",
      countries: "Japan, South Korea, China",
      percentage: "31%",
    },
    { region: "Americas", countries: "USA, Canada, Brazil", percentage: "19%" },
  ],
  fa: [
    {
      region: "اتحادیه اروپا",
      countries: "فرانسه، آلمان، ایتالیا، اسپانیا",
      percentage: "28%",
    },
    {
      region: "خاورمیانه و کشورهای خلیج فارس",
      countries: "عربستان سعودی، امارات، قطر",
      percentage: "22%",
    },
    {
      region: "بازارهای آسیایی",
      countries: "ژاپن، کره جنوبی، چین",
      percentage: "31%",
    },
    {
      region: "آمریکا",
      countries: "ایالات متحده، کانادا، برزیل",
      percentage: "19%",
    },
  ],
};

export function GlobalMarkets({ lang }: GlobalMarketsProps) {
  const isRTL = lang === "fa";
  const marketList = lang === "en" ? markets.en : markets.fa;

  return (
    <section id="markets" className="relative overflow-hidden">
      <div className="relative py-16 px-6 bg-muted">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent opacity-3 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent opacity-2 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-accent mx-auto mb-6 relative overflow-hidden rounded-full">
                <div className="h-full w-full bg-gradient-to-r from-accent via-accent-warm-gold to-accent animate-shimmer" />
              </div>
            </div>

            <h2
              className="section-title mb-8"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              <span
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                {lang === "en" ? "Global" : "حضور"}
              </span>
              <span
                className="inline-block ml-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {lang === "en" ? "Presence" : "جهانی"}
              </span>
            </h2>

            <p
              className="body-text text-foreground/70 max-w-3xl mx-auto animate-fade-in-up"
              style={{
                animationDelay: "0.3s",
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                fontSize: "clamp(16px, 2vw, 18px)",
              }}
            >
              {lang === "en"
                ? "Serving international importers and retailers across four continents with uncompromising quality and trusted partnerships"
                : "خدمات رسانی به واردکنندگان و فروشندگان بین‌المللی در چهار قاره با کیفیت بدون سازش و مراتب اعتماد"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {marketList.map((market, idx) => (
              <div
                key={idx}
                className="group relative h-full animate-slide-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-full p-8 bg-white border border-border rounded-xl transition-all duration-300 group-hover:border-foreground/30 group-hover:shadow-lg">
                  <div className="relative mb-8">
                    <div className="text-7xl md:text-6xl font-bold text-accent/10 absolute top-0 right-0">
                      {market.percentage}
                    </div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-accent">
                        {market.percentage}
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <h3
                      className="text-2xl font-semibold text-primary tracking-tight leading-[1.3]"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-hero)"
                            : "Estedad, var(--font-hero)",
                      }}
                    >
                      {market.region}
                    </h3>
                  </div>

                  <p
                    className="text-sm text-foreground/75 leading-[1.6]"
                    style={{
                      fontFamily:
                        lang === "en"
                          ? "var(--font-body)"
                          : "Shabnam, var(--font-body)",
                    }}
                  >
                    {market.countries}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-16 px-6 bg-white">
        <div className="relative max-w-7xl mx-auto">
          <div className="relative pt-0 border-t-0">
            <div className="text-center mb-10">
              <span
                className="category-label text-accent-warm-gold mb-6 inline-block"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "Satoshi, var(--font-label)"
                      : "Shabnam, var(--font-label)",
                  fontSize: "clamp(12px, 2vw, 16px)",
                }}
              >
                {lang === "en" ? "Quality Assurance" : "تضمین کیفیت"}
              </span>
              <h3
                className="section-title mb-8"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                }}
              >
                {lang === "en" ? "Certified Standards" : "استانداردهای معتبر"}
              </h3>
              <p
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
                  ? "International certifications and rigorous quality protocols ensuring excellence in every product"
                  : "گواهی‌های بین‌المللی و پروتکل‌های کیفی دقیق که تعالی را در هر محصول تضمین می‌کنند"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "ISO 22000",
                  description:
                    lang === "en"
                      ? "Food Safety Management"
                      : "مدیریت ایمنی مواد غذایی",
                },
                {
                  label: "HACCP",
                  description:
                    lang === "en" ? "Hazard Analysis" : "تجزیه و تحلیل خطرات",
                },
                {
                  label: "FSSC 22000",
                  description:
                    lang === "en"
                      ? "Food Safety Certification"
                      : "گواهی ایمنی مواد غذایی",
                },
                {
                  label: "Halal",
                  description:
                    lang === "en"
                      ? "Certified Halal Products"
                      : "محصولات معتبر حلال",
                },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="group relative h-full animate-slide-in-up overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative h-full p-8 bg-gradient-to-br from-muted/50 to-white border border-border rounded-xl transition-all duration-300 group-hover:border-foreground/20 group-hover:shadow-md text-center">
                    <div className="mb-4">
                      <h4
                        className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.3]"
                        style={{
                          fontFamily:
                            lang === "en"
                              ? "var(--font-hero)"
                              : "Estedad, var(--font-hero)",
                        }}
                      >
                        {cert.label}
                      </h4>
                    </div>

                    <p
                      className="text-sm md:text-base text-foreground/75 leading-[1.6]"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-body)"
                            : "Shabnam, var(--font-body)",
                      }}
                    >
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16 px-6 bg-muted/40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent opacity-2 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="category-label text-accent-warm-gold mb-6 inline-block"
              style={{
                fontFamily:
                  lang === "en"
                    ? "Satoshi, var(--font-label)"
                    : "Shabnam, var(--font-label)",
                fontSize: "clamp(12px, 2vw, 16px)",
              }}
            >
              {lang === "en" ? "Global Leadership" : "رهبری جهانی"}
            </span>
            <h2
              className="section-title mb-8"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {lang === "en" ? "International" : "بین‌المللی"}{" "}
              <span className="relative">
                {lang === "en" ? "Excellence" : "تعالی"}
                <span className="absolute bottom-2 left-0 right-0 h-1 bg-accent/40 rounded-full blur-sm" />
              </span>
            </h2>
            <p
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
                ? "With operations spanning four continents and a commitment to the highest global standards, we deliver premium quality products to discerning partners worldwide."
                : "با عملیات در چهار قاره و تعهد به بالاترین استانداردهای جهانی، ما محصولات با کیفیت برتر را به شرکای منتخب در سراسر جهان تحویل می‌دهیم."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "4",
                label: lang === "en" ? "Continents" : "قاره‌ها",
                description:
                  lang === "en"
                    ? "Global reach and presence"
                    : "دسترسی و حضور جهانی",
              },
              {
                metric: "50+",
                label: lang === "en" ? "Countries" : "کشورها",
                description:
                  lang === "en"
                    ? "Serving international markets"
                    : "ارائه خدمات به بازارهای بین‌المللی",
              },
              {
                metric: "100%",
                label: lang === "en" ? "Certified" : "معتبر‌شده",
                description:
                  lang === "en"
                    ? "ISO and international standards"
                    : "استانداردهای ISO و بین‌المللی",
              },
              {
                metric: "20+",
                label: lang === "en" ? "Years" : "سال",
                description:
                  lang === "en"
                    ? "Industry expertise and trust"
                    : "تخصص صنعتی و اعتماد",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group animate-slide-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative p-8 bg-white border border-border rounded-2xl transition-all duration-300 group-hover:border-foreground/30 group-hover:shadow-lg text-center h-full flex flex-col justify-center items-center">
                  <div className="mb-6">
                    <p className="font-serif text-5xl md:text-6xl font-bold text-accent">
                      {item.metric}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3
                      className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-[1.3]"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-hero)"
                            : "Estedad, var(--font-hero)",
                      }}
                    >
                      {item.label}
                    </h3>
                  </div>
                  <p
                    className="text-sm md:text-base text-foreground/75 leading-[1.6]"
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
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <p
                className="text-sm md:text-base text-muted-foreground font-medium tracking-widest uppercase px-4"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "Satoshi, var(--font-label)"
                      : "Shabnam, var(--font-label)",
                }}
              >
                {lang === "en" ? "Trusted Globally" : "مورد اعتماد جهانی"}
              </p>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>

            <p
              className="text-center body-text text-foreground max-w-4xl mx-auto animate-fade-in-up"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                fontSize: "clamp(16px, 2vw, 18px)",
              }}
            >
              {lang === "en"
                ? "Across Europe, the Middle East, Asia, and the Americas, our unwavering commitment to excellence and quality standards has established lasting partnerships with the world's most discerning importers and retailers."
                : "در سراسر اروپا، خاورمیانه، آسیا و آمریکا، تعهد بدون تزلزل ما به تعالی و استانداردهای کیفیت روابط طولانی‌مدتی را با واردکنندگان و فروشندگان منتخب جهان ایجاد کرده است."}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.1;
        }
        .body-text {
          font-size: clamp(1rem, 3vw, 1.125rem);
        }
        .category-label {
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
