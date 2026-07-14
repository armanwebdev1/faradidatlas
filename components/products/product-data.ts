// Re-export all from split modules for backward compatibility
export type {
  ProductCategory,
  ProductSpec,
  Product,
  ProductBrand,
  ProductType,
} from "./product-types";

export {
  productCategories,
  productBrands,
  productTypes,
  getProductBrand,
  getProductType,
} from "./product-types";

export {
  productBrandLabels,
  productTypeLabels,
  categoryLabels,
} from "./product-labels";

export { categoryDescriptions } from "./product-descriptions";
