import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
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
    {
      name: 'analytics',
      type: 'group',
      admin: {
        description: 'Analytics and tracking IDs',
      },
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            description: 'Google Analytics measurement ID (e.g. G-XXXXXXXXXX)',
          },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          admin: {
            description: 'Google Tag Manager container ID (e.g. GTM-XXXXXXX)',
          },
        },
        {
          name: 'hotjarId',
          type: 'text',
          admin: {
            description: 'Hotjar site ID',
          },
        },
      ],
    },
    {
      name: 'cookieBanner',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Cookie consent banner text',
          },
        },
        {
          name: 'acceptText',
          type: 'text',
          localized: true,
          defaultValue: 'Accept',
        },
        {
          name: 'declineText',
          type: 'text',
          localized: true,
          defaultValue: 'Decline',
        },
      ],
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          localized: true,
          admin: {
            description: 'Announcement bar text',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link URL',
          },
        },
      ],
    },
  ],
}
