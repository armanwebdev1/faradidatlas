import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  return NextResponse.json({ ok: true, message: 'test route works' })
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'test GET works' })
}
