"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface TeamShowcaseProps {
  lang: Language;
}

const team = {
  en: [
    {
      name: "Hassan Faradi",
      role: "Founder & CEO",
      bio: "25+ years experience",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "Leila Amiri",
      role: "Head of Operations",
      bio: "Expert in logistics",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "Mohammad Rahimi",
      role: "VP Sales",
      bio: "Global expertise",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "Sara Nazari",
      role: "Director of Quality",
      bio: "Quality assurance",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "Ali Shirazi",
      role: "Operations Manager",
      bio: "Process excellence",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "Fatima Karimi",
      role: "Customer Relations",
      bio: "Client satisfaction",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "Reza Tavassoli",
      role: "Agricultural Expert",
      bio: "Sourcing specialist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "Maryam Beheshti",
      role: "Sustainability Officer",
      bio: "Environmental focus",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
  ],
  fa: [
    {
      name: "حسن فرادی",
      role: "بنیانگذار و مدیرعامل",
      bio: "۲۵+ سال تجربه",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "لیلا امیری",
      role: "رئیس عملیات",
      bio: "متخصص لجستیک",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "محمد رحیمی",
      role: "معاون فروش",
      bio: "تجربه جهانی",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "سارا ناظری",
      role: "مدیر کیفیت",
      bio: "تضمین کیفیت",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "علی شیرازی",
      role: "مدیر عملیات",
      bio: "برتری فرایندی",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "فاطمه کریمی",
      role: "روابط مشتریان",
      bio: "رضایت کلاینت",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "رضا طواسلی",
      role: "متخصص کشاورزی",
      bio: "متخصص تأمین",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "مریم بهشتی",
      role: "مسئول پایداری",
      bio: "تمرکز محیطی",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
  ],
};

export function TeamShowcase({ lang }: TeamShowcaseProps) {
  const teamList = lang === "en" ? team.en : team.fa;
  const isRTL = lang === "fa";

  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Accent divider */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-4 sm:mb-6 uppercase tracking-widest">
            {lang === "en" ? "Our Team" : "تیم ما"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 tracking-tight font-hero text-balance">
            {lang === "en"
              ? "Our amazing team who works for you"
              : "تیم شگفت‌انگیز ما که برای شما کار می‌کند"}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent mx-auto opacity-80" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {teamList.map((member, idx) => (
            <div
              key={idx}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative h-60 sm:h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={288}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1 group-hover:text-accent-warm-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-accent-warm-gold mb-2 sm:mb-3 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 flex-grow">{member.bio}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
