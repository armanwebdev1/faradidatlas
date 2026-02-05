import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ApplicationForm } from "@/components/careers/application-form"
import { jobs } from "@/components/careers/job-data"
import type { Language } from "@/lib/i18n"

interface ApplyPageProps {
  params: Promise<{
    lang: Language
    id: string
  }>
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { lang, id } = await params
  const job = jobs.find((j) => j.id === Number.parseInt(id))

  if (!job) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          <p>{lang === "en" ? "Job not found" : "شغل پیدا نشد"}</p>
        </div>
        <Footer lang={lang} />
      </div>
    )
  }

  const jobTitle = lang === "en" ? job.titleEn : job.titleFa
  const isRTL = lang === "fa"
  const typeLabel =
    job.type === "full-time"
      ? lang === "en"
        ? "Full-time"
        : "تمام‌وقت"
      : job.type === "part-time"
        ? lang === "en"
          ? "Part-time"
          : "پاره‌وقت"
        : lang === "en"
          ? "Contract"
          : "قرارداد"

  const copy =
    lang === "en"
      ? {
          tag: "Application",
          title: "Apply for",
          subtitle:
            "Tell us about yourself. Our team reviews every application and responds within 5-7 business days.",
          meta: {
            department: "Department",
            location: "Location",
            type: "Type",
          },
          back: "Back to role details",
          timeHint: "Estimated time: 5 minutes",
          checklistTitle: "Application checklist",
          checklistItems: [
            "Updated resume or CV (PDF or DOC)",
            "Contact details we can reach you on",
            "Relevant experience and skills",
          ],
          timelineTitle: "Hiring timeline",
          timelineItems: [
            "Application review (5-7 business days)",
            "Intro call with the hiring team",
            "Final interview and decision",
          ],
          privacyTitle: "Privacy note",
          privacyBody:
            "We only use your information for recruitment purposes and keep it confidential.",
        }
      : {
          tag: "درخواست همکاری",
          title: "درخواست برای",
          subtitle:
            "درباره خودتان بگویید. تیم ما همه درخواست‌ها را بررسی می‌کند و در ۵ تا ۷ روز کاری پاسخ می‌دهد.",
          meta: {
            department: "بخش",
            location: "مکان",
            type: "نوع همکاری",
          },
          back: "بازگشت به جزئیات موقعیت",
          timeHint: "زمان موردنیاز: حدود ۵ دقیقه",
          checklistTitle: "چک‌لیست درخواست",
          checklistItems: [
            "رزومه به‌روز (PDF یا DOC)",
            "اطلاعات تماس قابل دسترس",
            "سابقه و مهارت‌های مرتبط",
          ],
          timelineTitle: "فرایند استخدام",
          timelineItems: [
            "بررسی اولیه (۵ تا ۷ روز کاری)",
            "تماس هماهنگی با تیم",
            "مصاحبه نهایی و تصمیم",
          ],
          privacyTitle: "یادداشت محرمانگی",
          privacyBody:
            "از اطلاعات شما فقط برای استخدام استفاده می‌شود و محرمانه باقی می‌ماند.",
        }

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <section
          className="relative w-full overflow-hidden bg-white"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="absolute -top-20 right-[-10%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-br from-amber-200/35 via-white to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-[-5%] h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-gradient-to-tr from-gray-100 via-white to-transparent blur-3xl" />

          <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-12">
            <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
              <div className="text-center">
                <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-warm-gold animate-fade-in-up">
                  {copy.tag}
                </p>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-5 animate-fade-in-up"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-hero)"
                        : "Estedad, var(--font-hero)",
                  }}
                >
                  {copy.title} {jobTitle}
                </h1>
                <p
                  className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-body)"
                        : "Shabnam, var(--font-body)",
                  }}
                >
                  {copy.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs sm:text-sm">
                    <span className="text-foreground/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                      {copy.meta.department}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-accent-warm-gold" />
                    <span className="font-semibold text-foreground/80">
                      {job.department}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs sm:text-sm">
                    <span className="text-foreground/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                      {copy.meta.location}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-accent-warm-gold" />
                    <span className="font-semibold text-foreground/80">
                      {job.location}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs sm:text-sm">
                    <span className="text-foreground/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                      {copy.meta.type}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-accent-warm-gold" />
                    <span className="font-semibold text-foreground/80">
                      {typeLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
                  <Link
                    href={`/${lang}/careers/${job.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      fontFamily:
                        lang === "en"
                          ? "var(--font-body)"
                          : "Shabnam, var(--font-body)",
                    }}
                  >
                    {copy.back}
                  </Link>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-foreground/60 animate-fade-in-up">
                  {copy.timeHint}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-white">
          <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-accent-warm-gold/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-tr from-foreground/5 to-transparent blur-3xl pointer-events-none" />

          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-12">
            <ApplicationForm lang={lang} jobId={job.id} jobTitle={jobTitle} />

            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
              <div className="rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-7 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.45)]">
                <h3
                  className="text-lg sm:text-xl font-semibold text-foreground"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-hero)"
                        : "Estedad, var(--font-hero)",
                  }}
                >
                  {copy.checklistTitle}
                </h3>
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-foreground/70">
                  {copy.checklistItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent-warm-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground to-foreground/90 p-6 sm:p-7 text-white shadow-[0_35px_80px_-60px_rgba(10,10,10,0.55)]">
                <h3
                  className="text-lg sm:text-xl font-semibold"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-hero)"
                        : "Estedad, var(--font-hero)",
                  }}
                >
                  {copy.timelineTitle}
                </h3>
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-white/75">
                  {copy.timelineItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent-warm-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-7 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.45)]">
                <h3
                  className="text-lg sm:text-xl font-semibold text-foreground"
                  style={{
                    fontFamily:
                      lang === "en"
                        ? "var(--font-hero)"
                        : "Estedad, var(--font-hero)",
                  }}
                >
                  {copy.privacyTitle}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-foreground/70">
                  {copy.privacyBody}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
