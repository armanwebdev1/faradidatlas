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
      region: "Company Offices",
      countries: "Tehran, Isfahan, Dubai, and Oman",
      value: 4,
      suffix: "",
    },
    {
      region: "Key Supplier Origins",
      countries: "Direct sourcing focus across India and Pakistan",
      value: 2,
      suffix: "",
    },
    {
      region: "DOCX-Listed Products",
      countries: "Rice, legumes, seeds, nuts, spices, and sugar",
      value: 25,
      suffix: "",
    },
  ],
  fa: [
    {
      region: "برندهای شناخته‌شده برنج",
      countries: "۲۱، میزبان، حیات و گل‌بانو",
      value: 4,
      suffix: "",
    },
    {
      region: "دفاتر شرکت",
      countries: "تهران، اصفهان، دبی و عمان",
      value: 4,
      suffix: "",
    },
    {
      region: "مبداهای کلیدی تامین",
      countries: "تمرکز تامین مستقیم از هند و پاکستان",
      value: 2,
      suffix: "",
    },
    {
      region: "تنوع محصولات",
      countries: "برنج، حبوبات، دانه‌ها، آجیل، ادویه‌جات و شکر",
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
          <p className="eyebrow text-accent mb-4 sm:mb-5 md:mb-6">
            {lang === "en" ? "Supply Footprint" : "گستره تامین"}
          </p>
          <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
            <span className="inline-block">
              {lang === "en" ? "Regional" : "حضور"}
            </span>
            <span className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold to-accent-warm-orange">
              {lang === "en" ? "Reach" : "منطقه‌ای"}
            </span>
          </h2>

          <p className="text-responsive-body text-foreground/70 max-w-2xl mx-auto animate-fade-in-up">
            {lang === "en"
              ? "Our network connects first-tier suppliers with offices and distribution support across Iran and nearby regional markets."
              : "شبکه ما تامین‌کنندگان رده‌اول را به دفاتر و پشتیبانی توزیع در ایران و بازارهای منطقه‌ای نزدیک متصل می‌کند."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 items-stretch">
          {marketList.map((market, idx) => (
            <div
              key={idx}
              className="group relative animate-fade-in-up h-full"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-full p-6 sm:p-8 md:p-10 border border-border/30 rounded-2xl sm:rounded-2xl bg-card/50 transition-all duration-500 ease-out group-hover:border-accent-warm-gold/50 group-hover:shadow-lg hover:bg-gradient-to-br hover:from-foreground/[0.02] hover:to-foreground/[0.01] flex flex-col">
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
