"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="font-heading text-xl uppercase tracking-widest text-foreground mb-4">
        Something went wrong
      </h2>
      <p className="font-body text-muted text-sm text-center mb-6">
        We couldn’t load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="min-h-[44px] px-6 py-2 font-heading uppercase tracking-[0.15em] text-sm border border-accent text-accent hover:bg-accent/10 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Try again
      </button>
    </div>
  );
}
