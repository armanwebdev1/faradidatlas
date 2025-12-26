import type { Language } from "@/lib/i18n"

interface AboutHeroProps {
  lang: Language
}

export function AboutHero({ lang }: AboutHeroProps) {
  const isRTL = lang === "fa"

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-8 leading-tight">
          {lang === "en" ? "Our Story" : "داستان ما"}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-neutral leading-relaxed mb-6">
            {lang === "en"
              ? "Founded in 1998, Premium Foods emerged from a simple belief: the world's best food products deserve trustworthy partners. For over 25 years, we've built relationships with top producers across Iran and beyond, ensuring only the finest reaches your table."
              : "تأسیس‌ شده در سال ۱۳۷۷، فروغ غذا از یک باور ساده نشأت گرفت: بهترین محصولات غذایی جهان شایسته شرکای قابل‌اعتماد هستند. در طول ۲۵ سال، ما روابط قوی با تولیدکنندگان برتر در سراسر ایران و فراتر از آن ایجاد کرده‌ایم."}
          </p>
          <p className="text-xl text-neutral leading-relaxed">
            {lang === "en"
              ? "Today, we serve importers and retailers in 40+ countries, maintaining the same commitment to quality, transparency, and ethical sourcing that defines our identity."
              : "امروز، ما خدمات رسانی به واردکنندگان و فروشندگان در بیش از ۴۰ کشور را ادامه می‌دهیم و همان تعهد به کیفیت، شفافیت و منابع اخلاقی را حفظ می‌کنیم."}
          </p>
        </div>
      </div>
    </section>
  )
}
