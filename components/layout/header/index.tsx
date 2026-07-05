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
} from "@/components/products/product-data";
import {
  Briefcase,
  BookOpen,
  ChevronDown,
  HelpCircle,
  Home,
  Info,
  Phone,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  type HeaderProps,
  type HeaderMode,
  categoryDescriptions,
  brandThumbnails,
} from "./header-data";
import { normalizeSearchText, productSearchText, searchProducts } from "./search-utils";
import { useHeaderScroll } from "./use-header-scroll";
import { LanguagePicker } from "./language-picker";
import { SearchResultsPopover } from "./search-results";
import { ProductsMegaMenu, MenuFilterThumbnail } from "./products-mega-menu";

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const headerMode = useHeaderScroll();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const desktopSearchBoxRef = useRef<HTMLDivElement>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const brandHomeLabel =
    lang === "en" ? "Faradid Atlas home" : lang === "fa" ? "خانه فرادید اطلس" : "الرئيسية فراديد اطلس";
  const brandPrimary = lang === "en" ? "Faradid" : lang === "fa" ? "فرادید" : "فراديد";
  const brandSecondary = lang === "en" ? "Atlas" : lang === "fa" ? "اطلس" : "اطلس";
  const brandFullName = lang === "en" ? "Faradid Atlas" : lang === "fa" ? "فرادید اطلس" : "فراديد اطلس";

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
    { href: `/${lang}/blog`, label: t.nav.blog, key: "blog", Icon: BookOpen },
    {
      href: `/${lang}/contact`,
      label: t.nav.contact,
      key: "contact",
      Icon: Phone,
    },
  ];

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(lang === "fa" ? "fa-IR" : lang === "ar" ? "ar-SA" : "en-US"),
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
  const clearSearchLabel = t.header.clearSearch;
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
        className={`fixed top-0 inset-x-0 z-60 transform-gpu will-change-transform transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${headerVisibilityClass}`}
      >
        <div className="relative z-50 border-b border-border/35 bg-background/85 shadow-[0_18px_55px_-45px_rgba(12,18,24,0.55)] backdrop-blur-xl">
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
              <span className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-linear-to-r from-primary/0 via-primary/10 to-accent/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -bottom-1 left-2 right-2 z-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>

            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="relative z-80 hidden flex-1 justify-center px-4 md:flex"
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

            <LanguagePicker
              lang={lang}
              isRTL={isRTL}
              dir={dir}
              t={t}
            />

            <details className="group/mobile-menu lg:hidden">
              <summary
                className="relative inline-flex h-11 w-11 shrink-0 cursor-pointer list-none items-center justify-center rounded-full border border-border/60 bg-background/75 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-navy/25 hover:bg-brand-navy/5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25 [&::-webkit-details-marker]:hidden"
                aria-label="Toggle menu"
              >
                <span className="relative h-4 w-5">
                  <span className="absolute left-0 top-0 h-px w-5 rounded-full bg-current transition-transform duration-300 group-open/mobile-menu:translate-y-1.75 group-open/mobile-menu:rotate-45" />
                  <span className="absolute left-0 top-1.75 h-px w-5 rounded-full bg-current transition-all duration-300 group-open/mobile-menu:scale-x-0 group-open/mobile-menu:opacity-0" />
                  <span className="absolute left-0 top-3.5 h-px w-5 rounded-full bg-current transition-transform duration-300 group-open/mobile-menu:-translate-y-1/75 group-open/mobile-menu:-rotate-45" />
                </span>
              </summary>
              <div className="fixed inset-x-3 top-[4.55rem] z-70 max-h-[calc(100svh-5.25rem)] overflow-hidden rounded-2xl border border-border/70 bg-background/96 shadow-[0_28px_90px_rgba(12,18,24,0.18)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-300">
                <div className="max-h-[calc(100svh-5.25rem)] overflow-y-auto">
                  <div className="border-b border-border/60 bg-muted/20 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t.footer.navigation}
                    </p>
                  </div>
                  <div className="px-4 pt-4">
                    <form role="search" onSubmit={handleSearchSubmit}>
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
                            className={`group/mobile-products overflow-hidden rounded-xl border transition-all duration-300 ${
                              isActive
                                ? "border-brand-navy/20 bg-brand-navy/4 shadow-sm"
                                : "border-border/60 bg-background/70"
                            }`}
                            open={isActive || undefined}
                          >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-foreground transition-colors hover:bg-muted/45 [&::-webkit-details-marker]:hidden">
                              <span className="flex min-w-0 items-center gap-3">
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                                    isActive
                                      ? "bg-brand-navy text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  <Icon size={18} strokeWidth={1.7} />
                                </span>
                                <span className="truncate font-semibold">
                                  {label}
                                </span>
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
                                  {t.header.allProducts}
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
                                          alt={item.label}
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
                                    </span>
                                  </a>
                                ))}
                              </div>

                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border border-border/50 bg-background/80 p-2">
                                  <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    {t.header.brands}
                                  </p>
                                  <div className="space-y-1">
                                    {productBrandMenuItems.map((item) => (
                                      <a
                                        key={item.key}
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/45"
                                      >
                                        <MenuFilterThumbnail
                                          item={item}
                                          size="sm"
                                        />
                                        <span className="min-w-0 flex-1 truncate">
                                          {item.label}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                <div className="rounded-lg border border-border/50 bg-background/80 p-2">
                                  <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    {t.header.productType}
                                  </p>
                                  <div className="space-y-1">
                                    {productTypeMenuItems.map((item) => (
                                      <a
                                        key={item.key}
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/45"
                                      >
                                        <MenuFilterThumbnail
                                          item={item}
                                          size="sm"
                                        />
                                        <span className="min-w-0 flex-1 truncate">
                                          {item.label}
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
                          className={`group/mobile-link flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-300 ${
                            isActive
                              ? "bg-brand-navy/6 text-brand-navy shadow-sm ring-1 ring-brand-navy/15"
                              : "text-foreground hover:bg-muted/55"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                              isActive
                                ? "bg-brand-navy text-white"
                                : "bg-muted text-muted-foreground group-hover/mobile-link:bg-background group-hover/mobile-link:text-brand-navy"
                            }`}
                          >
                            <Icon size={18} strokeWidth={1.7} />
                          </span>
                          <span className="font-semibold">{label}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </details>
          </div>
        </div>

        <nav
          className={`relative z-10 hidden border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
            effectiveHeaderMode === "compact"
              ? "border-border/40 bg-background/92 shadow-[0_18px_44px_-30px_rgba(12,18,24,0.45)]"
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
                          isActive ? "text-brand-navy" : "text-muted-foreground"
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
                        className="shrink-0 origin-center transform-gpu text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:text-brand-navy group-hover/products:rotate-180"
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
                      isActive ? "text-brand-navy" : "text-muted-foreground"
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
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
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
