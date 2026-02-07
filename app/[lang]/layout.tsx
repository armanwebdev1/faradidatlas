import type React from "react";
import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";

const siteUrl = "https://faradidatlas.vercl.app";
const siteName = "faradid atlas";
const companyNameEn = "Faradid Atlas";
const companyNameFa = "فرادید اطلس";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: Language;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFa = lang === "fa";

  const title = isFa
    ? "فرادید اطلس | صادرات B2B مواد غذایی"
    : `${companyNameEn} | B2B Food Material Exports`;
  const description = isFa
    ? "فرادید اطلس شرکت صادرات B2B مواد غذایی است که تأمین مطمئن، برندسازی خصوصی و لجستیک صادرات را برای خریداران جهانی فراهم می‌کند."
    : "Faradid Atlas is a B2B food material export company delivering reliable sourcing, private labeling, and export logistics for global buyers.";
  const keywords = isFa
    ? [
        companyNameFa,
        "صادرات B2B مواد غذایی",
        "صادرات مواد غذایی",
        "تجارت مواد غذایی",
        "تامین کننده مواد غذایی",
        "برندسازی خصوصی",
        "مواد اولیه غذایی",
        "لجستیک صادرات",
        "تامین مواد غذایی",
        "صادرات مواد غذایی عمده",
      ]
    : [
        companyNameEn,
        "B2B food exports",
        "food material exports",
        "food trading",
        "food supplier",
        "private labeling",
        "bulk ingredients",
        "export logistics",
        "global food sourcing",
        "food commodities",
      ];

  return {
    title: {
      default: title,
      template: isFa ? `%s | ${companyNameFa}` : `%s | ${companyNameEn}`,
    },
    description,
    keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${lang}`,
      siteName,
      title,
      description,
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function LangLayout({ children }: LangLayoutProps) {
  return children;
}
