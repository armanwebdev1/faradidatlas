'use client'

import React, { useState, useEffect } from 'react'
import { getAdminTranslation, type AdminLang } from '../i18n'
import { TranslationStatus } from './TranslationStatus'

const card: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid var(--theme-elevation-100)',
  borderRadius: '10px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  display: 'block',
  background: 'var(--theme-elevation-0)',
}

const statCard: React.CSSProperties = {
  padding: '1.25rem 1.5rem',
  borderRadius: '10px',
  backgroundColor: 'var(--theme-elevation-0)',
  border: '1px solid var(--theme-elevation-100)',
  transition: 'border-color 0.15s',
}

const quickActionBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--theme-elevation-150)',
  background: 'var(--theme-elevation-0)',
  color: 'var(--theme-elevation-800)',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'border-color 0.15s, background 0.15s',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const useViewport = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

const grid = (minWidth = 180): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
  gap: '0.75rem',
})

interface CountResult {
  totalDocs: number
}

interface RecentItem {
  typeKey: string
  name: string
  updatedAt: string
  href: string
  status?: string
}

function timeAgo(dateStr: string, lang: AdminLang): string {
  const t = (key: string, params?: Record<string, string | number>) => getAdminTranslation(lang, key, params)
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return t('recent.justNow')
  if (mins < 60) return t('recent.minutesAgo', { n: mins })
  const hours = Math.floor(mins / 60)
  if (hours < 24) return t('recent.hoursAgo', { n: hours })
  const days = Math.floor(hours / 24)
  if (days < 7) return t('recent.daysAgo', { n: days })
  return new Date(dateStr).toLocaleDateString()
}

const PlusIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const CustomDashboard: React.FC = () => {
  const viewportWidth = useViewport()
  const isMobile = viewportWidth < 768
  const [lang, setLang] = useState<AdminLang>('en')
  const [counts, setCounts] = useState({ products: 0, blogPosts: 0, jobs: 0, downloads: 0, certificates: 0, categories: 0, faqs: 0, media: 0, total: 0 })
  const [recentEdits, setRecentEdits] = useState<RecentItem[]>([])
  const [draftCount, setDraftCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('admin-lang') as AdminLang
    if (stored === 'en' || stored === 'fa') setLang(stored)
  }, [])

  const t = (key: string, params?: Record<string, string | number>) =>
    getAdminTranslation(lang, key, params)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, blogRes, jobsRes, downloadsRes, certsRes, catsRes, faqsRes, mediaRes] = await Promise.all([
          fetch('/api/products?limit=0&depth=0'),
          fetch('/api/blog-posts?limit=0&depth=0'),
          fetch('/api/jobs?limit=0&depth=0'),
          fetch('/api/downloads?limit=0&depth=0'),
          fetch('/api/certificates?limit=0&depth=0'),
          fetch('/api/categories?limit=0&depth=0'),
          fetch('/api/faqs?limit=0&depth=0'),
          fetch('/api/media?limit=0&depth=0'),
        ])

        const getCount = async (res: Response) => {
          if (!res.ok) return 0
          const data = await res.json()
          return data.totalDocs || 0
        }

        const [products, blogPosts, jobs, downloads, certificates, categories, faqs, media] = await Promise.all([
          getCount(productsRes),
          getCount(blogRes),
          getCount(jobsRes),
          getCount(downloadsRes),
          getCount(certsRes),
          getCount(catsRes),
          getCount(faqsRes),
          getCount(mediaRes),
        ])

        setCounts({ products, blogPosts, jobs, downloads, certificates, categories, faqs, media, total: products + blogPosts + jobs + downloads + certificates + categories + faqs })

        // Recent edits
        const [recentProducts, recentJobs, recentBlogs, recentDownloads] = await Promise.all([
          fetch('/api/products?limit=3&sort=-updatedAt').then(r => r.ok ? r.json() : { docs: [] }),
          fetch('/api/jobs?limit=2&sort=-updatedAt').then(r => r.ok ? r.json() : { docs: [] }),
          fetch('/api/blog-posts?limit=3&sort=-updatedAt').then(r => r.ok ? r.json() : { docs: [] }),
          fetch('/api/downloads?limit=2&sort=-updatedAt').then(r => r.ok ? r.json() : { docs: [] }),
        ])

        const items: RecentItem[] = [
          ...(recentProducts.docs || []).map((p: any) => ({
            typeKey: 'recent.type.product',
            name: (p.name as any)?.en ?? p.name ?? 'Untitled',
            updatedAt: p.updatedAt,
            href: `/admin/collections/products/${p.id}`,
            status: p._status,
          })),
          ...(recentJobs.docs || []).map((j: any) => ({
            typeKey: 'recent.type.job',
            name: (j.title as any)?.en ?? j.title ?? 'Untitled',
            updatedAt: j.updatedAt,
            href: `/admin/collections/jobs/${j.id}`,
            status: j._status,
          })),
          ...(recentBlogs.docs || []).map((b: any) => ({
            typeKey: 'recent.type.blogPost',
            name: (b.title as any)?.en ?? b.title ?? 'Untitled',
            updatedAt: b.updatedAt,
            href: `/admin/collections/blog-posts/${b.id}`,
            status: b._status,
          })),
          ...(recentDownloads.docs || []).map((d: any) => ({
            typeKey: 'recent.type.download',
            name: (d.title as any)?.en ?? d.title ?? 'Untitled',
            updatedAt: d.updatedAt,
            href: `/admin/collections/downloads/${d.id}`,
            status: d._status,
          })),
        ]

        setRecentEdits(
          items
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 8)
        )

        // Draft count
        const [draftProducts, draftBlogs, draftJobs] = await Promise.all([
          fetch('/api/products?limit=0&where[_status][equals]=draft').then(r => r.ok ? r.json() : { totalDocs: 0 }),
          fetch('/api/blog-posts?limit=0&where[_status][equals]=draft').then(r => r.ok ? r.json() : { totalDocs: 0 }),
          fetch('/api/jobs?limit=0&where[_status][equals]=draft').then(r => r.ok ? r.json() : { totalDocs: 0 }),
        ])
        setDraftCount((draftProducts.totalDocs || 0) + (draftBlogs.totalDocs || 0) + (draftJobs.totalDocs || 0))
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const containerStyle: React.CSSProperties = {
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1100px',
    boxSizing: 'border-box',
  }

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={{ color: 'var(--theme-elevation-400)', fontSize: '0.9rem' }}>
          {t('misc.loading')}
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: isMobile ? '1.25rem' : '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 600 }}>
            {t('dashboard.title')}
          </h1>
          <p style={{ color: 'var(--theme-elevation-450)', margin: 0, fontSize: '0.9rem' }}>
            {t('dashboard.subtitle')}
          </p>
        </div>
        <DashboardLanguageSwitcher />
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: isMobile ? '1.25rem' : '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="/admin/collections/products/create" style={{ ...quickActionBtn, ...(isMobile ? { flex: '1 1 45%', justifyContent: 'center' } : {}) }}>
            <PlusIcon /> {t('quickActions.product')}
          </a>
          <a href="/admin/collections/blog-posts/create" style={{ ...quickActionBtn, ...(isMobile ? { flex: '1 1 45%', justifyContent: 'center' } : {}) }}>
            <PlusIcon /> {t('quickActions.blogPost')}
          </a>
          <a href="/admin/collections/jobs/create" style={{ ...quickActionBtn, ...(isMobile ? { flex: '1 1 45%', justifyContent: 'center' } : {}) }}>
            <PlusIcon /> {t('quickActions.job')}
          </a>
          <a href="/admin/collections/downloads/create" style={{ ...quickActionBtn, ...(isMobile ? { flex: '1 1 45%', justifyContent: 'center' } : {}) }}>
            <PlusIcon /> {t('quickActions.download')}
          </a>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ ...grid(isMobile ? 110 : 150), marginBottom: isMobile ? '1.25rem' : '2rem' }}>
        <StatCard label={t('stats.products')} value={counts.products} href="/admin/collections/products" />
        <StatCard label={t('stats.blogPosts')} value={counts.blogPosts} href="/admin/collections/blog-posts" />
        <StatCard label={t('stats.jobs')} value={counts.jobs} href="/admin/collections/jobs" />
        <StatCard label={t('stats.downloads')} value={counts.downloads} href="/admin/collections/downloads" />
        <StatCard label={t('stats.certificates')} value={counts.certificates} href="/admin/collections/certificates" />
        <StatCard label={t('stats.categories')} value={counts.categories} href="/admin/collections/categories" />
        <StatCard label={t('stats.drafts')} value={draftCount} accent />
      </div>

      {/* Recent Edits */}
      {recentEdits.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
            {t('recent.title')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--theme-elevation-100)', borderRadius: '10px', overflow: 'hidden' }}>
            {recentEdits.map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  ...card,
                  borderRadius: 0,
                  border: 'none',
                  padding: '0.875rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  background: 'var(--theme-elevation-0)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: '1 1 auto' }}>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--theme-elevation-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    minWidth: isMobile ? '3.5rem' : '5rem',
                    flexShrink: 0,
                  }}>
                    {t(item.typeKey)}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                    {item.name}
                  </span>
                  {item.status && item.status === 'draft' && (
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      color: 'var(--theme-elevation-500)',
                      background: 'var(--theme-elevation-100)',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                    }}>
                      {t('recent.status.draft')}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--theme-elevation-400)' }}>
                  {timeAgo(item.updatedAt, lang)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
          {t('quickLinks.title')}
        </h2>
        <div style={grid(isMobile ? 140 : 180)}>
          <QuickLink href="/admin/globals/homepage" title={t('quickLinks.homepage')} description={t('quickLinks.homepageDesc')} />
          <QuickLink href="/admin/collections/products" title={t('quickLinks.products')} description={t('quickLinks.productsDesc')} />
          <QuickLink href="/admin/collections/blog-posts" title={t('quickLinks.blog')} description={t('quickLinks.blogDesc')} />
          <QuickLink href="/admin/globals/company-info" title={t('quickLinks.companyInfo')} description={t('quickLinks.companyInfoDesc')} />
          <QuickLink href="/admin/globals/site-settings" title={t('quickLinks.settings')} description={t('quickLinks.settingsDesc')} />
          <QuickLink href="/admin/collections/media" title={t('quickLinks.media')} description={t('quickLinks.mediaDesc')} />
        </div>
      </div>

      {/* Translation Status */}
      <div style={{ marginTop: '2rem' }}>
        <TranslationStatus />
      </div>
    </div>
  )
}

function StatCard({ label, value, href, accent }: { label: string; value: number; href?: string; accent?: boolean }) {
  const content = (
    <div style={{
      ...statCard,
      borderColor: accent && value > 0 ? 'var(--theme-elevation-200)' : undefined,
    }}>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.1, color: accent ? 'var(--theme-elevation-600)' : 'var(--theme-elevation-900)' }}>
        {value}
      </div>
      <div style={{ color: 'var(--theme-elevation-450)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
        {label}
      </div>
    </div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>
  }
  return content
}

function QuickLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a href={href} style={card}>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
      <div style={{ color: 'var(--theme-elevation-450)', fontSize: '0.8125rem', lineHeight: 1.4 }}>{description}</div>
    </a>
  )
}

const languages: { code: AdminLang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
]

function DashboardLanguageSwitcher() {
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
