import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { products } from "@/components/products/product-data"
import type { Language } from "@/lib/i18n"
import Link from "next/link"

interface ProductDetailProps {
  params: Promise<{
    lang: Language
    id: string
  }>
}

export async function generateStaticParams() {
  const langs: Language[] = ["en", "fa"]
  const allParams = []

  for (const lang of langs) {
    for (const product of products) {
      allParams.push({ lang, id: product.id.toString() })
    }
  }

  return allParams
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { lang, id } = await params
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div>
        <Header lang={lang} />
        <div className="text-center py-16">
          <p>{lang === "en" ? "Product not found" : "محصول پیدا نشد"}</p>
        </div>
        <Footer lang={lang} />
      </div>
    )
  }

  const name = lang === "en" ? product.nameEn : product.nameFa
  const description = lang === "en" ? product.descriptionEn : product.descriptionFa

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Breadcrumb - responsive */}
        <nav className="container-wide px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-neutral">
          <Link href={`/${lang}`} className="hover:text-primary">
            {lang === "en" ? "Home" : "خانه"}
          </Link>
          {" / "}
          <Link href={`/${lang}/products`} className="hover:text-primary">
            {lang === "en" ? "Products" : "محصولات"}
          </Link>
          {" / "}
          <span className="text-foreground font-medium line-clamp-1">{name}</span>
        </nav>

        {/* Content - responsive grid */}
        <section className="space-responsive px-4 sm:px-6">
          <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image - responsive aspect ratio */}
            <div className="relative aspect-square sm:aspect-auto sm:h-96 md:h-full bg-background rounded-lg overflow-hidden border border-gray-200">
              <Image 
                src={product.image || "/placeholder.svg"} 
                alt={name} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Info - responsive typography and spacing */}
            <div className="flex flex-col">
              <h1 className="text-responsive-title text-primary mb-3 sm:mb-4 leading-tight">{name}</h1>
              <p className="text-responsive-body text-gray-700 mb-6 sm:mb-8 leading-relaxed">{description}</p>

              {/* Key specs - responsive grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-10 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase mb-1 sm:mb-2">{lang === "en" ? "Origin" : "منشأ"}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{product.origin}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase mb-1 sm:mb-2">{lang === "en" ? "Grade" : "درجه"}</p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{product.grade}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Shelf Life" : "مدت نگهداری"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{product.shelf_life}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase mb-1 sm:mb-2">
                    {lang === "en" ? "Minimum Order" : "حداقل سفارش"}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-primary">{product.minOrder}</p>
                </div>
              </div>

              {/* Certifications - responsive */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
                  {lang === "en" ? "Certifications" : "تصدیق‌ها"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span key={cert} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 text-white text-xs sm:text-sm font-medium rounded-full">
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
                    <li key={option} className="flex items-center gap-3 text-foreground text-sm sm:text-base">
                      <span className="w-2 h-2 flex-shrink-0 bg-amber-600 rounded-full" />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA - responsive stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={`/${lang}/contact?product=${product.id}`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors text-center text-sm sm:text-base"
                >
                  {lang === "en" ? "Request Quote" : "درخواست قیمت"}
                </Link>
                <Link
                  href={`/${lang}/products`}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center text-sm sm:text-base"
                >
                  {lang === "en" ? "Back to Catalog" : "بازگشت به کاتالوگ"}
                </Link>
              </div>

              {/* Download spec sheet - responsive */}
              <button className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors text-sm sm:text-base">
                {lang === "en" ? "Download Spec Sheet (PDF)" : "دانلود برگه مشخصات"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
