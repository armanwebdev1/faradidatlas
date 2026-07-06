import type { CollectionConfig } from 'payload'

export const ProductBrands: CollectionConfig = {
  slug: 'product-brands',
  admin: {
    useAsTitle: 'name',
    group: 'Products',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
