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
