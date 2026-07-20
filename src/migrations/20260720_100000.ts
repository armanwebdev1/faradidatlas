import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Drop stale columns from company_info_locales that no longer exist in config.
  // ceo_title is the primary blocker — it was created as NOT NULL but the field
  // was removed from the CompanyInfo global config, so every save fails.
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      DROP COLUMN IF EXISTS "ceo_title",
      DROP COLUMN IF EXISTS "ceo_connector_word",
      DROP COLUMN IF EXISTS "about",
      DROP COLUMN IF EXISTS "mission",
      DROP COLUMN IF EXISTS "vision";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore the dropped columns (data is lost — this is a best-effort rollback).
  await db.execute(sql`
    ALTER TABLE "company_info_locales"
      ADD COLUMN IF NOT EXISTS "ceo_title" varchar NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS "ceo_connector_word" varchar,
      ADD COLUMN IF NOT EXISTS "about" jsonb,
      ADD COLUMN IF NOT EXISTS "mission" varchar,
      ADD COLUMN IF NOT EXISTS "vision" varchar;
  `)
}
