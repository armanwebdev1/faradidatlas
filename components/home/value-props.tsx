"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import type { Language } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

interface ValuePropsProps {
  lang: Language
}

const valueItems = {
  en: [
    {
      icon: "🌍",
      title: "Global Sourcing",
      description: "Direct partnerships with premium producers across 15+ countries",
    },
    {
      icon: "✓",
      title: "Quality Control",
      description: "Rigorous testing at every stage: harvest, processing, packaging, shipping",
    },
    {
      icon: "🏷️",
      title: "Private Labeling",
      description: "White-label solutions with flexible MOQs and custom packaging",
    },
    {
      icon: "📦",
      title: "Export Ready",
      description: "All products certified for international export with full documentation",
    },
  ],
  fa: [
    {
      icon: "🌍",
      title: "تامین بین‌المللی",
      description: "همکاری مستقیم با تولیدکنندگان برتر در بیش از ۱۵ کشور",
    },
    {
      icon: "✓",
      title: "کنترل کیفیت",
      description: "آزمایش دقیق در هر مرحله: برداشت، فرآوری، بسته‌بندی، حمل‌ونقل",
    },
    {
      icon: "🏷️",
      title: "علامت‌گذاری خصوصی",
      description: "راه‌حل‌های برچسب سفید با حداقل سفارش انعطاف‌پذیر و بسته‌بندی سفارشی",
    },
    {
      icon: "📦",
      title: "آماده صادرات",
      description: "تمام محصولات معتبر برای صادرات بین‌المللی با اسناد کامل",
    },
  ],
}

export function ValueProps({ lang }: ValuePropsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    itemsRef.current.forEach((item) => {
      if (!item) return

      gsap.set(item, { opacity: 0, y: 30 })

      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const items = lang === "en" ? valueItems.en : valueItems.fa

  return (
    <section ref={containerRef} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Why Choose Us</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Trusted by distributors and retailers worldwide for premium sourcing and reliable partnerships"
            : "توسط توزیع‌کنندگان و فروشندگان جهانی برای تامین برتر و مشارکت‌های قابل‌اعتماد مورد اعتماد"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el
              }}
              className="p-8 bg-background rounded-lg border border-border hover:border-accent transition-colors group"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
              <p className="text-neutral leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
