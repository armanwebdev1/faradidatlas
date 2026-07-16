import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: { en: 'Company Info', fa: 'اطلاعات شرکت' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Company', fa: 'شرکت' },
    description: { en: 'Company information for the About page: CEO profile, values, strategic framework, offerings, and get-connected section', fa: 'اطلاعات شرکت برای صفحه درباره ما: پروفایل مدیرعامل، ارزش‌ها، چارچوب استراتژیک، خدمات و بخش ارتباط' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'About', fa: 'درباره ما' },
          fields: [
            {
              name: 'aboutStats',
              type: 'array',
              admin: {
                description: 'Stats displayed in the About hero section',
              },
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                },
                {
                  name: 'labelEn',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'labelFa',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'labelAr',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { en: 'CEO', fa: 'مدیرعامل' },
          fields: [
            {
              name: 'ceo',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'name',
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
                  name: 'bio',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Values', fa: 'ارزش‌ها' },
          fields: [
            {
              name: 'values',
              type: 'array',
              localized: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Strategic Framework', fa: 'چارچوب استراتژیک' },
          fields: [
            {
              name: 'strategicFramework',
              type: 'group',
              admin: {
                description: 'Vision, Mission, Values section on the About page',
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'vision',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      localized: true,
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'mission',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      localized: true,
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'valuesSection',
                  type: 'group',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Offerings & Content', fa: 'خدمات و محتوا' },
          fields: [
            {
              name: 'offerings',
              type: 'array',
              admin: {
                description: 'What We Offer section on the About page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
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
              ],
            },
            {
              name: 'getConnected',
              type: 'group',
              admin: {
                description: 'Get Connected section on the About page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'alt',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'paragraph1',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'paragraph2',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
