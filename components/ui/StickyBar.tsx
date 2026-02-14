"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

const RESERVATION_URL = "#info";
const WHATSAPP_NUMBER = "628211016272";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const SCROLL_THRESHOLD = 0.12;

export function StickyBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v >= SCROLL_THRESHOLD);
  });

  const entranceY = reducedMotion ? 0 : 12;
  const animateY = 0;

  return (
    <>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: entranceY }}
          animate={{ opacity: 1, y: animateY }}
          exit={{ opacity: 0, y: entranceY }}
          transition={{ duration: 0.32, delay: 0.05, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-accent/40 bg-background/80 backdrop-blur-md safe-area-pb pointer-events-none"
        >
          <div className="pointer-events-auto flex gap-3 justify-center items-center px-6 py-5 max-w-sm mx-auto">
            <Link
              href={RESERVATION_URL}
              className="sticky-bar-reserve min-h-[44px] inline-flex items-center justify-center px-8 py-2.5 font-heading uppercase tracking-[0.12em] text-xs border border-accent text-accent rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[background-color,color] duration-220 ease-out hover:bg-accent hover:text-background active:opacity-90"
            >
              Reserve
            </Link>
            <motion.span
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={{ ease: "easeOut" }}
            >
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center px-8 py-2.5 font-heading font-semibold uppercase tracking-[0.12em] text-xs bg-accent text-background rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:opacity-90"
              >
                WhatsApp
              </Link>
            </motion.span>
          </div>
        </motion.div>
      )}
    </>
  );
}
