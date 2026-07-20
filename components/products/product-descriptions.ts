import type { ProductCategory } from "./product-types";

export const categoryDescriptions: Record<
  ProductCategory,
  {
    h2: { en: string; fa: string; ar: string };
    description: { en: string; fa: string; ar: string };
  }
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
      fa: "آجیل و خشکبار",
      ar: "البذور واللوزيات",
    },
    description: {
      en: "Faradid Atlas provides sunflower seeds, pumpkin kernels, and other seed varieties for wholesale distribution. Our products are carefully selected and processed to maintain freshness and nutritional value throughout the supply chain.",
      fa: "فرادید اطلس تخمه آفتابگردان، تخمه کدو و سایر انواع خشکبار را بصورت عمده عرضه می‌کند. محصولات ما با دقت انتخاب و فرآوری می‌شوند تا تازگی و ارزش غذایی آن‌ها در طول زنجیره تأمین حفظ شود.",
      ar: "يوفر فراديد اطلس بذور عباد الشمس وبذور اليقطين وأنواع البذور الأخرى للتوزيع بالجملة. يتم اختيار منتجاتنا ومعالجتها بعناية للحفاظ على النضال والقيمة الغذائية طوال سلسلة التوريد.",
    },
  },
  nuts: {
    h2: {
      en: "Premium Nuts",
      fa: "آجیل مرغوب",
      ar: "المكسرات الممتازة",
    },
    description: {
      en: "Our nut portfolio features walnut kernels, cashews, and other premium varieties. Each product is sourced from trusted origins and processed under strict quality controls to meet the demands of wholesale buyers and food manufacturers.",
      fa: "سبد آجیل فرادید اطلس شامل مغز گردو، بادام هندی و سایر انواع مرغوب است. هر محصول از مبادی معتبر تأمین و تحت کنترل کیفیت دقیق فرآوری می‌شود تا نیازهای خریداران عمده و تولیدکنندگان غذا را برآورده کند.",
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
      fa: "شکر",
      ar: "المحليات والسكر",
    },
    description: {
      en: "Our sweeteners category includes refined and specialty sugar products for industrial and commercial use. Faradid Atlas ensures consistent supply and competitive pricing for B2B buyers across the region.",
      fa: "دسته‌بندی شکر فرادید اطلس شامل شکر تصفیه‌شده و تخصصی برای مصارف صنعتی و تجاری است. فرادید اطلس تأمین پایدار و قیمت رقابتی را برای خریداران عمده در سراسر منطقه تضمین می‌کند.",
      ar: "يشمل فئة المحليات لدينا منتجات السكر المكرر والمتخصصة للاستخدام الصناعي والتجاري. يضمن فراديد اطلس توريداً مستمراً وتنافسية الأسعار للمشترين بالجملة في المنطقة.",
    },
  },
};
