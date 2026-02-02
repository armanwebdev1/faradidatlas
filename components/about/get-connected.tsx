"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
}

export function GetConnected({ lang }: GetConnectedProps) {
  const isRTL = lang === "fa";

  return (
    <section className="relative bg-gray-50 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Full-width Image - matching hero style */}
      <div className="w-full px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-52 sm:h-64 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl animate-fade-in-up group">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="Modern commercial buildings"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* Accent divider */}
      <div className="flex justify-center pt-12 sm:pt-16 md:pt-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
          {/* Left - Heading */}
          <h2 className="lg:col-span-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-hero text-primary leading-tight tracking-tight animate-fade-in-up text-balance">
            {lang === "en"
              ? "Read our story to get connected"
              : "داستان ما را بخوانید تا متصل شوید"}
          </h2>

          {/* Right - Body Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 animate-fade-in-up">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-relaxed">
              {lang === "en"
                ? "Owned and run by a group of commercial property experts, we provide property consultancy services for owners, occupiers, investors, developers and financial advisors of property and associated assets."
                : "متعلق به گروهی از متخصصان املاک تجاری و اداره می‌شود، ما خدمات مشاوره‌ای املاک را برای مالکان، ساکنان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی املاک و دارایی‌های مرتبط ارائه می‌دهیم."}
            </p>

            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and skills to provide complete property advice, ultimately making you and your business more successful. The property industry continues to transform through influences in technology, culture and economy and we're excited to be a part of the journey, making an impact where we can, and adapting when we need to."
                : "با فعالیت از دفاتر در بیرمنگام، بریستول، اکستر، لیدز، لندن، منچستر، نیوکاسل، تیساید و یورک، ما دانش و مهارت‌های خود را ترکیب می‌کنیم تا مشاوره کامل املاک ارائه دهیم و در نهایت شما و کسب‌وکارتان را موفق‌تر کنیم. صنعت املاک از طریق تأثیرات در فناوری، فرهنگ و اقتصاد به تحول خود ادامه می‌دهد و ما هیجان‌زده هستیم که بخشی از این سفر باشیم."}
            </p>

            {/* Quote Block with Accent Border */}
            <div
              className={`${
                isRTL ? "border-r-4" : "border-l-4"
              } border-accent-warm-gold ${
                isRTL ? "pr-4 sm:pr-6" : "pl-4 sm:pl-6"
              } py-2 sm:py-4 mt-6 sm:mt-8 hover:bg-white/50 transition-all duration-300 rounded-r-lg`}
            >
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed italic font-light">
                {lang === "en"
                  ? "Some 14 years later, their businesses had survived through the wars, experienced international success and acquired several other businesses, and in 2007 the two merged to become the name we are today."
                  : "حدود ۱۴ سال بعد، کسب‌وکارهای آن‌ها از جنگ‌ها جان سالم به در بردند، موفقیت بین‌المللی را تجربه کردند و چندین کسب‌وکار دیگر را به دست آوردند، و در سال ۲۰۰۷ این دو ادغام شدند تا نامی شوند که امروز هستیم."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
