export interface FAQItem {
  id: number;
  questionEn: string;
  questionFa: string;
  answerEn: string;
  answerFa: string;
  category:
    | "sourcing"
    | "moq"
    | "lead-time"
    | "certifications"
    | "logistics"
    | "private-label";
}

export const faqs: FAQItem[] = [
  {
    id: 1,
    questionEn: "What products does Faradid Atlas supply?",
    questionFa: "فرادید اطلس چه محصولاتی را تامین می‌کند؟",
    answerEn:
      "Our core portfolio includes rice, legumes, spices, nuts, seeds, sugar, and other essential food products for B2B buyers, retailers, wholesalers, organizations, and foodservice partners.",
    answerFa:
      "سبد اصلی ما شامل برنج، حبوبات، ادویه‌جات، آجیل، دانه‌ها، شکر و سایر مواد غذایی اساسی برای خریداران B2B، خرده‌فروشان، عمده‌فروشان، سازمان‌ها و شرکای خدمات غذایی است.",
    category: "sourcing",
  },
  {
    id: 2,
    questionEn: "Where do you source your products from?",
    questionFa: "محصولات از کجا تامین می‌شوند؟",
    answerEn:
      "We work with first-tier suppliers in key food-producing markets, especially India and Pakistan, and select products based on quality, hygiene, availability, and commercial fit.",
    answerFa:
      "ما با تامین‌کنندگان رده‌اول در بازارهای کلیدی مواد غذایی، به‌ویژه هند و پاکستان، همکاری می‌کنیم و محصولات را بر اساس کیفیت، بهداشت، دسترسی و تناسب تجاری انتخاب می‌کنیم.",
    category: "sourcing",
  },
  {
    id: 3,
    questionEn: "Do you own or manage rice brands?",
    questionFa: "آیا برندهای برنج هم در اختیار دارید؟",
    answerEn:
      "Yes. Faradid Atlas is associated with four recognized rice brands: 21, Mizban, Hayat, and Golbanou. These brands support our rice portfolio across Iran and the wider region.",
    answerFa:
      "بله. فرادید اطلس با چهار برند شناخته‌شده برنج یعنی ۲۱، میزبان، حیات و گل‌بانو شناخته می‌شود. این برندها سبد برنج ما را در ایران و منطقه پشتیبانی می‌کنند.",
    category: "sourcing",
  },
  {
    id: 4,
    questionEn: "How do you manage quality and food safety?",
    questionFa: "کیفیت و ایمنی غذایی چگونه مدیریت می‌شود؟",
    answerEn:
      "Products are selected and handled according to international quality and hygiene standards, including ISO 22000-led discipline. We focus on quality checks, documentation, storage, and distribution controls.",
    answerFa:
      "محصولات بر اساس استانداردهای بین‌المللی کیفیت و بهداشت، از جمله رویکرد مبتنی بر ISO 22000، انتخاب و مدیریت می‌شوند. کنترل کیفیت، مستندسازی، انبارداری و کنترل توزیع برای ما مهم است.",
    category: "certifications",
  },
  {
    id: 5,
    questionEn: "How is pricing handled?",
    questionFa: "قیمت‌گذاری چگونه انجام می‌شود؟",
    answerEn:
      "Pricing depends on product, grade, volume, packaging, origin, and timing. Our approach is based on rational margins and competitive market conditions, so every quote is prepared after reviewing the inquiry.",
    answerFa:
      "قیمت به محصول، گرید، حجم، بسته‌بندی، مبدا و زمان‌بندی بستگی دارد. رویکرد ما بر حاشیه سود منطقی و شرایط رقابتی بازار است؛ بنابراین هر قیمت پس از بررسی درخواست آماده می‌شود.",
    category: "moq",
  },
  {
    id: 6,
    questionEn: "What regions do you operate in?",
    questionFa: "در چه مناطقی فعالیت دارید؟",
    answerEn:
      "We operate through offices, branches, and warehouse access in important Iranian locations including Tehran, Isfahan, and Shahrekord, with regional trade access through the UAE and Oman.",
    answerFa:
      "ما از طریق دفاتر، شعب و دسترسی انباری در نقاط مهم ایران از جمله تهران، اصفهان و شهرکرد فعالیت می‌کنیم و از طریق امارات و عمان نیز دسترسی تجاری منطقه‌ای داریم.",
    category: "logistics",
  },
  {
    id: 7,
    questionEn: "How long does a B2B inquiry take?",
    questionFa: "بررسی یک درخواست B2B چقدر زمان می‌برد؟",
    answerEn:
      "We usually respond within 24-48 hours. Clear details about product, volume, destination, and timeline help us review supply options and prepare practical next steps faster.",
    answerFa:
      "معمولا طی ۲۴ تا ۴۸ ساعت پاسخ می‌دهیم. اعلام دقیق محصول، حجم، مقصد و زمان‌بندی کمک می‌کند گزینه‌های تامین و گام‌های بعدی سریع‌تر بررسی شوند.",
    category: "lead-time",
  },
  {
    id: 8,
    questionEn: "Can you support custom packaging or retail-ready formats?",
    questionFa: "آیا بسته‌بندی سفارشی یا آماده فروش ارائه می‌کنید؟",
    answerEn:
      "Yes, depending on product and order requirements. We can discuss bulk formats, retail-ready packs, and market-specific packaging needs during the inquiry process.",
    answerFa:
      "بله، بسته به محصول و شرایط سفارش. در فرآیند بررسی درخواست می‌توانیم درباره فرمت‌های فله، بسته‌بندی آماده فروش و نیازهای اختصاصی بازار گفتگو کنیم.",
    category: "private-label",
  },
];

export const faqCategories = {
  sourcing: { en: "Products & Sourcing", fa: "محصولات و تامین" },
  moq: { en: "Pricing", fa: "قیمت‌گذاری" },
  "lead-time": { en: "Response Time", fa: "زمان پاسخ‌گویی" },
  certifications: { en: "Quality Standards", fa: "استانداردهای کیفیت" },
  logistics: { en: "Distribution", fa: "توزیع" },
  "private-label": { en: "Packaging", fa: "بسته‌بندی" },
};
