"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { products } from "@/components/products/product-data";
import { jobs } from "@/components/careers/job-data";
import { faqs, faqCategories } from "@/components/faq/faq-data";
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
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setActiveIndex(-1);
    setQuery("");
  }, [pathname]);

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

  const normalize = (value: string) => value.toLowerCase().trim();

  const searchResults = useMemo(() => {
    const q = normalize(query);
    if (!q) {
      return { products: [], careers: [], faqs: [] };
    }

    const match = (value?: string) =>
      value ? normalize(value).includes(q) : false;

    const productResults = products
      .filter(
        (product) =>
          match(product.nameEn) ||
          match(product.nameFa) ||
          match(product.descriptionEn) ||
          match(product.descriptionFa) ||
          match(product.origin) ||
          match(product.grade),
      )
      .slice(0, 6)
      .map((product) => ({
        id: `product-${product.id}`,
        type: "product",
        title: lang === "en" ? product.nameEn : product.nameFa,
        subtitle: `${product.origin} / ${product.grade}`,
        href: `/${lang}/products/${product.id}`,
      }));

    const careerResults = jobs
      .filter(
        (job) =>
          match(job.titleEn) ||
          match(job.titleFa) ||
          match(job.descriptionEn) ||
          match(job.descriptionFa) ||
          match(job.department) ||
          match(job.location),
      )
      .slice(0, 5)
      .map((job) => ({
        id: `career-${job.id}`,
        type: "career",
        title: lang === "en" ? job.titleEn : job.titleFa,
        subtitle: `${job.department} / ${job.location}`,
        href: `/${lang}/careers/${job.id}`,
      }));

    const faqResults = faqs
      .filter(
        (faq) =>
          match(faq.questionEn) ||
          match(faq.questionFa) ||
          match(faq.answerEn) ||
          match(faq.answerFa),
      )
      .slice(0, 5)
      .map((faq) => ({
        id: `faq-${faq.id}`,
        type: "faq",
        title: lang === "en" ? faq.questionEn : faq.questionFa,
        subtitle:
          faqCategories[faq.category]?.[lang] ||
          (lang === "en" ? "FAQ" : "سوالات"),
        href: `/${lang}/faq#faq-${faq.id}`,
      }));

    return { products: productResults, careers: careerResults, faqs: faqResults };
  }, [query, lang]);

  const flatResults = useMemo(
    () => [
      ...searchResults.products,
      ...searchResults.careers,
      ...searchResults.faqs,
    ],
    [searchResults],
  );

  const indexedResults = useMemo(() => {
    let index = 0;
    const withIndex = (items: typeof flatResults) =>
      items.map((item) => ({ ...item, index: index++ }));

    return {
      products: withIndex(searchResults.products),
      careers: withIndex(searchResults.careers),
      faqs: withIndex(searchResults.faqs),
    };
  }, [searchResults, flatResults]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const hasResults = flatResults.length > 0;

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!hasResults) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatResults.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? flatResults.length - 1 : prev - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      router.push(flatResults[activeIndex].href);
      setIsSearchOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <>
      <header
        dir={dir}
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Row 1: Logo, Search (centered on desktop), Language Dropdown */}
        <div className="relative z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
          <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo - Mobile Friendly */}
            <Link
              href={`/${lang}`}
              className="group relative flex flex-col leading-[0.9] px-2 py-1 rounded-lg text-primary transition-all duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="relative z-10 inline-block text-xl sm:text-2xl font-bold tracking-[0.18em] text-primary">
                <span className="relative z-10">Faradid</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Faradid
                </span>
              </span>
              <span className="relative z-10 text-[11px] sm:text-xs font-medium tracking-[0.24em] text-muted-foreground/90 transition-colors duration-300 group-hover:text-primary/80">
                Atlas
              </span>
              <span className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/10 to-accent/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -bottom-1 left-2 right-2 z-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            {/* Centered Search Box - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <div ref={searchRef} className="relative w-full max-w-md">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none ${
                    isRTL ? "right-4" : "left-4"
                  }`}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={lang === "en" ? "Search..." : "?????..."}
                  className={`py-2 text-sm border border-border/50 rounded-full bg-background/60 text-foreground placeholder-muted-foreground placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all hover:border-border/70 ${
                    isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                  }`}
                  aria-label={lang === "en" ? "Search" : "?????"}
                  aria-expanded={isSearchOpen && query.trim().length > 0}
                  aria-controls="header-search-results"
                  role="combobox"
                  aria-autocomplete="list"
                />

                {isSearchOpen && query.trim().length > 0 && (
                  <div
                    id="header-search-results"
                    role="listbox"
                    className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-border/40 bg-background/95 shadow-xl backdrop-blur-xl p-2 max-h-80 overflow-auto"
                  >
                    {hasResults ? (
                      <div className="space-y-2">
                        {indexedResults.products.length > 0 && (
                          <div>
                            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                              {lang === "en" ? "Products" : "???????"}
                            </p>
                            <div className="space-y-1">
                              {indexedResults.products.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  role="option"
                                  aria-selected={activeIndex === item.index}
                                  onMouseEnter={() => setActiveIndex(item.index)}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setQuery("");
                                    setActiveIndex(-1);
                                  }}
                                  className={`block rounded-xl px-3 py-2 transition-colors ${
                                    activeIndex === item.index
                                      ? "bg-muted/60 text-foreground"
                                      : "hover:bg-muted/40"
                                  }`}
                                >
                                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {item.subtitle}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {indexedResults.careers.length > 0 && (
                          <div>
                            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                              {lang === "en" ? "Careers" : "???????? ????"}
                            </p>
                            <div className="space-y-1">
                              {indexedResults.careers.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  role="option"
                                  aria-selected={activeIndex === item.index}
                                  onMouseEnter={() => setActiveIndex(item.index)}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setQuery("");
                                    setActiveIndex(-1);
                                  }}
                                  className={`block rounded-xl px-3 py-2 transition-colors ${
                                    activeIndex === item.index
                                      ? "bg-muted/60 text-foreground"
                                      : "hover:bg-muted/40"
                                  }`}
                                >
                                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {item.subtitle}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {indexedResults.faqs.length > 0 && (
                          <div>
                            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                              {lang === "en" ? "FAQ" : "?????? ??????"}
                            </p>
                            <div className="space-y-1">
                              {indexedResults.faqs.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  role="option"
                                  aria-selected={activeIndex === item.index}
                                  onMouseEnter={() => setActiveIndex(item.index)}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setQuery("");
                                    setActiveIndex(-1);
                                  }}
                                  className={`block rounded-xl px-3 py-2 transition-colors ${
                                    activeIndex === item.index
                                      ? "bg-muted/60 text-foreground"
                                      : "hover:bg-muted/40"
                                  }`}
                                >
                                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {item.subtitle}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="px-3 py-4 text-sm text-muted-foreground">
                        {lang === "en" ? "No results found." : "???????? ???? ???."}
                      </div>
                    )}
                  </div>
                )}
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
                <span className="text-base sm:text-lg">
                  {lang === "en" ? "🇺🇸" : "🇮🇷"}
                </span>
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
        <nav className="relative z-10 backdrop-blur-md bg-background/70 hidden lg:block border-b border-border/30">
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
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-md transition-opacity duration-200 ${
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
          className={`fixed top-16 ${isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"} w-44 sm:w-48 bg-background/95 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
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
        <div className="fixed inset-0 top-16 z-30 lg:hidden bg-background/95 backdrop-blur-md border-b border-border/30 animate-in fade-in slide-in-from-top-8 duration-200">
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
                  <Icon size={20} className={active ? "scale-110" : ""} />
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
