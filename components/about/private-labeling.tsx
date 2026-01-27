"use client"

import type { Language } from "@/lib/i18n"

interface PrivateLabelingProps {
  lang: Language
}

const features = {
  en: [
    { title: "Flexible MOQ", description: "Starting from 5,000 kg for most products" },
    { title: "Custom Packaging", description: "Your branding, design, materials of choice" },
    { title: "Quick Turnaround", description: "Production and delivery in 8-12 weeks" },
    { title: "Compliance Support", description: "Help with export documentation and certifications" },
  ],
  fa: [
    { title: "حداقل سفارش انعطاف‌پذیر", description: "شروع از ۵۰۰۰ کیلوگرم برای اکثر محصولات" },
    {
      title: "بسته‌بندی سفارشی",
      description: "نشان‌گذاری، طراحی و مواد شما",
    },
    {
      title: "بازگشت سریع",
      description: "تولید و تحویل در ۸-۱۲ هفته",
    },
    {
      title: "پشتیبانی از قوانین",
      description: "کمک در اسناد صادرات و تصدیق‌ها",
    },
  ],
}

export function PrivateLabeling({ lang }: PrivateLabelingProps) {
  const featureList = lang === "en" ? features.en : features.fa

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            {lang === "en" ? "Private Labeling Solutions" : "محلول‌های برچسب خصوصی"}
          </h2>
          <div className="divider-premium w-24 h-1 mx-auto mb-8" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {lang === "en"
              ? "Tailor-made white-label products designed for your brand's success"
              : "محصولات علامت‌گذاری خصوصی متناسب‌شده برای موفقیت برند شما"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-8 bg-white rounded-xl border border-gray-200 text-center hover:border-amber-300 hover:shadow-xl transition-all duration-500 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-amber-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process overview with modern design */}
        <div className="relative p-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-transparent" />
          
          <h3 className="text-3xl font-bold text-primary mb-12 text-center">
            {lang === "en" ? "The Process" : "فرایند"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              lang === "en" ? "Consultation" : "مشورت",
              lang === "en" ? "Sampling" : "نمونه‌برداری",
              lang === "en" ? "Production" : "تولید",
              lang === "en" ? "Delivery" : "تحویل",
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-gray-800 text-white flex items-center justify-center font-bold mb-3 shadow-md group hover:shadow-lg hover:scale-110 transition-all duration-300">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-foreground text-center px-2">{step}</p>
                
                {/* Connection line */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-7 left-1/2 w-1/3 h-0.5 bg-gradient-to-r from-gray-300 via-gray-300 to-transparent -ml-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
