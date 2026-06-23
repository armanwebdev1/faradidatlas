import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { GetConnected } from "@/components/about/get-connected";
import { WhatWeOffer } from "@/components/about/what-we-offer";
import { StrategicFramework } from "@/components/about/strategic-framework";
import { TeamShowcase } from "@/components/about/team-showcase";
import { JoinTeam } from "@/components/about/join-team";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";

interface AboutPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "about",
    titleEn: "About Faradid Atlas and Our Food Supply Network",
    titleFa: "درباره فرادید اطلس و شبکه تأمین مواد غذایی",
    descriptionEn:
      "Learn how Faradid Atlas has built regional food sourcing, import, and distribution capabilities since 2009, guided by quality, continuity, and trust.",
    descriptionFa:
      "با مسیر فرادید اطلس از سال ۱۳۸۸ تا امروز آشنا شوید؛ شرکتی که تأمین، واردات و توزیع مواد غذایی اساسی را با تمرکز بر کیفیت، تداوم و اعتماد دنبال می‌کند.",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const pageUrl = absoluteUrl(localizedPath(lang, "about"));
  const organizationId = absoluteUrl("/#organization");

  return (
    <div lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <AboutHero lang={lang} />
        <GetConnected lang={lang} />
        <StrategicFramework lang={lang} />
        <WhatWeOffer lang={lang} />
        <TeamShowcase lang={lang} />
        <JoinTeam lang={lang} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name:
                lang === "en"
                  ? "About Faradid Atlas"
                  : "درباره فرادید اطلس",
              description:
                lang === "en"
                  ? "Learn how Faradid Atlas has built regional food sourcing, import, and distribution capabilities since 2009, guided by quality, continuity, and trust."
                  : "با مسیر فرادید اطلس از سال ۱۳۸۸ تا امروز آشنا شوید؛ شرکتی که تأمین، واردات و توزیع مواد غذایی اساسی را با تمرکز بر کیفیت، تداوم و اعتماد دنبال می‌کند.",
              inLanguage: lang,
              about: {
                "@id": organizationId,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: lang === "en" ? "Home" : "خانه",
                  item: absoluteUrl(localizedPath(lang)),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: lang === "en" ? "About" : "درباره ما",
                  item: pageUrl,
                },
              ],
            },
          ]),
        }}
      />
      <Footer lang={lang} />
    </div>
  );
}
