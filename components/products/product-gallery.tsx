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
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-h-[520px] lg:max-h-[560px] bg-white/80 rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_30px_80px_-60px_rgba(15,15,15,0.45)]">
        <div key={activeImage} className="absolute inset-0 image-swap">
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous image"
          aria-disabled={!canNavigate}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-foreground/10 bg-white/90 text-foreground/70 shadow-sm transition-all duration-300 hover:text-foreground hover:shadow-md pointer-events-auto ${
            canNavigate
              ? "hover:-translate-y-[52%]"
              : "cursor-not-allowed opacity-40 pointer-events-none"
          }`}
        >
          <ChevronLeft className="h-5 w-5 mx-auto" />
        </button>

        <div
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
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 640px) 96px, 80px"
                  className="object-cover"
                />
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
          aria-label="Next image"
          aria-disabled={!canNavigate}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-foreground/10 bg-white/90 text-foreground/70 shadow-sm transition-all duration-300 hover:text-foreground hover:shadow-md pointer-events-auto ${
            canNavigate
              ? "hover:-translate-y-[52%]"
              : "cursor-not-allowed opacity-40 pointer-events-none"
          }`}
        >
          <ChevronRight className="h-5 w-5 mx-auto" />
        </button>
      </div>

      <style jsx>{`
        @keyframes imageSwap {
          0% {
            opacity: 0;
            transform: scale(0.985);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-swap {
          animation: imageSwap 0.45s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .image-swap {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
