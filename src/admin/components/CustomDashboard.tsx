'use client'

import React from 'react'

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

export const CustomDashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px' }}>
      <h1 style={{ margin: '0 0 0.25rem 0' }}>Faradid Atlas CMS</h1>
      <p style={{ color: 'var(--theme-elevation-500)', margin: '0 0 2rem 0' }}>
        Content management for faradidatlas.com — EN / FA / AR
      </p>

      <div style={gridStyle}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>30</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Products</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>6</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Categories</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>10</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>FAQs</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>3</div>
          <div style={{ color: 'var(--theme-elevation-500)', fontSize: '0.9rem' }}>Jobs</div>
        </div>
      </div>

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
          description="Product categories and descriptions"
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
          description="About, CEO profile, team, and offices"
        />
        <QuickLink
          href="/admin/globals/contact-info"
          title="Contact"
          description="Email, phones, addresses, and response SLA"
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
          description="Uploaded images and files"
        />
      </div>
    </div>
  )
}
