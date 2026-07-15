export default function ProductsLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="h-16 bg-white/80 border-b border-border" />

      <main>
        {/* Hero skeleton */}
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-secondary/40">
          <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
                <div className="flex-1 space-y-3">
                  <div className="h-10 sm:h-12 w-3/4 bg-white/20 rounded-lg animate-pulse" />
                  <div className="h-4 sm:h-5 w-1/2 bg-white/15 rounded animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse mt-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products grid skeleton */}
        <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16">
              {/* Sidebar skeleton */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="lg:sticky lg:top-32 space-y-4">
                  <div className="h-3 w-16 bg-foreground/10 rounded animate-pulse" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-foreground/5 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Grid skeleton */}
              <div className="flex-1">
                <div className="h-3 w-32 bg-foreground/10 rounded animate-pulse mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden border border-border"
                    >
                      <div className="aspect-square bg-secondary/40 animate-pulse" />
                      <div className="p-4 sm:p-5 space-y-2.5">
                        <div className="h-2 w-16 bg-foreground/8 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
                        <div className="h-3 w-2/3 bg-foreground/5 rounded animate-pulse" />
                        <div className="my-1.5 h-px bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="h-2 w-20 bg-foreground/8 rounded animate-pulse" />
                          <div className="h-2 w-12 bg-accent-warm-gold/20 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
