export interface Product {
  id: number
  nameEn: string
  nameFa: string
  category: "nuts" | "dried-fruits" | "spices" | "saffron"
  origin: string
  grade: string
  descriptionEn: string
  descriptionFa: string
  packagingOptions: string[]
  certifications: string[]
  shelf_life: string
  minOrder: string
  image: string
  images: string[]
  priceRange: string
  available: boolean
}

export const products: Product[] = [
  {
    id: 1,
    nameEn: "Premium Saffron",
    nameFa: "زعفران درجه اول",
    category: "saffron",
    origin: "Khorasan",
    grade: "Grade A - Negin",
    descriptionEn: "Hand-picked saffron threads with exceptional color (ISO 3632 Grade 1) and unmistakable aroma",
    descriptionFa: "رشته‌های زعفران دستچین با رنگ استثنایی و بوی بی‌نظیر",
    packagingOptions: ["1kg jars", "5kg tins", "25kg custom"],
    certifications: ["ISO 22000", "HACCP", "Organic", "Halal"],
    shelf_life: "2 years (sealed, cool storage)",
    minOrder: "5kg minimum",
    image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured4.jpg",
      "/featured1.jpg",
      "/featured5.jpg",
    ],
    priceRange: "$12-18 per gram (market dependent)",
    available: true,
  },
  {
    id: 2,
    nameEn: "Organic Dates",
    nameFa: "خرما ارگانیک",
    category: "dried-fruits",
    origin: "Yazd",
    grade: "Premium",
    descriptionEn: "Sun-dried, seedless dates with natural sweetness. Perfect for retail or ingredient use",
    descriptionFa: "خرماهای خشک‌شده در آفتاب، بدون هسته و با شیرینی طبیعی",
    packagingOptions: ["1kg bags", "10kg cartons", "Bulk 50kg bags"],
    certifications: ["ISO 22000", "Organic", "Halal"],
    shelf_life: "18 months",
    minOrder: "10kg",
    image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured2.jpg",
      "/featured3.jpg",
    ],
    priceRange: "$4-6 per kg",
    available: true,
  },
  {
    id: 3,
    nameEn: "Salted Pistachios",
    nameFa: "فستق شور",
    category: "nuts",
    origin: "Rafsanjan",
    grade: "Grade A",
    descriptionEn: "Roasted and lightly salted pistachios. Superior flavor and texture",
    descriptionFa: "فستق‌های سرخ‌شده و شور‌شده با طعم و بافت برتر",
    packagingOptions: ["250g packs", "1kg bags", "Custom bulk"],
    certifications: ["ISO 22000", "HACCP", "Halal"],
    shelf_life: "12 months",
    minOrder: "5kg",
    image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured1.jpg",
    ],
    priceRange: "$8-12 per kg",
    available: true,
  },
  {
    id: 4,
    nameEn: "Dried Herbs Mix",
    nameFa: "مخلوط گیاهان خشک",
    category: "spices",
    origin: "Various",
    grade: "Certified",
    descriptionEn: "Traditional blend of dried herbs: oregano, basil, thyme, mint",
    descriptionFa: "مخلوط سنتی گیاهان خشک: اوریگانو، ریحان، آویشن، نعناع",
    packagingOptions: ["100g jars", "500g packs", "Bulk 10kg"],
    certifications: ["ISO 22000", "HACCP"],
    shelf_life: "24 months",
    minOrder: "5kg",
    image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured3.jpg",
      "/featured5.jpg",
      "/featured2.jpg",
    ],
    priceRange: "$5-7 per kg",
    available: true,
  },
  {
    id: 5,
    nameEn: "Whole Black Cumin",
    nameFa: "سیاه دانه کامل",
    category: "spices",
    origin: "Various",
    grade: "Premium",
    descriptionEn: "Small black seeds with nutty flavor and health benefits",
    descriptionFa: "دانه‌های سیاه کوچک با طعم بادام‌گونه و فوائد سلامتی",
    packagingOptions: ["200g jars", "1kg bags", "Bulk"],
    certifications: ["ISO 22000", "Halal"],
    shelf_life: "24 months",
    minOrder: "5kg",
    image: "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599599810694-b3627db32322?w=1200&h=1400&fit=crop",
      "/featured4.jpg",
    ],
    priceRange: "$6-9 per kg",
    available: true,
  },
  {
    id: 6,
    nameEn: "Raw Almonds",
    nameFa: "بادام خام",
    category: "nuts",
    origin: "California/Iran Blend",
    grade: "Grade A",
    descriptionEn: "Premium raw almonds, blanched or with skin. High nutritional value",
    descriptionFa: "بادام‌های خام بسیار خوب، پوست‌شده یا با پوست",
    packagingOptions: ["1kg bags", "5kg tins", "Bulk 25kg"],
    certifications: ["ISO 22000", "Halal"],
    shelf_life: "12 months",
    minOrder: "10kg",
    image: "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585707572921-1a93ffd1dd81?w=1200&h=1400&fit=crop",
      "/featured1.jpg",
      "/featured2.jpg",
      "/featured3.jpg",
    ],
    priceRange: "$7-11 per kg",
    available: true,
  },
]
