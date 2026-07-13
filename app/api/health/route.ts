import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  const result: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || 'unknown',
  }

  // Check Payload / database connectivity
  try {
    const payload = await getPayloadClient()
    await payload.find({ collection: 'users', limit: 1 })
    result.database = 'connected'
    result.payload = 'ok'
  } catch (err) {
    result.status = 'degraded'
    result.database = 'error'
    result.payload = 'error'
  }

  const statusCode = result.status === 'ok' ? 200 : 503
  return NextResponse.json(result, { status: statusCode })
}
