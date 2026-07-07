import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/fetch/products";
import { getJobs } from "@/lib/fetch/jobs";
import {
  absoluteUrl,
  localizedAlternates,
  localizedPath,
  supportedLanguages,
} from "@/lib/site";

const staticPaths = ["", "about", "products", "contact", "faq", "careers", "blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, jobs] = await Promise.all([getProducts("en"), getJobs("en")]);
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of supportedLanguages) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizedPath(lang, path)),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: localizedAlternates(path),
        },
      });
    }

    for (const product of products) {
      const path = `products/${product.slug}`;
      entries.push({
        url: absoluteUrl(localizedPath(lang, path)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localizedAlternates(path) },
        ...(product.image ? { images: [absoluteUrl(product.image)] } : {}),
      });
    }

    for (const job of jobs) {
      const path = `careers/${job.id}`;
      entries.push({
        url: absoluteUrl(localizedPath(lang, path)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: localizedAlternates(path) },
      });
    }
  }

  return entries;
}
