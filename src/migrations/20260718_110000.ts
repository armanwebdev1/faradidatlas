import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ============================================================
  // Fix: Create missing _locales tables for localized array fields
  //
  // Root cause: The 'tag' field inside the 'tags' array is
  // localized: true, but no migration ever created the separate
  // _locales tables that Payload's drizzle plugin expects.
  //
  // Migration 20260717_172600 incorrectly added _locale directly
  // to blog_posts_tags. Payload needs separate _locales tables.
  //
  // This migration:
  //   1. Creates blog_posts_tags_locales (main collection)
  //   2. Creates _blog_posts_v_version_tags_locales (version history)
  //   3. Migrates existing data from the incorrect _locale columns
  //   4. Removes the incorrect _locale columns from main tables
  // ============================================================

  // --- Step 1: Create blog_posts_tags_locales ---
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_posts_tags_locales" CASCADE;
  `)

  await db.execute(sql`
    CREATE TABLE "blog_posts_tags_locales" (
      "id" serial PRIMARY KEY,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      "tag" varchar
    );
  `)

  await db.execute(sql`
    ALTER TABLE "blog_posts_tags_locales"
      ADD CONSTRAINT "blog_posts_tags_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_tags"("id")
      ON DELETE cascade ON UPDATE no action;
  `)

  await db.execute(sql`
    CREATE UNIQUE INDEX "blog_posts_tags_locales_locale_parent_id_unique"
      ON "blog_posts_tags_locales" USING btree ("_locale", "_parent_id");
  `)

  // Migrate existing data: create 'en' locale rows from current tag values
  await db.execute(sql`
    INSERT INTO "blog_posts_tags_locales" ("_locale", "_parent_id", "tag")
    SELECT 'en', "id", "tag" FROM "blog_posts_tags"
    ON CONFLICT DO NOTHING;
  `)

  // Remove incorrect _locale column from blog_posts_tags
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";
  `)

  // --- Step 2: Create _blog_posts_v_version_tags_locales ---
  await db.execute(sql`
    DROP TABLE IF EXISTS "_blog_posts_v_version_tags_locales" CASCADE;
  `)

  await db.execute(sql`
    CREATE TABLE "_blog_posts_v_version_tags_locales" (
      "id" serial PRIMARY KEY,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL,
      "tag" varchar
    );
  `)

  await db.execute(sql`
    ALTER TABLE "_blog_posts_v_version_tags_locales"
      ADD CONSTRAINT "_blog_posts_v_version_tags_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_blog_posts_v_version_tags"("id")
      ON DELETE cascade ON UPDATE no action;
  `)

  await db.execute(sql`
    CREATE UNIQUE INDEX "_blog_posts_v_version_tags_locales_locale_parent_id_unique"
      ON "_blog_posts_v_version_tags_locales" USING btree ("_locale", "_parent_id");
  `)

  // Migrate existing version tag data
  await db.execute(sql`
    INSERT INTO "_blog_posts_v_version_tags_locales" ("_locale", "_parent_id", "tag")
    SELECT 'en', "id", "tag" FROM "_blog_posts_v_version_tags"
    ON CONFLICT DO NOTHING;
  `)

  // Remove incorrect _locale column from version tags if it exists
  await db.execute(sql`
    ALTER TABLE "_blog_posts_v_version_tags" DROP COLUMN IF EXISTS "_locale";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: add _locale back to main tables
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'en';
  `)
  await db.execute(sql`
    ALTER TABLE "_blog_posts_v_version_tags" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'en';
  `)

  // Drop the correct _locales tables
  await db.execute(sql`DROP TABLE IF EXISTS "_blog_posts_v_version_tags_locales" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "blog_posts_tags_locales" CASCADE;`)
}
