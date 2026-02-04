"use client"

import { useEffect, useRef, useState } from "react"
interface TrustStat {
  value: number
  suffix?: string
  label: string
}

interface TrustStatsProps {
  stats: TrustStat[]
}

interface TrustStatCardProps {
  stat: TrustStat
  start: boolean
  index: number
}

function useCountUp(value: number, shouldStart: boolean, duration: number, delay: number) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!shouldStart) {
      return
    }

    if (typeof window === "undefined") {
      setCurrent(value)
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setCurrent(value)
      return
    }

    setCurrent(0)

    let rafId = 0
    let timeoutId = 0

    let startTime = 0
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(value * eased))
      if (progress < 1) {
        rafId = window.requestAnimationFrame(animate)
      }
    }

    timeoutId = window.setTimeout(() => {
      startTime = performance.now()
      rafId = window.requestAnimationFrame(animate)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(rafId)
    }
  }, [value, shouldStart, duration, delay])

  return current
}

function TrustStatCard({ stat, start, index }: TrustStatCardProps) {
  const value = useCountUp(stat.value, start, 1200, index * 120)
  const formattedValue = value.toLocaleString("en-US")

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-white/90 px-5 py-6 sm:px-6 sm:py-7 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-60px_rgba(15,23,42,0.45)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-300 to-amber-200 opacity-70" />
      <div className="relative">
        <p className="text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
          {formattedValue}
          {stat.suffix ?? ""}
        </p>
        <p className="mt-2 text-xs sm:text-sm font-semibold text-foreground/70 leading-snug">
          {stat.label}
        </p>
      </div>
    </div>
  )
}

export function TrustStats({ stats }: TrustStatsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {stats.map((stat, index) => (
        <TrustStatCard
          key={`${stat.label}-${index}`}
          stat={stat}
          start={hasStarted}
          index={index}
        />
      ))}
    </div>
  )
}
