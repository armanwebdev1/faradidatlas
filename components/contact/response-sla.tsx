import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface ResponseSLAProps {
  lang: Language;
}

export function ResponseSLA({ lang }: ResponseSLAProps) {
  const t = translations[lang];
  const data = t.pages.contact.sla;

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
          {data.steps.map((sla, idx) => (
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
