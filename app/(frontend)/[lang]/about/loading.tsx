export default function AboutLoading() {
  return (
    <div>
      <div className="h-16 bg-white/80 border-b border-border" />
      <main>
        {/* Hero skeleton — centered */}
        <section className="w-full bg-background">
          <div className="mx-auto max-w-5xl py-16 text-center md:py-24 space-y-8 md:space-y-10">
            <div className="h-4 w-32 bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-12 w-3/4 bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-4 w-full bg-foreground/5 rounded mx-auto animate-pulse" />
            <div className="h-4 w-5/6 bg-foreground/5 rounded mx-auto animate-pulse" />
            <div className="h-10 w-32 bg-primary/20 rounded-full mx-auto mt-4 animate-pulse" />
          </div>
          <div className="mx-auto max-w-5xl px-4 pb-12 md:pb-20">
            <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-foreground/10 rounded-2xl animate-pulse" />
          </div>
        </section>

        {/* Statistics skeleton */}
        <section className="w-full bg-surface-muted">
          <div className="container-full">
            <div className="py-16 md:py-20">
              <div className="text-center mb-12">
                <div className="h-8 w-40 bg-foreground/10 rounded mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-surface p-6 md:p-8 text-center space-y-2">
                    <div className="h-10 w-20 bg-foreground/10 rounded mx-auto animate-pulse" />
                    <div className="h-3 w-24 bg-foreground/5 rounded mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="h-48 bg-secondary/30 border-t border-border" />
    </div>
  );
}
