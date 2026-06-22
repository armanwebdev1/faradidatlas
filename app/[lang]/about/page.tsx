import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { GetConnected } from "@/components/about/get-connected";
import { WhatWeOffer } from "@/components/about/what-we-offer";
import { StrategicFramework } from "@/components/about/strategic-framework";
import { TeamShowcase } from "@/components/about/team-showcase";
import { JoinTeam } from "@/components/about/join-team";
import { buildPageMetadata } from "@/lib/metadata";
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
    titleEn: "About Faradid Atlas",
    titleFa: "درباره فرادید اطلس",
    descriptionEn:
      "Learn about Faradid Atlas' 2009 founding, food security mission, rice brands, offices, 2030 vision, and values.",
    descriptionFa:
      "با فرادید اطلس بیشتر آشنا شوید؛ از آغاز فعالیت در سال ۱۳۸۸ و نقش آن در تأمین مواد غذایی اساسی تا برندهای برنج، دفاتر، چشم‌انداز ۲۰۳۰ و ارزش‌های شرکت.",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <AboutHero lang={lang} />
        <GetConnected lang={lang} />
        <StrategicFramework lang={lang} />
        <WhatWeOffer lang={lang} />
        <TeamShowcase lang={lang} />
        <JoinTeam lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
