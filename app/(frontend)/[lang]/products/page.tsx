import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductsContent } from "@/components/products/products-content";
import { getProducts } from "@/lib/fetch/products";
import {
  productBrands,
  productCategories,
  productTypes,
  type Product,
  type ProductBrand,
  type ProductCategory,
  type ProductType,
} from "@/components/products/product-data";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import { translations, type Language } from "@/lib/i18n";
import Image from "next/image";
import { Suspense } from "react";
import { draftMode } from "next/headers";

export const revalidate = 300;

type ProductSearchParams = {
  q?: string | string[];
  category?: string | string[];
  brand?: string | string[];
  type?: string | string[];
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }, { lang: "ar" }];
}

interface ProductsPageProps {
  params: Promise<{
    lang: Language;
  }>;
  searchParams?: Promise<ProductSearchParams>;
}

export async function generateMetadata({ params }: ProductsPageProps) {
  const { lang } = await params;

  return buildPageMetadata({
    lang,
    path: "products",
    titleEn:
      "Wholesale Food Products — Rice, Legumes, Nuts, Spices | Faradid Atlas",
    titleFa: "محصولات غذایی عمده؛ برنج، حبوبات، آجیل، ادویه | فرادید اطلس",
    titleAr: "منتجات غذائية بالجملة — أرز، بقول، مكسرات، بهارات | فراديد أطلس",
    descriptionEn:
      "Browse Faradid Atlas wholesale food products: branded basmati rice, legumes, seeds, nuts, spices, and sugar for B2B buyers across Iran, UAE, and Oman.",
    descriptionFa:
      "سبد محصولات غذایی عمده فرادید اطلس را ببینید؛ برنج باسماتی برنددار، حبوبات، آجیل و خشکبار، ادویه و شکر برای خریداران B2B در ایران، امارات و عمان.",
    descriptionAr:
      "تصفح منتجات فراديد أطلس الغذائية بالجملة: أرز بسمتي بตรา تجاري، بقول، بذور، مكسرات، بهارات وسكر لمشتريات B2B عبر إيران والإمارات وعمان.",
  });
}

async function ProductGridSection({
  lang,
  searchQuery,
  initialCategory,
  initialBrand,
  initialType,
}: {
  lang: Language;
  searchQuery: string;
  initialCategory: ProductCategory | null;
  initialBrand: ProductBrand | null;
  initialType: ProductType | null;
}) {
  let products: Product[] = [];
  const draft = (await draftMode()).isEnabled;
  try {
    products = await getProducts(lang, draft);
  } catch (err) {
    console.error("[Products] list query failed:", err);
  }
  const t = translations[lang];
  const pageUrl = absoluteUrl(localizedPath(lang, "products"));
  const pageDescription =
    lang === "en"
      ? "Browse Faradid Atlas food products, including branded rice, legumes, seeds, nuts, spices, and sugar for wholesale and B2B supply needs."
      : lang === "fa"
        ? "سبد محصولات فرادید اطلس را ببینید؛ از برنج‌های برنددار و حبوبات تا آجیل، خشکبار، ادویه‌جات، و شکر برای نیازهای عمده و سازمانی."
        : "تصفّح منتجات فراديد أطلس الغذائية، بما في ذلك الأرز والبقوليات والبذور والمكسرات والتوابل والسكر لتوريد بالجملة واحتياجات B2B.";

  return (
    <>
      <ProductsContent
        lang={lang}
        t={t}
        products={products}
        initialQuery={searchQuery}
        initialCategory={initialCategory}
        initialBrand={initialBrand}
        initialType={initialType}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name:
                lang === "en"
                  ? "Faradid Atlas Products"
                  : lang === "fa"
                    ? "محصولات فرادید اطلس"
                    : "منتجات فراديد أطلس",
              description: pageDescription,
              inLanguage: lang,
              mainEntity: {
                "@id": `${pageUrl}#products`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${pageUrl}#products`,
              name:
                lang === "en"
                  ? "Faradid Atlas Products"
                  : lang === "fa"
                    ? "محصولات فرادید اطلس"
                    : "منتجات فراديد أطلس",
              description: pageDescription,
              inLanguage: lang,
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(
                  localizedPath(lang, `products/${product.slug}`),
                ),
                name:
                  lang === "en"
                    ? product.nameEn
                    : lang === "fa"
                      ? product.nameFa
                      : product.nameAr,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.breadcrumbs.home,
                  item: absoluteUrl(localizedPath(lang)),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.breadcrumbs.products,
                  item: pageUrl,
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

function ProductGridSkeleton() {
  return (
    <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="h-3 w-16 bg-foreground/10 rounded animate-pulse" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-foreground/5 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="h-3 w-32 bg-foreground/10 rounded animate-pulse mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-border"
                >
                  <div className="aspect-square bg-secondary/40 animate-pulse" />
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="h-2 w-16 bg-foreground/8 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-foreground/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = searchParams
    ? await searchParams
    : ({} as ProductSearchParams);
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const rawSearchQuery = resolvedSearchParams.q;
  const rawCategory = resolvedSearchParams.category;
  const rawBrand = resolvedSearchParams.brand;
  const rawType = resolvedSearchParams.type;
  const searchQuery = Array.isArray(rawSearchQuery)
    ? (rawSearchQuery[0] ?? "")
    : (rawSearchQuery ?? "");
  const category = Array.isArray(rawCategory)
    ? (rawCategory[0] ?? "")
    : (rawCategory ?? "");
  const brand = Array.isArray(rawBrand)
    ? (rawBrand[0] ?? "")
    : (rawBrand ?? "");
  const type = Array.isArray(rawType) ? (rawType[0] ?? "") : (rawType ?? "");
  const initialCategory = productCategories.includes(
    category as ProductCategory,
  )
    ? (category as ProductCategory)
    : null;
  const initialBrand = productBrands.includes(brand as ProductBrand)
    ? (brand as ProductBrand)
    : null;
  const initialType = productTypes.includes(type as ProductType)
    ? (type as ProductType)
    : null;

  return (
    <div lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main id="main-content">
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-linear-to-br from-secondary/40 to-secondary/60">
          <Image
            src="/optimized/products-hero.webp"
            alt={
              lang === "en"
                ? "Food product portfolio"
                : lang === "fa"
                  ? "سبد محصولات غذایی فرادید اطلس"
                  : "مجموعة منتجات فراديد أطلس الغذائية"
            }
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/55 to-black/10" />

          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
                <div className="flex-1">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-hero"
                    style={{
                      fontFamily:
                        lang === "fa"
                          ? "Estedad, var(--font-hero)"
                          : "var(--font-hero)",
                    }}
                  >
                    {t.pages.products.title}
                  </h1>
                </div>

                <div className="flex-1">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                    {t.pages.products.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGridSection
            lang={lang}
            searchQuery={searchQuery}
            initialCategory={initialCategory}
            initialBrand={initialBrand}
            initialType={initialType}
          />
        </Suspense>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
