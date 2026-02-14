"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export function BottomSheet({ isOpen, onClose, children, title, className }: BottomSheetProps) {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby={title ? "bottom-sheet-title" : undefined}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background text-foreground shadow-2xl",
              className
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              duration: reducedMotion ? 0.1 : 0.3,
              ease: "easeOut",
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground/10 bg-background px-4 py-3">
              {title && (
                <h2 id="bottom-sheet-title" className="font-heading text-lg uppercase tracking-widest text-foreground">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] rounded text-foreground/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
