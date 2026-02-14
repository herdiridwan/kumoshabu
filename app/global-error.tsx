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
      <body style={{ margin: 0, fontFamily: "serif", background: "#0d1424", color: "#f5f0e8", padding: "2rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "24rem" }}>
          <h1 style={{ fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "0.875rem", opacity: 0.8, marginBottom: "1.5rem" }}>
            A critical error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1.5rem",
              fontSize: "0.875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid #c9a227",
              color: "#c9a227",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
