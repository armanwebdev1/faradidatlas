import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JobDetail } from "@/components/careers/job-detail";
import { jobs } from "@/components/careers/job-data";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import Link from "next/link";

interface JobDetailPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

export async function generateStaticParams() {
  const langs: Language[] = ["en", "fa"];
  const allParams = [];

  for (const lang of langs) {
    for (const job of jobs) {
      allParams.push({ lang, id: job.id.toString() });
    }
  }

  return allParams;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { lang, id } = await params;
  const job = jobs.find((j) => j.id === Number.parseInt(id));

  if (!job) {
    return buildPageMetadata({
      lang,
      path: "careers",
      titleEn: "Career Opportunity Not Found | Faradid Atlas",
      titleFa: "فرصت شغلی پیدا نشد | فرادید اطلس",
      descriptionEn:
        "Explore evergreen opportunity areas connected to Faradid Atlas' supply chain, quality, and customer relationship work.",
      descriptionFa:
        "حوزه‌های همکاری مرتبط با زنجیره تامین، کیفیت و ارتباط با مشتریان در فرادید اطلس را ببینید.",
    });
  }

  return buildPageMetadata({
    lang,
    path: `careers/${job.id}`,
    titleEn: `${job.titleEn} | Careers | Faradid Atlas`,
    titleFa: `${job.titleFa} | فرصت‌های شغلی | فرادید اطلس`,
    descriptionEn: job.descriptionEn,
    descriptionFa: job.descriptionFa,
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { lang, id } = await params;
  const job = jobs.find((j) => j.id === Number.parseInt(id));

  if (!job) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          <p>{lang === "en" ? "Job not found" : "شغل پیدا نشد"}</p>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const title = lang === "en" ? job.titleEn : job.titleFa;
  const jobUrl = absoluteUrl(localizedPath(lang, `careers/${job.id}`));

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container-wide px-4 sm:px-6 pt-6 sm:pt-8"
        >
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs sm:text-sm text-foreground/70 shadow-sm backdrop-blur">
            <Link
              href={`/${lang}`}
              className="line-accent transition-colors hover:text-primary"
            >
              {lang === "en" ? "Home" : "خانه"}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">
              •
            </span>
            <Link
              href={`/${lang}/careers`}
              className="line-accent transition-colors hover:text-primary"
            >
              {lang === "en" ? "Careers" : "فرصت‌های شغلی"}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">
              •
            </span>
            <span className="text-foreground font-medium line-clamp-1">
              {title}
            </span>
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
            __html: JSON.stringify({
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
                  name: lang === "en" ? "Careers" : "فرصت‌های شغلی",
                  item: absoluteUrl(localizedPath(lang, "careers")),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: title,
                  item: jobUrl,
                },
              ],
            }),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
