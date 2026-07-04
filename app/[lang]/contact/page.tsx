import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeInfo } from "@/components/contact/office-info";
import { ResponseSLA } from "@/components/contact/response-sla";
import { ContactHero } from "@/components/contact/contact-hero";
import { products } from "@/components/products/product-data";
import { buildPageMetadata } from "@/lib/metadata";
import { publicContactEmail, publicPhoneNumbers } from "@/lib/contact-info";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";

interface ContactSearchParams {
  product?: string;
}

interface ContactPageProps {
  params: Promise<{
    lang: Language;
  }>;
  searchParams?: Promise<ContactSearchParams>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "contact",
    titleEn: "Contact Faradid Atlas for Food Supply Inquiries",
    titleFa: "تماس با فرادید اطلس برای تأمین مواد غذایی",
    descriptionEn:
      "Send Faradid Atlas your product, volume, destination, and timing details so the team can review a practical sourcing or distribution path.",
    descriptionFa:
      "نوع محصول، حجم موردنیاز، مقصد و زمان‌بندی خود را برای فرادید اطلس ارسال کنید تا تیم ما مسیر عملی تأمین یا توزیع را بررسی کند.",
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: ContactPageProps) {
  const { lang } = await params;
  const resolvedSearchParams: ContactSearchParams = searchParams
    ? await searchParams
    : {};
  const productParam = resolvedSearchParams.product;
  const selectedProduct = productParam
    ? products.find(
        (product) =>
          product.slug === productParam || String(product.id) === productParam,
      )
    : undefined;
  const initialProductInterest = selectedProduct
    ? lang === "en"
      ? selectedProduct.nameEn
      : selectedProduct.nameFa
    : undefined;
  const pageUrl = absoluteUrl(localizedPath(lang, "contact"));
  const pageDescription =
    lang === "en"
      ? "Send Faradid Atlas your product, volume, destination, and timing details so the team can review a practical sourcing or distribution path."
      : "نوع محصول، حجم موردنیاز، مقصد و زمان‌بندی خود را برای فرادید اطلس ارسال کنید تا تیم ما مسیر عملی تأمین یا توزیع را بررسی کند.";

  return (
    <div lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <ContactHero lang={lang} />

        <section
          id="contact-form"
          className="space-responsive px-4 sm:px-6 bg-linear-to-b from-background via-secondary/20 to-background"
        >
          <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <ContactForm
                lang={lang}
                initialProductInterest={initialProductInterest}
              />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name:
                lang === "en" ? "Contact Faradid Atlas" : "تماس با فرادید اطلس",
              description: pageDescription,
              inLanguage: lang,
              mainEntity: {
                "@type": "Organization",
                name: "Faradid Atlas",
                email: publicContactEmail,
                telephone: publicPhoneNumbers.map((phone) => phone.value),
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  email: publicContactEmail,
                  telephone: publicPhoneNumbers.map((phone) => phone.value),
                  availableLanguage: ["English", "Persian"],
                },
              },
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
                  name: lang === "en" ? "Contact" : "تماس",
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
