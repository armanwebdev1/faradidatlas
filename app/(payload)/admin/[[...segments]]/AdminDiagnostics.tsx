'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('testing...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    fetch('/api/test-blog')
      .then(async r => {
        const data = await r.json()
        if (data.error) {
          setInfo(`ERROR: ${data.error}\n${data.stack || ''}`)
        } else if (data.registeredCollections) {
          setInfo(
            `Collections(${data.registeredCollections.length}): ${data.registeredCollections.join(', ')}\n` +
            `Blog: ${data.blogError || JSON.stringify(data.blogResult)}`
          )
        } else {
          setInfo(JSON.stringify(data).substring(0, 500))
        }
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
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      maxHeight: '50vh',
      overflow: 'auto',
    }}>
      {info} | {url}
    </div>
  )
}
