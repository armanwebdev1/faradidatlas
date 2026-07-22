import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { BlocksFeature } from "@payloadcms/richtext-lexical";
import { richTextBlocks } from "./src/admin/blocks";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { fa } from "@payloadcms/translations/languages/fa";
import path from "path";
import { fileURLToPath } from "url";

import { Products } from "./src/collections/Products";
import { Categories } from "./src/collections/Categories";
import { ProductBrands } from "./src/collections/ProductBrands";
import { BlogPosts } from "./src/collections/BlogPosts";
import { FAQs } from "./src/collections/FAQs";
import { Jobs } from "./src/collections/Jobs";
import { Downloads } from "./src/collections/Downloads";
import { Certificates } from "./src/collections/Certificates";
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";

import { Homepage } from "./src/globals/Homepage";
import { CompanyInfo } from "./src/globals/CompanyInfo";
import { ContactInfo } from "./src/globals/ContactInfo";
import { CareersInfo } from "./src/globals/CareersInfo";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Redirects } from "./src/globals/Redirects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | Faradid Atlas CMS",
      description: "Content management for faradidatlas.com",
    },
    components: {
      graphics: {
        Logo: "@/src/admin/components/CustomLogo#CustomLogo",
      },
      beforeNavLinks: [
        "@/src/admin/components/GlobalSearch#GlobalSearch",
      ],
      views: {
        Dashboard: {
          Component: "@/src/admin/components/CustomDashboard#CustomDashboard",
        },
      },
    },
  },

  globals: [
    Homepage,
    CompanyInfo,
    ContactInfo,
    CareersInfo,
    SiteSettings,
    Redirects,
  ],

  collections: [
    Products,
    Categories,
    ProductBrands,
    BlogPosts,
    FAQs,
    Jobs,
    Downloads,
    Certificates,
    Media,
    Users,
  ],

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: richTextBlocks,
      }),
    ],
  }),

  db: postgresAdapter({
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: 5,
      min: 0,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 10000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 0,
    },
  }),

  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Persian", code: "fa" },
      { label: "Arabic", code: "ar" },
    ],
    defaultLocale: "en",
    fallback: true,
  },

  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, fa },
  },
});
