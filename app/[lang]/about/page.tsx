import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { GetConnected } from "@/components/about/get-connected";
import { WhatWeOffer } from "@/components/about/what-we-offer";
import { TeamShowcase } from "@/components/about/team-showcase";
import { JoinTeam } from "@/components/about/join-team";
import type { Language } from "@/lib/i18n";

interface AboutPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <AboutHero lang={lang} />
        <GetConnected lang={lang} />
        <WhatWeOffer lang={lang} />
        <TeamShowcase lang={lang} />
        <JoinTeam lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
