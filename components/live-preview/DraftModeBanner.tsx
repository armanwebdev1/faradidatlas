'use client'

import { useRouter } from 'next/navigation'

export function DraftModeBanner() {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        backgroundColor: '#f59e0b',
        color: '#000',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <span>Draft Mode</span>
      <button
        onClick={() => {
          window.location.href = '/api/draft-disable'
        }}
        style={{
          padding: '2px 8px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Exit
      </button>
    </div>
  )
}
