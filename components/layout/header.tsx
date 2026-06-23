 "use client";

import {
  type CSSProperties,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  categoryLabels,
  getProductBrand,
  getProductType,
  productBrandLabels,
  productBrands,
  productCategories,
  productTypeLabels,
  productTypes,
  products,
  type Product,
  type ProductBrand,
  type ProductCategory,
  type ProductType,
} from "@/components/products/product-data";
import {
  Briefcase,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Home,
  Info,
  Phone,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

interface HeaderProps {
  lang: Language;
}

type HeaderMode = "full" | "compact" | "hidden";

const categoryDescriptions: Record<
  ProductCategory,
  { en: string; fa: string }
> = {
  rice: {
    en: "Branded basmati, jasmine, and long-grain rice lines.",
    fa: "برنج‌های برنددار باسماتی، جاسمین و دانه‌بلند.",
  },
  legumes: {
    en: "Everyday pulses prepared for retail and wholesale supply.",
    fa: "حبوبات پرمصرف برای عرضه فروشگاهی و عمده.",
  },
  seeds: {
    en: "Snack, bakery, and ingredient-ready kernels.",
    fa: "دانه‌ها و مغز تخمه‌ها برای مصرف، تنقلات و تولید.",
  },
  nuts: {
    en: "Packaged nut products for reliable commercial channels.",
    fa: "مغزها و آجیل بسته‌بندی‌شده برای کانال‌های تجاری.",
  },
  spices: {
    en: "Core spices and seasonings with consistent packaged supply.",
    fa: "ادویه‌ها و چاشنی‌های اصلی با تأمین بسته‌بندی‌شده.",
  },
  sugar: {
    en: "Sweetener supply options for staple food procurement.",
    fa: "گزینه‌های تأمین شکر و شیرین‌کننده‌ها.",
  },
};

const brandThumbnails: Record<ProductBrand, string> = {
  "twenty-one": "/brands/twenty-one-4k.png",
  mizban: "/brands/mizban-4k.png",
  golbanoo: "/brands/golbanoo-4k.png",
  hayat: "/brands/hayat-4k.png",
};

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const [headerMode, setHeaderMode] = useState<HeaderMode>("full");
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const desktopSearchBoxRef = useRef<HTMLDivElement>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const downScrollStartYRef = useRef(0);
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const otherLang = lang === "en" ? "fa" : "en";
  const languageNames: Record<Language, string> = {
    en: "English",
    fa: "فارسی",
  };
  const localeMarks: Record<Language, string> = {
    en: "US",
    fa: "IR",
  };
  const brandHomeLabel =
    lang === "en" ? "Faradid Atlas home" : "خانه فرادید اطلس";
  const brandPrimary = lang === "en" ? "Faradid" : "فرادید";
  const brandSecondary = lang === "en" ? "Atlas" : "اطلس";
  const brandFullName = lang === "en" ? "Faradid Atlas" : "فرادید اطلس";

  const navItems = [
    { href: `/${lang}`, label: t.nav.home, key: "home", Icon: Home },
    { href: `/${lang}/about`, label: t.nav.about, key: "about", Icon: Info },
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
    { href: `/${lang}/faq`, label: t.nav.faq, key: "faq", Icon: HelpCircle },
    {
      href: `/${lang}/contact`,
      label: t.nav.contact,
      key: "contact",
      Icon: Phone,
    },
  ];

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US"),
    [lang],
  );
  const productCategoryMenuItems = useMemo(
    () =>
      productCategories
        .map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category,
          );
          const count = categoryProducts.length;

          return {
            category,
            label: categoryLabels[category][lang],
            description: categoryDescriptions[category][lang],
            count,
            countLabel:
              lang === "en"
                ? `${numberFormatter.format(count)} products`
                : `${numberFormatter.format(count)} محصول`,
            href: `/${lang}/products?category=${category}#product-catalog`,
            image: categoryProducts.find((product) => product.image)?.image,
          };
        })
        .filter((item) => item.count > 0),
    [lang, numberFormatter],
  );
  const productBrandMenuItems = useMemo(
    () =>
      productBrands
        .map((brand) => {
          const count = products.filter(
            (product) => getProductBrand(product) === brand,
          ).length;

          return {
            key: brand,
            label: productBrandLabels[brand][lang],
            count,
            countLabel:
              lang === "en"
                ? `${numberFormatter.format(count)} products`
                : `${numberFormatter.format(count)} محصول`,
            href: `/${lang}/products?brand=${brand}#product-catalog`,
            image: brandThumbnails[brand],
            imageFit: "contain" as const,
          };
        })
        .filter((item) => item.count > 0),
    [lang, numberFormatter],
  );
  const productTypeMenuItems = useMemo(
    () =>
      productTypes
        .map((type) => {
          const typeProducts = products.filter(
            (product) => getProductType(product) === type,
          );
          const count = typeProducts.length;

          return {
            key: type,
            label: productTypeLabels[type][lang],
            count,
            countLabel:
              lang === "en"
                ? `${numberFormatter.format(count)} products`
                : `${numberFormatter.format(count)} محصول`,
            href: `/${lang}/products?type=${type}#product-catalog`,
            image: typeProducts.find((product) => product.image)?.image,
            imageFit: "cover" as const,
          };
        })
        .filter((item) => item.count > 0),
    [lang, numberFormatter],
  );

  useEffect(() => {
    const topThreshold = 8;
    const directionThreshold = 3;
    const hideScrollDistance = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= topThreshold) {
        setHeaderMode("full");
        lastScrollYRef.current = currentScrollY;
        downScrollStartYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) < directionThreshold) return;

      if (scrollDelta < 0) {
        setHeaderMode("compact");
        downScrollStartYRef.current = currentScrollY;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY - downScrollStartYRef.current >= hideScrollDistance) {
        setHeaderMode("hidden");
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    downScrollStartYRef.current = window.scrollY;
    setHeaderMode(lastScrollYRef.current <= topThreshold ? "full" : "hidden");
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        desktopSearchBoxRef.current?.contains(target) ||
        mobileSearchBoxRef.current?.contains(target)
      ) {
        return;
      }

      setIsSearchOpen(false);
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [isSearchOpen]);

  const clearSearch = () => {
    setSearchValue("");
    setIsSearchOpen(false);
  };
  const clearSearchLabel =
    lang === "en" ? "Clear search" : "پاک کردن جستجو";
  const searchQuery = searchValue.trim();
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const searchCorpus = useMemo(
    () =>
      products.map((product) => ({
        product,
        text: normalizeSearchText(productSearchText(product)),
      })),
    [],
  );
  const searchResults = useMemo(
    () => searchProducts(deferredSearchQuery, searchCorpus).slice(0, 6),
    [deferredSearchQuery, searchCorpus],
  );
  const shouldShowSearchResults = isSearchOpen && searchQuery.length > 0;
  const effectiveHeaderMode: HeaderMode = shouldShowSearchResults
    ? "full"
    : headerMode;
  const headerVisibilityClass =
    effectiveHeaderMode === "hidden"
      ? "-translate-y-[calc(100%+0.75rem)] opacity-0 pointer-events-none"
      : effectiveHeaderMode === "compact"
        ? "-translate-y-16 opacity-100"
        : "translate-y-0 opacity-100";
  const topBrandVisibilityClass =
    effectiveHeaderMode === "full"
      ? "site-brand-top-visible"
      : "site-brand-top-hidden pointer-events-none";
  const compactBrandVisibilityClass =
    effectiveHeaderMode === "compact"
      ? "site-brand-compact-visible"
      : "site-brand-compact-hidden pointer-events-none";
  const compactBrandPositionStyle: CSSProperties = isRTL
    ? { right: "1.5rem", left: "auto" }
    : { left: "1.5rem", right: "auto" };
  const searchIconStyle: CSSProperties = isRTL
    ? { right: "1rem", left: "auto" }
    : { left: "1rem", right: "auto" };
  const clearButtonStyle: CSSProperties = isRTL
    ? { left: "0.5rem", right: "auto" }
    : { right: "0.5rem", left: "auto" };
  const searchInputStyle: CSSProperties = {
    direction: dir,
    textAlign: isRTL ? "right" : "left",
    ...(isRTL ? { paddingLeft: "3.25rem", paddingRight: "3.75rem" } : {}),
  };
  const currentPath = (pathname ?? `/${lang}`).replace(/\/$/, "") || `/${lang}`;
  const isNavItemActive = (href: string) => {
    if (href === `/${lang}`) return currentPath === href;

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };
  const openSearch = (value = searchValue) => {
    setIsSearchOpen(value.trim().length > 0);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openSearch();
  };

  return (
    <>
      <header
        dir={dir}
        className={`fixed top-0 inset-x-0 z-[60] transform-gpu will-change-transform transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${headerVisibilityClass}`}
      >
        <div className="relative z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
          <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            <a
              href={`/${lang}`}
              aria-label={brandHomeLabel}
              className={`site-brand-transition group relative flex transform-gpu items-center gap-2.5 rounded-xl px-2 py-1.5 text-brand-navy transition-[background-color,box-shadow] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/30 ${topBrandVisibilityClass} ${
                isRTL ? "flex-row-reverse text-right" : "text-left"
              }`}
            >
              <Image
                src="/brand/faradid-atlas-mark.png"
                alt=""
                width={44}
                height={44}
                priority
                className="relative z-10 h-9 w-9 object-contain drop-shadow-[0_8px_16px_rgba(30,35,39,0.12)] transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
              />
              <span className="relative z-10 flex flex-col leading-none">
                <span
                  className={`text-lg font-bold text-brand-navy transition-colors duration-300 group-hover:text-brand-navy/90 sm:text-xl ${
                    isRTL ? "tracking-normal" : "tracking-[0.12em]"
                  }`}
                >
                  {brandPrimary}
                </span>
                <span
                  className={`text-[11px] font-medium text-muted-foreground/90 transition-colors duration-300 group-hover:text-brand-navy/80 sm:text-xs ${
                    isRTL ? "mt-1 tracking-normal" : "mt-0.5 tracking-[0.22em]"
                  }`}
                >
                  {brandSecondary}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/10 to-accent/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -bottom-1 left-2 right-2 z-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>

            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="relative z-[80] hidden flex-1 justify-center px-4 md:flex"
            >
              <div
                ref={desktopSearchBoxRef}
                className="relative w-full max-w-md"
                dir={dir}
              >
                <button
                  type="button"
                  onClick={() => {
                    openSearch();
                    desktopSearchRef.current?.focus();
                  }}
                  aria-label={t.common.search}
                  style={searchIconStyle}
                  className="absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25"
                >
                  <Search className="h-5 w-5" />
                </button>
                <input
                  ref={desktopSearchRef}
                  type="text"
                  value={searchValue}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setSearchValue(nextValue);
                    openSearch(nextValue);
                  }}
                  onFocus={() => openSearch()}
                  placeholder={`${t.common.search}...`}
                  autoComplete="off"
                  dir={dir}
                  style={searchInputStyle}
                  className={`w-full rounded-full border border-border/50 bg-background/60 py-2 text-sm text-foreground transition-all placeholder:text-muted-foreground placeholder:font-light focus:border-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 hover:border-border/70 ${
                    isRTL
                      ? "pl-11 pr-12 text-right [direction:rtl] placeholder:text-right"
                      : "pl-12 pr-11 text-left"
                  }`}
                  aria-label={t.common.search}
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label={clearSearchLabel}
                    style={clearButtonStyle}
                    className="absolute top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-border/70 bg-background/90 text-muted-foreground shadow-sm transition-all hover:border-brand-navy/25 hover:bg-brand-navy/5 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25"
                  >
                    <X size={15} strokeWidth={1.8} />
                  </button>
                )}
                {shouldShowSearchResults && (
                  <SearchResultsPopover
                    lang={lang}
                    query={searchQuery}
                    results={searchResults}
                    onClose={() => setIsSearchOpen(false)}
                  />
                )}
              </div>
            </form>

            <details className="relative shrink-0 group/lang">
              <summary
                aria-label={lang === "en" ? "Select language" : "انتخاب زبان"}
                className="flex cursor-pointer list-none items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-brand-navy/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/25 [&::-webkit-details-marker]:hidden"
              >
                <span className="text-base sm:text-lg">
                  {localeMarks[lang]}
                </span>
                <span className="hidden sm:inline text-sm font-medium text-foreground">
                  {languageNames[lang]}
                </span>
                <ChevronDown
                  size={18}
                  className="text-muted-foreground transition-transform duration-300 group-open/lang:rotate-180"
                />
              </summary>
              <div
                dir={dir}
                className="absolute top-full mt-2 right-0 w-44 sm:w-48 bg-background/95 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                role="menu"
              >
                <div className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/10">
                  <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                    {isRTL ? t.common.language : "Language"}
                  </p>
                </div>
                <div className="py-2 space-y-1 px-2">
                  <a
                    href={`/${lang}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-brand-navy/10 text-brand-navy shadow-sm"
                    role="menuitem"
                  >
                    <span className="text-lg">{localeMarks[lang]}</span>
                    <span>{languageNames[lang]}</span>
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-navy" />
                  </a>
                  <a
                    href={`/${otherLang}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-muted/50 transition-all duration-200"
                    role="menuitem"
                  >
                    <span className="text-lg">{localeMarks[otherLang]}</span>
                    <span>{languageNames[otherLang]}</span>
                  </a>
                </div>
              </div>
            </details>

            <details className="lg:hidden">
              <summary
                className="list-none p-2 text-foreground shrink-0 cursor-pointer [&::-webkit-details-marker]:hidden"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <div className="fixed inset-x-0 top-16 z-30 max-h-[calc(100svh-4rem)] overflow-y-auto bg-background/95 backdrop-blur-md border-b border-border/30 animate-in fade-in slide-in-from-top-8 duration-200">
                <div className="px-4 pt-4">
                  <form
                    role="search"
                    onSubmit={handleSearchSubmit}
                  >
                    <div
                      ref={mobileSearchBoxRef}
                      className="relative"
                      dir={dir}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          openSearch();
                          mobileSearchRef.current?.focus();
                        }}
                        aria-label={t.common.search}
                        style={searchIconStyle}
                        className="absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25"
                      >
                        <Search className="h-5 w-5" />
                      </button>
                      <input
                        ref={mobileSearchRef}
                        type="text"
                        value={searchValue}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setSearchValue(nextValue);
                          openSearch(nextValue);
                        }}
                        onFocus={() => openSearch()}
                        placeholder={`${t.common.search}...`}
                        autoComplete="off"
                        dir={dir}
                        style={searchInputStyle}
                        className={`w-full rounded-full border border-border/50 bg-background/80 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 ${
                          isRTL
                            ? "pl-11 pr-12 text-right [direction:rtl] placeholder:text-right"
                            : "pl-12 pr-11 text-left"
                        }`}
                        aria-label={t.common.search}
                      />
                      {searchValue && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          aria-label={clearSearchLabel}
                          style={clearButtonStyle}
                          className="absolute top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-border/70 bg-background/90 text-muted-foreground shadow-sm transition-all hover:border-brand-navy/25 hover:bg-brand-navy/5 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25"
                        >
                          <X size={15} strokeWidth={1.8} />
                        </button>
                      )}
                      {shouldShowSearchResults && (
                        <SearchResultsPopover
                          lang={lang}
                          query={searchQuery}
                          results={searchResults}
                          onClose={() => setIsSearchOpen(false)}
                          compact
                        />
                      )}
                    </div>
                  </form>
                </div>
                <nav className="flex flex-col space-y-1 p-4">
                  {navItems.map(({ href, label, key, Icon }) => {
                    const isActive = isNavItemActive(href);

                    if (key === "products") {
                      return (
                        <details
                          key={key}
                          className="group/mobile-products rounded-xl border border-border/60 bg-background/70"
                          open={isActive || undefined}
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-foreground transition-colors hover:bg-muted/45 [&::-webkit-details-marker]:hidden">
                            <span className="flex min-w-0 items-center gap-3">
                              <Icon size={20} />
                              <span className="truncate">{label}</span>
                            </span>
                            <ChevronDown
                              size={17}
                              className="shrink-0 text-muted-foreground transition-transform duration-300 group-open/mobile-products:rotate-180"
                            />
                          </summary>

                          <div className="px-3 pb-3">
                            <a
                              href={href}
                              className="mb-2 flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-muted/45 hover:text-foreground"
                            >
                              <span>
                                {lang === "en" ? "All products" : "همه محصولات"}
                              </span>
                            </a>

                            <div className="divide-y divide-border/50 overflow-hidden rounded-lg border border-border/50 bg-background/80">
                              {productCategoryMenuItems.map((item) => (
                                <a
                                  key={item.category}
                                  href={item.href}
                                  className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/45"
                                >
                                  <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/50">
                                    {item.image ? (
                                      <Image
                                        src={item.image}
                                        alt=""
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                      />
                                    ) : (
                                      <span className="block h-full w-full bg-muted" />
                                    )}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold text-foreground">
                                      {item.label}
                                    </span>
                                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                      {item.countLabel}
                                    </span>
                                  </span>
                                </a>
                              ))}
                            </div>

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-lg border border-border/50 bg-background/80 p-2">
                                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                  {lang === "en" ? "Brands" : "برندها"}
                                </p>
                                <div className="space-y-1">
                                  {productBrandMenuItems.map((item) => (
                                    <a
                                      key={item.key}
                                      href={item.href}
                                      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/45"
                                    >
                                      <MenuFilterThumbnail item={item} size="sm" />
                                      <span className="min-w-0 flex-1 truncate">
                                        {item.label}
                                      </span>
                                      <span className="shrink-0 text-xs text-muted-foreground">
                                        {numberFormatter.format(item.count)}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-lg border border-border/50 bg-background/80 p-2">
                                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                  {lang === "en" ? "Product type" : "نوع محصول"}
                                </p>
                                <div className="space-y-1">
                                  {productTypeMenuItems.map((item) => (
                                    <a
                                      key={item.key}
                                      href={item.href}
                                      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/45"
                                    >
                                      <MenuFilterThumbnail item={item} size="sm" />
                                      <span className="min-w-0 flex-1 truncate">
                                        {item.label}
                                      </span>
                                      <span className="shrink-0 text-xs text-muted-foreground">
                                        {numberFormatter.format(item.count)}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
                      );
                    }

                    return (
                      <a
                        key={key}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-brand-navy/10 text-brand-navy shadow-sm"
                            : "text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={isActive ? "text-brand-navy" : ""}
                        />
                        <span>{label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </details>
          </div>
        </div>

        <nav
          className={`relative z-10 hidden border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
            effectiveHeaderMode === "compact"
              ? "border-border/40 bg-background/[0.92] shadow-[0_18px_44px_-30px_rgba(12,18,24,0.45)]"
              : "border-border/30 bg-background/70 shadow-none"
          }`}
        >
          <div className="w-full px-6 h-12 flex items-center justify-center gap-4 lg:gap-8">
            <a
              href={`/${lang}`}
              aria-label={brandHomeLabel}
              dir={dir}
              style={compactBrandPositionStyle}
              className={`site-brand-transition absolute top-1/2 hidden transform-gpu items-center gap-2 rounded-lg px-2 py-1 text-brand-navy lg:flex ${compactBrandVisibilityClass}`}
            >
              <Image
                src="/brand/faradid-atlas-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain drop-shadow-[0_8px_14px_rgba(30,35,39,0.12)]"
              />
              <span
                className={`hidden text-xs font-semibold text-brand-navy xl:inline ${
                  isRTL ? "tracking-normal" : "tracking-[0.14em]"
                }`}
              >
                {brandFullName}
              </span>
            </a>
            {navItems.map(({ href, label, key, Icon }) => {
              const isActive = isNavItemActive(href);

              if (key === "products") {
                return (
                  <div
                    key={key}
                    className="group/products relative flex h-full items-center"
                  >
                    <a
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      aria-haspopup="true"
                      className={`relative flex h-full items-center gap-2.5 text-sm font-medium transition-colors group ${
                        isActive ? "text-brand-navy" : ""
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`transition-all duration-200 group-hover:text-brand-navy group-hover:scale-105 ${
                          isActive
                            ? "text-brand-navy"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`transition-colors group-hover:text-brand-navy ${
                          isActive ? "text-brand-navy" : "text-foreground"
                        }`}
                      >
                        {label}
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.7}
                        className="text-muted-foreground transition-all duration-300 group-hover:text-brand-navy group-hover/products:rotate-180"
                      />
                      <span
                        className={`absolute bottom-0 inset-x-0 h-1 rounded-t-md bg-brand-navy transition-opacity duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </a>
                    <ProductsMegaMenu
                      lang={lang}
                      isRTL={isRTL}
                      categories={productCategoryMenuItems}
                      brands={productBrandMenuItems}
                      types={productTypeMenuItems}
                    />
                  </div>
                );
              }

              return (
                <a
                  key={key}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center gap-2.5 h-full text-sm font-medium transition-colors group ${
                    isActive ? "text-brand-navy" : ""
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-all duration-200 group-hover:text-brand-navy group-hover:scale-105 ${
                      isActive
                        ? "text-brand-navy"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`transition-colors group-hover:text-brand-navy ${
                      isActive ? "text-brand-navy" : "text-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`absolute bottom-0 inset-x-0 h-1 rounded-t-md bg-brand-navy transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </nav>
      </header>
      <div className="h-16 sm:h-16 md:h-28" />
    </>
  );
}

type ProductCategoryMenuItem = {
  category: ProductCategory;
  label: string;
  description: string;
  count: number;
  countLabel: string;
  href: string;
  image?: string;
};

type ProductFilterMenuItem = {
  key: ProductBrand | ProductType;
  label: string;
  count: number;
  countLabel: string;
  href: string;
  image?: string;
  imageFit?: "contain" | "cover";
};

function ProductsMegaMenu({
  lang,
  isRTL,
  categories,
  brands,
  types,
}: {
  lang: Language;
  isRTL: boolean;
  categories: ProductCategoryMenuItem[];
  brands: ProductFilterMenuItem[];
  types: ProductFilterMenuItem[];
}) {
  const dir = isRTL ? "rtl" : "ltr";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`invisible absolute left-1/2 top-full z-[75] hidden w-[min(92vw,64rem)] translate-y-2 pt-3 opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/products:visible group-hover/products:translate-y-0 group-hover/products:opacity-100 group-hover/products:pointer-events-auto group-focus-within/products:visible group-focus-within/products:translate-y-0 group-focus-within/products:opacity-100 group-focus-within/products:pointer-events-auto lg:block ${
        isRTL ? "-translate-x-[56%]" : "-translate-x-1/2"
      }`}
      dir={dir}
    >
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/98 shadow-[0_24px_70px_rgba(12,18,24,0.14)] backdrop-blur-xl">
        <div
          className={`grid ${
            isRTL ? "grid-cols-[1fr_18rem]" : "grid-cols-[17rem_1fr]"
          } ${
            isRTL ? "text-right" : "text-left"
          }`}
          style={{ direction: "ltr" }}
        >
          <div
            className={`flex min-h-[20rem] flex-col justify-between bg-muted/20 p-8 ${
              isRTL ? "order-2" : "border-r border-border/60"
            }`}
            dir={dir}
            style={
              isRTL
                ? {
                    borderLeft:
                      "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
                  }
                : undefined
            }
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {lang === "en" ? "Products" : "محصولات"}
              </p>
              <h3
                className={`mt-5 font-hero font-semibold text-foreground ${
                  isRTL
                    ? "max-w-[16rem] text-2xl leading-[1.35]"
                    : "max-w-[13rem] text-3xl leading-[1.08]"
                }`}
                style={{
                  fontFamily: isRTL
                    ? "Estedad, var(--font-hero)"
                    : "var(--font-hero)",
                }}
              >
                {lang === "en"
                  ? "Explore our essential food portfolio"
                  : "سبد محصولات غذایی ما را ببینید"}
              </h3>
            </div>

            <a
              href={`/${lang}/products#product-catalog`}
              className={`inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border/50 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {lang === "en" ? "See all" : "مشاهده همه"}
              <ArrowIcon className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>

          <div
            className={`p-7 ${isRTL ? "order-1" : "order-2"}`}
            dir={dir}
          >
            <div className="grid grid-cols-[1.15fr_0.8fr_1fr] gap-7">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {lang === "en" ? "Categories" : "دسته‌بندی‌ها"}
                </p>
                <div className="grid gap-1.5">
                  {categories.map((item) => (
                    <a
                      key={item.category}
                      href={item.href}
                      title={item.description}
                      className="group/category flex min-w-0 items-center gap-3 rounded-lg p-1.5 transition-colors duration-200 hover:bg-muted/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15"
                    >
                      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-muted shadow-sm ring-1 ring-border/50">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="block h-full w-full bg-muted" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-semibold leading-snug text-foreground ${
                            isRTL ? "" : "truncate"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {item.countLabel}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <MegaMenuFilterColumn
                title={lang === "en" ? "Brands" : "برندها"}
                items={brands}
              />

              <MegaMenuFilterColumn
                title={lang === "en" ? "Product type" : "نوع محصول"}
                items={types}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaMenuFilterColumn({
  title,
  items,
}: {
  title: string;
  items: ProductFilterMenuItem[];
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="grid gap-1">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className="flex min-w-0 items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15"
          >
            <MenuFilterThumbnail item={item} />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {item.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MenuFilterThumbnail({
  item,
  size = "md",
}: {
  item: ProductFilterMenuItem;
  size?: "sm" | "md";
}) {
  const imageSize = size === "sm" ? 22 : 26;
  const boxClass = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const isLogo = item.imageFit === "contain";

  return (
    <span
      className={`relative flex ${boxClass} shrink-0 items-center justify-center overflow-hidden rounded-md ${
        isLogo ? "bg-white/90 p-1" : "bg-muted"
      } shadow-sm ring-1 ring-border/50`}
    >
      {item.image ? (
        isLogo ? (
          <Image
            src={item.image}
            alt=""
            width={imageSize}
            height={imageSize}
            sizes={`${imageSize}px`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt=""
            fill
            sizes={size === "sm" ? "28px" : "32px"}
            className="object-cover"
          />
        )
      ) : (
        <span className="block h-full w-full bg-muted" />
      )}
    </span>
  );
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function productSearchText(product: Product) {
  const category = categoryLabels[product.category];
  const brand = productBrandLabels[getProductBrand(product)];
  const type = productTypeLabels[getProductType(product)];

  return [
    product.slug,
    product.nameEn,
    product.nameFa,
    product.aliasEn,
    product.aliasFa,
    product.descriptionEn,
    product.descriptionFa,
    category.en,
    category.fa,
    brand.en,
    brand.fa,
    type.en,
    type.fa,
    product.category,
  ]
    .filter(Boolean)
    .join(" ");
}

type ProductSearchEntry = {
  product: Product;
  text: string;
};

function searchProducts(query: string, entries: ProductSearchEntry[]) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return [];

  return entries
    .filter((entry) => entry.text.includes(normalizedQuery))
    .map((entry) => entry.product);
}

function SearchResultsPopover({
  lang,
  query,
  results,
  onClose,
  compact = false,
}: {
  lang: Language;
  query: string;
  results: Product[];
  onClose: () => void;
  compact?: boolean;
}) {
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className={`absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-lg border border-border/70 bg-background/98 shadow-2xl ${
        compact ? "max-h-[22rem]" : "max-h-[28rem]"
      }`}
      role="dialog"
      aria-modal="false"
      aria-label={lang === "en" ? "Search results" : "نتایج جستجو"}
    >
      <div
        className={`border-b border-border/60 px-3 py-2.5 ${
          isRTL ? "text-right" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {lang === "en" ? "Search results" : "نتایج جستجو"}
          </p>
          <p className="mt-0.5 truncate text-xs text-foreground/65">
            {lang === "en"
              ? `${results.length} matches for "${query}"`
              : `${results.length} نتیجه برای «${query}»`}
          </p>
        </div>
      </div>

      <div className="max-h-[21rem] overflow-y-auto p-2">
        {results.length > 0 ? (
          <div className="space-y-1.5">
            {results.map((product) => (
              <SearchResult
                key={product.id}
                product={product}
                lang={lang}
                onSelect={onClose}
              />
            ))}
          </div>
        ) : (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            {lang === "en"
              ? "No matching products found."
              : "محصولی مطابق جستجو پیدا نشد."}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResult({
  product,
  lang,
  onSelect,
}: {
  product: Product;
  lang: Language;
  onSelect: () => void;
}) {
  const isRTL = lang === "fa";
  const name = lang === "en" ? product.nameEn : product.nameFa;
  const alias = lang === "en" ? product.aliasEn : product.aliasFa;
  const description =
    lang === "en" ? product.descriptionEn : product.descriptionFa;
  const category =
    lang === "en"
      ? categoryLabels[product.category].en
      : categoryLabels[product.category].fa;

  return (
    <a
      href={`/${lang}/products/${product.slug}`}
      onClick={onSelect}
      className={`flex gap-3 rounded-md border border-transparent p-2.5 transition-colors hover:border-border/70 hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 ${
        isRTL ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-secondary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`mb-1 flex items-center gap-2 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span className="truncate text-sm font-semibold text-foreground">
            {name}
          </span>
          <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {category}
          </span>
        </div>
        {alias && (
          <p className="truncate text-xs text-foreground/55">{alias}</p>
        )}
        <p
          dir={isRTL ? "rtl" : "ltr"}
          className={`mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground ${
            isRTL ? "text-right" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </a>
  );
}
