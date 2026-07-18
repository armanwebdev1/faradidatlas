'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('loading...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    fetch('/api/blog-posts?limit=1&depth=0')
      .then(async r => {
        const text = await r.text()
        setInfo(`Status: ${r.status} | Body: ${text.substring(0, 300)}`)
      })
      .catch(err => {
        setInfo(`FETCH ERROR: ${err.message}`)
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
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    }}>
      {info} | {url}
    </div>
  )
}
