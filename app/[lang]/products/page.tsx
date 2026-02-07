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
        {/* Hero Section with Overlay Content */}
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/60">
          <Image
            src="https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1600&h=400&fit=crop"
            alt="Premium products showcase"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
                {/* Left - Heading */}
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-hero">
                    {lang === "en" ? "Our Products" : "محصولات ما"}
                  </h1>
                </div>

                {/* Right - Description */}
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                    {lang === "en"
                      ? "Discover our curated collection of premium products, all certified and ready for export"
                      : "مجموعه برگزیده‌شده‌ی محصولات برتر ما را کاوش کنید، همه آنها معتبر و آماده صادرات"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section with Sidebar */}
        <ProductsContent lang={lang} products={products} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
