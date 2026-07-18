import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create the missing blog_posts_tags_locales table
  // Payload expects this table for localized fields inside the tags array
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_posts_tags_locales" (
      "id" serial PRIMARY KEY,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL,
      "tag" varchar
    );
  `)

  // Add foreign key
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blog_posts_tags_locales"
        ADD CONSTRAINT "blog_posts_tags_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "blog_posts_tags"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // Add unique constraint on (_locale, _parent_id)
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_tags_locales_locale_parent_id_unique"
      ON "blog_posts_tags_locales" USING btree ("_locale", "_parent_id");
  `)

  // Migrate existing tag data: for each tag row, insert en locale row
  // with the tag value from the blog_posts_tags table
  await db.execute(sql`
    INSERT INTO "blog_posts_tags_locales" ("_locale", "_parent_id", "tag")
    SELECT 'en', "id", "tag"
    FROM "blog_posts_tags"
    ON CONFLICT DO NOTHING;
  `)

  // Remove the _locale column from blog_posts_tags since it belongs in the locales table
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: add _locale back to blog_posts_tags
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'en';
  `)
  // Drop the locales table
  await db.execute(sql`DROP TABLE IF EXISTS "blog_posts_tags_locales" CASCADE;`)
}
