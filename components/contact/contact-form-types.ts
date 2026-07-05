export const productOptions = [
  { value: "rice", labelEn: "Rice", labelFa: "برنج" },
  { value: "legumes", labelEn: "Legumes", labelFa: "حبوبات" },
  { value: "spices", labelEn: "Spices", labelFa: "ادویه‌جات" },
  { value: "nuts", labelEn: "Nuts", labelFa: "آجیل" },
  { value: "seeds", labelEn: "Seeds", labelFa: "دانه‌ها" },
  { value: "sugar", labelEn: "Sugar", labelFa: "شکر" },
  { value: "multiple", labelEn: "Multiple Products", labelFa: "چند محصول" },
];

export function hasInitialProductOption(initialProductInterest?: string) {
  return (
    !!initialProductInterest &&
    !productOptions.some((option) => option.value === initialProductInterest)
  );
}

export function getInitialFormData(productInterest = "") {
  return {
    company: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    productInterest,
    volume: "",
    destination: "",
    timeline: "",
    message: "",
    website: "",
  };
}

export type ContactFormData = ReturnType<typeof getInitialFormData>;
export type ContactField = keyof ContactFormData;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function toLatinDigits(value: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex !== -1) return String(persianIndex);

    const arabicIndex = arabicDigits.indexOf(digit);
    return arabicIndex !== -1 ? String(arabicIndex) : digit;
  });
}
