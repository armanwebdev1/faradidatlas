'use client'

import React, { useState, useEffect, type ReactNode } from 'react'
import type { AdminLang } from '../i18n'

interface ServerLangReaderProps {
  children: (lang: AdminLang) => ReactNode
}

export function ServerLangReader({ children }: ServerLangReaderProps) {
  const [lang, setLang] = useState<AdminLang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('admin-lang') as AdminLang
    if (stored === 'en' || stored === 'fa') {
      setLang(stored)
    }

    // Listen for storage changes (from LanguageSwitcher)
    const handler = (e: StorageEvent) => {
      if (e.key === 'admin-lang' && (e.newValue === 'en' || e.newValue === 'fa')) {
        setLang(e.newValue)
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return <>{children(lang)}</>
}
