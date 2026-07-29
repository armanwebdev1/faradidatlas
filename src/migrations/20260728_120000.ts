import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_homepage__status" AS ENUM('draft', 'published');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__homepage_v_version__status" AS ENUM('draft', 'published');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('en', 'fa', 'ar');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_company_info__status" AS ENUM('draft', 'published');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__company_info_v_version__status" AS ENUM('draft', 'published');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__company_info_v_published_locale" AS ENUM('en', 'fa', 'ar');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  CREATE TABLE "_homepage_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"cta_url" varchar,
  	"is_active" boolean DEFAULT true,
  	"_uuid" varchar
  );

  CREATE TABLE "_homepage_v_version_hero_slides_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_homepage_v_version_value_props" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"is_active" boolean DEFAULT true,
  	"_uuid" varchar
  );

  CREATE TABLE "_homepage_v_version_value_props_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_homepage_v_version_brand_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"is_active" boolean DEFAULT true,
  	"_uuid" varchar
  );

  CREATE TABLE "_homepage_v_version_brand_showcase_locales" (
  	"brand_name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_homepage_v_version_signature_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"is_active" boolean DEFAULT true,
  	"_uuid" varchar
  );

  CREATE TABLE "_homepage_v_version_signature_products_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_homepage_v_version_global_markets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"is_active" boolean DEFAULT true,
  	"_uuid" varchar
  );

  CREATE TABLE "_homepage_v_version_global_markets_locales" (
  	"country" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cta_button_url" varchar,
  	"version_cta_image_id" integer,
  	"version_brands_section_banner_image_id" integer,
  	"version_signature_products_section_cta_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__homepage_v_version__status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__homepage_v_published_locale",
  	"latest" boolean
  );

  CREATE TABLE "_homepage_v_locales" (
  	"version_value_props_section_eyebrow" varchar,
  	"version_value_props_section_title" varchar,
  	"version_value_props_section_description" varchar,
  	"version_brands_section_eyebrow" varchar,
  	"version_brands_section_title" varchar,
  	"version_brands_section_description" varchar,
  	"version_signature_products_section_eyebrow" varchar,
  	"version_signature_products_section_title" varchar,
  	"version_signature_products_section_description" varchar,
  	"version_signature_products_section_cta_text" varchar,
  	"version_markets_section_eyebrow" varchar,
  	"version_markets_section_title" varchar,
  	"version_markets_section_description" varchar,
  	"version_cta_headline" varchar,
  	"version_cta_description" varchar,
  	"version_cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_company_info_v_version_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar,
  	"label_en" varchar,
  	"label_fa" varchar,
  	"label_ar" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_company_info_v_version_strategic_framework_vision_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_company_info_v_version_strategic_framework_mission_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_company_info_v_version_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );

  CREATE TABLE "_company_info_v_version_offerings_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_company_info_v_version_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_company_info_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_image_id" integer,
  	"version_get_connected_image_id" integer,
  	"version_ceo_image_id" integer,
  	"version_join_team_cta_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__company_info_v_version__status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__company_info_v_published_locale",
  	"latest" boolean
  );

  CREATE TABLE "_company_info_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_description" varchar,
  	"version_get_connected_alt" varchar,
  	"version_get_connected_heading" varchar,
  	"version_get_connected_paragraph1" varchar,
  	"version_get_connected_paragraph2" varchar,
  	"version_get_connected_quote" varchar,
  	"version_strategic_framework_eyebrow" varchar,
  	"version_strategic_framework_title" varchar,
  	"version_strategic_framework_intro" varchar,
  	"version_strategic_framework_vision_label" varchar,
  	"version_strategic_framework_vision_title" varchar,
  	"version_strategic_framework_vision_body" varchar,
  	"version_strategic_framework_mission_label" varchar,
  	"version_strategic_framework_mission_title" varchar,
  	"version_strategic_framework_mission_body" varchar,
  	"version_strategic_framework_values_section_label" varchar,
  	"version_strategic_framework_values_section_title" varchar,
  	"version_strategic_framework_values_section_body" varchar,
  	"version_ceo_eyebrow" varchar,
  	"version_ceo_heading" varchar,
  	"version_ceo_name" varchar,
  	"version_ceo_title" varchar,
  	"version_ceo_connector_word" varchar,
  	"version_ceo_bio" varchar,
  	"version_offerings_section_title" varchar,
  	"version_offerings_section_description" varchar,
  	"version_values_section_title" varchar,
  	"version_values_section_subtitle" varchar,
  	"version_values_section_intro" varchar,
  	"version_join_team_title" varchar,
  	"version_join_team_description" varchar,
  	"version_join_team_cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "_homepage_v_version_hero_slides" ADD CONSTRAINT "_homepage_v_version_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_slides" ADD CONSTRAINT "_homepage_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_slides_locales" ADD CONSTRAINT "_homepage_v_version_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_value_props" ADD CONSTRAINT "_homepage_v_version_value_props_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_value_props_locales" ADD CONSTRAINT "_homepage_v_version_value_props_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_value_props"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_brand_showcase" ADD CONSTRAINT "_homepage_v_version_brand_showcase_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_brand_showcase" ADD CONSTRAINT "_homepage_v_version_brand_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_brand_showcase_locales" ADD CONSTRAINT "_homepage_v_version_brand_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_brand_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_signature_products" ADD CONSTRAINT "_homepage_v_version_signature_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_signature_products" ADD CONSTRAINT "_homepage_v_version_signature_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_signature_products_locales" ADD CONSTRAINT "_homepage_v_version_signature_products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_signature_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_global_markets" ADD CONSTRAINT "_homepage_v_version_global_markets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_global_markets_locales" ADD CONSTRAINT "_homepage_v_version_global_markets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_global_markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_parent_id_homepage_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_brands_section_banner_image_id_media_id_fk" FOREIGN KEY ("version_brands_section_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_company_info_v_version_about_stats" ADD CONSTRAINT "_company_info_v_version_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_strategic_framework_vision_notes" ADD CONSTRAINT "_company_info_v_version_sf_vision_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_strategic_framework_mission_notes" ADD CONSTRAINT "_company_info_v_version_sf_mission_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_offerings" ADD CONSTRAINT "_company_info_v_version_offerings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_offerings" ADD CONSTRAINT "_company_info_v_version_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_offerings_locales" ADD CONSTRAINT "_company_info_v_version_offerings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v_version_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v_version_values" ADD CONSTRAINT "_company_info_v_version_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_info_v" ADD CONSTRAINT "_company_info_v_parent_id_company_info_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."company_info"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_info_v" ADD CONSTRAINT "_company_info_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_info_v" ADD CONSTRAINT "_company_info_v_version_get_connected_image_id_media_id_fk" FOREIGN KEY ("version_get_connected_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_info_v" ADD CONSTRAINT "_company_info_v_version_ceo_image_id_media_id_fk" FOREIGN KEY ("version_ceo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_info_v_locales" ADD CONSTRAINT "_company_info_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_info_v"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "_homepage_v_version_hero_slides_order_idx" ON "_homepage_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_hero_slides_parent_id_idx" ON "_homepage_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_hero_slides_image_idx" ON "_homepage_v_version_hero_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "_homepage_v_version_hero_slides_locales_locale_parent_id_unique" ON "_homepage_v_version_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_value_props_order_idx" ON "_homepage_v_version_value_props" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_value_props_parent_id_idx" ON "_homepage_v_version_value_props" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_version_value_props_locales_locale_parent_id_unique" ON "_homepage_v_version_value_props_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_brand_showcase_order_idx" ON "_homepage_v_version_brand_showcase" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_brand_showcase_parent_id_idx" ON "_homepage_v_version_brand_showcase" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_brand_showcase_logo_idx" ON "_homepage_v_version_brand_showcase" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_homepage_v_version_brand_showcase_locales_locale_parent_id_unique" ON "_homepage_v_version_brand_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_signature_products_order_idx" ON "_homepage_v_version_signature_products" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_signature_products_parent_id_idx" ON "_homepage_v_version_signature_products" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_signature_products_image_idx" ON "_homepage_v_version_signature_products" USING btree ("image_id");
  CREATE UNIQUE INDEX "_homepage_v_version_signature_products_locales_locale_parent_id_unique" ON "_homepage_v_version_signature_products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_global_markets_order_idx" ON "_homepage_v_version_global_markets" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_global_markets_parent_id_idx" ON "_homepage_v_version_global_markets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_version_global_markets_locales_locale_parent_id_unique" ON "_homepage_v_version_global_markets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_parent_idx" ON "_homepage_v" USING btree ("parent_id");
  CREATE INDEX "_homepage_v_version_version_updated_at_idx" ON "_homepage_v" USING btree ("version_updated_at");
  CREATE INDEX "_homepage_v_version_version_created_at_idx" ON "_homepage_v" USING btree ("version_created_at");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_company_info_v_version_about_stats_order_idx" ON "_company_info_v_version_about_stats" USING btree ("_order");
  CREATE INDEX "_company_info_v_version_about_stats_parent_id_idx" ON "_company_info_v_version_about_stats" USING btree ("_parent_id");
  CREATE INDEX "_company_info_v_version_sf_vision_notes_order_idx" ON "_company_info_v_version_strategic_framework_vision_notes" USING btree ("_order");
  CREATE INDEX "_company_info_v_version_sf_vision_notes_parent_id_idx" ON "_company_info_v_version_strategic_framework_vision_notes" USING btree ("_parent_id");
  CREATE INDEX "_company_info_v_version_sf_vision_notes_locale_idx" ON "_company_info_v_version_strategic_framework_vision_notes" USING btree ("_locale");
  CREATE INDEX "_company_info_v_version_sf_mission_notes_order_idx" ON "_company_info_v_version_strategic_framework_mission_notes" USING btree ("_order");
  CREATE INDEX "_company_info_v_version_sf_mission_notes_parent_id_idx" ON "_company_info_v_version_strategic_framework_mission_notes" USING btree ("_parent_id");
  CREATE INDEX "_company_info_v_version_sf_mission_notes_locale_idx" ON "_company_info_v_version_strategic_framework_mission_notes" USING btree ("_locale");
  CREATE INDEX "_company_info_v_version_offerings_order_idx" ON "_company_info_v_version_offerings" USING btree ("_order");
  CREATE INDEX "_company_info_v_version_offerings_parent_id_idx" ON "_company_info_v_version_offerings" USING btree ("_parent_id");
  CREATE INDEX "_company_info_v_version_offerings_image_idx" ON "_company_info_v_version_offerings" USING btree ("image_id");
  CREATE UNIQUE INDEX "_company_info_v_version_offerings_locales_locale_parent_id_unique" ON "_company_info_v_version_offerings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_company_info_v_version_values_order_idx" ON "_company_info_v_version_values" USING btree ("_order");
  CREATE INDEX "_company_info_v_version_values_parent_id_idx" ON "_company_info_v_version_values" USING btree ("_parent_id");
  CREATE INDEX "_company_info_v_version_values_locale_idx" ON "_company_info_v_version_values" USING btree ("_locale");
  CREATE INDEX "_company_info_v_parent_idx" ON "_company_info_v" USING btree ("parent_id");
  CREATE INDEX "_company_info_v_version_version_updated_at_idx" ON "_company_info_v" USING btree ("version_updated_at");
  CREATE INDEX "_company_info_v_version_version_created_at_idx" ON "_company_info_v" USING btree ("version_created_at");
  CREATE INDEX "_company_info_v_version_version__status_idx" ON "_company_info_v" USING btree ("version__status");
  CREATE INDEX "_company_info_v_created_at_idx" ON "_company_info_v" USING btree ("created_at");
  CREATE INDEX "_company_info_v_updated_at_idx" ON "_company_info_v" USING btree ("updated_at");
  CREATE INDEX "_company_info_v_snapshot_idx" ON "_company_info_v" USING btree ("snapshot");
  CREATE INDEX "_company_info_v_published_locale_idx" ON "_company_info_v" USING btree ("published_locale");
  CREATE INDEX "_company_info_v_latest_idx" ON "_company_info_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_company_info_v_locales_locale_parent_id_unique" ON "_company_info_v_locales" USING btree ("_locale","_parent_id");

  DO $$ BEGIN
    ALTER TABLE "homepage" ALTER COLUMN "_status" TYPE "enum_homepage__status" USING "_status"::"enum_homepage__status";
  EXCEPTION WHEN others THEN NULL;
  END $$;
  ALTER TABLE "homepage" ALTER COLUMN "_status" SET DEFAULT 'draft';
  DO $$ BEGIN
    ALTER TABLE "company_info" ALTER COLUMN "_status" TYPE "enum_company_info__status" USING "_status"::"enum_company_info__status";
  EXCEPTION WHEN others THEN NULL;
  END $$;
  ALTER TABLE "company_info" ALTER COLUMN "_status" SET DEFAULT 'draft';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "homepage" ALTER COLUMN "_status" TYPE varchar USING "_status"::varchar;
  ALTER TABLE "company_info" ALTER COLUMN "_status" TYPE varchar USING "_status"::varchar;

  DROP TABLE IF EXISTS "_homepage_v_version_hero_slides_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_hero_slides" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_value_props_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_value_props" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_brand_showcase_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_brand_showcase" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_signature_products_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_signature_products" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_global_markets_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_version_global_markets" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v_locales" CASCADE;
  DROP TABLE IF EXISTS "_homepage_v" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_about_stats" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_strategic_framework_vision_notes" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_strategic_framework_mission_notes" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_offerings_locales" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_offerings" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_version_values" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v_locales" CASCADE;
  DROP TABLE IF EXISTS "_company_info_v" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_homepage__status";
  DROP TYPE IF EXISTS "public"."enum__homepage_v_version__status";
  DROP TYPE IF EXISTS "public"."enum__homepage_v_published_locale";
  DROP TYPE IF EXISTS "public"."enum_company_info__status";
  DROP TYPE IF EXISTS "public"."enum__company_info_v_version__status";
  DROP TYPE IF EXISTS "public"."enum__company_info_v_published_locale";
  `)
}
