'use client'

import React, { useState, useEffect } from 'react'
import { getAdminTranslation, type AdminLang } from '../i18n'

interface TranslationInfo {
  collection: string
  total: number
  translated: Record<string, number>
}

export const TranslationStatus: React.FC = () => {
  const [lang, setLang] = useState<AdminLang>('en')
  const [data, setData] = useState<TranslationInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin-lang') as AdminLang
    if (stored === 'en' || stored === 'fa') setLang(stored)
  }, [])

  const t = (key: string, params?: Record<string, string | number>) =>
    getAdminTranslation(lang, key, params)

  useEffect(() => {
    const fetchTranslationStatus = async () => {
      try {
        const collections = ['products', 'blog-posts', 'jobs']
        const results: TranslationInfo[] = []

        for (const collection of collections) {
          const res = await fetch(`/api/${collection}?limit=0&depth=0&locale=all`)
          if (!res.ok) continue
          const json = await res.json()
          const total = json.totalDocs || 0

          // Count docs with each locale
          const translated: Record<string, number> = { en: 0, fa: 0, ar: 0 }
          if (json.docs) {
            for (const doc of json.docs) {
              for (const locale of ['en', 'fa', 'ar']) {
                const titleField = doc.title || doc.name || doc.question
                if (titleField && typeof titleField === 'object' && titleField[locale]) {
                  translated[locale]++
                } else if (typeof titleField === 'string' && locale === 'en') {
                  translated[locale]++
                }
              }
            }
          }

          results.push({ collection, total, translated })
        }

        setData(results)
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false)
      }
    }

    fetchTranslationStatus()
  }, [])

  if (isLoading || data.length === 0) return null

  const collectionLabels: Record<string, string> = {
    products: t('translation.products'),
    'blog-posts': t('translation.blog'),
    jobs: t('translation.jobs'),
  }

  const localeInfo = [
    { code: 'en', label: 'EN', color: '#22c55e' },
    { code: 'fa', label: 'FA', color: '#3b82f6' },
    { code: 'ar', label: 'AR', color: '#f59e0b' },
  ]

  return (
    <div style={{
      padding: '1.25rem 1.5rem',
      border: '1px solid var(--theme-elevation-100)',
      borderRadius: '10px',
      background: 'var(--theme-elevation-0)',
    }}>
      <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
        {t('translation.title')}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {data.map((item) => (
          <div key={item.collection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{collectionLabels[item.collection] || item.collection}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--theme-elevation-400)' }}>{t('translation.items', { n: item.total })}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {localeInfo.map((locale) => {
                const count = item.translated[locale.code] || 0
                const pct = item.total > 0 ? Math.round((count / item.total) * 100) : 0
                return (
                  <div
                    key={locale.code}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: pct === 100 ? 'var(--theme-elevation-600)' : 'var(--theme-elevation-400)',
                    }}
                  >
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: pct === 100 ? locale.color : 'var(--theme-elevation-200)',
                    }} />
                    <span>{locale.label} {pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
