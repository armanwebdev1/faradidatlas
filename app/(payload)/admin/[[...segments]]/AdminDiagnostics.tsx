'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('loading...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    fetch('/api/blog-posts?limit=1&depth=0')
      .then(r => r.json())
      .then(data => {
        setInfo(`API OK. totalDocs: ${data.totalDocs}`)
      })
      .catch(err => {
        setInfo(`API ERROR: ${err.message}`)
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
      fontSize: '13px',
    }}>
      DIAGNOSTICS: {info} | {url}
    </div>
  )
}
