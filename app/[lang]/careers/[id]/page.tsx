import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JobDetail } from "@/components/careers/job-detail"
import { jobs } from "@/components/careers/job-data"
import type { Language } from "@/lib/i18n"

interface JobDetailPageProps {
  params: Promise<{
    lang: Language
    id: string
  }>
}

export async function generateStaticParams() {
  const langs: Language[] = ["en", "fa"]
  const allParams = []

  for (const lang of langs) {
    for (const job of jobs) {
      allParams.push({ lang, id: job.id.toString() })
    }
  }

  return allParams
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
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

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <JobDetail job={job} lang={lang} />
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
