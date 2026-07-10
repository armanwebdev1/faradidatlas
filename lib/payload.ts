import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let payloadInstance: Payload | null = null
let connecting = false
let connectPromise: Promise<Payload> | null = null

async function initPayload(): Promise<Payload> {
  const t = Date.now()
  try {
    const p = await getPayload({ config })
    console.log(`[Payload] initialized in ${Date.now() - t}ms`)
    payloadInstance = p
    return p
  } catch (err) {
    console.error(`[Payload] initialization failed after ${Date.now() - t}ms:`, err)
    payloadInstance = null
    throw err
  }
}

export async function getPayloadClient(): Promise<Payload> {
  if (payloadInstance) return payloadInstance

  if (connectPromise) return connectPromise

  if (!connecting) {
    connecting = true
    connectPromise = initPayload().finally(() => {
      connecting = false
      connectPromise = null
    })
  }

  return connectPromise!
}
