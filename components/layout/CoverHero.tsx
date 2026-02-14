"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function CoverHero() {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.6;

  return (
    <header className="relative min-h-dvh flex flex-col">
      <div className="absolute inset-0 z-0 bg-background/50" aria-hidden />
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={reducedMotion ? {} : { scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/Logo-01.webp"
            alt="KUMO"
            width={320}
            height={140}
            className="w-72 sm:w-80 md:w-96 h-auto object-contain"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="#menu"
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-8 py-3 font-heading uppercase tracking-[0.2em] text-sm border border-accent text-accent bg-transparent rounded-full hover:bg-accent hover:text-background transition-[background-color,color] duration-220 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Menu
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
}
