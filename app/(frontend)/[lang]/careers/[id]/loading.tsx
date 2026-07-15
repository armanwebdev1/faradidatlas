export default function JobDetailLoading() {
  return (
    <div>
      <div className="h-16 bg-white/80 border-b border-border" />
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 mb-8">
            <div className="h-3 w-12 bg-foreground/10 rounded animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
            <div className="h-3 w-16 bg-foreground/10 rounded animate-pulse" />
          </div>

          {/* Job detail skeleton */}
          <div className="rounded-3xl border border-foreground/10 bg-white/85 p-6 sm:p-8">
            <div className="h-8 w-3/4 bg-foreground/10 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-accent-warm-gold/20 rounded mt-4 animate-pulse" />
            <div className="h-px bg-foreground/10 my-6" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 w-full bg-foreground/5 rounded animate-pulse" />
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <div className="h-12 w-40 bg-primary/20 rounded-full animate-pulse" />
              <div className="h-12 w-32 bg-foreground/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </main>
      <div className="h-48 bg-secondary/30 border-t border-border" />
    </div>
  );
}
