export interface Job {
  id: number;
  titleEn: string;
  titleFa: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  descriptionEn: string;
  descriptionFa: string;
  responsibilitiesEn: string[];
  responsibilitiesFa: string[];
  requirementsEn: string[];
  requirementsFa: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    titleEn: "Quality Assurance Manager",
    titleFa: "مدیر اطمینان کیفیت",
    department: "Operations",
    location: "Tehran",
    type: "full-time",
    descriptionEn:
      "Lead our quality control initiatives across all production and sourcing operations.",
    descriptionFa:
      "هدایت کنندگان اطمینان کیفیت ما در تمام عملیات تولید و تامین",
    responsibilitiesEn: [
      "Oversee quality testing protocols and compliance audits",
      "Manage third-party lab partnerships and certifications",
      "Develop and implement QC documentation systems",
      "Train team members on quality standards",
    ],
    responsibilitiesFa: [
      "نظارت بر پروتکل‌های آزمایش کیفیت و بازرسی‌های انطباق",
      "مدیریت مشارکت‌های آزمایشگاه شخص ثالث و گواهی‌ها",
      "توسعه و پیاده‌سازی سیستم‌های مستندات QC",
      "آموزش اعضای تیم در مورد استانداردهای کیفیت",
    ],
    requirementsEn: [
      "Bachelor's degree in Food Science or equivalent",
      "5+ years QA experience in food industry",
      "ISO 22000 and HACCP certifications",
      "Fluent English and Persian",
    ],
    requirementsFa: [
      "درجه کارشناسی در علوم غذایی یا معادل",
      "۵+ سال تجربه QA در صنعت غذایی",
      "گواهی‌های ISO 22000 و HACCP",
      "تسلط به انگلیسی و فارسی",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Training budget",
      "Flexible hours",
    ],
  },
  {
    id: 2,
    titleEn: "Export Logistics Coordinator",
    titleFa: "هماهنگ‌کننده لجستیک صادرات",
    department: "Logistics",
    location: "Tehran",
    type: "full-time",
    descriptionEn:
      "Coordinate international shipments, documentation, and customs clearance.",
    descriptionFa: "هماهنگی حمل‌ونقل بین‌المللی، اسناد و رفع موانع گمرکی",
    responsibilitiesEn: [
      "Manage export documentation and shipping logistics",
      "Coordinate with customs brokers and shipping agents",
      "Track shipments and ensure timely delivery",
      "Manage customer inquiries about delivery status",
    ],
    responsibilitiesFa: [
      "مدیریت اسناد صادرات و لجستیک حمل‌ونقل",
      "هماهنگی با دلالان گمرکی و نمایندگان حمل‌ونقل",
      "پیگیری حمل‌ونقل و تضمین تحویل به موقع",
      "مدیریت درخواست‌های مشتری درباره وضعیت تحویل",
    ],
    requirementsEn: [
      "High school diploma, export/logistics diploma preferred",
      "3+ years export logistics experience",
      "Knowledge of HS codes and shipping procedures",
      "Strong organizational skills",
    ],
    requirementsFa: [
      "دیپلم دبیرستان، دیپلم صادرات/لجستیک ترجیح داده می‌شود",
      "۳+ سال تجربه لجستیک صادرات",
      "آگاهی از کدهای HS و روش‌های حمل‌ونقل",
      "مهارت‌های سازمانی قوی",
    ],
    benefits: [
      "Salary package",
      "Performance bonus",
      "Team events",
      "Career growth",
    ],
  },
  {
    id: 3,
    titleEn: "B2B Sales Representative",
    titleFa: "نمایندگی فروش B2B",
    department: "Sales",
    location: "Tehran / Remote",
    type: "full-time",
    descriptionEn:
      "Develop and nurture relationships with international buyers and distributors.",
    descriptionFa: "توسعه و پرورش روابط با خریداران و توزیع‌کنندگان بین‌المللی",
    responsibilitiesEn: [
      "Build and maintain relationships with key buyers",
      "Manage sales pipeline and forecasting",
      "Prepare product presentations and proposals",
      "Handle pricing negotiations and contracts",
    ],
    responsibilitiesFa: [
      "ایجاد و نگهداری روابط با خریداران کلیدی",
      "مدیریت خط لوله فروش و پیش‌بینی",
      "تهیه ارائه‌های محصول و پیشنهادها",
      "مدیریت مذاکرات قیمت و قرارداد",
    ],
    requirementsEn: [
      "Bachelor's degree in Business or related field",
      "3+ years B2B sales experience",
      "Excellent communication and negotiation skills",
      "Proficiency in English and Persian",
    ],
    requirementsFa: [
      "درجه کارشناسی در تجارت یا زمینه مرتبط",
      "۳+ سال تجربه فروش B2B",
      "مهارت‌های ارتباطی و مذاکره عالی",
      "تسلط به انگلیسی و فارسی",
    ],
    benefits: [
      "Base salary + commission",
      "Car allowance",
      "International travel",
      "Bonus structure",
    ],
  },
  {
    id: 4,
    titleEn: "Warehouse Operations Supervisor",
    titleFa: "سرپرست عملیات انبار",
    department: "Operations",
    location: "Alborz",
    type: "full-time",
    descriptionEn:
      "Manage daily warehouse operations, inventory, and cold chain management.",
    descriptionFa: "مدیریت عملیات روزانه انبار، موجودی و مدیریت زنجیره سرد",
    responsibilitiesEn: [
      "Oversee receiving, storage, and shipping operations",
      "Monitor temperature-controlled storage systems",
      "Manage inventory tracking and reporting",
      "Train and supervise warehouse staff",
    ],
    responsibilitiesFa: [
      "نظارت بر عملیات دریافت، ذخیره‌سازی و حمل‌ونقل",
      "نظارت بر سیستم‌های ذخیره‌سازی کنترل‌شده‌ی دما",
      "مدیریت پیگیری و گزارش موجودی",
      "آموزش و نظارت بر کارکنان انبار",
    ],
    requirementsEn: [
      "High school diploma or above",
      "5+ years warehouse management experience",
      "Cold chain/food safety experience required",
      "Leadership and organizational skills",
    ],
    requirementsFa: [
      "دیپلم دبیرستان یا بالاتر",
      "۵+ سال تجربه مدیریت انبار",
      "تجربه زنجیره سرد/ایمنی غذایی الزامی",
      "مهارت‌های رهبری و سازمانی",
    ],
    benefits: [
      "Competitive salary",
      "Shift allowance",
      "Health insurance",
      "Staff discounts",
    ],
  },
];
