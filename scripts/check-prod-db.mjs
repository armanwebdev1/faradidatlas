import pg from 'pg';
import { readFileSync } from 'fs';
const env = readFileSync('.env', 'utf8');
const url = env.match(/^DATABASE_URL=(.+)$/m)[1].trim();
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

// 1. Check migration status
console.log('=== MIGRATION STATUS ===');
const migrations = await client.query(`SELECT id, name, batch, created_at FROM payload_migrations ORDER BY id`);
for (const m of migrations.rows) {
  console.log(`  ${m.id}. ${m.name} (batch ${m.batch}) - ${m.created_at}`);
}

// 2. Check if version_author exists in _blog_posts_v_locales
console.log('\n=== _blog_posts_v_locales COLUMNS ===');
const vLocales = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '_blog_posts_v_locales' ORDER BY ordinal_position`);
for (const c of vLocales.rows) {
  console.log(`  ${c.column_name}: ${c.data_type}`);
}

// 3. Check if version_author exists
const hasVersionAuthor = vLocales.rows.some(r => r.column_name === 'version_author');
console.log(`\nversion_author exists: ${hasVersionAuthor}`);

// 4. Check blog_posts_tags_locales exists
console.log('\n=== blog_posts_tags_locales ===');
const tlCheck = await client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'blog_posts_tags_locales') as exists`);
console.log(`  exists: ${tlCheck.rows[0].exists}`);

// 5. Check _blog_posts_v_version_tags_locales exists
console.log('\n=== _blog_posts_v_version_tags_locales ===');
const vtlCheck = await client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '_blog_posts_v_version_tags_locales') as exists`);
console.log(`  exists: ${vtlCheck.rows[0].exists}`);

await client.end();
