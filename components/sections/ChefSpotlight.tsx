"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getChefPick } from "@/lib/menu";
import { formatPrice } from "@/lib/utils";
import { BottomSheet } from "@/components/ui/BottomSheet";

export function ChefSpotlight() {
  const [detailOpen, setDetailOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const item = getChefPick();
  if (!item) return null;

  const imageSrc = item.image || "/assets/Shabu Shabu.png";

  return (
    <section className="px-4 py-16" aria-labelledby="chef-spotlight-heading">
      <h2
        id="chef-spotlight-heading"
        className="font-heading text-sm uppercase tracking-[0.3em] text-muted mb-8 text-center"
      >
        Chef Recommends
      </h2>
      <motion.button
        type="button"
        onClick={() => setDetailOpen(true)}
        className="w-full max-w-md mx-auto block text-left rounded-lg overflow-hidden border border-foreground/10 hover:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors group"
        initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="aspect-[4/3] relative overflow-hidden bg-background/10">
          <motion.span
            className="block w-full h-full"
            initial={reducedMotion ? undefined : { scale: 0.98, opacity: 0.9 }}
            whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.span>
        </div>
        <div className="p-4 bg-background/80">
          <p className="font-body text-foreground text-lg">{item.name}</p>
          {item.description && (
            <p className="mt-1 font-body text-muted text-sm line-clamp-2">{item.description}</p>
          )}
          <p className="mt-2 font-body text-accent tabular-nums">{formatPrice(item.price)}</p>
        </div>
      </motion.button>

      <BottomSheet
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={item.name}
      >
        <div className="space-y-4">
          {item.description && (
            <p className="font-body text-foreground/90 leading-relaxed">{item.description}</p>
          )}
          {item.serves && (
            <p className="font-body text-muted text-sm">Serves: {item.serves}</p>
          )}
          {item.pairing && item.pairing.length > 0 && (
            <p className="font-body text-muted text-sm">
              Pairs well with: {item.pairing.join(", ")}
            </p>
          )}
          <p className="font-body text-accent text-lg tabular-nums">{formatPrice(item.price)}</p>
        </div>
      </BottomSheet>
    </section>
  );
}
