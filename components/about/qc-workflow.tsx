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
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -left-40 top-40 w-80 h-80 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute -right-40 bottom-40 w-80 h-80 bg-gradient-to-bl from-amber-50 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            {lang === "en" ? "Quality Control Workflow" : "فرایند کنترل کیفیت"}
          </h2>
          <div className="divider-premium w-24 h-1 mx-auto mb-8" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {lang === "en"
              ? "Six-stage quality assurance process ensuring premium standards at every checkpoint"
              : "فرایند اطمینان‌ از کیفیت شش‌مرحله‌ای که استانداردهای برتر را در هر نقطه‌ی بررسی تضمین می‌کند"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stepList.map((step, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-amber-300 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10" />
              
              <div className="flex gap-6 relative">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-gray-800 text-white font-bold text-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 shadow-md">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-amber-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connection line for next item */}
              {idx < stepList.length - 1 && (
                <div className="hidden lg:block absolute -bottom-8 left-24 w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
