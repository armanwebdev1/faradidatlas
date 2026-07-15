import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  CheckCircle2,
  Compass,
  Route,
  type LucideIcon,
} from "lucide-react";
import { AnimatedSection } from "./animated-section";

interface StrategicFrameworkProps {
  lang: Language;
  companyInfo?: any;
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
        "Market research points to a large Iranian food market opportunity by 2030.",
        "The same vision calls for 15-20% annual growth and attention to 8-10% annual demand growth in cost-effective grains and legumes.",
        "Regional food import demand is expected to keep rising across the Middle East.",
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
    eyebrow: "چشم‌انداز، مأموریت و ارزش‌ها",
    title: "مسیر روشن ما برای تأمین پایدار مواد غذایی",
    intro:
      "فرادید اطلس مسیر خود را بر پایه تأمین پایدار، ارتباط مستقیم با منابع معتبر، اخلاق حرفه‌ای و دسترسی به مواد غذایی اساسی باکیفیت بنا کرده است.",
    vision: {
      label: "چشم‌انداز",
      title: "رشد پایدار تا سال ۱۴۰۹ / ۲۰۳۰",
      body: "فرادید اطلس تا سال ۱۴۰۹ شمسی / ۲۰۳۰ میلادی، دستیابی به جایگاهی پررنگ‌تر در بازار مواد غذایی اساسی ایران و توسعه فعالیت در امارات متحده عربی، هند و عمان را دنبال می‌کند. هدف ما این است که به‌عنوان مجموعه‌ای قابل اعتماد در ارائه راهکارهای غذایی باکیفیت، پایدار و نوآورانه شناخته شویم.",
      notes: [
        "برآوردهای بازار، رشد قابل توجه صنعت مواد غذایی ایران تا سال ۲۰۳۰ را نشان می‌دهد.",
        "افزایش تقاضا برای غلات و حبوبات مقرون‌به‌صرفه، فرصت مهمی برای توسعه سهم بازار ایجاد می‌کند.",
        "نیاز رو‌به‌رشد خاورمیانه به واردات مواد غذایی، اهمیت زنجیره‌های تأمین منظم و قابل اتکا را بیشتر می‌کند.",
      ],
    },
    mission: {
      label: "مأموریت",
      title: "ارتباط مستقیم‌تر میان تأمین‌کننده معتبر و خریدار",
      body: "مأموریت ما ساده‌تر کردن مسیر تأمین مواد غذایی، کاهش واسطه‌های غیرضروری و ایجاد ارزش پایدار برای مشتریان، عمده‌فروشان، سازمان‌ها و نهادهای دولتی است. فرادید اطلس با تأمین‌کنندگان معتبر، به‌ویژه در هند و پاکستان، همکاری مستقیم دارد تا کیفیت، هزینه و تداوم تأمین را هم‌زمان مدیریت کند.",
      notes: [
        "کنترل کیفیت بر پایه استانداردهای معتبر، از جمله ISO 22000 انجام می‌شود.",
        "قیمت‌گذاری با در نظر گرفتن شرایط بازار و حاشیه سود منطقی شکل می‌گیرد.",
        "دفاتر ایران، حضور منطقه‌ای و کانال‌های فروش دیجیتال، دسترسی خریداران را آسان‌تر می‌کند.",
      ],
    },
    values: {
      label: "ارزش‌ها",
      title: "اصولی که تصمیم‌های ما را شکل می‌دهند",
      body: "مشتری‌مداری، پایداری، اخلاق حرفه‌ای، نوآوری و کیفیت برتر، ارزش‌های اصلی فرادید اطلس هستند. این ارزش‌ها در انتخاب تأمین‌کنندگان، شیوه همکاری با مشتریان، آموزش نیروها و تصمیم‌های روزانه شرکت نقش مستقیم دارند.",
    },
  },
  ar: {
    eyebrow: "الرؤية والمهمة والقيم",
    title: "إطار واضح لإمداد الغذاء المستدام",
    intro:
      "بُنيت استراتيجية فراديد أطلس على أساس التوريد المستدام والتواصل المباشر مع المصادر الموثوقة والأخلاق المهنية والوصول إلى أغذية أساسية عالية الجودة.",
    vision: {
      label: "الرؤية",
      title: "النمو المستدام بحلول عام 2030",
      body: "تهدف فراديد أطلس بحلول عام 2030 إلى الوصول إلى حصة أكبر في سوق المنتجات الغذائية الأساسية في إيران وتوسيع نطاق عملها في الإمارات العربية المتحدة والهند وعمان. يسعى المشروع ليكون معروفاً بحلول غذائية عالية الجودة ومستدام ومبتكرة.",
      notes: [
        "تشير أبحاث السوق إلى فرص كبيرة في صناعة الأغذية الإيرانية بحلول عام 2030.",
        "الطلب المتزايد على الحبوب والبقوليات الفعالة من حيث التكلفة يوفر فرصة مهمة لتنمية الحصة السوقية.",
        "الطلب المتزايد في الشرق الأوسط على واردات الأغذية يزيد من أهمية سلاسل التوريد المنتظمة والموثوقة.",
      ],
    },
    mission: {
      label: "المهمة",
      title: "توصيل مباشر أكثر من الموردين الموثوقين إلى المشترين",
      body: "مهمتنا هي تبسيط سلسلة توريد الغذاء وتقليل الوسطاء غير الضروريين وإنشاء قيمة مستدامة للعملاء والتجار بالجملة والمؤسسات والهيئات الحكومية. تعمل فراديد أطلس بشكل مباشر مع الموردين من الدرجة الأولى، لا سيما في الهند وباكستان، لتحقيق التوازن بين الجودة والتكلفة واستمرارية التوريد.",
      notes: [
        "يتم إجراء مراقبة الجودة وفقاً لمعايير ISO 22000 المرجعية.",
        "يشكل التسعير شروط السوق وحوافز الربح المعقولية.",
        "تسهل المكاتب الإيرانية والحضور الإقليمي وقنوات المبيعات الرقمية الوصول للمشترين.",
      ],
    },
    values: {
      label: "القيم",
      title: "المبادئ التي تشكل قراراتنا اليومية",
      body: "التركيز على المستهلك والاستدامة والأخلاق المهنية والابتكار والجودة العالية هي القيم الأساسية لفراديد أطلس. تلعب هذه الأدوار دوراً مباشراً في اختيار الموردين وطريقة التعاون مع العملاء وتدريب الموظفين والقرارات اليومية للشركة.",
    },
  },
};

