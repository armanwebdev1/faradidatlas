"use client"

import Link from "next/link"
import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

interface HeaderProps {
  lang: Language
}

export function Header({ lang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[lang]
  const isRTL = lang === "fa"
  const dir = isRTL ? "rtl" : "ltr"

  return (
    <header dir={dir} className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          Premium Foods
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.home}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t.nav.about}
          </Link>
          <Link
            href={`/${lang}/products`}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t.nav.products}
          </Link>
          <Link
            href={`/${lang}/careers`}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t.nav.careers}
          </Link>
          <Link
            href={`/${lang}/faq`}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {t.nav.faq}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="text-sm font-medium text-white bg-primary px-6 py-2 rounded hover:bg-accent transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Link
            href={`/en${typeof window !== "undefined" ? window.location.pathname.replace(/^\/(en|fa)/, "") : ""}`}
            className={`text-xs px-3 py-1 rounded ${lang === "en" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          >
            EN
          </Link>
          <Link
            href={`/fa${typeof window !== "undefined" ? window.location.pathname.replace(/^\/(en|fa)/, "") : ""}`}
            className={`text-xs px-3 py-1 rounded ${lang === "fa" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          >
            FA
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border py-4">
          <div className="flex flex-col gap-4 px-6">
            <Link href={`/${lang}`} className="text-sm font-medium text-foreground hover:text-primary">
              {t.nav.home}
            </Link>
            <Link href={`/${lang}/about`} className="text-sm font-medium text-foreground hover:text-primary">
              {t.nav.about}
            </Link>
            <Link href={`/${lang}/products`} className="text-sm font-medium text-foreground hover:text-primary">
              {t.nav.products}
            </Link>
            <Link href={`/${lang}/careers`} className="text-sm font-medium text-foreground hover:text-primary">
              {t.nav.careers}
            </Link>
            <Link href={`/${lang}/faq`} className="text-sm font-medium text-foreground hover:text-primary">
              {t.nav.faq}
            </Link>
            <Link href={`/${lang}/contact`} className="text-sm font-medium text-white bg-primary px-6 py-2 rounded">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
