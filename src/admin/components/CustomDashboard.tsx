import React from 'react'
import { getPayloadClient } from '@/lib/payload'

const boxStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'border-color 0.2s',
  display: 'block',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem',
  marginTop: '1.5rem',
}

const statCardStyle: React.CSSProperties = {
  padding: '1.25rem',
  borderRadius: '8px',
  backgroundColor: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-100)',
}

const QuickLink: React.FC<{ href: string; title: string; description: string }> = ({
  href,
  title,
  description,
}) => (
  <a href={href} style={boxStyle}>
    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{title}</h3>
    <p style={{ margin: 0, color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>
      {description}
    </p>
  </a>
)

async function getCollectionCounts() {
  try {
    const payload = await getPayloadClient()
    const [products, categories, faqs, jobs, blogPosts, media] = await Promise.all([
      payload.count({ collection: 'products' }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'faqs' }),
      payload.count({ collection: 'jobs' }),
      payload.count({ collection: 'blog-posts' }),
      payload.count({ collection: 'media' }),
    ])
    return {
      products: products.totalDocs,
      categories: categories.totalDocs,
      faqs: faqs.totalDocs,
      jobs: jobs.totalDocs,
      blogPosts: blogPosts.totalDocs,
      media: media.totalDocs,
    }
  } catch {
    return { products: 0, categories: 0, faqs: 0, jobs: 0, blogPosts: 0, media: 0 }
  }
}

async function getRecentEdits() {
  try {
    const payload = await getPayloadClient()
    const [products, jobs, faqs] = await Promise.all([
      payload.find({ collection: 'products', limit: 3, sort: '-updatedAt' }),
      payload.find({ collection: 'jobs', limit: 2, sort: '-updatedAt' }),
      payload.find({ collection: 'faqs', limit: 2, sort: '-updatedAt' }),
    ])
    const items = [
      ...products.docs.map((p: any) => ({
        type: 'Product',
        name: (p.name as any)?.en ?? p.name ?? 'Untitled',
        updatedAt: p.updatedAt,
        href: `/admin/collections/products/${p.id}`,
      })),
      ...jobs.docs.map((j: any) => ({
        type: 'Job',
        name: (j.title as any)?.en ?? j.title ?? 'Untitled',
        updatedAt: j.updatedAt,
        href: `/admin/collections/jobs/${j.id}`,
      })),
      ...faqs.docs.map((f: any) => ({
        type: 'FAQ',
        name: (f.question as any)?.en ?? f.question ?? 'Untitled',
        updatedAt: f.updatedAt,
        href: `/admin/collections/faqs/${f.id}`,
      })),
    ]
    return items
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
  } catch {
    return []
  }
}

export const CustomDashboard: React.FC = async () => {
  const counts = await getCollectionCounts()
  const recentEdits = await getRecentEdits()

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px' }}>
      <h1 style={{ margin: '0 0 0.25rem 0' }}>Faradid Atlas CMS</h1>
      <p style={{ color: 'var(--theme-elevation-500)', margin: '0 0 2rem 0' }}>
        Content management for faradidatlas.com — EN / FA / AR
      </p>

      <div style={gridStyle}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.products}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Products</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.categories}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Categories</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.faqs}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>FAQs</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.jobs}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Jobs</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.blogPosts}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Blog Posts</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{counts.media}</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Media Files</div>
        </div>
      </div>

      {recentEdits.length > 0 && (
        <>
          <h2 style={{ marginTop: '2.5rem', marginBottom: '0.25rem' }}>Recently Edited</h2>
          <div style={{ ...gridStyle, gridTemplateColumns: '1fr' }}>
            {recentEdits.map((item, i) => (
              <a key={i} href={item.href} style={{ ...boxStyle, padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--theme-elevation-400)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {item.type}
                    </span>
                    <div style={{ fontSize: '1rem', fontWeight: 500, marginTop: '0.25rem' }}>
                      {item.name}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--theme-elevation-400)' }}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      <h2 style={{ marginTop: '2.5rem', marginBottom: '0.25rem' }}>Quick Links</h2>

      <div style={gridStyle}>
        <QuickLink
          href="/admin/collections/products"
          title="Products"
          description="Manage product catalog with specs, images, and multilingual data"
        />
        <QuickLink
          href="/admin/collections/categories"
          title="Categories"
          description="Product categories, SEO content, and display settings"
        />
        <QuickLink
          href="/admin/globals/homepage"
          title="Homepage"
          description="Hero slides, value propositions, brand showcase, CTA"
        />
        <QuickLink
          href="/admin/collections/blog-posts"
          title="Blog Posts"
          description="Articles, authors, and content"
        />
        <QuickLink
          href="/admin/collections/faqs"
          title="FAQs"
          description="Frequently asked questions by category"
        />
        <QuickLink
          href="/admin/collections/jobs"
          title="Careers"
          description="Job listings with responsibilities and requirements"
        />
        <QuickLink
          href="/admin/globals/navigation"
          title="Navigation"
          description="Main menu and footer menu items"
        />
        <QuickLink
          href="/admin/globals/company-info"
          title="Company Info"
          description="About, CEO profile, team, offices, strategic framework"
        />
        <QuickLink
          href="/admin/globals/contact-info"
          title="Contact"
          description="Email, phones, addresses, response SLA, trust stats"
        />
        <QuickLink
          href="/admin/globals/careers-info"
          title="Careers Info"
          description="Culture values and careers page content"
        />
        <QuickLink
          href="/admin/globals/site-settings"
          title="Site Settings"
          description="Site name, logo, social links, and legal info"
        />
        <QuickLink
          href="/admin/globals/translations"
          title="Translations"
          description="UI strings for nav labels, buttons, and common text"
        />
        <QuickLink
          href="/admin/collections/media"
          title="Media Library"
          description="Uploaded images with alt text, titles, and captions"
        />
      </div>
    </div>
  )
}
