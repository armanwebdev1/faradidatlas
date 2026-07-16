import type { CollectionConfig } from 'payload'
import { isRole } from '../access/isRole'

export const ProductBrands: CollectionConfig = {
  slug: 'product-brands',
  labels: {
    singular: { en: 'Product Brand', fa: 'برند محصول' },
    plural: { en: 'Product Brands', fa: 'برندهای محصول' },
  },
  access: {
    read: () => true,
    create: isRole('super-admin', 'company-admin'),
    update: isRole('super-admin', 'company-admin', 'editor'),
    delete: isRole('super-admin', 'company-admin'),
  },
  admin: {
    useAsTitle: 'name',
    group: { en: 'Catalog', fa: 'کاتالوگ' },
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
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
