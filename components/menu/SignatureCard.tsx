"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { BottomSheet } from "@/components/ui/BottomSheet";
import type { MenuItem as MenuItemType, MenuCategory } from "@/lib/menu";

const SIGNATURE_LABEL: Record<string, string> = {
  "shabu-shabu": "Signature cut",
  sukiyaki: "Signature cut",
  "lunch-set": "Signature lunch",
  snacks: "Signature snacks",
  dessert: "Signature dessert",
  drinks: "Signature drinks",
  alcohol: "Signature alcohol",
};

/** Items that use a smaller, centered image (card size unchanged). */
const SMALL_CENTERED_IMAGE_ITEMS = new Set([
  "Beer Bali Hai",
  "Ocha Hot/Ice *Free Refill",
]);

type SignatureCardProps = {
  item: MenuItemType;
  category: MenuCategory;
};

export function SignatureCard({ item, category }: SignatureCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const imageSrc = item.image || category.heroImage || "/assets/Shabu Shabu.png";
  const signatureLabel = SIGNATURE_LABEL[category.id] ?? "Signature cut";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setDetailOpen(true)}
        className="w-full max-w-2xl mx-auto block rounded-lg overflow-hidden border border-foreground/10 hover:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors group text-left my-12"
        initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="aspect-16/10 relative overflow-hidden bg-background/10 flex items-center justify-center">
          <motion.span
            className={`block relative ${
              item.name === "Wagyu Cheese Ball"
                ? "w-[85%] h-[85%]"
                : SMALL_CENTERED_IMAGE_ITEMS.has(item.name)
                  ? "w-[65%] h-[65%]"
                  : "w-full h-full"
            }`}
            initial={reducedMotion ? undefined : { scale: 0.98, opacity: 0.9 }}
            whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </motion.span>
        </div>
        <div className="p-6 py-8 bg-background/80 text-center">
          <p className="font-heading text-accent text-xs uppercase tracking-[0.25em] mb-2">
            {signatureLabel}
          </p>
          <p className="font-body text-foreground text-xl">{item.name}</p>
          {item.description && (
            <p className="mt-3 font-body text-muted text-sm leading-relaxed max-w-md mx-auto">
              {item.description}
            </p>
          )}
          <p className="mt-6 font-body text-accent text-xl tabular-nums tracking-wider" style={{ color: "var(--accent, #c9a227)" }}>
            {formatPrice(item.price)}
          </p>
        </div>
      </motion.button>

      <BottomSheet isOpen={detailOpen} onClose={() => setDetailOpen(false)} title={item.name}>
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
          {item.subItems && item.subItems.length > 0 && (
            <ul className="font-body text-muted text-sm space-y-1">
              {item.subItems.map((sub) => (
                <li key={sub}>– {sub}</li>
              ))}
            </ul>
          )}
          <p className="font-body text-accent text-lg tabular-nums">{formatPrice(item.price)}</p>
        </div>
      </BottomSheet>
    </>
  );
}
