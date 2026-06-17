export type ProductCategory =
  | "rice"
  | "legumes"
  | "seeds"
  | "nuts"
  | "spices"
  | "sugar";

export interface Product {
  id: number;
  nameEn: string;
  nameFa: string;
  aliasEn?: string;
  aliasFa?: string;
  category: ProductCategory;
  descriptionEn: string;
  descriptionFa: string;
  image: string;
  images: string[];
}

export const categoryLabels: Record<
  ProductCategory,
  { en: string; fa: string }
> = {
  rice: { en: "Rice", fa: "برنج" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغزها" },
  nuts: { en: "Nuts", fa: "آجیل" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌جات و چاشنی‌ها" },
  sugar: { en: "Sweeteners", fa: "شیرین‌کننده‌ها" },
};

export const productImages = {
  mizbanSuperBasmati:
    "/product_images/ChatGPT Image Jun 17, 2026, 01_19_30 PM.png",
  mizbanWhiteBasmati:
    "/product_images/ChatGPT Image Jun 17, 2026, 01_19_45 PM.png",
  whiteBeans:
    "/product_images/ChatGPT Image Jun 17, 2026, 01_54_42 PM (3).png",
  golbanoo386Basmati:
    "/product_images/ChatGPT Image Jun 17, 2026, 01_55_22 PM (5).png",
  hayatThaiJasmine:
    "/product_images/ChatGPT Image Jun 17, 2026, 01_55_22 PM (6).png",
  walnutKernels:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_01_59 PM (2).png",
  pumpkinSeedKernels:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_01 PM (4).png",
  cashewNuts:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_02 PM (5).png",
  turmeric:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_01_59 PM (1).png",
  sunflowerSeedKernels:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_00 PM (3).png",
  redLentil:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_18 PM (1).png",
  chickpeas:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_18 PM (2).png",
  whiteBeanBag:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_19 PM (3).png",
  mungBean:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_19 PM (4).png",
  kidneyBean:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_20 PM (5).png",
  desiChickpea:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_21 PM (6).png",
  blackPepper:
    "/product_images/\u0648\u0632\u0646 \u062e\u0627\u0644\u0635 \u0628\u0647 \u0641\u0627\u0631\u0633\u06cc 20 \u0628\u0627\u0634\u0647.png",
  popcornCorn:
    "/product_images/ChatGPT Image Jun 17, 2026, 04_02_24 PM (10).png",
  golbanooSellaBasmati:
    "/product_images/ChatGPT Image Jun 17, 2026, 06_04_31 PM (1).png",
  twentyOneSellaBasmati:
    "/product_images/ChatGPT Image Jun 17, 2026, 06_04_31 PM (2).png",
} as const;

export const products: Product[] = [
  {
    id: 1,
    nameEn: "Indian Rice",
    nameFa: "برنج هندی",
    category: "rice",
    descriptionEn:
      "A core rice line in Faradid Atlas' essential food portfolio, sourced for dependable supply and broad market use.",
    descriptionFa:
      "یکی از اقلام اصلی سبد برنج فرادید اطلس که برای تامین قابل اتکا و مصرف گسترده بازار انتخاب می‌شود.",
    image: productImages.mizbanSuperBasmati,
    images: [productImages.mizbanSuperBasmati],
  },
  {
    id: 2,
    nameEn: "Pakistani Rice",
    nameFa: "برنج پاکستانی",
    category: "rice",
    descriptionEn:
      "Part of the company's rice portfolio, selected through Faradid Atlas' quality-led import and distribution approach.",
    descriptionFa:
      "بخشی از سبد برنج شرکت که در چارچوب رویکرد واردات و توزیع مبتنی بر کیفیت فرادید اطلس تامین می‌شود.",
    image: productImages.mizbanWhiteBasmati,
    images: [productImages.mizbanWhiteBasmati],
  },
  {
    id: 3,
    nameEn: "Pinto Beans",
    nameFa: "لوبیا چیتی",
    category: "legumes",
    descriptionEn:
      "A staple legume supplied for wholesalers, retailers, organizations, and foodservice buyers.",
    descriptionFa:
      "حبوباتی پرمصرف برای عمده‌فروشان، خرده‌فروشان، سازمان‌ها و خریداران خدمات غذایی.",
    image: productImages.whiteBeanBag,
    images: [productImages.whiteBeanBag],
  },
  {
    id: 4,
    nameEn: "Red Kidney Beans",
    nameFa: "لوبیا قرمز",
    category: "legumes",
    descriptionEn:
      "An essential pulse in the Faradid Atlas portfolio, supported by disciplined sourcing and distribution.",
    descriptionFa:
      "یکی از حبوبات اساسی در سبد فرادید اطلس که با تامین و توزیع منظم پشتیبانی می‌شود.",
    image: productImages.kidneyBean,
    images: [productImages.kidneyBean],
  },
  {
    id: 5,
    nameEn: "Black-Eyed Peas",
    nameFa: "لوبیا چشم‌بلبلی",
    category: "legumes",
    descriptionEn:
      "A practical pulse line for steady access to everyday food staples across B2B channels.",
    descriptionFa:
      "حبوباتی کاربردی برای دسترسی پایدار به اقلام غذایی روزمره در کانال‌های B2B.",
    image: productImages.whiteBeans,
    images: [productImages.whiteBeans],
  },
  {
    id: 6,
    nameEn: "Chickpeas",
    nameFa: "نخود",
    category: "legumes",
    descriptionEn:
      "A widely used pulse imported and distributed as part of the company's essential food mission.",
    descriptionFa:
      "حبوباتی پرکاربرد که در راستای ماموریت تامین مواد غذایی اساسی وارد و توزیع می‌شود.",
    image: productImages.chickpeas,
    images: [productImages.chickpeas],
  },
  {
    id: 7,
    nameEn: "Black Chickpeas",
    nameFa: "نخود سیاه",
    category: "legumes",
    descriptionEn:
      "A focused pulse item included in Faradid Atlas' diversified legume and staple foods portfolio.",
    descriptionFa:
      "یکی از اقلام حبوبات در سبد متنوع فرادید اطلس برای تامین مواد غذایی اساسی.",
    image: productImages.desiChickpea,
    images: [productImages.desiChickpea],
  },
  {
    id: 8,
    nameEn: "Green Lentils",
    nameFa: "عدس سبز",
    category: "legumes",
    descriptionEn:
      "A high-demand pulse supplied through a network designed for continuity and quality.",
    descriptionFa:
      "حبوباتی پرتقاضا که از طریق شبکه‌ای مبتنی بر استمرار تامین و کیفیت عرضه می‌شود.",
    image: productImages.mungBean,
    images: [productImages.mungBean],
  },
  {
    id: 9,
    nameEn: "Red Lentils",
    nameFa: "عدس قرمز",
    category: "legumes",
    descriptionEn:
      "A key lentil product for buyers seeking dependable access to core food staples.",
    descriptionFa:
      "یکی از محصولات کلیدی عدس برای خریدارانی که به دسترسی پایدار به مواد غذایی اصلی نیاز دارند.",
    image: productImages.redLentil,
    images: [productImages.redLentil],
  },
  {
    id: 10,
    nameEn: "Mung Beans",
    nameFa: "ماش",
    category: "legumes",
    descriptionEn:
      "A staple pulse included in the company's broad portfolio of imported essential foods.",
    descriptionFa:
      "حبوباتی اساسی در سبد گسترده محصولات غذایی وارداتی فرادید اطلس.",
    image: productImages.mungBean,
    images: [productImages.mungBean],
  },
  {
    id: 11,
    nameEn: "Popcorn Corn",
    nameFa: "ذرت پاپ‌کورن",
    category: "seeds",
    descriptionEn:
      "A seeds-and-kernels product supplied as part of Faradid Atlas' expanded essential food portfolio.",
    descriptionFa:
      "محصولی از گروه دانه‌ها و مغزها در سبد توسعه‌یافته مواد غذایی اساسی فرادید اطلس.",
    image: productImages.popcornCorn,
    images: [productImages.popcornCorn],
  },
  {
    id: 12,
    nameEn: "Sunflower Seeds",
    nameFa: "تخمه آفتابگردان",
    category: "seeds",
    descriptionEn:
      "A familiar seed product supplied for reliable access across wholesale and retail food channels.",
    descriptionFa:
      "محصولی آشنا از گروه دانه‌ها برای دسترسی قابل اتکا در کانال‌های عمده و فروشگاهی.",
    image: productImages.sunflowerSeedKernels,
    images: [productImages.sunflowerSeedKernels],
  },
  {
    id: 13,
    nameEn: "Sunflower Kernels",
    nameFa: "مغز آفتابگردان",
    category: "seeds",
    descriptionEn:
      "A kernel product included in the company's essential food supply mix for B2B buyers.",
    descriptionFa:
      "محصولی از گروه مغزها در ترکیب تامین مواد غذایی اساسی شرکت برای خریداران B2B.",
    image: productImages.sunflowerSeedKernels,
    images: [productImages.sunflowerSeedKernels],
  },
  {
    id: 14,
    nameEn: "Pumpkin Seeds",
    nameFa: "تخمه کدو",
    category: "seeds",
    descriptionEn:
      "A seed item selected within a portfolio focused on quality, availability, and practical market needs.",
    descriptionFa:
      "محصولی از گروه دانه‌ها در سبدی متمرکز بر کیفیت، دسترسی و نیازهای عملی بازار.",
    image: productImages.pumpkinSeedKernels,
    images: [productImages.pumpkinSeedKernels],
  },
  {
    id: 15,
    nameEn: "Pumpkin Seed Kernels",
    nameFa: "مغز تخمه کدو",
    category: "seeds",
    descriptionEn:
      "A kernel product that supports Faradid Atlas' broader seeds and staple foods offering.",
    descriptionFa:
      "محصولی از گروه مغزها که سبد دانه‌ها و مواد غذایی اساسی فرادید اطلس را کامل می‌کند.",
    image: productImages.pumpkinSeedKernels,
    images: [productImages.pumpkinSeedKernels],
  },
  {
    id: 16,
    nameEn: "Sesame Seeds",
    nameFa: "کنجد",
    category: "seeds",
    descriptionEn:
      "A core seed product supplied through the company's quality-conscious sourcing approach.",
    descriptionFa:
      "یکی از محصولات اصلی گروه دانه‌ها که با رویکرد تامین حساس به کیفیت عرضه می‌شود.",
    image: productImages.sunflowerSeedKernels,
    images: [productImages.sunflowerSeedKernels],
  },
  {
    id: 17,
    nameEn: "Walnut",
    nameFa: "گردو",
    category: "nuts",
    descriptionEn:
      "A nut product in Faradid Atlas' essential food portfolio, selected for reliable commercial supply.",
    descriptionFa:
      "محصولی از گروه آجیل در سبد مواد غذایی اساسی فرادید اطلس برای تامین تجاری قابل اتکا.",
    image: productImages.walnutKernels,
    images: [productImages.walnutKernels],
  },
  {
    id: 18,
    nameEn: "Walnut Kernels",
    nameFa: "مغز گردو",
    category: "nuts",
    descriptionEn:
      "A nut-kernel product supplied within the company's diversified food import portfolio.",
    descriptionFa:
      "محصولی از گروه مغزها در سبد متنوع واردات مواد غذایی شرکت.",
    image: productImages.walnutKernels,
    images: [productImages.walnutKernels],
  },
  {
    id: 19,
    nameEn: "Cashews",
    nameFa: "بادام هندی",
    category: "nuts",
    descriptionEn:
      "A nut item supplied through Faradid Atlas' regional food supply and distribution network.",
    descriptionFa:
      "محصولی از گروه آجیل که از طریق شبکه تامین و توزیع منطقه‌ای فرادید اطلس عرضه می‌شود.",
    image: productImages.cashewNuts,
    images: [productImages.cashewNuts],
  },
  {
    id: 20,
    nameEn: "Peanuts",
    nameFa: "بادام زمینی",
    category: "nuts",
    descriptionEn:
      "A staple nut product for buyers seeking steady access to essential food products.",
    descriptionFa:
      "محصولی پرمصرف از گروه آجیل برای خریدارانی که به دسترسی پایدار به مواد غذایی اساسی نیاز دارند.",
    image: productImages.cashewNuts,
    images: [productImages.cashewNuts],
  },
  {
    id: 21,
    nameEn: "Desiccated Coconut",
    nameFa: "پودر نارگیل",
    aliasEn: "Coconut Powder",
    aliasFa: "نارگیل خشک‌شده",
    category: "nuts",
    descriptionEn:
      "A coconut product listed in the company's nuts and essential food portfolio.",
    descriptionFa:
      "محصولی از خانواده نارگیل در سبد آجیل و مواد غذایی اساسی شرکت.",
    image: productImages.cashewNuts,
    images: [productImages.cashewNuts],
  },
  {
    id: 22,
    nameEn: "Turmeric",
    nameFa: "زردچوبه",
    category: "spices",
    descriptionEn:
      "A core spice item selected for the company's seasoning and essential food portfolio.",
    descriptionFa:
      "یکی از اقلام اصلی ادویه در سبد چاشنی‌ها و مواد غذایی اساسی شرکت.",
    image: productImages.turmeric,
    images: [productImages.turmeric],
  },
  {
    id: 23,
    nameEn: "Black Pepper",
    nameFa: "فلفل سیاه",
    category: "spices",
    descriptionEn:
      "A key seasoning product supplied through Faradid Atlas' quality-led import approach.",
    descriptionFa:
      "محصولی کلیدی از گروه چاشنی‌ها که با رویکرد واردات مبتنی بر کیفیت تامین می‌شود.",
    image: productImages.blackPepper,
    images: [productImages.blackPepper],
  },
  {
    id: 24,
    nameEn: "Cardamom",
    nameFa: "هل",
    category: "spices",
    descriptionEn:
      "A spice product included in Faradid Atlas' essential food and seasoning portfolio.",
    descriptionFa:
      "محصولی از گروه ادویه‌جات در سبد مواد غذایی اساسی و چاشنی‌های فرادید اطلس.",
    image: productImages.blackPepper,
    images: [productImages.blackPepper],
  },
  {
    id: 25,
    nameEn: "Sugar",
    nameFa: "شکر",
    category: "sugar",
    descriptionEn:
      "An essential sweetener supplied for wholesalers, retailers, organizations, and foodservice buyers.",
    descriptionFa:
      "شیرین‌کننده‌ای اساسی برای عمده‌فروشان، خرده‌فروشان، سازمان‌ها و خریداران خدمات غذایی.",
    image: productImages.whiteBeans,
    images: [productImages.whiteBeans],
  },
  {
    id: 26,
    nameEn: "Golbanoo 386 Basmati Rice",
    nameFa: "برنج باسماتی ۳۸۶ گل‌بانو",
    category: "rice",
    descriptionEn:
      "A Golbanoo-branded basmati rice line for buyers seeking long-grain rice with dependable branded packaging.",
    descriptionFa:
      "محصولی از برند گل‌بانو در گروه برنج باسماتی برای خریدارانی که به برنج دانه‌بلند با بسته‌بندی قابل اتکا نیاز دارند.",
    image: productImages.golbanoo386Basmati,
    images: [productImages.golbanoo386Basmati],
  },
  {
    id: 27,
    nameEn: "Hayat Thai Jasmine Rice",
    nameFa: "برنج تایلندی جاسمین حیات",
    category: "rice",
    descriptionEn:
      "A Hayat-branded Thai jasmine rice product selected for Faradid Atlas' rice portfolio and retail-ready supply.",
    descriptionFa:
      "محصول برنج تایلندی جاسمین با برند حیات در سبد برنج فرادید اطلس برای عرضه آماده فروشگاهی.",
    image: productImages.hayatThaiJasmine,
    images: [productImages.hayatThaiJasmine],
  },
  {
    id: 28,
    nameEn: "Golbanoo Sella Basmati Rice",
    nameFa: "برنج سلا باسماتی گل‌بانو",
    category: "rice",
    descriptionEn:
      "A Golbanoo sella basmati rice line supplied for buyers who need consistent branded rice availability.",
    descriptionFa:
      "برنج سلا باسماتی گل‌بانو برای خریدارانی که به دسترسی پایدار به برنج برنددار نیاز دارند.",
    image: productImages.golbanooSellaBasmati,
    images: [productImages.golbanooSellaBasmati],
  },
  {
    id: 29,
    nameEn: "21 Sella Basmati Rice",
    nameFa: "برنج سلا باسماتی ۲۱",
    category: "rice",
    descriptionEn:
      "A 21-branded sella basmati rice product included in the company's expanded rice offering.",
    descriptionFa:
      "محصول برنج سلا باسماتی با برند ۲۱ در سبد توسعه‌یافته برنج شرکت.",
    image: productImages.twentyOneSellaBasmati,
    images: [productImages.twentyOneSellaBasmati],
  },
];
