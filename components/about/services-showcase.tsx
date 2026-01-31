"use client";

import type { Language } from "@/lib/i18n";
import { Package, Globe, Leaf, Award, Clock, Shield } from "lucide-react";

interface ServicesShowcaseProps {
  lang: Language;
}

const services = {
  en: [
    {
      icon: Package,
      title: "Premium Sourcing",
      description: "Direct partnerships with the finest producers across Iran and beyond",
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Reliable logistics reaching 40+ countries with consistent quality",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous testing and international certifications at every step",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Ethical sourcing and environmental responsibility in all operations",
    },
    {
      icon: Clock,
      title: "Private Labeling",
      description: "Custom white-label solutions tailored to your brand requirements",
    },
    {
      icon: Shield,
      title: "Compliance Support",
      description: "Expert guidance on export documentation and regulatory standards",
    },
  ],
  fa: [
    {
      icon: Package,
      title: "تأمین پرمیوم",
      description: "شرکات مستقیم با بهترین تولیدکنندگان در سراسر ایران و جهان",
    },
    {
      icon: Globe,
      title: "توزیع جهانی",
      description: "لجستیک قابل‌اعتماد برای ۴۰+ کشور با کیفیت مطابقت‌داده",
    },
    {
      icon: Award,
      title: "اطمینان از کیفیت",
      description: "آزمایش دقیق و تصدیق‌های بین‌المللی در هر مرحله",
    },
    {
      icon: Leaf,
      title: "روش‌های پایدار",
      description: "منابع اخلاقی و مسئولیت محیطی در تمام عملیات",
    },
    {
      icon: Clock,
      title: "برچسب خصوصی",
      description: "راه‌حل‌های علامت‌گذاری سفید سفارشی متناسب‌شده برای برند شما",
    },
    {
      icon: Shield,
      title: "پشتیبانی انطباق",
      description: "راهنمایی متخصص در مستندات صادرات و استانداردهای نظارتی",
    },
  ],
};

export function ServicesShowcase({ lang }: ServicesShowcaseProps) {
  const servicesList = lang === "en" ? services.en : services.fa;
  const isRTL = lang === "fa";

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-96 bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-warm-gold/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
            {lang === "en" ? "What We Offer" : "خدمات ما"}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-hero">
            {lang === "en" ? "Comprehensive Solutions" : "راه‌حل‌های جامع"}
          </h2>
          <div className="w-24 h-1 bg-accent-warm-gold mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === "en"
              ? "From sourcing to delivery, we provide complete solutions for your food trading needs"
              : "از تأمین تا تحویل، ما راه‌حل‌های کاملی برای نیازهای تجارت غذایی شما فراهم می‌کنیم"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => {
            const { icon: Icon } = service;
            return (
              <div
                key={idx}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="relative p-8 md:p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex p-3 bg-gradient-to-br from-accent-warm-gold/20 to-accent-warm-gold/10 rounded-xl group-hover:shadow-lg group-hover:shadow-accent-warm-gold/30 transition-all duration-300">
                      <Icon
                        size={28}
                        className="text-accent-warm-gold group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent-warm-gold transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {service.description}
                  </p>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Arrow hint */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 text-accent-warm-gold group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in-up">
          <div className="inline-block p-8 bg-gradient-to-br from-primary/5 to-accent-warm-gold/5 rounded-2xl border border-gray-200">
            <p className="text-xl text-primary font-semibold mb-6">
              {lang === "en"
                ? "Ready to partner with us?"
                : "آماده‌اید تا با ما شریک شوید؟"}
            </p>
            <button className="px-8 py-4 bg-primary text-white font-bold hover:bg-primary/90 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/30">
              {lang === "en" ? "Get in Touch" : "تماس بگیرید"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
