import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: { en: 'Contact Info', fa: 'اطلاعات تماس' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Company', fa: 'شرکت' },
    description: { en: 'Contact information: email, phone numbers, office addresses, response SLA, and trust statistics', fa: 'اطلاعات تماس: ایمیل، شماره تلفن‌ها، آدرس دفاتر، زمان پاسخگویی و آمار اعتماد' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Contact Details', fa: 'اطلاعات تماس' },
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'phones',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'display',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'whatsappHref',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Offices', fa: 'دفاتر' },
          fields: [
            {
              name: 'offices',
              type: 'array',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'address',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'email',
                  type: 'email',
                },
                {
                  name: 'googleMapsEmbed',
                  type: 'text',
                  admin: {
                    description: 'Google Maps embed URL for this office',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Page Content', fa: 'محتوای صفحه' },
          fields: [
            {
              name: 'hero',
              type: 'group',
              localized: true,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'badges',
                  type: 'array',
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
              name: 'cta',
              type: 'group',
              localized: true,
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Response & Trust', fa: 'پاسخگویی و اعتماد' },
          fields: [
            {
              name: 'responseSLA',
              type: 'group',
              fields: [
                {
                  name: 'title',
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
                  name: 'steps',
                  type: 'array',
                  localized: true,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'timeline',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
            {
              name: 'trustStats',
              type: 'array',
              admin: {
                description: 'Trust statistics displayed on the contact page',
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
                  name: 'label',
                  type: 'text',
                  required: true,
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
