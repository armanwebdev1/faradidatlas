import type { Language } from "@/lib/i18n";

interface OfficeInfoProps {
  lang: Language;
}

const offices = {
  en: [
    {
      city: "Tehran",
      role: "Company office supporting sales coordination and access to Iran's essential food market.",
    },
    {
      city: "Isfahan",
      role: "Company office supporting regional coordination and distribution access in Iran.",
    },
    {
      city: "Dubai",
      role: "Company office supporting regional trade access through the United Arab Emirates.",
    },
    {
      city: "Oman",
      role: "Company office supporting regional presence and market expansion.",
    },
  ],
  fa: [
    {
      city: "تهران",
      role: "دفتر شرکت برای پشتیبانی از هماهنگی فروش و دسترسی به بازار مواد غذایی اساسی ایران.",
    },
    {
      city: "اصفهان",
      role: "دفتر شرکت برای پشتیبانی از هماهنگی منطقه‌ای و دسترسی توزیعی در ایران.",
    },
    {
      city: "دبی",
      role: "دفتر شرکت برای پشتیبانی از دسترسی تجاری منطقه‌ای از طریق امارات متحده عربی.",
    },
    {
      city: "عمان",
      role: "دفتر شرکت برای پشتیبانی از حضور منطقه‌ای و توسعه بازار.",
    },
  ],
};

export function OfficeInfo({ lang }: OfficeInfoProps) {
  const officeList = lang === "en" ? offices.en : offices.fa;

  return (
    <div className="space-y-6">
      {officeList.map((office) => (
        <div
          key={office.city}
          className="p-6 sm:p-8 bg-background rounded-lg border border-border"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            {office.city}
          </h3>
          <p className="text-foreground/75 leading-relaxed">{office.role}</p>
        </div>
      ))}

      <div className="p-5 sm:p-6 bg-secondary/40 rounded-lg border border-border">
        <p className="text-sm text-foreground/70 leading-relaxed">
          {lang === "en"
            ? "Shahrekord is treated as operational and warehouse support in Iran, not as a listed company office."
            : "شهرکرد به‌عنوان پشتیبانی عملیاتی و انباری در ایران در نظر گرفته می‌شود، نه به‌عنوان دفتر معرفی‌شده شرکت."}
        </p>
      </div>
    </div>
  );
}
