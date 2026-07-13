"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#fafaf8",
          color: "#1a1a1a",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "480px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 1.5rem",
              borderRadius: "12px",
              background: "#d4a853",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "700" }}>
              F
            </span>
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            Unexpected Error
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#666",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#1a1a1a",
                color: "white",
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Refresh
            </button>
            <a
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                background: "transparent",
                color: "#1a1a1a",
                border: "1px solid #d1d1d1",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
