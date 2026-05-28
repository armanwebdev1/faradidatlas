import type { Language } from "@/lib/i18n";
import Link from "next/link";

interface JoinTeamProps {
  lang: Language;
}

export function JoinTeam({ lang }: JoinTeamProps) {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
            {lang === "en" ? "Work with Faradid Atlas" : "با فرادید اطلس همکاری کنید"}
          </h2>

          <div
            dir={lang === "fa" ? "rtl" : "ltr"}
            className={lang === "fa" ? "text-right" : "text-left"}
            style={{
              direction: lang === "fa" ? "rtl" : "ltr",
              textAlign: lang === "fa" ? "right" : "left",
            }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              {lang === "en"
                ? "Whether you are a buyer, supplier, or future teammate, we value practical thinking, professional ethics, and long-term trust."
                : "چه خریدار باشید، چه تامین‌کننده یا همکار آینده، ما برای تفکر عملی، اخلاق حرفه‌ای و اعتماد بلندمدت ارزش قائلیم."}
            </p>

            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center text-foreground hover:text-accent font-medium transition-colors"
            >
              {lang === "en" ? "Start a Conversation" : "شروع گفتگو"}
              <span className="ml-1">&gt;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
