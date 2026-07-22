'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { ReactNode } from 'react'

interface LivePreviewWrapperProps<T extends Record<string, any>> {
  initialData: T
  children: (liveData: T) => ReactNode
}

export function LivePreviewWrapper<T extends Record<string, any>>({
  initialData,
  children,
}: LivePreviewWrapperProps<T>) {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
    depth: 2,
  })

  return <>{children(data)}</>
}
