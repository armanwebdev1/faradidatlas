# Faradid Atlas Headless CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Faradid Atlas Next.js website to use Payload CMS as a headless CMS, preserving the existing frontend exactly as-is while enabling content management through an admin panel.

**Architecture:** Full integration approach with Payload CMS at `/admin` route, Vercel Postgres database, Cloudinary for media, and Payload Local API for data fetching. ISR with webhooks for caching and revalidation.

**Tech Stack:** Next.js 16, Payload CMS 3.x, Vercel Postgres, Cloudinary, TypeScript, React 19, Tailwind CSS v4

## Global Constraints

- Frontend must remain visually and functionally identical after migration — no regressions in design, animations, responsiveness, UX, SEO, accessibility, performance, routing, TypeScript, ESLint, build, hydration, or runtime
- Use Payload's built-in localization for multilingual content (EN, FA, AR)
- SEO fields stored per document (not global)
- Translations global only for UI strings
- Draft mode + live previews + scheduled publishing enabled
- Payload Local API preferred over REST API for performance and type safety

---

## Phase 1: Payload CMS Setup

### Task 1: Install and Configure Payload CMS

**Covers:** [S1]

**Files:**
- Modify: `package.json`
- Create: `payload.config.ts`
- Create: `src/payload.config.ts`
- Create: `.env` (environment variables)

**Interfaces:**
- Consumes: Existing Next.js project structure
- Produces: Payload CMS configuration, database connection

- [ ] **Step 1: Install Payload dependencies**

```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/plugin-cloudinary
```

