'use client'

import React from 'react'
import { useAdminLang, type AdminLang } from '../providers/AdminLang'
import { adminTranslations } from '../i18n'

const languages: { code: AdminLang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
]

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useAdminLang()

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
