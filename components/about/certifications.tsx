import type { Language } from "@/lib/i18n"

interface CertificationsProps {
  lang: Language
}

const certs = {
  en: [
    { code: "ISO 22000", name: "Food Safety Management System", year: 2015 },
    { code: "HACCP", name: "Hazard Analysis and Critical Control Points", year: 2010 },
    { code: "FSSC 22000", name: "Food Safety System Certification", year: 2018 },
    { code: "Halal", name: "Certified Halal by Islamic Authority", year: 2012 },
  ],
  fa: [
    { code: "ISO 22000", name: "سیستم مدیریت ایمنی غذا", year: 1394 },
    { code: "HACCP", name: "تحلیل خطرات و نقاط کنترل بحرانی", year: 1389 },
    { code: "FSSC 22000", name: "گواهی سیستم ایمنی غذا", year: 1397 },
    { code: "Halal", name: "تصدیق حلال توسط مرجع اسلامی", year: 1391 },
  ],
}

export function Certifications({ lang }: CertificationsProps) {
  const certList = lang === "en" ? certs.en : certs.fa

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Certifications & Compliance</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Internationally recognized certifications demonstrating our commitment to quality and safety"
            : "تصدیق‌های بین‌المللی‌ شناخته‌شده که تعهد ما به کیفیت و ایمنی را نشان می‌دهند"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certList.map((cert, idx) => (
            <div key={idx} className="p-8 bg-background rounded-lg border-2 border-accent-warm-gold">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary">{cert.code}</h3>
                <span className="text-sm font-medium text-accent-warm-red">{cert.year}</span>
              </div>
              <p className="text-neutral">{cert.name}</p>
            </div>
          ))}
        </div>

        {/* Audit info */}
        <div className="mt-16 p-8 bg-accent-warm-gold/10 rounded-lg border border-accent-warm-gold">
          <h3 className="text-2xl font-bold text-primary mb-3">
            {lang === "en" ? "Annual Audits" : "بازرسی‌های سالانه"}
          </h3>
          <p className="text-neutral">
            {lang === "en"
              ? "We undergo comprehensive third-party audits annually to maintain compliance with all international standards."
              : "ما سالانه بازرسی‌های جامع شخص ثالث را تحت نظارت قرار می‌دهیم تا با تمام استانداردهای بین‌المللی سازگار باشیم."}
          </p>
        </div>
      </div>
    </section>
  )
}
