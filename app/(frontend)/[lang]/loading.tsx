export default function HomeLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="h-16 bg-white/80 border-b border-border" />

      <main>
        {/* Hero skeleton */}
        <section className="w-full h-[500px] md:h-[600px] relative overflow-hidden bg-secondary/40">
          <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
          <div className="absolute inset-0 px-4 sm:px-6 py-16 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="max-w-2xl space-y-4">
                <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                <div className="h-12 w-3/4 bg-white/20 rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-white/15 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/15 rounded animate-pulse" />
                <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse mt-4" />
              </div>
            </div>
          </div>
        </section>

        {/* Value props skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-3 w-20 bg-foreground/10 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-8 w-64 bg-foreground/10 rounded mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 rounded-xl border border-foreground/10 bg-white/50">
                  <div className="h-10 w-10 bg-foreground/10 rounded-lg mb-4 animate-pulse" />
                  <div className="h-5 w-32 bg-foreground/10 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-foreground/5 rounded mt-1 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-3 w-20 bg-foreground/10 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-8 w-48 bg-foreground/10 rounded mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border">
                  <div className="aspect-square bg-secondary/40 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-2 w-16 bg-foreground/8 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <div className="h-48 bg-secondary/30 border-t border-border" />
    </div>
  );
}
