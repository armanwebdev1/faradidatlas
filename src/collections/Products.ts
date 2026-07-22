import type { CollectionConfig } from "payload";
import { isRole } from "../access/isRole";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: { en: "Product", fa: "محصول" },
    plural: { en: "Products", fa: "محصولات" },
  },
  access: {
    read: () => true,
    create: isRole("super-admin", "company-admin"),
    update: isRole("super-admin", "company-admin", "editor"),
    delete: isRole("super-admin", "company-admin"),
  },
  admin: {
    useAsTitle: "name",
    group: { en: "Catalog", fa: "کاتالوگ" },
    defaultColumns: ["name", "category", "brand", "featured", "status"],
    description: {
      en: "Manage your product catalog with multilingual names, descriptions, specs, and images",
      fa: "مدیریت کاتالوگ محصولات با نام‌ها، توضیحات، مشخصات و تصاویر چندزبانه",
    },
    preview: (doc, { locale }) => {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://faradidatlas.com";
      const lang = typeof locale === 'string' ? locale : (locale as any)?.code || "en";
      const slug = doc?.slug || "";
      return `${base}/api/preview?secret=${process.env.PAYLOAD_SECRET}&slug=/products/${slug}&collection=products&locale=${lang}`;
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: { en: "Name", fa: "نام" },
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: { en: "Slug", fa: "نامک" },
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "relationship",
      label: { en: "Category", fa: "دسته‌بندی" },
      relationTo: "categories",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "brand",
      type: "relationship",
      label: { en: "Brand", fa: "برند" },
      relationTo: "product-brands",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "type",
      type: "select",
      label: { en: "Type", fa: "نوع" },
      options: [
        {
          label: { en: "Basmati Rice", fa: "برنج باسماتی" },
          value: "basmati-rice",
        },
        {
          label: { en: "Jasmine Rice", fa: "برنج یاسمین" },
          value: "jasmine-rice",
        },
        { label: { en: "Beans", fa: "حبوبات" }, value: "beans" },
        { label: { en: "Lentils", fa: "عدس" }, value: "lentils" },
        { label: { en: "Chickpeas", fa: "نخود" }, value: "chickpeas" },
        {
          label: { en: "Seeds & Kernels", fa: "آجیل و خشکبار" },
          value: "seeds-kernels",
        },
        { label: { en: "Nuts", fa: "آجیل" }, value: "nuts" },
        { label: { en: "Spices", fa: "ادویه‌ها" }, value: "spices" },
        {
          label: { en: "Sweeteners", fa: "شکر" },
          value: "sweeteners",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: { en: "Featured", fa: "ویژه" },
      defaultValue: false,
      admin: {
        description: {
          en: "Mark as featured product",
          fa: "نشان‌دادن به‌عنوان محصول ویژه",
        },
        position: "sidebar",
      },
    },
    {
      name: "ordering",
      type: "number",
      label: { en: "Ordering", fa: "ترتیب نمایش" },
      defaultValue: 0,
      admin: {
        description: {
          en: "Display order (lower numbers first)",
          fa: "ترتیب نمایش (اعداد کمتر اول)",
        },
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: { en: "Description", fa: "توضیحات" },
      localized: true,
    },
    {
      name: "howWeSupplyDescription",
      type: "textarea",
      label: { en: "How We Supply Description", fa: "توضیح نحوه تامین" },
      localized: true,
      admin: {
        description: {
          en: 'Description shown under "How Faradid Atlas Supplies It" on the product detail page',
          fa: 'توضیحات نمایش داده شده در بخش "نحوه تامین توسط فرادید اطلس" در صفحه جزئیات محصول',
        },
      },
    },
    {
      name: "alias",
      type: "text",
      label: { en: "Alias", fa: "نام جایگزین" },
      localized: true,
      admin: {
        description: {
          en: "Alternative name for search",
          fa: "نام جایگزین برای جستجو",
        },
      },
    },
    {
      name: "specs",
      type: "array",
      label: { en: "Specifications", fa: "مشخصات" },
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          label: { en: "Label", fa: "عنوان" },
          required: true,
        },
        {
          name: "value",
          type: "text",
          label: { en: "Value", fa: "مقدار" },
          required: true,
        },
      ],
    },
    {
      name: "featuredImage",
      type: "upload",
      label: { en: "Featured Image", fa: "تصویر شاخص" },
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      label: { en: "Gallery", fa: "گالری تصاویر" },
      fields: [
        {
          name: "image",
          type: "upload",
          label: { en: "Image", fa: "تصویر" },
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "downloadableFiles",
      type: "array",
      label: { en: "Downloadable Files", fa: "فایل‌های قابل دانلود" },
      admin: {
        description: {
          en: "Downloadable files (brochures, specs sheets, etc.)",
          fa: "فایل‌های قابل دانلود (بروشور، برگه مشخصات و غیره)",
        },
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: { en: "Title", fa: "عنوان" },
          required: true,
          localized: true,
        },
        {
          name: "file",
          type: "upload",
          label: { en: "File", fa: "فایل" },
          relationTo: "media",
          required: true,
        },
        {
          name: "category",
          type: "text",
          label: { en: "Category", fa: "دسته‌بندی" },
          localized: true,
          admin: {
            description: {
              en: 'e.g. "Brochure", "Spec Sheet", "Certificate"',
              fa: 'مثلاً "بروشور"، "برگه مشخصات"، "گواهینامه"',
            },
          },
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: { en: "SEO", fa: "سئو" },
      fields: [
        {
          name: "title",
          type: "text",
          label: { en: "SEO Title", fa: "عنوان سئو" },
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: { en: "SEO Description", fa: "توضیحات سئو" },
          localized: true,
        },
        {
          name: "ogImage",
          type: "upload",
          label: { en: "OG Image", fa: "تصویر OG" },
          relationTo: "media",
        },
      ],
    },
  ],
};
