'use client'

import React from 'react'
import { AdminLangProvider } from '../providers/AdminLang'

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return <AdminLangProvider>{children}</AdminLangProvider>
}
