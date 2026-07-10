import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getProductBySlug, getRelatedProducts, getCategories } from "@/lib/fetch/products";
import {
  CategoryLanding,
  categorySEOContent,
} from "@/components/products/category-landing";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPlaceholder } from "@/components/products/product-placeholder";
import { ProductSpecs } from "@/components/products/product-specs";
import { RelatedProducts } from "@/components/products/related-products";
import { buildPageMetadata } from "@/lib/metadata";
import { absoluteUrl, localizedPath } from "@/lib/site";
import { getPayloadClient } from "@/lib/payload";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { permanentRedirect } from "next/navigation";
import Link from "next/link";

export const revalidate = 300

interface ProductDetailProps {
  params: Promise<{
    lang: Language;
    slug: string;
  }>;
}

const validCategorySlugs = new Set(["rice", "legumes", "seeds", "nuts", "spices", "sugar"]);

function isCategorySlug(slug: string): boolean {
  return validCategorySlugs.has(slug);
}

function isNumericProductParam(value: string) {
  return /^[0-9]+$/.test(value);
}

export async function generateStaticParams() {
  const t = Date.now()
  const langs: Language[] = ["en", "fa", "ar"];
  const allParams: { lang: string; slug: string }[] = [];

  const payload = await getPayloadClient();
  const [productsResult, categoriesResult] = await Promise.all([
    payload.find({ collection: "products", limit: 100 }),
    payload.find({ collection: "categories", limit: 100 }),
  ]);

  for (const lang of langs) {
    for (const cat of categoriesResult.docs) {
      allParams.push({ lang, slug: cat.slug });
    }
    for (const product of productsResult.docs) {
      allParams.push({ lang, slug: product.slug });
    }
  }

  console.log(`[Products] static params generated ${allParams.length} entries in ${Date.now() - t}ms`)
  return allParams;
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const t = Date.now()
  const { lang, slug } = await params;

  if (isCategorySlug(slug)) {
    const seo = categorySEOContent[slug as keyof typeof categorySEOContent];
    const catLabels: Record<string, { en: string; fa: string; ar: string }> = {
      rice: { en: "Rice", fa: "برنج", ar: "أرز" },
      legumes: { en: "Legumes & Pulses", fa: "حبوبات", ar: "بقوليات" },
      seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
      nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
      spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها", ar: "توابل وبهارات" },
      sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر ومحليات" },
    };
    const catLabel = catLabels[slug] ?? catLabels.rice;
    return buildPageMetadata({
      lang,
      path: `products/${slug}`,
      titleEn: `${catLabel.en} — Wholesale ${catLabel.en} Supplier | Faradid Atlas`,
      titleFa: `${catLabel.fa} — تأمین عمده ${catLabel.fa} | فرادید اطلس`,
      titleAr: `${catLabel.ar} — مورّد ${catLabel.ar} بالجملة | فراديد أطلس`,
      descriptionEn: seo.content.en.slice(0, 160),
      descriptionFa: seo.content.fa.slice(0, 160),
      descriptionAr: seo.content.ar.slice(0, 160),
    });
  }

  const product = await getProductBySlug(slug, lang);

  if (!product) {
    return buildPageMetadata({
      lang,
      path: "products",
      titleEn: "Product Not Found | Faradid Atlas",
      titleFa: "محصول پیدا نشد | فرادید اطلس",
      titleAr: "لم يتم العثور على المنتج | فراديد أطلس",
      descriptionEn: "Product not found",
      descriptionFa: "محصول پیدا نشد",
      descriptionAr: "لم يتم العثور على المنتج",
    });
  }

  console.log(`[Products] metadata generated in ${Date.now() - t}ms`)
  return buildPageMetadata({
    lang,
    path: `products/${product.slug}`,
    titleEn: `${product.nameEn} | Faradid Atlas Products`,
    titleFa: `${product.nameFa} | محصولات فرادید اطلس`,
    titleAr: `${product.nameAr} | منتجات فراديد أطلس`,
    descriptionEn: product.descriptionEn,
    descriptionFa: product.descriptionFa,
    descriptionAr: product.descriptionAr,
    image: product.image,
  });
}

