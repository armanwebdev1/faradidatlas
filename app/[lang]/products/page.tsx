import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductsContent } from "@/components/products/products-content";
import { products } from "@/components/products/product-data";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import Image from "next/image";

type ProductSearchParams = {
  q?: string | string[];
};

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
    titleEn: "Products | Faradid Atlas",
    titleFa: "محصولات | فرادید اطلس",
    descriptionEn:
      "Explore Faradid Atlas' DOCX-defined portfolio of rice, legumes, seeds, nuts, spices, and sugar.",
    descriptionFa:
      "با سبد محصولات فرادید اطلس آشنا شوید؛ از برنج، حبوبات و دانه‌ها تا مغزها، ادویه‌ها، شکر و دیگر مواد غذایی اساسی.",
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const emptySearchParams: ProductSearchParams = {};
  const [{ lang }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams ?? Promise.resolve(emptySearchParams),
  ]);
  const isRTL = lang === "fa";
  const rawSearchQuery = resolvedSearchParams.q;
  const searchQuery = Array.isArray(rawSearchQuery)
    ? (rawSearchQuery[0] ?? "")
    : (rawSearchQuery ?? "");

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/60">
          <Image
            src="/products-hero.png"
            alt={
              lang === "en"
                ? "Food product portfolio"
                : "سبد محصولات غذایی فرادید اطلس"
            }
            fill
            sizes="100vw"
            quality={82}
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/10" />

          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
                <div className="flex-1">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-hero"
                    style={{
                      fontFamily: isRTL
                        ? "Estedad, var(--font-hero)"
                        : "var(--font-hero)",
                    }}
                  >
                    {lang === "en" ? "Our Products" : "محصولات فرادید اطلس"}
                  </h1>
                </div>

                <div className="flex-1">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                    {lang === "en"
                      ? "Explore essential food products sourced, imported, and distributed through reliable B2B supply channels."
                      : "با مجموعه‌ای از مواد غذایی اساسی آشنا شوید که با تمرکز بر کیفیت قابل اعتماد، تأمین پایدار و توزیع منظم انتخاب، وارد و عرضه می‌شوند."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductsContent
          lang={lang}
          products={products}
          initialQuery={searchQuery}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name:
                lang === "en"
                  ? "Faradid Atlas Products"
                  : "محصولات فرادید اطلس",
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(localizedPath(lang, `products/${product.id}`)),
                name: lang === "en" ? product.nameEn : product.nameFa,
              })),
            }),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
