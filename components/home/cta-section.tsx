import Link from "next/link"
import type { Language } from "@/lib/i18n"

interface CTASectionProps {
  lang: Language
}

export function CTASection({ lang }: CTASectionProps) {
  const isRTL = lang === "fa"

  return (
    <section className="py-24 px-6 bg-dark-overlay text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">
          {lang === "en" ? "Ready to Partner With Us?" : "آماده‌ی همکاری با ما هستید؟"}
        </h2>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          {lang === "en"
            ? "Connect with our B2B team to discuss private labeling, bulk orders, or exclusive partnerships."
            : "با تیم B2B ما در ارتباط برای بحث درباره علامت‌گذاری خصوصی، سفارشات انبوه یا مشارکت‌های منحصر به فرد"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}/contact`}
            className="px-8 py-3 bg-accent-warm-orange hover:bg-accent-warm-red text-white font-semibold rounded transition-colors"
          >
            {lang === "en" ? "Contact Sales" : "تماس با فروش"}
          </Link>
          <a
            href="#"
            download
            className="px-8 py-3 border-2 border-white hover:bg-white hover:text-dark-overlay text-white font-semibold rounded transition-colors"
          >
            {lang === "en" ? "Download Catalog" : "دانلود کاتالوگ"}
          </a>
        </div>
      </div>
    </section>
  )
}
