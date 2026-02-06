import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { products } from "@/components/products/product-data";
import { ProductGallery } from "@/components/products/product-gallery";
import type { Language } from "@/lib/i18n";
import Link from "next/link";

interface ProductDetailProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

export async function generateStaticParams() {
  const langs: Language[] = ["en", "fa"];
  const allParams = [];

  for (const lang of langs) {
    for (const product of products) {
      allParams.push({ lang, id: product.id.toString() });
    }
  }

  return allParams;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { lang, id } = await params;
  const product = products.find((p) => p.id === Number.parseInt(id));

  if (!product) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          <p>{lang === "en" ? "Product not found" : "محصول پیدا نشد"}</p>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const name = lang === "en" ? product.nameEn : product.nameFa;
  const description =
    lang === "en" ? product.descriptionEn : product.descriptionFa;
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container-wide px-4 sm:px-6 pt-6 sm:pt-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs sm:text-sm text-foreground/70 shadow-sm backdrop-blur">
            <Link
              href={`/${lang}`}
              className="line-accent transition-colors hover:text-primary"
            >
              {lang === "en" ? "Home" : "خانه"}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">
              •
            </span>
            <Link
              href={`/${lang}/products`}
              className="line-accent transition-colors hover:text-primary"
            >
              {lang === "en" ? "Products" : "محصولات"}
            </Link>
            <span className="text-foreground/30" aria-hidden="true">
              •
            </span>
            <span className="text-foreground font-medium line-clamp-1">
              {name}
            </span>
          </div>
        </nav>

        {/* Content - responsive grid */}
        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-background to-secondary/30">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
            {/* Gallery */}
            <ProductGallery images={gallery} alt={name} />

            {/* Info - responsive typography and spacing */}
            <div className="flex flex-col rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] backdrop-blur">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight font-hero leading-tight motion-safe:animate-fade-in-up"
                style={{ animationDelay: "0.05s" }}
              >
                {name}
              </h1>
              <p
                className="mt-4 text-sm sm:text-base text-foreground/70 leading-relaxed motion-safe:animate-fade-in-up"
                style={{ animationDelay: "0.12s" }}
              >
                {description}
              </p>

              {/* Key specs - responsive grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-6 mb-8 sm:mb-10 p-4 sm:p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Origin" : "منشأ"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {product.origin}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Grade" : "درجه"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {product.grade}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Shelf Life" : "مدت نگهداری"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {product.shelf_life}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Minimum Order" : "حداقل سفارش"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {product.minOrder}
                  </p>
                </div>
              </div>

              {/* Certifications - responsive */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
                  {lang === "en" ? "Certifications" : "تصدیق‌ها"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-warm-gold text-primary text-xs sm:text-sm font-semibold rounded-full shadow-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Packaging - responsive */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
                  {lang === "en" ? "Packaging Options" : "گزینه‌های بسته‌بندی"}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {product.packagingOptions.map((option) => (
                    <li
                      key={option}
                      className="flex items-center gap-3 text-foreground text-sm sm:text-base"
                    >
                      <span className="w-2 h-2 flex-shrink-0 bg-accent-warm-gold rounded-full" />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA - responsive stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={`/${lang}/contact?product=${product.id}`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-center text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  {lang === "en" ? "Request Quote" : "درخواست قیمت"}
                </Link>
                <Link
                  href={`/${lang}/products`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-primary/30 text-primary font-semibold rounded-full hover:bg-background transition-colors text-center text-sm sm:text-base"
                >
                  {lang === "en" ? "Back to Catalog" : "بازگشت به کاتالوگ"}
                </Link>
              </div>

              {/* Download spec sheet - responsive */}
              <button className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-foreground/20 text-foreground font-semibold rounded-full hover:bg-background transition-colors text-sm sm:text-base">
                {lang === "en"
                  ? "Download Spec Sheet (PDF)"
                  : "دانلود برگه مشخصات"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
