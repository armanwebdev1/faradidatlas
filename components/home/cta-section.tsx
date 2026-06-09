import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { CountUp } from "@/components/shared/count-up";

interface CTASectionProps {
  lang: Language;
}

export function CTASection({ lang }: CTASectionProps) {
  const isRTL = lang === "fa";

  return (
    <section className="section relative overflow-hidden bg-background-alt">
      <div className="relative container-wide">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="eyebrow text-accent">
            {lang === "en" ? "B2B Cooperation" : "همکاری B2B"}
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
                alt={lang === "en" ? "Food supply partnership" : "همکاری تامین مواد غذایی"}
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
                "تامین غذایی پایدارتر بسازید"
              )}
            </h2>

            <p className="text-responsive-body text-muted-foreground max-w-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-light">
              {lang === "en"
                ? "Share your product needs, destination, and volume. Our team will help shape a practical sourcing and distribution plan with clear next steps."
                : "نیاز محصول، مقصد و حجم مورد نظر را با ما در میان بگذارید تا تیم ما مسیر تامین و توزیع عملی با گام‌های روشن پیشنهاد کند."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href={`/${lang}/contact`}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {lang === "en" ? "Start an Inquiry" : "شروع درخواست"}
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

        <div className="relative pt-8 sm:pt-12 md:pt-16 border-t border-foreground/10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 sm:w-8 h-6 sm:h-8 border border-accent rounded-full flex items-center justify-center bg-background">
              <span className="text-xs sm:text-sm bg-gradient-to-r from-foreground to-accent-warm-copper bg-clip-text text-transparent font-bold">
                +
              </span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow text-foreground/60 mb-4 md:mb-6">
              {lang === "en" ? "Practical Commitments" : "تعهدات عملی"}
            </p>

            <p className="text-responsive-body text-muted-foreground font-light px-2 sm:px-0">
              {lang === "en"
                ? "We focus on measurable commitments: quality standards, rational pricing discipline, accessible supply channels, and long-term trust."
                : "تمرکز ما بر تعهدات قابل سنجش است: استانداردهای کیفیت، نظم منطقی در قیمت‌گذاری، کانال‌های در دسترس تامین و اعتماد بلندمدت."}
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-foreground/20 flex-wrap sm:flex-nowrap">
              <div className="text-center flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  <CountUp
                    target={4}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50">
                  {lang === "en" ? "Rice Brands" : "برند برنج"}
                </p>
              </div>

              <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-accent to-transparent" />

              <div className="text-center flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent-warm-copper bg-clip-text text-transparent">
                <CountUp
                    target={25}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50">
                  {lang === "en" ? "Listed Products" : "محصول مرجع"}
                </p>
              </div>

              <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-accent to-transparent" />

              <div className="text-center flex-1 sm:flex-none min-w-max">
                <div className="mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                <CountUp
                    target={2009}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  />
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50">
                  {lang === "en" ? "Established" : "سال آغاز"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
