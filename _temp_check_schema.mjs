import { Client } from 'pg';

const DATABASE_URL = 'postgresql://neondb_owner:npg_CEAFkwDL0q8u@ep-wispy-block-atyelhfw.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: DATABASE_URL });

async function run() {
  try {
    await client.connect();
    console.log('=== Connected to PostgreSQL ===');

    // 1. Check if blog_posts exists
    console.log('\n=== 1. Does blog_posts table exist? ===');
    const bpCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'blog_posts'
      );
    `);
    console.log('blog_posts exists:', bpCheck.rows[0].exists);

    // 2. blog_posts columns
    console.log('\n=== 2. blog_posts columns ===');
    const bpCols = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'blog_posts'
      ORDER BY ordinal_position;
    `);
    for (const row of bpCols.rows) {
      console.log(`  ${row.column_name} | ${row.data_type} | nullable=${row.is_nullable} | default=${row.column_default}`);
    }

    // 3. blog_posts_locales
    console.log('\n=== 3. blog_posts_locales ===');
    const bpLocCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'blog_posts_locales'
      );
    `);
    console.log('blog_posts_locales exists:', bpLocCheck.rows[0].exists);
    if (bpLocCheck.rows[0].exists) {
      const bpLocCols = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'blog_posts_locales'
        ORDER BY ordinal_position;
      `);
      for (const row of bpLocCols.rows) {
        console.log(`  ${row.column_name} | ${row.data_type} | nullable=${row.is_nullable} | default=${row.column_default}`);
      }
    }

    // 4. blog_posts_tags
    console.log('\n=== 4. blog_posts_tags ===');
    const bpTagCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'blog_posts_tags'
      );
    `);
    console.log('blog_posts_tags exists:', bpTagCheck.rows[0].exists);
    if (bpTagCheck.rows[0].exists) {
      const bpTagCols = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'blog_posts_tags'
        ORDER BY ordinal_position;
      `);
      for (const row of bpTagCols.rows) {
        console.log(`  ${row.column_name} | ${row.data_type} | nullable=${row.is_nullable} | default=${row.column_default}`);
      }
    }

    // 5. payload_migrations
    console.log('\n=== 5. payload_migrations ===');
    const migCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'payload_migrations'
      );
    `);
    console.log('payload_migrations exists:', migCheck.rows[0].exists);
    if (migCheck.rows[0].exists) {
      const migrations = await client.query('SELECT * FROM public.payload_migrations ORDER BY created_at ASC;');
      for (const row of migrations.rows) {
        console.log(`  ${JSON.stringify(row)}`);
      }
    }

    // 6. List all public tables
    console.log('\n=== 6. All public tables ===');
    const allTables = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name;
    `);
    for (const row of allTables.rows) {
      console.log(`  ${row.table_name}`);
    }

  } catch (err) {
    console.error('ERROR:', err.message);
    console.error(err.stack);
  } finally {
    await client.end();
  }
}

run();
