'use client'

import React, { useState, useEffect } from 'react'
import type { AdminLang } from '../i18n'

const languages: { code: AdminLang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
]

export const LanguageSwitcher: React.FC = () => {
  const [lang, setLangState] = useState<AdminLang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('admin-lang') as AdminLang
    if (stored === 'en' || stored === 'fa') setLangState(stored)
  }, [])

  const setLang = (newLang: AdminLang) => {
    setLangState(newLang)
    localStorage.setItem('admin-lang', newLang)
    window.location.reload()
  }

  return (
    <div style={{ display: 'flex', gap: '2px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--theme-elevation-150)' }}>
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.625rem',
            fontSize: '0.75rem',
            fontWeight: lang === l.code ? 600 : 400,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s',
            background: lang === l.code ? 'var(--theme-elevation-100)' : 'transparent',
            color: lang === l.code ? 'var(--theme-elevation-800)' : 'var(--theme-elevation-450)',
            fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: '0.875rem' }}>{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  )
}
