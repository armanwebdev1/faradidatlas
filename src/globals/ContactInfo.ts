import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  versions: {
    drafts: true,
  },
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
              label: { en: 'Email', fa: 'ایمیل' },
              required: true,
            },
            {
              name: 'phones',
              type: 'array',
              label: { en: 'Phones', fa: 'تلفن‌ها' },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: { en: 'Number', fa: 'شماره' },
                  required: true,
                },
                {
                  name: 'display',
                  type: 'text',
                  label: { en: 'Display Name', fa: 'نام نمایشی' },
                  required: true,
                },
                {
                  name: 'whatsappHref',
                  type: 'text',
                  label: { en: 'WhatsApp Link', fa: 'لینک واتساپ' },
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
              label: { en: 'Offices', fa: 'دفاتر' },
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  label: { en: 'City', fa: 'شهر' },
                  required: true,
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: { en: 'Address', fa: 'آدرس' },
                  localized: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: { en: 'Phone', fa: 'تلفن' },
                },
                {
                  name: 'email',
                  type: 'email',
                  label: { en: 'Email', fa: 'ایمیل' },
                },
                {
                  name: 'googleMapsEmbed',
                  type: 'text',
                  label: { en: 'Google Maps Embed', fa: 'کد نقشه گوگل' },
                  admin: {
                    description: { en: 'Google Maps embed URL for this office', fa: 'آدرس کد جاسازی نقشه گوگل برای این دفتر' },
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
              label: { en: 'Hero', fa: 'هیرو' },
              localized: true,
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: { en: 'Eyebrow', fa: 'تیتر بالا' },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                },
                {
                  name: 'badges',
                  type: 'array',
                  label: { en: 'Badges', fa: 'نشان‌ها' },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      label: { en: 'Text', fa: 'متن' },
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              label: { en: 'CTA', fa: 'دعوت به اقدام' },
              localized: true,
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: { en: 'Headline', fa: 'تیتر' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  label: { en: 'Button Text', fa: 'متن دکمه' },
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  label: { en: 'Button URL', fa: 'آدرس دکمه' },
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
              label: { en: 'Response SLA', fa: 'زمان پاسخگویی' },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'steps',
                  type: 'array',
                  label: { en: 'Steps', fa: 'مراحل' },
                  localized: true,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: { en: 'Title', fa: 'عنوان' },
                      required: true,
                    },
                    {
                      name: 'timeline',
                      type: 'text',
                      label: { en: 'Timeline', fa: 'زمان‌بندی' },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: { en: 'Description', fa: 'توضیحات' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'trustStats',
              type: 'array',
              label: { en: 'Trust Stats', fa: 'آمار اعتماد' },
              admin: {
                description: { en: 'Trust statistics displayed on the contact page', fa: 'آمار اعتماد نمایشی در صفحه تماس' },
              },
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  label: { en: 'Value', fa: 'مقدار' },
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                  label: { en: 'Suffix', fa: 'پسوند' },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: { en: 'Label', fa: 'برچسب' },
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
