import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Homepage',
  },
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
}
