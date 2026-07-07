import { getProducts } from "@/lib/fetch/products";
import { Header as HeaderClient } from "./header-client";
import type { Language } from "@/lib/i18n";

interface HeaderServerProps {
  lang: Language;
}

export async function Header({ lang }: HeaderServerProps) {
  const products = await getProducts(lang);
  return <HeaderClient lang={lang} products={products} />;
}
