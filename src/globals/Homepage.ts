import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  versions: {
    drafts: true,
  },
  label: { en: 'Homepage', fa: 'صفحه اصلی' },
  access: {
    read: () => true,
    update: isRole('super-admin', 'company-admin'),
  },
  admin: {
    group: { en: 'Website', fa: 'وبسایت' },
    preview: (_doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'
      const lang = typeof locale === 'string' ? locale : (locale as any)?.code || 'en'
      return `${base}/api/preview?secret=${process.env.PREVIEW_SECRET}&slug=/${lang}&global=homepage&locale=${lang}`
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
              label: { en: 'Hero Slides', fa: 'اسلایدهای هیرو' },
              maxRows: 5,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', fa: 'تصویر' },
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: { en: 'Subtitle', fa: 'زیرعنوان' },
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
                {
                  name: 'ctaText',
                  type: 'text',
                  label: { en: 'CTA Text', fa: 'متن دکمه' },
                  localized: true,
                  admin: {
                    description: { en: 'CTA button text (optional)', fa: 'متن دکمه CTA (اختیاری)' },
                  },
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  label: { en: 'CTA URL', fa: 'آدرس دکمه' },
                  admin: {
                    description: { en: 'CTA button URL (optional)', fa: 'آدرس دکمه CTA (اختیاری)' },
                  },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: { en: 'Active', fa: 'فعال' },
                  defaultValue: true,
                  admin: {
                    description: { en: 'Show/hide this slide', fa: 'نمایش/مخفی‌کردن این اسلاید' },
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
              name: 'valuePropsSection',
              type: 'group',
              label: { en: 'Value Props Section', fa: 'بخش مزایا' },
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
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
              ],
            },
            {
              name: 'valueProps',
              type: 'array',
              label: { en: 'Value Propositions', fa: 'پیشنهادات ارزش' },
              maxRows: 4,
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: { en: 'Icon', fa: 'آیکون' },
                  required: true,
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
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: { en: 'Active', fa: 'فعال' },
                  defaultValue: true,
                  admin: {
                    description: { en: 'Show/hide this item', fa: 'نمایش/مخفی‌کردن این مورد' },
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Brand Showcase', fa: 'نمایش برندها' },
          fields: [
            {
              name: 'brandsSection',
              type: 'group',
              label: { en: 'Brands Section', fa: 'بخش برندها' },
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
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'bannerImage',
                  type: 'upload',
                  label: { en: 'Banner Image', fa: 'تصویر بنر' },
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'brandShowcase',
              type: 'array',
              label: { en: 'Brand Showcase', fa: 'نمایش برندها' },
              fields: [
                {
                  name: 'brandName',
                  type: 'text',
                  label: { en: 'Brand Name', fa: 'نام برند' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'logo',
                  type: 'upload',
                  label: { en: 'Logo', fa: 'لوگو' },
                  relationTo: 'media',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: { en: 'Active', fa: 'فعال' },
                  defaultValue: true,
                  admin: {
                    description: { en: 'Show/hide this brand', fa: 'نمایش/مخفی‌کردن این برند' },
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Signature Products', fa: 'محصولات ویژه' },
          fields: [
            {
              name: 'signatureProductsSection',
              type: 'group',
              label: { en: 'Section Settings', fa: 'تنظیمات بخش' },
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
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: { en: 'CTA Button Text', fa: 'متن دکمه' },
                  localized: true,
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  label: { en: 'CTA Button URL', fa: 'آدرس دکمه' },
                },
              ],
            },
            {
              name: 'signatureProducts',
              type: 'array',
              label: { en: 'Carousel Slides', fa: 'اسلایدهای کروسل' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Slide Image', fa: 'تصویر اسلاید' },
                  relationTo: 'media',
                  admin: {
                    description: { en: 'Wide image shown as the slide background', fa: 'تصویر پس‌زمینه اسلاید' },
                  },
                },
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
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: { en: 'Active', fa: 'فعال' },
                  defaultValue: true,
                  admin: {
                    description: { en: 'Show/hide this slide', fa: 'نمایش/مخفی‌کردن این اسلاید' },
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Markets', fa: 'بازارها' },
          fields: [
            {
              name: 'marketsSection',
              type: 'group',
              label: { en: 'Markets Section', fa: 'بخش بازارها' },
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
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                },
              ],
            },
            {
              name: 'globalMarkets',
              type: 'array',
              label: { en: 'Global Markets', fa: 'بازارهای جهانی' },
              fields: [
                {
                  name: 'country',
                  type: 'text',
                  label: { en: 'Country', fa: 'کشور' },
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
                  name: 'value',
                  type: 'number',
                  label: { en: 'Value', fa: 'مقدار' },
                  admin: {
                    description: { en: 'Number to display in the stat card', fa: 'عدد نمایشی در کارت آمار' },
                  },
                },
                {
                  name: 'isActive',
                  type: 'checkbox',
                  label: { en: 'Active', fa: 'فعال' },
                  defaultValue: true,
                  admin: {
                    description: { en: 'Show/hide this stat', fa: 'نمایش/مخفی‌کردن این آمار' },
                    position: 'sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'CTA', fa: 'دعوت به اقدام' },
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: { en: 'CTA', fa: 'دعوت به اقدام' },
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: { en: 'Headline', fa: 'تیتر' },
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
                  name: 'buttonText',
                  type: 'text',
                  label: { en: 'Button Text', fa: 'متن دکمه' },
                  required: true,
                  localized: true,
                },
                {
                  name: 'buttonUrl',
                  type: 'text',
                  label: { en: 'Button URL', fa: 'آدرس دکمه' },
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', fa: 'تصویر' },
                  relationTo: 'media',
                  admin: {
                    description: { en: 'CTA section image', fa: 'تصویر بخش دعوت به اقدام' },
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
