import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ============================================================
  // 1. homepage_global_markets: move 'country' from main → locales
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "homepage_global_markets_locales" ADD COLUMN IF NOT EXISTS "country" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "homepage_global_markets_locales" bl
    SET "country" = bs."country"
    FROM "homepage_global_markets" bs
    WHERE bl."_parent_id" = bs."id";
  `)
  await db.execute(sql`
    ALTER TABLE "homepage_global_markets" DROP COLUMN IF EXISTS "country";
  `)

  // ============================================================
  // 2. homepage_hero_slides: add 'cta_text' to locales
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "homepage_hero_slides_locales" ADD COLUMN IF NOT EXISTS "cta_text" varchar;
  `)

  // ============================================================
  // 3. blog_posts: move 'author' from main → locales
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "blog_posts_locales" ADD COLUMN IF NOT EXISTS "author" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "blog_posts_locales" bl
    SET "author" = bp."author"
    FROM "blog_posts" bp
    WHERE bl."_parent_id" = bp."id";
  `)
  await db.execute(sql`
    ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "author";
  `)

  // ============================================================
  // 4. blog_posts_tags: add _locale for localized tag support
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'en';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";`)

  await db.execute(sql`ALTER TABLE "blog_posts" ADD COLUMN "author" varchar NOT NULL DEFAULT '';`)
  await db.execute(sql`
    UPDATE "blog_posts" bp SET "author" = bl."author"
    FROM "blog_posts_locales" bl WHERE bp."id" = bl."_parent_id" AND bl."_locale" = 'en';
  `)
  await db.execute(sql`ALTER TABLE "blog_posts_locales" DROP COLUMN IF EXISTS "author";`)

  await db.execute(sql`ALTER TABLE "homepage_hero_slides_locales" DROP COLUMN IF EXISTS "cta_text";`)

  await db.execute(sql`ALTER TABLE "homepage_global_markets" ADD COLUMN "country" varchar NOT NULL DEFAULT '';`)
  await db.execute(sql`
    UPDATE "homepage_global_markets" bg SET "country" = bl."country"
    FROM "homepage_global_markets_locales" bl WHERE bg."id" = bl."_parent_id" AND bl."_locale" = 'en';
  `)
  await db.execute(sql`ALTER TABLE "homepage_global_markets_locales" DROP COLUMN IF EXISTS "country";`)
}
