export default function ProductDetailLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="h-16 bg-white/80 border-b border-border" />

      <main>
        {/* Breadcrumb skeleton */}
        <div className="container-wide px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2">
            <div className="h-3 w-12 bg-foreground/10 rounded animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
            <div className="h-3 w-16 bg-foreground/10 rounded animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
            <div className="h-3 w-20 bg-foreground/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Product detail skeleton */}
        <section className="space-responsive px-4 sm:px-6 bg-gradient-to-b from-background via-background to-secondary/30">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
            {/* Gallery skeleton */}
            <div className="relative aspect-square max-h-[520px] lg:max-h-[560px] bg-white/80 rounded-3xl overflow-hidden border border-foreground/10">
              <div className="absolute inset-0 bg-secondary/40 animate-pulse" />
            </div>

            {/* Info skeleton */}
            <div className="flex flex-col rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)] backdrop-blur">
              <div className="h-10 w-3/4 bg-foreground/10 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-accent-warm-gold/20 rounded mt-4 animate-pulse" />
              <div className="h-4 w-full bg-foreground/5 rounded mt-4 animate-pulse" />
              <div className="h-4 w-2/3 bg-foreground/5 rounded mt-2 animate-pulse" />

              {/* Specs grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-6 mb-8 p-4 sm:p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-2 w-16 bg-foreground/10 rounded mb-2 animate-pulse" />
                    <div className="h-5 w-24 bg-foreground/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                <div className="flex-1 h-12 bg-primary/20 rounded-full animate-pulse" />
                <div className="flex-1 h-12 bg-foreground/10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <div className="h-48 bg-secondary/30 border-t border-border" />
    </div>
  );
}
