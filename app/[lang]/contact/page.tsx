import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeInfo } from "@/components/contact/office-info";
import { ResponseSLA } from "@/components/contact/response-sla";
import { ContactHero } from "@/components/contact/contact-hero";
import { buildPageMetadata } from "@/lib/metadata";
import type { Language } from "@/lib/i18n";

interface ContactPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "contact",
    titleEn: "Contact Faradid Atlas",
    titleFa: "تماس با فرادید اطلس",
    descriptionEn:
      "Contact Faradid Atlas with your product, volume, destination, and timing details for sourcing and distribution inquiries.",
    descriptionFa:
      "برای ثبت درخواست همکاری، نوع محصول، حجم موردنیاز، مقصد و زمان‌بندی خود را با تیم فرادید اطلس در میان بگذارید.",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <ContactHero lang={lang} />

        <section
          id="contact-form"
          className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-secondary/20 to-background"
        >
          <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <ContactForm lang={lang} />
            </div>

            <div id="contact-offices" className="lg:sticky lg:top-32">
              <h2 className="text-responsive-section text-primary mb-6 sm:mb-8 animate-fade-in-up">
                {lang === "en" ? "Our Offices" : "دفاتر ما"}
              </h2>
              <OfficeInfo lang={lang} />
            </div>
          </div>
        </section>

        <section className="space-responsive px-4 sm:px-6 bg-background">
          <div className="container-wide">
            <ResponseSLA lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
