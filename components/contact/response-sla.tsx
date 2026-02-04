import type { Language } from "@/lib/i18n"

interface ResponseSLAProps {
  lang: Language
}

export function ResponseSLA({ lang }: ResponseSLAProps) {
  const content = {
    en: {
      title: "Our Commitment",
      description:
        "We value your time and are committed to responding quickly to all inquiries. Here's what to expect:",
      slas: [
        {
          title: "Email Inquiries",
          timeline: "Response within 24-48 hours",
          description: "All B2B inquiries receive prompt, detailed responses",
        },
        {
          title: "WhatsApp/Phone",
          timeline: "Response within 4-6 hours",
          description: "Direct contact for urgent matters or quick questions",
        },
        {
          title: "Quote Requests",
          timeline: "Detailed quote within 48 hours",
          description: "Includes product samples when applicable",
        },
        {
          title: "Next Steps",
          timeline: "Follow-up meeting within 1 week",
          description: "Discuss terms, certifications, and logistics",
        },
      ],
    },
    fa: {
      title: "تعهد ما",
      description: "ما ارزش وقت شما را می‌دانیم و متعهد به پاسخ سریع به تمام درخواست‌ها هستیم:",
      slas: [
        {
          title: "درخواست‌های ایمیل",
          timeline: "پاسخ در ۲۴-۴۸ ساعت",
          description: "تمام درخواست‌های B2B با پاسخ‌های دقیق و سریع",
        },
        {
          title: "WhatsApp/تلفن",
          timeline: "پاسخ در ۴-۶ ساعت",
          description: "تماس مستقیم برای مسائل فوری یا سوالات سریع",
        },
        {
          title: "درخواست قیمت",
          timeline: "قیمت دقیق در ۴۸ ساعت",
          description: "شامل نمونه محصول در صورت لزوم",
        },
        {
          title: "مراحل بعدی",
          timeline: "جلسه پیگیری در ۱ هفته",
          description: "بحث درباره شرایط، تصدیق‌ها و لجستیک",
        },
      ],
    },
  }

  const data = lang === "en" ? content.en : content.fa

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-6 py-12 sm:px-10 sm:py-14 lg:px-12 text-white shadow-[0_50px_120px_-80px_rgba(15,23,42,0.9)]">
      <div className="pointer-events-none absolute -top-28 -right-24 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative">
        <h3 className="text-3xl sm:text-4xl font-semibold text-center tracking-tight">
          {data.title}
        </h3>
        <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
          {data.description}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.slas.map((sla, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-6 sm:px-6 sm:py-7 backdrop-blur-sm shadow-[0_20px_60px_-45px_rgba(15,23,42,0.6)]"
            >
              <h4 className="text-base sm:text-lg font-semibold text-white">
                {sla.title}
              </h4>
              <p className="mt-2 text-sm font-semibold text-cyan-100/90">
                {sla.timeline}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-white/65 leading-relaxed">
                {sla.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
