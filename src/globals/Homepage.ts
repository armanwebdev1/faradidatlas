import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: { en: 'Homepage', fa: 'صفحه اصلی' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Website', fa: 'وبسایت' },
    livePreview: {
      url: ({ locale }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
        const lang = locale || 'en'
        return `${base}/${lang}`
      },
    },
    preview: (_doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
      const lang = locale || 'en'
      return `${base}/${lang}`
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Hero', fa: 'هیرو' },
          fields: [
            {
              name: 'heroSlides',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'CTA button text (optional)',
                  },
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  admin: {
                    description: 'CTA button URL (optional)',
                  },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this slide',
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Value Props', fa: 'مزایا' },
          fields: [
            {
              name: 'valueProps',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this item',
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Brands & Products', fa: 'برندها و محصولات' },
          fields: [
            {
              name: 'brandShowcase',
              type: 'array',
              fields: [
                {
                  name: 'brandName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this brand',
                    position: 'sidebar',
                  },
                },
              ],
            },
            {
              name: 'signatureProducts',
              type: 'array',
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  required: true,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this product',
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Markets & CTA', fa: 'بازارها و CTA' },
          fields: [
            {
              name: 'globalMarkets',
              type: 'array',
              fields: [
                {
                  name: 'country',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'value',
                  type: 'number',
                  admin: {
                    description: 'Number to display in the stat card',
                  },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this stat',
                    position: 'sidebar',
                  },
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'CTA section image',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
