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
    titleEn: "Quality Assurance Manager",
    titleFa: "مدیر اطمینان کیفیت",
    departmentEn: "Operations",
    departmentFa: "عملیات",
    locationEn: "Tehran",
    locationFa: "تهران",
    type: "full-time",
    descriptionEn:
      "Lead quality systems across sourcing, import, warehousing, and distribution operations.",
    descriptionFa:
      "هدایت سیستم‌های کیفیت در تامین، واردات، انبارداری و عملیات توزیع.",
    responsibilitiesEn: [
      "Oversee quality checks and compliance reviews",
      "Manage documentation for ISO-led food safety processes",
      "Improve QC records across warehouses and product categories",
      "Train team members on product handling standards",
    ],
    responsibilitiesFa: [
      "نظارت بر کنترل کیفیت و بررسی‌های انطباق",
      "مدیریت مستندات فرآیندهای ایمنی غذایی مبتنی بر ISO",
      "بهبود سوابق کنترل کیفیت در انبارها و گروه‌های محصول",
      "آموزش اعضای تیم درباره استانداردهای نگهداری محصول",
    ],
    requirementsEn: [
      "Bachelor's degree in Food Science or a related field",
      "5+ years QA experience in the food industry",
      "Working knowledge of ISO 22000 and HACCP",
      "Fluent Persian and professional English",
    ],
    requirementsFa: [
      "کارشناسی علوم غذایی یا رشته مرتبط",
      "بیش از ۵ سال تجربه اطمینان کیفیت در صنعت غذا",
      "آشنایی کاربردی با ISO 22000 و HACCP",
      "تسلط به فارسی و انگلیسی حرفه‌ای",
    ],
    benefitsEn: [
      "Competitive salary",
      "Health insurance",
      "Training budget",
      "Growth path",
    ],
    benefitsFa: ["حقوق رقابتی", "بیمه درمانی", "بودجه آموزش", "مسیر رشد"],
  },
  {
    id: 2,
    titleEn: "Import Logistics Coordinator",
    titleFa: "هماهنگ‌کننده لجستیک واردات",
    departmentEn: "Logistics",
    departmentFa: "لجستیک",
    locationEn: "Tehran",
    locationFa: "تهران",
    type: "full-time",
    descriptionEn:
      "Coordinate import shipments, documentation, customs follow-up, and delivery schedules.",
    descriptionFa:
      "هماهنگی محموله‌های وارداتی، مستندات، پیگیری گمرکی و زمان‌بندی تحویل.",
    responsibilitiesEn: [
      "Track shipments from supplier to warehouse",
      "Coordinate with customs brokers and logistics partners",
      "Maintain accurate import and delivery documentation",
      "Update sales and operations teams on shipment status",
    ],
    responsibilitiesFa: [
      "پیگیری محموله‌ها از تامین‌کننده تا انبار",
      "هماهنگی با کارگزاران گمرکی و شرکای لجستیکی",
      "نگهداری دقیق اسناد واردات و تحویل",
      "اطلاع‌رسانی وضعیت محموله به تیم‌های فروش و عملیات",
    ],
    requirementsEn: [
      "3+ years import or food logistics experience",
      "Familiarity with customs procedures and HS codes",
      "Strong organizational and follow-up skills",
      "Comfortable working with cross-functional teams",
    ],
    requirementsFa: [
      "بیش از ۳ سال تجربه واردات یا لجستیک مواد غذایی",
      "آشنایی با فرآیندهای گمرکی و کدهای HS",
      "مهارت سازمان‌دهی و پیگیری قوی",
      "توانایی همکاری با تیم‌های مختلف",
    ],
    benefitsEn: [
      "Salary package",
      "Performance bonus",
      "Team events",
      "Career growth",
    ],
    benefitsFa: ["بسته حقوق و مزایا", "پاداش عملکرد", "رویدادهای تیمی", "رشد شغلی"],
  },
  {
    id: 3,
    titleEn: "B2B Sales Representative",
    titleFa: "نماینده فروش B2B",
    departmentEn: "Sales",
    departmentFa: "فروش",
    locationEn: "Tehran / Remote",
    locationFa: "تهران / دورکاری",
    type: "full-time",
    descriptionEn:
      "Develop relationships with retailers, wholesalers, organizations, and foodservice buyers.",
    descriptionFa:
      "توسعه روابط با خرده‌فروشان، عمده‌فروشان، سازمان‌ها و خریداران خدمات غذایی.",
    responsibilitiesEn: [
      "Build and maintain relationships with key buyers",
      "Prepare product presentations and proposals",
      "Coordinate pricing requests with operations",
      "Manage sales pipeline and follow-up activities",
    ],
    responsibilitiesFa: [
      "ایجاد و حفظ ارتباط با خریداران کلیدی",
      "تهیه ارائه‌ها و پیشنهادهای محصول",
      "هماهنگی درخواست‌های قیمت با تیم عملیات",
      "مدیریت مسیر فروش و پیگیری‌ها",
    ],
    requirementsEn: [
      "Bachelor's degree in Business or a related field",
      "3+ years B2B sales experience",
      "Excellent communication and negotiation skills",
      "Knowledge of food products is a plus",
    ],
    requirementsFa: [
      "کارشناسی مدیریت، بازرگانی یا رشته مرتبط",
      "بیش از ۳ سال تجربه فروش B2B",
      "مهارت ارتباطی و مذاکره قوی",
      "آشنایی با محصولات غذایی مزیت محسوب می‌شود",
    ],
    benefitsEn: [
      "Base salary + commission",
      "Sales tools",
      "Market visits",
      "Bonus structure",
    ],
    benefitsFa: [
      "حقوق پایه همراه با کمیسیون",
      "ابزارهای فروش",
      "بازدیدهای بازار",
      "ساختار پاداش",
    ],
  },
  {
    id: 4,
    titleEn: "Warehouse Operations Supervisor",
    titleFa: "سرپرست عملیات انبار",
    departmentEn: "Operations",
    departmentFa: "عملیات",
    locationEn: "Isfahan / Shahrekord",
    locationFa: "اصفهان / شهرکرد",
    type: "full-time",
    descriptionEn:
      "Manage daily warehouse operations, inventory control, and product handling standards.",
    descriptionFa:
      "مدیریت عملیات روزانه انبار، کنترل موجودی و استانداردهای نگهداری محصول.",
    responsibilitiesEn: [
      "Oversee receiving, storage, and dispatch operations",
      "Monitor inventory tracking and reporting",
      "Apply food handling and hygiene procedures",
      "Train and supervise warehouse staff",
    ],
    responsibilitiesFa: [
      "نظارت بر دریافت، نگهداری و ارسال کالا",
      "کنترل رهگیری موجودی و گزارش‌دهی",
      "اجرای رویه‌های بهداشت و نگهداری مواد غذایی",
      "آموزش و نظارت بر کارکنان انبار",
    ],
    requirementsEn: [
      "5+ years warehouse or distribution experience",
      "Food storage experience preferred",
      "Leadership and organizational skills",
      "Comfortable with inventory systems",
    ],
    requirementsFa: [
      "بیش از ۵ سال تجربه انبار یا توزیع",
      "تجربه نگهداری مواد غذایی مزیت محسوب می‌شود",
      "مهارت رهبری و سازمان‌دهی",
      "توانایی کار با سیستم‌های موجودی",
    ],
    benefitsEn: [
      "Competitive salary",
      "Shift allowance",
      "Health insurance",
      "Staff discounts",
    ],
    benefitsFa: ["حقوق رقابتی", "حق شیفت", "بیمه درمانی", "تخفیف کارکنان"],
  },
];
