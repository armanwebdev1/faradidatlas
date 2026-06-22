import type { Language } from "@/lib/i18n";

interface ResponseSLAProps {
  lang: Language;
}

export function ResponseSLA({ lang }: ResponseSLAProps) {
  const content = {
    en: {
      title: "What Happens Next",
      description:
        "We keep the inquiry process direct so buyers can move from need to supply plan quickly.",
      slas: [
        {
          title: "Initial Review",
          timeline: "Inquiry review",
          description: "We confirm product, volume, destination, and timing.",
        },
        {
          title: "Supply Check",
          timeline: "Supply-chain review",
          description:
            "Our team checks sourcing options and practical distribution needs.",
        },
        {
          title: "Commercial Terms",
          timeline: "Quote on request",
          description:
            "Pricing is prepared with clear assumptions and practical next steps.",
        },
        {
          title: "Coordination",
          timeline: "Follow-up meeting",
          description:
            "We align delivery, quality expectations, and logistics responsibilities.",
        },
      ],
    },
    fa: {
      title: "بعد از ارسال درخواست چه می‌شود؟",
      description:
        "فرآیند بررسی درخواست را مستقیم و روشن نگه می‌داریم تا خریداران سریع‌تر از اعلام نیاز به برنامه تأمین برسند.",
      slas: [
        {
          title: "بررسی اولیه",
          timeline: "بررسی درخواست",
          description:
            "نوع محصول، حجم موردنیاز، مقصد و زمان‌بندی پیشنهادی بررسی و تأیید می‌شود.",
        },
        {
          title: "بررسی امکان تأمین",
          timeline: "بررسی زنجیره تأمین",
          description:
            "تیم ما گزینه‌های تأمین و نیازهای اجرایی توزیع را بررسی می‌کند.",
        },
        {
          title: "شرایط تجاری",
          timeline: "اعلام قیمت بر اساس استعلام",
          description:
            "قیمت‌گذاری با فرضیات روشن و مراحل بعدی قابل اجرا آماده می‌شود.",
        },
        {
          title: "هماهنگی نهایی",
          timeline: "تماس یا جلسه پیگیری",
          description:
            "تحویل، انتظارات کیفی و مسئولیت‌های لجستیکی هماهنگ می‌شود.",
        },
      ],
    },
  };

  const data = lang === "en" ? content.en : content.fa;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white px-6 py-12 sm:px-10 sm:py-14 lg:px-12 text-foreground shadow-[0_50px_120px_-90px_rgba(15,23,42,0.35)]">
      <div className="relative">
        <h3 className="text-3xl sm:text-4xl font-semibold text-center tracking-tight text-primary">
          {data.title}
        </h3>
        <p className="mt-4 text-center text-foreground/70 max-w-2xl mx-auto text-sm sm:text-base">
          {data.description}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.slas.map((sla, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-foreground/10 bg-white/90 px-5 py-6 sm:px-6 sm:py-7 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)]"
            >
              <h4 className="text-base sm:text-lg font-semibold text-foreground">
                {sla.title}
              </h4>
              <p className="mt-2 text-sm font-semibold text-primary/80">
                {sla.timeline}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-foreground/65 leading-relaxed">
                {sla.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
