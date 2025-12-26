"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import type { Language } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const isRTL = lang === "fa"

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return

    gsap.set([headingRef.current, subheadingRef.current], { opacity: 0, y: 20 })

    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    })

    gsap.to(subheadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.4,
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=premium food products artisanal)",
          opacity: 0.15,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-overlay/40 to-dark-overlay/60" />

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center ${isRTL ? "text-right" : "text-left"}`}>
        <h1 ref={headingRef} className="text-6xl md:text-7xl font-bold text-primary mb-6 leading-tight">
          {isRTL ? "غذاهای اول درجه جهانی" : "Premium Global Foods"}
        </h1>
        <p ref={subheadingRef} className="text-xl md:text-2xl text-neutral max-w-3xl mx-auto leading-relaxed">
          {isRTL
            ? "تامین‌کننده معتبر محصولات غذایی صادراتی با استانداردهای بین‌المللی و گواهی‌های کیفیت"
            : "Trusted global food exporter. Premium sourcing, private labeling, and certified quality."}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
