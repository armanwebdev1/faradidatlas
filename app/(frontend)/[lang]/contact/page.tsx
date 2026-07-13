import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeInfo } from "@/components/contact/office-info";
import { ResponseSLA } from "@/components/contact/response-sla";
import { TrustStats } from "@/components/contact/trust-stats";
import { ContactHero } from "@/components/contact/contact-hero";
import { getProductBySlug, getCategories } from "@/lib/fetch/products";
import { getContactInfo } from "@/lib/fetch/contact-info";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import Link from "next/link";

export const revalidate = 60

function getLocalized(value: any, lang: Language): string {
  if (!value) return ""
  if (typeof value === "string") return value
  if (typeof value === "object" && value[lang]) return value[lang]
  if (typeof value === "object" && value.en) return value.en
  return ""
}

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
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "contact",
    titleEn: "Contact Faradid Atlas — B2B Food Supply Inquiries | Iran, UAE, Oman",
    titleFa: "با فرادید اطلس در تماس باشید | تأمین و توزیع مواد غذایی",
    titleAr: "اتصل بـ فراديد أطلس — استفسارات تزوين الغذاء B2B | إيران، الإمارات، عمان",
    descriptionEn:
      "Contact Faradid Atlas for wholesale food sourcing, import, and distribution inquiries. Offices in Tehran, Isfahan, Dubai, and Oman.",
    descriptionFa:
      "برای استفسارات تأمین، واردات و توزیع عمده مواد غذایی با فرادید اطلس تماس بگیرید.",
    descriptionAr:
      "اتصل بـ فراديد أطلس للاستفسارات عن تزوين واستيراد وتوزيع الغذاء بالجملة.",
  });
}

export default async function ContactPage({ params, searchParams }: ContactPageProps) {
  const { lang } = await params;
  const resolvedSearchParams: ContactSearchParams = searchParams ? await searchParams : {};
  const productParam = resolvedSearchParams.product;

  let selectedProduct = null;
  let contactInfo = null;
  let categories: any[] = [];
  try {
    [selectedProduct, contactInfo, categories] = await Promise.all([
      productParam ? getProductBySlug(productParam, lang).catch(() => null) : null,
      getContactInfo(lang).catch(() => null),
      getCategories(lang).catch(() => []),
    ]);
  } catch (err) {
    console.error('[Contact] fetch failed:', err);
  }

  const ci = contactInfo as any;
  const initialProductInterest = selectedProduct
    ? lang === "en" ? selectedProduct.nameEn : lang === "fa" ? selectedProduct.nameFa : selectedProduct.nameAr
    : undefined;

  const productOptions = categories.length > 0
    ? [
        ...categories.map((c: any) => ({
          value: c.slug,
          labelEn: (c.name as any)?.en ?? c.slug,
          labelFa: (c.name as any)?.fa ?? c.slug,
          labelAr: (c.name as any)?.ar ?? c.slug,
        })),
        { value: "multiple", labelEn: "Multiple Products", labelFa: "چند محصول", labelAr: "منتجات متعددة" },
      ]
    : undefined;

  const trustStats = ci?.trustStats?.length > 0
    ? ci.trustStats.map((s: any) => ({
        value: s.value,
        suffix: s.suffix ?? undefined,
        label: getLocalized(s.label, lang) || "",
      }))
    : [];

  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "contact"));

  const publicContactEmail = ci?.email ?? '';
  const publicPhoneNumbers = (ci?.phones ?? []).map((p: any) => ({
    value: p.value ?? '',
    display: p.display ?? '',
    whatsappHref: p.whatsappHref ?? '',
  }));

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <ContactHero lang={lang} />

        <section
          id="contact-form"
          className="space-responsive px-4 sm:px-6 bg-linear-to-b from-background via-secondary/20 to-background"
        >
          <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <ContactForm lang={lang} initialProductInterest={initialProductInterest} productOptions={productOptions} />
            </div>

            <div id="contact-offices" className="lg:sticky lg:top-32">
              <h2 className="text-responsive-section text-primary mb-6 sm:mb-8 animate-fade-in-up">
                {t.pages.contact.ourOffices}
              </h2>
              <OfficeInfo lang={lang} contactInfo={ci} />
            </div>
          </div>
        </section>

        <section className="space-responsive px-4 sm:px-6 bg-background">
          <div className="container-wide">
            <ResponseSLA lang={lang} contactInfo={ci} />
          </div>
        </section>

        {trustStats.length > 0 && (
          <section className="space-responsive px-4 sm:px-6 bg-background">
            <div className="container-wide">
              <TrustStats stats={trustStats} />
            </div>
          </section>
        )}

        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/30">
          <div className="container-wide text-center">
            <h2 className="text-responsive-section text-primary mb-4">
              {t.pages.contact.browseProducts}
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6 max-w-2xl mx-auto">
              {t.pages.contact.browseProductsDescription}
            </p>
            <Link
              href={`/${lang}/products`}
              className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm sm:text-base shadow-sm hover:shadow-md"
            >
              {t.common.exploreProducts}
            </Link>
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
              name: t.seo.contactTitle,
              description: t.pages.contact.seoDescription,
              inLanguage: lang,
              mainEntity: {
                "@type": "Organization",
                name: "Faradid Atlas",
                email: publicContactEmail,
                telephone: publicPhoneNumbers.map((phone: any) => phone.value),
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  email: publicContactEmail,
                  telephone: publicPhoneNumbers.map((phone: any) => phone.value),
                  availableLanguage: ["English", "Persian"],
                },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.breadcrumbs.home, item: absoluteUrl(localizedPath(lang)) },
                { "@type": "ListItem", position: 2, name: t.breadcrumbs.contact, item: pageUrl },
              ],
            },
          ]),
        }}
      />
      <Footer lang={lang} />
    </div>
  );
}
