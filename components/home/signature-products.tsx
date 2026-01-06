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
    image: "/premium-spice-blend-package.jpg",
    description:
      "Carefully curated blend of the finest spices from around the world",
  },
  {
    id: 2,
    name: "Golden Olive Oil",
    category: "Specialty Oils",
    image: "/premium-olive-oil-bottle.jpg",
    description:
      "Cold-pressed extra virgin olive oil from Mediterranean estates",
  },
  {
    id: 3,
    name: "Artisan Coffee Selection",
    category: "Premium Coffee",
    image: "/luxury-coffee-beans-package.jpg",
    description:
      "Single-origin, hand-roasted coffee beans from exclusive plantations",
  },
  {
    id: 4,
    name: "Saffron Reserve",
    category: "Precious Ingredients",
    image: "/premium-saffron-packaging.jpg",
    description:
      "Premium grade saffron threads sourced directly from renowned producers",
  },
  {
    id: 5,
    name: "Pure Vanilla Extract",
    category: "Gourmet Essentials",
    image: "/vanilla-extract-luxury-bottle.jpg",
    description:
      "Madagascar vanilla beans processed to perfection for culinary excellence",
  },
];

export function SignatureProducts() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
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
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span
            className="category-label text-accent-warm-gold mb-6 inline-block"
            style={{
              fontFamily: "Satoshi, var(--font-label)",
              fontSize: "clamp(12px, 2vw, 16px)",
            }}
          >
            Curated Excellence
          </span>
          <h2
            className="section-title mb-8"
            style={{
              fontFamily: "var(--font-hero)",
            }}
          >
            Signature{" "}
            <span className="relative">
              Products
              <span className="absolute bottom-2 left-0 right-0 h-1 bg-accent/40 rounded-full blur-sm" />
            </span>
          </h2>
          <p
            className="body-text text-foreground/70 max-w-2xl mx-auto mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 2vw, 18px)",
            }}
          >
            Discover our handpicked collection of premium products, each
            selected for exceptional quality and distinctive character
          </p>

          {/* Explore All Products button */}
          <button
            onClick={() => router.push(`/${lang}/products`)}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-foreground hover:border-accent hover:text-accent text-foreground rounded-full font-hero text-base md:text-lg font-semibold tracking-tight transition-all duration-300 hover:bg-foreground/5"
          >
            Explore All Products
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </button>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 pointer-events-none">
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
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white my-4 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-20">
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

          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-10 md:w-12 h-2 md:h-2.5 bg-accent"
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-4 md:mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-xs md:text-sm rounded-full border-muted-foreground/40 hover:border-accent hover:text-accent transition-colors"
            >
              {isAutoplay ? "Pause" : "Play"}
            </Button>
            <span className="text-xs md:text-sm text-muted-foreground">
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
