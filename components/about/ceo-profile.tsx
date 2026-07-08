import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";

interface CEOProfileProps {
  lang: Language;
  companyInfo?: any;
}

function getLocalized(value: any, lang: Language): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value[lang]) return value[lang];
  if (typeof value === "object" && value.en) return value.en;
  return "";
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
    role: "Chief Executive Officer",
    name: "Dr. Sohrab Bakhtiar",
    bio: "Dr. Sohrab Bakhtiar, Chief Executive Officer of Faradid Atlas, combines decades of executive leadership and economic policymaking experience with a strong academic foundation in international economics and strategic management.",
  },
  fa: {
    eyebrow: "مدیریت",
    heading: "رهبری مبتنی بر تجربه، دانش و نگاه راهبردی",
    role: "مدیرعامل",
    name: "دکتر سهراب بختیار",
    bio: "دکتر سهراب بختیار، مدیرعامل شرکت فرادید اطلس، دانش‌آموخته دکترای اقتصاد بین‌الملل از دانشگاه تهران و دکترای مدیریت استراتژیک از دانشگاه (VUB) بروکسل بلژیک است.",
  },
  ar: {
    eyebrow: "القيادة",
    heading: "قيادة مبنية على الاستراتيجية والخبرة",
    role: "الرئيس التنفيذي",
    name: "الدكتور سهراب بختيار",
    bio: "الدكتور سهراب بختيار، الرئيس التنفيذي لشركة فراديد أطلس، يجمع بين عقود من القيادة التنفيذية وصنع السياسات الاقتصادية.",
  },
};

export function CEOProfile({ lang, companyInfo }: CEOProfileProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const fallback = fallbackContent[lang] || fallbackContent.en;

  const ceo = companyInfo?.ceo;
  const name = getLocalized(ceo?.name, lang) || fallback.name;
  const role = getLocalized(ceo?.title, lang) || fallback.role;
  const bio = getLocalized(ceo?.bio, lang) || fallback.bio;
  const image = resolveMediaUrl(ceo?.image);

  return (
    <AnimatedSection className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl" dir={isRTL ? "rtl" : "ltr"}>
        <div className="opacity-0 translate-y-6 mb-10 text-center" data-animate>
          <p className="eyebrow text-brand-navy">{fallback.eyebrow}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="opacity-0 translate-y-6 lg:col-span-5" data-animate>
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_18px_45px_rgba(30,35,39,0.06)]">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="opacity-0 translate-y-6" data-animate>
              <h2 className="text-responsive-subheading text-primary">
                {fallback.heading}
              </h2>
            </div>

            <div className="mt-10 opacity-0 translate-y-6" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-warm-gold">
                {role}
              </p>

              <h3 className="mt-3 text-3xl font-semibold leading-tight text-primary md:text-4xl">
                {name}
              </h3>

              <p className="mt-8 max-w-3xl text-base leading-8 text-foreground/75">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
