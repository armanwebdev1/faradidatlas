export default function CareersLoading() {
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

        {/* Culture skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-3 w-20 bg-foreground/10 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-8 w-48 bg-foreground/10 rounded mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] to-transparent p-6 sm:p-7">
                  <div className="h-12 w-12 bg-foreground/10 rounded-2xl animate-pulse" />
                  <div className="h-5 w-24 bg-foreground/10 rounded mt-6 animate-pulse" />
                  <div className="h-3 w-full bg-foreground/5 rounded mt-3 animate-pulse" />
                  <div className="h-3 w-2/3 bg-foreground/5 rounded mt-1 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 w-64 bg-foreground/10 rounded mx-auto animate-pulse" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-foreground/10 bg-white/80 p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-5 w-48 bg-foreground/10 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-foreground/5 rounded animate-pulse" />
                    </div>
                    <div className="h-8 w-24 bg-primary/20 rounded-full animate-pulse" />
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
