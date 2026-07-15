import React from 'react'
import { getPayloadClient } from '@/lib/payload'
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

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '0.75rem',
}

interface CountResult {
  totalDocs: number
}

interface RecentItem {
  type: string
  name: string
  updatedAt: string
  href: string
  status?: string
}

async function getCounts() {
  try {
    const payload = await getPayloadClient()
    const results = await Promise.all([
      payload.count({ collection: 'products' }),
      payload.count({ collection: 'blog-posts' }),
      payload.count({ collection: 'jobs' }),
      payload.count({ collection: 'downloads' }),
      payload.count({ collection: 'certificates' }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'faqs' }),
      payload.count({ collection: 'media' }),
    ])
    const counts = (r: CountResult) => r.totalDocs
    return {
      products: counts(results[0]),
      blogPosts: counts(results[1]),
      jobs: counts(results[2]),
      downloads: counts(results[3]),
      certificates: counts(results[4]),
      categories: counts(results[5]),
      faqs: counts(results[6]),
      media: counts(results[7]),
      total: counts(results[0]) + counts(results[1]) + counts(results[2]) + counts(results[3]) + counts(results[4]) + counts(results[5]) + counts(results[6]),
    }
  } catch {
    return { products: 0, blogPosts: 0, jobs: 0, downloads: 0, certificates: 0, categories: 0, faqs: 0, media: 0, total: 0 }
  }
}

async function getRecentEdits(): Promise<RecentItem[]> {
  try {
    const payload = await getPayloadClient()
    const [products, jobs, blogPosts, downloads] = await Promise.all([
      payload.find({ collection: 'products', limit: 3, sort: '-updatedAt' }),
      payload.find({ collection: 'jobs', limit: 2, sort: '-updatedAt' }),
      payload.find({ collection: 'blog-posts', limit: 3, sort: '-updatedAt' }),
      payload.find({ collection: 'downloads', limit: 2, sort: '-updatedAt' }),
    ])
    const items: RecentItem[] = [
      ...products.docs.map((p: any) => ({
        type: 'Product',
        name: (p.name as any)?.en ?? p.name ?? 'Untitled',
        updatedAt: p.updatedAt,
        href: `/admin/collections/products/${p.id}`,
        status: p._status,
      })),
      ...jobs.docs.map((j: any) => ({
        type: 'Job',
        name: (j.title as any)?.en ?? j.title ?? 'Untitled',
        updatedAt: j.updatedAt,
        href: `/admin/collections/jobs/${j.id}`,
        status: j._status,
      })),
      ...blogPosts.docs.map((b: any) => ({
        type: 'Blog Post',
        name: (b.title as any)?.en ?? b.title ?? 'Untitled',
        updatedAt: b.updatedAt,
        href: `/admin/collections/blog-posts/${b.id}`,
        status: b._status,
      })),
      ...downloads.docs.map((d: any) => ({
        type: 'Download',
        name: (d.title as any)?.en ?? d.title ?? 'Untitled',
        updatedAt: d.updatedAt,
        href: `/admin/collections/downloads/${d.id}`,
        status: d._status,
      })),
    ]
    return items
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 8)
  } catch {
    return []
  }
}

async function getDraftCounts(): Promise<number> {
  try {
    const payload = await getPayloadClient()
    const results = await Promise.all([
      payload.count({ collection: 'products', where: { _status: { equals: 'draft' } } }),
      payload.count({ collection: 'blog-posts', where: { _status: { equals: 'draft' } } }),
      payload.count({ collection: 'jobs', where: { _status: { equals: 'draft' } } }),
    ])
    return results.reduce((sum, r) => sum + r.totalDocs, 0)
  } catch {
    return 0
  }
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

const PlusIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const CustomDashboard: React.FC = async () => {
  const counts = await getCounts()
  const recentEdits = await getRecentEdits()
  const draftCount = await getDraftCounts()

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem', fontWeight: 600 }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--theme-elevation-450)', margin: 0, fontSize: '0.9rem' }}>
          Content overview for faradidatlas.com — EN / FA / AR
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="/admin/collections/products/create" style={quickActionBtn}>
            <PlusIcon /> Product
          </a>
          <a href="/admin/collections/blog-posts/create" style={quickActionBtn}>
            <PlusIcon /> Blog Post
          </a>
          <a href="/admin/collections/jobs/create" style={quickActionBtn}>
            <PlusIcon /> Job
          </a>
          <a href="/admin/collections/downloads/create" style={quickActionBtn}>
            <PlusIcon /> Download
          </a>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', marginBottom: '2rem' }}>
        <StatCard label="Products" value={counts.products} href="/admin/collections/products" />
        <StatCard label="Blog Posts" value={counts.blogPosts} href="/admin/collections/blog-posts" />
        <StatCard label="Jobs" value={counts.jobs} href="/admin/collections/jobs" />
        <StatCard label="Downloads" value={counts.downloads} href="/admin/collections/downloads" />
        <StatCard label="Certificates" value={counts.certificates} href="/admin/collections/certificates" />
        <StatCard label="Categories" value={counts.categories} href="/admin/collections/categories" />
        <StatCard label="Drafts" value={draftCount} accent />
      </div>

      {/* Recent Edits */}
      {recentEdits.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
            Recent Edits
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--theme-elevation-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    minWidth: '5rem',
                    flexShrink: 0,
                  }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                      Draft
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--theme-elevation-400)' }}>
                  {timeAgo(item.updatedAt)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 600 }}>
          Quick Links
        </h2>
        <div style={grid}>
          <QuickLink href="/admin/globals/homepage" title="Homepage" description="Hero, value props, products, CTA" />
          <QuickLink href="/admin/collections/products" title="Products" description="Catalog with specs and images" />
          <QuickLink href="/admin/collections/blog-posts" title="Blog" description="Articles and content" />
          <QuickLink href="/admin/globals/company-info" title="Company Info" description="About page content" />
          <QuickLink href="/admin/globals/navigation" title="Navigation" description="Menu items" />
          <QuickLink href="/admin/globals/site-settings" title="Settings" description="Site config, SEO, analytics" />
          <QuickLink href="/admin/collections/media" title="Media" description="Image library" />
          <QuickLink href="/admin/globals/translations" title="Translations" description="UI strings" />
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
