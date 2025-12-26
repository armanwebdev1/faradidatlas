import Link from "next/link"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang]
  const isRTL = lang === "fa"
  const dir = isRTL ? "rtl" : "ltr"

  return (
    <footer dir={dir} className="bg-dark-overlay text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Premium Foods</h3>
            <p className="text-sm text-gray-300">
              Global food trading company specializing in premium sourcing and exports.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.nav.home}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}`} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#products`} className="hover:text-white transition-colors">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#markets`} className="hover:text-white transition-colors">
                  Markets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/careers`} className="hover:text-white transition-colors">
                  {t.nav.careers}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="hover:text-white transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <a href="mailto:sales@premiumfoods.com" className="hover:text-white transition-colors">
                  sales@premiumfoods.com
                </a>
              </li>
              <li>
                <a href="tel:+98123456789" className="hover:text-white transition-colors">
                  +98 (123) 456-789
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Premium Foods. All rights reserved. | ISO 22000 | HACCP Certified</p>
        </div>
      </div>
    </footer>
  )
}
