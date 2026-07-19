export async function up({ payload }: { payload: any }) {
  await payload.db.drizzle.execute(`
    ALTER TABLE "products_locales" ADD COLUMN "how_we_supply_description" varchar;
  `)
  await payload.db.drizzle.execute(`
    ALTER TABLE "_products_v_locales" ADD COLUMN "version_how_we_supply_description" varchar;
  `)
}

export async function down({ payload }: { payload: any }) {
  await payload.db.drizzle.execute(`
    ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "how_we_supply_description";
  `)
  await payload.db.drizzle.execute(`
    ALTER TABLE "_products_v_locales" DROP COLUMN IF EXISTS "version_how_we_supply_description";
  `)
}
