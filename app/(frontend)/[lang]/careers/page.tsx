import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/careers/careers-hero";
import { CareersCulture } from "@/components/careers/careers-culture";
import { CareersOpportunities } from "@/components/careers/careers-opportunities";
import { getJobs } from "@/lib/fetch/jobs";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export const revalidate = 60

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
    titleEn: "Careers in Food Supply & Distribution — Join Faradid Atlas",
    titleFa: "فرصت‌های شغلی در تأمین و توزیع مواد غذایی — به فرادید اطلس بپیوندید",
    titleAr: "وظائف في تزوين وتوزيع الغذاء — انضم إلى فراديد أطلس",
    descriptionEn:
      "Join Faradid Atlas in food sourcing, procurement, quality control, and distribution roles across Iran, UAE, and Oman.",
    descriptionFa:
      "در نقش‌های تأمین مواد غذایی، خرید، کنترل کیفیت و توزیع در فرادید اطلس مشغول شوید. دفاتر در ایران، امارات و عمان.",
    descriptionAr:
      "انضم إلى فراديد أطلس في وظائف تزوين وتوريد ورقابة الجودة وتوزيع الغذاء عبر إيران والإمارات وعمان.",
  });
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params;
  let jobs: any[] = [];
  try {
    jobs = await getJobs(lang);
  } catch (err) {
    console.error('[Careers] jobs fetch failed:', err);
  }
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
                  ? "Join Faradid Atlas in food sourcing, procurement, quality control, and distribution roles across Iran, UAE, and Oman."
                  : lang === "fa"
                    ? "در نقش‌های تأمین مواد غذایی، خرید، کنترل کیفیت و توزیع در فرادید اطلس مشغول شوید. دفاتر در ایران، امارات و عمان."
                    : "انضم إلى فراديد أطلس في وظائف تزوين وتوريد ورقابة الجودة وتوزيع الغذاء عبر إيران والإمارات وعمان.",
              inLanguage: lang,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: jobs.map((job, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: absoluteUrl(localizedPath(lang, `careers/${job.id}`)),
                  name: lang === "en" ? job.titleEn : lang === "fa" ? job.titleFa : job.titleAr,
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
