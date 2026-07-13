import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "company_info_strategic_framework_vision_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_strategic_framework_mission_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "company_info_offerings_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "company_info_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label_en" varchar NOT NULL,
  	"label_fa" varchar NOT NULL,
  	"label_ar" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_trust_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "contact_info_trust_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "careers_info_culture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "careers_info_culture_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "careers_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "categories_locales" ADD COLUMN "seo_subtitle" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "seo_content" varchar;
  ALTER TABLE "_categories_v_locales" ADD COLUMN "version_seo_subtitle" varchar;
  ALTER TABLE "_categories_v_locales" ADD COLUMN "version_seo_content" varchar;
  ALTER TABLE "media_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "company_info" ADD COLUMN "get_connected_image_id" integer;
  ALTER TABLE "company_info_locales" ADD COLUMN "ceo_eyebrow" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "ceo_heading" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_eyebrow" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_title" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_intro" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_vision_label" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_vision_title" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_vision_body" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_mission_label" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_mission_title" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_mission_body" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_values_section_label" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_values_section_title" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "strategic_framework_values_section_body" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "get_connected_alt" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "get_connected_heading" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "get_connected_paragraph1" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "get_connected_paragraph2" varchar;
  ALTER TABLE "company_info_locales" ADD COLUMN "get_connected_quote" varchar;
  ALTER TABLE "company_info_strategic_framework_vision_notes" ADD CONSTRAINT "company_info_strategic_framework_vision_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_strategic_framework_mission_notes" ADD CONSTRAINT "company_info_strategic_framework_mission_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_offerings" ADD CONSTRAINT "company_info_offerings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_info_offerings" ADD CONSTRAINT "company_info_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_offerings_locales" ADD CONSTRAINT "company_info_offerings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_info_about_stats" ADD CONSTRAINT "company_info_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_trust_stats" ADD CONSTRAINT "contact_info_trust_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_trust_stats_locales" ADD CONSTRAINT "contact_info_trust_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info_trust_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_info_culture" ADD CONSTRAINT "careers_info_culture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_info_culture_locales" ADD CONSTRAINT "careers_info_culture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_info_culture"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "company_info_strategic_framework_vision_notes_order_idx" ON "company_info_strategic_framework_vision_notes" USING btree ("_order");
  CREATE INDEX "company_info_strategic_framework_vision_notes_parent_id_idx" ON "company_info_strategic_framework_vision_notes" USING btree ("_parent_id");
  CREATE INDEX "company_info_strategic_framework_vision_notes_locale_idx" ON "company_info_strategic_framework_vision_notes" USING btree ("_locale");
  CREATE INDEX "company_info_strategic_framework_mission_notes_order_idx" ON "company_info_strategic_framework_mission_notes" USING btree ("_order");
  CREATE INDEX "company_info_strategic_framework_mission_notes_parent_id_idx" ON "company_info_strategic_framework_mission_notes" USING btree ("_parent_id");
  CREATE INDEX "company_info_strategic_framework_mission_notes_locale_idx" ON "company_info_strategic_framework_mission_notes" USING btree ("_locale");
  CREATE INDEX "company_info_offerings_order_idx" ON "company_info_offerings" USING btree ("_order");
  CREATE INDEX "company_info_offerings_parent_id_idx" ON "company_info_offerings" USING btree ("_parent_id");
  CREATE INDEX "company_info_offerings_image_idx" ON "company_info_offerings" USING btree ("image_id");
  CREATE UNIQUE INDEX "company_info_offerings_locales_locale_parent_id_unique" ON "company_info_offerings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_info_about_stats_order_idx" ON "company_info_about_stats" USING btree ("_order");
  CREATE INDEX "company_info_about_stats_parent_id_idx" ON "company_info_about_stats" USING btree ("_parent_id");
  CREATE INDEX "contact_info_trust_stats_order_idx" ON "contact_info_trust_stats" USING btree ("_order");
  CREATE INDEX "contact_info_trust_stats_parent_id_idx" ON "contact_info_trust_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_info_trust_stats_locales_locale_parent_id_unique" ON "contact_info_trust_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_info_culture_order_idx" ON "careers_info_culture" USING btree ("_order");
  CREATE INDEX "careers_info_culture_parent_id_idx" ON "careers_info_culture" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "careers_info_culture_locales_locale_parent_id_unique" ON "careers_info_culture_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_get_connected_image_id_media_id_fk" FOREIGN KEY ("get_connected_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "company_info_get_connected_get_connected_image_idx" ON "company_info" USING btree ("get_connected_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info_strategic_framework_vision_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_strategic_framework_mission_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_offerings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_offerings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_info_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_trust_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_trust_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_info_culture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_info_culture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_info" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "company_info_strategic_framework_vision_notes" CASCADE;
  DROP TABLE "company_info_strategic_framework_mission_notes" CASCADE;
  DROP TABLE "company_info_offerings" CASCADE;
  DROP TABLE "company_info_offerings_locales" CASCADE;
  DROP TABLE "company_info_about_stats" CASCADE;
  DROP TABLE "contact_info_trust_stats" CASCADE;
  DROP TABLE "contact_info_trust_stats_locales" CASCADE;
  DROP TABLE "careers_info_culture" CASCADE;
  DROP TABLE "careers_info_culture_locales" CASCADE;
  DROP TABLE "careers_info" CASCADE;
  ALTER TABLE "company_info" DROP CONSTRAINT "company_info_get_connected_image_id_media_id_fk";
  
  DROP INDEX "company_info_get_connected_get_connected_image_idx";
  ALTER TABLE "categories_locales" DROP COLUMN "seo_subtitle";
  ALTER TABLE "categories_locales" DROP COLUMN "seo_content";
  ALTER TABLE "_categories_v_locales" DROP COLUMN "version_seo_subtitle";
  ALTER TABLE "_categories_v_locales" DROP COLUMN "version_seo_content";
  ALTER TABLE "media_locales" DROP COLUMN "title";
  ALTER TABLE "company_info" DROP COLUMN "get_connected_image_id";
  ALTER TABLE "company_info_locales" DROP COLUMN "ceo_eyebrow";
  ALTER TABLE "company_info_locales" DROP COLUMN "ceo_heading";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_eyebrow";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_title";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_intro";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_vision_label";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_vision_title";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_vision_body";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_mission_label";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_mission_title";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_mission_body";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_values_section_label";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_values_section_title";
  ALTER TABLE "company_info_locales" DROP COLUMN "strategic_framework_values_section_body";
  ALTER TABLE "company_info_locales" DROP COLUMN "get_connected_alt";
  ALTER TABLE "company_info_locales" DROP COLUMN "get_connected_heading";
  ALTER TABLE "company_info_locales" DROP COLUMN "get_connected_paragraph1";
  ALTER TABLE "company_info_locales" DROP COLUMN "get_connected_paragraph2";
  ALTER TABLE "company_info_locales" DROP COLUMN "get_connected_quote";`)
}
