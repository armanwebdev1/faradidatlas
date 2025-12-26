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
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-6 py-4 text-sm text-neutral">
          <Link href={`/${lang}`} className="hover:text-primary">
            {lang === "en" ? "Home" : "خانه"}
          </Link>
          {" / "}
          <Link href={`/${lang}/products`} className="hover:text-primary">
            {lang === "en" ? "Products" : "محصولات"}
          </Link>
          {" / "}
          <span className="text-foreground font-medium">{name}</span>
        </nav>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square bg-background rounded-lg overflow-hidden border border-border">
              <Image src={product.image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>

            {/* Info */}
            <div>
              <h1 className="text-5xl font-bold text-primary mb-4">{name}</h1>
              <p className="text-xl text-neutral mb-6">{description}</p>

              {/* Key specs */}
              <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-background rounded-lg border border-border">
                <div>
                  <p className="text-xs font-medium text-neutral uppercase mb-2">{lang === "en" ? "Origin" : "منشأ"}</p>
                  <p className="text-lg font-semibold text-primary">{product.origin}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral uppercase mb-2">{lang === "en" ? "Grade" : "درجه"}</p>
                  <p className="text-lg font-semibold text-primary">{product.grade}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral uppercase mb-2">
                    {lang === "en" ? "Shelf Life" : "مدت نگهداری"}
                  </p>
                  <p className="text-lg font-semibold text-primary">{product.shelf_life}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral uppercase mb-2">
                    {lang === "en" ? "Minimum Order" : "حداقل سفارش"}
                  </p>
                  <p className="text-lg font-semibold text-primary">{product.minOrder}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {lang === "en" ? "Certifications" : "تصدیق‌ها"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span key={cert} className="px-4 py-2 bg-accent-warm-gold text-white text-xs font-medium rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {lang === "en" ? "Packaging Options" : "گزینه‌های بسته‌بندی"}
                </h3>
                <ul className="space-y-2">
                  {product.packagingOptions.map((option) => (
                    <li key={option} className="flex items-center gap-3 text-foreground">
                      <span className="w-2 h-2 bg-accent-warm-orange rounded-full" />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Link
                  href={`/${lang}/contact?product=${product.id}`}
                  className="flex-1 px-6 py-3 bg-accent-warm-orange text-white font-semibold rounded hover:bg-accent-warm-red transition-colors text-center"
                >
                  {lang === "en" ? "Request Quote" : "درخواست قیمت"}
                </Link>
                <Link
                  href={`/${lang}/products`}
                  className="flex-1 px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-background transition-colors text-center"
                >
                  {lang === "en" ? "Back to Catalog" : "بازگشت به کاتالوگ"}
                </Link>
              </div>

              {/* Download spec sheet */}
              <button className="w-full mt-4 px-6 py-3 bg-white border-2 border-accent-warm-gold text-accent-warm-gold font-semibold rounded hover:bg-accent-warm-gold/10 transition-colors">
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
