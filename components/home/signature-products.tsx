import Link from "next/link";
import type { Language } from "@/lib/i18n";

type LocalizedText = {
  en: string;
  fa: string;
};

interface OptimizedProductImage {
  avif: string;
  webp: string;
  fallback: string;
}

interface Product {
  id: number;
  name: LocalizedText;
  category: LocalizedText;
  image: OptimizedProductImage;
  description: LocalizedText;
}

interface SignatureProductsProps {
  lang: Language;
}

const productImageWidths = [640, 1280] as const;

function productImage(id: string): OptimizedProductImage {
  return {
    avif: productImageWidths
      .map((width) => `/signature-products/${id}-${width}.avif ${width}w`)
      .join(", "),
    webp: productImageWidths
      .map((width) => `/signature-products/${id}-${width}.webp ${width}w`)
      .join(", "),
    fallback: `/signature-products/${id}-640.webp`,
  };
}

const products: Product[] = [
  {
    id: 1,
    name: { en: "21 Rice Brand", fa: "برند برنج ۲۱" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("twenty-one"),
    description: {
      en: "One of Faradid Atlas' recognized rice brands, built around dependable quality and everyday availability.",
      fa: "یکی از برندهای شناخته شده برنج فرادید اطلس با تمرکز بر کیفیت قابل اتکا و دسترسی روزمره.",
    },
  },
  {
    id: 2,
    name: { en: "Mizban Rice", fa: "برنج میزبان" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("mizban"),
    description: {
      en: "A trusted rice line designed for households, retailers, and foodservice partners.",
      fa: "برندی قابل اعتماد برای خانواده ها، فروشگاه ها و شرکای خدمات غذایی.",
    },
  },
  {
    id: 3,
    name: { en: "Hayat Rice", fa: "برنج حیات" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("hayat"),
    description: {
      en: "Selected for consistent cooking quality, clear sourcing, and steady market supply.",
      fa: "انتخاب شده برای کیفیت پخت یکنواخت، تامین شفاف و عرضه پایدار در بازار.",
    },
  },
  {
    id: 4,
    name: { en: "Golbanou Rice", fa: "برنج گل بانو" },
    category: { en: "Rice Portfolio", fa: "سبد برنج" },
    image: productImage("golbanoo"),
    description: {
      en: "A familiar rice brand serving demand across Iran and the wider Middle East region.",
      fa: "برندی آشنا در بازار برنج برای پاسخ گویی به تقاضا در ایران و منطقه خاورمیانه.",
    },
  },
  {
    id: 5,
    name: { en: "Essential Food Staples", fa: "مواد غذایی اساسی" },
    category: { en: "Core Products", fa: "محصولات اصلی" },
    image: productImage("red-lentil"),
    description: {
      en: "Legumes, spices, nuts, seeds, sugar, and other essentials selected for dependable B2B supply.",
      fa: "حبوبات، ادویه جات، آجیل، دانه ها، شکر و سایر اقلام اساسی برای تامین B2B قابل اتکا.",
    },
  },
];

export function SignatureProducts({ lang }: SignatureProductsProps) {
  const t = (value: LocalizedText) => value[lang];

  return (
    <section
      id="products"
      className="section relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
    >
      <div className="relative z-10 container-wide">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Recognized Portfolio" : "سبد محصولات معتبر"}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8">
            {lang === "en"
              ? "Brands and Core Products"
              : "برندها و محصولات اصلی"}
          </h2>
          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto mb-8">
            {lang === "en"
              ? "From rice brands to essential staples, our portfolio is shaped around reliable supply and consistent quality."
              : "از برندهای برنج تا اقلام غذایی اساسی، سبد ما بر پایه تامین پایدار و کیفیت یکنواخت شکل گرفته است."}
          </p>

          <Link href={`/${lang}/products`} className="btn btn-outline btn-md">
            {lang === "en" ? "Explore All Products" : "مشاهده همه محصولات"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/products`}
              className="group overflow-hidden rounded-lg border border-border/40 bg-surface shadow-xs transition-colors hover:border-accent/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={product.image.avif}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={product.image.webp}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <img
                    src={product.image.fallback}
                    alt={t(product.name)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/45" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {t(product.category)}
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {t(product.name)}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-foreground/65">
                  {t(product.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
