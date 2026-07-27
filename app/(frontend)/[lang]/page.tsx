import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { GlobalMarkets } from "@/components/home/global-markets";
import { CTASection } from "@/components/home/cta-section";
import { BrandShowcase } from "@/components/home/brand-showcase";
import { SignatureProducts } from "@/components/home/signature-products";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllGlobals } from "@/lib/fetch/globals";
import { resolveMediaUrl } from "@/lib/media-url";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { draftMode } from "next/headers";

export const revalidate = 300;

interface HomePageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: HomePageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    titleEn:
      "Food Sourcing, Import & Distribution — Iran, UAE, Oman | Faradid Atlas",
    titleFa:
      "تأمین، واردات و توزیع مواد غذایی — ایران، امارات، عمان | فرادید اطلس",
    titleAr:
      "تزوين واستيراد وتوزيع الغذاء — إيران، الإمارات، عمان | فراديد أطلس",
    descriptionEn:
      "Faradid Atlas sources, imports, and distributes essential foods — branded rice, legumes, nuts, seeds, spices, and sugar — across Iran, UAE, and Oman. B2B food supply since 2009.",
    descriptionFa:
      "فرادید اطلس تأمین، واردات و توزیع مواد غذایی اساسی شامل برنج برنددار، حبوبات، آجیل و خشکبار، ادویه و شکر را در ایران، امارات و عمان انجام می‌دهد. عرضه B2B از سال ۲۰۰۹.",
    descriptionAr:
      "يقوم فراديد أطلس بتزوين واستيراد وتوزيع الغذاء الأساسي — أرز بตรา تجاري، بقول، مكسرات، بذور، بهارات وسكر — عبر إيران والإمارات وعمان. تزوين غذائي B2B منذ عام 2009.",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang));
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const pageDescription = t.pages.home.description;
  const draft = (await draftMode()).isEnabled;

  const [globals] = await Promise.all([getAllGlobals(lang, draft)]);

  const { homepage, contactInfo, siteSettings } = globals;

  const publicContactEmail = contactInfo?.email ?? "";
  const publicPhoneNumbers = (contactInfo?.phones ?? []).map(
    (p: {
      value?: string | null;
      display?: string | null;
      whatsappHref?: string | null;
    }) => ({
      value: p.value ?? "",
      display: p.display ?? "",
      whatsappHref: p.whatsappHref ?? "",
    }),
  );

  const heroSlides = homepage?.heroSlides ?? [];
  const valueProps = homepage?.valueProps ?? [];
  const brandShowcase = homepage?.brandShowcase ?? [];
  const signatureProducts = homepage?.signatureProducts ?? [];
  const globalMarkets = homepage?.globalMarkets ?? [];
  const cta = homepage?.cta ?? {};

  const heroImageUrls =
    heroSlides.length > 0
      ? heroSlides.map((slide) => resolveMediaUrl(slide.image))
      : [
          "/hero/optimized/home-hero-1.webp",
          "/hero/optimized/home-hero-2.webp",
          "/hero/optimized/home-hero-3.webp",
        ];

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      {heroImageUrls.map((url) => (
        <link key={url} rel="preload" as="image" href={url} />
      ))}
      <Header lang={lang} />
      <main id="main-content">
        <Hero lang={lang} t={t} slides={heroSlides} />
        <ValueProps
          lang={lang}
          items={valueProps}
          section={homepage?.valuePropsSection}
        />
        <BrandShowcase
          lang={lang}
          t={t}
          brands={brandShowcase}
          section={homepage?.brandsSection}
        />
        <SignatureProducts
          lang={lang}
          t={t}
          section={homepage?.signatureProductsSection}
          products={signatureProducts}
        />
        <GlobalMarkets
          lang={lang}
          markets={globalMarkets}
          section={homepage?.marketsSection}
        />
        <CTASection lang={lang} cta={cta} brandShowcase={brandShowcase} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": organizationId,
              name: siteSettings?.siteName ?? "Faradid Atlas",
              alternateName: siteSettings?.siteNameFa ?? "فرادید اطلس",
              legalName: siteSettings?.legalName ?? "Faradid Atlas Trading LLC",
              url: absoluteUrl(),
              logo:
                resolveMediaUrl(siteSettings?.logo) ??
                absoluteUrl("/brand/faradid-atlas-mark.png"),
              email: publicContactEmail,
              telephone: publicPhoneNumbers.map((phone) => phone.value),
              description:
                lang === "en"
                  ? (siteSettings?.description ?? "")
                  : (siteSettings?.descriptionFa ?? ""),
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
                  name: "Muscat Office",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Muscat",
                    addressCountry: "OM",
                  },
                },
              ],
              ...(siteSettings?.socialLinks &&
              siteSettings.socialLinks.length > 0
                ? {
                    sameAs: siteSettings.socialLinks.map((l) => l.url),
                  }
                : {}),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.breadcrumbs.home,
                  item: absoluteUrl(localizedPath(lang)),
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": websiteId,
              name: siteSettings?.siteName ?? "Faradid Atlas",
              alternateName: siteSettings?.siteNameFa ?? "فرادید اطلس",
              url: absoluteUrl(),
              inLanguage: ["en", "fa", "ar"],
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
                  ? "Food Sourcing, Import & Distribution — Iran, UAE, Oman"
                  : "تأمین، واردات و توزیع مواد غذایی — ایران، امارات، عمان",
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
