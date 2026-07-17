import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ============================================================
  // 1. homepage_global_markets: move 'country' from main → locales
  //    Config has country as localized: true, DB has it on main table
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
  // 2. homepage_brand_showcase: move 'brand_name' from main → locales
  //    Config has brandName as localized: true, DB has it on main table
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "homepage_brand_showcase_locales" ADD COLUMN IF NOT EXISTS "brand_name" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "homepage_brand_showcase_locales" bl
    SET "brand_name" = bs."brand_name"
    FROM "homepage_brand_showcase" bs
    WHERE bl."_parent_id" = bs."id";
  `)
  await db.execute(sql`
    ALTER TABLE "homepage_brand_showcase" DROP COLUMN IF EXISTS "brand_name";
  `)

  // ============================================================
  // 3. company_info: move 'ceo_name' from main → locales
  //    Config has ceo.name as localized: true, DB has it on main table
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "company_info_locales" ADD COLUMN IF NOT EXISTS "ceo_name" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "company_info_locales" cl
    SET "ceo_name" = ci."ceo_name"
    FROM "company_info" ci
    WHERE cl."_parent_id" = ci."id";
  `)
  await db.execute(sql`
    ALTER TABLE "company_info" DROP COLUMN IF EXISTS "ceo_name";
  `)

  // ============================================================
  // 4. homepage_hero_slides: add 'cta_text' to locales
  //    Config has ctaText as localized: true, but column never existed
  // ============================================================
  await db.execute(sql`
    ALTER TABLE "homepage_hero_slides_locales" ADD COLUMN IF NOT EXISTS "cta_text" varchar;
  `)

  // ============================================================
  // 5. blog_posts: move 'author' from main → locales
  //    Config has author as localized: true, DB has it on main table
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
  // 6. blog_posts_tags: add locale support for 'tag'
  //    Config has tag as localized: true, but tags table has no locale support
  // ============================================================
  // Add _locale column with a default, then set all existing rows to 'en'
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" ADD COLUMN IF NOT EXISTS "_locale" "_locales" NOT NULL DEFAULT 'en';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse blog_posts_tags
  await db.execute(sql`
    ALTER TABLE "blog_posts_tags" DROP COLUMN IF EXISTS "_locale";
  `)

  // Reverse blog_posts
  await db.execute(sql`
    ALTER TABLE "blog_posts" ADD COLUMN "author" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "blog_posts" bp
    SET "author" = bl."author"
    FROM "blog_posts_locales" bl
    WHERE bp."id" = bl."_parent_id"
    AND bl."_locale" = 'en';
  `)
  await db.execute(sql`
    ALTER TABLE "blog_posts_locales" DROP COLUMN IF EXISTS "author";
  `)

  // Reverse homepage_hero_slides
  await db.execute(sql`
    ALTER TABLE "homepage_hero_slides_locales" DROP COLUMN IF EXISTS "cta_text";
  `)

  // Reverse company_info
  await db.execute(sql`
    ALTER TABLE "company_info" ADD COLUMN "ceo_name" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "company_info" ci
    SET "ceo_name" = cl."ceo_name"
    FROM "company_info_locales" cl
    WHERE ci."id" = cl."_parent_id"
    AND cl."_locale" = 'en';
  `)
  await db.execute(sql`
    ALTER TABLE "company_info_locales" DROP COLUMN IF EXISTS "ceo_name";
  `)

  // Reverse homepage_brand_showcase
  await db.execute(sql`
    ALTER TABLE "homepage_brand_showcase" ADD COLUMN "brand_name" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "homepage_brand_showcase" bs
    SET "brand_name" = bl."brand_name"
    FROM "homepage_brand_showcase_locales" bl
    WHERE bs."id" = bl."_parent_id"
    AND bl."_locale" = 'en';
  `)
  await db.execute(sql`
    ALTER TABLE "homepage_brand_showcase_locales" DROP COLUMN IF EXISTS "brand_name";
  `)

  // Reverse homepage_global_markets
  await db.execute(sql`
    ALTER TABLE "homepage_global_markets" ADD COLUMN "country" varchar NOT NULL DEFAULT '';
  `)
  await db.execute(sql`
    UPDATE "homepage_global_markets" bg
    SET "country" = bl."country"
    FROM "homepage_global_markets_locales" bl
    WHERE bg."id" = bl."_parent_id"
    AND bl."_locale" = 'en';
  `)
  await db.execute(sql`
    ALTER TABLE "homepage_global_markets_locales" DROP COLUMN IF EXISTS "country";
  `)
}
