"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function BeefBanner() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [0, reducedMotion ? 0 : 30]);

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden min-h-[50vh] flex items-center justify-center"
      aria-labelledby="wagyu-heading"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/BannerBeef.png)", y }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-background/60" aria-hidden />
      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2
          id="wagyu-heading"
          className="font-heading text-2xl sm:text-3xl uppercase tracking-[0.25em] text-foreground"
        >
          Japanese Wagyu Selection
        </h2>
        <p className="mt-6 font-body text-foreground/90 text-base leading-relaxed tracking-wide">
          Our beef is selected for exceptional marbling and cut variety. Each cut is chosen to
          deliver the finest experience for shabu shabu and sukiyaki—from rich sirloin to
          tender brisket and refined chuck eye roll. Discover the catalogue below.
        </p>
      </motion.div>
    </section>
  );
}
