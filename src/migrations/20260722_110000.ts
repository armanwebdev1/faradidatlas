import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // The homepage_signature_products_locales table was missing from the original
  // migration (20260706_172937) even though signatureProducts has localized fields
  // (eyebrow, title, description). The push: true setting likely created the table
  // in production but without the "id" column, causing save failures.
  //
  // Fix: create the table properly if it doesn't exist, or add the missing "id"
  // column if the table exists but is malformed.

  // First check if the table exists at all
  const tableExists = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = 'homepage_signature_products_locales'
    ) as exists
  `)

  const exists = tableExists.rows[0]?.exists as boolean

  if (!exists) {
    // Table doesn't exist — create it from scratch
    await db.execute(sql`
      CREATE TABLE "homepage_signature_products_locales" (
        "eyebrow" varchar,
        "title" varchar,
        "description" varchar,
        "id" serial PRIMARY KEY NOT NULL,
        "_locale" "_locales" NOT NULL,
        "_parent_id" varchar NOT NULL
      );
    `)
  } else {
    // Table exists but may be missing the "id" column
    const hasId = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'homepage_signature_products_locales'
          AND column_name = 'id'
      ) as exists
    `)

    if (!hasId.rows[0]?.exists) {
      // Add the missing id column
      await db.execute(sql`
        ALTER TABLE "homepage_signature_products_locales"
          ADD COLUMN "id" serial PRIMARY KEY;
      `)
    }
  }

  // Ensure foreign key exists
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "homepage_signature_products_locales"
        ADD CONSTRAINT "homepage_signature_products_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "homepage_signature_products"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // Ensure unique index on (_locale, _parent_id)
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "homepage_signature_products_locales_locale_parent_id_unique"
      ON "homepage_signature_products_locales" USING btree ("_locale", "_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "homepage_signature_products_locales" CASCADE;
  `)
}
