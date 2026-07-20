import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { getLocalized } from "@/lib/localized";

interface CEOProfileProps {
  lang: Language;
  companyInfo?: any;
}

function resolveMediaUrl(media: any): string {
  if (!media) return "/ceo.webp";
  if (typeof media === "string") return media;
  if (typeof media === "object")
    return media.url ?? media.filename ?? "/ceo.webp";
  return "/ceo.webp";
}

const fallbackContent = {
  en: {
    eyebrow: "Leadership",
    heading: "Leadership grounded in strategy and experience",
    name: "Dr. Sohrab Bakhtiar",
    bio: "Dr. Sohrab Bakhtiar, CEO of Faradid Atlas, holds a Ph.D. in International Economics from the University of Tehran and a Ph.D. in Strategic Management from Vrije Universiteit Brussel (VUB), Belgium. With decades of experience in senior policy-making and executive management positions, he is recognized as an experienced leader and expert in the field of macroeconomic strategies. Furthermore, backed by three generations of continuous family involvement in the trade of essential commodities, he possesses valuable theoretical knowledge and practical expertise in commerce, international trade, and supply chain management.",
  },
  fa: {
    eyebrow: "مدیریت",
    heading: "رهبری مبتنی بر تجربه، دانش و نگاه راهبردی",
    name: "دکتر سهراب بختیار",
    bio: "دکتر سهراب بختیار، مدیرعامل شرکت فرادید اطلس، دانش‌آموخته دکترای اقتصاد بین‌الملل از دانشگاه تهران و دکترای مدیریت استراتژیک از دانشگاه (VUB) بروکسل بلژیک است. ایشان با بهره‌گیری از دهه‌ها تجربه در سطوح عالی سیاست‌گذاری و مدیریت، از مدیران باسابقه و صاحب‌نظر در حوزه راهبردهای کلان اقتصادی به شمار می‌روند. همچنین، با پشتوانه سه نسل فعالیت مستمر خانوادگی در حوزه تجارت کالاهای اساسی، از دانش نظری و تجربه عملی ارزشمندی در عرصه بازرگانی، و مدیریت زنجیره تأمین برخوردار هستند.",
  },
  ar: {
    eyebrow: "القيادة",
    heading: "قيادة مبنية على الاستراتيجية والخبرة",
    name: "الدكتور سهراب بختيار",
    bio: "الدکتور سهراب بختيار، الرئيس التنفيذي لشركة فراديد أطلس، حاصل على درجة الدكتوراه في الاقتصاد الدولي من جامعة طهران، ودرجة الدكتوراه في الإدارة الاستراتيجية من جامعة بروكسل الحرة (VUB) في بلجيكا. وبفضل عقود من الخبرة في المستويات العليا لصنع السياسات والإدارة التنفيذية، يُعدّ من القيادات ذات الخبرة والرؤية المتخصصة في مجال الاستراتيجيات الاقتصادية الكلية. كما يمتلك، مستندًا إلى ثلاثة أجيال من النشاط العائلي المتواصل في مجال تجارة السلع الأساسية، مزيجًا قيّمًا من المعرفة الأكاديمية والخبرة العملية في مجالات التجارة، وإدارة سلسلة التوريد.",
  },
};

export function CEOProfile({ lang, companyInfo }: CEOProfileProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const fallback = fallbackContent[lang] || fallbackContent.en;

  const ceo = companyInfo?.ceo;
  const companyName = getLocalized(ceo?.name, lang) || fallback.name;
  const bio = getLocalized(ceo?.bio, lang) || fallback.bio;
  const image = resolveMediaUrl(ceo?.image);
  const eyebrow = getLocalized(ceo?.eyebrow, lang) || fallback.eyebrow;
  const heading = getLocalized(ceo?.heading, lang) || fallback.heading;

  return (
    <AnimatedSection className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl" dir={isRTL ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="opacity-0 translate-y-6 lg:col-span-5" data-animate>
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-sm">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={image}
                  alt={companyName}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="opacity-0 translate-y-6" data-animate>
              <p className="eyebrow mb-4 text-brand-navy">{eyebrow}</p>
              <h2 className="text-responsive-subheading text-primary">
                {heading}
              </h2>
            </div>

            <div className="mt-10 opacity-0 translate-y-6" data-animate>
              <p className="max-w-3xl text-base leading-8 text-foreground/75 mx-auto">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
