export interface Job {
  id: number;
  titleEn: string;
  titleFa: string;
  titleAr: string;
  departmentEn: string;
  departmentFa: string;
  departmentAr: string;
  locationEn: string;
  locationFa: string;
  locationAr: string;
  type: "full-time" | "part-time" | "contract";
  descriptionEn: string;
  descriptionFa: string;
  descriptionAr: string;
  responsibilitiesEn: string[];
  responsibilitiesFa: string[];
  responsibilitiesAr: string[];
  requirementsEn: string[];
  requirementsFa: string[];
  requirementsAr: string[];
  benefitsEn: string[];
  benefitsFa: string[];
  benefitsAr: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    titleEn: "Supply Chain & Procurement",
    titleFa: "زنجیره تأمین و خرید",
    titleAr: "سلسلة التزويد والمشتريات",
    departmentEn: "Operations",
    departmentFa: "عملیات",
    departmentAr: "العمليات",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و فعالیت‌های منطقه‌ای",
    locationAr: "إيران والعمليات الإقليمية",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people who can support shorter, more reliable food supply chains and first-tier supplier coordination.",
    descriptionFa:
      "حوزه‌ای مستمر برای افرادی که می‌توانند به کوتاه‌تر، شفاف‌تر و قابل‌اتکاتر شدن زنجیره تأمین مواد غذایی و هماهنگی با تأمین‌کنندگان معتبر کمک کنند.",
    descriptionAr:
      "فرصة دائمة للأفراد القادرين على دعم سلاسل تزويد أغذية أقصر وأكثر موثوقية والتنسيق مع الموردين من الدرجة الأولى.",
    responsibilitiesEn: [
      "Support sourcing coordination for essential food products",
      "Help maintain visibility across procurement, import, storage, and distribution",
      "Contribute to supplier diversification and strategic inventory discipline",
      "Coordinate practical next steps for wholesalers, organizations, and buyers",
    ],
    responsibilitiesFa: [
      "پشتیبانی از هماهنگی تأمین مواد غذایی اساسی",
      "کمک به شفافیت فرایندهای خرید، واردات، نگهداری و توزیع",
      "مشارکت در تنوع‌بخشی به تأمین‌کنندگان و نظم‌دهی راهبردی به موجودی",
      "هماهنگی مراحل اجرایی برای عمده‌فروشان، سازمان‌ها و خریداران",
    ],
    responsibilitiesAr: [
      "دعم تنسيق التوريد للمنتجات الغذائية الأساسية",
      "المساعدة في الحفاظ على الرؤية عبر المشتريات والاستيراد والتخزين والتوزيع",
      "المساهمة في تنويع الموردين ونظام المخزون الاستراتيجي",
      "تنسيق الخطوات العملية للمواطنين والمؤسسات والمشترين",
    ],
    requirementsEn: [
      "Interest in food supply, sourcing, and distribution",
      "Strong follow-up, documentation, and coordination habits",
      "Respect for professional ethics and transparent communication",
      "Comfort working with cross-functional commercial and operations teams",
    ],
    requirementsFa: [
      "علاقه به تأمین، خرید و توزیع مواد غذایی",
      "توانایی قوی در پیگیری، مستندسازی و هماهنگی",
      "پایبندی به اخلاق حرفه‌ای و ارتباطات شفاف",
      "توانایی همکاری با تیم‌های تجاری و عملیاتی",
    ],
    requirementsAr: [
      "الاهتمام بتوريد وتوزيع الأغذية",
      "عادات قوية في المتابعة والتوثيق والتنسيق",
      "الاحترام للأخلاقيات المهنية والتواصل الشفاف",
      "الراحة في العمل مع فرق الأعمال والعمليات متعددة الوظائف",
    ],
    benefitsEn: [
      "Customer-centric mindset",
      "Supply continuity",
      "Professional ethics",
      "Practical problem-solving",
    ],
    benefitsFa: [
      "نگاه مشتری‌مدار",
      "تداوم تأمین",
      "اخلاق حرفه‌ای",
      "حل مسئله کاربردی",
    ],
    benefitsAr: [
      "عقلية تركز على العميل",
      "استمرارية التوريد",
      "الأخلاقيات المهنية",
      "حل المشكلات العملي",
    ],
  },
  {
    id: 2,
    titleEn: "Quality & Food Safety",
    titleFa: "کیفیت و ایمنی مواد غذایی",
    titleAr: "الجودة وسلامة الأغذية",
    departmentEn: "Quality",
    departmentFa: "کیفیت",
    departmentAr: "الجودة",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و فعالیت‌های منطقه‌ای",
    locationAr: "إيران والعمليات الإقليمية",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people committed to superior quality, hygiene standards, and ISO 22000-led operating discipline.",
    descriptionFa:
      "حوزه‌ای مستمر برای افرادی که به کیفیت برتر، استانداردهای بهداشتی و نظم عملیاتی بر پایه ISO 22000 پایبند هستند.",
    descriptionAr:
      "فرصة دائمة للأفراد الملتزمين بالجودة العالية ومعايير النظافة ونظام التشغيل المرجعي بمعيار ISO 22000.",
    responsibilitiesEn: [
      "Support quality checks across import, warehousing, and distribution",
      "Help maintain food safety and hygiene documentation",
      "Contribute to training and value-based supplier evaluation",
      "Protect trust in Faradid Atlas products and brands",
    ],
    responsibilitiesFa: [
      "پشتیبانی از کنترل کیفیت در مراحل واردات، انبارداری و توزیع",
      "کمک به نگهداری مستندات ایمنی و بهداشت مواد غذایی",
      "مشارکت در آموزش و ارزیابی تأمین‌کنندگان بر پایه ارزش‌های شرکت",
      "حفظ اعتماد به محصولات و برندهای فرادید اطلس",
    ],
    responsibilitiesAr: [
      "دعم فحوصات الجودة عبر الاستيراد والتخزين والتوزيع",
      "المساعدة في الحفاظ على توثيق سلامة الأغذية والنظافة",
      "المساهمة في التدريب وتقييم الموردين على أساس القيم",
      "حماية ثقة المنتجات وعلامات فراديد أطلس التجارية",
    ],
    requirementsEn: [
      "Interest in food quality and hygiene standards",
      "Careful documentation and attention to detail",
      "Commitment to transparency and accountable operations",
      "Ability to improve routines through training and feedback",
    ],
    requirementsFa: [
      "علاقه به کیفیت مواد غذایی و استانداردهای بهداشتی",
      "دقت در مستندسازی و توجه به جزئیات",
      "پایبندی به شفافیت و مسئولیت‌پذیری در عملیات",
      "توانایی بهبود روال‌های کاری از طریق آموزش و بازخورد",
    ],
    requirementsAr: [
      "الاهتمام بجودة الأغذية ومعايير النظافة",
      "التوثيق الدقيق والاهتمام بالتفاصيل",
      "الالتزام بالشفافية والعمليات المسؤولة",
      "القدرة على تحسين الروتين من خلال التدريب والملاحظات",
    ],
    benefitsEn: [
      "Superior quality",
      "ISO-led discipline",
      "Accountability",
      "Continuous improvement",
    ],
    benefitsFa: [
      "کیفیت برتر",
      "نظم بر پایه ISO",
      "مسئولیت‌پذیری",
      "بهبود مستمر",
    ],
    benefitsAr: [
      "جودة عالية",
      "نظام مرجعي بمعيار ISO",
      "المسؤولية",
      "التحسين المستمر",
    ],
  },
  {
    id: 3,
    titleEn: "Sales, Distribution & Customer Relations",
    titleFa: "فروش، توزیع و ارتباط با مشتریان",
    titleAr: "المبيعات والتوزيع وعلاقات العملاء",
    departmentEn: "Commercial",
    departmentFa: "تجاری",
    departmentAr: "التجاري",
    locationEn: "Iran and regional operations",
    locationFa: "ایران و فعالیت‌های منطقه‌ای",
    locationAr: "إيران والعمليات الإقليمية",
    type: "full-time",
    descriptionEn:
      "An evergreen opportunity area for people who can build long-term trust with individuals, wholesalers, organizations, and foodservice buyers.",
    descriptionFa:
      "حوزه‌ای مستمر برای افرادی که می‌توانند با خریداران فردی، عمده‌فروشان، سازمان‌ها و فعالان خدمات غذایی اعتماد بلندمدت بسازند.",
    descriptionAr:
      "فرصة دائمة للأفراد القادرين على بناء ثقة طويلة الأمد مع الأفراد والتجار بالجملة والمؤسسات ومشتري خدمات الطعام.",
    responsibilitiesEn: [
      "Understand buyer needs across the essential food portfolio",
      "Coordinate product inquiries with operations and sourcing teams",
      "Support digital sales channels and practical customer feedback loops",
      "Build relationships through honesty, clarity, and consistent follow-up",
    ],
    responsibilitiesFa: [
      "درک نیاز خریداران در سبد مواد غذایی اساسی",
      "هماهنگی درخواست‌های محصول با تیم‌های عملیات و تأمین",
      "پشتیبانی از کانال‌های فروش دیجیتال و چرخه‌های کاربردی بازخورد مشتری",
      "ساختن رابطه با صداقت، شفافیت و پیگیری منظم",
    ],
    responsibilitiesAr: [
      "فهم احتياجات المشترين عبر محفظة المنتجات الغذائية الأساسية",
      "تنسيق استفسارات المنتجات مع فرق العمليات والتوريد",
      "دعم قنوات المبيعات الرقمية وحلقات ملاحظات العملاء العملية",
      "بناء العلاقات من خلال الصراحة والوضوح والمتابعة المستمرة",
    ],
    requirementsEn: [
      "Customer-oriented communication",
      "Ability to translate inquiries into practical next steps",
      "Respect for long-term trust over short-term transactions",
      "Interest in food products and regional distribution",
    ],
    requirementsFa: [
      "توانایی ارتباط مشتری‌مدار",
      "توانایی تبدیل درخواست‌ها به مراحل اجرایی و قابل پیگیری",
      "اولویت دادن به اعتماد بلندمدت به‌جای معامله کوتاه‌مدت",
      "علاقه به محصولات غذایی و توزیع منطقه‌ای",
    ],
    requirementsAr: [
      "التواصل الموجه نحو العميل",
      "القدرة على تحويل الاستفسارات إلى خطوات عملية",
      "إعطاء الأولوية للثقة طويلة الأمد على المعاملات قصيرة المدى",
      "الاهتمام بالمنتجات الغذائية والتوزيع الإقليمي",
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
    benefitsAr: [
      "التركيز على العميل",
      "الثقة طويلة الأمد",
      "القنوات الرقمية",
      "التواصل الواضح",
    ],
  },
];
