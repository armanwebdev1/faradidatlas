import type { ProductCategory, ProductBrand, ProductType } from "./product-types";

export const productBrandLabels: Record<
  ProductBrand,
  { en: string; fa: string; ar: string }
> = {
  "twenty-one": { en: "21", fa: "۲۱", ar: "٢١" },
  mizban: { en: "Mizban", fa: "میزبان", ar: "ميزبان" },
  golbanoo: { en: "Golbanoo", fa: "گلبانو", ar: "گلبنو" },
  hayat: { en: "Hayat", fa: "حیات", ar: "حياة" },
};

export const productTypeLabels: Record<
  ProductType,
  { en: string; fa: string; ar: string }
> = {
  "basmati-rice": { en: "Basmati Rice", fa: "برنج باسماتی", ar: "أرز بسمتي" },
  "jasmine-rice": { en: "Jasmine Rice", fa: "برنج جاسمین", ar: "أرز ياسمين" },
  beans: { en: "Beans", fa: "لوبیا و ماش", ar: "فاصوليا و عدس" },
  lentils: { en: "Lentils", fa: "عدس", ar: "عدس" },
  chickpeas: { en: "Chickpeas", fa: "نخود", ar: "حمص" },
  "seeds-kernels": { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
  nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
  spices: { en: "Spices", fa: "ادویه‌ها", ar: "توابل" },
  sweeteners: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر و محليات" },
};

export const categoryLabels: Record<
  ProductCategory,
  { en: string; fa: string; ar: string }
> = {
  rice: { en: "Rice", fa: "برنج", ar: "أرز" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات", ar: "بقوليات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
  nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها", ar: "توابل وبهارات" },
  sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر ومحليات" },
};
