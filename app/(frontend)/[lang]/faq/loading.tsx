export default function FAQLoading() {
  return (
    <div lang="en" dir="ltr">
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

        {/* FAQ content skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-foreground/10 bg-white/80 p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-3/4 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-5 w-5 bg-foreground/10 rounded animate-pulse" />
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
