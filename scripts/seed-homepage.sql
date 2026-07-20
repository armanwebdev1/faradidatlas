-- ============================================================
-- Seed Homepage CMS — Section-level fields & array data
-- Run this against your Neon/PostgreSQL database directly.
-- ============================================================

-- 0. Ensure homepage row exists
INSERT INTO "homepage" ("id", "cta_button_url", "updated_at", "created_at")
VALUES (1, '/en/contact', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- ============================================================
-- 1. Add new section columns to homepage_locales (if missing)
-- ============================================================
ALTER TABLE "homepage_locales"
  ADD COLUMN IF NOT EXISTS "value_props_section_eyebrow" varchar,
  ADD COLUMN IF NOT EXISTS "value_props_section_title" varchar,
  ADD COLUMN IF NOT EXISTS "value_props_section_description" varchar,
  ADD COLUMN IF NOT EXISTS "brands_section_eyebrow" varchar,
  ADD COLUMN IF NOT EXISTS "brands_section_title" varchar,
  ADD COLUMN IF NOT EXISTS "brands_section_description" varchar,
  ADD COLUMN IF NOT EXISTS "markets_section_eyebrow" varchar,
  ADD COLUMN IF NOT EXISTS "markets_section_title" varchar,
  ADD COLUMN IF NOT EXISTS "markets_section_description" varchar;

-- Add banner image FK to homepage table (non-localized)
ALTER TABLE "homepage"
  ADD COLUMN IF NOT EXISTS "brands_section_banner_image_id" integer;

-- ============================================================
-- 2. Seed section text for each locale
-- ============================================================

-- English
UPDATE "homepage_locales" SET
  "value_props_section_eyebrow" = 'Why Faradid Atlas',
  "value_props_section_title" = 'Built for Continuity, Quality, and Trust',
  "value_props_section_description" = 'Our work is practical — we connect reliable suppliers with buyers who depend on consistent quality and timely delivery.',
  "brands_section_eyebrow" = 'Our Brands',
  "brands_section_title" = 'Trusted names in food distribution',
  "brands_section_description" = 'Faradid Atlas works with established brands that are recognized across regional markets for quality and reliability.',
  "markets_section_eyebrow" = 'Supply Footprint',
  "markets_section_title" = 'Regional Reach',
  "markets_section_description" = 'Our network spans key markets across Iran, UAE, and Oman — built for consistent supply and trusted partnerships.'
WHERE "_locale" = 'en';

-- Persian
UPDATE "homepage_locales" SET
  "value_props_section_eyebrow" = 'چرا فرادید اطلس',
  "value_props_section_title" = 'ساخته شده برای استمرار، کیفیت و اعتماد',
  "value_props_section_description" = 'کار ما عملی است — تأمین‌کنندگان معتبر را به خریدارانی متصل می‌کنیم که به کیفیت ثابت و تحویل به‌موقع وابسته‌اند.',
  "brands_section_eyebrow" = 'برندهای ما',
  "brands_section_title" = 'نام‌های معتبر در توزیع مواد غذایی',
  "brands_section_description" = 'فرادید اطلس با برندهای معتبری همکاری می‌کند که در بازارهای منطقه‌ای به کیفیت و قابلیت اطمینان شناخته شده‌اند.',
  "markets_section_eyebrow" = 'ردپای تأمین',
  "markets_section_title" = 'دسترسی منطقه‌ای',
  "markets_section_description" = 'شبکه ما بازارهای کلیدی در ایران، امارات و عمان را پوشش می‌دهد — ساخته شده برای تأمین ثابت و مشارکت‌های مورد اعتماد.'
WHERE "_locale" = 'fa';

-- ============================================================
-- 3. Seed Value Props array (4 items)
-- ============================================================
-- Only insert if the array is currently empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "homepage_value_props" WHERE "_parent_id" = 1) THEN
    -- Item 1: Globe
    INSERT INTO "homepage_value_props" ("_order", "_parent_id", "id", "icon", "is_active")
    VALUES (0, 1, 'vp1', 'Globe', true);
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('Direct Global Sourcing', 'First-tier supplier relationships in key food-producing markets, including India and Pakistan.', 'en', 'vp1');
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('تأمین مستقیم از مبدا', 'با تأمین‌کنندگان معتبر در بازارهای اصلی تولید غذا، از جمله چین، هند، و پاکستان، همکاری می‌کنیم.', 'fa', 'vp1');

    -- Item 2: CheckCircle
    INSERT INTO "homepage_value_props" ("_order", "_parent_id", "id", "icon", "is_active")
    VALUES (1, 1, 'vp2', 'CheckCircle', true);
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('Quality Before Volume', 'Products are selected against international hygiene and quality standards such as ISO 22000.', 'en', 'vp2');
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('کیفیت؛ شرط اول همکاری', 'پیش از هر همکاری، محصول از نظر سلامت، کیفیت و ثبات بررسی می‌شود.', 'fa', 'vp2');

    -- Item 3: Route
    INSERT INTO "homepage_value_props" ("_order", "_parent_id", "id", "icon", "is_active")
    VALUES (2, 1, 'vp3', 'Route', true);
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('Stable Supply Channels', 'Regional branches, offices, and warehouses support continuous supply for B2B buyers.', 'en', 'vp3');
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('تأمین منظم برای خرید عمده', 'با شبکه منطقه‌ای دفتر، شعبه و انبار، سفارش‌های عمده و سازمانی را پشتیبانی می‌کنیم.', 'fa', 'vp3');

    -- Item 4: Package
    INSERT INTO "homepage_value_props" ("_order", "_parent_id", "id", "icon", "is_active")
    VALUES (3, 1, 'vp4', 'Package', true);
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('Accessible Buyer Channels', 'Offices, regional operations, and digital sales channels support individuals, wholesalers, organizations, and foodservice buyers.', 'en', 'vp4');
    INSERT INTO "homepage_value_props_locales" ("title", "description", "_locale", "_parent_id")
    VALUES ('مسیر ساده‌تر برای خرید', 'از تماس حضوری تا فروش دیجیتال، مسیر خرید را ساده و سریع نگه می‌داریم.', 'fa', 'vp4');
  END IF;
