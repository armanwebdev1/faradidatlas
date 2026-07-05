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
      "Mizban Super Basmati is a premium long-grain rice pack selected for consistent cooking quality, clean aroma, and dependable retail-ready supply.",
    descriptionFa:
      "برنج سوپر باسماتی میزبان، محصولی ممتاز و دانه‌بلند است که برای پخت یکنواخت، عطر مطلوب و عرضه‌ای قابل اتکا در بازار انتخاب می‌شود.",
    descriptionAr:
      "أرز ميزبان سوبر بسمتي هو حزمة أرز بسمتي ممتازة من الحب الطويل مختارة لجودة الطهي المتسقة والرائحة النظيفة والإمداد الجاهز للبيع بالتجزئة.",
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
      "A Mizban-branded 1121 white basmati rice line for buyers who need long-grain rice with dependable branded packaging and steady availability.",
    descriptionFa:
      "برنج سفید باسماتی ۱۱۲۱ میزبان برای خریدارانی عرضه می‌شود که به برنج دانه‌بلند، بسته‌بندی برنددار و موجودی پایدار نیاز دارند.",
    descriptionAr:
      "خط أرز ميزبان بسمتي أبيض ١١٢١ للمشترين الذين يحتاجون إلى أرز حب طويل مع تعبئة ماركة موثوقة وتوفر مستقر.",
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
      "A 21-branded white beans carton prepared for organized retail, wholesale, and B2B channels that need clean presentation and reliable legume supply.",
    descriptionFa:
      "لوبیا سفید کارتنی برند ۲۱ برای فروشگاه‌ها، عمده‌فروشان و خریداران تجاری آماده شده است؛ محصولی با ارائه منظم و تأمین قابل اعتماد.",
    descriptionAr:
      "كرتون فاصوليا بيضاء من ماركة ٢١ مُعَد للبيع بالتجزئة والجملة وقنوات B2B التي تحتاج إلى عرض نظيف وإمداد بقوليات موثوق.",
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
      "Golbanoo 386 Basmati Rice is a long-grain rice pack positioned for everyday retail demand and steady commercial distribution.",
    descriptionFa:
      "برنج باسماتی ۳۸۶ گلبانو محصولی دانه‌بلند است که برای پاسخ‌گویی به تقاضای روزمره فروشگاهی و توزیع تجاری منظم عرضه می‌شود.",
    descriptionAr:
      "أرز بسمتي گلبانو ٣٨٦ هو حزمة أرز حب طويل موجهة للاستهلاك اليومي في البيع بالتجزئة والتوزيع التجاري المستقر.",
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
      "Hayat Thai Jasmine Rice is selected for buyers looking for aromatic long-grain rice with recognizable branded packaging.",
    descriptionFa:
      "برنج جاسمین تایلندی حیات برای خریدارانی انتخاب شده است که به برنج دانه‌بلند خوش‌عطر با بسته‌بندی برنددار و قابل تشخیص نیاز دارند.",
    descriptionAr:
      "أرز ياسمين تايلندي حياة مختار للمشترين الباحثين عن أرز حب طويل عطري مع تعبئة ماركة معترف بها.",
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
      "21 Turmeric is a core spice product for foodservice, retail, and wholesale buyers seeking consistent color, flavor, and packaged supply.",
    descriptionFa:
      "زردچوبه ۲۱ از اقلام اصلی ادویه است و برای خریداران خدمات غذایی، فروشگاهی و عمده که به رنگ، طعم و بسته‌بندی یکدست نیاز دارند عرضه می‌شود.",
    descriptionAr:
      "كركم ٢١ هو منتج بهاري أساسي لخدمات الطعام والبيع بالتجزئة والجملة يبحثون عن لون وطعم وتعبئة متسقة.",
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
      "21 Walnut Kernels are packed for buyers who need ready-to-use nut kernels with clean branding and reliable commercial supply.",
    descriptionFa:
      "مغز گردو ۲۱ برای خریدارانی بسته‌بندی شده است که به محصولی آماده مصرف، برندینگ منظم و تأمین تجاری قابل اعتماد نیاز دارند.",
    descriptionAr:
      "لب جوز ٢١ معبأ للمشترين الذين يحتاجون إلى لب مكسرات جاهز للاستخدام مع علامة تجارية نظيفة وإمداد تجاري موثوق.",
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
      "21 Sunflower Seed Kernels support snack, bakery, retail, and ingredient buyers with packaged kernels and dependable availability.",
    descriptionFa:
      "مغز تخمه آفتابگردان ۲۱ برای خریداران حوزه تنقلات، نانوایی، فروشگاهی و مواد اولیه عرضه می‌شود؛ با بسته‌بندی منظم و دسترسی پایدار.",
    descriptionAr:
      "لب بذور عباد الشمس ٢١ يدعم مشتري الوجبات الخفيفة والمخبوزات والبيع بالتجزئة والمكونات بالبذور المعبأة والإمداد الموثوق.",
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
      "21 Pumpkin Seed Kernels are packaged for buyers who need a clean, ready-to-use seed kernel product for retail and food production.",
    descriptionFa:
      "مغز تخمه کدو ۲۱ برای خریدارانی عرضه می‌شود که به محصولی تمیز، آماده مصرف و مناسب فروشگاه یا تولید مواد غذایی نیاز دارند.",
    descriptionAr:
      "لب بذور اليقطين ٢١ معبأ للمشترين الذين يحتاجون إلى منتج لب بذور نظيف جاهز للاستخدام للبيع بالتجزئة وإنتاج الطعام.",
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
      "21 Cashew Nuts are positioned for retail and wholesale buyers seeking a familiar nut product with polished packaging and steady supply.",
    descriptionFa:
      "بادام هندی ۲۱ برای خریداران فروشگاهی و عمده عرضه می‌شود؛ محصولی شناخته‌شده با بسته‌بندی مرتب و تأمین پایدار.",
    descriptionAr:
      "مكسرات كاجو ٢١ موجهة للمشترين بالتجزئة والجملة يبحثون عن منتج مكسرات معروف مع تعبئة مصقولة وإمداد مستقر.",
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
      "21 Red Lentil is a high-demand pulse product for everyday cooking, foodservice use, and B2B staple-food procurement.",
    descriptionFa:
      "عدس قرمز ۲۱ از حبوبات پرتقاضا برای مصرف روزمره، خدمات غذایی و تأمین عمده اقلام غذایی اساسی است.",
    descriptionAr:
      "عدس أحمر ٢١ هو منتج بقوليات عالي الطلب للطهي اليومي وخدمات الطعام ومشتريات الأغذية الأساسية B2B.",
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
      "21 Chickpeas are packed for buyers seeking a reliable pulse line for retail shelves, foodservice kitchens, and wholesale channels.",
    descriptionFa:
      "نخود ۲۱ برای خریدارانی بسته‌بندی شده است که به تأمین قابل اتکای حبوبات برای فروشگاه‌ها، آشپزخانه‌های خدمات غذایی و کانال‌های عمده نیاز دارند.",
    descriptionAr:
      "حمص ٢١ معبأ للمشترين يبحثون عن خط بقوليات موثوق للمتاجر ومطابخ خدمات الطعام وقنوات الجملة.",
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
      "21 White Bean Bag is a staple legume pack for buyers who need practical bagged supply across wholesale and retail distribution.",
    descriptionFa:
      "لوبیا سفید کیسه‌ای ۲۱ از حبوبات پرمصرف است و برای خریدارانی عرضه می‌شود که به تأمین کیسه‌ای، کاربردی و مناسب توزیع عمده و فروشگاهی نیاز دارند.",
    descriptionAr:
      "كيس فاصوليا بيضاء ٢١ هو حزمة بقوليات أساسية للمشترين الذين يحتاجون إلى إمداد عملي في الأكياس عبر التوزيع بالجملة والتجزئة.",
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
      "21 Mung Bean is a versatile pulse product selected for stable access to everyday food staples and clean packaged presentation.",
    descriptionFa:
      "ماش ۲۱ از حبوبات کاربردی است که برای دسترسی پایدار به اقلام غذایی روزمره و عرضه‌ای تمیز و بسته‌بندی‌شده انتخاب می‌شود.",
    descriptionAr:
      "لوبيا مونغ ٢١ هو منتج بقوليات متعدد الاستخدامات مختار للوصول المستقر إلى الأغذية الأساسية اليومية والعرض النظيف المعبأ.",
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
      "21 Kidney Bean is a core legume product for retail, wholesale, and foodservice buyers looking for consistent packaged supply.",
    descriptionFa:
      "لوبیا قرمز ۲۱ از اقلام اصلی حبوبات برای خریداران فروشگاهی، عمده و خدمات غذایی است که به تأمین بسته‌بندی‌شده و منظم نیاز دارند.",
    descriptionAr:
      "فاصوليا كلية حمراء ٢١ هي منتج بقوليات أساسي للمشترين بالتجزئة والجملة وخدمات الطعام يبحثون عن إمداد معبأ متسق.",
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
      "21 Desi Chickpea is a focused pulse product for buyers who need a darker chickpea variety with reliable branded packaging.",
    descriptionFa:
      "نخود دسی ۲۱ محصولی تخصصی از گروه حبوبات است و برای خریدارانی عرضه می‌شود که به این رقم نخود با بسته‌بندی برنددار و قابل اتکا نیاز دارند.",
    descriptionAr:
      "حمص دesi ٢١ هو منتج بقوليات مركّز للمشترين الذين يحتاجون إلى صنف حمص أغمق مع تعبئة ماركة موثوقة.",
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
      "21 Popcorn Corn is packaged for snack producers, retailers, and wholesale buyers seeking dependable popcorn kernel supply.",
    descriptionFa:
      "ذرت پاپ‌کورن ۲۱ برای تولیدکنندگان تنقلات، فروشگاه‌ها و خریداران عمده‌ای عرضه می‌شود که به تأمین قابل اتکای دانه پاپ‌کورن نیاز دارند.",
    descriptionAr:
      "ذرة بوب كورن ٢١ معبأة لمنتجي الوجبات الخفيفة والتجار والمشترين بالجملة يبحثون عن إمداد حبوب بوب كورن موثوق.",
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
      "Golbanoo Sella Basmati Rice is a branded long-grain sella rice line for buyers who need consistent quality and strong shelf presence.",
    descriptionFa:
      "برنج سیلا باسماتی گلبانو، محصولی دانه‌بلند و برنددار است که برای کیفیت یکنواخت و حضور مناسب در قفسه فروشگاهی عرضه می‌شود.",
    descriptionAr:
      "أرز بسمتي سلا گلبانو هو خط أرز سلا حب طويل بماركة للمشترين الذين يحتاجون إلى جودة متسقة وحضور قوي على الرف.",
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
      "21 Sella Basmati Rice is a 1121 basmati sella product built for buyers seeking long-grain rice with recognizable 21 branding.",
    descriptionFa:
      "برنج سیلا باسماتی ۲۱ محصولی از نوع باسماتی ۱۱۲۱ است و برای خریدارانی عرضه می‌شود که به برنج دانه‌بلند با برند شناخته‌شده ۲۱ نیاز دارند.",
    descriptionAr:
      "أرز بسمتي سلا ٢١ هو منتج بسمتي ١١٢١ سلا مصمم للمشترين يبحثون عن أرز حب طويل مع ماركة ٢١ المعروفة.",
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
      "21 Black Pepper is a core seasoning product for retail and foodservice buyers who need reliable packaged spice supply.",
    descriptionFa:
      "فلفل سیاه ۲۱ از چاشنی‌های اصلی است و برای خریداران فروشگاهی و خدمات غذایی که به تأمین بسته‌بندی‌شده و قابل اعتماد ادویه نیاز دارند عرضه می‌شود.",
    descriptionAr:
      "فلفل أسود ٢١ هو منتج بهاري أساسي للمشترين بالتجزئة وخدمات الطعام الذين يحتاجون إلى إمداد توابل معبأ موثوق.",
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
      "21 Pinto Beans are a staple legume product for retail, wholesale, and foodservice buyers seeking reliable packaged supply.",
    descriptionFa:
      "لوبیا چیتی ۲۱ از حبوبات پرمصرف است و برای خریداران فروشگاهی، عمده و خدمات غذایی که به تأمین بسته‌بندی‌شده و قابل اعتماد نیاز دارند عرضه می‌شود.",
    descriptionAr:
      "فاصوليا بينتو ٢١ هي منتج بقوليات أساسية للمشترين بالتجزئة والجملة وخدمات الطعام يبحثون عن إمداد معبأ موثوق.",
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
      "21 Black-Eyed Peas are a versatile pulse line packaged for everyday cooking, foodservice use, and wholesale distribution.",
    descriptionFa:
      "لوبیا چشم بلبلی ۲۱ از حبوبات کاربردی است که برای مصرف روزمره، خدمات غذایی و توزیع عمده بسته‌بندی می‌شود.",
    descriptionAr:
      "لوبيا بقرة ٢١ هي خط بقوليات متعددة الاستخدامات معبأة للطهي اليومي وخدمات الطعام والتوزيع بالجملة.",
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
      "21 Green Lentils are a high-demand pulse product for everyday cooking, foodservice kitchens, and B2B staple-food procurement.",
    descriptionFa:
      "عدس سبز ۲۱ از حبوبات پرتقاضا برای مصرف روزمره، آشپزخانه‌های خدمات غذایی و تأمین عمده اقلام غذایی اساسی است.",
    descriptionAr:
      "عدس أخضر ٢١ هو منتج بقوليات عالي الطلب للطهي اليومي ومطابخ خدمات الطعام ومشتريات الأغذية الأساسية B2B.",
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
      "21 Sunflower Seeds are packaged whole for snack producers, retailers, and wholesale buyers seeking dependable seed supply.",
    descriptionFa:
      "تخمه آفتابگردان ۲۱ به‌صورت کامل برای تولیدکنندگان تنقلات، فروشگاه‌ها و خریداران عمده‌ای عرضه می‌شود که به تأمین قابل اتکای تخمه نیاز دارند.",
    descriptionAr:
      "بذور عباد الشمس ٢١ معبأة كاملة لمنتجي الوجبات الخفيفة والتجار والمشترين بالجملة يبحثون عن إمداد بذور موثوق.",
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
      "21 Pumpkin Seeds are packaged whole for snack, retail, and ingredient buyers who need consistent quality and steady availability.",
    descriptionFa:
      "تخمه کدو ۲۱ به‌صورت کامل برای خریداران حوزه تنقلات، فروشگاهی و مواد اولیه عرضه می‌شود که به کیفیت یکنواخت و دسترسی پایدار نیاز دارند.",
    descriptionAr:
      "بذور اليقطين ٢١ معبأة كاملة لمشتري الوجبات الخفيفة والتجزئة والمكونات الذين يحتاجون إلى جودة متسقة وإمداد مستقر.",
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
      "21 Sesame Seeds support bakery, foodservice, and ingredient buyers with clean packaged seeds and dependable availability.",
    descriptionFa:
      "کنجد ۲۱ برای خریداران حوزه نانوایی، خدمات غذایی و مواد اولیه عرضه می‌شود؛ با بسته‌بندی تمیز و دسترسی پایدار.",
    descriptionAr:
      "سمسم ٢١ يدعم مشتري المخبوزات وخدمات الطعام والمكونات بالبذور المعبأة النظيفة والإمداد الموثوق.",
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
      "21 Peanuts are positioned for snack producers, retail, and wholesale buyers who need a familiar nut product with steady supply.",
    descriptionFa:
      "بادام زمینی ۲۱ برای تولیدکنندگان تنقلات، فروشگاه‌ها و خریداران عمده‌ای عرضه می‌شود که به محصولی شناخته‌شده با تأمین پایدار نیاز دارند.",
    descriptionAr:
      "فول سوداني ٢١ موجه لمنتجي الوجبات الخفيفة والتجزئة والجملة الذين يحتاجون إلى منتج مكسرات معروف مع إمداد مستقر.",
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
      "21 Desiccated Coconut is a packaged coconut powder for bakery, confectionery, and retail buyers seeking consistent quality and supply.",
    descriptionFa:
      "پودر نارگیل ۲۱ محصولی بسته‌بندی‌شده برای خریداران حوزه نانوایی، شیرینی‌پزی و فروشگاهی است که به کیفیت و تأمین یکنواخت نیاز دارند.",
    descriptionAr:
      "مسحوق جوز الهند ٢١ هو منتج معبأ لمشتري المخبوزات والحلويات والتجزئة يبحثون عن جودة وإمداد متسقين.",
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
      "21 Cardamom is an aromatic spice product for foodservice, retail, and wholesale buyers seeking consistent flavor and packaged supply.",
    descriptionFa:
      "هل ۲۱ از ادویه‌های خوش‌عطر است و برای خریداران خدمات غذایی، فروشگاهی و عمده که به طعم یکدست و بسته‌بندی منظم نیاز دارند عرضه می‌شود.",
    descriptionAr:
      "هيل ٢١ هو منتج بهاري عطري لخدمات الطعام والبيع بالتجزئة والجملة يبحثون عن طعم متسق وتعبئة معبأة.",
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
      "21 Sugar is a core sweetener product for retail, foodservice, and wholesale buyers who need reliable packaged supply.",
    descriptionFa:
      "شکر ۲۱ از شیرین‌کننده‌های اصلی است و برای خریداران فروشگاهی، خدمات غذایی و عمده که به تأمین بسته‌بندی‌شده و قابل اعتماد نیاز دارند عرضه می‌شود.",
    descriptionAr:
      "سكر ٢١ هو منتج حلوى أساسي للمشترين بالتجزئة وخدمات الطعام والجملة الذين يحتاجون إلى إمداد معبأ موثوق.",
    ...imageSet(productImages.sugar),
  },
];
