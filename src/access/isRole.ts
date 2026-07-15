import type { Access, FieldAccess } from 'payload'

export const isRole = (...roles: string[]): Access & FieldAccess => ({ req }) => {
  const user = req.user
  if (!user) return false
  return roles.includes((user as any).role)
}
