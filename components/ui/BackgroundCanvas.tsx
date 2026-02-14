"use client";

export function BackgroundCanvas() {
  return (
    <div
      className="fixed inset-0 z-0"
      aria-hidden
      style={{ backgroundColor: "#0d1424" }}
    >
      <div className="absolute inset-0 min-h-full min-w-full">
        <img
          src="/assets/Background.png?v=2"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          crossOrigin="anonymous"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(13, 20, 36, 0.45)" }}
        aria-hidden
      />
      <div className="page-vignette absolute inset-0 pointer-events-none" />
    </div>
  );
}
