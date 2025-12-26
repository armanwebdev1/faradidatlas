import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobListing } from "@/components/careers/job-listing"
import { jobs } from "@/components/careers/job-data"
import type { Language } from "@/lib/i18n"

interface CareersPageProps {
  params: Promise<{
    lang: Language
  }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }]
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
              {lang === "en" ? "Join Our Team" : "به تیم ما بپیوندید"}
            </h1>
            <p className="text-xl text-neutral max-w-2xl">
              {lang === "en"
                ? "We're looking for talented individuals who share our commitment to quality, safety, and excellence."
                : "ما به دنبال افراد توانمندی هستیم که با ما تعهد به کیفیت، ایمنی و تعالی را به اشتراک بگذارند."}
            </p>
          </div>
        </section>

        {/* Culture section */}
        <section className="py-16 px-6 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              {lang === "en" ? "Our Culture" : "فرهنگ ما"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {lang === "en" ? "Safety First" : "ایمنی اول"}
                </h3>
                <p className="text-neutral">
                  {lang === "en"
                    ? "Food safety is not just policy—it's our identity. Every decision is guided by our commitment to protect consumers."
                    : "ایمنی غذایی فقط یک سیاست نیست—این هویت ما است. هر تصمیم با تعهد ما به حفاظت از مصرف‌کنندگان راهنمایی می‌شود."}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {lang === "en" ? "Continuous Learning" : "یادگیری مداوم"}
                </h3>
                <p className="text-neutral">
                  {lang === "en"
                    ? "We invest in our people with training programs, certifications, and career development opportunities."
                    : "ما در افراد خود سرمایه‌گذاری می‌کنیم با برنامه‌های آموزشی، تصدیق‌ها و فرصت‌های توسعه شغلی."}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {lang === "en" ? "Global Perspective" : "دیدگاه جهانی"}
                </h3>
                <p className="text-neutral">
                  {lang === "en"
                    ? "Work with an international team serving 40+ countries. You'll develop skills in cross-cultural collaboration."
                    : "با تیم بین‌المللی کار کنید که خدمات رسانی به ۴۰+ کشور را انجام می‌دهند."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-12">
              {lang === "en" ? "Open Positions" : "موقعیت‌های باز"}
            </h2>
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
