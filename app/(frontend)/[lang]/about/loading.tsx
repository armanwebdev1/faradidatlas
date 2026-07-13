export default function AboutLoading() {
  return (
    <div lang="en" dir="ltr">
      <div className="h-16 bg-white/80 border-b border-border" />
      <main>
        {/* Hero skeleton */}
        <section className="w-full py-20 bg-background">
          <div className="container-full text-center space-y-4">
            <div className="h-3 w-20 bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-12 w-3/4 max-w-3xl bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-10 w-32 bg-primary/20 rounded-full mx-auto mt-4 animate-pulse" />
          </div>
        </section>

        {/* Content skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-8 w-3/4 bg-foreground/10 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-foreground/5 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-foreground/5 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-foreground/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats skeleton */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-10 w-20 bg-foreground/10 rounded mx-auto mb-2 animate-pulse" />
                  <div className="h-3 w-24 bg-foreground/5 rounded mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cards skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 w-48 bg-foreground/10 rounded mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-foreground/10 bg-background p-6">
                  <div className="h-48 bg-secondary/40 rounded-xl animate-pulse" />
                  <div className="h-5 w-32 bg-foreground/10 rounded mt-4 animate-pulse" />
                  <div className="h-3 w-full bg-foreground/5 rounded mt-2 animate-pulse" />
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
