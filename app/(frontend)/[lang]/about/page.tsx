import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { GetConnected } from "@/components/about/get-connected";
import { WhatWeOffer } from "@/components/about/what-we-offer";
import { CEOProfile } from "@/components/about/ceo-profile";
import { StrategicFramework } from "@/components/about/strategic-framework";
import { TeamShowcase } from "@/components/about/team-showcase";
import { JoinTeam } from "@/components/about/join-team";
import { buildPageMetadata } from "@/lib/metadata";
import { getCompanyInfo } from "@/lib/fetch/company-info";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export const revalidate = 60

interface AboutPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "about",
    titleEn: "About Faradid Atlas — Food Sourcing & Distribution Since 2009 | Iran, UAE, Oman",
    titleFa: "درباره فرادید اطلس — تأمین و توزیع مواد غذایی از سال ۲۰۰۹ | ایران، امارات، عمان",
    titleAr: "عن فراديد أطلس — تزوين وتوزيع الغذاء منذ عام 2009 | إيران، الإمارات، عمان",
    descriptionEn:
      "Learn how Faradid Atlas has built food sourcing, import, and distribution capabilities across Iran, UAE, and Oman since 2009. ISO 22000 quality standards.",
    descriptionFa:
      "با مسیر فرادید اطلس در تأمین، واردات و توزیع مواد غذایی در ایران، امارات و عمان از سال ۲۰۰۹ آشنا شوید.",
    descriptionAr:
      "تعرّف على كيفية بناء فراديد أطلس لقدرات تزوين واستيراد وتوزيع الغذاء عبر إيران والإمارات وعمان منذ عام 2009.",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "about"));
  const organizationId = absoluteUrl("/#organization");

  const companyInfo = await getCompanyInfo(lang);
  const ci = companyInfo as any;

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <AboutHero lang={lang} companyInfo={ci} />
        <GetConnected lang={lang} />
        <StrategicFramework lang={lang} companyInfo={ci} />
        <CEOProfile lang={lang} companyInfo={ci} />
        <WhatWeOffer lang={lang} />
        <TeamShowcase lang={lang} companyInfo={ci} />
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
              name: t.pages.about.title,
              description: t.seo.aboutDescription,
              inLanguage: lang,
              about: { "@id": organizationId },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.breadcrumbs.home, item: absoluteUrl(localizedPath(lang)) },
                { "@type": "ListItem", position: 2, name: t.breadcrumbs.about, item: pageUrl },
              ],
            },
          ]),
        }}
      />
      <Footer lang={lang} />
    </div>
  );
}
