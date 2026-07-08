import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";

import { Products } from "./src/collections/Products";
import { Categories } from "./src/collections/Categories";
import { ProductBrands } from "./src/collections/ProductBrands";
import { BlogPosts } from "./src/collections/BlogPosts";
import { FAQs } from "./src/collections/FAQs";
import { Jobs } from "./src/collections/Jobs";
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";

import { Homepage } from "./src/globals/Homepage";
import { CompanyInfo } from "./src/globals/CompanyInfo";
import { ContactInfo } from "./src/globals/ContactInfo";
import { Navigation } from "./src/globals/Navigation";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Redirects } from "./src/globals/Redirects";
import { Translations } from "./src/globals/Translations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | Faradid Atlas CMS",
    },
    components: {
      views: {
        Dashboard: {
          Component: "@/src/admin/components/CustomDashboard#CustomDashboard",
        },
      },
    },
  },

  collections: [
    Products,
    Categories,
    ProductBrands,
    BlogPosts,
    FAQs,
    Jobs,
    Media,
    Users,
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

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
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
});
