import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add missing version_author to _blog_posts_v_locales
  // When 'author' was made localized: true, the column was added to
  // blog_posts_locales but NOT to _blog_posts_v_locales
  await db.execute(sql`
    ALTER TABLE "_blog_posts_v_locales"
      ADD COLUMN IF NOT EXISTS "version_author" varchar NOT NULL DEFAULT '';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_blog_posts_v_locales" DROP COLUMN IF EXISTS "version_author";
  `)
}
