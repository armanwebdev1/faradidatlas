"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import { BlogSearch } from "./blog-search";
import { BlogTags } from "./blog-tags";

interface BlogFiltersProps {
  lang: Language;
}

export function BlogFilters({ lang }: BlogFiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTag, setActiveTag] = useState("");

  return (
    <div className="space-y-6">
      <BlogSearch lang={lang} onSearch={setSearchValue} value={searchValue} />
      <BlogTags lang={lang} activeTag={activeTag} onTagChange={setActiveTag} />
    </div>
  );
}
