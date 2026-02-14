"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getSignatureItems } from "@/lib/menu";
import { formatPrice } from "@/lib/utils";
import type { SignatureItemEntry } from "@/lib/menu";

const STAGGER_DELAY = 0.08;
const ENTER_DURATION = 0.35;

/** Items that use a smaller, centered image (card size unchanged). */
const SMALL_CENTERED_IMAGE_ITEMS = new Set([
  "Beer Bali Hai",
  "Ocha Hot/Ice *Free Refill",
]);
export function SignatureCarousel() {
  const entries = getSignatureItems();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const updateFocusedIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || entries.length === 0) return;
    const containerRect = el.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const cards = el.querySelectorAll("[data-carousel-card]");
    let bestIndex = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const r = (card as HTMLElement).getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    });
    setFocusedIndex(Math.min(bestIndex, entries.length - 1));
  }, [entries.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFocusedIndex();
    el.addEventListener("scroll", updateFocusedIndex, { passive: true });
    window.addEventListener("resize", updateFocusedIndex);
    return () => {
      el.removeEventListener("scroll", updateFocusedIndex);
      window.removeEventListener("resize", updateFocusedIndex);
    };
  }, [updateFocusedIndex]);

  if (entries.length === 0) return null;

  return (
    <section
      className="px-4 py-16"
      aria-labelledby="signature-carousel-heading"
      aria-label="Signature selection, swipe to browse"
    >
      <motion.h2
        id="signature-carousel-heading"
        className="font-heading text-sm uppercase tracking-[0.3em] text-foreground mb-2 text-center"
        initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: ENTER_DURATION, ease: "easeOut" }}
      >
        SIGNATURE SELECTION
      </motion.h2>
      <motion.p
        className="font-body text-muted text-sm text-center mb-8"
        initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: ENTER_DURATION, ease: "easeOut", delay: 0.05 }}
      >
        Selected by our chef for the best Wagyu experience
      </motion.p>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-[max(1rem,calc(50%-min(40vw,160px)-8px))]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {entries.map((entry, i) => (
          <SignatureCarouselCard
            key={`${entry.category.id}-${entry.item.name}`}
            entry={entry}
            index={i}
            isFocused={focusedIndex === i}
            reducedMotion={!!reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

type SignatureCarouselCardProps = {
  entry: SignatureItemEntry;
  index: number;
  isFocused: boolean;
  reducedMotion: boolean;
};

function SignatureCarouselCard({
  entry,
  index,
  isFocused,
  reducedMotion,
}: SignatureCarouselCardProps) {
  const { item, category } = entry;
  const imageSrc = item.image || category.heroImage || "/assets/Shabu Shabu.png";

  const handleClick = () => {
    const target = document.getElementById(category.id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      data-carousel-card
      initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ENTER_DURATION,
        ease: "easeOut",
        delay: reducedMotion ? 0 : index * STAGGER_DELAY,
      }}
      className={`shrink-0 w-[min(80vw,320px)] snap-center transition-[filter] duration-200 ${!isFocused ? "opacity-95" : ""}`}
      style={!isFocused ? { filter: "blur(0.4px)" } : undefined}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={`${item.name}, navigate to ${category.name} section`}
        className={`
          w-full text-left rounded-lg overflow-hidden border transition-[transform,box-shadow,border-color] duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
          ${isFocused ? "border-accent/60" : "border-foreground/10"}
        `}
        style={{
          boxShadow: "inset 0 2px 12px rgba(0,0,0,0.2)",
          backgroundImage: "url(/assets/WoodBackground.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                scale: isFocused ? 1 : 0.98,
              }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
      >
        <div className="relative bg-linear-to-t from-black/70 via-black/20 to-transparent">
          <div className="aspect-4/3 relative overflow-hidden flex items-center justify-center">
            {item.name === "Wagyu Cheese Ball" ? (
              <div className="w-[85%] h-[85%] relative">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 80vw, 320px"
                />
              </div>
            ) : SMALL_CENTERED_IMAGE_ITEMS.has(item.name) ? (
              <div className="w-[80%] h-[80%] relative">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 80vw, 320px"
                />
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 320px"
              />
            )}
          </div>
          {isFocused && (
            <div
              className="absolute left-0 right-0 bottom-0 h-px bg-accent/80"
              aria-hidden
            />
          )}
          <div className="p-4 relative">
            <p className="font-heading text-foreground text-base">{item.name}</p>
            {item.description && (
              <p className="mt-1 font-body text-muted text-sm line-clamp-2">
                {item.description}
              </p>
            )}
            <p className="mt-2 font-body text-accent tabular-nums text-sm">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
