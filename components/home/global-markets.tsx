import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { CountUp } from "@/components/shared/count-up";
import { RevealSection } from "@/components/shared/reveal-section";
import { getLocalized } from "@/lib/localized";

interface GlobalMarketsProps {
  lang: Language;
  markets?: Array<{
    country?: any;
    description?: any;
    value?: number | null;
    isActive?: boolean | null;
  }>;
}

const defaultMarkets = {
  en: [
    {
      region: "Recognized Rice Brands",
      countries: "21, Mizban, Hayat, and Golbanou",
      value: 4,
      suffix: "",
    },
    {
      region: "Offices & Regional Presence",
      countries: "Tehran, Isfahan, Dubai, and Oman",
      value: 4,
      suffix: "",
    },
    {
      region: "Key Sourcing Origins",
      countries: "Direct sourcing focus across India and Pakistan",
      value: 30,
      suffix: "",
    },
    {
      region: "Product Portfolio",
      countries: "Rice, legumes, seeds, nuts, spices, and sugar",
      value: 25,
      suffix: "",
    },
  ],
  fa: [
    {
      region: "برند معتبر",
      countries:
        "۲۱، میزبان، حیات و گلبانو؛ نام‌هایی آشنا برای بازار عمده و مصرف سازمانی",
      value: 4,
      suffix: "",
    },
    {
      region: "دفاتر شرکت",
      countries:
        "تهران، اصفهان، دبی و عمان؛ برای پیگیری بهتر، پاسخ سریع‌تر و پشتیبانی مطمئن‌تر",
      value: 4,
      suffix: "",
    },
    {
      region: "مسیر تأمین",
      countries:
        "تمرکز بر تأمین مستقیم از مبدأهای معتبر مانند هند، پاکستان، تایلند و کانادا",
      value: 30,
      suffix: "",
    },
    {
      region: "گروه کالایی",
      countries: "از برنج و حبوبات تا دانه‌ها، مغزها، ادویه‌ها و شکر",
      value: 25,
      suffix: "",
    },
  ],
  ar: [
    {
      region: "علامات تجارية معترف بها",
      countries:
        "٢١ وميزبان وحياة وگلبانو؛  معروفة لسوق الجملة والاستهلاك المؤسسي",
      value: 4,
      suffix: "",
    },
    {
      region: "مكاتب الشركة",
      countries:
        "طهران وأصفهان ودبي ومسقط؛ لمتابعة أفضل واستجابة أسرع ودعم أكثر موثوقية",
      value: 4,
      suffix: "",
    },
    {
      region: "مسار التوريد",
      countries:
        "التركيز على التوريد المباشر من مصادر موثوقة مثل الهند وباكستان وتايلندا وكندا",
      value: 30,
      suffix: "",
    },
    {
      region: "فئة المنتجات",
      countries: "من الأرز والبقوليات إلى البذور والمكسرات والتوابل والسكر",
      value: 25,
      suffix: "",
    },
  ],
};

export function GlobalMarkets({
  lang,
  markets: payloadMarkets,
}: GlobalMarketsProps) {
  const t = translations[lang];

  const marketList = payloadMarkets?.length
    ? payloadMarkets
        .filter((m: any) => m.isActive !== false)
        .map((m) => ({
          region: getLocalized(m.country, lang),
          countries: getLocalized(m.description, lang),
          value: m.value ?? 4,
          suffix: "",
        }))
    : defaultMarkets[lang] || defaultMarkets.en;

  return (
    <RevealSection
      id="markets"
      className="section relative overflow-hidden bg-surface opacity-0 translate-y-6"
    >
      <div className="relative container-wide">
        <div className="text-center mb-14 sm:mb-16 md:mb-20">
          <p className="eyebrow text-brand-navy mb-4 sm:mb-5 md:mb-6">
            {t.pages.home.marketsEyebrow}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
            <span className="inline-block">{t.pages.home.marketsRegional}</span>
            <span className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-linear-to-r from-accent-warm-gold to-accent-warm-orange">
              {t.pages.home.marketsReach}
            </span>
          </h2>

          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto animate-fade-in-up">
            {t.pages.home.marketsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 items-stretch">
          {marketList.map((market, idx) => (
            <div
              key={idx}
              className="group relative animate-fade-in-up h-full"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-full p-6 sm:p-8 md:p-10 border border-border/30 rounded-2xl sm:rounded-2xl bg-card/50 transition-all duration-500 ease-out group-hover:border-accent-warm-gold/50 group-hover:shadow-lg hover:bg-linear-to-br hover:from-foreground/2 hover:to-foreground/1 flex flex-col">
                <div className="mb-6 relative">
                  <CountUp
                    target={market.value}
                    suffix={market.suffix}
                    className="text-responsive-section text-accent-warm-gold"
                  />
                </div>

                <div className="mb-4 pb-4 border-b border-border/30">
                  <h3 className="text-responsive-subheading text-foreground">
                    {market.region}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-foreground/65 leading-relaxed">
                  {market.countries}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
