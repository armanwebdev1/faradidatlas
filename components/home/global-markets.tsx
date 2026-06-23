import type { Language } from "@/lib/i18n";
import { CountUp } from "@/components/shared/count-up";
import { RevealSection } from "@/components/shared/reveal-section";

interface GlobalMarketsProps {
  lang: Language;
}

const markets = {
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
        "تمرکز بر تأمین مستقیم از مبدأهای معتبر مانند هند، پاکستان، تایلند و کانادا برای دسترسی پایدارتر به کالاهای اساسی.",
      value: 30,
      suffix: "",
    },
    {
      region: "گروه کالایی",
      countries:
        "از برنج و حبوبات تا دانه‌ها، مغزها، ادویه‌ها و شکر؛ برای نیازهای متنوع بازار",
      value: 25,
      suffix: "",
    },
  ],
};

export function GlobalMarkets({ lang }: GlobalMarketsProps) {
  const marketList = lang === "en" ? markets.en : markets.fa;

  return (
    <RevealSection
      id="markets"
      className="section relative overflow-hidden bg-surface opacity-0 translate-y-6"
    >
      <div className="relative container-wide">
        <div className="text-center mb-14 sm:mb-16 md:mb-20">
          <p className="eyebrow text-brand-navy mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Supply Footprint" : "گستره تأمین"}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
            <span className="inline-block">
              {lang === "en" ? "Regional" : "شبکه فعال"}
            </span>
            <span className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-linear-to-r from-accent-warm-gold to-accent-warm-orange">
              {lang === "en" ? "Reach" : "تأمین و توزیع"}
            </span>
          </h2>

          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto animate-fade-in-up">
            {lang === "en"
              ? "Our network connects first-tier suppliers with offices and distribution support across Iran and nearby regional markets."
              : "شبکه ما مبدأهای معتبر تأمین را به دفاتر فعال، مسیرهای توزیع و پشتیبانی عملیاتی در ایران و بازارهای منطقه‌ای وصل می‌کند."}
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
