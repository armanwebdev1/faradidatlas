import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getLocalized } from "@/lib/localized";

interface OfficeInfoProps {
  lang: Language;
  t: (typeof translations)[Language];
  contactInfo?: any;
}

export function OfficeInfo({ lang, t, contactInfo }: OfficeInfoProps) {
  const ci = contactInfo as any;

  const email = ci?.email ?? "";
  const phones = ci?.phones ?? [];
  const payloadOffices = ci?.offices ?? [];

  const fallbackOffices = {
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
        role: "دفتر تهران، هماهنگی فروش و ارتباط با بازار کالاهای اساسی و محصولات غذایی ایران را پشتیبانی می‌کند.",
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
    ar: [
      {
        city: "طهران",
        role: "مكتب طهران يدعم تنسيق المبيعات والوصول إلى سوق الأغذية الأساسية في إيران.",
      },
      {
        city: "أصفهان",
        role: "مكتب أصفهان يساعد في التنسيق الإقليمي وتحسين الوصول إلى قنوات التوزيع في إيران.",
      },
      {
        city: "دبي",
        role: "مكتب دبي يدعم مسار التواصل التجاري والأنشطة الإقليمية لفراديد أطلس في الإمارات العربية المتحدة.",
      },
      {
        city: "مسقط",
        role: "مكتب مسقط جزء من الحضور الإقليمية للشركة ومسار تطوير التعاون التجاري في الأسواق القريبة.",
      },
    ],
  };

  const officeList =
    payloadOffices.length > 0
      ? payloadOffices.map((o: any) => ({
          city: getLocalized(o.city, lang) || o.city || "",
          role: getLocalized(o.address, lang) || "",
        }))
      : fallbackOffices[lang as keyof typeof fallbackOffices] ||
        fallbackOffices.en;

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 bg-background rounded-lg border border-border shadow-sm">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">
          {t.pages.contact.directContact}
        </h3>
        <div className="space-y-3 text-sm text-foreground/75">
          {email && (
            <a
              href={`mailto:${email}`}
              className="block transition-colors hover:text-brand-navy"
              dir="ltr"
            >
              {email}
            </a>
          )}
          <div className="flex flex-col gap-2" dir="ltr">
            {phones.map((phone: any) => (
              <div key={phone.value} className="flex items-center gap-3">
                <a
                  href={`tel:${phone.value}`}
                  className="transition-colors hover:text-brand-navy"
                >
                  {phone.display}
                </a>
                {phone.whatsappHref && (
                  <a
                    href={phone.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      lang === "ar"
                        ? `تحدث مع ${phone.display} عبر WhatsApp`
                        : lang === "fa"
                          ? `چت با ${phone.display} در WhatsApp`
                          : `Chat with ${phone.display} on WhatsApp`
                    }
                    className="transition-colors hover:text-[#25D366]"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {officeList.map((office: any) => (
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
          {t.pages.contact.shahrekordNote}
        </p>
      </div>
    </div>
  );
}
