import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let payloadInstance: Payload | null = null;
let connectPromise: Promise<Payload> | null = null;

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isConnectionError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("EMAXCONNSESSION") ||
    msg.includes("cannot connect to Postgres") ||
    msg.includes("connection timeout") ||
    msg.includes("ECONNREFUSED") ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("terminating") ||
    msg.includes("Connection terminated")
  );
}

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

  payloadInstance = null;
  connectPromise = null;
  throw lastErr;
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
