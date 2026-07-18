'use client'

import { useEffect, useState } from 'react'

export function AdminDiagnostics() {
  const [info, setInfo] = useState<string>('scanning...')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)

    // Scan the DOM for Payload admin elements
    setTimeout(() => {
      const wrap = document.querySelector('.template-default__wrap')
      const listHeader = document.querySelector('.list-header')
      const editView = document.querySelector('.edit-view')
      const collectionDashboard = document.querySelector('.collection-dashboard')
      const payloadEmpty = document.querySelector('.payload-empty-state')
      const allDivs = wrap ? wrap.querySelectorAll('div') : []
      const wrapHTML = wrap ? wrap.innerHTML.substring(0, 500) : 'NO .template-default__wrap FOUND'
      const wrapStyle = wrap ? window.getComputedStyle(wrap).cssText.substring(0, 300) : 'N/A'
      const bodyClasses = document.body.className

      setInfo(
        `wrap: ${wrap ? 'YES' : 'NO'}\n` +
        `listHeader: ${listHeader ? 'YES' : 'NO'}\n` +
        `editView: ${editView ? 'YES' : 'NO'}\n` +
        `emptyState: ${payloadEmpty ? 'YES' : 'NO'}\n` +
        `wrap children: ${allDivs.length}\n` +
        `bodyClasses: ${bodyClasses}\n` +
        `wrapHTML: ${wrapHTML}`
      )
    }, 3000)
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
