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

export interface Product {
  id: number;
  nameEn: string;
  nameFa: string;
  aliasEn?: string;
  aliasFa?: string;
  category: ProductCategory;
  descriptionEn: string;
  descriptionFa: string;
  image?: string;
  images?: string[];
}

export type ProductBrand = "twenty-one" | "mizban" | "golbanoo" | "hayat";

export const productBrands: ProductBrand[] = [
  "twenty-one",
  "mizban",
  "golbanoo",
  "hayat",
];

export const productBrandLabels: Record<
  ProductBrand,
  { en: string; fa: string }
> = {
  "twenty-one": { en: "21", fa: "۲۱" },
  mizban: { en: "Mizban", fa: "میزبان" },
  golbanoo: { en: "Golbanoo", fa: "گلبانو" },
  hayat: { en: "Hayat", fa: "حیات" },
};

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

export const productTypeLabels: Record<
  ProductType,
  { en: string; fa: string }
> = {
  "basmati-rice": { en: "Basmati Rice", fa: "برنج باسماتی" },
  "jasmine-rice": { en: "Jasmine Rice", fa: "برنج جاسمین" },
  beans: { en: "Beans", fa: "لوبیا و ماش" },
  lentils: { en: "Lentils", fa: "عدس" },
  chickpeas: { en: "Chickpeas", fa: "نخود" },
  "seeds-kernels": { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها" },
  nuts: { en: "Nuts", fa: "مغزها" },
  spices: { en: "Spices", fa: "ادویه‌ها" },
  sweeteners: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها" },
};

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

export const categoryLabels: Record<
  ProductCategory,
  { en: string; fa: string }
> = {
  rice: { en: "Rice", fa: "برنج" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها" },
  nuts: { en: "Nuts", fa: "مغزها" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها" },
  sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها" },
};

export const productImages = {
  mizbanSuperBasmati: "/product_images/optimized/mizban-super-basmati.webp",
  mizbanWhiteBasmati: "/product_images/optimized/mizban-white-basmati.webp",
  whiteBeansBox: "/product_images/optimized/white-beans-box.webp",
  golbanoo386Basmati: "/product_images/optimized/golbanoo-386-basmati.webp",
  hayatThaiJasmine: "/product_images/optimized/hayat-thai-jasmine.webp",
  turmeric: "/product_images/optimized/turmeric.webp",
  walnutKernels: "/product_images/optimized/walnut-kernels.webp",
  sunflowerSeedKernels: "/product_images/optimized/sunflower-seed-kernels.webp",
  pumpkinSeedKernels: "/product_images/optimized/pumpkin-seed-kernels.webp",
  cashewNuts: "/product_images/optimized/cashew-nuts.webp",
  redLentil: "/product_images/optimized/red-lentil.webp",
  chickpeas: "/product_images/optimized/chickpeas.webp",
  whiteBeanBag: "/product_images/optimized/white-bean-bag.webp",
  mungBean: "/product_images/optimized/mung-bean.webp",
  kidneyBean: "/product_images/optimized/kidney-bean.webp",
  desiChickpea: "/product_images/optimized/desi-chickpea.webp",
  popcornCorn: "/product_images/optimized/popcorn-corn.webp",
  golbanooSellaBasmati: "/product_images/optimized/golbanoo-sella-basmati.webp",
  twentyOneSellaBasmati:
    "/product_images/optimized/twenty-one-sella-basmati.webp",
  blackPepper: "/product_images/optimized/black-pepper.webp",
} as const;

function imageSet(image: string) {
  return { image, images: [image] };
}

export const products: Product[] = [
  {
    id: 1,
    nameEn: "Mizban Super Basmati Rice",
    nameFa: "برنج سوپر باسماتی میزبان",
    aliasEn: "Long Grain Basmati Rice",
    aliasFa: "برنج باسماتی دانه‌بلند",
    category: "rice",
    descriptionEn:
      "Mizban Super Basmati is a premium long-grain rice pack selected for consistent cooking quality, clean aroma, and dependable retail-ready supply.",
    descriptionFa:
      "برنج سوپر باسماتی میزبان، محصولی ممتاز و دانه‌بلند است که برای پخت یکنواخت، عطر مطلوب و عرضه‌ای قابل اتکا در بازار انتخاب می‌شود.",
    ...imageSet(productImages.mizbanSuperBasmati),
  },
  {
    id: 2,
    nameEn: "Mizban 1121 White Basmati Rice",
    nameFa: "برنج سفید باسماتی ۱۱۲۱ میزبان",
    aliasEn: "Premium Quality 1121 Basmati",
    aliasFa: "باسماتی ۱۱۲۱ ممتاز",
    category: "rice",
    descriptionEn:
      "A Mizban-branded 1121 white basmati rice line for buyers who need long-grain rice with dependable branded packaging and steady availability.",
    descriptionFa:
      "برنج سفید باسماتی ۱۱۲۱ میزبان برای خریدارانی عرضه می‌شود که به برنج دانه‌بلند، بسته‌بندی برنددار و موجودی پایدار نیاز دارند.",
    ...imageSet(productImages.mizbanWhiteBasmati),
  },
  {
    id: 3,
    nameEn: "21 White Beans Carton",
    nameFa: "لوبیا سفید کارتنی ۲۱",
    aliasEn: "White Beans",
    aliasFa: "لوبیا سفید",
    category: "legumes",
    descriptionEn:
      "A 21-branded white beans carton prepared for organized retail, wholesale, and B2B channels that need clean presentation and reliable legume supply.",
    descriptionFa:
      "لوبیا سفید کارتنی برند ۲۱ برای فروشگاه‌ها، عمده‌فروشان و خریداران تجاری آماده شده است؛ محصولی با ارائه منظم و تأمین قابل اعتماد.",
    ...imageSet(productImages.whiteBeansBox),
  },
  {
    id: 4,
    nameEn: "Golbanoo 386 Basmati Rice",
    nameFa: "برنج باسماتی ۳۸۶ گلبانو",
    aliasEn: "Long Grain Rice",
    aliasFa: "برنج دانه‌بلند",
    category: "rice",
    descriptionEn:
      "Golbanoo 386 Basmati Rice is a long-grain rice pack positioned for everyday retail demand and steady commercial distribution.",
    descriptionFa:
      "برنج باسماتی ۳۸۶ گلبانو محصولی دانه‌بلند است که برای پاسخ‌گویی به تقاضای روزمره فروشگاهی و توزیع تجاری منظم عرضه می‌شود.",
    ...imageSet(productImages.golbanoo386Basmati),
  },
  {
    id: 5,
    nameEn: "Hayat Thai Jasmine Rice",
    nameFa: "برنج جاسمین تایلندی حیات",
    aliasEn: "Thai Jasmine Long Grain Rice",
    aliasFa: "برنج جاسمین تایلندی دانه‌بلند",
    category: "rice",
    descriptionEn:
      "Hayat Thai Jasmine Rice is selected for buyers looking for aromatic long-grain rice with recognizable branded packaging.",
    descriptionFa:
      "برنج جاسمین تایلندی حیات برای خریدارانی انتخاب شده است که به برنج دانه‌بلند خوش‌عطر با بسته‌بندی برنددار و قابل تشخیص نیاز دارند.",
    ...imageSet(productImages.hayatThaiJasmine),
  },
  {
    id: 6,
    nameEn: "21 Turmeric",
    nameFa: "زردچوبه ۲۱",
    aliasEn: "Ground Turmeric",
    aliasFa: "زردچوبه آسیاب‌شده",
    category: "spices",
    descriptionEn:
      "21 Turmeric is a core spice product for foodservice, retail, and wholesale buyers seeking consistent color, flavor, and packaged supply.",
    descriptionFa:
      "زردچوبه ۲۱ از اقلام اصلی ادویه است و برای خریداران خدمات غذایی، فروشگاهی و عمده که به رنگ، طعم و بسته‌بندی یکدست نیاز دارند عرضه می‌شود.",
    ...imageSet(productImages.turmeric),
  },
  {
    id: 7,
    nameEn: "21 Walnut Kernels",
    nameFa: "مغز گردو ۲۱",
    aliasEn: "Premium Walnut Kernels",
    aliasFa: "مغز گردوی ممتاز",
    category: "nuts",
    descriptionEn:
      "21 Walnut Kernels are packed for buyers who need ready-to-use nut kernels with clean branding and reliable commercial supply.",
    descriptionFa:
      "مغز گردو ۲۱ برای خریدارانی بسته‌بندی شده است که به محصولی آماده مصرف، برندینگ منظم و تأمین تجاری قابل اعتماد نیاز دارند.",
    ...imageSet(productImages.walnutKernels),
  },
  {
    id: 8,
    nameEn: "21 Sunflower Seed Kernels",
    nameFa: "مغز تخمه آفتابگردان ۲۱",
    aliasEn: "Sunflower Kernels",
    aliasFa: "مغز تخمه آفتابگردان",
    category: "seeds",
    descriptionEn:
      "21 Sunflower Seed Kernels support snack, bakery, retail, and ingredient buyers with packaged kernels and dependable availability.",
    descriptionFa:
      "مغز تخمه آفتابگردان ۲۱ برای خریداران حوزه تنقلات، نانوایی، فروشگاهی و مواد اولیه عرضه می‌شود؛ با بسته‌بندی منظم و دسترسی پایدار.",
    ...imageSet(productImages.sunflowerSeedKernels),
  },
  {
    id: 9,
    nameEn: "21 Pumpkin Seed Kernels",
    nameFa: "مغز تخمه کدو ۲۱",
    aliasEn: "Pumpkin Kernels",
    aliasFa: "مغز تخمه کدو",
    category: "seeds",
    descriptionEn:
      "21 Pumpkin Seed Kernels are packaged for buyers who need a clean, ready-to-use seed kernel product for retail and food production.",
    descriptionFa:
      "مغز تخمه کدو ۲۱ برای خریدارانی عرضه می‌شود که به محصولی تمیز، آماده مصرف و مناسب فروشگاه یا تولید مواد غذایی نیاز دارند.",
    ...imageSet(productImages.pumpkinSeedKernels),
  },
  {
    id: 10,
    nameEn: "21 Cashew Nuts",
    nameFa: "بادام هندی ۲۱",
    aliasEn: "Cashews",
    aliasFa: "بادام هندی",
    category: "nuts",
    descriptionEn:
      "21 Cashew Nuts are positioned for retail and wholesale buyers seeking a familiar nut product with polished packaging and steady supply.",
    descriptionFa:
      "بادام هندی ۲۱ برای خریداران فروشگاهی و عمده عرضه می‌شود؛ محصولی شناخته‌شده با بسته‌بندی مرتب و تأمین پایدار.",
    ...imageSet(productImages.cashewNuts),
  },
  {
    id: 11,
    nameEn: "21 Red Lentil",
    nameFa: "عدس قرمز ۲۱",
    aliasEn: "Red Lentils",
    aliasFa: "عدس قرمز",
    category: "legumes",
    descriptionEn:
      "21 Red Lentil is a high-demand pulse product for everyday cooking, foodservice use, and B2B staple-food procurement.",
    descriptionFa:
      "عدس قرمز ۲۱ از حبوبات پرتقاضا برای مصرف روزمره، خدمات غذایی و تأمین عمده اقلام غذایی اساسی است.",
    ...imageSet(productImages.redLentil),
  },
  {
    id: 12,
    nameEn: "21 Chickpeas",
    nameFa: "نخود ۲۱",
    aliasEn: "Pea / Chickpea",
    aliasFa: "نخود",
    category: "legumes",
    descriptionEn:
      "21 Chickpeas are packed for buyers seeking a reliable pulse line for retail shelves, foodservice kitchens, and wholesale channels.",
    descriptionFa:
      "نخود ۲۱ برای خریدارانی بسته‌بندی شده است که به تأمین قابل اتکای حبوبات برای فروشگاه‌ها، آشپزخانه‌های خدمات غذایی و کانال‌های عمده نیاز دارند.",
    ...imageSet(productImages.chickpeas),
  },
  {
    id: 13,
    nameEn: "21 White Bean Bag",
    nameFa: "لوبیا سفید کیسه‌ای ۲۱",
    aliasEn: "White Bean",
    aliasFa: "لوبیا سفید",
    category: "legumes",
    descriptionEn:
      "21 White Bean Bag is a staple legume pack for buyers who need practical bagged supply across wholesale and retail distribution.",
    descriptionFa:
      "لوبیا سفید کیسه‌ای ۲۱ از حبوبات پرمصرف است و برای خریدارانی عرضه می‌شود که به تأمین کیسه‌ای، کاربردی و مناسب توزیع عمده و فروشگاهی نیاز دارند.",
    ...imageSet(productImages.whiteBeanBag),
  },
  {
    id: 14,
    nameEn: "21 Mung Bean",
    nameFa: "ماش ۲۱",
    aliasEn: "Mung Beans",
    aliasFa: "ماش",
    category: "legumes",
    descriptionEn:
      "21 Mung Bean is a versatile pulse product selected for stable access to everyday food staples and clean packaged presentation.",
    descriptionFa:
      "ماش ۲۱ از حبوبات کاربردی است که برای دسترسی پایدار به اقلام غذایی روزمره و عرضه‌ای تمیز و بسته‌بندی‌شده انتخاب می‌شود.",
    ...imageSet(productImages.mungBean),
  },
  {
    id: 15,
    nameEn: "21 Kidney Bean",
    nameFa: "لوبیا قرمز ۲۱",
    aliasEn: "Red Kidney Beans",
    aliasFa: "لوبیا قرمز",
    category: "legumes",
    descriptionEn:
      "21 Kidney Bean is a core legume product for retail, wholesale, and foodservice buyers looking for consistent packaged supply.",
    descriptionFa:
      "لوبیا قرمز ۲۱ از اقلام اصلی حبوبات برای خریداران فروشگاهی، عمده و خدمات غذایی است که به تأمین بسته‌بندی‌شده و منظم نیاز دارند.",
    ...imageSet(productImages.kidneyBean),
  },
  {
    id: 16,
    nameEn: "21 Desi Chickpea",
    nameFa: "نخود دسی ۲۱",
    aliasEn: "Desi Chickpeas",
    aliasFa: "نخود دسی",
    category: "legumes",
    descriptionEn:
      "21 Desi Chickpea is a focused pulse product for buyers who need a darker chickpea variety with reliable branded packaging.",
    descriptionFa:
      "نخود دسی ۲۱ محصولی تخصصی از گروه حبوبات است و برای خریدارانی عرضه می‌شود که به این رقم نخود با بسته‌بندی برنددار و قابل اتکا نیاز دارند.",
    ...imageSet(productImages.desiChickpea),
  },
  {
    id: 17,
    nameEn: "21 Popcorn Corn",
    nameFa: "ذرت پاپ‌کورن ۲۱",
    aliasEn: "Popcorn Kernels",
    aliasFa: "دانه ذرت پاپ‌کورن",
    category: "seeds",
    descriptionEn:
      "21 Popcorn Corn is packaged for snack producers, retailers, and wholesale buyers seeking dependable popcorn kernel supply.",
    descriptionFa:
      "ذرت پاپ‌کورن ۲۱ برای تولیدکنندگان تنقلات، فروشگاه‌ها و خریداران عمده‌ای عرضه می‌شود که به تأمین قابل اتکای دانه پاپ‌کورن نیاز دارند.",
    ...imageSet(productImages.popcornCorn),
  },
  {
    id: 18,
    nameEn: "Golbanoo Sella Basmati Rice",
    nameFa: "برنج سیلا باسماتی گلبانو",
    aliasEn: "Long Grain Sella Rice",
    aliasFa: "برنج سیلا دانه‌بلند",
    category: "rice",
    descriptionEn:
      "Golbanoo Sella Basmati Rice is a branded long-grain sella rice line for buyers who need consistent quality and strong shelf presence.",
    descriptionFa:
      "برنج سیلا باسماتی گلبانو، محصولی دانه‌بلند و برنددار است که برای کیفیت یکنواخت و حضور مناسب در قفسه فروشگاهی عرضه می‌شود.",
    ...imageSet(productImages.golbanooSellaBasmati),
  },
  {
    id: 19,
    nameEn: "21 Sella Basmati Rice",
    nameFa: "برنج سیلا باسماتی ۲۱",
    aliasEn: "1121 Basmati Sella Rice",
    aliasFa: "برنج سیلا باسماتی ۱۱۲۱",
    category: "rice",
    descriptionEn:
      "21 Sella Basmati Rice is a 1121 basmati sella product built for buyers seeking long-grain rice with recognizable 21 branding.",
    descriptionFa:
      "برنج سیلا باسماتی ۲۱ محصولی از نوع باسماتی ۱۱۲۱ است و برای خریدارانی عرضه می‌شود که به برنج دانه‌بلند با برند شناخته‌شده ۲۱ نیاز دارند.",
    ...imageSet(productImages.twentyOneSellaBasmati),
  },
  {
    id: 20,
    nameEn: "21 Black Pepper",
    nameFa: "فلفل سیاه ۲۱",
    aliasEn: "Black Pepper",
    aliasFa: "فلفل سیاه",
    category: "spices",
    descriptionEn:
      "21 Black Pepper is a core seasoning product for retail and foodservice buyers who need reliable packaged spice supply.",
    descriptionFa:
      "فلفل سیاه ۲۱ از چاشنی‌های اصلی است و برای خریداران فروشگاهی و خدمات غذایی که به تأمین بسته‌بندی‌شده و قابل اعتماد ادویه نیاز دارند عرضه می‌شود.",
    ...imageSet(productImages.blackPepper),
  },
];
