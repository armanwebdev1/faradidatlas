'use client'

import React from 'react'

export class AdminErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message + '\n' + error.stack }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[BLOG DEBUG] Error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          background: 'white',
          color: 'red',
          padding: '20px',
          fontFamily: 'monospace',
          fontSize: '12px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
        }}>
          <h2 style={{ color: 'red' }}>PAYLOAD RENDER ERROR</h2>
          {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}