END $$;

-- ============================================================
-- 4. Seed Brand Showcase array (4 brands)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "homepage_brand_showcase" WHERE "_parent_id" = 1) THEN
    INSERT INTO "homepage_brand_showcase" ("_order", "_parent_id", "id", "is_active")
    VALUES (0, 1, 'bs1', true);
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('Hayat', 'Premium rice brand', 'en', 'bs1');
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('حیات', 'برند برنج باکیفیت', 'fa', 'bs1');

    INSERT INTO "homepage_brand_showcase" ("_order", "_parent_id", "id", "is_active")
    VALUES (1, 1, 'bs2', true);
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('Golbanoo', 'Trusted rice brand', 'en', 'bs2');
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('گلبانو', 'برند برنج معتبر', 'fa', 'bs2');

    INSERT INTO "homepage_brand_showcase" ("_order", "_parent_id", "id", "is_active")
    VALUES (2, 1, 'bs3', true);
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('Twenty One', 'Popular rice brand', 'en', 'bs3');
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('۲۱', 'برند برنج محبوب', 'fa', 'bs3');

    INSERT INTO "homepage_brand_showcase" ("_order", "_parent_id", "id", "is_active")
    VALUES (3, 1, 'bs4', true);
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('Mizban', 'Quality rice brand', 'en', 'bs4');
    INSERT INTO "homepage_brand_showcase_locales" ("brand_name", "description", "_locale", "_parent_id")
    VALUES ('میزبان', 'برند برنج باکیفیت', 'fa', 'bs4');
  END IF;
END $$;

-- ============================================================
-- 5. Seed Global Markets array (4 items)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "homepage_global_markets" WHERE "_parent_id" = 1) THEN
    INSERT INTO "homepage_global_markets" ("_order", "_parent_id", "id", "value", "is_active")
    VALUES (0, 1, 'gm1', 4, true);
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('Recognized Rice Brands', '21, Mizban, Hayat, and Golbanou', 'en', 'gm1');
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('برندهای معتبر برنج', '۲۱، میزبان، حیات و گلبانو', 'fa', 'gm1');

    INSERT INTO "homepage_global_markets" ("_order", "_parent_id", "id", "value", "is_active")
    VALUES (1, 1, 'gm2', 4, true);
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('Offices & Regional Presence', 'Tehran, Isfahan, Dubai, and Oman', 'en', 'gm2');
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('دفاتر شرکت', 'تهران، اصفهان، دبی و عمان', 'fa', 'gm2');

    INSERT INTO "homepage_global_markets" ("_order", "_parent_id", "id", "value", "is_active")
    VALUES (2, 1, 'gm3', 30, true);
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('Key Sourcing Origins', 'Direct sourcing focus across India and Pakistan', 'en', 'gm3');
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('مسیر تأمین', 'تمرکز بر تأمین مستقیم از مبدأهای معتبر مانند هند و پاکستان', 'fa', 'gm3');

    INSERT INTO "homepage_global_markets" ("_order", "_parent_id", "id", "value", "is_active")
    VALUES (3, 1, 'gm4', 25, true);
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('Product Portfolio', 'Rice, legumes, seeds, nuts, spices, and sugar', 'en', 'gm4');
    INSERT INTO "homepage_global_markets_locales" ("country", "description", "_locale", "_parent_id")
    VALUES ('گروه کالایی', 'از برنج و حبوبات تا آجیل، خشکبار، ادویه‌جات، و شکر', 'fa', 'gm4');
  END IF;
END $$;
