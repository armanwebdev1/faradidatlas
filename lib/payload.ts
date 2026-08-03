import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let payloadInstance: Payload | null = null;
let connectPromise: Promise<Payload> | null = null;

async function initPayload(): Promise<Payload> {
  try {
    const p = await getPayload({ config });
    payloadInstance = p;
    return p;
  } catch (err) {
    payloadInstance = null;
    connectPromise = null;
    throw err;
  }
}

export async function getPayloadClient(): Promise<Payload> {
  if (payloadInstance) return payloadInstance;
  if (connectPromise) return connectPromise;

  connectPromise = initPayload().catch((err) => {
    connectPromise = null;
    throw err;
  });

  return connectPromise;
}
