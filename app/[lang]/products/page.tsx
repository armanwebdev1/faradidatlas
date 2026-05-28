import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductsContent } from "@/components/products/products-content";
import { products } from "@/components/products/product-data";
import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface ProductsPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lang } = await params;
  const isRTL = lang === "fa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/60">
          <Image
            src="/featured1.jpg"
            alt={lang === "en" ? "Food product portfolio" : "سبد محصولات غذایی"}
            fill
            sizes="100vw"
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
                    {lang === "en" ? "Our Products" : "محصولات ما"}
                  </h1>
                </div>

                <div className="flex-1">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                    {lang === "en"
                      ? "Explore essential food products sourced, imported, and distributed through reliable B2B supply channels."
                      : "محصولات غذایی اساسی را ببینید که از طریق کانال‌های مطمئن B2B تامین، وارد و توزیع می‌شوند."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductsContent lang={lang} products={products} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
