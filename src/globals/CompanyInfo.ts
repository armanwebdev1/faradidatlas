import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  versions: {
    drafts: true,
  },
  label: { en: 'About Us', fa: 'درباره ما' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Website', fa: 'وبسایت' },
    description: { en: 'Company information for the About page: hero stats, company presence, strategic framework, CEO profile, offerings, core values, and join team section', fa: 'اطلاعات شرکت برای صفحه درباره ما: آمار هیرو، حضور شرکت، چارچوب استراتژیک، پروفایل مدیرعامل، خدمات، ارزش‌های اصلی و بخش پیوستن به تیم' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Hero', fa: 'هیرو' },
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: { en: 'Hero', fa: 'هیرو' },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: { en: 'Eyebrow', fa: 'تیتر بالا' },
                  localized: true,
                },
                {
                  name: 'headline',
                  type: 'textarea',
                  label: { en: 'Headline', fa: 'عنوان اصلی' },
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
              ],
            },
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
          label: { en: 'Company Presence', fa: 'حضور شرکت' },
          fields: [
            {
              name: 'getConnected',
              type: 'group',
              label: { en: 'Company Presence', fa: 'حضور شرکت' },
              admin: {
                description: { en: 'Company presence section on the About page', fa: 'بخش حضور شرکت در صفحه درباره ما' },
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
                  label: { en: 'CEO Name', fa: 'نام مدیرعامل' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'CEO Role', fa: 'سمت مدیرعامل' },
                  defaultValue: 'CEO',
                  localized: true,
                  admin: { hidden: true },
                },
                {
                  name: 'connectorWord',
                  type: 'text',
                  label: { en: 'Connector Word', fa: 'کلمه ربط' },
                  defaultValue: 'of',
                  localized: true,
                  admin: { hidden: true },
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
          label: { en: 'Offerings', fa: 'خدمات' },
          fields: [
            {
              name: 'offeringsSection',
              type: 'group',
              label: { en: 'Offerings Section', fa: 'بخش خدمات' },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
              ],
            },
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
          ],
        },
        {
          label: { en: 'Core Values', fa: 'ارزش‌های اصلی' },
          fields: [
            {
              name: 'valuesSection',
              type: 'group',
              label: { en: 'Values Section', fa: 'بخش ارزش‌ها' },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: { en: 'Subtitle', fa: 'زیرعنوان' },
                  localized: true,
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: { en: 'Intro', fa: 'مقدمه' },
                  localized: true,
                },
              ],
            },
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
          label: { en: 'Join Team', fa: 'پیوستن به تیم' },
          fields: [
            {
              name: 'joinTeam',
              type: 'group',
              label: { en: 'Join Team', fa: 'پیوستن به تیم' },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: { en: 'CTA Text', fa: 'متن دکمه' },
                  localized: true,
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  label: { en: 'CTA URL', fa: 'آدرس دکمه' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
