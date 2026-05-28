import type { Language } from "@/lib/i18n";

interface OfficeInfoProps {
  lang: Language;
}

export function OfficeInfo({ lang }: OfficeInfoProps) {
  const labelClass =
    lang === "fa"
      ? "text-[13px] font-semibold text-neutral uppercase mb-1"
      : "text-xs font-semibold text-neutral uppercase mb-1";

  const offices = {
    en: [
      {
        city: "Tehran",
        address: "Main commercial office for sales coordination and customer support.",
        email: "sales@faradidatlas.com",
        hours: "Saturday - Thursday, 9:00 AM - 6:00 PM",
      },
      {
        city: "Isfahan",
        address: "Regional branch supporting central Iran distribution.",
        email: "operations@faradidatlas.com",
        hours: "Saturday - Thursday, 9:00 AM - 5:00 PM",
      },
      {
        city: "Shahrekord",
        address: "Branch and storage support for regional supply movement.",
        email: "logistics@faradidatlas.com",
        hours: "Saturday - Thursday, 9:00 AM - 5:00 PM",
      },
      {
        city: "UAE & Oman",
        address: "Regional sales and trade access across the Middle East.",
        email: "regional@faradidatlas.com",
        hours: "Business inquiries by appointment",
      },
    ],
    fa: [
      {
        city: "تهران",
        address: "دفتر تجاری اصلی برای هماهنگی فروش و پشتیبانی مشتریان.",
        email: "sales@faradidatlas.com",
        hours: "شنبه تا پنج‌شنبه، ۹:۰۰ تا ۱۸:۰۰",
      },
      {
        city: "اصفهان",
        address: "شعبه منطقه‌ای برای پشتیبانی از توزیع در مرکز ایران.",
        email: "operations@faradidatlas.com",
        hours: "شنبه تا پنج‌شنبه، ۹:۰۰ تا ۱۷:۰۰",
      },
      {
        city: "شهرکرد",
        address: "شعبه و پشتیبانی انبار برای جابه‌جایی منطقه‌ای کالا.",
        email: "logistics@faradidatlas.com",
        hours: "شنبه تا پنج‌شنبه، ۹:۰۰ تا ۱۷:۰۰",
      },
      {
        city: "امارات و عمان",
        address: "دسترسی فروش و تجارت منطقه‌ای در خاورمیانه.",
        email: "regional@faradidatlas.com",
        hours: "هماهنگی جلسات تجاری با وقت قبلی",
      },
    ],
  };

  const officeList = lang === "en" ? offices.en : offices.fa;

  return (
    <div className="space-y-8">
      {officeList.map((office, idx) => (
        <div
          key={idx}
          className="p-8 bg-background rounded-lg border border-border"
        >
          <h3 className="text-2xl font-bold text-primary mb-6">
            {office.city}
          </h3>

          <div className="space-y-4">
            <div>
              <p className={labelClass}>{lang === "en" ? "Address" : "آدرس"}</p>
              <p className="text-foreground">{office.address}</p>
            </div>

            <div>
              <p className={labelClass}>{lang === "en" ? "Email" : "ایمیل"}</p>
              <a
                href={`mailto:${office.email}`}
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                {office.email}
              </a>
            </div>

            <div>
              <p className={labelClass}>
                {lang === "en" ? "Business Hours" : "ساعات کاری"}
              </p>
              <p className="text-foreground">{office.hours}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
