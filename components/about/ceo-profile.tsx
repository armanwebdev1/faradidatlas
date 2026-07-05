import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";

interface CEOProfileProps {
  lang: Language;
}

const content = {
  en: {
    eyebrow: "Leadership",
    heading: "Leadership grounded in strategy and experience",
    role: "Chief Executive Officer",
    name: "Dr. Sohrab Bakhtiar",
    degrees:
      "Ph.D. in International Economics, University of Tehran • Ph.D. in Strategic Management, Vrije Universiteit Brussel (VUB), Belgium",
    bio: "Dr. Sohrab Bakhtiar, Chief Executive Officer of Faradid Atlas, combines decades of executive leadership and economic policymaking experience with a strong academic foundation in international economics and strategic management. Recognized for his expertise in macroeconomic strategy, he has played leading roles in strategic planning and organizational leadership throughout his career. His perspective is shaped by both rigorous academic research and extensive executive experience. Supported by three generations of continuous family involvement in the trade of essential commodities, Dr. Bakhtiar brings together practical expertise in international commerce, procurement, and supply chain management with a long-term vision for sustainable business growth and food security.",
  },
  fa: {
    eyebrow: "مدیریت",
    heading: "رهبری مبتنی بر تجربه، دانش و نگاه راهبردی",
    role: "مدیرعامل",
    name: "دکتر سهراب بختیار",
    bio: "دکتر سهراب بختیار، مدیرعامل شرکت فرادید اطلس، دانش‌آموخته دکترای اقتصاد بین‌الملل از دانشگاه تهران و دکترای مدیریت استراتژیک از دانشگاه (VUB) بروکسل بلژیک است. ایشان با بهره‌گیری از دهه‌ها تجربه در سطوح عالی سیاست‌گذاری و مدیریت، از مدیران باسابقه و صاحب‌نظر در حوزه راهبردهای کلان اقتصادی به شمار می‌روند. همچنین، با پشتوانه سه نسل فعالیت مستمر خانوادگی در حوزه تجارت کالاهای اساسی، از دانش نظری و تجربه عملی ارزشمندی در عرصه بازرگانی، تجارت بین‌الملل و مدیریت زنجیره تأمین برخوردار هستند.",
  },
};

export function CEOProfile({ lang }: CEOProfileProps) {
  const data = lang === "en" ? content.en : content.fa;
  const isRTL = lang === "fa";

  return (
    <AnimatedSection className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl" dir={isRTL ? "rtl" : "ltr"}>
        <div className="opacity-0 translate-y-6 mb-10" data-animate>
          <p className="eyebrow text-brand-navy">{data.eyebrow}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="opacity-0 translate-y-6 lg:col-span-5" data-animate>
            <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_18px_45px_rgba(30,35,39,0.06)]">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src="/ceo.webp"
                  alt={
                    lang === "en"
                      ? "Dr. Sohrab Bakhtiar, Chief Executive Officer of Faradid Atlas"
                      : "دکتر سهراب بختیار، مدیرعامل فرادید اطلس"
                  }
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="opacity-0 translate-y-6" data-animate>
              <h2 className="text-responsive-subheading text-primary">
                {data.heading}
              </h2>
            </div>

            <div className="mt-10 opacity-0 translate-y-6" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-warm-gold">
                {data.role}
              </p>

              <h3 className="mt-3 text-3xl font-semibold leading-tight text-primary md:text-4xl">
                {data.name}
              </h3>

              <p className="mt-8 max-w-3xl text-base leading-8 text-foreground/75">
                {data.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
