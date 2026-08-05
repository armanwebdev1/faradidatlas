import Link from "next/link";
import NextImage from "next/image";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { getLocalized } from "@/lib/localized";

interface CTASectionProps {
  lang: Language;
  cta?: {
    headline?: any;
    description?: any;
    buttonText?: any;
    buttonUrl?: string | null;
    image?: any;
  };
  brandShowcase?: Array<{
    brandName?: any;
    logo?: any;
    description?: any;
    isActive?: boolean | null;
  }>;
}

function resolveMediaUrl(media: any): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (typeof media === 'object') return media.url ?? media.filename ?? undefined
  return undefined
}

function CtaFallbackImage({ alt, sizes, className }: { alt: string; sizes?: string; className?: string }) {
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

const defaultBrandLogos = [
  { name: "Hayat", src: "/brands/hayat-4k.webp", width: 147, height: 80 },
  { name: "Golbanoo", src: "/brands/golbanoo-4k.webp", width: 165, height: 80 },
  { name: "Twenty One", src: "/brands/twenty-one-4k.webp", width: 98, height: 80 },
  { name: "Mizban", src: "/brands/mizban-4k.webp", width: 205, height: 80 },
];

export function CTASection({ lang, cta, brandShowcase }: CTASectionProps) {
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";

  const ctaHeadline = getLocalized(cta?.headline, lang);
  const ctaDescription = getLocalized(cta?.description, lang);
  const ctaButtonText = getLocalized(cta?.buttonText, lang);
  const ctaButtonUrl = cta?.buttonUrl ?? `/${lang}/contact`;
  const ctaImageUrl = resolveMediaUrl(cta?.image);

  const brandLogos = brandShowcase?.length
    ? brandShowcase
        .filter((b: any) => b.isActive !== false)
        .map((b) => ({
          name: getLocalized(b.brandName, lang),
          src: resolveMediaUrl(b.logo) ?? '/brands/twenty-one-4k.webp',
          width: 160,
          height: 80,
        }))
    : defaultBrandLogos;

  const brandLogoLoop = [...brandLogos, ...brandLogos];

  return (
    <section className="section relative overflow-hidden bg-background-alt">
      <div className="relative container-wide">
        <div
          className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-12 lg:gap-16 xl:gap-20 mb-12 md:mb-20"
        >
          <div className="flex-1 lg:w-1/2 h-64 sm:h-80 md:h-96 lg:min-h-[26rem]">
            <div className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-xl md:shadow-2xl h-full">
              {ctaImageUrl ? (
                <NextImage
                  src={ctaImageUrl}
                  alt={t.pages.home.ctaImageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <CtaFallbackImage
                  alt={t.pages.home.ctaImageAlt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg sm:rounded-2xl" />
            </div>
          </div>

          <div
            className={`flex-1 lg:w-1/2 flex flex-col justify-center py-4 sm:py-6 lg:py-8 cta-mobile-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
          >
            <p className="eyebrow mb-7 text-brand-navy">
              {t.pages.home.ctaEyebrow}
            </p>
            <h2 className="text-responsive-title mb-4 sm:mb-6 md:mb-8">
              {ctaHeadline || (
                lang === "en" ? (
                  <>
                    Build a steadier{" "}
                    <span className="italic font-light">wholesale food supply</span> for your B2B operations
                  </>
                ) : (
                  t.pages.home.ctaTitle
                )
              )}
            </h2>

            <p className="text-responsive-body text-muted-foreground max-w-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-light">
              {ctaDescription || t.pages.home.ctaDescription}
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? "lg:justify-start" : "justify-center lg:justify-start"}`}>
              <Link
                href={ctaButtonUrl}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {ctaButtonText || t.pages.home.ctaStartInquiry}
              </Link>

              <Link
                href={`/${lang}/products`}
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                {t.pages.home.ctaViewProducts}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-foreground/10 pt-10 sm:pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 text-brand-navy">
              {t.pages.home.ctaBrandsEyebrow}
            </p>

            <h2 className="text-responsive-section text-foreground">
              {t.pages.home.ctaBrandsTitle}
            </h2>
          </div>

          <div className="relative mt-8 sm:mt-10 md:mt-12">
            <div
              className="brand-logo-viewport mx-auto max-w-3xl overflow-hidden py-8"
              dir="ltr"
            >
              <div
                className={`brand-logo-marquee flex w-max ${
                  isRTL ? "brand-logo-marquee-reverse" : ""
                }`}
              >
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 md:gap-20 md:pr-20"
                    aria-hidden={groupIndex === 1}
                  >
                    {brandLogoLoop.map((brand, brandIndex) => (
                      <div
                        key={`${groupIndex}-${brand.name}-${brandIndex}`}
                        className="group/brand shrink-0 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <NextImage
                          src={brand.src}
                          alt={
                            lang === "en"
                              ? `${brand.name} rice brand logo`
                              : `لوگوی برند برنج ${brand.name}`
                          }
                          width={brand.width}
                          height={brand.height}
                          loading="lazy"
                          sizes="200px"
                          className="h-14 w-auto object-contain drop-shadow-[0_10px_16px_rgba(30,35,39,0.10)] transition duration-300 group-hover/brand:scale-[1.04] group-hover/brand:drop-shadow-[0_0_18px_rgba(201,169,97,0.42)] sm:h-16 md:h-20"
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
