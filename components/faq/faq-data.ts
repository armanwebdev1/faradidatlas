export interface FAQItem {
  id: number;
  questionEn: string;
  questionFa: string;
  answerEn: string;
  answerFa: string;
  category:
    | "company"
    | "products"
    | "sourcing"
    | "quality"
    | "vision"
    | "values"
    | "inquiry";
}

export const faqs: FAQItem[] = [
  {
    id: 1,
    questionEn: "What is Faradid Atlas' purpose?",
    questionFa: "هدف فرادید اطلس چیست؟",
    answerEn:
      "Faradid Atlas was established in 2009 to help strengthen food security and support access to essential foods for the Iranian market.",
    answerFa:
      "فرادید اطلس در سال ۱۳۸۸ با هدف کمک به تقویت امنیت غذایی و پشتیبانی از دسترسی بازار ایران به مواد غذایی اساسی شکل گرفت.",
    category: "company",
  },
  {
    id: 2,
    questionEn: "What products are included in the portfolio?",
    questionFa: "چه محصولاتی در سبد شرکت قرار دارد؟",
    answerEn:
      "The DOCX-defined portfolio includes rice, legumes and pulses, seeds and kernels, nuts, spices and seasonings, and sugar.",
    answerFa:
      "سبد تعریف‌شده در متن مرجع شامل برنج، حبوبات، دانه‌ها و مغزها، آجیل، ادویه‌جات و چاشنی‌ها و شکر است.",
    category: "products",
  },
  {
    id: 3,
    questionEn: "Which rice brands are associated with Faradid Atlas?",
    questionFa: "کدام برندهای برنج با فرادید اطلس شناخته می‌شوند؟",
    answerEn:
      "Faradid Atlas is associated with four rice brands: 21, Mizban, Hayat, and Golbanou.",
    answerFa:
      "فرادید اطلس با چهار برند برنج ۲۱، میزبان، حیات و گلبانو شناخته می‌شود.",
    category: "products",
  },
  {
    id: 4,
    questionEn: "Where are the company offices listed?",
    questionFa: "دفاتر شرکت در کجا معرفی شده‌اند؟",
    answerEn:
      "The DOCX lists company offices in Tehran, Isfahan, Dubai, and Oman. Shahrekord is referenced as operational and warehouse support in Iran.",
    answerFa:
      "در متن مرجع، دفاتر شرکت در تهران، اصفهان، دبی و عمان معرفی شده‌اند. شهرکرد به‌عنوان پشتیبانی عملیاتی و انباری در ایران ذکر می‌شود.",
    category: "company",
  },
  {
    id: 5,
    questionEn: "How does Faradid Atlas approach sourcing?",
    questionFa: "رویکرد فرادید اطلس در تامین چیست؟",
    answerEn:
      "The company works to shorten the global food supply chain, remove unnecessary intermediaries, and cooperate directly with first-tier suppliers, especially in India and Pakistan.",
    answerFa:
      "شرکت تلاش می‌کند زنجیره تامین جهانی غذا را کوتاه‌تر کند، واسطه‌های غیرضروری را حذف کند و با تامین‌کنندگان رده‌اول، به‌ویژه در هند و پاکستان، همکاری مستقیم داشته باشد.",
    category: "sourcing",
  },
  {
    id: 6,
    questionEn: "How is quality described in the source content?",
    questionFa: "کیفیت در متن مرجع چگونه توصیف شده است؟",
    answerEn:
      "Products are selected according to global quality and hygiene standards, with ISO 22000 named as a guiding discipline for food safety and quality systems.",
    answerFa:
      "محصولات بر اساس استانداردهای جهانی کیفیت و بهداشت انتخاب می‌شوند و ISO 22000 به‌عنوان مبنای نظم ایمنی و کیفیت غذا مطرح شده است.",
    category: "quality",
  },
  {
    id: 7,
    questionEn: "What is the 2030 / 1409 vision?",
    questionFa: "چشم‌انداز ۲۰۳۰ / ۱۴۰۹ چیست؟",
    answerEn:
      "Faradid Atlas aims to reach a 25% share of Iran's essential food products market by 2030 while expanding its focus across the United Arab Emirates, India, and Oman.",
    answerFa:
      "فرادید اطلس هدف دارد تا سال ۱۴۰۹ شمسی / ۲۰۳۰ میلادی به سهم ۲۵ درصدی بازار محصولات غذایی اساسی ایران برسد و تمرکز خود را در امارات، هند و عمان توسعه دهد.",
    category: "vision",
  },
  {
    id: 8,
    questionEn: "What values guide the company?",
    questionFa: "چه ارزش‌هایی راهنمای شرکت هستند؟",
    answerEn:
      "The core values are customer-centricity, sustainability, professional ethics, innovation, and superior quality.",
    answerFa:
      "ارزش‌های بنیادین شرکت شامل مشتری‌مداری، پایداری، اخلاق حرفه‌ای، نوآوری و کیفیت برتر است.",
    category: "values",
  },
  {
    id: 9,
    questionEn: "Who does Faradid Atlas serve?",
    questionFa: "فرادید اطلس به چه گروه‌هایی خدمت می‌کند؟",
    answerEn:
      "The mission names individuals, wholesalers, organizations, and governmental bodies as audiences for high-quality, cost-effective food supply.",
    answerFa:
      "در ماموریت شرکت، افراد، عمده‌فروشان، سازمان‌ها و نهادهای دولتی به‌عنوان مخاطبان تامین مواد غذایی باکیفیت و مقرون‌به‌صرفه مطرح شده‌اند.",
    category: "inquiry",
  },
  {
    id: 10,
    questionEn: "What should be included in a product inquiry?",
    questionFa: "در یک درخواست محصول چه اطلاعاتی بهتر است ارائه شود؟",
    answerEn:
      "Share the product or category, expected volume, destination, and timing so the team can review sourcing and distribution next steps.",
    answerFa:
      "محصول یا گروه محصول، حجم مورد انتظار، مقصد و زمان‌بندی را اعلام کنید تا تیم شرکت گام‌های بعدی تامین و توزیع را بررسی کند.",
    category: "inquiry",
  },
];

export const faqCategories = {
  company: { en: "Company", fa: "شرکت" },
  products: { en: "Products", fa: "محصولات" },
  sourcing: { en: "Sourcing", fa: "تامین" },
  quality: { en: "Quality", fa: "کیفیت" },
  vision: { en: "Vision", fa: "چشم‌انداز" },
  values: { en: "Values", fa: "ارزش‌ها" },
  inquiry: { en: "Inquiry", fa: "درخواست" },
};
