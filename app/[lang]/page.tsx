import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/hero"
import { ValueProps } from "@/components/home/value-props"
import { FeaturedProducts } from "@/components/home/featured-products"
import { GlobalMarkets } from "@/components/home/global-markets"
import { CTASection } from "@/components/home/cta-section"
import type { Language } from "@/lib/i18n"

interface HomePageProps {
  params: Promise<{
    lang: Language
  }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }]
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <ValueProps lang={lang} />
        <FeaturedProducts lang={lang} />
        <GlobalMarkets lang={lang} />
        <CTASection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
