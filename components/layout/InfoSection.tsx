"use client";

import { motion, useReducedMotion } from "framer-motion";

export function InfoSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="info"
      className="relative px-4 py-16 border-t border-foreground/10"
      aria-labelledby="info-heading"
      style={{
        boxShadow: "0 -12px 32px rgba(0,0,0,0.5), 0 -4px 12px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/WoodBackground.webp)" }}
        aria-hidden
      />
      <motion.div
        className="relative z-10"
        initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2
          id="info-heading"
          className="font-heading text-xl uppercase tracking-widest text-foreground mb-8"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.6)" }}
        >
          Visit Us
        </h2>
        <div
          className="font-body text-foreground/90 space-y-4 text-base leading-relaxed"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)" }}
        >
          <p>
            <strong className="text-foreground" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
              Location
            </strong>
            <br />
            <span style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
              One Belpark Mall, Jl. RS. Fatmawati Raya No.1, RT.1/RW.2, Pondok Labu, Cilandak, South Jakarta City, Jakarta 12450
            </span>
            <br />
            <a
              href="https://maps.app.goo.gl/ifVo4G2kVpBtankY7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-2 min-h-[44px] px-6 py-2.5 rounded-full font-heading font-semibold uppercase tracking-[0.12em] text-xs border border-accent text-accent hover:bg-accent hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.75)" }}
            >
              Get Directions
            </a>
          </p>
          <p>
            <strong className="text-foreground" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
              Opening hours
            </strong>
            <br />
            10.00 am–10.00 pm
          </p>
          <a
            href="#info"
            className="inline-flex items-center justify-center mt-4 min-h-[44px] px-6 py-2.5 rounded-full font-heading font-semibold uppercase tracking-[0.15em] text-sm border border-accent text-accent hover:bg-accent hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.75)" }}
          >
            Reserve a table
          </a>
        </div>
      </motion.div>
    </section>
  );
}
