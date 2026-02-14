import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-2xl uppercase tracking-widest text-foreground mb-4">
        404
      </h1>
      <p className="font-body text-muted text-sm text-center mb-6">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="min-h-[44px] px-6 py-2 font-heading uppercase tracking-[0.15em] text-sm bg-accent text-background hover:bg-accent/90 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Back to home
      </Link>
    </div>
  );
}
