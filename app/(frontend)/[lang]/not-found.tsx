import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export const metadata = {
  title: "Page Not Found | Faradid Atlas",
  robots: { index: false, follow: false },
};

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";

  const title = lang === "fa"
    ? "صفحه پیدا نشد"
    : lang === "ar"
      ? "الصفحة غير موجودة"
      : "Page Not Found";

  return (
    <div lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 bg-background">
        <div className="text-center max-w-lg">
          <div className="text-8xl font-bold text-accent-warm-gold/30 mb-4 font-hero">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">
            {title}
          </h1>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {lang === "en"
              ? "The page you're looking for doesn't exist or has been moved."
              : lang === "fa"
                ? "صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است."
                : "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${lang}`}
              className="btn btn-primary btn-md"
            >
              {t.breadcrumbs.home}
            </Link>
            <Link
              href={`/${lang}/products`}
              className="btn btn-outline btn-md"
            >
              {t.breadcrumbs.products}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="btn btn-outline btn-md"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
