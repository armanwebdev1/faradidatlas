import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FAQHero } from "@/components/faq/faq-hero";
import { FAQContent } from "@/components/faq/faq-content";
import { faqs } from "@/components/faq/faq-data";
import { buildPageMetadata } from "@/lib/metadata";
import type { Language } from "@/lib/i18n";

interface FAQPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "faq",
    titleEn: "FAQ | Faradid Atlas",
    titleFa: "پرسش‌های متداول | فرادید اطلس",
    descriptionEn:
      "Find answers about Faradid Atlas products, sourcing, quality, offices, mission, vision, and values.",
    descriptionFa:
      "پاسخ پرسش‌های رایج درباره محصولات، تأمین، کیفیت، دفاتر، مأموریت، چشم‌انداز و ارزش‌های فرادید اطلس را در این بخش ببینید.",
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: lang === "en" ? faq.questionEn : faq.questionFa,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: lang === "en" ? faq.answerEn : faq.answerFa,
                },
              })),
            }),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
