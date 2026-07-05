import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersCulture } from "@/components/careers/careers-culture";
import { CareersOpportunities } from "@/components/careers/careers-opportunities";
import { jobs } from "@/components/careers/job-data";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface CareersPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: CareersPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "careers",
    titleEn: "Careers in Food Supply and Distribution | Faradid Atlas",
    titleFa: "فرصت‌های همکاری در تأمین و توزیع مواد غذایی | فرادید اطلس",
    titleAr: "فرص عملية في تزوين وتوزيع الغذاء | فراديد أطلس",
    descriptionEn:
      "Explore career paths at Faradid Atlas across supply chain, procurement, quality, food safety, sales, distribution, and customer relations.",
    descriptionFa:
      "با مسیرهای همکاری در فرادید اطلس آشنا شوید؛ از زنجیره تأمین، خرید و کنترل کیفیت تا فروش، توزیع و ارتباط با مشتریان.",
    descriptionAr:
      "استكشف مسارات الوظائف في فراديد أطلس عبر سلسلة التزوين والتوريد والجودة وسلامة الغذاء والمبيعات والتوزيع وعلاقات العملاء.",
  });
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "careers"));

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <CareersHero lang={lang} />
        <CareersCulture lang={lang} />
        <CareersOpportunities lang={lang} jobs={jobs} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: t.pages.careers.title,
              description:
                lang === "en"
                  ? "Explore career paths at Faradid Atlas across supply chain, procurement, quality, food safety, sales, distribution, and customer relations."
                  : "با مسیرهای همکاری در فرادید اطلس آشنا شوید؛ از زنجیره تأمین، خرید و کنترل کیفیت تا فروش، توزیع و ارتباط با مشتریان.",
              inLanguage: lang,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: jobs.map((job, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: absoluteUrl(localizedPath(lang, `careers/${job.id}`)),
                  name: lang === "en" ? job.titleEn : job.titleFa,
                })),
              },
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
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.breadcrumbs.careers,
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
