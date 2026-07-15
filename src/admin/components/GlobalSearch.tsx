'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useAdminLang } from '../providers/AdminLang'

interface SearchResult {
  id: string
  title: string
  type: string
  collection: string
  href: string
}

export const GlobalSearch: React.FC = () => {
  const { t } = useAdminLang()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const collections = ['products', 'blog-posts', 'jobs', 'downloads', 'certificates']
      const searchPromises = collections.map(async (collection) => {
        try {
          const res = await fetch(`/api/${collection}?where[or][0][title][contains]=${encodeURIComponent(q)}&where[or][1][name][contains]=${encodeURIComponent(q)}&limit=3&depth=0`)
          if (!res.ok) return []
          const data = await res.json()
          return (data.docs || []).map((doc: any) => ({
            id: doc.id,
            title: doc.title || doc.name || doc.question || 'Untitled',
            type: collection.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
            collection,
            href: `/admin/collections/${collection}/${doc.id}`,
          }))
        } catch {
          return []
        }
      })

      const allResults = await Promise.all(searchPromises)
      setResults(allResults.flat().slice(0, 10))
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) search(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, search])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '6px',
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          fontSize: '0.8125rem',
          cursor: 'text',
        }}
        onClick={() => { inputRef.current?.focus(); setIsOpen(true) }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--theme-elevation-400)', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('search.placeholder')}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '0.8125rem',
            color: 'var(--theme-elevation-800)',
            width: '100%',
            fontFamily: 'inherit',
          }}
        />
        <kbd style={{
          fontSize: '0.6875rem',
          color: 'var(--theme-elevation-400)',
          background: 'var(--theme-elevation-100)',
          padding: '0.125rem 0.375rem',
          borderRadius: '3px',
          fontFamily: 'inherit',
          flexShrink: 0,
        }}>
          Ctrl+K
        </kbd>
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: 'var(--theme-elevation-0)',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxHeight: '320px',
          overflow: 'auto',
          zIndex: 1000,
        }}>
          {isLoading && (
            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--theme-elevation-400)', fontSize: '0.8125rem' }}>
              {t('search.searching')}
            </div>
          )}
          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--theme-elevation-400)', fontSize: '0.8125rem' }}>
              {t('search.noResults')}
            </div>
          )}
          {!isLoading && results.map((result) => (
            <a
              key={`${result.collection}-${result.id}`}
              href={result.href}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.625rem 0.875rem',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid var(--theme-elevation-50)',
                fontSize: '0.8125rem',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-50)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontWeight: 500 }}>{result.title}</span>
              <span style={{ color: 'var(--theme-elevation-400)', fontSize: '0.75rem' }}>{result.type}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
