import type { Language } from "@/lib/i18n";
import { publicContactEmail, publicPhoneNumbers } from "@/lib/contact-info";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

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
      role: "دفتر تهران، هماهنگی فروش و ارتباط با بازار مواد غذایی اساسی ایران را پشتیبانی می‌کند.",
    },
    {
      city: "اصفهان",
      role: "دفتر اصفهان، به هماهنگی منطقه‌ای و دسترسی منظم‌تر به مسیرهای توزیع در ایران کمک می‌کند.",
    },
    {
      city: "دبی",
      role: "دفتر دبی، مسیر ارتباطات تجاری و فعالیت‌های منطقه‌ای فرادید اطلس در امارات متحده عربی را پشتیبانی می‌کند.",
    },
    {
      city: "عمان",
      role: "دفتر عمان، بخشی از حضور منطقه‌ای شرکت و مسیر توسعه همکاری‌های تجاری در بازارهای نزدیک است.",
    },
  ],
};

export function OfficeInfo({ lang }: OfficeInfoProps) {
  const officeList = lang === "en" ? offices.en : offices.fa;

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 bg-background rounded-lg border border-border shadow-sm">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">
          {lang === "en" ? "Direct Contact" : "ارتباط مستقیم"}
        </h3>
        <div className="space-y-3 text-sm text-foreground/75">
          <a
            href={`mailto:${publicContactEmail}`}
            className="block transition-colors hover:text-brand-navy"
            dir="ltr"
          >
            {publicContactEmail}
          </a>
          <div className="flex flex-col gap-2" dir="ltr">
            {publicPhoneNumbers.map((phone) => (
              <div key={phone.value} className="flex items-center gap-3">
                <a
                  href={phone.href}
                  className="transition-colors hover:text-brand-navy"
                >
                  {phone.display}
                </a>
                <a
                  href={phone.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat with ${phone.display} on WhatsApp`}
                  className="transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            : "شهرکرد در ساختار فعالیت شرکت، به‌عنوان پشتیبانی عملیاتی و انباری در ایران در نظر گرفته می‌شود و جزو دفاتر معرفی‌شده شرکت نیست."}
        </p>
      </div>
    </div>
  );
}
