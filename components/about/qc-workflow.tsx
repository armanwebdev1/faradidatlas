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
    <section className="relative space-responsive px-4 sm:px-6 bg-white overflow-hidden">
      {/* Background gradient elements - responsive sizing */}
      <div className="absolute -left-20 sm:-left-32 md:-left-40 top-20 sm:top-40 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute -right-20 sm:-right-32 md:-right-40 bottom-20 sm:bottom-40 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-bl from-amber-50 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container-wide">
        {/* Header section - responsive */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="text-responsive-title md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 tracking-tight">
            {lang === "en" ? "Quality Control Workflow" : "فرایند کنترل کیفیت"}
          </h2>
          <div className="divider-premium w-16 sm:w-20 md:w-24 h-1 mx-auto mb-4 sm:mb-6 md:mb-8" />
          <p className="text-responsive-body text-gray-700 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {lang === "en"
              ? "Six-stage quality assurance process ensuring premium standards at every checkpoint"
              : "فرایند اطمینان‌ از کیفیت شش‌مرحله‌ای که استانداردهای برتر را در هر نقطه‌ی بررسی تضمین می‌کند"}
          </p>
        </div>

        {/* Steps grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stepList.map((step, idx) => (
            <div 
              key={idx} 
              className="group relative p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-amber-300 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl -z-10" />
              
              {/* Step content - responsive flex layout */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 relative">
                {/* Number badge - responsive sizing */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-gray-800 text-white font-bold text-sm sm:text-base md:text-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 shadow-md">
                    {step.number}
                  </div>
                </div>
                
                {/* Text content - responsive */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-1.5 sm:mb-2 group-hover:text-amber-700 transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connection line for next item - visible only on lg+ */}
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
