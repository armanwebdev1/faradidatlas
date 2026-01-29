"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  ChevronDown,
  Home,
  Info,
  ShoppingBag,
  Briefcase,
  HelpCircle,
  Phone,
  Search,
} from "lucide-react";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const scrollTriggerPoint = heroHeight;

      if (currentScrollY < scrollTriggerPoint) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > scrollTriggerPoint) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string): boolean => {
    if (pathname === href) return true;
    if (href !== `/${lang}` && pathname.startsWith(href)) return true;
    return false;
  };

  const navItems = [
    { href: `/${lang}`, label: t.nav.home, key: "home", Icon: Home },
    {
      href: `/${lang}/about`,
      label: t.nav.about,
      key: "about",
      Icon: Info,
    },
    {
      href: `/${lang}/products`,
      label: t.nav.products,
      key: "products",
      Icon: ShoppingBag,
    },
    {
      href: `/${lang}/careers`,
      label: t.nav.careers,
      key: "careers",
      Icon: Briefcase,
    },
    {
      href: `/${lang}/faq`,
      label: t.nav.faq,
      key: "faq",
      Icon: HelpCircle,
    },
    {
      href: `/${lang}/contact`,
      label: t.nav.contact,
      key: "contact",
      Icon: Phone,
    },
  ];

  return (
    <>
      <header
        dir={dir}
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Row 1: Logo, Search (centered on desktop), Language Dropdown */}
        <div className="relative backdrop-blur-md bg-white/80 border-b border-border/30">
          <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo - Mobile Friendly */}
            <Link
              href={`/${lang}`}
              className="text-lg sm:text-xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              FaraDid
            </Link>

            {/* Centered Search Box - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                <input
                  type="search"
                  placeholder={lang === "en" ? "Search..." : "جستجو..."}
                  className="pl-12 pr-4 py-2 text-sm border border-border/50 rounded-full bg-white/50 text-foreground placeholder-muted-foreground placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all hover:border-border/70"
                  aria-label={lang === "en" ? "Search" : "جستجو"}
                />
              </div>
            </div>

            {/* Language Dropdown - Responsive */}
            <div className="relative shrink-0" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label={lang === "en" ? "Select language" : "انتخاب زبان"}
                aria-expanded={isLangOpen}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <span className="text-base sm:text-lg">{lang === "en" ? "🇺🇸" : "🇮🇷"}</span>
                <span className="hidden sm:inline text-sm font-medium text-foreground">
                  {lang === "en" ? "English" : "فارسی"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground shrink-0"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Row 2: Navigation Links - Desktop Only */}
        <nav className="relative z-30 backdrop-blur-md bg-white/70 hidden lg:block border-b border-border/30">
          <div className="w-full px-6 h-12 flex items-center justify-center gap-4 lg:gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const { Icon } = item;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative flex items-center gap-2.5 h-full text-sm font-medium transition-colors group"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-all duration-200 ${
                      active
                        ? "text-primary scale-110"
                        : "text-muted-foreground group-hover:text-primary group-hover:scale-105"
                    }`}
                  />
                  <span
                    className={`${
                      active
                        ? "text-primary font-semibold"
                        : "text-foreground group-hover:text-primary transition-colors"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-t-md transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {isLangOpen && (
        <div
          dir={dir}
          className={`fixed top-16 ${isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"} w-44 sm:w-48 bg-white/95 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
          role="menu"
        >
          {/* Subtle gradient header */}
          <div className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/10">
            <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
              {isRTL ? "زبان" : "Language"}
            </p>
          </div>

          {/* Language options with hover effect */}
          <div className="py-2 space-y-1 px-2">
            <Link
              href={`/en${pathname.replace(/^\/(en|fa)/, "")}`}
              onClick={() => setIsLangOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group/item ${
                lang === "en"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground hover:bg-muted/50"
              }`}
              role="menuitem"
            >
              <span className="text-lg">🇺🇸</span>
              <span>English</span>
              {lang === "en" && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
              )}
            </Link>

            <Link
              href={`/fa${pathname.replace(/^\/(en|fa)/, "")}`}
              onClick={() => setIsLangOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group/item ${
                lang === "fa"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground hover:bg-muted/50"
              }`}
              role="menuitem"
            >
              <span className="text-lg">🇮🇷</span>
              <span>فارسی</span>
              {lang === "fa" && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
              )}
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu - Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 lg:hidden bg-white/95 backdrop-blur-md border-b border-border/30 animate-in fade-in slide-in-from-top-8 duration-200">
          <nav className="flex flex-col space-y-1 p-4">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const { Icon } = item;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "scale-110" : ""}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Header spacing - responsive */}
      <div className="h-16 sm:h-16 md:h-28" />
    </>
  );
}
