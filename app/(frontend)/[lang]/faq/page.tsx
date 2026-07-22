import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FAQHero } from "@/components/faq/faq-hero";
import { FAQContent } from "@/components/faq/faq-content";
import { getFAQs } from "@/lib/fetch/faqs";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { draftMode } from "next/headers";

export const revalidate = 300

interface FAQPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "faq",
    titleEn: "Food Supply FAQ — Sourcing, Quality & Distribution | Faradid Atlas",
    titleFa: "پرسش‌های متداول تأمین مواد غذایی — تأمین، کیفیت و توزیع | فرادید اطلس",
    titleAr: "الأسئلة الشائعة عن تزوين الغذاء — التزوين والجودة والتوزيع | فراديد أطلس",
    descriptionEn:
      "Find answers about food sourcing, quality standards, ISO 22000, distribution, and B2B cooperation with Faradid Atlas across Iran, UAE, and Oman.",
    descriptionFa:
      "پاسخ پرسش‌های رایج درباره تأمین مواد غذایی، استانداردهای کیفیت، ISO 22000، توزیع و همکاری B2B با فرادید اطلس در ایران، امارات و عمان را بخوانید.",
    descriptionAr:
      "اعثر على إجابات حول تزوين الغذاء ومعايير الجودة وISO 22000 والتوزيع والتعاون B2B مع فراديد أطلس عبر إيران والإمارات وعمان.",
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params;
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "faq"));
  let faqs: any[] = [];
  const draft = (await draftMode()).isEnabled;
  try {
    faqs = await getFAQs(lang, draft);
  } catch (err) {
    console.error('[FAQ] fetch failed:', err);
  }

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main id="main-content">
        <FAQHero lang={lang} t={t} />

        <section className="py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <FAQContent items={faqs} lang={lang} t={t} />

            <div className="relative mt-20 p-8 sm:p-10 bg-gradient-to-br from-background to-secondary/30 rounded-2xl border border-border text-center overflow-hidden shadow-lg animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 tracking-tight">
                {t.faqPage.needProductAnswer}
              </h2>
              <p className="text-muted-foreground mb-8 text-base sm:text-lg">
                {t.faqPage.needProductAnswerDesc}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a
                  href={`/${lang}/contact`}
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 group order-1 sm:order-none"
                >
                  {t.faqPage.contactUs}
                </a>
                <a
                  href={`/${lang}/products`}
                  className="inline-block px-8 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 hover:shadow-lg transition-all duration-300 group order-2 sm:order-none"
                >
                  {lang === "en" ? "Browse Products" : lang === "fa" ? "مشاهده محصولات" : "تصفح المنتجات"}
                </a>
              </div>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name:
                  lang === "en"
                    ? "Food Supply FAQ"
                    : "پرسش‌های متداول تأمین مواد غذایی",
                inLanguage: lang,
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: lang === "en" ? faq.questionEn : lang === "fa" ? faq.questionFa : faq.questionAr,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: lang === "en" ? faq.answerEn : lang === "fa" ? faq.answerFa : faq.answerAr,
                  },
                })),
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
                    name: t.pages.faq.title,
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
