'use client'

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type AdminLang, getAdminTranslation } from '../i18n'

interface AdminLangContextValue {
  lang: AdminLang
  setLang: (lang: AdminLang) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const AdminLangContext = createContext<AdminLangContextValue | null>(null)

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<AdminLang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('admin-lang') as AdminLang) || 'en'
    }
    return 'en'
  })

  const handleSetLang = useCallback((newLang: AdminLang) => {
    setLang(newLang)
    localStorage.setItem('admin-lang', newLang)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      getAdminTranslation(lang, key, params),
    [lang],
  )

  return (
    <AdminLangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </AdminLangContext.Provider>
  )
}

export function useAdminLang() {
  const ctx = useContext(AdminLangContext)
  if (!ctx) throw new Error('useAdminLang must be used within AdminLangProvider')
  return ctx
}
