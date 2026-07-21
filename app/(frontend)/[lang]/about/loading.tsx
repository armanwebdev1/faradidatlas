export default function AboutLoading() {
  return (
    <div>
      <div className="h-16 bg-white/80 border-b border-border" />
      <main>
        {/* Hero skeleton - centered text with side image */}
        <section className="w-full bg-background">
          <div className="container-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-16 md:py-24">
              <div className="w-full lg:w-2/5 aspect-[4/3] bg-foreground/10 rounded-2xl animate-pulse shrink-0 order-2 lg:order-1" />
              <div className="flex-1 max-w-xl text-center space-y-6 order-1 lg:order-2">
                <div className="h-4 w-32 bg-foreground/10 rounded mx-auto animate-pulse" />
                <div className="h-12 w-3/4 bg-foreground/10 rounded mx-auto animate-pulse" />
                <div className="h-4 w-full bg-foreground/5 rounded mx-auto animate-pulse" />
                <div className="h-4 w-5/6 bg-foreground/5 rounded mx-auto animate-pulse" />
                <div className="h-10 w-32 bg-primary/20 rounded-full mx-auto mt-4 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics skeleton - rounded cards */}
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
