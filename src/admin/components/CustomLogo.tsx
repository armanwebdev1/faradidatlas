'use client'

import React from 'react'
import Image from 'next/image'
import { useAdminLang } from '../providers/AdminLang'

export const CustomLogo: React.FC = () => {
  const { lang } = useAdminLang()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 32,
          height: 32,
          flexShrink: 0,
        }}
      >
        <Image
          src="/brand/faradid-atlas-mark.png"
          alt="Faradid Atlas"
          fill
          sizes="32px"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span
        style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {lang === 'fa' ? 'فرادید اطلس' : 'Faradid Atlas'}
      </span>
    </div>
  )
}
