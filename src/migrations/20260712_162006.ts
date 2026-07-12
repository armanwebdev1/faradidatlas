import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_job_status" AS ENUM('active', 'closed', 'on-hold');
  CREATE TYPE "public"."enum__jobs_v_version_job_status" AS ENUM('active', 'closed', 'on-hold');
  CREATE TYPE "public"."enum_downloads_category" AS ENUM('brochure', 'spec-sheet', 'certificate', 'catalog', 'price-list', 'other');
  CREATE TYPE "public"."enum_downloads_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_version_category" AS ENUM('brochure', 'spec-sheet', 'certificate', 'catalog', 'price-list', 'other');
  CREATE TYPE "public"."enum__downloads_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_published_locale" AS ENUM('en', 'fa', 'ar');
  CREATE TYPE "public"."enum_certificates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certificates_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certificates_v_published_locale" AS ENUM('en', 'fa', 'ar');
  CREATE TABLE "products_downloadable_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "products_downloadable_files_locales" (
  	"title" varchar,
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_products_v_version_downloadable_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_downloadable_files_locales" (
  	"title" varchar,
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"category" "enum_downloads_category",
  	"ordering" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_downloads_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "downloads_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_downloads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_file_id" integer,
  	"version_category" "enum__downloads_v_version_category",
  	"version_ordering" numeric DEFAULT 0,
  	"version_is_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__downloads_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__downloads_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_downloads_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"issue_date" timestamp(3) with time zone,
  	"expiry_date" timestamp(3) with time zone,
  	"ordering" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certificates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "certificates_locales" (
  	"title" varchar,
  	"description" varchar,
  	"issuing_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_certificates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_image_id" integer,
  	"version_issue_date" timestamp(3) with time zone,
  	"version_expiry_date" timestamp(3) with time zone,
  	"version_ordering" numeric DEFAULT 0,
  	"version_is_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certificates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__certificates_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_certificates_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_issuing_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "company_info_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "company_info_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"issue_date" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_info_certificates_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "company_info_banners_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_social_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_social_media_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_response_s_l_a_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"timeline" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "navigation_locales" (
  	"announcement_bar_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"default_s_e_o_title" varchar,
  	"default_s_e_o_description" varchar,
  	"default_s_e_o_keywords" varchar,
  	"cookie_banner_text" varchar,
  	"cookie_banner_accept_text" varchar DEFAULT 'Accept',
  	"cookie_banner_decline_text" varchar DEFAULT 'Decline',
  	"announcement_bar_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "ordering" numeric DEFAULT 0;
  ALTER TABLE "_products_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN "version_ordering" numeric DEFAULT 0;
  ALTER TABLE "categories" ADD COLUMN "icon" varchar;
  ALTER TABLE "categories" ADD COLUMN "image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "ordering" numeric DEFAULT 0;
  ALTER TABLE "_categories_v" ADD COLUMN "version_icon" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "_categories_v" ADD COLUMN "version_ordering" numeric DEFAULT 0;
  ALTER TABLE "product_brands" ADD COLUMN "logo_id" integer;
  ALTER TABLE "faqs" ADD COLUMN "ordering" numeric DEFAULT 0;
  ALTER TABLE "faqs" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "_faqs_v" ADD COLUMN "version_ordering" numeric DEFAULT 0;
  ALTER TABLE "_faqs_v" ADD COLUMN "version_is_active" boolean DEFAULT true;
  ALTER TABLE "jobs" ADD COLUMN "job_status" "enum_jobs_job_status" DEFAULT 'active';
  ALTER TABLE "jobs_locales" ADD COLUMN "salary" varchar;
  ALTER TABLE "_jobs_v" ADD COLUMN "version_job_status" "enum__jobs_v_version_job_status" DEFAULT 'active';
  ALTER TABLE "_jobs_v_locales" ADD COLUMN "version_salary" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "downloads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certificates_id" integer;
  ALTER TABLE "homepage_hero_slides" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "homepage_hero_slides" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "homepage_hero_slides_locales" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "homepage_value_props" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "homepage_brand_showcase" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "homepage_signature_products" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "homepage_global_markets" ADD COLUMN "value" numeric;
  ALTER TABLE "homepage_global_markets" ADD COLUMN "is_active" boolean DEFAULT true;
  ALTER TABLE "homepage" ADD COLUMN "cta_image_id" integer;
  ALTER TABLE "contact_info_offices" ADD COLUMN "google_maps_embed" varchar;
  ALTER TABLE "contact_info" ADD COLUMN "working_hours_timezone" varchar DEFAULT 'Asia/Tehran';
  ALTER TABLE "contact_info_locales" ADD COLUMN "working_hours_weekdays" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "working_hours_weekends" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "cta_headline" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "cta_description" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "cta_button_text" varchar;
  ALTER TABLE "contact_info_locales" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "navigation" ADD COLUMN "announcement_bar_enabled" boolean DEFAULT false;
  ALTER TABLE "navigation" ADD COLUMN "announcement_bar_link" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "favicon_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "default_s_e_o_og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "default_s_e_o_canonical_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_s_e_o_robots" varchar DEFAULT 'index, follow';
  ALTER TABLE "site_settings" ADD COLUMN "analytics_google_analytics_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "analytics_google_tag_manager_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "analytics_hotjar_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "cookie_banner_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "announcement_bar_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "announcement_bar_link" varchar;
  ALTER TABLE "products_downloadable_files" ADD CONSTRAINT "products_downloadable_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_downloadable_files" ADD CONSTRAINT "products_downloadable_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_downloadable_files_locales" ADD CONSTRAINT "products_downloadable_files_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_downloadable_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_downloadable_files" ADD CONSTRAINT "_products_v_version_downloadable_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_downloadable_files" ADD CONSTRAINT "_products_v_version_downloadable_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_downloadable_files_locales" ADD CONSTRAINT "_products_v_version_downloadable_files_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_downloadable_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_locales" ADD CONSTRAINT "downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_parent_id_downloads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v_locales" ADD CONSTRAINT "_downloads_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_downloads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates_locales" ADD CONSTRAINT "certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_parent_id_certificates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certificates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v_locales" ADD CONSTRAINT "_certificates_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certificates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_timeline" ADD CONSTRAINT "company_info_timeline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info_timeline" ADD CONSTRAINT "company_info_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_certificates" ADD CONSTRAINT "company_info_certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info_certificates" ADD CONSTRAINT "company_info_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_certificates_locales" ADD CONSTRAINT "company_info_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info_certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_banners" ADD CONSTRAINT "company_info_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info_banners" ADD CONSTRAINT "company_info_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_banners_locales" ADD CONSTRAINT "company_info_banners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_social_media" ADD CONSTRAINT "contact_info_social_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_social_media_locales" ADD CONSTRAINT "contact_info_social_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info_social_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_hero_badges" ADD CONSTRAINT "contact_info_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_response_s_l_a_steps" ADD CONSTRAINT "contact_info_response_s_l_a_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_downloadable_files_order_idx" ON "products_downloadable_files" USING btree ("_order");
  CREATE INDEX "products_downloadable_files_parent_id_idx" ON "products_downloadable_files" USING btree ("_parent_id");
  CREATE INDEX "products_downloadable_files_file_idx" ON "products_downloadable_files" USING btree ("file_id");
  CREATE UNIQUE INDEX "products_downloadable_files_locales_locale_parent_id_unique" ON "products_downloadable_files_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_downloadable_files_order_idx" ON "_products_v_version_downloadable_files" USING btree ("_order");
  CREATE INDEX "_products_v_version_downloadable_files_parent_id_idx" ON "_products_v_version_downloadable_files" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_downloadable_files_file_idx" ON "_products_v_version_downloadable_files" USING btree ("file_id");
  CREATE UNIQUE INDEX "_products_v_version_downloadable_files_locales_locale_parent" ON "_products_v_version_downloadable_files_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "downloads_file_idx" ON "downloads" USING btree ("file_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE INDEX "downloads__status_idx" ON "downloads" USING btree ("_status");
  CREATE UNIQUE INDEX "downloads_locales_locale_parent_id_unique" ON "downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_downloads_v_parent_idx" ON "_downloads_v" USING btree ("parent_id");
  CREATE INDEX "_downloads_v_version_version_file_idx" ON "_downloads_v" USING btree ("version_file_id");
  CREATE INDEX "_downloads_v_version_version_updated_at_idx" ON "_downloads_v" USING btree ("version_updated_at");
  CREATE INDEX "_downloads_v_version_version_created_at_idx" ON "_downloads_v" USING btree ("version_created_at");
  CREATE INDEX "_downloads_v_version_version__status_idx" ON "_downloads_v" USING btree ("version__status");
  CREATE INDEX "_downloads_v_created_at_idx" ON "_downloads_v" USING btree ("created_at");
  CREATE INDEX "_downloads_v_updated_at_idx" ON "_downloads_v" USING btree ("updated_at");
  CREATE INDEX "_downloads_v_snapshot_idx" ON "_downloads_v" USING btree ("snapshot");
  CREATE INDEX "_downloads_v_published_locale_idx" ON "_downloads_v" USING btree ("published_locale");
  CREATE INDEX "_downloads_v_latest_idx" ON "_downloads_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_downloads_v_locales_locale_parent_id_unique" ON "_downloads_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "certificates_image_idx" ON "certificates" USING btree ("image_id");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "certificates__status_idx" ON "certificates" USING btree ("_status");
  CREATE UNIQUE INDEX "certificates_locales_locale_parent_id_unique" ON "certificates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_certificates_v_parent_idx" ON "_certificates_v" USING btree ("parent_id");
  CREATE INDEX "_certificates_v_version_version_image_idx" ON "_certificates_v" USING btree ("version_image_id");
  CREATE INDEX "_certificates_v_version_version_updated_at_idx" ON "_certificates_v" USING btree ("version_updated_at");
  CREATE INDEX "_certificates_v_version_version_created_at_idx" ON "_certificates_v" USING btree ("version_created_at");
  CREATE INDEX "_certificates_v_version_version__status_idx" ON "_certificates_v" USING btree ("version__status");
  CREATE INDEX "_certificates_v_created_at_idx" ON "_certificates_v" USING btree ("created_at");
  CREATE INDEX "_certificates_v_updated_at_idx" ON "_certificates_v" USING btree ("updated_at");
  CREATE INDEX "_certificates_v_snapshot_idx" ON "_certificates_v" USING btree ("snapshot");
  CREATE INDEX "_certificates_v_published_locale_idx" ON "_certificates_v" USING btree ("published_locale");
  CREATE INDEX "_certificates_v_latest_idx" ON "_certificates_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_certificates_v_locales_locale_parent_id_unique" ON "_certificates_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_info_timeline_order_idx" ON "company_info_timeline" USING btree ("_order");
  CREATE INDEX "company_info_timeline_parent_id_idx" ON "company_info_timeline" USING btree ("_parent_id");
  CREATE INDEX "company_info_timeline_locale_idx" ON "company_info_timeline" USING btree ("_locale");
  CREATE INDEX "company_info_timeline_image_idx" ON "company_info_timeline" USING btree ("image_id");
  CREATE INDEX "company_info_certificates_order_idx" ON "company_info_certificates" USING btree ("_order");
  CREATE INDEX "company_info_certificates_parent_id_idx" ON "company_info_certificates" USING btree ("_parent_id");
  CREATE INDEX "company_info_certificates_image_idx" ON "company_info_certificates" USING btree ("image_id");
  CREATE UNIQUE INDEX "company_info_certificates_locales_locale_parent_id_unique" ON "company_info_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_info_banners_order_idx" ON "company_info_banners" USING btree ("_order");
  CREATE INDEX "company_info_banners_parent_id_idx" ON "company_info_banners" USING btree ("_parent_id");
  CREATE INDEX "company_info_banners_image_idx" ON "company_info_banners" USING btree ("image_id");
  CREATE UNIQUE INDEX "company_info_banners_locales_locale_parent_id_unique" ON "company_info_banners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_info_social_media_order_idx" ON "contact_info_social_media" USING btree ("_order");
  CREATE INDEX "contact_info_social_media_parent_id_idx" ON "contact_info_social_media" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_info_social_media_locales_locale_parent_id_unique" ON "contact_info_social_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_info_hero_badges_order_idx" ON "contact_info_hero_badges" USING btree ("_order");
  CREATE INDEX "contact_info_hero_badges_parent_id_idx" ON "contact_info_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "contact_info_hero_badges_locale_idx" ON "contact_info_hero_badges" USING btree ("_locale");
  CREATE INDEX "contact_info_response_s_l_a_steps_order_idx" ON "contact_info_response_s_l_a_steps" USING btree ("_order");
  CREATE INDEX "contact_info_response_s_l_a_steps_parent_id_idx" ON "contact_info_response_s_l_a_steps" USING btree ("_parent_id");
  CREATE INDEX "contact_info_response_s_l_a_steps_locale_idx" ON "contact_info_response_s_l_a_steps" USING btree ("_locale");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_brands" ADD CONSTRAINT "product_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_s_e_o_og_image_id_media_id_fk" FOREIGN KEY ("default_s_e_o_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "_categories_v_version_version_image_idx" ON "_categories_v" USING btree ("version_image_id");
  CREATE INDEX "product_brands_logo_idx" ON "product_brands" USING btree ("logo_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "homepage_cta_cta_image_idx" ON "homepage" USING btree ("cta_image_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_s_e_o_default_s_e_o_og_image_idx" ON "site_settings" USING btree ("default_s_e_o_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_downloadable_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_downloadable_files_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_downloadable_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_downloadable_files_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "downloads_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_downloads_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_downloads_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_certificates_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_certificates_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_banners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_social_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_social_media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_hero_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_response_s_l_a_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_downloadable_files" CASCADE;
  DROP TABLE "products_downloadable_files_locales" CASCADE;
  DROP TABLE "_products_v_version_downloadable_files" CASCADE;
  DROP TABLE "_products_v_version_downloadable_files_locales" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "downloads_locales" CASCADE;
  DROP TABLE "_downloads_v" CASCADE;
  DROP TABLE "_downloads_v_locales" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "certificates_locales" CASCADE;
  DROP TABLE "_certificates_v" CASCADE;
  DROP TABLE "_certificates_v_locales" CASCADE;
  DROP TABLE "company_info_timeline" CASCADE;
  DROP TABLE "company_info_certificates" CASCADE;
  DROP TABLE "company_info_certificates_locales" CASCADE;
  DROP TABLE "company_info_banners" CASCADE;
  DROP TABLE "company_info_banners_locales" CASCADE;
  DROP TABLE "contact_info_social_media" CASCADE;
  DROP TABLE "contact_info_social_media_locales" CASCADE;
  DROP TABLE "contact_info_hero_badges" CASCADE;
  DROP TABLE "contact_info_response_s_l_a_steps" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  ALTER TABLE "categories" DROP CONSTRAINT "categories_image_id_media_id_fk";
  
  ALTER TABLE "_categories_v" DROP CONSTRAINT "_categories_v_version_image_id_media_id_fk";
  
  ALTER TABLE "product_brands" DROP CONSTRAINT "product_brands_logo_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_downloads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certificates_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_cta_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_favicon_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_default_s_e_o_og_image_id_media_id_fk";
  
  DROP INDEX "categories_image_idx";
  DROP INDEX "_categories_v_version_version_image_idx";
  DROP INDEX "product_brands_logo_idx";
  DROP INDEX "payload_locked_documents_rels_downloads_id_idx";
  DROP INDEX "payload_locked_documents_rels_certificates_id_idx";
  DROP INDEX "homepage_cta_cta_image_idx";
  DROP INDEX "site_settings_favicon_idx";
  DROP INDEX "site_settings_default_s_e_o_default_s_e_o_og_image_idx";
  ALTER TABLE "products" DROP COLUMN "featured";
  ALTER TABLE "products" DROP COLUMN "ordering";
  ALTER TABLE "_products_v" DROP COLUMN "version_featured";
  ALTER TABLE "_products_v" DROP COLUMN "version_ordering";
  ALTER TABLE "categories" DROP COLUMN "icon";
  ALTER TABLE "categories" DROP COLUMN "image_id";
  ALTER TABLE "categories" DROP COLUMN "ordering";
  ALTER TABLE "_categories_v" DROP COLUMN "version_icon";
  ALTER TABLE "_categories_v" DROP COLUMN "version_image_id";
  ALTER TABLE "_categories_v" DROP COLUMN "version_ordering";
  ALTER TABLE "product_brands" DROP COLUMN "logo_id";
  ALTER TABLE "faqs" DROP COLUMN "ordering";
  ALTER TABLE "faqs" DROP COLUMN "is_active";
  ALTER TABLE "_faqs_v" DROP COLUMN "version_ordering";
  ALTER TABLE "_faqs_v" DROP COLUMN "version_is_active";
  ALTER TABLE "jobs" DROP COLUMN "job_status";
  ALTER TABLE "jobs_locales" DROP COLUMN "salary";
  ALTER TABLE "_jobs_v" DROP COLUMN "version_job_status";
  ALTER TABLE "_jobs_v_locales" DROP COLUMN "version_salary";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "downloads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certificates_id";
  ALTER TABLE "homepage_hero_slides" DROP COLUMN "cta_url";
  ALTER TABLE "homepage_hero_slides" DROP COLUMN "is_active";
  ALTER TABLE "homepage_hero_slides_locales" DROP COLUMN "cta_text";
  ALTER TABLE "homepage_value_props" DROP COLUMN "is_active";
  ALTER TABLE "homepage_brand_showcase" DROP COLUMN "is_active";
  ALTER TABLE "homepage_signature_products" DROP COLUMN "is_active";
  ALTER TABLE "homepage_global_markets" DROP COLUMN "value";
  ALTER TABLE "homepage_global_markets" DROP COLUMN "is_active";
  ALTER TABLE "homepage" DROP COLUMN "cta_image_id";
  ALTER TABLE "contact_info_offices" DROP COLUMN "google_maps_embed";
  ALTER TABLE "contact_info" DROP COLUMN "working_hours_timezone";
  ALTER TABLE "contact_info_locales" DROP COLUMN "working_hours_weekdays";
  ALTER TABLE "contact_info_locales" DROP COLUMN "working_hours_weekends";
  ALTER TABLE "contact_info_locales" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "contact_info_locales" DROP COLUMN "hero_title";
  ALTER TABLE "contact_info_locales" DROP COLUMN "hero_description";
  ALTER TABLE "contact_info_locales" DROP COLUMN "cta_headline";
  ALTER TABLE "contact_info_locales" DROP COLUMN "cta_description";
  ALTER TABLE "contact_info_locales" DROP COLUMN "cta_button_text";
  ALTER TABLE "contact_info_locales" DROP COLUMN "cta_button_url";
  ALTER TABLE "navigation" DROP COLUMN "announcement_bar_enabled";
  ALTER TABLE "navigation" DROP COLUMN "announcement_bar_link";
  ALTER TABLE "site_settings" DROP COLUMN "favicon_id";
  ALTER TABLE "site_settings" DROP COLUMN "default_s_e_o_og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "default_s_e_o_canonical_url";
  ALTER TABLE "site_settings" DROP COLUMN "default_s_e_o_robots";
  ALTER TABLE "site_settings" DROP COLUMN "analytics_google_analytics_id";
  ALTER TABLE "site_settings" DROP COLUMN "analytics_google_tag_manager_id";
  ALTER TABLE "site_settings" DROP COLUMN "analytics_hotjar_id";
  ALTER TABLE "site_settings" DROP COLUMN "cookie_banner_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "announcement_bar_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "announcement_bar_link";
  DROP TYPE "public"."enum_jobs_job_status";
  DROP TYPE "public"."enum__jobs_v_version_job_status";
  DROP TYPE "public"."enum_downloads_category";
  DROP TYPE "public"."enum_downloads_status";
  DROP TYPE "public"."enum__downloads_v_version_category";
  DROP TYPE "public"."enum__downloads_v_version_status";
  DROP TYPE "public"."enum__downloads_v_published_locale";
  DROP TYPE "public"."enum_certificates_status";
  DROP TYPE "public"."enum__certificates_v_version_status";
  DROP TYPE "public"."enum__certificates_v_published_locale";`)
}
