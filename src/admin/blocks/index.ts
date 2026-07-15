import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Tip', value: 'tip' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}

export const CTAButtonBlock: Block = {
  slug: 'cta-button',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const EmbedBlock: Block = {
  slug: 'embed',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Custom iframe', value: 'iframe' },
      ],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Video URL or embed URL',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}

export const ImageGalleryBlock: Block = {
  slug: 'image-gallery',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 2,
      max: 4,
      admin: {
        description: 'Number of columns (grid only)',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}

export const AccordionBlock: Block = {
  slug: 'accordion',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'isOpen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Start expanded',
          },
        },
      ],
    },
  ],
}

export const FeatureTableBlock: Block = {
  slug: 'feature-table',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'headers',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 30,
      fields: [
        {
          name: 'cells',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}

export const richTextBlocks: Block[] = [
  CalloutBlock,
  CTAButtonBlock,
  EmbedBlock,
  ImageGalleryBlock,
  AccordionBlock,
  FeatureTableBlock,
]
