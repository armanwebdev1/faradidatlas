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
          icon: "⏱️",
          title: "Email Inquiries",
          timeline: "Response within 24-48 hours",
          description: "All B2B inquiries receive prompt, detailed responses",
        },
        {
          icon: "💬",
          title: "WhatsApp/Phone",
          timeline: "Response within 4-6 hours",
          description: "Direct contact for urgent matters or quick questions",
        },
        {
          icon: "📧",
          title: "Quote Requests",
          timeline: "Detailed quote within 48 hours",
          description: "Includes product samples when applicable",
        },
        {
          icon: "🤝",
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
          icon: "⏱️",
          title: "درخواست‌های ایمیل",
          timeline: "پاسخ در ۲۴-۴۸ ساعت",
          description: "تمام درخواست‌های B2B با پاسخ‌های دقیق و سریع",
        },
        {
          icon: "💬",
          title: "WhatsApp/تلفن",
          timeline: "پاسخ در ۴-۶ ساعت",
          description: "تماس مستقیم برای مسائل فوری یا سوالات سریع",
        },
        {
          icon: "📧",
          title: "درخواست قیمت",
          timeline: "قیمت دقیق در ۴۸ ساعت",
          description: "شامل نمونه محصول در صورت لزوم",
        },
        {
          icon: "🤝",
          title: "مراحل بعدی",
          timeline: "جلسه پیگیری در ۱ هفته",
          description: "بحث درباره شرایط، تصدیق‌ها و لجستیک",
        },
      ],
    },
  }

  const data = lang === "en" ? content.en : content.fa

  return (
    <div className="py-16 px-6 bg-background rounded-lg border border-border">
      <h3 className="text-3xl font-bold text-primary text-center mb-4">{data.title}</h3>
      <p className="text-center text-neutral mb-12 max-w-2xl mx-auto">{data.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.slas.map((sla, idx) => (
          <div key={idx} className="text-center">
            <div className="text-4xl mb-3">{sla.icon}</div>
            <h4 className="text-lg font-semibold text-primary mb-1">{sla.title}</h4>
            <p className="text-sm font-medium text-accent mb-2">{sla.timeline}</p>
            <p className="text-xs text-neutral">{sla.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
