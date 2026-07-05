import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { GlobalMarkets } from "@/components/home/global-markets";
import { CTASection } from "@/components/home/cta-section";
import { BrandShowcase } from "@/components/home/brand-showcase";
import { SignatureProducts } from "@/components/home/signature-products";
import { buildPageMetadata } from "@/lib/metadata";
import { publicContactEmail, publicPhoneNumbers } from "@/lib/contact-info";
import { absoluteUrl, localizedPath, siteConfig } from "@/lib/site";
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
    titleEn: "Reliable Food Sourcing and Distribution | Faradid Atlas",
    titleFa: "تأمین و توزیع مطمئن مواد غذایی | فرادید اطلس",
    descriptionEn:
      "Faradid Atlas connects businesses with reliable supply channels for rice, legumes, nuts, seeds, spices, sugar, and other essential food products.",
    descriptionFa:
      "فرادید اطلس مسیر تأمین و توزیع مواد غذایی اساسی مانند برنج، حبوبات، مغزها، دانه‌ها، ادویه و شکر را برای کسب‌وکارها قابل اتکا و شفاف‌تر می‌کند.",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const pageUrl = absoluteUrl(localizedPath(lang));
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const pageDescription =
    lang === "en"
      ? "Faradid Atlas connects businesses with reliable supply channels for rice, legumes, nuts, seeds, spices, sugar, and other essential food products."
      : "فرادید اطلس مسیر تأمین و توزیع مواد غذایی اساسی مانند برنج، حبوبات، مغزها، دانه‌ها، ادویه و شکر را برای کسب‌وکارها قابل اتکا و شفاف‌تر می‌کند.";

  return (
    <div lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <ValueProps lang={lang} />
        <BrandShowcase lang={lang} />
        <SignatureProducts />
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
              "@id": organizationId,
              name: siteConfig.name,
              alternateName: siteConfig.nameFa,
              legalName: siteConfig.legalName,
              url: siteConfig.url,
              logo: absoluteUrl(siteConfig.brandMarkPath),
              email: publicContactEmail,
              telephone: publicPhoneNumbers.map((phone) => phone.value),
              description:
                lang === "en"
                  ? siteConfig.description
                  : siteConfig.descriptionFa,
              foundingDate: "2009",
              foundingLocation: "Iran",
              industry: "Food Distribution and Supply",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: publicContactEmail,
                telephone: publicPhoneNumbers.map((phone) => phone.value),
                availableLanguage: ["English", "Persian"],
              },
              areaServed: ["Iran", "United Arab Emirates", "Oman"],
              knowsAbout: [
                "Rice",
                "Legumes",
                "Seeds",
                "Nuts",
                "Spices",
                "Sugar",
                "Food Distribution",
                "B2B Supply Chain",
              ],
              location: [
                {
                  "@type": "Place",
                  name: "Tehran Office",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Tehran",
                    addressCountry: "IR",
                  },
                },
                {
                  "@type": "Place",
                  name: "Isfahan Office",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Isfahan",
                    addressCountry: "IR",
                  },
                },
                {
                  "@type": "Place",
                  name: "Dubai Office",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dubai",
                    addressCountry: "AE",
                  },
                },
                {
                  "@type": "Place",
                  name: "Oman Office",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Oman",
                    addressCountry: "OM",
                  },
                },
              ],
              ...(siteConfig.sameAs.length > 0
                ? { sameAs: siteConfig.sameAs }
                : {}),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": websiteId,
              name: siteConfig.name,
              alternateName: siteConfig.nameFa,
              url: siteConfig.url,
              inLanguage: ["en", "fa"],
              publisher: {
                "@id": organizationId,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: absoluteUrl(
                    localizedPath(lang, "products?q={search_term_string}"),
                  ),
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name:
                lang === "en"
                  ? "Reliable Food Sourcing and Distribution"
                  : "تأمین و توزیع مطمئن مواد غذایی",
              description: pageDescription,
              inLanguage: lang,
              isPartOf: {
                "@id": websiteId,
              },
              about: {
                "@id": organizationId,
              },
            },
          ]),
        }}
      />
      <Footer lang={lang} />
    </div>
  );
}