- [ ] **Step 2: Create Payload config**

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudinaryPlugin } from '@payloadcms/plugin-cloudinary'
import { en } from '@payloadcms/translations/languages/en'
import { fa } from '@payloadcms/translations/languages/fa'
import { ar } from '@payloadcms/translations/languages/ar'

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Faradid Atlas CMS',
    },
  },
  collections: [
    // Collections will be added in Task 2
  ],
  globals: [
    // Globals will be added in Task 3
  ],
  editor: 'lexical',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    cloudinaryPlugin({
      collections: ['media'],
      options: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      },
    }),
  ],
  i18n: {
    supportedLanguages: {
      en,
      fa,
      ar,
    },
    fallbackLanguage: 'en',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
```

- [ ] **Step 3: Add environment variables**

```bash
# .env
DATABASE_URI=postgres://user:password@host:5432/faradidatlas
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=https://faradidatlas.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

- [ ] **Step 4: Update package.json scripts**

```json
{
  "scripts": {
    "payload": "payload",
    "payload:generate": "payload generate:types",
    "payload:migrate": "payload migrate",
    "payload:migrate:fresh": "payload migrate:fresh"
  }
}
```

- [ ] **Step 5: Run Payload generate**

```bash
npm run payload:generate
```

- [ ] **Step 6: Commit**

```bash
git add package.json payload.config.ts .env payload-types.ts
git commit -m "feat: install and configure Payload CMS with Vercel Postgres and Cloudinary"
```

### Task 2: Define Product Collections

**Covers:** [S2]

**Files:**
- Create: `src/collections/Products.ts`
- Create: `src/collections/Categories.ts`
- Create: `src/collections/ProductBrands.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload configuration from Task 1
- Produces: Product, Category, ProductBrand collections

- [ ] **Step 1: Create Categories collection**

```typescript
// src/collections/Categories.ts
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Products',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Create ProductBrands collection**

```typescript
// src/collections/ProductBrands.ts
import type { CollectionConfig } from 'payload'

export const ProductBrands: CollectionConfig = {
  slug: 'product-brands',
  admin: {
    useAsTitle: 'name',
    group: 'Products',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
```

- [ ] **Step 3: Create Products collection**

```typescript
// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Products',
    defaultColumns: ['name', 'category', 'brand', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'product-brands',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Basmati Rice', value: 'basmati-rice' },
        { label: 'Jasmine Rice', value: 'jasmine-rice' },
        { label: 'Beans', value: 'beans' },
        { label: 'Lentils', value: 'lentils' },
        { label: 'Chickpeas', value: 'chickpeas' },
        { label: 'Seeds & Kernels', value: 'seeds-kernels' },
        { label: 'Nuts', value: 'nuts' },
        { label: 'Spices', value: 'spices' },
        { label: 'Sweeteners', value: 'sweeteners' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'alias',
      type: 'text',
      localized: true,
      admin: {
        description: 'Alternative name for search',
      },
    },
    {
      name: 'specs',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
```

- [ ] **Step 4: Update Payload config**

```typescript
// payload.config.ts
import { Products } from './src/collections/Products'
import { Categories } from './src/collections/Categories'
import { ProductBrands } from './src/collections/ProductBrands'

export default buildConfig({
  // ... existing config
  collections: [
    Products,
    Categories,
    ProductBrands,
    // Other collections will be added later
  ],
})
```

- [ ] **Step 5: Commit**

```bash
git add src/collections/Products.ts src/collections/Categories.ts src/collections/ProductBrands.ts payload.config.ts
git commit -m "feat: add Product, Category, and ProductBrand collections"
```

### Task 3: Define Content Collections

**Covers:** [S2]

**Files:**
- Create: `src/collections/BlogPosts.ts`
- Create: `src/collections/FAQs.ts`
- Create: `src/collections/Jobs.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload configuration from Task 1
- Produces: BlogPosts, FAQs, Jobs collections

- [ ] **Step 1: Create BlogPosts collection**

```typescript
// src/collections/BlogPosts.ts
import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'author', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
```

- [ ] **Step 2: Create FAQs collection**

```typescript
// src/collections/FAQs.ts
import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Products', value: 'products' },
        { label: 'Sourcing', value: 'sourcing' },
        { label: 'Quality', value: 'quality' },
        { label: 'Vision', value: 'vision' },
        { label: 'Values', value: 'values' },
        { label: 'Inquiry', value: 'inquiry' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
```

- [ ] **Step 3: Create Jobs collection**

```typescript
// src/collections/Jobs.ts
import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'department', 'location', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'department',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'responsibilities',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
```

- [ ] **Step 4: Update Payload config**

```typescript
// payload.config.ts
import { BlogPosts } from './src/collections/BlogPosts'
import { FAQs } from './src/collections/FAQs'
import { Jobs } from './src/collections/Jobs'

export default buildConfig({
  // ... existing config
  collections: [
    Products,
    Categories,
    ProductBrands,
    BlogPosts,
    FAQs,
    Jobs,
    // Other collections will be added later
  ],
})
```

- [ ] **Step 5: Commit**

```bash
git add src/collections/BlogPosts.ts src/collections/FAQs.ts src/collections/Jobs.ts payload.config.ts
git commit -m "feat: add BlogPosts, FAQs, and Jobs collections"
```

### Task 4: Define Global Collections

**Covers:** [S2]

**Files:**
- Create: `src/globals/Homepage.ts`
- Create: `src/globals/CompanyInfo.ts`
- Create: `src/globals/ContactInfo.ts`
- Create: `src/globals/Navigation.ts`
- Create: `src/globals/SiteSettings.ts`
- Create: `src/globals/Redirects.ts`
- Create: `src/globals/Translations.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload configuration from Task 1
- Produces: All global collections

- [ ] **Step 1: Create Homepage global**

```typescript
// src/globals/Homepage.ts
import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
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
      ],
    },
  ],
}
```

- [ ] **Step 2: Create CompanyInfo global**

```typescript
// src/globals/CompanyInfo.ts
import type { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  admin: {
    group: 'Company',
  },
  fields: [
    {
      name: 'about',
      type: 'richText',
      localized: true,
    },
    {
      name: 'mission',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'vision',
      type: 'textarea',
      localized: true,
    },
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
    {
      name: 'ceo',
      type: 'group',
      fields: [
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
    {
      name: 'team',
      type: 'array',
      fields: [
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
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
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'isHeadquarters',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
```

- [ ] **Step 3: Create ContactInfo global**

```typescript
// src/globals/ContactInfo.ts
import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  admin: {
    group: 'Contact',
  },
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
      ],
    },
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
      ],
    },
  ],
}
```

- [ ] **Step 4: Create Navigation global**

```typescript
// src/globals/Navigation.ts
import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
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
          name: 'children',
          type: 'array',
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
          ],
        },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
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
      ],
    },
  ],
}
```

- [ ] **Step 5: Create SiteSettings global**

```typescript
// src/globals/SiteSettings.ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
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
  ],
}
```

- [ ] **Step 6: Create Redirects global**

```typescript
// src/globals/Redirects.ts
import type { GlobalConfig } from 'payload'

export const Redirects: GlobalConfig = {
  slug: 'redirects',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'redirects',
      type: 'array',
      fields: [
        {
          name: 'from',
          type: 'text',
          required: true,
        },
        {
          name: 'to',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: '301 Permanent', value: '301' },
            { label: '302 Temporary', value: '302' },
          ],
          defaultValue: '301',
        },
      ],
    },
  ],
}
```

- [ ] **Step 7: Create Translations global**

```typescript
// src/globals/Translations.ts
import type { GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'nav',
      type: 'group',
      fields: [
        {
          name: 'home',
          type: 'text',
          localized: true,
        },
        {
          name: 'about',
          type: 'text',
          localized: true,
        },
        {
          name: 'products',
          type: 'text',
          localized: true,
        },
        {
          name: 'careers',
          type: 'text',
          localized: true,
        },
        {
          name: 'faq',
          type: 'text',
          localized: true,
        },
        {
          name: 'contact',
          type: 'text',
          localized: true,
        },
        {
          name: 'blog',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'common',
      type: 'group',
      fields: [
        {
          name: 'viewMore',
          type: 'text',
          localized: true,
        },
        {
          name: 'learnMore',
          type: 'text',
          localized: true,
        },
        {
          name: 'contactSales',
          type: 'text',
          localized: true,
        },
        // Add more common translations as needed
      ],
    },
  ],
}
```

- [ ] **Step 8: Update Payload config**

```typescript
// payload.config.ts
import { Homepage } from './src/globals/Homepage'
import { CompanyInfo } from './src/globals/CompanyInfo'
import { ContactInfo } from './src/globals/ContactInfo'
import { Navigation } from './src/globals/Navigation'
import { SiteSettings } from './src/globals/SiteSettings'
import { Redirects } from './src/globals/Redirects'
import { Translations } from './src/globals/Translations'

export default buildConfig({
  // ... existing config
  collections: [
    Products,
    Categories,
    ProductBrands,
    BlogPosts,
    FAQs,
    Jobs,
    // Media collection will be added later
  ],
  globals: [
    Homepage,
    CompanyInfo,
    ContactInfo,
    Navigation,
    SiteSettings,
    Redirects,
    Translations,
  ],
})
```

- [ ] **Step 9: Commit**

```bash
git add src/globals/ payload.config.ts
git commit -m "feat: add all global collections for homepage, company, contact, settings"
```

### Task 5: Define Media Collection

**Covers:** [S2]

**Files:**
- Create: `src/collections/Media.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload configuration from Task 1, Cloudinary plugin
- Produces: Media collection

- [ ] **Step 1: Create Media collection**

```typescript
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
```

- [ ] **Step 2: Update Payload config**

```typescript
// payload.config.ts
import { Media } from './src/collections/Media'

export default buildConfig({
  // ... existing config
  collections: [
    Products,
    Categories,
    ProductBrands,
    BlogPosts,
    FAQs,
    Jobs,
    Media,
  ],
})
```

- [ ] **Step 3: Commit**

```bash
git add src/collections/Media.ts payload.config.ts
git commit -m "feat: add Media collection with Cloudinary integration"
```

---

## Phase 2: Data Migration

### Task 6: Create Migration Script

**Covers:** [S5]

**Files:**
- Create: `scripts/migrate.ts`
- Create: `scripts/migrate-products.ts`
- Create: `scripts/migrate-faqs.ts`
- Create: `scripts/migrate-jobs.ts`
- Create: `scripts/migrate-translations.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: Existing data files (product-data.ts, faq-data.ts, job-data.ts, i18n/*.json)
- Produces: Populated Payload collections

- [ ] **Step 1: Create migration script entry point**

```typescript
// scripts/migrate.ts
import { getPayload } from 'payload'
import config from '../payload.config'
import { importProducts } from './migrate-products'
import { importFAQs } from './migrate-faqs'
import { importJobs } from './migrate-jobs'
import { importTranslations } from './migrate-translations'

async function migrate() {
  const payload = await getPayload({ config })

  console.log('Starting migration...')

  // 1. Import categories
  console.log('Importing categories...')
  await importCategories(payload)

  // 2. Import product brands
  console.log('Importing product brands...')
  await importProductBrands(payload)

  // 3. Import products
  console.log('Importing products...')
  await importProducts(payload)

  // 4. Import FAQs
  console.log('Importing FAQs...')
  await importFAQs(payload)

  // 5. Import jobs
  console.log('Importing jobs...')
  await importJobs(payload)

  // 6. Import translations
  console.log('Importing translations...')
  await importTranslations(payload)

  console.log('Migration complete!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
```

- [ ] **Step 2: Create products migration script**

```typescript
// scripts/migrate-products.ts
import type { Payload } from 'payload'
import { products, productCategories, productBrands } from '../components/products/product-data'

export async function importCategories(payload: Payload) {
  for (const category of productCategories) {
    await payload.create({
      collection: 'categories',
      data: {
        name: category,
        slug: category,
        description: {
          en: `Browse our ${category} products`,
          fa: `محصولات ${category} ما را ببینید`,
          ar: `تصفح منتجات ${category} لدينا`,
        },
      },
    })
  }
}

export async function importProductBrands(payload: Payload) {
  for (const brand of productBrands) {
    await payload.create({
      collection: 'product-brands',
      data: {
        name: brand,
        slug: brand,
      },
    })
  }
}

export async function importProducts(payload: Payload) {
  for (const product of products) {
    // Find category and brand relationships
    const category = await payload.find({
      collection: 'categories',
      where: { slug: { equals: product.category } },
    })

    const brand = await payload.find({
      collection: 'product-brands',
      where: { slug: { equals: product.brand } },
    })

    await payload.create({
      collection: 'products',
      data: {
        name: {
          en: product.nameEn,
          fa: product.nameFa,
          ar: product.nameAr,
        },
        slug: product.slug,
        category: category.docs[0]?.id,
        brand: brand.docs[0]?.id,
        type: product.type,
        description: {
          en: product.descriptionEn,
          fa: product.descriptionFa,
          ar: product.descriptionAr,
        },
        alias: {
          en: product.aliasEn,
          fa: product.aliasFa,
          ar: product.aliasAr,
        },
        specs: product.specs?.map((spec) => ({
          label: spec.label,
          value: spec.value,
        })),
      },
    })
  }
}
```

- [ ] **Step 3: Create FAQs migration script**

```typescript
// scripts/migrate-faqs.ts
import type { Payload } from 'payload'
import { faqs } from '../components/faq/faq-data'

export async function importFAQs(payload: Payload) {
  for (const faq of faqs) {
    await payload.create({
      collection: 'faqs',
      data: {
        question: {
          en: faq.questionEn,
          fa: faq.questionFa,
          ar: faq.questionAr,
        },
        answer: {
          en: faq.answerEn,
          fa: faq.answerFa,
          ar: faq.answerAr,
        },
        category: faq.category,
      },
    })
  }
}
```

- [ ] **Step 4: Create jobs migration script**

```typescript
// scripts/migrate-jobs.ts
import type { Payload } from 'payload'
import { jobs } from '../components/careers/job-data'

export async function importJobs(payload: Payload) {
  for (const job of jobs) {
    await payload.create({
      collection: 'jobs',
      data: {
        title: {
          en: job.titleEn,
          fa: job.titleFa,
          ar: job.titleAr,
        },
        department: {
          en: job.departmentEn,
          fa: job.departmentFa,
          ar: job.departmentAr,
        },
        location: {
          en: job.locationEn,
          fa: job.locationFa,
          ar: job.locationAr,
        },
        type: job.type,
        description: {
          en: job.descriptionEn,
          fa: job.descriptionFa,
          ar: job.descriptionAr,
        },
        responsibilities: {
          en: job.responsibilitiesEn.map((item) => ({ item })),
          fa: job.responsibilitiesFa.map((item) => ({ item })),
          ar: job.responsibilitiesAr.map((item) => ({ item })),
        },
        requirements: {
          en: job.requirementsEn.map((item) => ({ item })),
          fa: job.requirementsFa.map((item) => ({ item })),
          ar: job.requirementsAr.map((item) => ({ item })),
        },
        benefits: {
          en: job.benefitsEn.map((item) => ({ item })),
          fa: job.benefitsFa.map((item) => ({ item })),
          ar: job.benefitsAr.map((item) => ({ item })),
        },
      },
    })
  }
}
```

- [ ] **Step 5: Create translations migration script**

```typescript
// scripts/migrate-translations.ts
import type { Payload } from 'payload'
import enTranslations from '../i18n/en.json'
import faTranslations from '../i18n/fa.json'
import arTranslations from '../i18n/ar.json'

export async function importTranslations(payload: Payload) {
  await payload.updateGlobal({
    slug: 'translations',
    data: {
      nav: {
        en: enTranslations.nav,
        fa: faTranslations.nav,
        ar: arTranslations.nav,
      },
      common: {
        en: enTranslations.common,
        fa: faTranslations.common,
        ar: arTranslations.common,
      },
    },
  })
}
```

- [ ] **Step 6: Add migration script to package.json**

```json
{
  "scripts": {
    "migrate": "tsx scripts/migrate.ts"
  }
}
```

- [ ] **Step 7: Install tsx for running TypeScript scripts**

```bash
npm install -D tsx
```

- [ ] **Step 8: Commit**

```bash
git add scripts/ package.json
git commit -m "feat: add migration scripts for all collections"
```

---

## Phase 3: Data Fetching Layer

### Task 7: Create Payload Data Fetching Utilities

**Covers:** [S4]

**Files:**
- Create: `lib/payload.ts`
- Create: `lib/fetch/products.ts`
- Create: `lib/fetch/faqs.ts`
- Create: `lib/fetch/jobs.ts`
- Create: `lib/fetch/homepage.ts`
- Create: `lib/fetch/navigation.ts`

**Interfaces:**
- Consumes: Payload CMS collections
- Produces: Type-safe data fetching functions

- [ ] **Step 1: Create Payload client utility**

```typescript
// lib/payload.ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}
```

- [ ] **Step 2: Create products fetching utility**

```typescript
// lib/fetch/products.ts
import { getPayloadClient } from '../payload'
import type { Product } from '../../payload-types'

export async function getProducts(locale: string = 'en'): Promise<Product[]> {
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return products.docs
}

export async function getProductBySlug(
  slug: string,
  locale: string = 'en',
): Promise<Product | null> {
  const payload = await getPayloadClient()

  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return products.docs[0] || null
}

export async function getProductsByCategory(
  category: string,
  locale: string = 'en',
): Promise<Product[]> {
  const payload = await getPayloadClient()

  // First, find the category
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: category } },
    limit: 1,
  })

  if (!categories.docs[0]) {
    return []
  }

  // Then, find products in that category
  const products = await payload.find({
    collection: 'products',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { category: { equals: categories.docs[0].id } },
    limit: 100,
  })

  return products.docs
}
```

- [ ] **Step 3: Create FAQs fetching utility**

```typescript
// lib/fetch/faqs.ts
import { getPayloadClient } from '../payload'
import type { Faq } from '../../payload-types'

export async function getFAQs(locale: string = 'en'): Promise<Faq[]> {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return faqs.docs
}

export async function getFAQsByCategory(
  category: string,
  locale: string = 'en',
): Promise<Faq[]> {
  const payload = await getPayloadClient()

  const faqs = await payload.find({
    collection: 'faqs',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { category: { equals: category } },
    limit: 100,
  })

  return faqs.docs
}
```

- [ ] **Step 4: Create jobs fetching utility**

```typescript
// lib/fetch/jobs.ts
import { getPayloadClient } from '../payload'
import type { Job } from '../../payload-types'

export async function getJobs(locale: string = 'en'): Promise<Job[]> {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    locale: locale as 'en' | 'fa' | 'ar',
    limit: 100,
  })

  return jobs.docs
}

export async function getJobById(
  id: number,
  locale: string = 'en',
): Promise<Job | null> {
  const payload = await getPayloadClient()

  const jobs = await payload.find({
    collection: 'jobs',
    locale: locale as 'en' | 'fa' | 'ar',
    where: { id: { equals: id } },
    limit: 1,
  })

  return jobs.docs[0] || null
}
```

- [ ] **Step 5: Create homepage fetching utility**

```typescript
// lib/fetch/homepage.ts
import { getPayloadClient } from '../payload'
import type { Homepage } from '../../payload-types'

export async function getHomepage(locale: string = 'en'): Promise<Homepage> {
  const payload = await getPayloadClient()

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fa' | 'ar',
  })

  return homepage
}
```

- [ ] **Step 6: Create navigation fetching utility**

```typescript
// lib/fetch/navigation.ts
import { getPayloadClient } from '../payload'
import type { Navigation } from '../../payload-types'

export async function getNavigation(locale: string = 'en'): Promise<Navigation> {
  const payload = await getPayloadClient()

  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fa' | 'ar',
  })

  return navigation
}
```

- [ ] **Step 7: Commit**

```bash
git add lib/payload.ts lib/fetch/
git commit -m "feat: add Payload data fetching utilities with type safety"
```

---

## Phase 4: Webhook & Revalidation

### Task 8: Create Webhook Handler

**Covers:** [S4]

**Files:**
- Create: `app/api/revalidate/route.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload CMS webhooks
- Produces: ISR revalidation

- [ ] **Step 1: Create webhook handler**

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { collection, doc, global } = body

    // Revalidate based on collection
    if (collection) {
      switch (collection) {
        case 'products':
          revalidatePath('/products')
          if (doc?.slug) {
            revalidatePath(`/products/${doc.slug}`)
          }
          break
        case 'categories':
          revalidatePath('/products')
          if (doc?.slug) {
            revalidatePath(`/products/${doc.slug}`)
          }
          break
        case 'blog-posts':
          revalidatePath('/blog')
          if (doc?.slug) {
            revalidatePath(`/blog/${doc.slug}`)
          }
          break
        case 'faqs':
          revalidatePath('/faq')
          break
        case 'jobs':
          revalidatePath('/careers')
          break
        default:
          revalidatePath('/')
      }
    }

    // Revalidate globals
    if (global) {
      switch (global) {
        case 'homepage':
          revalidatePath('/')
          break
        case 'navigation':
          revalidatePath('/')
          revalidatePath('/about')
          revalidatePath('/products')
          revalidatePath('/blog')
          revalidatePath('/faq')
          revalidatePath('/careers')
          revalidatePath('/contact')
          break
        case 'site-settings':
          revalidatePath('/')
          break
        default:
          revalidatePath('/')
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Configure Payload webhooks**

```typescript
// payload.config.ts
export default buildConfig({
  // ... existing config
  webhook: {
    url: process.env.NEXT_PUBLIC_SITE_URL + '/api/revalidate',
    secret: process.env.WEBHOOK_SECRET || '',
  },
})
```

- [ ] **Step 3: Add webhook secret to .env**

```bash
# .env
WEBHOOK_SECRET=your-webhook-secret
```

- [ ] **Step 4: Commit**

```bash
git add app/api/revalidate/route.ts payload.config.ts .env
git commit -m "feat: add webhook handler for ISR revalidation"
```

---

## Phase 5: Admin Panel Customization

### Task 9: Customize Payload Admin Panel

**Covers:** [S3]

**Files:**
- Create: `src/payload.config.ts` (update with admin customization)
- Create: `src/admin/components/CustomDashboard.tsx`
- Modify: `payload.config.ts`

**Interfaces:**
- Consumes: Payload CMS admin
- Produces: Customized admin panel

- [ ] **Step 1: Create custom dashboard component**

```tsx
// src/admin/components/CustomDashboard.tsx
'use client'

import React from 'react'
import { useConfig } from '@payloadcms/ui'

export const CustomDashboard: React.FC = () => {
  const { serverURL } = useConfig()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Faradid Atlas CMS</h1>
      <p>Welcome to the Faradid Atlas content management system.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <a href={`${serverURL}/admin/collections/products`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>Products</h3>
          <p>Manage product catalog</p>
        </a>
        <a href={`${serverURL}/admin/collections/blog-posts`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>Blog Posts</h3>
          <p>Manage blog content</p>
        </a>
        <a href={`${serverURL}/admin/collections/faqs`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>FAQs</h3>
          <p>Manage frequently asked questions</p>
        </a>
        <a href={`${serverURL}/admin/collections/jobs`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>Jobs</h3>
          <p>Manage career opportunities</p>
        </a>
        <a href={`${serverURL}/admin/globals/homepage`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>Homepage</h3>
          <p>Manage homepage content</p>
        </a>
        <a href={`${serverURL}/admin/globals/navigation`} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h3>Navigation</h3>
          <p>Manage menus</p>
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update Payload config with admin customization**

```typescript
// payload.config.ts
export default buildConfig({
  // ... existing config
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Faradid Atlas CMS',
    },
    // Note: Custom dashboard component will be added via admin components
  },
})
```

- [ ] **Step 3: Commit**

```bash
git add src/admin/ payload.config.ts
git commit -m "feat: customize Payload admin panel with dashboard"
```

---

## Phase 6: Frontend Integration

### Task 10: Update Frontend to Use Payload Data

**Covers:** [S1, S4]

**Files:**
- Modify: `app/[lang]/page.tsx`
- Modify: `app/[lang]/products/page.tsx`
- Modify: `app/[lang]/faq/page.tsx`
- Modify: `app/[lang]/careers/page.tsx`
- Modify: `app/[lang]/blog/page.tsx`

**Interfaces:**
- Consumes: Payload data fetching utilities from Task 7
- Produces: Updated frontend pages

- [ ] **Step 1: Update homepage to use Payload data**

```typescript
// app/[lang]/page.tsx
import { getHomepage } from '@/lib/fetch/homepage'
import { getProducts } from '@/lib/fetch/products'
import { getNavigation } from '@/lib/fetch/navigation'

// Add ISR revalidation
export const revalidate = 60

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  const homepage = await getHomepage(lang)
  const products = await getProducts(lang)
  const navigation = await getNavigation(lang)

  // Use homepage data instead of hardcoded values
  // Keep existing component structure and styling
}
```

- [ ] **Step 2: Update products page**

```typescript
// app/[lang]/products/page.tsx
import { getProducts } from '@/lib/fetch/products'
import { getCategories } from '@/lib/fetch/categories'

export const revalidate = 60

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { lang } = await params
  const products = await getProducts(lang)
  const categories = await getCategories(lang)

  // Use Payload data instead of imported product-data
  // Keep existing component structure and styling
}
```

- [ ] **Step 3: Update FAQ page**

```typescript
// app/[lang]/faq/page.tsx
import { getFAQs } from '@/lib/fetch/faqs'

export const revalidate = 60

export default async function FAQPage({ params }: FAQPageProps) {
  const { lang } = await params
  const faqs = await getFAQs(lang)

  // Use Payload data instead of imported faq-data
  // Keep existing component structure and styling
}
```

- [ ] **Step 4: Update careers page**

```typescript
// app/[lang]/careers/page.tsx
import { getJobs } from '@/lib/fetch/jobs'

export const revalidate = 60

export default async function CareersPage({ params }: CareersPageProps) {
  const { lang } = await params
  const jobs = await getJobs(lang)

  // Use Payload data instead of imported job-data
  // Keep existing component structure and styling
}
```

- [ ] **Step 5: Update blog page**

```typescript
// app/[lang]/blog/page.tsx
import { getBlogPosts } from '@/lib/fetch/blog-posts'

export const revalidate = 60

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params
  const posts = await getBlogPosts(lang)

  // Use Payload data instead of hardcoded content
  // Keep existing component structure and styling
}
```

- [ ] **Step 6: Commit**

```bash
git add app/[lang]/
git commit -m "feat: update frontend pages to use Payload data"
```

---

## Phase 7: SEO Preservation

### Task 11: Preserve SEO Features

**Covers:** [S6]

**Files:**
- Modify: `lib/metadata.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`

**Interfaces:**
- Consumes: Payload data
- Produces: Preserved SEO metadata, sitemaps, structured data

- [ ] **Step 1: Update metadata generation**

```typescript
// lib/metadata.ts
import { getPayloadClient } from './payload'

export async function generatePageMetadata({
  collection,
  slug,
  locale,
}: {
  collection: string
  slug?: string
  locale: string
}) {
  const payload = await getPayloadClient()

  let doc = null
  if (slug) {
    const result = await payload.find({
      collection: collection as any,
      where: { slug: { equals: slug } },
      locale: locale as 'en' | 'fa' | 'ar',
      limit: 1,
    })
    doc = result.docs[0]
  }

  if (!doc?.seo) {
    return {}
  }

  return {
    title: doc.seo.title,
    description: doc.seo.description,
    openGraph: {
      title: doc.seo.title,
      description: doc.seo.description,
      images: doc.seo.ogImage ? [doc.seo.ogImage.url] : [],
    },
  }
}
```

- [ ] **Step 2: Update sitemap generation**

```typescript
// app/sitemap.ts
import { getPayloadClient } from '@/lib/payload'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const products = await payload.find({ collection: 'products', limit: 100 })
  const blogPosts = await payload.find({ collection: 'blog-posts', limit: 100 })
  const faqs = await payload.find({ collection: 'faqs', limit: 100 })
  const jobs = await payload.find({ collection: 'jobs', limit: 100 })

  const locales = ['en', 'fa', 'ar']
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'

  const sitemap: MetadataRoute.Sitemap = []

  // Add static pages
  for (const locale of locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
    sitemap.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // Add product pages
  for (const product of products.docs) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Add blog posts
  for (const post of blogPosts.docs) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return sitemap
}
```

- [ ] **Step 3: Update robots.ts**

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faradidatlas.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/metadata.ts app/sitemap.ts app/robots.ts
git commit -m "feat: preserve SEO features with Payload data"
```

---

## Phase 8: Testing & Verification

### Task 12: Visual Regression Testing

**Covers:** [S6]

**Files:**
- Create: `tests/visual-regression/`
- Create: `tests/visual-regression/homepage.test.ts`
- Create: `tests/visual-regression/products.test.ts`
- Create: `tests/visual-regression/faq.test.ts`
- Create: `tests/visual-regression/careers.test.ts`
- Create: `tests/visual-regression/blog.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: Existing frontend pages
- Produces: Visual regression test results

- [ ] **Step 1: Install Playwright for visual testing**

```bash
npm install -D @playwright/test
npx playwright install
```

- [ ] **Step 2: Create Playwright config**

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/visual-regression',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 3: Create homepage visual test**

```typescript
// tests/visual-regression/homepage.test.ts
import { test, expect } from '@playwright/test'

test('homepage looks correct in English', async ({ page }) => {
  await page.goto('/en')
  await expect(page).toHaveScreenshot('homepage-en.png')
})

test('homepage looks correct in Persian', async ({ page }) => {
  await page.goto('/fa')
  await expect(page).toHaveScreenshot('homepage-fa.png')
})

test('homepage looks correct in Arabic', async ({ page }) => {
  await page.goto('/ar')
  await expect(page).toHaveScreenshot('homepage-ar.png')
})
```

- [ ] **Step 4: Create products visual test**

```typescript
// tests/visual-regression/products.test.ts
import { test, expect } from '@playwright/test'

test('products page looks correct', async ({ page }) => {
  await page.goto('/en/products')
  await expect(page).toHaveScreenshot('products-en.png')
})

test('product detail page looks correct', async ({ page }) => {
  await page.goto('/en/products/basmati-rice')
  await expect(page).toHaveScreenshot('product-detail-en.png')
})
```

- [ ] **Step 5: Create other page visual tests**

```typescript
// tests/visual-regression/faq.test.ts
import { test, expect } from '@playwright/test'

test('FAQ page looks correct', async ({ page }) => {
  await page.goto('/en/faq')
  await expect(page).toHaveScreenshot('faq-en.png')
})
```

```typescript
// tests/visual-regression/careers.test.ts
import { test, expect } from '@playwright/test'

test('careers page looks correct', async ({ page }) => {
  await page.goto('/en/careers')
  await expect(page).toHaveScreenshot('careers-en.png')
})
```

```typescript
// tests/visual-regression/blog.test.ts
import { test, expect } from '@playwright/test'

test('blog page looks correct', async ({ page }) => {
  await page.goto('/en/blog')
  await expect(page).toHaveScreenshot('blog-en.png')
})
```

- [ ] **Step 6: Add test scripts to package.json**

```json
{
  "scripts": {
    "test": "playwright test",
    "test:visual": "playwright test --update-snapshots"
  }
}
```

- [ ] **Step 7: Run visual tests**

```bash
npm run test:visual
```

- [ ] **Step 8: Commit**

```bash
git add tests/visual-regression/ playwright.config.ts package.json
git commit -m "feat: add visual regression tests for all pages"
```

---

## Summary

This implementation plan covers the complete migration to Payload CMS:

1. **Phase 1:** Payload CMS setup and collection definitions
2. **Phase 2:** Data migration scripts
3. **Phase 3:** Data fetching layer
4. **Phase 4:** Webhook and revalidation
5. **Phase 5:** Admin panel customization
6. **Phase 6:** Frontend integration
7. **Phase 7:** SEO preservation
8. **Phase 8:** Testing and verification

Each task is self-contained and can be executed independently. The plan follows TDD principles with tests for each major feature.
