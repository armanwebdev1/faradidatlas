import type { GlobalConfig } from 'payload'
import { isRole } from '../access/isRole'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  versions: {
    drafts: true,
  },
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
              label: { en: 'Site Name', fa: 'نام سایت' },
              required: true,
            },
            {
              name: 'siteNameFa',
              type: 'text',
              label: { en: 'Site Name (Persian)', fa: 'نام سایت (فارسی)' },
              required: true,
            },
            {
              name: 'siteNameAr',
              type: 'text',
              label: { en: 'Site Name (Arabic)', fa: 'نام سایت (عربی)' },
              required: true,
            },
            {
              name: 'legalName',
              type: 'text',
              label: { en: 'Legal Name', fa: 'نام حقوقی' },
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              label: { en: 'Logo', fa: 'لوگو' },
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              label: { en: 'Favicon', fa: 'آیکون سایت' },
              relationTo: 'media',
              admin: {
                description: { en: 'Browser favicon (recommended: 32x32 PNG or ICO)', fa: 'آیکون مرورگر (توصیه شده: 32x32 PNG یا ICO)' },
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: { en: 'Description', fa: 'توضیحات' },
              required: true,
            },
            {
              name: 'descriptionFa',
              type: 'textarea',
              label: { en: 'Description (Persian)', fa: 'توضیحات (فارسی)' },
              required: true,
            },
            {
              name: 'descriptionAr',
              type: 'textarea',
              label: { en: 'Description (Arabic)', fa: 'توضیحات (عربی)' },
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: { en: 'Social Links', fa: 'لینک‌های اجتماعی' },
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  label: { en: 'Platform', fa: 'پلتفرم' },
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: { en: 'URL', fa: 'آدرس' },
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
              label: { en: 'Default SEO', fa: 'سئوی پیش‌فرض' },
              admin: {
                description: { en: 'Default SEO settings for all pages', fa: 'تنظیمات سئوی پیش‌فرض برای همه صفحات' },
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: { en: 'Title', fa: 'عنوان' },
                  localized: true,
                  admin: {
                    description: { en: 'Default page title suffix', fa: 'پسوند عنوان پیش‌فرض صفحه' },
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: { en: 'Description', fa: 'توضیحات' },
                  localized: true,
                  admin: {
                    description: { en: 'Default meta description', fa: 'توضیحات متای پیش‌فرض' },
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  label: { en: 'OG Image', fa: 'تصویر OG' },
                  relationTo: 'media',
                  admin: {
                    description: { en: 'Default Open Graph image (recommended: 1200x630)', fa: 'تصویر پیش‌فرض Open Graph (توصیه شده: 1200x630)' },
                  },
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  label: { en: 'Canonical URL', fa: 'آدرس کنونیکال' },
                  admin: {
                    description: { en: 'Default canonical URL', fa: 'آدرس کنونیکال پیش‌فرض' },
                  },
                },
                {
                  name: 'robots',
                  type: 'text',
                  label: { en: 'Robots', fa: 'ربات‌ها' },
                  defaultValue: 'index, follow',
                  admin: {
                    description: { en: 'Default robots directive', fa: 'دستورالعمل پیش‌فرض ربات‌ها' },
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  label: { en: 'Keywords', fa: 'کلمات کلیدی' },
                  localized: true,
                  admin: {
                    description: { en: 'Default meta keywords (comma-separated)', fa: 'کلمات کلیدی متای پیش‌فرض (با کاما جدا شده)' },
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
