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

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-2xl mx-auto">
            <ApplicationForm lang={lang} jobId={job.id} jobTitle={jobTitle} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
