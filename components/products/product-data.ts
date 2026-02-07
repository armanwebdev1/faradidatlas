export interface Product {
  id: number;
  nameEn: string;
  nameFa: string;
  category: "nuts" | "dried-fruits" | "spices" | "saffron";
  originEn: string;
  originFa: string;
  gradeEn: string;
  gradeFa: string;
  descriptionEn: string;
  descriptionFa: string;
  packagingOptionsEn: string[];
  packagingOptionsFa: string[];
  certifications: string[];
  shelfLifeEn: string;
  shelfLifeFa: string;
  minOrderEn: string;
  minOrderFa: string;
  image: string;
  images: string[];
  priceRangeEn: string;
  priceRangeFa: string;
  available: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    nameEn: "Premium Saffron",
    nameFa: "زعفران درجه یک",
    category: "saffron",
    originEn: "Khorasan",
    originFa: "خراسان",
    gradeEn: "Grade A - Negin",
    gradeFa: "درجه A - نگین",
    descriptionEn:
      "Hand-picked saffron threads with exceptional color (ISO 3632 Grade 1) and unmistakable aroma",
    descriptionFa: "رشته‌های زعفران دستچین با رنگ استثنایی و بوی بی‌نظیر",
    packagingOptionsEn: ["1kg jars", "5kg tins", "25kg custom"],
    packagingOptionsFa: ["جار ۱ کیلوگرمی", "قوطی ۵ کیلوگرمی", "۲۵ کیلوگرمی سفارشی"],
    certifications: ["ISO 22000", "HACCP", "Organic", "Halal"],
    shelfLifeEn: "2 years (sealed, cool storage)",
    shelfLifeFa: "۲ سال (پلمپ، نگهداری در محیط خنک)",
    minOrderEn: "5kg minimum",
    minOrderFa: "حداقل ۵ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured4.jpg",
      "/featured1.jpg",
      "/featured5.jpg",
    ],
    priceRangeEn: "$12-18 per gram (market dependent)",
    priceRangeFa: "۱۲–۱۸ دلار به ازای هر گرم (وابسته به بازار)",
    available: true,
  },
  {
    id: 2,
    nameEn: "Organic Dates",
    nameFa: "خرما ارگانیک",
    category: "dried-fruits",
    originEn: "Yazd",
    originFa: "یزد",
    gradeEn: "Premium",
    gradeFa: "درجه ممتاز",
    descriptionEn:
      "Sun-dried, seedless dates with natural sweetness. Perfect for retail or ingredient use",
    descriptionFa: "خرماهای خشک‌شده در آفتاب، بدون هسته و با شیرینی طبیعی",
    packagingOptionsEn: ["1kg bags", "10kg cartons", "Bulk 50kg bags"],
    packagingOptionsFa: ["کیسه ۱ کیلوگرمی", "کارتن ۱۰ کیلوگرمی", "کیسه فله ۵۰ کیلوگرمی"],
    certifications: ["ISO 22000", "Organic", "Halal"],
    shelfLifeEn: "18 months",
    shelfLifeFa: "۱۸ ماه",
    minOrderEn: "10kg",
    minOrderFa: "حداقل ۱۰ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured2.jpg",
      "/featured3.jpg",
    ],
    priceRangeEn: "$4-6 per kg",
    priceRangeFa: "۴ تا ۶ دلار به ازای هر کیلوگرم",
    available: true,
  },
  {
    id: 3,
    nameEn: "Salted Pistachios",
    nameFa: "فستق شور",
    category: "nuts",
    originEn: "Rafsanjan",
    originFa: "رفسنجان",
    gradeEn: "Grade A",
    gradeFa: "درجه A",
    descriptionEn:
      "Roasted and lightly salted pistachios. Superior flavor and texture",
    descriptionFa: "فستق‌های سرخ‌شده و شور‌شده با طعم و بافت برتر",
    packagingOptionsEn: ["250g packs", "1kg bags", "Custom bulk"],
    packagingOptionsFa: ["بسته ۲۵۰ گرمی", "کیسه ۱ کیلوگرمی", "فله سفارشی"],
    certifications: ["ISO 22000", "HACCP", "Halal"],
    shelfLifeEn: "12 months",
    shelfLifeFa: "۱۲ ماه",
    minOrderEn: "5kg",
    minOrderFa: "حداقل ۵ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured1.jpg",
    ],
    priceRangeEn: "$8-12 per kg",
    priceRangeFa: "۸ تا ۱۲ دلار به ازای هر کیلوگرم",
    available: true,
  },
  {
    id: 4,
    nameEn: "Dried Herbs Mix",
    nameFa: "مخلوط گیاهان خشک",
    category: "spices",
    originEn: "Various",
    originFa: "مختلف",
    gradeEn: "Certified",
    gradeFa: "دارای گواهی",
    descriptionEn:
      "Traditional blend of dried herbs: oregano, basil, thyme, mint",
    descriptionFa: "مخلوط سنتی گیاهان خشک: اوریگانو، ریحان، آویشن، نعناع",
    packagingOptionsEn: ["100g jars", "500g packs", "Bulk 10kg"],
    packagingOptionsFa: ["جار ۱۰۰ گرمی", "بسته ۵۰۰ گرمی", "فله ۱۰ کیلوگرمی"],
    certifications: ["ISO 22000", "HACCP"],
    shelfLifeEn: "24 months",
    shelfLifeFa: "۲۴ ماه",
    minOrderEn: "5kg",
    minOrderFa: "حداقل ۵ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured3.jpg",
      "/featured5.jpg",
      "/featured2.jpg",
    ],
    priceRangeEn: "$5-7 per kg",
    priceRangeFa: "۵ تا ۷ دلار به ازای هر کیلوگرم",
    available: true,
  },
  {
    id: 5,
    nameEn: "Whole Black Cumin",
    nameFa: "سیاه دانه کامل",
    category: "spices",
    originEn: "Various",
    originFa: "مختلف",
    gradeEn: "Premium",
    gradeFa: "درجه ممتاز",
    descriptionEn: "Small black seeds with nutty flavor and health benefits",
    descriptionFa: "دانه‌های سیاه کوچک با طعم بادام‌گونه و فوائد سلامتی",
    packagingOptionsEn: ["200g jars", "1kg bags", "Bulk"],
    packagingOptionsFa: ["جار ۲۰۰ گرمی", "کیسه ۱ کیلوگرمی", "فله"],
    certifications: ["ISO 22000", "Halal"],
    shelfLifeEn: "24 months",
    shelfLifeFa: "۲۴ ماه",
    minOrderEn: "5kg",
    minOrderFa: "حداقل ۵ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured4.jpg",
    ],
    priceRangeEn: "$6-9 per kg",
    priceRangeFa: "۶ تا ۹ دلار به ازای هر کیلوگرم",
    available: true,
  },
  {
    id: 6,
    nameEn: "Raw Almonds",
    nameFa: "بادام خام",
    category: "nuts",
    originEn: "California/Iran Blend",
    originFa: "ترکیب کالیفرنیا/ایران",
    gradeEn: "Grade A",
    gradeFa: "درجه A",
    descriptionEn:
      "Premium raw almonds, blanched or with skin. High nutritional value",
    descriptionFa: "بادام‌های خام بسیار خوب، پوست‌شده یا با پوست",
    packagingOptionsEn: ["1kg bags", "5kg tins", "Bulk 25kg"],
    packagingOptionsFa: ["کیسه ۱ کیلوگرمی", "قوطی ۵ کیلوگرمی", "فله ۲۵ کیلوگرمی"],
    certifications: ["ISO 22000", "Halal"],
    shelfLifeEn: "12 months",
    shelfLifeFa: "۱۲ ماه",
    minOrderEn: "10kg",
    minOrderFa: "حداقل ۱۰ کیلوگرم",
    image:
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured1.jpg",
      "/featured2.jpg",
      "/featured3.jpg",
    ],
    priceRangeEn: "$7-11 per kg",
    priceRangeFa: "۷ تا ۱۱ دلار به ازای هر کیلوگرم",
    available: true,
  },
];
