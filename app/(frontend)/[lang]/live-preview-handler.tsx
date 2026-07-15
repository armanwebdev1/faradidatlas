'use client'

import { useEffect } from 'react'

interface LivePreviewMessage {
  data: Record<string, any>
  locale: string
  collectionSlug?: string
  globalSlug?: string
}

/**
 * Listens for Payload CMS live preview messages and stores the data
 * in a window-level object so page components can access it.
 *
 * This is a no-op on the production site — only active inside the
 * Payload admin iframe.
 */
export function LivePreviewHandler() {
  useEffect(() => {
    // Check if we're inside a Payload admin iframe
    const isInIframe = window.self !== window.top
    if (!isInIframe) return

    const handler = (event: MessageEvent) => {
      // Payload sends live preview data as a postMessage
      if (event.data && typeof event.data === 'object') {
        const msg = event.data as LivePreviewMessage

        // Store the live preview data on window for components to access
        if (msg.data) {
          (window as any).__LIVE_PREVIEW_DATA__ = msg.data
          ;(window as any).__LIVE_PREVIEW_LOCALE__ = msg.locale || 'en'

          // Dispatch a custom event so components can react
          window.dispatchEvent(
            new CustomEvent('livePreviewUpdate', {
              detail: {
                data: msg.data,
                locale: msg.locale,
                collectionSlug: msg.collectionSlug,
                globalSlug: msg.globalSlug,
              },
            })
          )
        }
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return null
}
