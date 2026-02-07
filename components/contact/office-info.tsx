import type { Language } from "@/lib/i18n";

interface OfficeInfoProps {
  lang: Language;
}

export function OfficeInfo({ lang }: OfficeInfoProps) {
  const offices = {
    en: [
      {
        city: "Tehran",
        address: "123 Trade Street, District 1, Tehran",
        phone: "+98 (21) 1234-5678",
        whatsapp: "+98 (910) 123-4567",
        email: "sales@premiumfoods.com",
        hours: "Saturday - Thursday, 9:00 AM - 6:00 PM",
      },
      {
        city: "Alborz",
        address: "567 Logistics Avenue, Alborz Province",
        phone: "+98 (26) 5678-9012",
        email: "logistics@premiumfoods.com",
        hours: "Saturday - Thursday, 8:00 AM - 5:00 PM",
      },
    ],
    fa: [
      {
        city: "تهران",
        address: "تهران",
        phone: "+98 (21) 1234-5678",
        whatsapp: "+98 (910) 123-4567",
        email: "sales@premiumfoods.com",
        hours: "شنبه تا پنج‌شنبه، ۹:۰۰ صبح - ۶:۰۰ عصر",
      },
      {
        city: "البرز",
        address: "البرز",
        phone: "+98 (26) 5678-9012",
        email: "logistics@premiumfoods.com",
        hours: "شنبه تا پنج‌شنبه، ۸:۰۰ صبح - ۵:۰۰ عصر",
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
            {/* Address */}
            <div>
              <p className="text-xs font-semibold text-neutral uppercase mb-1">
                {lang === "en" ? "Address" : "آدرس"}
              </p>
              <p className="text-foreground">{office.address}</p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs font-semibold text-neutral uppercase mb-1">
                {lang === "en" ? "Phone" : "تلفن"}
              </p>
              <a
                href={`tel:${office.phone}`}
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                {office.phone}
              </a>
            </div>

            {/* WhatsApp */}
            {office.whatsapp && (
              <div>
                <p className="text-xs font-semibold text-neutral uppercase mb-1">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${office.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  {office.whatsapp}
                </a>
              </div>
            )}

            {/* Email */}
            <div>
              <p className="text-xs font-semibold text-neutral uppercase mb-1">
                {lang === "en" ? "Email" : "ایمیل"}
              </p>
              <a
                href={`mailto:${office.email}`}
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                {office.email}
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs font-semibold text-neutral uppercase mb-1">
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
