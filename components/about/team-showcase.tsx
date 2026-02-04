"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    elements?.forEach((el, index) => {
      const element = el as HTMLElement;
      if (!element.style.animationDelay) {
        element.style.animationDelay = `${index * 0.12}s`;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-20 opacity-0 translate-y-6"
          data-animate
        >
          <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
            {lang === "en" ? "Our Team" : "تیم ما"}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-hero">
            {lang === "en"
              ? "Our amazing team who works for you"
              : "تیم شگفت‌انگیز ما که برای شما کار می‌کند"}
          </h2>
          <div className="w-24 h-1 bg-accent-warm-gold mx-auto" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamList.map((member, idx) => (
            <div
              key={idx}
              className="group opacity-0 translate-y-6"
              data-animate
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
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
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent-warm-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-accent-warm-gold mb-2 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
