'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('loading...')
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Test if the blog-posts API works
    fetch('/api/blog-posts?limit=1&depth=0')
      .then(r => r.json())
      .then(data => {
        setInfo(`API works. totalDocs: ${data.totalDocs}, docs: ${data.docs?.length || 0}`)
      })
      .catch(err => {
        setInfo(`API ERROR: ${err.message}`)
      })
  }, [])

  // Visible red banner that's impossible to miss
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
      fontSize: '13px',
      fontWeight: 'bold',
    }}>
      DIAGNOSTICS: {info} | URL: {window.location.href} | Render count: {++count}
    </div>
  )
}
