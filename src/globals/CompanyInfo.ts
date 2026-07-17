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
              label: { en: 'About Stats', fa: 'آمار درباره ما' },
              admin: {
                description: { en: 'Stats displayed in the About hero section', fa: 'آمار نمایشی در بخش هیروی درباره ما' },
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
                  name: 'labelEn',
                  type: 'text',
                  label: { en: 'Label (English)', fa: 'برچسب (انگلیسی)' },
                  required: true,
                },
                {
                  name: 'labelFa',
                  type: 'text',
                  label: { en: 'Label (Persian)', fa: 'برچسب (فارسی)' },
                  required: true,
                },
                {
                  name: 'labelAr',
                  type: 'text',
                  label: { en: 'Label (Arabic)', fa: 'برچسب (عربی)' },
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
              label: { en: 'CEO', fa: 'مدیرعامل' },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: { en: 'Eyebrow', fa: 'تیتر بالا' },
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: { en: 'Heading', fa: 'عنوان اصلی' },
                  localized: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  label: { en: 'Company Name', fa: 'نام شرکت' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'سمت' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  label: { en: 'Bio', fa: 'بیوگرافی' },
                  localized: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', fa: 'تصویر' },
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
              label: { en: 'Values', fa: 'ارزش‌ها' },
              localized: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
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
              label: { en: 'Strategic Framework', fa: 'چارچوب استراتژیک' },
              admin: {
                description: { en: 'Vision, Mission, Values section on the About page', fa: 'بخش چشم‌انداز، مأموریت و ارزش‌ها در صفحه درباره ما' },
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: { en: 'Eyebrow', fa: 'تیتر بالا' },
                  localized: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  localized: true,
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: { en: 'Introduction', fa: 'مقدمه' },
                  localized: true,
                },
                {
                  name: 'vision',
                  type: 'group',
                  label: { en: 'Vision', fa: 'چشم‌انداز' },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: { en: 'Label', fa: 'برچسب' },
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: { en: 'Title', fa: 'عنوان' },
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      label: { en: 'Body', fa: 'متن اصلی' },
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      label: { en: 'Notes', fa: 'یادداشت‌ها' },
                      localized: true,
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
                  name: 'mission',
                  type: 'group',
                  label: { en: 'Mission', fa: 'مأموریت' },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: { en: 'Label', fa: 'برچسب' },
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: { en: 'Title', fa: 'عنوان' },
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      label: { en: 'Body', fa: 'متن اصلی' },
                      localized: true,
                    },
                    {
                      name: 'notes',
                      type: 'array',
                      label: { en: 'Notes', fa: 'یادداشت‌ها' },
                      localized: true,
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
                  name: 'valuesSection',
                  type: 'group',
                  label: { en: 'Values', fa: 'ارزش‌ها' },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: { en: 'Label', fa: 'برچسب' },
                      localized: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: { en: 'Title', fa: 'عنوان' },
                      localized: true,
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                      label: { en: 'Body', fa: 'متن اصلی' },
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
              label: { en: 'Offerings', fa: 'خدمات' },
              admin: {
                description: { en: 'What We Offer section on the About page', fa: 'بخش خدمات ما در صفحه درباره ما' },
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', fa: 'تصویر' },
                  relationTo: 'media',
                },
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
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: 'getConnected',
              type: 'group',
              label: { en: 'Get Connected', fa: 'ارتباط با ما' },
              admin: {
                description: { en: 'Get Connected section on the About page', fa: 'بخش ارتباط با ما در صفحه درباره ما' },
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', fa: 'تصویر' },
                  relationTo: 'media',
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: { en: 'Alt Text', fa: 'متن جایگزین' },
                  localized: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: { en: 'Heading', fa: 'عنوان' },
                  localized: true,
                },
                {
                  name: 'paragraph1',
                  type: 'textarea',
                  label: { en: 'Paragraph 1', fa: 'پاراگراف اول' },
                  localized: true,
                },
                {
                  name: 'paragraph2',
                  type: 'textarea',
                  label: { en: 'Paragraph 2', fa: 'پاراگراف دوم' },
                  localized: true,
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  label: { en: 'Quote', fa: 'نقل‌قول' },
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
