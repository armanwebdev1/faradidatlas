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

export const productBrandLabels: Record<
  ProductBrand,
  { en: string; fa: string; ar: string }
> = {
  "twenty-one": { en: "21", fa: "۲۱", ar: "٢١" },
  mizban: { en: "Mizban", fa: "میزبان", ar: "ميزبان" },
  golbanoo: { en: "Golbanoo", fa: "گلبانو", ar: "گلبنو" },
  hayat: { en: "Hayat", fa: "حیات", ar: "حياة" },
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
  { en: string; fa: string; ar: string }
> = {
  rice: { en: "Rice", fa: "برنج", ar: "أرز" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات", ar: "بقوليات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
  nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها", ar: "توابل وبهارات" },
  sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر ومحليات" },
};

export const categoryDescriptions: Record<
  ProductCategory,
  { h2: { en: string; fa: string; ar: string }; description: { en: string; fa: string; ar: string } }
> = {
  rice: {
    h2: {
      en: "Premium Rice Varieties",
      fa: "انواع برنج مرغوب",
      ar: "أنواع الأرز الممتاز",
    },
    description: {
      en: "Faradid Atlas sources and distributes premium basmati and jasmine rice varieties from trusted origins. Each product undergoes quality verification to meet international food safety standards, making it suitable for wholesale foodservice, retail distribution, and institutional supply chains.",
      fa: "فرادید اطلس انواع برنج باسماتی و جاسمین مرغوب را از مبادی معتبر تأمین و توزیع می‌کند. هر محصول پیش از عرضه کیفیت‌سنجی می‌شود تا با استانداردهای بین‌المللی ایمنی غذایی مطابقت داشته باشد و برای توزیع عمده، خدمات غذایی و زنجیره‌های تأمین سازمانی مناسب باشد.",
      ar: "توارد فراديد اطلس أنواع الأرز البسمتي والياسمين الممتازة من مصادر موثوقة. يخضع كل منتج للتحقق من الجودة لتلبية معايير السلامة الغذائية الدولية، مما يجعله مناسباً للتوزيع بالجملة وخدمات الطعام وسلاسل التوريد المؤسسية.",
    },
  },
  legumes: {
    h2: {
      en: "Legumes & Pulses",
      fa: "حبوبات و سبزیجات خشک",
      ar: "البقوليات",
    },
    description: {
      en: "Our legumes portfolio includes beans, lentils, and chickpeas sourced from reliable regional and international suppliers. These essential staples are available in various packaging formats to serve B2B buyers across Iran, the UAE, and Oman.",
      fa: "سبد حبوبات فرادید اطلس شامل لوبیا، عدس و نخود از تأمین‌کنندگان معتبر منطقه‌ای و بین‌المللی است. این اقلام اساسی در بسته‌بندی‌های مختلف برای خریداران عمده در ایران، امارات و عمان عرضه می‌شوند.",
      ar: "تتضمن مجموعتنا من البقوليات الفاصوليا والعدس والحمص من موردين إقليميين ودوليين موثوقين. هذه الأساسية متوفرة بتنسيقات تعبئة مختلفة لخدمة المشترين بالجملة في إيران والإمارات وعمان.",
    },
  },
  seeds: {
    h2: {
      en: "Seeds & Kernels",
      fa: "دانه‌ها و مغزها",
      ar: "البذور واللوزيات",
    },
    description: {
      en: "Faradid Atlas provides sunflower seeds, pumpkin kernels, and other seed varieties for wholesale distribution. Our products are carefully selected and processed to maintain freshness and nutritional value throughout the supply chain.",
      fa: "فرادید اطلس تخمه آفتابگردان، تخمه کدو و سایر انواع دانه‌ها را للتویع عمده عرضه می‌کند. محصولات ما با دقت انتخاب و فرآوری می‌شوند تا تازگی و ارزش غذایی آن‌ها در طول زنجیره تأمین حفظ شود.",
      ar: "يوفر فراديد اطلس بذور عباد الشمس وبذور اليقطين وأنواع البذور الأخرى للتوزيع بالجملة. يتم اختيار منتجاتنا ومعالجتها بعناية للحفاظ على النضال والقيمة الغذائية طوال سلسلة التوريد.",
    },
  },
  nuts: {
    h2: {
      en: "Premium Nuts",
      fa: "مغزهای مرغوب",
      ar: "المكسرات الممتازة",
    },
    description: {
      en: "Our nut portfolio features walnut kernels, cashews, and other premium varieties. Each product is sourced from trusted origins and processed under strict quality controls to meet the demands of wholesale buyers and food manufacturers.",
      fa: "سبد مغزهای فرادید اطلس شامل مغز گردو، بادام هندی و سایر انواع مرغوب است. هر محصول از مبادی معتبر تأمین و تحت کنترل کیفیت دقیق فرآوری می‌شود تا نیازهای خریداران عمده و تولیدکنندگان غذا را برآورده کند.",
      ar: "تتضمن مجموعتنا من المكسرات لب الجوز والكاجيو وأنواعاً ممتازة أخرى. يتم توريد كل منتج من مصادر موثوقة ومعالجتها تحت ضوابط صارمة للجودة لتلبية متطلبات المشترين بالجملة والمصنعين الغذائيين.",
    },
  },
  spices: {
    h2: {
      en: "Spices & Seasonings",
      fa: "ادویه‌ها و چاشنی‌ها",
      ar: "التوابل والبهارات",
    },
    description: {
      en: "Faradid Atlas supplies a range of spices and seasonings including turmeric, saffron, and other essential varieties. Our products are sourced from reputable origins and packaged to preserve aroma and quality for commercial buyers.",
      fa: "فرادید اطلس مجموعه‌ای از ادویه‌ها و چاشنی‌ها از جمله زردچوبه، زعفران و سایر انواع ضروری را عرضه می‌کند. محصولات ما از مبادی معتبر تأمین و بسته‌بندی می‌شوند تا عطر و کیفیت آن‌ها برای خریداران تجاری حفظ شود.",
      ar: "يوفر فراديد اطلس مجموعة من التوابل والبهارات تشمل الكركم والزعفران وأنواعاً أساسية أخرى. يتم توريد منتجاتنا من مصادر ذات سمعة جيدة وتُعبأ للحفاظ على النكهة والجودة للمشترين التجاريين.",
    },
  },
  sugar: {
    h2: {
      en: "Sweeteners",
      fa: "شکر و شیرین‌کننده‌ها",
      ar: "المحليات والسكر",
    },
    description: {
      en: "Our sweeteners category includes refined and specialty sugar products for industrial and commercial use. Faradid Atlas ensures consistent supply and competitive pricing for B2B buyers across the region.",
      fa: "دسته شیرین‌کننده‌های فرادید اطلس شامل شکر تصفیه‌شده و تخصصی برای مصارف صنعتی و تجاری است. فرادید اطلس تأمین پایدار و قیمت رقابتی را برای خریداران عمده در سراسر منطقه تضمین می‌کند.",
      ar: "يشمل فئة المحليات لدينا منتجات السكر المكرر والمتخصصة للاستخدام الصناعي والتجاري. يضمن فراديد اطلس توريداً مستمراً وتنافسية الأسعار للمشترين بالجملة في المنطقة.",
    },
  },
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
  pintoBeans: "/product_images/optimized/pinto-beans.webp",
  blackEyedPeas: "/product_images/optimized/black-eyed-peas.webp",
  greenLentils: "/product_images/optimized/green-lentils.webp",
  sunflowerSeeds: "/product_images/optimized/sunflower-seeds.webp",
  pumpkinSeeds: "/product_images/optimized/pumpkin-seeds.webp",
  sesameSeeds: "/product_images/optimized/sesame-seeds.webp",
  peanuts: "/product_images/optimized/peanuts.webp",
  desiccatedCoconut: "/product_images/optimized/desiccated-coconut.webp",
  cardamom: "/product_images/optimized/cardamom.webp",
  sugar: "/product_images/optimized/sugar.webp",
} as const;

function imageSet(image: string) {
  return { image, images: [image] };
}

export const products: Product[] = [
  {
    id: 1,
    slug: "mizban-super-basmati-rice",
    nameEn: "Mizban Super Basmati Rice",
    nameFa: "برنج سوپر باسماتی میزبان",
    nameAr: "أرز ميزبان سوبر بسمتي",
    aliasEn: "Long Grain Basmati Rice",
    aliasFa: "برنج باسماتی دانه‌بلند",
    aliasAr: "أرز بسمتي حب طويل",
    category: "rice",
    descriptionEn:
      "Mizban Super Basmati is a premium long-grain basmati rice for wholesale B2B supply, selected for consistent cooking quality, clean aroma, and dependable retail-ready packaging.",
    descriptionFa:
      "برنج سوپر باسماتی میزبان، برنج باسماتی دانه‌بلند ممتاز برای تأمین عمده و تجارت B2B، انتخاب‌شده برای پخت یکنواخت، عطر مطلوب و بسته‌بندی آماده عرضه در فروشگاه.",
    descriptionAr:
      "أرز ميزبان سوبر بسمتي، أرز بسمتي ممتاز طويل الحب لتوريد الجملة والتجارة B2B، مختار لجودة الطهي المتسقة والرائحة النظيفة والعبوة الجاهزة للبيع.",
    ...imageSet(productImages.mizbanSuperBasmati),
    specs: [
      {
        label: { en: "Grain Length", fa: "طول دانه", ar: "طول الحبوب" },
        value: { en: "Extra Long Grain", fa: "دانه‌بلند فوق‌العاده", ar: "حب طويل فائق" },
      },
      {
        label: { en: "Origin", fa: "مبدأ", ar: "المنشأ" },
        value: { en: "India / Pakistan", fa: "هند / پاکستان", ar: "الهند / باكستان" },
      },
      {
        label: { en: "Processing", fa: "نوع فرآوری", ar: "نوع المعالجة" },
        value: { en: "Steam / Sella", fa: "بخاری / سلا", ar: "بخاري / سلا" },
      },
      {
        label: { en: "Packaging", fa: "بسته‌بندی", ar: "التعبئة" },
        value: { en: "5kg / 10kg / 25kg bags", fa: "کیسه ۵ / ۱۰ / ۲۵ کیلوگرمی", ar: "أكياس ٥ / ١٠ / ٢٥ كجم" },
      },
    ],
  },
  {
    id: 2,
    slug: "mizban-1121-white-basmati-rice",
    nameEn: "Mizban 1121 White Basmati Rice",
    nameFa: "برنج سفید باسماتی ۱۱۲۱ میزبان",
    nameAr: "أرز ميزبان بسمتي أبيض ١١٢١",
    aliasEn: "Premium Quality 1121 Basmati",
    aliasFa: "باسماتی ۱۱۲۱ ممتاز",
    aliasAr: "بسمتي ١١٢١ ممتاز الجودة",
    category: "rice",
    descriptionEn:
      "Mizban 1121 White Basmati Rice is a wholesale premium basmati for B2B buyers who need long-grain rice with dependable branded packaging and steady regional availability.",
    descriptionFa:
      "برنج سفید باسماتی ۱۱۲۱ میزبان برای تأمین عمده و تجارت B2B عرضه می‌شود؛ برنج دانه‌بلند با بسته‌بندی برنددار و موجودی پایدار برای خریداران تجاری.",
    descriptionAr:
      "أرز ميزبان بسمتي أبيض ١١٢١ لتوريد الجملة والتجارة B2B، أرز حب طويل مع تعبئة ماركة موثوقة وتوفر مستقر للمشترين التجاريين.",
    ...imageSet(productImages.mizbanWhiteBasmati),
  },
  {
    id: 3,
    slug: "twenty-one-white-beans-carton",
    nameEn: "21 White Beans",
    nameFa: "لوبیا سفید ۲۱",
    nameAr: "فاصوليا بيضاء ٢١",
    aliasEn: "White Beans",
    aliasFa: "لوبیا سفید",
    aliasAr: "فاصوليا بيضاء",
    category: "legumes",
    descriptionEn:
      "21 White Beans are a wholesale bulk legume staple for B2B distributors and food service buyers across Iran, UAE, and the Middle East, offering clean presentation and reliable protein-rich supply.",
    descriptionFa:
      "لوبیا سفید کارتنی برند ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی با تأمین قابل اعتماد، ارائه منظم و توزیع در ایران، امارات و خاورمیانه.",
    descriptionAr:
      "فاصوليا بيضاء ٢١ بالجملة والتجارة B2B للتجار والموزعين في إيران والإمارات والشرق الأوسط، بقوليات بروتينية مع عرض نظيف وإمداد موثوق.",
    ...imageSet(productImages.whiteBeansBox),
    specs: [
      {
        label: { en: "Type", fa: "نوع", ar: "النوع" },
        value: { en: "White Beans (Navy Beans)", fa: "لوبیا سفید", ar: "فاصوليا بيضاء (نافي بينز)" },
      },
      {
        label: { en: "Origin", fa: "مبدأ", ar: "المنشأ" },
        value: { en: "Canada / USA", fa: "کانادا / آمریکا", ar: "كندا / أمريكا" },
      },
      {
        label: { en: "Packaging", fa: "بسته‌بندی", ar: "التعبئة" },
        value: { en: "Carton / Poly bag", fa: "کارتن / کیسه پلی‌ایلین", ar: "كرتون / كيس بولي إيثيلين" },
      },
    ],
  },
  {
    id: 4,
    slug: "golbanoo-386-basmati-rice",
    nameEn: "Golbanoo 386 Basmati Rice",
    nameFa: "برنج باسماتی ۳۸۶ گلبانو",
    nameAr: "أرز بسمتي گلبانو ٣٨٦",
    aliasEn: "Long Grain Rice",
    aliasFa: "برنج دانه‌بلند",
    aliasAr: "أرز حب طويل",
    category: "rice",
    descriptionEn:
      "Golbanoo 386 Basmati Rice is a wholesale long-grain basmati positioned for B2B retail demand, steady commercial distribution, and regional sourcing across the Middle East.",
    descriptionFa:
      "برنج باسماتی ۳۸۶ گلبانو برای تأمین عمده و تجارت B2B؛ برنج دانه‌بلند با توزیع تجاری منظم و تأمین پایدار در بازار خاورمیانه.",
    descriptionAr:
      "أرز بسمتي گلبانو ٣٨٦ للتجارة B2B وتوريد الجملة، أرز حب طويل مع توزيع تجاري مستقر وتوريد مستمر في الشرق الأوسط.",
    ...imageSet(productImages.golbanoo386Basmati),
  },
  {
    id: 5,
    slug: "hayat-thai-jasmine-rice",
    nameEn: "Hayat Thai Jasmine Rice",
    nameFa: "برنج جاسمین تایلندی حیات",
    nameAr: "أرز ياسمين تايلندي حياة",
    aliasEn: "Thai Jasmine Long Grain Rice",
    aliasFa: "برنج جاسمین تایلندی دانه‌بلند",
    aliasAr: "أرز ياسمين تايلندي حب طويل",
    category: "rice",
    descriptionEn:
      "Hayat Thai Jasmine Rice is an aromatic premium jasmine rice for wholesale buyers seeking long-grain quality with branded packaging and steady Middle East supply.",
    descriptionFa:
      "برنج جاسمین تایلندی حیات برای تأمین عمده و تجارت B2B؛ برنج دانه‌بلند خوش‌عطر با بسته‌بندی برنددار و تأمین پایدار در خاورمیانه.",
    descriptionAr:
      "أرز ياسمين تايلندي حياة لتوريد الجملة والتجارة B2B، أرز حب طويل عطري مع تعبئة ماركة موثوقة وتوريد مستمر في الشرق الأوسط.",
    ...imageSet(productImages.hayatThaiJasmine),
  },
  {
    id: 6,
    slug: "twenty-one-turmeric",
    nameEn: "21 Turmeric",
    nameFa: "زردچوبه ۲۱",
    nameAr: "كركم ٢١",
    aliasEn: "Ground Turmeric",
    aliasFa: "زردچوبه آسیاب‌شده",
    aliasAr: "كركم مطحون",
    category: "spices",
    descriptionEn:
      "21 Turmeric is a wholesale ground turmeric for foodservice, retail, and B2B buyers seeking consistent aromatic color, culinary flavor, and bulk spice supply.",
    descriptionFa:
      "زردچوبه ۲۱ برای عمده‌فروشی و تجارت B2B؛ ادویه اصلی با رنگ، طعم و کیفیت یکنواخت، مناسب خدمات غذایی و توزیع تجاری.",
    descriptionAr:
      "كركم ٢١ للتجارة B2B والتوريد بالجملة، توابل أساسية بلون وطعم وجودة متسقة، مناسبة لخدمات الطعام والتوزيع التجاري.",
    ...imageSet(productImages.turmeric),
  },
  {
    id: 7,
    slug: "twenty-one-walnut-kernels",
    nameEn: "21 Walnut Kernels",
    nameFa: "مغز گردو ۲۱",
    nameAr: "لب جوز ٢١",
    aliasEn: "Premium Walnut Kernels",
    aliasFa: "مغز گردوی ممتاز",
    aliasAr: "لب جوز ممتاز",
    category: "nuts",
    descriptionEn:
      "21 Walnut Kernels are premium roasted nuts for wholesale B2B buyers needing ready-to-use kernels with clean packaging and reliable commercial supply.",
    descriptionFa:
      "مغز گردو ۲۱ برای عمده‌فروشی و تجارت B2B؛ مغز گردوی ممتاز با بسته‌بندی منظم، تأمین قابل اعتماد و کیفیت تضمینی.",
    descriptionAr:
      "لب جوز ٢١ للتجارة B2B والتوريد بالجملة، لب جوز ممتاز مع تعبئة منظمة وإمداد موثوق وجودة مضمونة.",
    ...imageSet(productImages.walnutKernels),
    specs: [
      {
        label: { en: "Type", fa: "نوع", ar: "النوع" },
        value: { en: "Walnut Halves & Pieces", fa: "مغز گردو نیمه و پاره", ar: "نصف لب جوز وقطعاً" },
      },
      {
        label: { en: "Origin", fa: "مبدأ", ar: "المنشأ" },
        value: { en: "Iran / USA", fa: "ایران / آمریکا", ar: "إيران / أمريكا" },
      },
      {
        label: { en: "Grade", fa: "گرید", ar: "الدرجة" },
        value: { en: "Premium / Extra Light Halves", fa: "ممتاز / نیمه روشن", ar: "ممتاز / نصف فاتح" },
      },
      {
        label: { en: "Packaging", fa: "بسته‌بندی", ar: "التعبئة" },
        value: { en: "10kg carton / vacuum pack", fa: "کارتن ۱۰ کیلویی / بسته خلاء", ar: "كرتون ١٠ كجم / تعبئة فراغية" },
      },
    ],
  },
  {
    id: 8,
    slug: "twenty-one-sunflower-seed-kernels",
    nameEn: "21 Sunflower Seed Kernels",
    nameFa: "مغز تخمه آفتابگردان ۲۱",
    nameAr: "لب بذور عباد الشمس ٢١",
    aliasEn: "Sunflower Kernels",
    aliasFa: "مغز تخمه آفتابگردان",
    aliasAr: "لب عباد الشمس",
    category: "seeds",
    descriptionEn:
      "21 Sunflower Seed Kernels are a wholesale snack and bakery ingredient for B2B buyers in retail and food service, with clean packaged kernels and dependable Middle East availability.",
    descriptionFa:
      "مغز تخمه آفتابگردان ۲۱ برای عمده‌فروشی و تجارت B2B؛ مغز تخمه با بسته‌بندی منظم، کیفیت یکنواخت و تأمین پایدار در خاورمیانه.",
    descriptionAr:
      "لب بذور عباد الشمس ٢١ للتجارة B2B والتوريد بالجملة، لب بذور مع تعبئة نظيفة وجودة متسقة وإمداد مستقر في الشرق الأوسط.",
    ...imageSet(productImages.sunflowerSeedKernels),
  },
  {
    id: 9,
    slug: "twenty-one-pumpkin-seed-kernels",
    nameEn: "21 Pumpkin Seed Kernels",
    nameFa: "مغز تخمه کدو ۲۱",
    nameAr: "لب بذور اليقطين ٢١",
    aliasEn: "Pumpkin Kernels",
    aliasFa: "مغز تخمه کدو",
    aliasAr: "لب يقطين",
    category: "seeds",
    descriptionEn:
      "21 Pumpkin Seed Kernels are wholesale snack and bakery ingredients for B2B buyers, offering a clean packaged seed kernel product for retail and commercial food production.",
    descriptionFa:
      "مغز تخمه کدو ۲۱ برای عمده‌فروشی و تجارت B2B؛ مغز تخمه تمیز با بسته‌بندی منظم، کیفیت یکنواخت و تأمین قابل اعتماد.",
    descriptionAr:
      "لب بذور اليقطين ٢١ للتجارة B2B والتوريد بالجملة، لب بذور نظيف مع تعبئة منظمة وجودة متسقة وإمداد موثوق.",
    ...imageSet(productImages.pumpkinSeedKernels),
  },
  {
    id: 10,
    slug: "twenty-one-cashew-nuts",
    nameEn: "21 Cashew Nuts",
    nameFa: "بادام هندی ۲۱",
    nameAr: "مكسرات كاجو ٢١",
    aliasEn: "Cashews",
    aliasFa: "بادام هندی",
    aliasAr: "كاجو",
    category: "nuts",
    descriptionEn:
      "21 Cashew Nuts are premium packaged nuts for wholesale B2B buyers across retail and food service, offering polished packaging and steady supply.",
    descriptionFa:
      "بادام هندی ۲۱ برای عمده‌فروشی و تجارت B2B؛ مغز بادام هندی ممتاز با بسته‌بندی مرتب، کیفیت یکنواخت و تأمین پایدار.",
    descriptionAr:
      "مكسرات كاجو ٢١ للتجارة B2B والتوريد بالجملة، مكسرات ممتازة مع تعبئة مصقولة وجودة متسقة وإمداد مستقر.",
    ...imageSet(productImages.cashewNuts),
  },
  {
    id: 11,
    slug: "twenty-one-red-lentil",
    nameEn: "21 Red Lentil",
    nameFa: "عدس قرمز ۲۱",
    nameAr: "عدس أحمر ٢١",
    aliasEn: "Red Lentils",
    aliasFa: "عدس قرمز",
    aliasAr: "عدس أحمر",
    category: "legumes",
    descriptionEn:
      "21 Red Lentil is a protein-rich pulse staple for wholesale B2B buyers in food service and retail, ideal for everyday cooking and regional sourcing.",
    descriptionFa:
      "عدس قرمز ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی پرتقاضا با تأمین قابل اعتماد برای خدمات غذایی و توزیع منطقه‌ای.",
    descriptionAr:
      "عدس أحمر ٢١ للتجارة B2B والتوريد بالجملة، بقوليات عالية البروتين مع توريد موثوق لخدمات الطعام والتوزيع الإقليمي.",
    ...imageSet(productImages.redLentil),
  },
  {
    id: 12,
    slug: "twenty-one-chickpeas",
    nameEn: "21 Chickpeas",
    nameFa: "نخود ۲۱",
    nameAr: "حمص ٢١",
    aliasEn: "Pea / Chickpea",
    aliasFa: "نخود",
    aliasAr: "حمص",
    category: "legumes",
    descriptionEn:
      "21 Chickpeas are a wholesale protein-rich pulse for B2B buyers in food service and retail, offering a reliable staple for wholesale distribution across the Middle East.",
    descriptionFa:
      "نخود ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی با تأمین قابل اعتماد، مناسب فروشگاه‌ها، خدمات غذایی و توزیع در خاورمیانه.",
    descriptionAr:
      "حمص ٢١ للتجارة B2B والتوريد بالجملة، بقوليات عالية البروتين مع توريد موثوق للمتاجر ومطابخ خدمات الطعام والتوزيع الإقليمي.",
    ...imageSet(productImages.chickpeas),
  },
  {
    id: 13,
    slug: "twenty-one-white-bean-bag",
    nameEn: "21 White Bean Bag",
    nameFa: "لوبیا سفید کیسه‌ای ۲۱",
    nameAr: "كيس فاصوليا بيضاء ٢١",
    aliasEn: "White Bean",
    aliasFa: "لوبیا سفید",
    aliasAr: "فاصوليا بيضاء",
    category: "legumes",
    descriptionEn:
      "21 White Bean Bag is a wholesale bulk legume staple for B2B buyers, offering practical bagged supply across retail, food service, and regional distribution.",
    descriptionFa:
      "لوبیا سفید کیسه‌ای ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات اصلی با تأمین کیسه‌ای قابل اعتماد و توزیع در فروشگاه‌ها و خدمات غذایی.",
    descriptionAr:
      "كيس فاصوليا بيضاء ٢١ للتجارة B2B والتوريد بالجملة، بقوليات أساسية مع إمداد عملي في الأكياس عبر التوزيع بالتجزئة والتجاري.",
    ...imageSet(productImages.whiteBeanBag),
  },
  {
    id: 14,
    slug: "twenty-one-mung-bean",
    nameEn: "21 Mung Bean",
    nameFa: "ماش ۲۱",
    nameAr: "لوبيا مونغ ٢١",
    aliasEn: "Mung Beans",
    aliasFa: "ماش",
    aliasAr: "لوبيا مونغ",
    category: "legumes",
    descriptionEn:
      "21 Mung Bean is a wholesale protein-rich pulse staple for B2B buyers in food service and retail, offering stable sourcing and clean packaged presentation.",
    descriptionFa:
      "ماش ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات کاربردی با تأمین پایدار، بسته‌بندی تمیز و توزیع قابل اعتماد.",
    descriptionAr:
      "لوبيا مونغ ٢١ للتجارة B2B والتوريد بالجملة، بقوليات متعددة الاستخدامات مع توريد مستقر وتعبئة نظيفة وتوزيع موثوق.",
    ...imageSet(productImages.mungBean),
  },
  {
    id: 15,
    slug: "twenty-one-kidney-bean",
    nameEn: "21 Kidney Bean",
    nameFa: "لوبیا قرمز ۲۱",
    nameAr: "فاصوليا كلية حمراء ٢١",
    aliasEn: "Red Kidney Beans",
    aliasFa: "لوبیا قرمز",
    aliasAr: "فاصوليا كلية حمراء",
    category: "legumes",
    descriptionEn:
      "21 Kidney Bean is a wholesale protein-rich pulse staple for B2B buyers in retail, food service, and Middle East distribution, offering consistent packaged supply.",
    descriptionFa:
      "لوبیا قرمز ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی اصلی با تأمین بسته‌بندی‌شده و منظم برای فروشگاه‌ها و خدمات غذایی.",
    descriptionAr:
      "فاصوليا كلية حمراء ٢١ للتجارة B2B والتوريد بالجملة، بقوليات أساسية عالية البروتين مع إمداد معبأ متسق للمتاجر وخدمات الطعام.",
    ...imageSet(productImages.kidneyBean),
  },
  {
    id: 16,
    slug: "twenty-one-desi-chickpea",
    nameEn: "21 Desi Chickpea",
    nameFa: "نخود دسی ۲۱",
    nameAr: "حمص دesi ٢١",
    aliasEn: "Desi Chickpeas",
    aliasFa: "نخود دسی",
    aliasAr: "حمص دesi",
    category: "legumes",
    descriptionEn:
      "21 Desi Chickpea is a wholesale protein-rich pulse for B2B buyers seeking a darker chickpea variety with reliable branded packaging and consistent sourcing.",
    descriptionFa:
      "نخود دسی ۲۱ برای عمده‌فروشی و تجارت B2B؛ نخود تخصصی با بسته‌بندی برنددار، کیفیت یکنواخت و تأمین قابل اعتماد.",
    descriptionAr:
      "حمص دesi ٢١ للتجارة B2B والتوريد بالجملة، حمص متخصص مع تعبئة ماركة موثوقة وجودة متسقة وتوريد موثوق.",
    ...imageSet(productImages.desiChickpea),
  },
  {
    id: 17,
    slug: "twenty-one-popcorn-corn",
    nameEn: "21 Popcorn Corn",
    nameFa: "ذرت پاپ‌کورن ۲۱",
    nameAr: "ذرة بوب كورن ٢١",
    aliasEn: "Popcorn Kernels",
    aliasFa: "دانه ذرت پاپ‌کورن",
    aliasAr: "حبوب بوب كورن",
    category: "seeds",
    descriptionEn:
      "21 Popcorn Corn is a wholesale snack ingredient for B2B buyers, packaged for snack producers, retailers, and commercial food service across the Middle East.",
    descriptionFa:
      "ذرت پاپ‌کورن ۲۱ برای عمده‌فروشی و تجارت B2B؛ دانه پاپ‌کورن با تأمین قابل اتکا برای تولیدکنندگان تنقلات و توزیع تجاری.",
    descriptionAr:
      "ذرة بوب كورن ٢١ للتجارة B2B والتوريد بالجملة، حبوب بوب كورن مع توريد موثوق لمنتجي الوجبات الخفيفة والتوزيع التجاري.",
    ...imageSet(productImages.popcornCorn),
  },
  {
    id: 18,
    slug: "golbanoo-sella-basmati-rice",
    nameEn: "Golbanoo Sella Basmati Rice",
    nameFa: "برنج سیلا باسماتی گلبانو",
    nameAr: "أرز بسمتي سلا گلبانو",
    aliasEn: "Long Grain Sella Rice",
    aliasFa: "برنج سیلا دانه‌بلند",
    aliasAr: "أرز سلا حب طويل",
    category: "rice",
    descriptionEn:
      "Golbanoo Sella Basmati Rice is a wholesale premium basmati for B2B buyers needing long-grain sella with consistent quality and strong regional shelf presence.",
    descriptionFa:
      "برنج سیلا باسماتی گلبانو برای تأمین عمده و تجارت B2B؛ برنج دانه‌بلند با کیفیت یکنواخت و حضور مناسب در قفسه فروشگاهی.",
    descriptionAr:
      "أرز بسمتي سلا گلبانو للتجارة B2B وتوريد الجملة، أرز سلا حب طويل مع جودة متسقة وحضور قوي على الرف في الشرق الأوسط.",
    ...imageSet(productImages.golbanooSellaBasmati),
  },
  {
    id: 19,
    slug: "twenty-one-sella-basmati-rice",
    nameEn: "21 Sella Basmati Rice",
    nameFa: "برنج سیلا باسماتی ۲۱",
    nameAr: "أرز بسمتي سلا ٢١",
    aliasEn: "1121 Basmati Sella Rice",
    aliasFa: "برنج سیلا باسماتی ۱۱۲۱",
    aliasAr: "أرز بسمتي سلا ١١٢١",
    category: "rice",
    descriptionEn:
      "21 Sella Basmati Rice is a wholesale 1121 basmati sella for B2B buyers seeking premium long-grain rice with recognizable 21 branding.",
    descriptionFa:
      "برنج سیلا باسماتی ۲۱ برای عمده‌فروشی و تجارت B2B؛ باسماتی ۱۱۲۱ سلا با برند شناخته‌شده ۲۱ و تأمین قابل اعتماد.",
    descriptionAr:
      "أرز بسمتي سلا ٢١ للتجارة B2B والتوريد بالجملة، بسمتي ١١٢١ سلا مع ماركة ٢١ المعروفة وتوريد موثوق.",
    ...imageSet(productImages.twentyOneSellaBasmati),
  },
  {
    id: 20,
    slug: "twenty-one-black-pepper",
    nameEn: "21 Black Pepper",
    nameFa: "فلفل سیاه ۲۱",
    nameAr: "فلفل أسود ٢١",
    aliasEn: "Black Pepper",
    aliasFa: "فلفل سیاه",
    aliasAr: "فلفل أسود",
    category: "spices",
    descriptionEn:
      "21 Black Pepper is a wholesale aromatic spice for B2B buyers in retail and food service, offering consistent culinary flavor and packaged supply.",
    descriptionFa:
      "فلفل سیاه ۲۱ برای عمده‌فروشی و تجارت B2B؛ ادویه معطر با طعم یکنواخت، مناسب فروشگاه‌ها، خدمات غذایی و توزیع تجاری.",
    descriptionAr:
      "فلفل أسود ٢١ للتجارة B2B والتوريد بالجملة، توابل عطرية بنكهة متسقة، مناسبة للبيع بالتجزئة وخدمات الطعام والتوزيع التجاري.",
    ...imageSet(productImages.blackPepper),
  },
  {
    id: 21,
    slug: "twenty-one-pinto-beans",
    nameEn: "21 Pinto Beans",
    nameFa: "لوبیا چیتی ۲۱",
    nameAr: "فاصوليا بينتو ٢١",
    aliasEn: "Pinto Beans",
    aliasFa: "لوبیا چیتی",
    aliasAr: "فاصوليا بينتو",
    category: "legumes",
    descriptionEn:
      "21 Pinto Beans are a wholesale protein-rich pulse staple for B2B buyers in retail, food service, and regional distribution.",
    descriptionFa:
      "لوبیا چیتی ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی با تأمین قابل اعتماد، مناسب فروشگاه‌ها، خدمات غذایی و توزیع منطقه‌ای.",
    descriptionAr:
      "فاصوليا بينتو ٢١ للتجارة B2B والتوريد بالجملة، بقوليات أساسية عالية البروتين مع إمداد معبأ موثوق للمتاجر وخدمات الطعام والتوزيع الإقليمي.",
    ...imageSet(productImages.pintoBeans),
  },
  {
    id: 22,
    slug: "twenty-one-black-eyed-peas",
    nameEn: "21 Black-Eyed Peas",
    nameFa: "لوبیا چشم بلبلی ۲۱",
    nameAr: "لوبيا بقرة ٢١",
    aliasEn: "Black-Eyed Peas",
    aliasFa: "لوبیا چشم بلبلی",
    aliasAr: "لوبيا بقرة",
    category: "legumes",
    descriptionEn:
      "21 Black-Eyed Peas are a wholesale protein-rich pulse staple for B2B buyers, packaged for everyday cooking, food service, and distribution.",
    descriptionFa:
      "لوبیا چشم بلبلی ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات کاربردی با تأمین قابل اعتماد و بسته‌بندی مناسب توزیع تجاری.",
    descriptionAr:
      "لوبيا بقرة ٢١ للتجارة B2B والتوريد بالجملة، بقوليات متعددة الاستخدامات مع إمداد موثوق وتوزيع تجاري مناسب.",
    ...imageSet(productImages.blackEyedPeas),
  },
  {
    id: 23,
    slug: "twenty-one-green-lentils",
    nameEn: "21 Green Lentils",
    nameFa: "عدس سبز ۲۱",
    nameAr: "عدس أخضر ٢١",
    aliasEn: "Green Lentils",
    aliasFa: "عدس سبز",
    aliasAr: "عدس أخضر",
    category: "legumes",
    descriptionEn:
      "21 Green Lentils are a wholesale protein-rich pulse staple for B2B buyers in food service and retail, ideal for everyday cooking and sourcing.",
    descriptionFa:
      "عدس سبز ۲۱ برای عمده‌فروشی و تجارت B2B؛ حبوبات پروتئینی پرتقاضا با تأمین قابل اعتماد برای خدمات غذایی و توزیع منطقه‌ای.",
    descriptionAr:
      "عدس أخضر ٢١ للتجارة B2B والتوريد بالجملة، بقوليات عالية البروتين مع توريد موثوق لخدمات الطعام والتوزيع الإقليمي.",
    ...imageSet(productImages.greenLentils),
  },
  {
    id: 24,
    slug: "twenty-one-sunflower-seeds",
    nameEn: "21 Sunflower Seeds",
    nameFa: "تخمه آفتابگردان ۲۱",
    nameAr: "بذور عباد الشمس ٢١",
    aliasEn: "Sunflower Seeds",
    aliasFa: "تخمه آفتابگردان",
    aliasAr: "بذور عباد الشمس",
    category: "seeds",
    descriptionEn:
      "21 Sunflower Seeds are a wholesale snack and bakery ingredient for B2B buyers, packaged whole for retailers and commercial food producers.",
    descriptionFa:
      "تخمه آفتابگردان ۲۱ برای عمده‌فروشی و تجارت B2B؛ تخمه کامل با بسته‌بندی منظم، کیفیت یکنواخت و تأمین قابل اعتماد.",
    descriptionAr:
      "بذور عباد الشمس ٢١ للتجارة B2B والتوريد بالجملة، بذور كاملة مع تعبئة منظمة وجودة متسقة وإمداد موثوق.",
    ...imageSet(productImages.sunflowerSeeds),
  },
  {
    id: 25,
    slug: "twenty-one-pumpkin-seeds",
    nameEn: "21 Pumpkin Seeds",
    nameFa: "تخمه کدو ۲۱",
    nameAr: "بذور اليقطين ٢١",
    aliasEn: "Pumpkin Seeds",
    aliasFa: "تخمه کدو",
    aliasAr: "بذور اليقطين",
    category: "seeds",
    descriptionEn:
      "21 Pumpkin Seeds are a wholesale snack and bakery ingredient for B2B buyers, packaged whole for retail and food service with consistent quality.",
    descriptionFa:
      "تخمه کدو ۲۱ برای عمده‌فروشی و تجارت B2B؛ تخمه کامل با کیفیت یکنواخت، بسته‌بندی منظم و تأمین پایدار.",
    descriptionAr:
      "بذور اليقطين ٢١ للتجارة B2B والتوريد بالجملة، بذور كاملة مع جودة متسقة وتعبئة منظمة وتوريد مستقر.",
    ...imageSet(productImages.pumpkinSeeds),
  },
  {
    id: 26,
    slug: "twenty-one-sesame-seeds",
    nameEn: "21 Sesame Seeds",
    nameFa: "کنجد ۲۱",
    nameAr: "سمسم ٢١",
    aliasEn: "Sesame Seeds",
    aliasFa: "کنجد",
    aliasAr: "سمسم",
    category: "seeds",
    descriptionEn:
      "21 Sesame Seeds are a wholesale bakery and food service ingredient for B2B buyers, offering clean packaged seeds and dependable regional supply.",
    descriptionFa:
      "کنجد ۲۱ برای عمده‌فروشی و تجارت B2B؛ کنجد با بسته‌بندی تمیز، کیفیت یکنواخت و تأمین پایدار برای نانوایی و خدمات غذایی.",
    descriptionAr:
      "سمسم ٢١ للتجارة B2B والتوريد بالجملة، سمسم مع تعبئة نظيفة وجودة متسقة وتوريد موثوق للمخبوزات وخدمات الطعام.",
    ...imageSet(productImages.sesameSeeds),
  },
  {
    id: 27,
    slug: "twenty-one-peanuts",
    nameEn: "21 Peanuts",
    nameFa: "بادام زمینی ۲۱",
    nameAr: "فول سوداني ٢١",
    aliasEn: "Peanuts",
    aliasFa: "بادام زمینی",
    aliasAr: "فول سوداني",
    category: "nuts",
    descriptionEn:
      "21 Peanuts are wholesale premium roasted nuts for B2B snack producers, retail, and food service buyers needing steady regional supply.",
    descriptionFa:
      "بادام زمینی ۲۱ برای عمده‌فروشی و تجارت B2B؛ بادام زمینی بوداده ممتاز با تأمین پایدار برای تولیدکنندگان تنقلات و توزیع تجاری.",
    descriptionAr:
      "فول سوداني ٢١ للتجارة B2B والتوريد بالجملة، مكسرات ممتازة مع إمداد مستقر لمنتجي الوجبات الخفيفة والتوزيع التجاري.",
    ...imageSet(productImages.peanuts),
  },
  {
    id: 28,
    slug: "twenty-one-desiccated-coconut",
    nameEn: "21 Desiccated Coconut",
    nameFa: "پودر نارگیل ۲۱",
    nameAr: "مسحوق جوز الهند ٢١",
    aliasEn: "Coconut Powder",
    aliasFa: "پودر نارگیل",
    aliasAr: "مسحوق جوز الهند",
    category: "nuts",
    descriptionEn:
      "21 Desiccated Coconut is a wholesale packaged nut ingredient for B2B bakery, confectionery, and retail buyers seeking consistent quality and supply.",
    descriptionFa:
      "پودر نارگیل ۲۱ برای عمده‌فروشی و تجارت B2B؛ پودر نارگیل بسته‌بندی‌شده با کیفیت یکنواخت و تأمین قابل اعتماد.",
    descriptionAr:
      "مسحوق جوز الهند ٢١ للتجارة B2B والتوريد بالجملة، مسحوق جوز الهند المعبأ مع جودة متسقة وتوريد موثوق.",
    ...imageSet(productImages.desiccatedCoconut),
  },
  {
    id: 29,
    slug: "twenty-one-cardamom",
    nameEn: "21 Cardamom",
    nameFa: "هل ۲۱",
    nameAr: "هيل ٢١",
    aliasEn: "Cardamom",
    aliasFa: "هل",
    aliasAr: "هيل",
    category: "spices",
    descriptionEn:
      "21 Cardamom is a wholesale aromatic spice for B2B food service, retail, and culinary buyers seeking consistent flavor and packaged supply.",
    descriptionFa:
      "هل ۲۱ برای عمده‌فروشی و تجارت B2B؛ ادویه خوش‌عطر با طعم یکنواخت، مناسب خدمات غذایی، فروشگاه‌ها و توزیع تجاری.",
    descriptionAr:
      "هيل ٢١ للتجارة B2B والتوريد بالجملة، توابل عطرية بنكهة متسقة، مناسبة لخدمات الطعام والبيع بالتجزئة والتوزيع التجاري.",
    ...imageSet(productImages.cardamom),
  },
  {
    id: 30,
    slug: "twenty-one-sugar",
    nameEn: "21 Sugar",
    nameFa: "شکر ۲۱",
    nameAr: "سكر ٢١",
    aliasEn: "Sugar",
    aliasFa: "شکر",
    aliasAr: "سكر",
    category: "sugar",
    descriptionEn:
      "21 Sugar is a wholesale bulk sweetener for B2B retail, food service, and commercial buyers needing reliable packaged supply across the Middle East.",
    descriptionFa:
      "شکر ۲۱ برای عمده‌فروشی و تجارت B2B؛ شیرین‌کننده اصلی با تأمین بسته‌بندی‌شده و قابل اعتماد، مناسب فروشگاه‌ها و خدمات غذایی.",
    descriptionAr:
      "سكر ٢١ للتجارة B2B والتوريد بالجملة، محليات أساسية مع إمداد معبأ موثوق، مناسبة للبيع بالتجزئة وخدمات الطعام.",
    ...imageSet(productImages.sugar),
  },
];
