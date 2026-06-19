import type { CSSProperties } from "react";
import type { Language } from "@/lib/i18n";
import { categoryLabels, type Product, type ProductCategory } from "./product-data";

interface ProductPlaceholderProps {
  product: Product;
  lang: Language;
  className?: string;
  variant?: "card" | "detail";
}

const placeholderThemes: Record<
  ProductCategory,
  { from: string; mid: string; to: string; accent: string }
> = {
  rice: {
    from: "#fff7d6",
    mid: "#ffffff",
    to: "#d9b56f",
    accent: "#c9a961",
  },
  legumes: {
    from: "#f8efe6",
    mid: "#ffffff",
    to: "#b85f4c",
    accent: "#a84a3a",
  },
  seeds: {
    from: "#edf6df",
    mid: "#ffffff",
    to: "#d5aa58",
    accent: "#7d8f48",
  },
  nuts: {
    from: "#f6eadb",
    mid: "#ffffff",
    to: "#a9714b",
    accent: "#8c5737",
  },
  spices: {
    from: "#fff0d8",
    mid: "#ffffff",
    to: "#c04f3e",
    accent: "#a84a3a",
  },
  sugar: {
    from: "#eef5f7",
    mid: "#ffffff",
    to: "#9fb5bb",
    accent: "#5e6a61",
  },
};

export function ProductPlaceholder({
  product,
  lang,
  className = "",
  variant = "card",
}: ProductPlaceholderProps) {
  const isRTL = lang === "fa";
  const name = lang === "en" ? product.nameEn : product.nameFa;
  const alias = lang === "en" ? product.aliasEn : product.aliasFa;
  const category =
    lang === "en"
      ? categoryLabels[product.category].en
      : categoryLabels[product.category].fa;
  const theme = placeholderThemes[product.category];
  const style = {
    "--placeholder-accent": theme.accent,
    background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.mid} 48%, ${theme.to} 100%)`,
  } as CSSProperties;
  const titleClass =
    variant === "detail"
      ? "text-2xl sm:text-3xl md:text-4xl"
      : "text-lg sm:text-xl";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255,255,255,.46) 0 1px, transparent 1px 28px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/18 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">
        <span className="truncate">{category}</span>
        <span className="shrink-0">Faradid Atlas</span>
      </div>

      <div className="absolute left-1/2 top-1/2 w-[78%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/70 bg-white/78 p-5 text-center shadow-[0_24px_60px_-38px_rgba(20,20,20,0.55)] backdrop-blur">
        <span
          className="mx-auto mb-4 block h-1.5 w-20 rounded-full"
          style={{ backgroundColor: "var(--placeholder-accent)" }}
          aria-hidden="true"
        />
        <p className="mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-foreground/50">
          {lang === "en" ? "Product profile" : "معرفی محصول"}
        </p>
        <p
          className={`${titleClass} font-semibold leading-tight text-primary`}
          style={{
            fontFamily:
              lang === "fa" ? "Estedad, var(--font-hero)" : "var(--font-hero)",
          }}
        >
          {name}
        </p>
        {alias && (
          <p className="mt-2 text-xs sm:text-sm font-medium text-foreground/55">
            {alias}
          </p>
        )}
      </div>
    </div>
  );
}
