import Image from "next/image";
import type { Language } from "@/lib/i18n";

interface BrandShowcaseProps {
  lang: Language;
}

export function BrandShowcase({ lang }: BrandShowcaseProps) {
  const alt =
    lang === "en"
      ? "Faradid Atlas, a leader in supplying food products, featuring the recognized brands Mizban, 21, Hayat, and Golbanoo."
      : "شرکت فرادید اطلس، پیشرو در عرضه محصولات غذایی، با نام‌های شناخته‌شده میزبان، ۲۱، حیات و گلبانو.";

  return (
    <section className="section relative overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-navy/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide">
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-background shadow-[0_40px_90px_-60px_rgba(12,18,24,0.5),0_16px_40px_-30px_rgba(12,18,24,0.2)]">
            <Image
              src="/brand-showcase/faradid-atlas-brands.jpg"
              alt={alt}
              width={1270}
              height={1239}
              loading="lazy"
              quality={88}
              sizes="(min-width: 768px) 48rem, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
