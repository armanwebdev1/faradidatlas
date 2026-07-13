export default function ContactLoading() {
  return (
    <div lang="en" dir="ltr">
      <div className="h-16 bg-white/80 border-b border-border" />
      <main>
        {/* Hero skeleton */}
        <section className="w-full py-20 bg-background">
          <div className="container-wide text-center space-y-4">
            <div className="h-3 w-20 bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-12 w-3/4 max-w-3xl bg-foreground/10 rounded mx-auto animate-pulse" />
            <div className="h-4 w-2/3 max-w-2xl bg-foreground/5 rounded mx-auto animate-pulse" />
          </div>
        </section>

        {/* Form + Offices skeleton */}
        <section className="px-4 sm:px-6 py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 w-48 bg-foreground/10 rounded animate-pulse" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-12 w-full bg-foreground/5 rounded-lg animate-pulse" />
                </div>
              ))}
              <div className="h-24 w-full bg-foreground/5 rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-primary/20 rounded-full animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-32 bg-foreground/10 rounded animate-pulse" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-foreground/10 bg-white/80">
                  <div className="h-5 w-24 bg-foreground/10 rounded animate-pulse" />
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
