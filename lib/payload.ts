import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let payloadPromise: Promise<Payload> | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) {
    const t = Date.now()
    payloadPromise = getPayload({ config }).then((p) => {
      console.log(`[Payload] initialized in ${Date.now() - t}ms`)
      return p
    })
  }
  return payloadPromise
}
