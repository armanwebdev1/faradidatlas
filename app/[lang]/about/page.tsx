import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/hero"
import { SourcingRegions } from "@/components/about/sourcing-regions"
import { QCWorkflow } from "@/components/about/qc-workflow"
import { PrivateLabeling } from "@/components/about/private-labeling"
import { Certifications } from "@/components/about/certifications"
import { HeritageTimeline } from "@/components/about/heritage-timeline"
import { TeamLeadership } from "@/components/about/team-leadership"
import { ServicesShowcase } from "@/components/about/services-showcase"
import type { Language } from "@/lib/i18n"

interface AboutPageProps {
  params: Promise<{
    lang: Language
  }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }]
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <AboutHero lang={lang} />
        <HeritageTimeline lang={lang} />
        <TeamLeadership lang={lang} />
        <ServicesShowcase lang={lang} />
        <SourcingRegions lang={lang} />
        <QCWorkflow lang={lang} />
        <PrivateLabeling lang={lang} />
        <Certifications lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
