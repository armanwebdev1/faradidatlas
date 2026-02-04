"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

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

  if (gallery.length === 0) {
    return null;
  }

  const activeImage = gallery[Math.min(activeIndex, gallery.length - 1)];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="relative aspect-square sm:aspect-[4/5] bg-white/80 rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_30px_80px_-60px_rgba(15,15,15,0.45)] motion-safe:animate-scale-reveal">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory"
        aria-label="Product image gallery"
      >
        {gallery.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
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
    </div>
  );
}
