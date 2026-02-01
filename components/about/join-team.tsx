"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface JoinTeamProps {
  lang: Language;
}

export function JoinTeam({ lang }: JoinTeamProps) {
  const isRTL = lang === "fa";

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/95" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div
            className={`space-y-8 animate-fade-in-up ${
              isRTL ? "lg:order-2" : ""
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight font-hero">
              {lang === "en" ? "Join our team" : "به تیم ما بپیوندید"}
            </h2>

            <p className="text-lg text-white/85 leading-relaxed">
              {lang === "en"
                ? "We believe in hiring great people and creating an environment where they can do their best work. If you're passionate about property and looking for a career in a dynamic team, we'd love to hear from you."
                : "ما بر استخدام افراد عالی و ایجاد محیطی که می‌توانند بهترین کار خود را انجام دهند، اعتقاد داریم. اگر شما در مورد ملک علاقه‌مند هستید و به دنبال شغلی در تیم پویا، می‌خواهیم از شما بشنویم."}
            </p>

            <p className="text-base text-white/70 leading-relaxed">
              {lang === "en"
                ? "Explore open positions and submit your application to join Faradid"
                : "مواضع باز را کاوش کنید و درخواست خود را برای پیوستن به فارادید ارسال کنید"}
            </p>

            <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg inline-block">
              {lang === "en"
                ? "View Open Positions"
                : "مواضع باز را مشاهده کنید"}
            </button>
          </div>

          {/* Right - Image */}
          <div className={`animate-fade-in-up ${isRTL ? "lg:order-1" : ""}`}>
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
