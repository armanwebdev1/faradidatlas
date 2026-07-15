export default function BlogLoading() {
  return (
    <div>
      <div className="h-16 bg-white/80 border-b border-border" />
      <main>
        {/* Hero skeleton */}
        <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-secondary/40">
          <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
          <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
            <div className="max-w-7xl w-full mx-auto">
              <div className="space-y-3">
                <div className="h-10 sm:h-12 w-3/4 bg-white/20 rounded-lg animate-pulse" />
                <div className="h-4 sm:h-5 w-1/2 bg-white/15 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog content skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-foreground/10 bg-white/80 overflow-hidden">
                  <div className="aspect-video bg-secondary/40 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-2 w-16 bg-foreground/8 rounded animate-pulse" />
                    <div className="h-5 w-3/4 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-foreground/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="h-48 bg-secondary/30 border-t border-border" />
    </div>
  );
}
