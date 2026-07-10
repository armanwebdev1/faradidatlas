import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let payloadInstance: Payload | null = null
let connectPromise: Promise<Payload> | null = null

async function initPayload(): Promise<Payload> {
  const t = Date.now()
  try {
    const p = await getPayload({ config })
    console.log(`[Payload] initialized in ${Date.now() - t}ms`)
    payloadInstance = p
    return p
  } catch (err) {
    const elapsed = Date.now() - t
    console.error(`[Payload] initialization failed after ${elapsed}ms:`, err)
    payloadInstance = null
    connectPromise = null
    throw err
  }
}

export async function getPayloadClient(): Promise<Payload> {
  if (payloadInstance) return payloadInstance

  if (connectPromise) return connectPromise

  connectPromise = initPayload()
  return connectPromise
}
