import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  try {
    await getPayloadClient()
    return NextResponse.json({
      status: 'warm',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[Warmup] Payload initialization failed:', err)
    return NextResponse.json(
      { status: 'error', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
