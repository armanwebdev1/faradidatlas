import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // No-op: this migration was a duplicate of 20260717_172600
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op
}
