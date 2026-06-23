import type { MetadataRoute } from "next";
import { jobs } from "@/components/careers/job-data";
import { products } from "@/components/products/product-data";
import { absoluteUrl, localizedPath, supportedLanguages } from "@/lib/site";

const staticPaths = ["", "about", "products", "contact", "faq", "careers"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of supportedLanguages) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(localizedPath(lang, path)),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url: absoluteUrl(localizedPath(lang, `products/${product.slug}`)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const job of jobs) {
      entries.push({
        url: absoluteUrl(localizedPath(lang, `careers/${job.id}`)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
