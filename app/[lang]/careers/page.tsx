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
        {/* Hero Section with Large Imagery */}
        <section className="relative h-screen w-full overflow-hidden bg-neutral-950">
          {/* Hero Image Background with Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/featured1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-warm-gold/40 bg-gradient-to-r from-accent-warm-gold/15 to-transparent backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent-warm-gold animate-pulse" />
                <span
                  className="text-xs sm:text-sm font-semibold text-accent-warm-gold uppercase tracking-widest"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                  }}
                >
                  {lang === "en" ? "Join Our Team" : "به تیم ما بپیوندید"}
                </span>
              </div>

              {/* Main Heading */}
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                {lang === "en" ? (
                  <>
                    Create{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">
                      Opportunities
                    </span>
                  </>
                ) : (
                  <>
                    فرصت‌های{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">
                      جدید
                    </span>
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "400",
                }}
              >
                {lang === "en"
                  ? "Join a global team transforming specialty goods sourcing with innovation, integrity, and impact."
                  : "به تیم جهانی بپیوندید که با نوآوری، درستکاری و تأثیر، تامین کالاهای تخصصی را متحول می‌کند."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button
                  className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange text-slate-900 font-semibold rounded-xl hover:shadow-2xl hover:shadow-accent-warm-gold/50 transition-all duration-300 text-sm sm:text-base"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                    fontWeight: "600",
                  }}
                >
                  {lang === "en" ? "View Open Positions" : "موقعیت‌های باز"}
                </button>
                <button
                  className="px-8 sm:px-12 py-3 sm:py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-accent-warm-gold/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                    fontWeight: "600",
                  }}
                >
                  {lang === "en" ? "Our Culture" : "فرهنگ ما"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>

        {/* Modern Culture Section */}
        <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-14 sm:mb-18 md:mb-24">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                {lang === "en" ? "Why Join Us" : "چرا به ما بپیوندید"}
              </h2>
              <p
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
              {[
                {
                  en: "Safety First",
                  fa: "ایمنی اول",
                  descEn: "Food safety is not just policy—it's our identity.",
                  descFa: "ایمنی غذایی فقط یک سیاست نیست—این هویت ما است.",
                  icon: "🛡️",
                  color: "from-accent-warm-gold/20 to-accent-warm-gold/5",
                  borderColor: "border-accent-warm-gold/30",
                },
                {
                  en: "Growth & Learning",
                  fa: "رشد و یادگیری",
                  descEn:
                    "Continuous development with training and certifications.",
                  descFa: "توسعه مداوم با برنامه‌های آموزشی و تصدیق‌ها.",
                  icon: "📈",
                  color: "from-accent-warm-orange/20 to-accent-warm-orange/5",
                  borderColor: "border-accent-warm-orange/30",
                },
                {
                  en: "Global Impact",
                  fa: "تأثیر جهانی",
                  descEn: "Work across 50+ countries with diverse teams.",
                  descFa: "کار در بیش از ۵۰ کشور با تیم‌های متنوع.",
                  icon: "🌍",
                  color: "from-accent/20 to-accent/5",
                  borderColor: "border-accent/30",
                },
                {
                  en: "Work-Life Balance",
                  fa: "تعادل کاری-زندگی",
                  descEn: "Flexible arrangements and supportive culture.",
                  descFa: "ترتیبات انعطاف‌پذیر و فرهنگ حمایتی.",
                  icon: "⚖️",
                  color: "from-accent-warm-red/20 to-accent-warm-red/5",
                  borderColor: "border-accent-warm-red/30",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative p-6 sm:p-8 rounded-2xl border-2 ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm transition-all duration-500 text-center hover:shadow-xl hover:scale-105`}
                >
                  <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 tracking-tight"
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
                    className="text-sm sm:text-base text-foreground/75 leading-relaxed"
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

        {/* Modern Job Listings Section */}
        <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14 sm:mb-18 md:mb-24">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                {lang === "en" ? "Open Positions" : "موقعیت‌های باز"}
              </h2>
              <p
                className="text-base sm:text-lg text-foreground/70 max-w-3xl"
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
                  ? "Find your next opportunity and make an impact across our global organization."
                  : "فرصت بعدی خود را پیدا کنید و در سراسر سازمان جهانی ما تأثیر بگذارید."}
              </p>
            </div>

            {/* Modern job listing grid */}
            <div className="space-y-4 sm:space-y-5">
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
