export type ProductCategory =
  | "rice"
  | "legumes"
  | "seeds"
  | "nuts"
  | "spices"
  | "sugar";

export const productCategories: ProductCategory[] = [
  "rice",
  "legumes",
  "seeds",
  "nuts",
  "spices",
  "sugar",
];

export interface ProductSpec {
  label: { en: string; fa: string; ar: string };
  value: { en: string; fa: string; ar: string };
}

export interface Product {
  id: number;
  slug: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  aliasEn?: string;
  aliasFa?: string;
  aliasAr?: string;
  category: ProductCategory;
  descriptionEn: string;
  descriptionFa: string;
  descriptionAr: string;
  image?: string;
  images?: string[];
  specs?: ProductSpec[];
}

export type ProductBrand = "twenty-one" | "mizban" | "golbanoo" | "hayat";

export const productBrands: ProductBrand[] = [
  "twenty-one",
  "mizban",
  "golbanoo",
  "hayat",
];

export type ProductType =
  | "basmati-rice"
  | "jasmine-rice"
  | "beans"
  | "lentils"
  | "chickpeas"
  | "seeds-kernels"
  | "nuts"
  | "spices"
  | "sweeteners";

export const productTypes: ProductType[] = [
  "basmati-rice",
  "jasmine-rice",
  "beans",
  "lentils",
  "chickpeas",
  "seeds-kernels",
  "nuts",
  "spices",
  "sweeteners",
];

export function getProductBrand(product: Product): ProductBrand {
  if (product.nameEn.startsWith("Mizban")) return "mizban";
  if (product.nameEn.startsWith("Golbanoo")) return "golbanoo";
  if (product.nameEn.startsWith("Hayat")) return "hayat";

  return "twenty-one";
}

export function getProductType(product: Product): ProductType {
  const searchText = `${product.nameEn} ${product.aliasEn ?? ""}`.toLowerCase();

  if (product.category === "rice") {
    return searchText.includes("jasmine") ? "jasmine-rice" : "basmati-rice";
  }

  if (product.category === "legumes") {
    if (searchText.includes("lentil")) return "lentils";
    if (searchText.includes("chickpea")) return "chickpeas";

    return "beans";
  }

  if (product.category === "seeds") return "seeds-kernels";
  if (product.category === "nuts") return "nuts";
  if (product.category === "sugar") return "sweeteners";

  return "spices";
}
