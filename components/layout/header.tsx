import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  Briefcase,
  ChevronDown,
  HelpCircle,
  Home,
  Info,
  Phone,
  Search,
  ShoppingBag,
} from "lucide-react";

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const otherLang = lang === "en" ? "fa" : "en";

  const navItems = [
    { href: `/${lang}`, label: t.nav.home, key: "home", Icon: Home },
    { href: `/${lang}/about`, label: t.nav.about, key: "about", Icon: Info },
    {
      href: `/${lang}/products`,
      label: t.nav.products,
      key: "products",
      Icon: ShoppingBag,
    },
    {
      href: `/${lang}/careers`,
      label: t.nav.careers,
      key: "careers",
      Icon: Briefcase,
    },
    { href: `/${lang}/faq`, label: t.nav.faq, key: "faq", Icon: HelpCircle },
    {
      href: `/${lang}/contact`,
      label: t.nav.contact,
      key: "contact",
      Icon: Phone,
    },
  ];

  return (
    <>
      <header
        dir={dir}
        className="fixed top-0 inset-x-0 z-40 transition-transform duration-300"
      >
        <div className="relative z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
          <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
            <a
              href={`/${lang}`}
              className="group relative flex flex-col leading-[0.9] px-2 py-1 rounded-lg text-primary transition-all duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="relative z-10 inline-block text-xl sm:text-2xl font-bold tracking-[0.18em] text-primary">
                <span className="relative z-10">Faradid</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Faradid
                </span>
              </span>
              <span className="relative z-10 text-[11px] sm:text-xs font-medium tracking-[0.24em] text-muted-foreground/90 transition-colors duration-300 group-hover:text-primary/80">
                Atlas
              </span>
              <span className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/10 to-accent/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -bottom-1 left-2 right-2 z-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>

            <form
              action={`/${lang}/products`}
              className="hidden md:flex flex-1 justify-center px-4"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none left-4" />
                <input
                  type="search"
                  name="q"
                  placeholder={`${t.common.search}...`}
                  className="py-2 text-sm border border-border/50 rounded-full bg-background/60 text-foreground placeholder-muted-foreground placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all hover:border-border/70 pl-12 pr-4 text-left"
                  aria-label={t.common.search}
                />
              </div>
            </form>

            <details className="relative shrink-0 group/lang">
              <summary
                aria-label={lang === "en" ? "Select language" : "Ø§Ù†ØªØ®Ø§Ø¨ Ø²Ø¨Ø§Ù†"}
                className="flex cursor-pointer list-none items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 [&::-webkit-details-marker]:hidden"
              >
                <span className="text-base sm:text-lg">
                  {lang === "en" ? "US" : "IR"}
                </span>
                <span className="hidden sm:inline text-sm font-medium text-foreground">
                  {lang === "en" ? "English" : "ÙØ§Ø±Ø³ÛŒ"}
                </span>
                <ChevronDown
                  size={18}
                  className="text-muted-foreground transition-transform duration-300 group-open/lang:rotate-180"
                />
              </summary>
              <div
                dir={dir}
                className="absolute top-full mt-2 right-0 w-44 sm:w-48 bg-background/95 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                role="menu"
              >
                <div className="px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/10">
                  <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                    {isRTL ? "Ø²Ø¨Ø§Ù†" : "Language"}
                  </p>
                </div>
                <div className="py-2 space-y-1 px-2">
                  <a
                    href={`/${lang}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-primary/10 text-primary shadow-sm"
                    role="menuitem"
                  >
                    <span className="text-lg">{lang === "en" ? "US" : "IR"}</span>
                    <span>{lang === "en" ? "English" : "ÙØ§Ø±Ø³ÛŒ"}</span>
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  </a>
                  <a
                    href={`/${otherLang}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-muted/50 transition-all duration-200"
                    role="menuitem"
                  >
                    <span className="text-lg">{otherLang === "en" ? "US" : "IR"}</span>
                    <span>{otherLang === "en" ? "English" : "ÙØ§Ø±Ø³ÛŒ"}</span>
                  </a>
                </div>
              </div>
            </details>

            <details className="lg:hidden">
              <summary
                className="list-none p-2 text-foreground shrink-0 cursor-pointer [&::-webkit-details-marker]:hidden"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <div className="fixed inset-x-0 top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/30 animate-in fade-in slide-in-from-top-8 duration-200">
                <nav className="flex flex-col space-y-1 p-4">
                  {navItems.map(({ href, label, key, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-foreground hover:bg-muted/50"
                    >
                      <Icon size={20} />
                      <span>{label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </details>
          </div>
        </div>

        <nav className="relative z-10 backdrop-blur-md bg-background/70 hidden lg:block border-b border-border/30">
          <div className="w-full px-6 h-12 flex items-center justify-center gap-4 lg:gap-8">
            {navItems.map(({ href, label, key, Icon }) => (
              <a
                key={key}
                href={href}
                className="relative flex items-center gap-2.5 h-full text-sm font-medium transition-colors group"
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-muted-foreground transition-all duration-200 group-hover:text-primary group-hover:scale-105"
                />
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
                <span className="absolute bottom-0 inset-x-0 h-1 bg-primary rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </nav>
      </header>
      <div className="h-16 sm:h-16 md:h-28" />
    </>
  );
}
