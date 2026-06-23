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
      "فرادید اطلس در سال ۱۳۸۸ با هدف تقویت امنیت غذایی و آسان‌تر کردن دسترسی بازار ایران به مواد غذایی اساسی شکل گرفت.",
    category: "company",
  },
  {
    id: 2,
    questionEn: "What products are included in the portfolio?",
    questionFa: "چه محصولاتی در سبد فرادید اطلس قرار دارد؟",
    answerEn:
      "The portfolio includes rice, legumes and pulses, seeds and kernels, nuts, spices and seasonings, and sugar.",
    answerFa:
      "سبد محصولات فرادید اطلس شامل برنج، حبوبات، دانه‌ها، مغزها، ادویه‌ها، چاشنی‌ها و شکر است.",
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
    questionFa: "دفاتر فرادید اطلس در کجا قرار دارند؟",
    answerEn:
      "The company has offices in Tehran, Isfahan, Dubai, and Oman, with Shahrekord supporting operations and warehousing in Iran.",
    answerFa:
      "دفاتر شرکت در تهران، اصفهان، دبی و عمان قرار دارند. شهرکرد نیز به‌عنوان پشتیبانی عملیاتی و انباری در ایران در نظر گرفته می‌شود.",
    category: "company",
  },
  {
    id: 5,
    questionEn: "How does Faradid Atlas approach sourcing?",
    questionFa: "رویکرد فرادید اطلس در تأمین چیست؟",
    answerEn:
      "The company works to shorten the global food supply chain, remove unnecessary intermediaries, and cooperate directly with first-tier suppliers, especially in India and Pakistan.",
    answerFa:
      "فرادید اطلس تلاش می‌کند مسیر زنجیره تأمین مواد غذایی را کوتاه‌تر کند، واسطه‌های غیرضروری را کاهش دهد و با تأمین‌کنندگان معتبر، به‌ویژه در هند و پاکستان، همکاری مستقیم داشته باشد.",
    category: "sourcing",
  },
  {
    id: 6,
    questionEn: "How does Faradid Atlas approach quality?",
    questionFa: "رویکرد فرادید اطلس در کیفیت چگونه است؟",
    answerEn:
      "Products are selected according to global quality and hygiene standards, with ISO 22000 named as a guiding discipline for food safety and quality systems.",
    answerFa:
      "محصولات بر پایه معیارهای معتبر کیفی و بهداشتی انتخاب می‌شوند و استاندارد ISO 22000 به‌عنوان یکی از مبناهای نظم در ایمنی و کیفیت مواد غذایی مورد توجه قرار دارد.",
    category: "quality",
  },
  {
    id: 7,
    questionEn: "What is the 2030 / 1409 vision?",
    questionFa: "چشم‌انداز ۲۰۳۰ / ۱۴۰۹ چیست؟",
    answerEn:
      "Faradid Atlas aims to reach a 25% share of Iran's essential food products market by 2030 while expanding its focus across the United Arab Emirates, India, and Oman.",
    answerFa:
      "فرادید اطلس در نظر دارد تا سال ۱۴۰۹ شمسی / ۲۰۳۰ میلادی به سهم ۲۵ درصدی از بازار محصولات غذایی اساسی ایران برسد و فعالیت خود را در امارات، هند و عمان توسعه دهد.",
    category: "vision",
  },
  {
    id: 8,
    questionEn: "What values guide the company?",
    questionFa: "چه ارزش‌هایی راهنمای فرادید اطلس هستند؟",
    answerEn:
      "The core values are customer-centricity, sustainability, professional ethics, innovation, and superior quality.",
    answerFa:
      "مشتری‌مداری، پایداری، اخلاق حرفه‌ای، نوآوری و کیفیت برتر از ارزش‌های بنیادین فرادید اطلس هستند.",
    category: "values",
  },
  {
    id: 9,
    questionEn: "Who does Faradid Atlas serve?",
    questionFa: "فرادید اطلس با چه گروه‌هایی همکاری می‌کند؟",
    answerEn:
      "The mission names individuals, wholesalers, organizations, and governmental bodies as audiences for high-quality, cost-effective food supply.",
    answerFa:
      "فرادید اطلس با خریداران فردی، عمده‌فروشان، سازمان‌ها و نهادهای دولتی همکاری می‌کند تا دسترسی به مواد غذایی باکیفیت و مقرون‌به‌صرفه آسان‌تر شود.",
    category: "inquiry",
  },
  {
    id: 10,
    questionEn: "What should be included in a product inquiry?",
    questionFa: "در درخواست محصول چه اطلاعاتی بهتر است ارسال شود؟",
    answerEn:
      "Share the product or category, expected volume, destination, and timing so the team can review sourcing and distribution next steps.",
    answerFa:
      "بهتر است نام محصول یا گروه محصول، حجم موردنیاز، مقصد و زمان‌بندی موردنظر را اعلام کنید تا تیم فرادید اطلس مراحل بعدی تأمین و توزیع را بررسی کند.",
    category: "inquiry",
  },
];

export const faqCategories = {
  company: { en: "Company", fa: "شرکت" },
  products: { en: "Products", fa: "محصولات" },
  sourcing: { en: "Sourcing", fa: "تأمین" },
  quality: { en: "Quality", fa: "کیفیت" },
  vision: { en: "Vision", fa: "چشم‌انداز" },
  values: { en: "Values", fa: "ارزش‌ها" },
  inquiry: { en: "Inquiry", fa: "درخواست" },
};
