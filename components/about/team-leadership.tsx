"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface TeamLeadershipProps {
  lang: Language;
}

const team = {
  en: [
    {
      name: "Hassan Faradi",
      role: "Founder & CEO",
      bio: "25+ years of experience in global food trading and supply chain management",
      image: "/team-1.jpg",
    },
    {
      name: "Leila Amiri",
      role: "Head of Quality Assurance",
      bio: "Expert in food safety standards and international certifications",
      image: "/team-2.jpg",
    },
    {
      name: "Mohammad Rahimi",
      role: "VP International Trade",
      bio: "Leading global expansion with expertise in 40+ markets worldwide",
      image: "/team-3.jpg",
    },
    {
      name: "Sara Nazari",
      role: "Director of Sourcing",
      bio: "Deep relationships with premium producers across Iran and beyond",
      image: "/team-4.jpg",
    },
    {
      name: "Ali Shirazi",
      role: "Operations Manager",
      bio: "Ensuring seamless logistics and delivery across international markets",
      image: "/team-5.jpg",
    },
    {
      name: "Fatima Karimi",
      role: "Head of Customer Relations",
      bio: "Building lasting partnerships with valued clients worldwide",
      image: "/team-6.jpg",
    },
    {
      name: "Reza Tavassoli",
      role: "Lead Agricultural Expert",
      bio: "Specializing in product selection and harvest monitoring protocols",
      image: "/team-7.jpg",
    },
    {
      name: "Maryam Beheshti",
      role: "Sustainability Officer",
      bio: "Promoting ethical sourcing and environmental responsibility",
      image: "/team-8.jpg",
    },
  ],
  fa: [
    {
      name: "حسن فرادی",
      role: "بنیانگذار و مدیرعامل",
      bio: "بیش از ۲۵ سال تجربه در تجارت غذایی جهانی و مدیریت زنجیره تأمین",
      image: "/team-1.jpg",
    },
    {
      name: "لیلا امیری",
      role: "رئیس اطمینان از کیفیت",
      bio: "متخصص در استانداردهای ایمنی غذا و تصدیق‌های بین‌المللی",
      image: "/team-2.jpg",
    },
    {
      name: "محمد رحیمی",
      role: "معاون تجارت بین‌المللی",
      bio: "رهبری انتشار جهانی با تجربه در ۴۰+ بازار جهانی",
      image: "/team-3.jpg",
    },
    {
      name: "سارا ناظری",
      role: "مدیر تأمین",
      bio: "روابط عمیق با تولیدکنندگان پرمیوم در سراسر ایران و جهان",
      image: "/team-4.jpg",
    },
    {
      name: "علی شیرازی",
      role: "مدیر عملیات",
      bio: "تضمین لجستیک بدون مانع و تحویل در بازارهای بین‌المللی",
      image: "/team-5.jpg",
    },
    {
      name: "فاطمه کریمی",
      role: "رئیس روابط مشتریان",
      bio: "ایجاد شرکات دیرپایی با مشتریان ارزشمند در جهان",
      image: "/team-6.jpg",
    },
    {
      name: "رضا طواسلی",
      role: "متخصص کشاورزی اول",
      bio: "تخصص در انتخاب محصول و پروتکل‌های نظارت برداشت",
      image: "/team-7.jpg",
    },
    {
      name: "مریم بهشتی",
      role: "مسئول پایداری",
      bio: "ترویج منابع اخلاقی و مسئولیت محیطی",
      image: "/team-8.jpg",
    },
  ],
};

export function TeamLeadership({ lang }: TeamLeadershipProps) {
  const teamList = lang === "en" ? team.en : team.fa;
  const isRTL = lang === "fa";

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-accent-warm-gold/8 rounded-full blur-3xl -z-0" />
      <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-accent-warm-gold/5 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
            {lang === "en" ? "Our People" : "تیم ما"}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-hero">
            {lang === "en" ? "Meet Our Team" : "تیم ما را بیشتر بشناسید"}
          </h2>
          <div className="w-24 h-1 bg-accent-warm-gold mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === "en"
              ? "Experienced professionals dedicated to excellence in global food trading"
              : "متخصصین با تجربه که به برتری در تجارت غذایی جهانی متعهد هستند"}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamList.map((member, idx) => (
            <div
              key={idx}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent-warm-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-accent-warm-gold mb-3 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up">
          <p className="text-lg text-gray-600 mb-8">
            {lang === "en"
              ? "Interested in joining our growing team?"
              : "علاقه‌مند به پیوستن به تیم رو به رشد ما؟"}
          </p>
          <button className="px-8 py-4 bg-primary text-white font-bold hover:bg-primary/90 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/30">
            {lang === "en" ? "Explore Careers" : "فرصت‌های شغلی"}
          </button>
        </div>
      </div>
    </section>
  );
}
