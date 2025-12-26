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
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Private Labeling Solutions</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Tailor-made white-label products designed for your brand's success"
            : "محصولات علامت‌گذاری خصوصی متناسب‌شده برای موفقیت برند شما"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-lg border border-border text-center hover:border-accent transition-colors"
            >
              <h3 className="text-lg font-semibold text-primary mb-3">{feature.title}</h3>
              <p className="text-sm text-neutral">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process overview */}
        <div className="bg-white rounded-lg p-12 border border-border">
          <h3 className="text-3xl font-bold text-primary mb-8 text-center">
            {lang === "en" ? "The Process" : "فرایند"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              lang === "en" ? "Consultation" : "مشورت",
              lang === "en" ? "Sampling" : "نمونه‌برداری",
              lang === "en" ? "Production" : "تولید",
              lang === "en" ? "Delivery" : "تحویل",
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-foreground text-center">{step}</p>
                {idx < 3 && <div className="hidden md:block w-12 h-0.5 bg-border mt-4 -mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
