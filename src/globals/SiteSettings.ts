import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { en: 'Site Settings', fa: 'تنظیمات سایت' },
  access: {
    read: () => true,
    update: isRole('super-admin'),
  },
  admin: {
    group: { en: 'Settings', fa: 'تنظیمات' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Branding', fa: 'برندینگ' },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
            },
            {
              name: 'siteNameFa',
              type: 'text',
              required: true,
            },
            {
              name: 'siteNameAr',
              type: 'text',
              required: true,
            },
            {
              name: 'legalName',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Browser favicon (recommended: 32x32 PNG or ICO)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'descriptionFa',
              type: 'textarea',
              required: true,
            },
            {
              name: 'descriptionAr',
              type: 'textarea',
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { en: 'SEO', fa: 'SEO' },
          fields: [
            {
              name: 'defaultSEO',
              type: 'group',
              admin: {
                description: 'Default SEO settings for all pages',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Default page title suffix',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    description: 'Default meta description',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Default Open Graph image (recommended: 1200x630)',
                  },
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  admin: {
                    description: 'Default canonical URL',
                  },
                },
                {
                  name: 'robots',
                  type: 'text',
                  defaultValue: 'index, follow',
                  admin: {
                    description: 'Default robots directive',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Default meta keywords (comma-separated)',
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
