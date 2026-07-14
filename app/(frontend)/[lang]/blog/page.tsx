import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogEmpty } from "@/components/blog/blog-empty";
import { BlogAuthors } from "@/components/blog/blog-authors";
import { BlogFilters } from "@/components/blog/blog-filters";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export const revalidate = 300

interface BlogPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "blog",
    titleEn: "Food Industry Insights & Market Trends | Faradid Atlas Blog",
    titleFa: "بینش‌های صنعت غذا و روندهای بازار | وبلاگ فرادید اطلس",
    titleAr: "رؤى صناعة الغذاء واتجاهات السوق | مدونة فراديد أطلس",
    descriptionEn:
      "Industry insights, market trends, quality standards, and supply chain perspectives from the Faradid Atlas food sourcing team.",
    descriptionFa:
      "بینش‌های صنعتی، روندهای بازار، استانداردهای کیفیت و دیدگاه‌های زنجیره تأمین از تیم تأمین مواد غذایی فرادید اطلس.",
    descriptionAr:
      "رؤى الصناعة واتجاهات السوق ومعايير الجودة ومنظورات سلسلة التوريد من فريق تزوين الغذاء في فراديد أطلس.",
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "blog"));

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main id="main-content">
        <BlogHero lang={lang} t={t} />

        <section className="py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <BlogFilters lang={lang} t={t} />

            <div className="mt-12">
              <BlogEmpty lang={lang} t={t} />
            </div>
          </div>
        </section>

        <BlogAuthors lang={lang} t={t} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t.pages.blog.title,
                inLanguage: lang,
                description: t.seo.blogDescription,
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
                    name: t.pages.blog.title,
                    item: pageUrl,
                  },
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
