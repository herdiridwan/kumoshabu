"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import { ReservationModal } from "./ReservationModal";
import { SideSheet } from "./SideSheet";
import { BottomSheet } from "./BottomSheet";
import { getCategories } from "@/lib/menu";

const SCROLL_THRESHOLD = 0.12;

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function StickyBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = getCategories();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v >= SCROLL_THRESHOLD);
  });

  const entranceY = reducedMotion ? 0 : 12;
  const animateY = 0;

  const handleCategorySelect = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    setCategoryOpen(false);
  };

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
          <div className="pointer-events-auto flex justify-between items-center px-6 py-5 max-w-sm mx-auto gap-4">
            <button
              type="button"
              onClick={() => setHamburgerOpen(true)}
              className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Open menu"
            >
              <HamburgerIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="flex-1 min-h-[44px] flex items-center justify-center px-6 py-2.5 font-heading font-semibold uppercase tracking-[0.12em] text-xs bg-accent text-background rounded-full hover:opacity-90 active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-opacity"
            >
              RESERVE
            </button>

            <button
              type="button"
              onClick={() => setCategoryOpen(true)}
              className="shrink-0 min-h-[44px] flex items-center justify-center px-5 py-2.5 font-heading uppercase tracking-[0.12em] text-xs border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              CATEGORY
            </button>
          </div>
        </motion.div>
      )}

      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

      <SideSheet
        isOpen={hamburgerOpen}
        onClose={() => setHamburgerOpen(false)}
        onReservationClick={() => {
          setHamburgerOpen(false);
          setReservationOpen(true);
        }}
      />

      <BottomSheet
        isOpen={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        title="Categories"
      >
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className="w-full flex items-center min-h-[48px] px-4 py-3 rounded-lg font-body text-foreground hover:bg-foreground/5 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
