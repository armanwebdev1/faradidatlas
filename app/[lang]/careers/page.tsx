import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersCulture } from "@/components/careers/careers-culture";
import { CareersOpportunities } from "@/components/careers/careers-opportunities";
import { jobs } from "@/components/careers/job-data";
import { buildPageMetadata } from "@/lib/metadata";
import type { Language } from "@/lib/i18n";

interface CareersPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: CareersPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "careers",
    titleEn: "Careers | Faradid Atlas",
    titleFa: "فرصت‌های همکاری | فرادید اطلس",
    descriptionEn:
      "Explore evergreen opportunity areas connected to Faradid Atlas' supply chain, quality, and customer relationship work.",
    descriptionFa:
      "با حوزه‌های همکاری در فرادید اطلس آشنا شوید؛ از زنجیره تأمین و کنترل کیفیت تا ارتباط با مشتریان و پشتیبانی عملیاتی.",
  });
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <CareersHero lang={lang} />
        <CareersCulture lang={lang} />
        <CareersOpportunities lang={lang} jobs={jobs} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
