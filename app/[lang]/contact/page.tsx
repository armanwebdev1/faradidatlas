import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeInfo } from "@/components/contact/office-info";
import { ResponseSLA } from "@/components/contact/response-sla";
import { ContactHero } from "@/components/contact/contact-hero";
import { TrustStats } from "@/components/contact/trust-stats";
import type { Language } from "@/lib/i18n";

interface ContactPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <ContactHero lang={lang} />

        {/* Certifications Trust Section - responsive */}
        <section className="relative space-responsive px-4 sm:px-6 bg-gradient-to-b from-white via-slate-50/80 to-white overflow-hidden">
          {/* Decorative elements - responsive sizing */}
          <div className="absolute top-6 sm:top-10 left-0 sm:left-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl -z-10" />

          <div className="container-wide">
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-8 lg:p-12 shadow-[0_60px_120px_-90px_rgba(15,23,42,0.45)]">
              <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-amber-200/15 blur-3xl" />

              <div className="relative text-center">
                <h2 className="text-responsive-title md:text-responsive-hero text-primary mb-4 sm:mb-6 tracking-tight animate-fade-in-up">
                  {lang === "en"
                    ? "Your Partner You Can Trust"
                    : "شریک قابل‌اعتماد شما"}
                </h2>
                <div className="divider-premium w-16 sm:w-20 md:w-24 h-1 mx-auto animate-fade-in-up" />
              </div>

              <div className="mt-10 sm:mt-12 md:mt-14">
                <TrustStats
                  stats={[
                    {
                      value: 25,
                      suffix: "+",
                      label:
                        lang === "en"
                          ? "Years in Business"
                          : "سال در کسب‌وکار",
                    },
                    {
                      value: 40,
                      suffix: "+",
                      label:
                        lang === "en"
                          ? "Countries Served"
                          : "کشورهای خدمات شده",
                    },
                    {
                      value: 4,
                      label:
                        lang === "en"
                          ? "Major Certifications"
                          : "تصدیق‌های اصلی",
                    },
                    {
                      value: 100,
                      suffix: "%",
                      label: lang === "en" ? "Quality Commitment" : "تعهد کیفی",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - responsive grid */}
        <section
          id="contact-form"
          className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50/70 to-white"
        >
          <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm lang={lang} />
            </div>

            {/* Office Info - responsive sticky */}
            <div id="contact-offices" className="lg:sticky lg:top-32">
              <h2 className="text-responsive-section text-primary mb-6 sm:mb-8 animate-fade-in-up">
                {lang === "en" ? "Our Offices" : "دفاتر ما"}
              </h2>
              <OfficeInfo lang={lang} />
            </div>
          </div>
        </section>

        {/* Response SLA - responsive */}
        <section className="space-responsive px-4 sm:px-6 bg-white">
          <div className="container-wide">
            <ResponseSLA lang={lang} />
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  );
}
