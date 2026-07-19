import { NextResponse } from 'next/server'
import { Client } from 'pg'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  try {
    // Check if table exists
    const check = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'company_info_offerings_locales'
      ) as exists
    `)

    if (check.rows[0].exists) {
      return NextResponse.json({ success: true, message: 'Table already exists' })
    }

    // Check what the values locales table looks like for reference
    const valuesCols = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'company_info_values_locales'
      ORDER BY ordinal_position
    `)

    // Create the offerings locales table
    await client.query(`
      CREATE TABLE "company_info_offerings_locales" (
        "id" integer NOT NULL,
        "locale" varchar NOT NULL,
        "title" varchar NOT NULL,
        "description" varchar,
        CONSTRAINT "company_info_offerings_locales_pkey" PRIMARY KEY ("id", "locale")
      )
    `)

    // Add FK to parent array table
    await client.query(`
      ALTER TABLE "company_info_offerings_locales" 
      ADD CONSTRAINT "company_info_offerings_locales_id_fk" 
      FOREIGN KEY ("id") REFERENCES "company_info_offerings"("id") ON DELETE CASCADE
    `)

    return NextResponse.json({ 
      success: true, 
      message: 'Created company_info_offerings_locales table',
      valuesColumns: valuesCols.rows
    })
  } finally {
    await client.end()
  }
}
