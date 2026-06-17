import type { Language } from "@/lib/i18n";
import { AnimatedSection } from "./animated-section";

interface StrategicFrameworkProps {
  lang: Language;
}

const content = {
  en: {
    eyebrow: "Vision, Mission, Values",
    title: "A clear framework for sustainable food supply",
    intro:
      "Faradid Atlas' direction is built around sustainable leadership, shorter supply chains, professional ethics, and access to high-quality essential foods.",
    vision: {
      label: "Vision",
      title: "Sustainable leadership by 2030",
      body: "By 2030, Faradid Atlas aims to reach a 25% share of Iran's essential food products market while expanding its operating focus across the United Arab Emirates, India, and Oman. The company seeks to be recognized for high-quality, sustainable, and innovative food solutions.",
      notes: [
        "The DOCX cites Statista for an Iranian food market projected above $100B by 2030.",
        "The same vision calls for 15-20% annual growth and attention to 8-10% annual demand growth in cost-effective grains and legumes.",
        "The DOCX cites FAO projections that the Middle East will require a 20% increase in food imports by 2030.",
      ],
    },
    mission: {
      label: "Mission",
      title: "Shorter routes from trusted suppliers to buyers",
      body: "The mission is to shorten the global food supply chain, remove unnecessary intermediaries, and create lasting value for individuals, wholesalers, organizations, and governmental bodies. Faradid Atlas works directly with first-tier suppliers, especially in India and Pakistan, to balance quality, cost, and continuity.",
      notes: [
        "Quality discipline is guided by ISO 22000.",
        "Pricing is shaped by rational margins and competitive market conditions.",
        "Accessibility is supported by Iranian offices, regional presence, and digital sales channels.",
      ],
    },
    values: {
      label: "Values",
      title: "The standards behind daily decisions",
      body: "The company's values are customer-centricity, sustainability, professional ethics, innovation, and superior quality. They are reinforced through training, performance evaluation, and value-based supplier selection.",
    },
  },
  fa: {
    eyebrow: "چشم‌انداز، ماموریت، ارزش‌ها",
    title: "چارچوبی روشن برای تامین غذایی پایدار",
    intro:
      "مسیر فرادید اطلس بر پایه رهبری پایدار، کوتاه‌سازی زنجیره تامین، اخلاق حرفه‌ای و دسترسی به مواد غذایی اساسی باکیفیت شکل گرفته است.",
    vision: {
      label: "چشم‌انداز",
      title: "رهبری پایدار تا سال ۱۴۰۹ / ۲۰۳۰",
      body: "فرادید اطلس تا سال ۱۴۰۹ شمسی / ۲۰۳۰ میلادی دستیابی به سهم ۲۵ درصدی از بازار محصولات غذایی اساسی ایران را هدف‌گذاری کرده و توسعه فعالیت در امارات متحده عربی، هند و عمان را دنبال می‌کند. هدف شرکت، شناخته‌شدن به‌عنوان پیشرو در راهکارهای غذایی باکیفیت، پایدار و نوآورانه است.",
      notes: [
        "در متن مرجع، با استناد به Statista، بازار مواد غذایی ایران تا ۲۰۳۰ بیش از ۱۰۰ میلیارد دلار پیش‌بینی شده است.",
        "این چشم‌انداز رشد سالانه ۱۵ تا ۲۰ درصدی و توجه به رشد تقاضای ۸ تا ۱۰ درصدی برای غلات و حبوبات مقرون‌به‌صرفه را مطرح می‌کند.",
        "در متن مرجع، با استناد به FAO، نیاز خاورمیانه به واردات مواد غذایی تا ۲۰۳۰ حدود ۲۰ درصد افزایش خواهد یافت.",
      ],
    },
    mission: {
      label: "ماموریت",
      title: "مسیر کوتاه‌تر از تامین‌کننده معتبر تا خریدار",
      body: "ماموریت شرکت کوتاه‌سازی زنجیره تامین جهانی غذا، حذف واسطه‌های غیرضروری و خلق ارزش پایدار برای افراد، عمده‌فروشان، سازمان‌ها و نهادهای دولتی است. فرادید اطلس با تامین‌کنندگان رده‌اول، به‌ویژه در هند و پاکستان، همکاری مستقیم دارد تا کیفیت، هزینه و استمرار تامین را هم‌زمان مدیریت کند.",
      notes: [
        "نظم کیفی شرکت با استاندارد ISO 22000 هدایت می‌شود.",
        "قیمت‌گذاری بر اساس حاشیه سود منطقی و شرایط رقابتی بازار شکل می‌گیرد.",
        "دسترسی از طریق دفاتر ایران، حضور منطقه‌ای و کانال‌های فروش دیجیتال پشتیبانی می‌شود.",
      ],
    },
    values: {
      label: "ارزش‌ها",
      title: "استانداردهایی که پشت تصمیم‌های روزانه‌اند",
      body: "ارزش‌های شرکت شامل مشتری‌مداری، پایداری، اخلاق حرفه‌ای، نوآوری و کیفیت برتر است. این ارزش‌ها از طریق آموزش سالانه، ارزیابی عملکرد و انتخاب تامین‌کننده بر پایه ارزش‌ها تقویت می‌شوند.",
    },
  },
};

export function StrategicFramework({ lang }: StrategicFrameworkProps) {
  const data = lang === "en" ? content.en : content.fa;

  return (
    <AnimatedSection className="relative py-20 md:py-28 px-4 sm:px-6 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow text-accent-warm-gold mb-4">{data.eyebrow}</p>
          <h2 className="text-responsive-title text-primary mb-5">
            {data.title}
          </h2>
          <p className="text-responsive-body text-foreground/70 leading-relaxed">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <FrameworkPanel
            label={data.vision.label}
            title={data.vision.title}
            body={data.vision.body}
            notes={data.vision.notes}
          />
          <FrameworkPanel
            label={data.mission.label}
            title={data.mission.title}
            body={data.mission.body}
            notes={data.mission.notes}
          />
        </div>

        <div className="mt-6 md:mt-8 rounded-2xl border border-foreground/10 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-warm-gold mb-3">
            {data.values.label}
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            {data.values.title}
          </h3>
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
            {data.values.body}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function FrameworkPanel({
  label,
  title,
  body,
  notes,
}: {
  label: string;
  title: string;
  body: string;
  notes: string[];
}) {
  return (
    <article className="rounded-2xl border border-foreground/10 bg-white p-6 sm:p-8 md:p-10 shadow-sm h-full">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-warm-gold mb-3">
        {label}
      </p>
      <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6">
        {body}
      </p>
      <ul className="space-y-3">
        {notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm text-foreground/70">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-warm-gold" />
            <span className="leading-relaxed">{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
