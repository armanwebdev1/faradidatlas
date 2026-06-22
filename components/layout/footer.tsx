import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  MapPin,
} from "lucide-react";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const brandHomeLabel =
    lang === "en" ? "Faradid Atlas home" : "خانه فرادید اطلس";
  const brandPrimary = lang === "en" ? "Faradid" : "فرادید";
  const brandSecondary = lang === "en" ? "Atlas" : "اطلس";

  return (
    <footer
      dir={dir}
      className="relative bg-gradient-to-b from-depth to-depth/95 text-white overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {/* Brand section */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div className="mb-8">
                <Link
                  href={`/${lang}`}
                  aria-label={brandHomeLabel}
                  className={`group mb-4 inline-flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <Image
                    src="/brand/faradid-atlas-mark-light.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-11 w-11 object-contain opacity-95 transition duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(201,169,97,0.35)] sm:h-12 sm:w-12"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {brandPrimary}
                    </span>
                    <span
                      className={`mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-accent/80 ${
                        isRTL ? "tracking-normal" : "tracking-[0.24em]"
                      }`}
                    >
                      {brandSecondary}
                    </span>
                  </span>
                </Link>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {t.footer.tagline}
                </p>
              </div>

              <Link
                href={`/${lang}/contact`}
                className="inline-flex text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-accent/90">
                {t.footer.navigation}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/${lang}`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.nav.home}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}#products`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.footer.featuredProducts}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}#markets`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.footer.markets}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
                {t.footer.company}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/${lang}/about`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.nav.about}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}/careers`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.nav.careers}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}/faq`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.nav.faq}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
                {t.footer.resources}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {t.nav.contact}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
                {t.pages.contact.subtitle}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.footer.address}</span>
                </div>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex text-sm text-white/70 hover:text-accent transition-colors duration-300"
                >
                  {t.pages.contact.sendMessage}
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-8 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-start">
              <p className="text-xs text-white/60 leading-relaxed font-light">
                &copy; 2026 Faradid Atlas Foods. {t.footer.copyright} |{" "}
                <span className="text-accent/80">ISO 22000</span>
              </p>
            </div>
            <div className="text-center md:text-end">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:justify-end">
                <a
                  href="#"
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.footer.privacy}
                </a>
                <a
                  href="#"
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.footer.terms}
                </a>
                <a
                  href="#"
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.footer.sitemap}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
