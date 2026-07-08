import { getProducts } from "@/lib/fetch/products";
import { Header as HeaderClient } from "./header-client";
import type { Language } from "@/lib/i18n";

interface HeaderServerProps {
  lang: Language;
}

export async function Header({ lang }: HeaderServerProps) {
  console.log(`\n[INSTR] <Header> ENTER`)
  const t = Date.now()
  const products = await getProducts(lang);
  console.log(`[INSTR] <Header> EXIT  ${Date.now() - t}ms`)
  return <HeaderClient lang={lang} products={products} />;
}
