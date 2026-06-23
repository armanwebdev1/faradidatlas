import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FAQHero } from "@/components/faq/faq-hero";
import { FAQContent } from "@/components/faq/faq-content";
import { faqs } from "@/components/faq/faq-data";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";

interface FAQPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "faq",
    titleEn: "Food Supply FAQ | Faradid Atlas",
    titleFa: "پرسش‌های متداول تأمین مواد غذایی | فرادید اطلس",
    descriptionEn:
      "Find clear answers about Faradid Atlas products, sourcing process, quality standards, offices, values, and how to start a supply inquiry.",
    descriptionFa:
      "پاسخ پرسش‌های رایج درباره محصولات، فرایند تأمین، استانداردهای کیفیت، دفاتر، ارزش‌ها و شروع همکاری با فرادید اطلس را بخوانید.",
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params;
  const pageUrl = absoluteUrl(localizedPath(lang, "faq"));

  return (
    <div lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <FAQHero lang={lang} />

        <section className="py-24 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <FAQContent items={faqs} lang={lang} />

            <div className="relative mt-20 p-12 bg-gradient-to-br from-background to-secondary/30 rounded-2xl border border-border text-center overflow-hidden shadow-lg animate-fade-in-up">
              <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">
                {lang === "en"
                  ? "Need a product-specific answer?"
                  : "پرسشی درباره محصول خاصی دارید؟"}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {lang === "en"
                  ? "Send us the product, volume, destination, and timeline so the team can review practical next steps."
                  : "نوع محصول، حجم موردنیاز، مقصد و زمان‌بندی موردنظرتان را برای ما ارسال کنید تا تیم فرادید اطلس مراحل بعدی تأمین و توزیع را بررسی کند."}
              </p>
              <a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all duration-300 group"
              >
                {lang === "en" ? "Contact Us" : "تماس با ما"}
              </a>
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
                  name: lang === "en" ? faq.questionEn : faq.questionFa,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: lang === "en" ? faq.answerEn : faq.answerFa,
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
                    name: lang === "en" ? "Home" : "خانه",
                    item: absoluteUrl(localizedPath(lang)),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: lang === "en" ? "FAQ" : "پرسش‌های متداول",
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
