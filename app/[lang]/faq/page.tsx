import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FAQHero } from "@/components/faq/faq-hero";
import { FAQContent } from "@/components/faq/faq-content";
import { faqs } from "@/components/faq/faq-data";
import type { Language } from "@/lib/i18n";

interface FAQPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <FAQHero lang={lang} />

        {/* FAQ Content */}
        <section className="py-24 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            {/* Filters */}
            <FAQContent items={faqs} lang={lang} />

            {/* CTA Section */}
            <div className="relative mt-20 p-12 bg-gradient-to-br from-background to-secondary/30 rounded-2xl border border-border text-center overflow-hidden shadow-lg animate-fade-in-up">
              <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">
                {lang === "en"
                  ? "Didn't find your answer?"
                  : "پاسخ خود را پیدا نکردید؟"}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {lang === "en"
                  ? "Contact our team directly. We respond to inquiries within 24 hours."
                  : "مستقیماً با تیم ما تماس بگیرید. ما در عرض ۲۴ ساعت به درخواست‌ها پاسخ می‌دهیم."}
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

        {/* Schema Markup for FAQPage */}
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
