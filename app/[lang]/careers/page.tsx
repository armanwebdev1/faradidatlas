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
        {/* Modern Hero Section with Dynamic Background */}
        <section className="relative min-h-screen sm:min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-warm-gold/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-warm-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 lg:py-40 text-center">
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-warm-gold/30 bg-gradient-to-r from-accent-warm-gold/10 to-transparent">
              <span className="w-2 h-2 rounded-full bg-accent-warm-gold animate-pulse" />
              <span
                className="text-xs sm:text-sm font-medium text-accent-warm-gold uppercase tracking-wider"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                }}
              >
                {lang === "en" ? "We're Hiring" : "در حال استخدام"}
              </span>
            </div>

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
                  Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">Future</span> With Us
                </>
              ) : (
                <>
                  آینده خود را با ما <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">بسازید</span>
                </>
              )}
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                fontWeight: "400",
              }}
            >
              {lang === "en"
                ? "Join a global team of innovators, leaders, and changemakers. We're building the future of specialty goods sourcing with integrity, excellence, and a commitment to making a difference."
                : "به یک تیم جهانی از نوآوران، رهبران و تغییرگران بپیوندید. ما آینده تامین کالاهای تخصصی را با درستکاری، تعالی و تعهد به ایجاد تفاوت می‌سازیم."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange text-slate-900 font-semibold rounded-lg hover:shadow-xl hover:shadow-accent-warm-gold/40 transition-all duration-300 text-sm sm:text-base"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                }}
              >
                {lang === "en" ? "Explore Opportunities" : "کاوش فرصت‌ها"}
              </button>
              <button
                className="px-8 sm:px-10 py-3 sm:py-4 border border-slate-600 text-white font-semibold rounded-lg hover:border-accent-warm-gold/60 hover:bg-slate-800/50 transition-all duration-300 text-sm sm:text-base"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                }}
              >
                {lang === "en" ? "Learn About Us" : "درباره ما"}
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-slate-700/50 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange">150+</span>
                </div>
                <p className="text-sm sm:text-base text-slate-400">
                  {lang === "en" ? "Team Members" : "اعضای تیم"}
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange">50+</span>
                </div>
                <p className="text-sm sm:text-base text-slate-400">
                  {lang === "en" ? "Countries" : "کشورها"}
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange">20y</span>
                </div>
                <p className="text-sm sm:text-base text-slate-400">
                  {lang === "en" ? "Experience" : "تجربه"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
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
                  descEn: "Continuous development with training and certifications.",
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

        {/* Team Spotlight Section */}
        <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
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
                {lang === "en" ? "Meet Our Team" : "تیم ما را بشناسید"}
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
                  ? "Talented individuals from around the world, united by a passion for excellence."
                  : "افراد توانمند از سراسر جهان که با اشتیاق برای تعالی یکجا شده‌اند."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {[
                {
                  name: lang === "en" ? "Sarah Chen" : "سارا چن",
                  role: lang === "en" ? "Supply Chain Director" : "مدیر زنجیره تامین",
                  bio: lang === "en" 
                    ? "Leading global sourcing operations with 12 years of experience in premium goods supply chain."
                    : "هدایت عملیات تامین جهانی با ۱۲ سال تجربه در زنجیره تامین کالاهای برتر.",
                  color: "from-accent-warm-gold/30",
                },
                {
                  name: lang === "en" ? "Mohamed Khatib" : "محمد خطیب",
                  role: lang === "en" ? "Quality Assurance Manager" : "مدیر تضمین کیفیت",
                  bio: lang === "en" 
                    ? "Ensuring excellence in every product through rigorous quality standards and innovation."
                    : "تضمین تعالی در هر محصول از طریق استانداردهای کیفیت و نوآوری دقیق.",
                  color: "from-accent-warm-orange/30",
                },
                {
                  name: lang === "en" ? "Elena Rodriguez" : "النا رودریگز",
                  role: lang === "en" ? "Business Development Lead" : "رهبر توسعه تجاری",
                  bio: lang === "en" 
                    ? "Building partnerships across continents to expand our global footprint."
                    : "ایجاد مراتب اعتماد در سراسر قاره‌ها برای توسعه حضور جهانی ما.",
                  color: "from-accent/30",
                },
                {
                  name: lang === "en" ? "Raj Patel" : "راج پاتل",
                  role: lang === "en" ? "Operations Manager" : "مدیر عملیات",
                  bio: lang === "en" 
                    ? "Optimizing processes and driving efficiency across our regional centers."
                    : "بهینه‌سازی فرآیندها و افزایش کارایی در سراسر مراکز منطقه‌ای ما.",
                  color: "from-accent-warm-red/30",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-2xl border border-foreground/8 bg-gradient-to-br ${member.color} backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:border-foreground/15 hover:shadow-xl`}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-200 mb-4" />
                    <h3
                      className="text-lg sm:text-xl font-semibold text-foreground mb-2"
                      style={{
                        fontFamily:
                          lang === "en"
                            ? "var(--font-hero)"
                            : "Estedad, var(--font-hero)",
                        fontWeight: "600",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-accent-warm-gold">
                      {member.role}
                    </p>
                  </div>
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
                    {member.bio}
                  </p>
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
