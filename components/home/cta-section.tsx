import Link from "next/link";
import NextImage from "next/image";
import type { Language } from "@/lib/i18n";

interface CTASectionProps {
  lang: Language;
}

interface StaticCtaImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

function Image({ alt, sizes, className }: StaticCtaImageProps) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/cta/partnership-640.avif 640w, /cta/partnership-1280.avif 1280w"
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet="/cta/partnership-640.webp 640w, /cta/partnership-1280.webp 1280w"
        sizes={sizes}
      />
      <img
        src="/cta/partnership-640.webp"
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

const brandLogos = [
  { name: "Hayat", src: "/brands/hayat-4k.png", width: 1194, height: 650 },
  {
    name: "Golbanoo",
    src: "/brands/golbanoo-4k.png",
    width: 1146,
    height: 556,
  },
  {
    name: "Twenty One",
    src: "/brands/twenty-one-4k.png",
    width: 1116,
    height: 912,
  },
  { name: "Mizban", src: "/brands/mizban-4k.png", width: 1235, height: 482 },
];

const brandLogoLoop = [...brandLogos, ...brandLogos];

export function CTASection({ lang }: CTASectionProps) {
  const isRTL = lang === "fa";

  return (
    <section className="section relative overflow-hidden bg-background-alt">
      <div className="relative container-wide">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="eyebrow text-accent">
            {lang === "en" ? "B2B Cooperation" : "همکاری تجاری و سازمانی"}
          </p>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-stretch gap-6 md:gap-12 lg:gap-16 xl:gap-20 mb-12 md:mb-20 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 lg:w-1/2 h-64 sm:h-80 md:h-96 lg:min-h-[26rem]">
            <div className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-xl md:shadow-2xl h-full">
              <Image
                src="/cta.jpg"
                alt={
                  lang === "en"
                    ? "Food supply partnership"
                    : "همکاری در تامین مواد غذایی"
                }
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg sm:rounded-2xl" />
            </div>
          </div>

          <div
            className={`flex-1 lg:w-1/2 flex flex-col justify-center py-4 sm:py-6 lg:py-8 text-center ${
              isRTL ? "lg:text-right" : "lg:text-left"
            }`}
          >
            <h2 className="text-responsive-title mb-4 sm:mb-6 md:mb-8">
              {lang === "en" ? (
                <>
                  Build a steadier{" "}
                  <span className="italic font-light">food supply</span>
                </>
              ) : (
                "مسیر مطمئن‌تری برای تأمین مواد غذایی بسازید"
              )}
            </h2>

            <p className="text-responsive-body text-muted-foreground max-w-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-light">
              {lang === "en"
                ? "Share your product needs, destination, and volume. Our team will help shape a practical sourcing and distribution plan with clear next steps."
                : "نوع محصول، مقصد و حجم موردنیازتان را با ما در میان بگذارید تا تیم فرادید اطلس، مسیر مناسب تأمین و توزیع را بررسی کرده و مراحل بعدی همکاری را روشن کند."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href={`/${lang}/contact`}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {lang === "en" ? "Start an Inquiry" : "ثبت درخواست همکاری"}
              </Link>

              <Link
                href={`/${lang}/products`}
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                {lang === "en" ? "View Products" : "مشاهده محصولات"}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-foreground/10 pt-10 sm:pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 text-accent">
              {lang === "en" ? "Our Brands" : "برندهای ما"}
            </p>

            <h2 className="text-responsive-section text-foreground">
              {lang === "en"
                ? "Recognized names in our rice portfolio"
                : "نام‌های شناخته‌شده در سبد برنج ما"}
            </h2>
          </div>

          <div className="relative mt-8 sm:mt-10 md:mt-12">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-14 bg-gradient-to-r from-background-alt to-transparent sm:w-24 md:w-32" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-14 bg-gradient-to-l from-background-alt to-transparent sm:w-24 md:w-32" />

            <div className="overflow-hidden py-4" dir="ltr">
              <div
                className={`brand-logo-marquee flex w-max ${
                  isRTL ? "brand-logo-marquee-reverse" : ""
                }`}
              >
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10 md:gap-12 md:pr-12"
                    aria-hidden={groupIndex === 1}
                  >
                    {brandLogoLoop.map((brand, brandIndex) => (
                      <div
                        key={`${groupIndex}-${brand.name}-${brandIndex}`}
                        className="group/brand flex h-24 w-44 shrink-0 items-center justify-center px-1 transition-transform duration-500 hover:-translate-y-1 sm:h-28 sm:w-56 md:h-32 md:w-64 lg:h-36 lg:w-72"
                      >
                        <NextImage
                          src={brand.src}
                          alt={brand.name}
                          width={brand.width}
                          height={brand.height}
                          sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 224px, 176px"
                          loading="lazy"
                          className="h-full w-full object-contain drop-shadow-[0_14px_22px_rgba(30,35,39,0.12)] transition duration-500 group-hover/brand:scale-[1.05] group-hover/brand:drop-shadow-[0_0_28px_rgba(201,169,97,0.58)]"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
