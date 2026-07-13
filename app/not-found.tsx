"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const langMatch = pathname?.match(/^\/(en|fa|ar)/);
  const lang = langMatch ? langMatch[1] : "en";
  const isRTL = lang === "fa" || lang === "ar";

  const content = {
    en: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      home: "Home",
      products: "Products",
      contact: "Contact",
    },
    fa: {
      title: "صفحه پیدا نشد",
      description: "صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.",
      home: "خانه",
      products: "محصولات",
      contact: "تماس",
    },
    ar: {
      title: "الصفحة غير موجودة",
      description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      home: "الرئيسية",
      products: "المنتجات",
      contact: "اتصل بنا",
    },
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#fafaf8",
          color: "#1a1a1a",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "480px" }}>
          <div
            style={{
              fontSize: "6rem",
              fontWeight: "800",
              lineHeight: "1",
              color: "#d4a853",
              marginBottom: "1rem",
              fontFamily: "Georgia, serif",
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "2.5rem",
              lineHeight: "1.6",
            }}
          >
            {t.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/${lang}`}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#1a1a1a",
                color: "white",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              {t.home}
            </Link>
            <Link
              href={`/${lang}/products`}
              style={{
                padding: "0.75rem 1.5rem",
                background: "transparent",
                color: "#1a1a1a",
                border: "1px solid #d1d1d1",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              {t.products}
            </Link>
            <Link
              href={`/${lang}/contact`}
              style={{
                padding: "0.75rem 1.5rem",
                background: "transparent",
                color: "#1a1a1a",
                border: "1px solid #d1d1d1",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
