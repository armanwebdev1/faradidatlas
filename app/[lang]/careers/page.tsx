import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JobListing } from "@/components/careers/job-listing";
import { jobs } from "@/components/careers/job-data";
import type { Language } from "@/lib/i18n";

interface CareersPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero Section - Premium & Modern */}
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-white overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-accent-warm-gold/3 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/2 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 sm:mb-8 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "600",
                  letterSpacing: "-0.01em",
                }}
              >
                {lang === "en" ? "Join Our Team" : "به تیم ما بپیوندید"}
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
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
                  ? "We're looking for talented individuals who share our commitment to quality, safety, and excellence. Be part of a dynamic team driving innovation across the globe."
                  : "ما به دنبال افراد توانمندی هستیم که با ما تعهد به کیفیت، ایمنی و تعالی را به اشتراک بگذارند. بخشی از تیم پویایی باشید که نوآوری را در سراسر جهان هدایت می‌کند."}
              </p>
            </div>
          </div>
        </section>

        {/* Culture Section - Premium Design */}
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-accent-warm-gold/3 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "600",
                  letterSpacing: "-0.01em",
                }}
              >
                {lang === "en" ? "Our Culture" : "فرهنگ ما"}
              </h2>
              <p
                className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto"
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
                  ? "Built on values of integrity, excellence, and continuous improvement"
                  : "بر اساس ارزش‌های درستکاری، تعالی و بهبود مداوم"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  en: "Safety First",
                  fa: "ایمنی اول",
                  descEn:
                    "Food safety is not just policy—it's our identity. Every decision is guided by our commitment to protect consumers.",
                  descFa:
                    "ایمنی غذایی فقط یک سیاست نیست—این هویت ما است. هر تصمیم با تعهد ما به حفاظت از مصرف‌کنندگان راهنمایی می‌شود.",
                  icon: "🛡️",
                },
                {
                  en: "Continuous Learning",
                  fa: "یادگیری مداوم",
                  descEn:
                    "We invest in our people with training programs, certifications, and career development opportunities.",
                  descFa:
                    "ما در افراد خود سرمایه‌گذاری می‌کنیم با برنامه‌های آموزشی، تصدیق‌ها و فرصت‌های توسعه شغلی.",
                  icon: "📚",
                },
                {
                  en: "Global Perspective",
                  fa: "دیدگاه جهانی",
                  descEn:
                    "Work with an international team serving 40+ countries. You'll develop skills in cross-cultural collaboration.",
                  descFa:
                    "با تیم بین‌المللی کار کنید که خدمات رسانی به ۴۰+ کشور را انجام می‌دهند.",
                  icon: "🌍",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-foreground/8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.01] backdrop-blur-md transition-all duration-500 text-center hover:border-foreground/15 hover:bg-gradient-to-br hover:from-foreground/[0.05] hover:to-foreground/[0.02]"
                >
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight"
                    style={{
                      fontFamily:
                        lang === "en"
                          ? "var(--font-hero)"
                          : "Estedad, var(--font-hero)",
                      fontWeight: "600",
                    }}
                  >
                    {lang === "en" ? item.en : item.fa}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-foreground/65 leading-relaxed group-hover:text-foreground/75 transition-colors duration-500"
                    style={{
                      fontFamily:
                        lang === "en"
                          ? "var(--font-body)"
                          : "Shabnam, var(--font-body)",
                      fontWeight: "400",
                    }}
                  >
                    {lang === "en" ? item.descEn : item.descFa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings Section - Premium Design */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 sm:mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 sm:mb-6 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "600",
                  letterSpacing: "-0.01em",
                }}
              >
                {lang === "en" ? "Open Positions" : "موقعیت‌های باز"}
              </h2>
              <p
                className="text-base sm:text-lg text-foreground/70 max-w-2xl"
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
                  ? "Explore opportunities to grow your career with us"
                  : "فرصت‌هایی برای رشد حرفه‌ای خود با ما را کاوش کنید"}
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {jobs.map((job, idx) => (
                <div
                  key={job.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <JobListing job={job} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
