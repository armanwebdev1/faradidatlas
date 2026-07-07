import type { Language } from "@/lib/i18n";
import type {
  ProductBrand,
  ProductCategory,
  ProductType,
} from "@/components/products/product-data";

export interface HeaderProps {
  lang: Language;
  products?: any[];
}

export type HeaderMode = "full" | "compact" | "hidden";

export const categoryDescriptions: Record<
  ProductCategory,
  { en: string; fa: string; ar: string }
> = {
  rice: {
    en: "Branded basmati, jasmine, and long-grain rice lines.",
    fa: "برنج‌های برنددار باسماتی، جاسمین و دانه‌بلند.",
    ar: "خطوط أرز بسمتي وياسمين وذيل طويل من العلامات التجارية.",
  },
  legumes: {
    en: "Everyday pulses prepared for retail and wholesale supply.",
    fa: "حبوبات پرمصرف برای عرضه فروشگاهی و عمده.",
    ar: "بقوليات يومية معدة للتوريد بالتجزئة والجملة.",
  },
  seeds: {
    en: "Snack, bakery, and ingredient-ready kernels.",
    fa: "دانه‌ها و مغز تخمه‌ها برای مصرف، تنقلات و تولید.",
    ar: "بذور جاهزة للوجبات الخفيفة والمخابز والمكونات.",
  },
  nuts: {
    en: "Packaged nut products for reliable commercial channels.",
    fa: "مغزها و آجیل بسته‌بندی‌شده برای کانال‌های تجاری.",
    ar: "منتجات مكسرات معبأة لقنوات تجارية موثوقة.",
  },
  spices: {
    en: "Core spices and seasonings with consistent packaged supply.",
    fa: "ادویه‌ها و چاشنی‌های اصلی با تأمین بسته‌بندی‌شده.",
    ar: "توابل أساسية ونكهات مع توريد معبأ ثابت.",
  },
  sugar: {
    en: "Sweetener supply options for staple food procurement.",
    fa: "گزینه‌های تأمین شکر و شیرین‌کننده‌ها.",
    ar: "خيارات توريد السكر والمحليات للأغذية الأساسية.",
  },
};

export const brandThumbnails: Record<ProductBrand, string> = {
  "twenty-one": "/brands/twenty-one-4k.png",
  mizban: "/brands/mizban-4k.png",
  golbanoo: "/brands/golbanoo-4k.png",
  hayat: "/brands/hayat-4k.png",
};

export const categoryFallbackImages: Record<ProductCategory, string> = {
  rice: "/product_images/optimized/twenty-one-sella-basmati.webp",
  legumes: "/product_images/optimized/red-lentil.webp",
  seeds: "/product_images/optimized/sunflower-seeds.webp",
  nuts: "/product_images/optimized/cashew-nuts.webp",
  spices: "/product_images/optimized/cardamom.webp",
  sugar: "/product_images/optimized/sugar.webp",
};

export const typeFallbackImages: Record<ProductType, string> = {
  "basmati-rice": "/product_images/optimized/twenty-one-sella-basmati.webp",
  "jasmine-rice": "/product_images/optimized/hayat-thai-jasmine.webp",
  beans: "/product_images/optimized/pinto-beans.webp",
  lentils: "/product_images/optimized/red-lentil.webp",
  chickpeas: "/product_images/optimized/chickpeas.webp",
  "seeds-kernels": "/product_images/optimized/sunflower-seed-kernels.webp",
  nuts: "/product_images/optimized/cashew-nuts.webp",
  spices: "/product_images/optimized/cardamom.webp",
  sweeteners: "/product_images/optimized/sugar.webp",
};

export type ProductCategoryMenuItem = {
  category: ProductCategory;
  label: string;
  description: string;
  count: number;
  countLabel: string;
  href: string;
  image?: string;
};

export type ProductFilterMenuItem = {
  key: ProductBrand | ProductType;
  label: string;
  count: number;
  countLabel: string;
  href: string;
  image?: string;
  imageFit?: "contain" | "cover";
};
