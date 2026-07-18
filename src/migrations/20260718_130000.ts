import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ========================================
  // Add CMS-editable fields to company_info
  // ========================================

  // --- Hero group (upload field) ---
  await db.execute(sql`
    ALTER TABLE "company_info" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info"
      ADD CONSTRAINT "company_info_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
  `)

  // --- Hero group (localized fields) ---
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_headline" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_alt" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_food_security_practical" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_story_p1" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_story_p2" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_mission_label" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_mission_text" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "hero_blockquote" varchar;
  `)

  // --- CEO connectorWord (localized) ---
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "ceo_connector_word" varchar;
  `)

  // --- Offerings Section group (localized) ---
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "offerings_section_title" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "offerings_section_description" varchar;
  `)

  // --- Values Section group (localized) ---
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "values_section_title" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "values_section_subtitle" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "values_section_intro" varchar;
  `)

  // --- Join Team group (localized) ---
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "join_team_title" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "join_team_description" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "join_team_cta_text" varchar;
  `)

  // --- Join Team group (non-localized) ---
  await db.execute(sql`
    ALTER TABLE "company_info" ADD COLUMN IF NOT EXISTS "join_team_cta_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      DROP COLUMN IF EXISTS "hero_eyebrow",
      DROP COLUMN IF EXISTS "hero_headline",
      DROP COLUMN IF EXISTS "hero_description",
      DROP COLUMN IF EXISTS "hero_image_alt",
      DROP COLUMN IF EXISTS "hero_food_security_practical",
      DROP COLUMN IF EXISTS "hero_story_p1",
      DROP COLUMN IF EXISTS "hero_story_p2",
      DROP COLUMN IF EXISTS "hero_mission_label",
      DROP COLUMN IF EXISTS "hero_mission_text",
      DROP COLUMN IF EXISTS "hero_blockquote",
      DROP COLUMN IF EXISTS "ceo_connector_word",
      DROP COLUMN IF EXISTS "offerings_section_title",
      DROP COLUMN IF EXISTS "offerings_section_description",
      DROP COLUMN IF EXISTS "values_section_title",
      DROP COLUMN IF EXISTS "values_section_subtitle",
      DROP COLUMN IF EXISTS "values_section_intro",
      DROP COLUMN IF EXISTS "join_team_title",
      DROP COLUMN IF EXISTS "join_team_description",
      DROP COLUMN IF EXISTS "join_team_cta_text";
  `)
  await db.execute(sql`
    ALTER TABLE "company_info"
      DROP CONSTRAINT IF EXISTS "company_info_hero_image_id_media_id_fk",
      DROP COLUMN IF EXISTS "hero_image_id",
      DROP COLUMN IF EXISTS "join_team_cta_url";
  `)
}
