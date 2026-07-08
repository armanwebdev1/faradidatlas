import { getPayload } from 'payload'
import config from '@payload-config'

let callNum = 0

export async function getPayloadClient() {
  callNum++
  const id = callNum
  const t = Date.now()
  console.log(`\n[INSTR] #${id} getPayloadClient ENTER`)
  const result = await getPayload({ config })
  console.log(`[INSTR] #${id} getPayloadClient EXIT  ${Date.now() - t}ms`)
  return result
}
