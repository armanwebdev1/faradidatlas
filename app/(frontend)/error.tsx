"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const langMatch = pathname?.match(/^\/(en|fa|ar)/);
  const lang = langMatch ? langMatch[1] : "en";

  useEffect(() => {
    console.error("[Frontend Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6 py-12 max-w-md">
        <div className="text-6xl font-bold text-accent-warm-gold/30 mb-4 font-hero">
          !
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          {lang === "en"
            ? "Something went wrong"
            : lang === "fa"
              ? "مشکلی پیش آمد"
              : "حدث خطأ ما"}
        </h1>
        <p className="text-foreground/70 mb-8">
          {lang === "en"
            ? "We encountered an unexpected error. Please try again."
            : lang === "fa"
              ? "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید."
              : "واجهنا خطأ غير متوقع. يرجى المحاولة مرة أخرى."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn btn-primary btn-md"
          >
            {lang === "en"
              ? "Try again"
              : lang === "fa"
                ? "تلاش مجدد"
                : "حاول مرة أخرى"}
          </button>
          <Link
            href={`/${lang}`}
            className="btn btn-outline btn-md"
          >
            {lang === "en"
              ? "Return Home"
              : lang === "fa"
                ? "بازگشت به خانه"
                : "العودة للرئيسية"}
          </Link>
        </div>
      </div>
    </div>
  );
}
