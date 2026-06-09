export interface Job {
  id: number;
  titleEn: string;
  titleFa: string;
  departmentEn: string;
  departmentFa: string;
  locationEn: string;
  locationFa: string;
  type: "full-time" | "part-time" | "contract";
  descriptionEn: string;
  descriptionFa: string;
  responsibilitiesEn: string[];
  responsibilitiesFa: string[];
  requirementsEn: string[];
  requirementsFa: string[];
  benefitsEn: string[];
  benefitsFa: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    titleEn: "Supply Chain & Procurement",
    titleFa: "زنجیره تامین و خرید",
    departmentEn: "Operations",
    departmentFa: "عملیات",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و عملیات منطقه‌ای",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people who can support shorter, more reliable food supply chains and first-tier supplier coordination.",
    descriptionFa:
      "حوزه‌ای همیشگی برای افرادی که می‌توانند به کوتاه‌تر و قابل‌اتکاتر شدن زنجیره تامین غذا و هماهنگی با تامین‌کنندگان رده‌اول کمک کنند.",
    responsibilitiesEn: [
      "Support sourcing coordination for essential food products",
      "Help maintain visibility across procurement, import, storage, and distribution",
      "Contribute to supplier diversification and strategic inventory discipline",
      "Coordinate practical next steps for wholesalers, organizations, and buyers",
    ],
    responsibilitiesFa: [
      "پشتیبانی از هماهنگی تامین محصولات غذایی اساسی",
      "کمک به شفافیت در خرید، واردات، نگهداری و توزیع",
      "مشارکت در تنوع‌بخشی تامین‌کنندگان و نظم موجودی راهبردی",
      "هماهنگی گام‌های عملی برای عمده‌فروشان، سازمان‌ها و خریداران",
    ],
    requirementsEn: [
      "Interest in food supply, sourcing, and distribution",
      "Strong follow-up, documentation, and coordination habits",
      "Respect for professional ethics and transparent communication",
      "Comfort working with cross-functional commercial and operations teams",
    ],
    requirementsFa: [
      "علاقه به تامین، خرید و توزیع مواد غذایی",
      "عادت کاری قوی در پیگیری، مستندسازی و هماهنگی",
      "پایبندی به اخلاق حرفه‌ای و ارتباط شفاف",
      "توانایی همکاری با تیم‌های تجاری و عملیاتی",
    ],
    benefitsEn: [
      "Customer-centric mindset",
      "Supply continuity",
      "Professional ethics",
      "Practical problem-solving",
    ],
    benefitsFa: [
      "نگاه مشتری‌مدار",
      "استمرار تامین",
      "اخلاق حرفه‌ای",
      "حل مسئله عملی",
    ],
  },
  {
    id: 2,
    titleEn: "Quality & Food Safety",
    titleFa: "کیفیت و ایمنی غذا",
    departmentEn: "Quality",
    departmentFa: "کیفیت",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و عملیات منطقه‌ای",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people committed to superior quality, hygiene standards, and ISO 22000-led operating discipline.",
    descriptionFa:
      "حوزه‌ای همیشگی برای افرادی که به کیفیت برتر، استانداردهای بهداشتی و نظم عملیاتی مبتنی بر ISO 22000 متعهد هستند.",
    responsibilitiesEn: [
      "Support quality checks across import, warehousing, and distribution",
      "Help maintain food safety and hygiene documentation",
      "Contribute to training and value-based supplier evaluation",
      "Protect trust in Faradid Atlas products and brands",
    ],
    responsibilitiesFa: [
      "پشتیبانی از کنترل کیفیت در واردات، انبارداری و توزیع",
      "کمک به نگهداری مستندات ایمنی و بهداشت غذا",
      "مشارکت در آموزش و ارزیابی تامین‌کنندگان بر پایه ارزش‌ها",
      "حفظ اعتماد به محصولات و برندهای فرادید اطلس",
    ],
    requirementsEn: [
      "Interest in food quality and hygiene standards",
      "Careful documentation and attention to detail",
      "Commitment to transparency and accountable operations",
      "Ability to improve routines through training and feedback",
    ],
    requirementsFa: [
      "علاقه به کیفیت غذا و استانداردهای بهداشتی",
      "دقت در مستندسازی و توجه به جزئیات",
      "تعهد به شفافیت و عملیات پاسخ‌گو",
      "توانایی بهبود روال‌ها از طریق آموزش و بازخورد",
    ],
    benefitsEn: [
      "Superior quality",
      "ISO-led discipline",
      "Accountability",
      "Continuous improvement",
    ],
    benefitsFa: [
      "کیفیت برتر",
      "نظم مبتنی بر ISO",
      "پاسخ‌گویی",
      "بهبود مستمر",
    ],
  },
  {
    id: 3,
    titleEn: "Sales, Distribution & Customer Relations",
    titleFa: "فروش، توزیع و ارتباط با مشتریان",
    departmentEn: "Commercial",
    departmentFa: "تجاری",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و عملیات منطقه‌ای",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people who can build long-term trust with individuals, wholesalers, organizations, and foodservice buyers.",
    descriptionFa:
      "حوزه‌ای همیشگی برای افرادی که می‌توانند با افراد، عمده‌فروشان، سازمان‌ها و خریداران خدمات غذایی اعتماد بلندمدت ایجاد کنند.",
    responsibilitiesEn: [
      "Understand buyer needs across the essential food portfolio",
      "Coordinate product inquiries with operations and sourcing teams",
      "Support digital sales channels and practical customer feedback loops",
      "Build relationships through honesty, clarity, and consistent follow-up",
    ],
    responsibilitiesFa: [
      "درک نیاز خریداران در سراسر سبد مواد غذایی اساسی",
      "هماهنگی درخواست‌های محصول با تیم‌های عملیات و تامین",
      "پشتیبانی از کانال‌های فروش دیجیتال و چرخه‌های بازخورد مشتری",
      "ایجاد رابطه با صداقت، شفافیت و پیگیری منظم",
    ],
    requirementsEn: [
      "Customer-oriented communication",
      "Ability to translate inquiries into practical next steps",
      "Respect for long-term trust over short-term transactions",
      "Interest in food products and regional distribution",
    ],
    requirementsFa: [
      "ارتباط مشتری‌مدار",
      "توانایی تبدیل درخواست‌ها به گام‌های عملی بعدی",
      "اولویت دادن به اعتماد بلندمدت نسبت به معامله کوتاه‌مدت",
      "علاقه به محصولات غذایی و توزیع منطقه‌ای",
    ],
    benefitsEn: [
      "Customer-centricity",
      "Long-term trust",
      "Digital channels",
      "Clear communication",
    ],
    benefitsFa: [
      "مشتری‌مداری",
      "اعتماد بلندمدت",
      "کانال‌های دیجیتال",
      "ارتباط شفاف",
    ],
  },
];