const categoryLabelsLocal: Record<string, { en: string; fa: string; ar: string }> = {
  rice: { en: "Rice", fa: "برنج", ar: "أرز" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات", ar: "بقوليات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
  nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها", ar: "توابل وبهارات" },
  sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر ومحليات" },
};

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const t_page = Date.now()
  const { lang, slug } = await params;
  const t = translations[lang];

  if (isCategorySlug(slug)) {
    return (
      <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
        <Header lang={lang} />
        <main>
          <CategoryLanding category={slug as any} lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    );
  }

  let product;
  let dbError = false;
  try {
    product = await getProductBySlug(slug, lang);
  } catch (err) {
    dbError = true;
    console.error(`[Products] database error for slug="${slug}":`, err);
  }

  if (product && isNumericProductParam(slug)) {
    permanentRedirect(localizedPath(lang, `products/${product.slug}`));
  }

  if (!product) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          {dbError ? (
            <>
              <p className="text-lg font-semibold text-red-600 mb-2">Something went wrong</p>
              <p className="text-sm text-muted-foreground">Please try again later.</p>
            </>
          ) : (
            <p>{t.pages.products.productNotFound}</p>
          )}
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const name = lang === "en" ? product.nameEn : lang === "fa" ? product.nameFa : product.nameAr;
  const alias = lang === "en" ? product.aliasEn : lang === "fa" ? product.aliasFa : product.aliasAr;
  const description = lang === "en" ? product.descriptionEn : lang === "fa" ? product.descriptionFa : product.descriptionAr;
  const catLabel = categoryLabelsLocal[product.category] ?? categoryLabelsLocal.rice;
  const category = catLabel[lang as keyof typeof catLabel] ?? catLabel.en;
  const gallery = (product.images && product.images.length > 0) ? product.images : product.image ? [product.image] : [];
  const productUrl = absoluteUrl(localizedPath(lang, `products/${product.slug}`));

  let categories: any[] = [];
  let relatedProducts: any[] = [];
  try {
    [categories, relatedProducts] = await Promise.all([
      getCategories(lang),
      getRelatedProducts(product.category, product.id, lang),
    ]);
  } catch (err) {
    console.error(`[Products] related data fetch failed:`, err);
    // Related data is non-critical — page still renders with product info
  }
  const otherCategories = categories.filter((c: any) => c.slug !== product.category);

  console.log(`[Products] detail page rendered in ${Date.now() - t_page}ms`)

  return (
    <div lang={lang} dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <nav
          aria-label="Breadcrumb"
          className="container-wide px-4 sm:px-6 pt-6 sm:pt-8"
        >
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs sm:text-sm text-foreground/70 shadow-sm backdrop-blur">
            <Link
              href={`/${lang}`}
              className="line-accent transition-colors hover:text-primary"
            >
              {t.breadcrumbs.home}
            </Link>
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
            <Link
              href={`/${lang}/products`}
              className="line-accent transition-colors hover:text-primary"
            >
              {t.breadcrumbs.products}
            </Link>
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
            <Link
              href={`/${lang}/products/${product.category}`}
              className="line-accent transition-colors hover:text-primary"
            >
              {category}
            </Link>
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
            <span className="text-foreground font-medium line-clamp-1">{name}</span>
          </div>
        </nav>

        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-background to-secondary/30">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
            {gallery.length > 0 ? (
              <ProductGallery images={gallery} alt={name} lang={lang} />
            ) : (
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-h-[520px] lg:max-h-[560px] bg-white/80 rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_30px_80px_-60px_rgba(15,15,15,0.45)]">
                <ProductPlaceholder product={product as any} lang={lang} variant="detail" />
              </div>
            )}

            <div className="flex flex-col rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] backdrop-blur">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight font-hero leading-tight motion-safe:animate-fade-in-up"
                style={{
                  animationDelay: "0.05s",
                  fontFamily: lang === "en" ? "var(--font-hero)" : "Estedad, var(--font-hero)",
                }}
              >
                {name}
              </h1>
              {alias && (
                <p className="mt-3 text-sm sm:text-base font-medium text-accent-warm-gold motion-safe:animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  {alias}
                </p>
              )}
              <p className="mt-4 text-sm sm:text-base text-foreground/70 leading-relaxed motion-safe:animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-6 mb-8 sm:mb-10 p-4 sm:p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">{t.pages.products.category}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">{t.pages.products.portfolio}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{t.pages.products.portfolioValue}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">{t.pages.products.supplyRole}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{t.pages.products.supplyRoleValue}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">{t.pages.products.inquiry}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{t.pages.products.inquiryValue}</p>
                </div>
              </div>

              {product.specs && product.specs.length > 0 && (
                <ProductSpecs lang={lang} specs={product.specs} />
              )}

              <div className="mb-8">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">{t.pages.products.howWeSupply}</h2>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{t.pages.products.howWeSupplyDescription}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">{t.pages.products.relatedCategories}</h2>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4">{t.pages.products.relatedCategoriesDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {otherCategories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/${lang}/products/${cat.slug}`}
                      className="px-3 py-1.5 text-xs sm:text-sm font-medium text-primary border border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
                    >
                      {(cat.name as any)?.[lang] ?? (cat.name as any)?.en ?? cat.slug}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={`/${lang}/contact?product=${product.slug}#contact-form`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-center text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  {t.pages.products.startInquiry}
                </Link>
                <Link
                  href={`/${lang}/products`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-primary/30 text-primary font-semibold rounded-full hover:bg-background transition-colors text-center text-sm sm:text-base"
                >
                  {t.pages.products.backToCatalog}
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-7xl mx-auto">
            <RelatedProducts lang={lang} currentProduct={product as any} allProducts={relatedProducts as any[]} />
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "@id": `${productUrl}#product`,
                name,
                description,
                category,
                sku: product.slug,
                ...(product.image ? { image: absoluteUrl(product.image) } : {}),
                inLanguage: lang,
                mainEntityOfPage: productUrl,
                url: productUrl,
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: t.breadcrumbs.home, item: absoluteUrl(localizedPath(lang)) },
                  { "@type": "ListItem", position: 2, name: t.breadcrumbs.products, item: absoluteUrl(localizedPath(lang, "products")) },
                  { "@type": "ListItem", position: 3, name: category, item: absoluteUrl(localizedPath(lang, `products/${product.category}`)) },
                  { "@type": "ListItem", position: 4, name, item: productUrl },
                ],
              },
            ]),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
