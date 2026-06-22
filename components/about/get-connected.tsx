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
              src="/optimized/featured2.webp"
              alt={
                lang === "en"
                  ? "Regional supply chain operations"
                  : "زنجیره تامین منطقه‌ای فرادید اطلس"
              }
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              quality={82}
              className="object-cover"
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
              : "شبکه‌ای برای تأمین منظم، در دسترس و قابل اتکا"}
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
                : "فرادید اطلس در تهران، اصفهان، دبی و عمان دفتر دارد و با پشتیبانی عملیاتی و انباری در ایران، از جمله شهرکرد، مسیر تأمین را منظم‌تر و قابل اتکاتر می‌کند."}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {lang === "en"
                ? "This footprint helps the company manage procurement, storage, and distribution so top-grade food products can move continuously and on time across Iran."
                : "این گستره به شرکت کمک می‌کند فرایند تأمین، نگهداری و توزیع را با هماهنگی بیشتری مدیریت کند تا محصولات غذایی باکیفیت، به‌موقع و به‌صورت مستمر در اختیار بازار قرار بگیرند."}
            </p>

            <div
              className={`border-accent-warm-gold mt-8 ${
                isRTL ? "border-r-2 pr-8" : "border-l-2 pl-6"
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                {lang === "en"
                  ? "The goal is simple: keep high-quality essential food products available, fairly priced, and ready for the buyers who depend on them."
                  : "هدف روشن است: تأمین مواد غذایی اساسی با کیفیت قابل اعتماد، قیمت‌گذاری منطقی و آمادگی برای پاسخ‌گویی به خریدارانی که به عرضه منظم نیاز دارند."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
