import { Header as HeaderClient } from "./header-client";
import type { Language } from "@/lib/i18n";

interface HeaderServerProps {
  lang: Language;
}

export async function Header({ lang }: HeaderServerProps) {
  return <HeaderClient lang={lang} />;
}
