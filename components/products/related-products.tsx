import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import type { Product } from "./product-data";
import { ProductCard } from "./product-card";

interface RelatedProductsProps {
  lang: Language;
  t: (typeof translations)[Language];
  currentProduct: Product;
  allProducts: Product[];
  maxItems?: number;
}

export function RelatedProducts({
  lang,
  t,
  currentProduct,
  allProducts,
  maxItems = 3,
}: RelatedProductsProps) {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id && p.category === currentProduct.category,
    )
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 sm:mb-8">
        {t.pages.products.relatedProducts}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
