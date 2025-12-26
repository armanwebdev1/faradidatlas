"use client"

import type { Language } from "@/lib/i18n"

interface QCWorkflowProps {
  lang: Language
}

const steps = {
  en: [
    {
      number: "01",
      title: "Producer Selection",
      description: "Rigorous audit and certification of partner farms and facilities",
    },
    {
      number: "02",
      title: "Harvest Monitoring",
      description: "Direct oversight during crop collection and initial processing",
    },
    {
      number: "03",
      title: "Lab Testing",
      description: "Third-party analysis for pesticides, contaminants, and nutritional content",
    },
    {
      number: "04",
      title: "Packaging Inspection",
      description: "Quality control of materials and final packaging integrity",
    },
    {
      number: "05",
      title: "Cold Chain Management",
      description: "Temperature-controlled storage and logistics throughout shipping",
    },
    {
      number: "06",
      title: "Documentation",
      description: "Complete certificates of analysis and compliance records provided",
    },
  ],
  fa: [
    {
      number: "۰۱",
      title: "انتخاب تولیدکننده",
      description: "بازرسی دقیق و تصدیق‌ فارم‌ها و تأسیسات همکار",
    },
    {
      number: "۰۲",
      title: "نظارت بر برداشت",
      description: "نظارت مستقیم در طول جمع‌آوری و فرآوری اولیه محصول",
    },
    {
      number: "۰۳",
      title: "آزمایش آزمایشگاهی",
      description: "تجزیه‌وتحلیل شخص ثالث برای آفت‌ناشی، آلاینده‌ها و محتوای غذایی",
    },
    {
      number: "۰۴",
      title: "بازرسی بسته‌بندی",
      description: "کنترل کیفیت مواد و انتگرال بودن بسته‌بندی نهایی",
    },
    {
      number: "۰۵",
      title: "مدیریت زنجیره سرد",
      description: "ذخیره‌سازی و لجستیک کنترل‌شده‌ی دما در سراسر حمل‌ونقل",
    },
    {
      number: "۰۶",
      title: "مستندات",
      description: "گواهینامه‌های کامل تجزیه‌ و ریکاوری‌های تطابق فراهم شده",
    },
  ],
}

export function QCWorkflow({ lang }: QCWorkflowProps) {
  const stepList = lang === "en" ? steps.en : steps.fa

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Quality Control Workflow</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Six-stage quality assurance process ensuring premium standards at every checkpoint"
            : "فرایند اطمینان‌ از کیفیت شش‌مرحله‌ای که استانداردهای برتر را در هر نقطه‌ی بررسی تضمین می‌کند"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepList.map((step, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary text-white font-bold text-lg">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-neutral leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
