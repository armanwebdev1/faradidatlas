"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface HeritageTimelineProps {
  lang: Language;
}

const milestones = {
  en: [
    {
      year: "1998",
      title: "Foundation",
      description:
        "Faradi Atlas established with a vision for premium global food trading",
      image: "/timeline-1.jpg",
    },
    {
      year: "2005",
      title: "International Expansion",
      description: "Began exporting to 15+ countries across Europe and Asia",
      image: "/timeline-2.jpg",
    },
    {
      year: "2012",
      title: "Halal Certification",
      description: "Achieved Halal certification from Islamic authorities",
      image: "/timeline-3.jpg",
    },
    {
      year: "2018",
      title: "FSSC Certification",
      description: "Obtained FSSC 22000 food safety system certification",
      image: "/timeline-4.jpg",
    },
    {
      year: "2023",
      title: "Global Leadership",
      description: "Now serving 40+ countries with 500+ premium products",
      image: "/timeline-5.jpg",
    },
  ],
  fa: [
    {
      year: "۱۳۷۷",
      title: "تأسیس",
      description: "فارادی اطلس با دیدگاه تجارت غذایی جهانی پرمیوم تأسیس شد",
      image: "/timeline-1.jpg",
    },
    {
      year: "۱۳۸۴",
      title: "تجارت بین‌المللی",
      description: "آغاز صادرات به بیش از ۱۵ کشور در اروپا و آسیا",
      image: "/timeline-2.jpg",
    },
    {
      year: "۱۳۹۱",
      title: "گواهی حلال",
      description: "کسب گواهی حلال از مراجع اسلامی",
      image: "/timeline-3.jpg",
    },
    {
      year: "۱۳۹۷",
      title: "گواهی FSSC",
      description: "دریافت گواهی سیستم ایمنی غذایی FSSC 22000",
      image: "/timeline-4.jpg",
    },
    {
      year: "۱۴۰۲",
      title: "رهبری جهانی",
      description: "خدمات رسانی به ۴۰+ کشور با ۵۰۰+ محصول پرمیوم",
      image: "/timeline-5.jpg",
    },
  ],
};

export function HeritageTimeline({ lang }: HeritageTimelineProps) {
  const timelineList = lang === "en" ? milestones.en : milestones.fa;
  const isRTL = lang === "fa";

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-screen h-96 bg-gradient-to-b from-accent-warm-gold/8 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
            {lang === "en" ? "Our Journey" : "سفر ما"}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-hero">
            {lang === "en" ? "Heritage Timeline" : "جدول زمانی میراث"}
          </h2>
          <div className="w-24 h-1 bg-accent-warm-gold mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === "en"
              ? "Milestone moments that shaped our journey to becoming a global leader in premium food trading"
              : "لحظات مهمی که سفر ما را برای تبدیل شدن به یک رهبر جهانی در تجارت غذایی پرمیوم شکل دادند"}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-warm-gold via-accent-warm-gold/50 to-accent-warm-gold hidden lg:block" />

          {/* Timeline items */}
          <div className="space-y-12 lg:space-y-16">
            {timelineList.map((milestone, idx) => (
              <div
                key={idx}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    idx % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${idx % 2 === 1 ? "lg:text-right lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-accent-warm-gold hover:shadow-xl transition-all duration-500 group">
                      {/* Hover background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

                      {/* Year badge */}
                      <div className="inline-block px-4 py-2 bg-accent-warm-gold/20 rounded-full text-sm font-bold text-accent-warm-gold mb-4">
                        {milestone.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 group-hover:text-accent-warm-gold transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {milestone.description}
                      </p>

                      {/* Accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-warm-gold/50 via-accent-warm-gold to-accent-warm-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex justify-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-warm-gold to-accent-warm-gold rounded-full opacity-20 animate-pulse" />
                      <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent-warm-gold rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className={`${idx % 2 === 1 ? "lg:order-1" : "lg:order-3"}`}
                  >
                    <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg group">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
