import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
}

export function GetConnected({ lang }: GetConnectedProps) {
  const isRTL = lang === "fa";

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt={lang === "en" ? "Regional supply chain operations" : "عملیات زنجیره تامین منطقه‌ای"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <h2
            className="lg:col-span-5 text-4xl md:text-5xl font-bold font-hero text-primary leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {lang === "en"
              ? "A supply network shaped by access and accountability"
              : "شبکه تامینی بر پایه دسترسی و مسئولیت‌پذیری"}
          </h2>

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
                ? "Our company offices are listed in Tehran, Isfahan, Dubai, and Oman, with operational and storage support in Iran including Shahrekord."
                : "دفاتر شرکت در تهران، اصفهان، دبی و عمان معرفی شده‌اند و پشتیبانی عملیاتی و انباری در ایران، از جمله شهرکرد، فعالیت تامین را کامل می‌کند."}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "This footprint helps the company manage procurement, storage, and distribution so top-grade food products can move continuously and on time across Iran."
                : "این گستره به شرکت کمک می‌کند تامین، نگهداری و توزیع را مدیریت کند تا محصولات غذایی باکیفیت به‌صورت مستمر و به‌موقع در سراسر ایران در دسترس باشند."}
            </p>

            <div
              className={`border-accent-warm-gold mt-8 ${
                isRTL ? "border-r-2 pr-8" : "border-l-2 pl-6"
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                {lang === "en"
                  ? "The goal is simple: keep high-quality essential food products available, fairly priced, and ready for the buyers who depend on them."
                  : "هدف ساده است: حفظ دسترسی به مواد غذایی اساسی باکیفیت، قیمت‌گذاری منطقی و آمادگی برای خریدارانی که به آن وابسته‌اند."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
