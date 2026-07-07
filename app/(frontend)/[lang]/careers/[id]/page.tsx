import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JobDetail } from "@/components/careers/job-detail";
import { getJobs, getJobById } from "@/lib/fetch/jobs";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Link from "next/link";

export const revalidate = 60

interface JobDetailPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

export async function generateStaticParams() {
  const langs: Language[] = ["en", "fa", "ar"];
  const allParams = [];

  for (const lang of langs) {
    const jobs = await getJobs(lang);
    for (const job of jobs) {
      allParams.push({ lang, id: job.id.toString() });
    }
  }

  return allParams;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { lang, id } = await params;
  const job = await getJobById(Number.parseInt(id), lang);

  if (!job) {
    return buildPageMetadata({
      lang,
      path: "careers",
      titleEn: "Career Opportunity Not Found | Faradid Atlas",
      titleFa: "فرصت همکاری پیدا نشد | فرادید اطلس",
      titleAr: "لم يتم العثور على فرصة وظيفية | فراديد أطلس",
      descriptionEn: "Explore career paths at Faradid Atlas.",
      descriptionFa: "با مسیرهای همکاری در فرادید اطلس آشنا شوید.",
      descriptionAr: "استكشف مسارات الوظائف في فراديد أطلس.",
    });
  }

  return buildPageMetadata({
    lang,
    path: `careers/${job.id}`,
    titleEn: `${job.titleEn} Careers | Faradid Atlas`,
    titleFa: `${job.titleFa} | فرصت همکاری در فرادید اطلس`,
    titleAr: `فرصة وظيفية | فراديد أطلس`,
    descriptionEn: "Explore career paths at Faradid Atlas.",
    descriptionFa: "با مسیرهای همکاری در فرادید اطلس آشنا شوید.",
    descriptionAr: "استكشف مسارات الوظائف في فراديد أطلس.",
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { lang, id } = await params;
  const t = translations[lang];
  const job = await getJobById(Number.parseInt(id), lang);

  if (!job) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          <p>{t.pages.careers.jobNotFound}</p>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const title = job.titleEn;
  const jobUrl = absoluteUrl(localizedPath(lang, `careers/${job.id}`));
  const description = job.descriptionEn;

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <nav
          aria-label="Breadcrumb"
          className="container-wide px-4 sm:px-6 pt-6 sm:pt-8"
        >
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs sm:text-sm text-foreground/70 shadow-sm backdrop-blur">
            <Link href={`/${lang}`} className="line-accent transition-colors hover:text-primary">
              {t.breadcrumbs.home}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">•</span>
            <Link href={`/${lang}/careers`} className="line-accent transition-colors hover:text-primary">
              {t.breadcrumbs.careers}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">•</span>
            <span className="text-foreground font-medium line-clamp-1">{title}</span>
          </div>
        </nav>

        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-background to-secondary/30">
          <div className="container-wide">
            <JobDetail job={job} lang={lang} />
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": `${jobUrl}#webpage`,
                url: jobUrl,
                name: title,
                description,
                inLanguage: lang,
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: t.breadcrumbs.home, item: absoluteUrl(localizedPath(lang)) },
                  { "@type": "ListItem", position: 2, name: t.breadcrumbs.careers, item: absoluteUrl(localizedPath(lang, "careers")) },
                  { "@type": "ListItem", position: 3, name: title, item: jobUrl },
                ],
              },
            ]),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
