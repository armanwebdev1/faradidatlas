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
    const cols = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'company_info_offerings_locales'
      ORDER BY ordinal_position
    `)

    const parentCols = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'company_info_offerings'
      ORDER BY ordinal_position
    `)

    const fkCheck = await client.query(`
      SELECT tc.constraint_name, kcu.column_name, ccu.table_name AS foreign_table_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
      WHERE tc.table_name = 'company_info_offerings_locales' AND tc.constraint_type = 'FOREIGN KEY'
    `)

    const rowCount = await client.query(`SELECT COUNT(*) FROM "company_info_offerings_locales"`)

    return NextResponse.json({
      localesColumns: cols.rows,
      parentColumns: parentCols.rows,
      foreignKeys: fkCheck.rows,
      rowCount: rowCount.rows[0].count
    })
  } finally {
    await client.end()
  }
}
