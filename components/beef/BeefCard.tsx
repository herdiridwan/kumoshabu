"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LazyImage } from "@/components/ui/LazyImage";
import type { BeefCut } from "@/lib/menu";

type BeefCardProps = {
  cut: BeefCut;
  onSelect: () => void;
  index: number;
};

export function BeefCard({ cut, onSelect, index }: BeefCardProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="text-left w-full rounded-lg overflow-hidden border border-foreground/10 hover:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors group"
      initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index ?? 0) * 0.05 }}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-background/10">
        <LazyImage
          src={cut.image}
          alt={cut.name}
          aspectRatio="4/3"
          sizes="50vw"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 bg-background">
        <span className="font-heading text-sm uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
          {cut.name}
        </span>
      </div>
    </motion.button>
  );
}
