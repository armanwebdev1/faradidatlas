"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
}

export function GetConnected({ lang }: GetConnectedProps) {
  const isRTL = lang === "fa";
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Full-width Image - matching hero style */}
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="Global supply chain operations"
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
              ? "Read our story to connect your supply chain"
              : "داستان ما"}
          </h2>

          {/* Right - Body Content */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="lg:col-span-7 space-y-6"
            style={{
              direction: isRTL ? "rtl" : "ltr",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
              {lang === "en"
                ? "Owned and operated by food trading professionals, we deliver sourcing, quality assurance, and export services for international buyers and retail partners."
                : "متعلق به متخصصان تجارت غذا و توسط آنها اداره می‌شود، ما خدمات تأمین، تضمین کیفیت و صادرات را برای خریداران بین‌المللی و شرکای خرده‌فروشی ارائه می‌دهیم."}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "With teams across sourcing regions and logistics hubs, we combine market insight with rigorous standards to keep your supply steady and compliant."
                : "با تیم‌هایی در مناطق تأمین و هاب‌های لجستیکی، بینش بازار را با استانداردهای دقیق ترکیب می‌کنیم تا تأمین شما پایدار و منطبق بماند."}
            </p>

            {/* Quote Block with Accent Border */}
            <div
              className={`border-accent-warm-gold mt-8 ${
                isRTL ? "border-r-2 pr-6" : "border-l-2 pl-6"
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                {lang === "en"
                  ? "Over the years we expanded our producer network, certifications, and logistics partners to serve customers across continents."
                  : "در طول سال‌ها شبکه تولیدکنندگان، گواهی‌ها و شرکای لجستیک خود را گسترش دادیم تا به مشتریان در سراسر قاره‌ها خدمت کنیم."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
