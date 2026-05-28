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
    ? "فرادید اطلس | تامین، واردات و توزیع مواد غذایی"
    : `${companyNameEn} | Food Sourcing, Import & Distribution`;
  const description = isFa
    ? "فرادید اطلس محصولات غذایی اساسی مانند برنج، حبوبات، ادویه‌جات، آجیل، دانه‌ها و شکر را تامین، وارد و توزیع می‌کند."
    : "Faradid Atlas sources, imports, and distributes essential food products including rice, legumes, spices, nuts, seeds, and sugar.";
  const keywords = isFa
    ? [
        companyNameFa,
        "تامین B2B مواد غذایی",
        "واردات مواد غذایی",
        "تجارت مواد غذایی",
        "تامین کننده مواد غذایی",
        "توزیع مواد غذایی",
        "مواد اولیه غذایی",
        "برنج وارداتی",
        "تامین مواد غذایی",
        "توزیع عمده مواد غذایی",
      ]
    : [
        companyNameEn,
        "B2B food sourcing",
        "food import distribution",
        "food trading",
        "food supplier",
        "rice importer",
        "bulk ingredients",
        "food distribution",
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
