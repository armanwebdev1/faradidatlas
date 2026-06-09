import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { categoryLabels, products } from "@/components/products/product-data";
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
  const product = products.find((item) => item.id === Number.parseInt(id));

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
  const alias = lang === "en" ? product.aliasEn : product.aliasFa;
  const description =
    lang === "en" ? product.descriptionEn : product.descriptionFa;
  const category =
    lang === "en"
      ? categoryLabels[product.category].en
      : categoryLabels[product.category].fa;
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
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
            <span
              className="h-1.5 w-1.5 rounded-full bg-foreground/30"
              aria-hidden="true"
            />
            <Link
              href={`/${lang}/products`}
              className="line-accent transition-colors hover:text-primary"
            >
              {lang === "en" ? "Products" : "محصولات"}
            </Link>
            <span
              className="h-1.5 w-1.5 rounded-full bg-foreground/30"
              aria-hidden="true"
            />
            <span className="text-foreground font-medium line-clamp-1">
              {name}
            </span>
          </div>
        </nav>

        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-background to-secondary/30">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
            <ProductGallery images={gallery} alt={name} />

            <div className="flex flex-col rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] backdrop-blur">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight font-hero leading-tight motion-safe:animate-fade-in-up"
                style={{
                  animationDelay: "0.05s",
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                }}
              >
                {name}
              </h1>
              {alias && (
                <p
                  className="mt-3 text-sm sm:text-base font-medium text-accent-warm-gold motion-safe:animate-fade-in-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  {alias}
                </p>
              )}
              <p
                className="mt-4 text-sm sm:text-base text-foreground/70 leading-relaxed motion-safe:animate-fade-in-up"
                style={{ animationDelay: "0.12s" }}
              >
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-6 mb-8 sm:mb-10 p-4 sm:p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Category" : "دسته‌بندی"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Portfolio" : "سبد محصول"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {lang === "en" ? "Essential foods" : "مواد غذایی اساسی"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Supply Role" : "نقش در تامین"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {lang === "en"
                      ? "Import & distribution"
                      : "واردات و توزیع"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Inquiry" : "درخواست"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    {lang === "en" ? "B2B coordination" : "هماهنگی B2B"}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
                  {lang === "en" ? "How Faradid Atlas Supplies It" : "نحوه تامین توسط فرادید اطلس"}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {lang === "en"
                    ? "This product is part of the DOCX-defined Faradid Atlas portfolio of essential foods. The team reviews product needs, destination, volume, and timing before proposing practical next steps."
                    : "این محصول بخشی از سبد مواد غذایی اساسی فرادید اطلس طبق محتوای مرجع است. تیم ما محصول مورد نیاز، مقصد، حجم و زمان‌بندی را بررسی می‌کند و سپس گام‌های عملی بعدی را پیشنهاد می‌دهد."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={`/${lang}/contact?product=${product.id}`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-center text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  {lang === "en" ? "Start an Inquiry" : "شروع درخواست"}
                </Link>
                <Link
                  href={`/${lang}/products`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-primary/30 text-primary font-semibold rounded-full hover:bg-background transition-colors text-center text-sm sm:text-base"
                >
                  {lang === "en" ? "Back to Catalog" : "بازگشت به کاتالوگ"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