import { getLocalized } from "@/lib/localized";

export function StrategicFramework({ lang, companyInfo }: StrategicFrameworkProps) {
  const fallback = lang === "en" ? content.en : lang === "fa" ? content.fa : content.ar;
  const sf = companyInfo?.strategicFramework;

  const data = sf?.title
    ? {
        eyebrow: getLocalized(sf.eyebrow, lang) || fallback.eyebrow,
        title: getLocalized(sf.title, lang) || fallback.title,
        intro: getLocalized(sf.intro, lang) || fallback.intro,
        vision: {
          label: getLocalized(sf.vision?.label, lang) || fallback.vision.label,
          title: getLocalized(sf.vision?.title, lang) || fallback.vision.title,
          body: getLocalized(sf.vision?.body, lang) || fallback.vision.body,
          notes: sf.vision?.notes?.length
            ? sf.vision.notes.map((n: any) => getLocalized(n.text, lang) || "")
            : fallback.vision.notes,
        },
        mission: {
          label: getLocalized(sf.mission?.label, lang) || fallback.mission.label,
          title: getLocalized(sf.mission?.title, lang) || fallback.mission.title,
          body: getLocalized(sf.mission?.body, lang) || fallback.mission.body,
          notes: sf.mission?.notes?.length
            ? sf.mission.notes.map((n: any) => getLocalized(n.text, lang) || "")
            : fallback.mission.notes,
        },
        values: {
          label: getLocalized(sf.valuesSection?.label, lang) || fallback.values.label,
          title: getLocalized(sf.valuesSection?.title, lang) || fallback.values.title,
          body: getLocalized(sf.valuesSection?.body, lang) || fallback.values.body,
        },
      }
    : fallback;
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];

  return (
    <AnimatedSection className="relative overflow-hidden bg-background-alt px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div
          className="mx-auto max-w-4xl py-10 text-center md:py-14"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <p className="eyebrow mb-4 text-brand-navy">
            {t.pages.about.visionMission}
          </p>
          <h2 className="mx-auto max-w-4xl text-center text-responsive-title text-primary">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-responsive-body leading-relaxed text-foreground/70 md:mt-6">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 py-8 md:gap-6 md:py-10 lg:grid-cols-2">
          <FrameworkPanel
            number="01"
            Icon={Compass}
            isRTL={isRTL}
            label={data.vision.label}
            title={data.vision.title}
            body={data.vision.body}
            notes={data.vision.notes}
          />
          <FrameworkPanel
            number="02"
            Icon={Route}
            isRTL={isRTL}
            label={data.mission.label}
            title={data.mission.title}
            body={data.mission.body}
            notes={data.mission.notes}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

function FrameworkPanel({
  number,
  Icon,
  isRTL,
  label,
  title,
  body,
  notes,
}: {
  number: string;
  Icon: LucideIcon;
  isRTL: boolean;
  label: string;
  title: string;
  body: string;
  notes: string[];
}) {
  return (
    <article
      className={`relative h-full overflow-hidden rounded-xl border border-foreground/10 bg-white/90 p-6 shadow-sm sm:p-8 md:p-9 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mb-8 flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent-warm-gold/25 bg-accent-warm-gold/10 text-accent-warm-gold">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <span className="font-hero text-5xl leading-none text-foreground/8">
          {number}
        </span>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm-gold">
        {label}
      </p>
      <h3 className="mb-4 text-2xl font-semibold leading-tight text-primary md:text-3xl">
        {title}
      </h3>
      <p className="mb-7 text-sm leading-relaxed text-foreground/70 sm:text-base">
        {body}
      </p>

      <ul className="space-y-4 pt-2">
        {notes.map((note) => (
          <li
            key={note}
            className="flex gap-3 text-sm leading-relaxed text-foreground/70"
          >
            <CheckCircle2
              className="mt-1 h-4 w-4 shrink-0 text-accent-warm-gold"
              strokeWidth={1.8}
            />
            <span className="leading-relaxed">{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
