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
    titleEn: "Blog | Faradid Atlas",
    titleFa: "وبلاگ | فرادید اطلس",
    titleAr: "المدونة | فراديد أطلس",
    descriptionEn:
      "Industry insights, market trends, quality standards, and supply chain perspectives from the Faradid Atlas team.",
    descriptionFa:
      "بینش‌های صنعتی، روندهای بازار، استانداردهای کیفیت و دیدگاه‌های زنجیره تأمین از تیم فرادید اطلس.",
    descriptionAr:
      "رؤى الصناعة واتجاهات السوق ومعايير الجودة ومنظورات سلسلة التوريد من فريق فراديد اطلس.",
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "blog"));

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <BlogHero lang={lang} />

        <section className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <BlogFilters lang={lang} />

            <div className="mt-12">
              <BlogEmpty lang={lang} />
            </div>
          </div>
        </section>

        <BlogAuthors lang={lang} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name:
                  lang === "en"
                    ? "Blog"
                    : lang === "fa"
                      ? "وبلاگ"
                      : "المدونة",
                inLanguage: lang,
                description:
                  lang === "en"
                    ? "Industry insights, market trends, quality standards, and supply chain perspectives."
                    : lang === "fa"
                      ? "بینش‌های صنعتی، روندهای بازار، استانداردهای کیفیت و دیدگاه‌های زنجیره تأمین."
                      : "رؤى الصناعة واتجاهات السوق ومعايير الجودة ومنظورات سلسلة التوريد.",
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
                    name: lang === "en" ? "Blog" : "وبلاگ",
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
