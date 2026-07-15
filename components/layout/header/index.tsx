import { Header as HeaderClient } from "./header-client";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { getProducts } from "@/lib/fetch/products";

interface HeaderServerProps {
  lang: Language;
}

export async function Header({ lang }: HeaderServerProps) {
  const t = translations[lang];
  let products: any[] = [];
  try {
    products = await getProducts(lang);
  } catch (err) {
    console.error('[Header] products fetch failed:', err);
  }
  return <HeaderClient lang={lang} t={t} products={products} />;
}
