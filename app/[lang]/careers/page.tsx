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
        {/* Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="mb-6 inline-block px-4 py-2 bg-amber-100/50 rounded-full border border-amber-200/50">
              <span className="text-sm font-semibold text-primary">
                {lang === "en" ? "We're Hiring" : "در حال استخدام"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
              {lang === "en" ? "Join Our Team" : "به تیم ما بپیوندید"}
            </h1>
            <div className="divider-premium w-24 h-1 mb-8" />
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "We're looking for talented individuals who share our commitment to quality, safety, and excellence."
                : "ما به دنبال افراد توانمندی هستیم که با ما تعهد به کیفیت، ایمنی و تعالی را به اشتراک بگذارند."}
            </p>
          </div>
        </section>

        {/* Culture section */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute right-0 top-20 w-80 h-80 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
                {lang === "en" ? "Our Culture" : "فرهنگ ما"}
              </h2>
              <div className="divider-premium w-24 h-1 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className="group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-500 text-center animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10" />

                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-amber-700 transition-colors">
                    {lang === "en" ? item.en : item.fa}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {lang === "en" ? item.descEn : item.descFa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
                {lang === "en" ? "Open Positions" : "موقعیت‌های باز"}
              </h2>
              <div className="divider-premium w-24 h-1" />
            </div>
            <div className="space-y-6">
              {jobs.map((job, idx) => (
                <div
                  key={job.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
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
