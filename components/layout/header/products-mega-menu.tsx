"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import type {
  ProductCategoryMenuItem,
  ProductFilterMenuItem,
} from "./header-data";

export function ProductsMegaMenu({
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
  const t = translations[lang];
  const dir = isRTL ? "rtl" : "ltr";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`invisible absolute left-1/2 top-full z-75 hidden w-[min(92vw,64rem)] translate-y-2 pt-3 opacity-0 pointer-events-none transition-all duration-300 ease-[var(--ease-decelerate)] group-hover/products:visible group-hover/products:translate-y-0 group-hover/products:opacity-100 group-hover/products:pointer-events-auto group-focus-within/products:visible group-focus-within/products:translate-y-0 group-focus-within/products:opacity-100 group-focus-within/products:pointer-events-auto lg:block ${
        isRTL ? "-translate-x-[56%]" : "-translate-x-1/2"
      }`}
      dir={dir}
    >
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/98 shadow-lg backdrop-blur-xl">
        <div
          className={`grid h-[min(26rem,calc(100vh-7rem))] min-h-70 ${
            isRTL ? "grid-cols-[1fr_18rem]" : "grid-cols-[17rem_1fr]"
          } ${isRTL ? "text-right" : "text-left"}`}
          style={{ direction: "ltr" }}
        >
          <div
            className={`flex min-h-0 flex-col justify-between bg-muted/20 p-6 ${
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
                {t.nav.products}
              </p>
              <h3
                className={`mt-4 font-hero font-semibold text-foreground ${
                  isRTL
                    ? "max-w-60 text-[1.45rem] leading-[1.35]"
                    : "max-w-52 text-[1.7rem] leading-[1.08]"
                }`}
                style={{
                  fontFamily: isRTL
                    ? "Estedad, var(--font-hero)"
                    : "var(--font-hero)",
                }}
              >
                {t.header.explorePortfolio}
              </h3>
            </div>

            <a
              href={`/${lang}/products#product-catalog`}
              className={`inline-flex w-fit items-center gap-2 rounded-full bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border/50 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {t.header.seeAll}
              <ArrowIcon className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>

          <div
            className={`min-h-0 overflow-hidden p-6 ${isRTL ? "order-1" : "order-2"}`}
            dir={dir}
          >
            <div className="grid h-full min-h-0 grid-cols-[1.15fr_0.8fr_1fr] gap-6">
              <div className="flex min-h-0 flex-col">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t.header.categories}
                </p>
                <div className="grid min-h-0 flex-1 content-start gap-1.5 overflow-y-auto pr-1 [scrollbar-color:rgba(12,18,24,0.18)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/15 [&::-webkit-scrollbar-track]:bg-transparent">
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
                            alt={item.label}
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
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <MegaMenuFilterColumn
                title={t.header.brands}
                items={brands}
              />

              <MegaMenuFilterColumn
                title={t.header.productType}
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
    <div className="flex min-h-0 flex-col">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="grid min-h-0 flex-1 content-start gap-1 overflow-y-auto pr-1 [scrollbar-color:rgba(12,18,24,0.18)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/15 [&::-webkit-scrollbar-track]:bg-transparent">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className="flex min-w-0 items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15"
          >
            <MenuFilterThumbnail item={item} />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function MenuFilterThumbnail({
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
            alt={item.label}
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
