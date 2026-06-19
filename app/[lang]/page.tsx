import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { GlobalMarkets } from "@/components/home/global-markets";
import { CTASection } from "@/components/home/cta-section";
import { SignatureProducts } from "@/components/home/signature-products";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Language } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: HomePageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    titleEn: "Faradid Atlas | Reliable Food Supply",
    titleFa: "فرادید اطلس | تامین مطمئن مواد غذایی",
    descriptionEn: siteConfig.description,
    descriptionFa: siteConfig.descriptionFa,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <ValueProps lang={lang} />
        <SignatureProducts lang={lang} />
        <GlobalMarkets lang={lang} />
        <CTASection lang={lang} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: absoluteUrl("/icon.svg"),
              foundingDate: "2009",
              areaServed: ["Iran", "United Arab Emirates", "Oman"],
              knowsAbout: [
                "Rice",
                "Legumes",
                "Seeds",
                "Nuts",
                "Spices",
                "Sugar",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: ["en", "fa"],
            },
          ]),
        }}
      />
      <Footer lang={lang} />
    </div>
  );
}
