'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('testing...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    fetch('/api/fix-blog')
      .then(async r => {
        const data = await r.json()
        setInfo(JSON.stringify(data, null, 2).substring(0, 1000))
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
      fontSize: '11px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      maxHeight: '60vh',
      overflow: 'auto',
    }}>
      {info} | {url}
    </div>
  )
}
