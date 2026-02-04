"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Heritage Spice Blend",
    category: "Premium Spices",
    image: "/featured1.jpg",
    description:
      "Carefully curated blend of the finest spices from around the world",
  },
  {
    id: 2,
    name: "Golden Olive Oil",
    category: "Specialty Oils",
    image: "/featured2.jpg",
    description:
      "Cold-pressed extra virgin olive oil from Mediterranean estates",
  },
  {
    id: 3,
    name: "Artisan Coffee Selection",
    category: "Premium Coffee",
    image: "/featured3.jpg",
    description:
      "Single-origin, hand-roasted coffee beans from exclusive plantations",
  },
  {
    id: 4,
    name: "Saffron Reserve",
    category: "Precious Ingredients",
    image: "/featured4.jpg",
    description:
      "Premium grade saffron threads sourced directly from renowned producers",
  },
  {
    id: 5,
    name: "Pure Vanilla Extract",
    category: "Gourmet Essentials",
    image: "/featured5.jpg",
    description:
      "Madagascar vanilla beans processed to perfection for culinary excellence",
  },
];

export function SignatureProducts() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const isRTL = lang === "fa";
  const textShiftClass = isRTL
    ? "-translate-x-2 sm:-translate-x-3 md:-translate-x-4 -translate-y-2 sm:-translate-y-3 md:-translate-y-4"
    : "translate-x-2 sm:translate-x-3 md:translate-x-4 -translate-y-2 sm:-translate-y-3 md:-translate-y-4";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isAutoplay) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay]);

  const handleNavigation = (newIndex: number) => {
    setIsTransitioning(true);
    setIsAutoplay(false);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToPrevious = () => {
    handleNavigation((currentIndex - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    handleNavigation((currentIndex + 1) % products.length);
  };

  const handleProductClick = () => {
    router.push(`/${lang}/products/${products[currentIndex].id}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header - Cleaner without yellow label */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 animate-fade-in">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 sm:mb-6 md:mb-8 leading-tight"
            style={{
              fontFamily: "var(--font-hero)",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            }}
          >
            Signature Products
          </h2>
          <p
            className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 2vw, 17px)",
              fontWeight: "400",
            }}
          >
            Discover our handpicked collection of premium products, each
            selected for exceptional quality and distinctive character
          </p>

          {/* Explore All Products button */}
          <button
            onClick={() => router.push(`/${lang}/products`)}
            className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-foreground/20 hover:border-foreground/40 text-foreground hover:text-foreground rounded-full text-sm sm:text-base md:text-base font-medium tracking-tight transition-all duration-300 hover:bg-foreground/5"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            Explore All Products
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel - Reduced height for better proportions */}
          <div className="relative h-80 sm:h-96 md:h-[480px] lg:h-[540px] overflow-hidden rounded-2xl sm:rounded-3xl">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Product Image */}
                <button
                  onClick={handleProductClick}
                  className="relative h-full w-full bg-muted overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={`View ${product.name} details`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      index === currentIndex && !isTransitioning
                        ? "scale-100"
                        : "scale-105"
                    }`}
                    priority={index === currentIndex}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
                </button>

                <div className={`absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-10 lg:p-12 pointer-events-none transform-gpu ${textShiftClass}`}>
                  <div
                    className={`transition-all duration-700 transform ${
                      index === currentIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="text-accent text-xs md:text-sm font-medium tracking-widest uppercase">
                      {product.category}
                    </span>
                    <h3 className="font-hero text-2xl sm:text-3xl md:text-4xl font-semibold text-white my-3 sm:my-4 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base md:text-base leading-relaxed max-w-2xl">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 md:px-8 pointer-events-none z-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 flex items-center justify-center"
                aria-label="Previous product"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="pointer-events-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 flex items-center justify-center"
                aria-label="Next product"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-8 sm:w-10 md:w-12 h-2 bg-foreground"
                    : "w-2 h-2 bg-foreground/25 hover:bg-foreground/40"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-xs sm:text-sm rounded-full border-foreground/20 hover:border-foreground/40 text-foreground hover:text-foreground transition-colors"
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              {isAutoplay ? "Pause" : "Play"}
            </Button>
            <span className="text-xs sm:text-sm text-foreground/60">
              {currentIndex + 1} / {products.length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
