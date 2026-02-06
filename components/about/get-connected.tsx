"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
}

export function GetConnected({ lang }: GetConnectedProps) {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Full-width Image - matching hero style */}
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="Modern commercial buildings"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - Heading */}
          <h2 className="lg:col-span-5 text-4xl md:text-5xl font-bold font-hero text-primary leading-tight tracking-tight">
            {lang === "en"
              ? "Read our story to get connected"
              : "داستان ما را بخوانید تا متصل شوید"}
          </h2>

          {/* Right - Body Content - FORCE LTR FOR ENGLISH */}
          <div dir="ltr" className="lg:col-span-7 space-y-6 text-left">
            <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed text-left">
              {lang === "en"
                ? "Owned and run by a group of commercial property experts, we provide property consultancy services for owners, occupiers, investors, developers and financial advisors of property and associated assets."
                : "متعلق به گروهی از متخصصان املاک تجاری و اداره می‌شود، ما خدمات مشاوره‌ای املاک را برای مالکان، ساکنان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی املاک و دارایی‌های مرتبط ارائه می‌دهیم."}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-left">
              {lang === "en"
                ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and skills to provide complete property advice, ultimately making you and your business more successful. The property industry continues to transform through influences in technology, culture and economy and we're excited to be a part of the journey, making an impact where we can, and adapting when we need to."
                : "با فعالیت از دفاتر در بیرمنگام، بریستول، اکستر، لیدز، لندن، منچستر، نیوکاسل، تیساید و یورک، ما دانش و مهارت‌های خود را ترکیب می‌کنیم تا مشاوره کامل املاک ارائه دهیم و در نهایت شما و کسب‌وکارتان را موفق‌تر کنیم. صنعت املاک از طریق تأثیرات در فناوری، فرهنگ و اقتصاد به تحول خود ادامه می‌دهد و ما هیجان‌زده هستیم که بخشی از این سفر باشیم."}
            </p>

            {/* Quote Block with Accent Border */}
            <div className="border-l-2 pl-6 border-accent-warm-gold mt-8">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic text-left">
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
