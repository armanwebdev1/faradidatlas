import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
  companyInfo?: any;
}

function getLocalized(value: any, lang: Language): string {
  if (!value) return ""
  if (typeof value === "string") return value
  if (typeof value === "object" && value[lang]) return value[lang]
  if (typeof value === "object" && value.en) return value.en
  return ""
}

function resolveMediaUrl(media: any): string {
  if (!media) return "/optimized/featured2.webp"
  if (typeof media === "string") return media
  if (typeof media === "object") return media.url ?? media.filename ?? "/optimized/featured2.webp"
  return "/optimized/featured2.webp"
}

export function GetConnected({ lang, companyInfo }: GetConnectedProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const gc = companyInfo?.getConnected;

  const imageSrc = resolveMediaUrl(gc?.image);
  const altText = getLocalized(gc?.alt, lang) || (
    lang === "en"
      ? "Regional supply chain operations"
      : "زنجیره تامین منطقه‌ای فرادید اطلس"
  );
  const heading = getLocalized(gc?.heading, lang) || (
    lang === "en"
      ? "A supply network shaped by access and accountability"
      : "شبکه‌ای برای تأمین منظم، در دسترس و قابل اتکا"
  );
  const paragraph1 = getLocalized(gc?.paragraph1, lang) || (
    lang === "en"
      ? "Our company offices are listed in Tehran, Isfahan, Dubai, and Oman, with operational and storage support in Iran including Shahrekord."
      : "فرادید اطلس در تهران، اصفهان، دبی و عمان دفتر دارد و با پشتیبانی عملیاتی و انباری در ایران، از جمله شهرکرد، مسیر تأمین را منظم‌تر و قابل اتکاتر می‌کند."
  );
  const paragraph2 = getLocalized(gc?.paragraph2, lang) || (
    lang === "en"
      ? "This footprint helps the company manage procurement, storage, and distribution so top-grade food products can move continuously and on time across Iran."
      : "این گستره به شرکت کمک می‌کند فرایند تأمین، نگهداری و توزیع را با هماهنگی بیشتری مدیریت کند تا محصولات غذایی باکیفیت، به‌موقع و به‌صورت مستمر در اختیار بازار قرار بگیرند."
  );
  const quote = getLocalized(gc?.quote, lang) || (
    lang === "en"
      ? "The goal is simple: keep high-quality essential food products available, fairly priced, and ready for the buyers who depend on them."
      : "هدف روشن است: تأمین مواد غذایی اساسی با کیفیت قابل اعتماد، قیمت‌گذاری منطقی و آمادگی برای پاسخ‌گویی به خریدارانی که به عرضه منظم نیاز دارند."
  );

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={imageSrc}
              alt={altText}
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
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
            {heading}
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
              {paragraph1}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {paragraph2}
            </p>

            <div
              className={`border-accent-warm-gold mt-8 ${
                isRTL ? "border-r-2 pr-8" : "border-l-2 pl-6"
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                {quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
