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
        <section className="relative py-24 px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 inline-block px-4 py-2 bg-amber-100/50 rounded-full border border-amber-200/50">
              <span className="text-sm font-semibold text-primary">
                {lang === "en" ? "Get in Touch" : "تماس بگیرید"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </h1>
            <div className="divider-premium w-24 h-1 mb-8" />
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Have questions about our products or services? Reach out to our B2B team. We're here to help."
                : "سوالی درباره محصولات یا خدمات ما دارید؟ با تیم B2B ما تماس بگیرید. ما اینجا برای کمک هستیم."}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm lang={lang} />
            </div>

            {/* Office Info */}
            <div className="sticky top-32">
              <h2 className="text-2xl font-bold text-primary mb-8">{lang === "en" ? "Our Offices" : "دفاتر ما"}</h2>
              <OfficeInfo lang={lang} />
            </div>
          </div>
        </section>

        {/* Response SLA */}
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <ResponseSLA lang={lang} />
          </div>
        </section>

        {/* Certifications Trust Section */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
              {lang === "en" ? "Your Partner You Can Trust" : "شریک قابل‌اعتماد شما"}
            </h2>
            <div className="divider-premium w-24 h-1 mx-auto mb-16" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "25+", label: lang === "en" ? "Years in Business" : "سال در کسب‌وکار" },
                { num: "40+", label: lang === "en" ? "Countries Served" : "کشورهای خدمات شده" },
                { num: "4", label: lang === "en" ? "Major Certifications" : "تصدیق‌های اصلی" },
                { num: "100%", label: lang === "en" ? "Quality Commitment" : "تعهد کیفی" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10" />
                  
                  <p className="text-4xl font-bold text-primary group-hover:text-amber-700 transition-colors mb-2">
                    {item.num}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-amber-700 transition-colors">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
