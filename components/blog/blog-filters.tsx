"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import { BlogSearch } from "./blog-search";
import { BlogTags } from "./blog-tags";

interface BlogFiltersProps {
  lang: Language;
  t: (typeof translations)[Language];
}

export function BlogFilters({ lang, t }: BlogFiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTag, setActiveTag] = useState("");

  return (
    <div className="space-y-6">
      <BlogSearch lang={lang} t={t} onSearch={setSearchValue} value={searchValue} />
      <BlogTags lang={lang} t={t} activeTag={activeTag} onTagChange={setActiveTag} />
    </div>
  );
}
