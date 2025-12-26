import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { OfficeInfo } from "@/components/contact/office-info"
import { ResponseSLA } from "@/components/contact/response-sla"
import type { Language } from "@/lib/i18n"

interface ContactPageProps {
  params: Promise<{
    lang: Language
  }>
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }]
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </h1>
            <p className="text-xl text-neutral max-w-2xl">
              {lang === "en"
                ? "Have questions about our products or services? Reach out to our B2B team. We're here to help."
                : "سوالی درباره محصولات یا خدمات ما دارید؟ با تیم B2B ما تماس بگیرید. ما اینجا برای کمک هستیم."}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm lang={lang} />
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">{lang === "en" ? "Our Offices" : "دفاتر ما"}</h2>
              <OfficeInfo lang={lang} />
            </div>
          </div>
        </section>

        {/* Response SLA */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <ResponseSLA lang={lang} />
          </div>
        </section>

        {/* Certifications Trust Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-12">
              {lang === "en" ? "Your Partner You Can Trust" : "شریک قابل‌اعتماد شما"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-6 bg-white rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">25+</p>
                <p className="text-sm text-neutral">{lang === "en" ? "Years in Business" : "سال در کسب‌وکار"}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">40+</p>
                <p className="text-sm text-neutral">{lang === "en" ? "Countries Served" : "کشورهای خدمات شده"}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">4</p>
                <p className="text-sm text-neutral">{lang === "en" ? "Major Certifications" : "تصدیق‌های اصلی"}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-sm text-neutral">{lang === "en" ? "Quality Commitment" : "تعهد کیفی"}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
