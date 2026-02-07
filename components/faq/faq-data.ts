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
    questionEn: "Where do you source your products?",
    questionFa: "محصولات شما از کجا تامین می‌شوند؟",
    answerEn:
      "We partner directly with premium producers in Iran's most renowned agricultural regions—Khorasan (saffron, nuts), Yazd (dates), and Rafsanjan (pistachios). All partnerships are audited annually to ensure compliance with international quality standards.",
    answerFa:
      "ما با تولیدکنندگان برتر در معروف‌ترین مناطق کشاورزی ایران—خراسان (زعفران، آجیل)، یزد (خرما) و رفسنجان (فستق) مشارکت داریم. تمام مشارکت‌ها سالانه بازرسی می‌شوند تا انطباق با استانداردهای کیفیت بین‌المللی را تضمین کنند.",
    category: "sourcing",
  },
  {
    id: 2,
    questionEn: "What are your minimum order quantities (MOQ)?",
    questionFa: "حداقل سفارش شما چقدر است؟",
    answerEn:
      "MOQ varies by product. Most products start at 5-10 kg. For private labeling, we accept orders from 5,000 kg upward. Contact our sales team for specific MOQ information on products you're interested in.",
    answerFa:
      "MOQ بر اساس محصول متفاوت است. اکثر محصولات از ۵-۱۰ کیلوگرم شروع می‌شوند. برای علامت‌گذاری خصوصی، ما سفارشات از ۵۰۰۰ کیلوگرم به بالا را پذیرش می‌کنیم.",
    category: "moq",
  },
  {
    id: 3,
    questionEn: "What are typical lead times for orders?",
    questionFa: "مدت زمان معمول تحویل سفارش چقدر است؟",
    answerEn:
      "Standard lead time is 4-6 weeks for regular orders, depending on product availability and shipping logistics. Private label orders typically take 8-12 weeks from initial consultation to delivery. Expedited options are available upon request.",
    answerFa:
      "مدت زمان معمول ۴-۶ هفته برای سفارشات معمولی است، بسته به دستیابی محصول و لجستیک حمل‌ونقل. سفارشات علامت‌گذاری خصوصی معمولاً ۸-۱۲ هفته طول می‌کشند. گزینه‌های شتاب‌زده در دسترس هستند.",
    category: "lead-time",
  },
  {
    id: 4,
    questionEn: "Are all your products certified for international export?",
    questionFa: "آیا تمام محصولات شما برای صادرات بین‌المللی معتبر هستند؟",
    answerEn:
      "Yes. All our products carry ISO 22000, HACCP, and FSSC 22000 certifications. Many are also Halal certified. We provide complete documentation including Certificates of Analysis, phytosanitary certificates, and health clearances for every shipment.",
    answerFa:
      "بله. تمام محصولات ما دارای گواهی‌های ISO 22000، HACCP و FSSC 22000 هستند. بسیاری از آنها نیز معتبر حلال هستند. ما اسناد کاملی از جمله گواهی‌های تجزیه، گواهی‌های فیتوسانیتری و رفع موانع سلامتی برای هر کشتی فراهم می‌کنیم.",
    category: "certifications",
  },
  {
    id: 5,
    questionEn: "How do you ensure product quality and food safety?",
    questionFa: "چگونه کیفیت محصول و ایمنی غذایی را تضمین می‌کنید؟",
    answerEn:
      "Our six-stage quality control process includes producer audits, harvest monitoring, lab testing (third-party), packaging inspection, cold chain management, and complete documentation. Every batch is tested before shipment.",
    answerFa:
      "فرایند کنترل کیفیت شش‌مرحله‌ای ما شامل بازرسی تولیدکننده، نظارت بر برداشت، آزمایش آزمایشگاه (شخص ثالث)، بازرسی بسته‌بندی، مدیریت زنجیره سرد و مستندات کامل است.",
    category: "certifications",
  },
  {
    id: 6,
    questionEn: "Do you offer private labeling services?",
    questionFa: "آیا خدمات علامت‌گذاری خصوصی ارائه می‌دهید؟",
    answerEn:
      "Yes. We offer complete white-label solutions with flexible MOQs starting at 5,000 kg, custom packaging design, and quick turnaround (8-12 weeks). Our team handles the entire process from consultation to delivery.",
    answerFa:
      "بله. ما راه‌حل‌های علامت‌گذاری خصوصی کامل را با MOQ انعطاف‌پذیر از ۵۰۰۰ کیلوگرم، طراحی بسته‌بندی سفارشی و بازگشت سریع (۸-۱۲ هفته) ارائه می‌دهیم.",
    category: "private-label",
  },
  {
    id: 7,
    questionEn: "What are your shipping and logistics options?",
    questionFa: "گزینه‌های حمل‌ونقل و لجستیک شما چیست؟",
    answerEn:
      "We arrange FCL (Full Container Load), LCL (Less than Container Load), and air freight depending on urgency. All shipments include temperature-controlled containers, tracking, and full documentation. Standard shipping is FOB Tehran.",
    answerFa:
      "ما FCL (بار کامل کانتینر)، LCL (کمتر از بار کانتینر) و حمل‌ونقل هوایی را بر اساس فوریت ترتیب می‌دهیم. تمام کشتی‌ها شامل کانتینر‌های کنترل‌شده‌ی دما، پیگیری و اسناد کامل است.",
    category: "logistics",
  },
  {
    id: 8,
    questionEn: "How do I request a custom quote?",
    questionFa: "چگونه قیمت سفارشی درخواست کنم؟",
    answerEn:
      "Contact our sales team via the Contact page with your product of interest, desired quantity, destination country, and timeline. We'll respond within 24-48 hours with a detailed quote, product samples (if applicable), and next steps.",
    answerFa:
      "با تیم فروش ما از طریق صفحه تماس تماس بگیرید و محصول مورد علاقه، مقدار مورد نظر، کشور مقصد و زمان‌بندی را اطلاع دهید. ما در ۲۴-۴۸ ساعت پاسخ خواهیم داد.",
    category: "moq",
  },
];

export const faqCategories = {
  sourcing: { en: "Sourcing", fa: "تامین" },
  moq: { en: "MOQ & Pricing", fa: "MOQ و قیمت‌گذاری" },
  "lead-time": { en: "Lead Times", fa: "مدت زمان تحویل" },
  certifications: { en: "Quality & Certifications", fa: "کیفیت و گواهی‌ها" },
  logistics: { en: "Shipping & Logistics", fa: "حمل‌ونقل و لجستیک" },
  "private-label": { en: "Private Labeling", fa: "علامت‌گذاری خصوصی" },
};
