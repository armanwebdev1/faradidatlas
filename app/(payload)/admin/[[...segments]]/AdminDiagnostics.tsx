'use client'

import { useEffect, useState } from 'react'

async function testAPI(path: string): Promise<string> {
  try {
    const r = await fetch(path)
    const text = await r.text()
    return `${r.status}: ${text.substring(0, 200)}`
  } catch (err: any) {
    return `FETCH_ERR: ${err.message}`
  }
}

export function AdminDiagnostics() {
  const [results, setResults] = useState<string>('testing...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    Promise.all([
      testAPI('/api/products?limit=1&depth=0'),
      testAPI('/api/categories?limit=1&depth=0'),
      testAPI('/api/jobs?limit=1&depth=0'),
      testAPI('/api/faqs?limit=1&depth=0'),
      testAPI('/api/blog-posts?limit=1&depth=0'),
      testAPI('/api/blog-posts?limit=1&depth=0&locale=all'),
      testAPI('/api/blog-posts?limit=0'),
    ]).then(([products, categories, jobs, faqs, blog, blogAll, blogZero]) => {
      setResults(
        `products: ${products}\n` +
        `categories: ${categories}\n` +
        `jobs: ${jobs}\n` +
        `faqs: ${faqs}\n` +
        `blog-posts: ${blog}\n` +
        `blog-posts(locale=all): ${blogAll}\n` +
        `blog-posts(limit=0): ${blogZero}`
      )
    })
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      background: 'red',
      color: 'white',
      padding: '12px 16px',
      fontFamily: 'monospace',
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      maxHeight: '40vh',
      overflow: 'auto',
    }}>
      {results}
      {'\n'}URL: {url}
    </div>
  )
}
