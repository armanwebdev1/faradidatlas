"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = useMemo(
    () => (images && images.length > 0 ? images.slice(0, 4) : []),
    [images],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (gallery.length === 0) {
    return null;
  }

  const activeImage = gallery[Math.min(activeIndex, gallery.length - 1)];
  const canNavigate = gallery.length > 1;

  useEffect(() => {
    const current = thumbRefs.current[activeIndex];
    current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  const goToPrev = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToNext = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-h-[520px] lg:max-h-[560px] bg-white/80 rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_30px_80px_-60px_rgba(15,15,15,0.45)] motion-safe:animate-scale-reveal">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={goToPrev}
          disabled={!canNavigate}
          aria-label="Previous image"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-foreground/10 bg-white/90 text-foreground/70 shadow-sm transition-all duration-300 hover:text-foreground hover:shadow-md ${
            canNavigate
              ? "hover:-translate-y-[52%]"
              : "cursor-not-allowed opacity-40"
          }`}
        >
          <ChevronLeft className="h-5 w-5 mx-auto" />
        </button>

        <div
          ref={stripRef}
          className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto px-10 pb-1 scroll-smooth snap-x snap-mandatory"
          aria-label="Product image gallery"
        >
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
                aria-pressed={isActive}
                aria-current={isActive ? "true" : "false"}
                className={`relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 snap-start rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isActive
                    ? "border-accent-warm-gold/60 ring-2 ring-accent-warm-gold/50"
                    : "border-foreground/10"
                }`}
              >
                <Image src={image} alt={alt} fill className="object-cover" />
                <span className="sr-only">
                  {`View image ${index + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={!canNavigate}
          aria-label="Next image"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-foreground/10 bg-white/90 text-foreground/70 shadow-sm transition-all duration-300 hover:text-foreground hover:shadow-md ${
            canNavigate
              ? "hover:-translate-y-[52%]"
              : "cursor-not-allowed opacity-40"
          }`}
        >
          <ChevronRight className="h-5 w-5 mx-auto" />
        </button>
      </div>
    </div>
  );
}
