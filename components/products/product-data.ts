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

const gallery = [
  "/featured1.jpg",
  "/featured2.jpg",
  "/featured3.jpg",
  "/featured4.jpg",
];

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
    image: "/featured1.jpg",
    images: gallery,
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
    image: "/featured2.jpg",
    images: ["/featured2.jpg", "/featured1.jpg", "/featured3.jpg"],
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
    image: "/featured3.jpg",
    images: ["/featured3.jpg", "/featured1.jpg", "/featured5.jpg"],
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
    image: "/featured4.jpg",
    images: ["/featured4.jpg", "/featured3.jpg", "/featured2.jpg"],
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
    image: "/featured5.jpg",
    images: ["/featured5.jpg", "/featured3.jpg", "/featured1.jpg"],
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
    image: "/featured1.jpg",
    images: ["/featured1.jpg", "/featured3.jpg", "/featured4.jpg"],
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
    image: "/featured2.jpg",
    images: ["/featured2.jpg", "/featured3.jpg", "/featured5.jpg"],
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
    image: "/featured3.jpg",
    images: ["/featured3.jpg", "/featured1.jpg", "/featured2.jpg"],
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
    image: "/featured4.jpg",
    images: ["/featured4.jpg", "/featured2.jpg", "/featured3.jpg"],
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
    image: "/featured5.jpg",
    images: ["/featured5.jpg", "/featured1.jpg", "/featured4.jpg"],
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
    image: "/featured1.jpg",
    images: ["/featured1.jpg", "/featured5.jpg", "/featured3.jpg"],
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
    image: "/featured2.jpg",
    images: ["/featured2.jpg", "/featured5.jpg", "/featured4.jpg"],
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
    image: "/featured3.jpg",
    images: ["/featured3.jpg", "/featured2.jpg", "/featured5.jpg"],
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
    image: "/featured4.jpg",
    images: ["/featured4.jpg", "/featured2.jpg", "/featured1.jpg"],
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
    image: "/featured5.jpg",
    images: ["/featured5.jpg", "/featured4.jpg", "/featured2.jpg"],
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
    image: "/featured1.jpg",
    images: ["/featured1.jpg", "/featured4.jpg", "/featured3.jpg"],
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
    image: "/featured2.jpg",
    images: ["/featured2.jpg", "/featured1.jpg", "/featured5.jpg"],
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
    image: "/featured3.jpg",
    images: ["/featured3.jpg", "/featured2.jpg", "/featured5.jpg"],
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
    image: "/featured4.jpg",
    images: ["/featured4.jpg", "/featured2.jpg", "/featured1.jpg"],
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
    image: "/featured5.jpg",
    images: ["/featured5.jpg", "/featured1.jpg", "/featured2.jpg"],
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
    image: "/featured1.jpg",
    images: ["/featured1.jpg", "/featured5.jpg", "/featured4.jpg"],
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
    image: "/featured2.jpg",
    images: ["/featured2.jpg", "/featured4.jpg", "/featured1.jpg"],
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
    image: "/featured3.jpg",
    images: ["/featured3.jpg", "/featured4.jpg", "/featured2.jpg"],
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
    image: "/featured4.jpg",
    images: ["/featured4.jpg", "/featured3.jpg", "/featured1.jpg"],
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
    image: "/featured5.jpg",
    images: ["/featured5.jpg", "/featured1.jpg", "/featured2.jpg"],
  },
];
