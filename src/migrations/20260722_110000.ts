import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // The homepage_signature_products_locales table was missing from the original
  // migration (20260706_172937) even though signatureProducts has localized fields.
  // DrizzleKit's push: true created the table but WITHOUT the "id" serial PRIMARY KEY
  // that Payload's runtime schema always expects (hardcoded in @payloadcms/drizzle
  // build.js lines 95-99). This causes every save to fail with:
  //   column "id" of relation "homepage_signature_products_locales" does not exist

  // Check if the table exists at all
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
      // Drop any existing primary key constraint first — DrizzleKit may have
      // created the table with a different PK, which blocks adding id as PK
      const existingPk = await db.execute(sql`
        SELECT conname FROM pg_constraint
        WHERE conrelid = 'homepage_signature_products_locales'::regclass
          AND contype = 'p'
      `)
      for (const row of existingPk.rows) {
        await db.execute(sql`
          ALTER TABLE "homepage_signature_products_locales"
            DROP CONSTRAINT ${sql.identifier(row.conname as string)}
        `)
      }

      // Now add the missing id column as serial PRIMARY KEY
      await db.execute(sql`
        ALTER TABLE "homepage_signature_products_locales"
          ADD COLUMN "id" serial PRIMARY KEY
      `)
    } else {
      // id column exists — verify it's the PRIMARY KEY
      const isPk = await db.execute(sql`
        SELECT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conrelid = 'homepage_signature_products_locales'::regclass
            AND contype = 'p'
            AND array_length(conkey, 1) = 1
            AND conkey @> ARRAY[(SELECT attnum FROM pg_attribute
                WHERE attrelid = 'homepage_signature_products_locales'::regclass
                  AND attname = 'id')]
        ) as exists
      `)

      if (!isPk.rows[0]?.exists) {
        // id exists but isn't the sole PK — fix it
        const oldPk = await db.execute(sql`
          SELECT conname FROM pg_constraint
          WHERE conrelid = 'homepage_signature_products_locales'::regclass
            AND contype = 'p'
        `)
        for (const row of oldPk.rows) {
          await db.execute(sql`
            ALTER TABLE "homepage_signature_products_locales"
              DROP CONSTRAINT ${sql.identifier(row.conname as string)}
          `)
        }
        await db.execute(sql`
          ALTER TABLE "homepage_signature_products_locales"
            ADD PRIMARY KEY ("id")
        `)
      }
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
