"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Language } from "@/lib/i18n";
import type { Job } from "./job-data";
import { JobListing } from "./job-listing";

gsap.registerPlugin(ScrollTrigger);

interface CareersOpportunitiesProps {
  lang: Language;
  jobs: Job[];
}

export function CareersOpportunities({
  lang,
  jobs,
}: CareersOpportunitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([titleRef.current, subtitleRef.current, ...cards], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 18,
      });
      gsap.set(cards, { opacity: 0, y: 26 });

      const timeline = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      timeline
        .to([titleRef.current, subtitleRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="open-roles"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white"
    >
      <div className="container-wide">
        <div className="mb-10 sm:mb-12 md:mb-14">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 sm:mb-6 tracking-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            }}
          >
            {lang === "en" ? "Open Positions" : "موقعیت‌های باز"}
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-foreground/70 max-w-3xl"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: "400",
            }}
          >
            {lang === "en"
              ? "Find your next opportunity and make an impact across our global organization."
              : "فرصت بعدی خود را پیدا کنید و در سراسر سازمان جهانی ما تأثیر بگذارید."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {jobs.map((job, idx) => (
            <div
              key={job.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="h-full"
            >
              <JobListing job={job} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
