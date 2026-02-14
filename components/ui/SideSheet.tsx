"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MAP_URL = "https://maps.app.goo.gl/ifVo4G2kVpBtankY7";

type SideSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onReservationClick: () => void;
};

type NavItem =
  | { label: string; href: string; internal: true; external?: false }
  | { label: string; internal: false }
  | { label: string; href: string; internal: false; external: true };

const navItems: NavItem[] = [
  { label: "Home", href: "#main", internal: true },
  { label: "Menu", href: "#menu", internal: true },
  { label: "Reservation", internal: false },
  { label: "Location / Map", href: MAP_URL, internal: false, external: true },
];

export function SideSheet({ isOpen, onClose, onReservationClick }: SideSheetProps) {
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
            aria-label="Navigation menu"
            className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background text-foreground shadow-2xl border-r border-accent/30"
            initial={{ x: reducedMotion ? 0 : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "-100%" }}
            transition={{
              type: "tween",
              duration: reducedMotion ? 0.1 : 0.3,
              ease: "easeOut",
            }}
          >
            <div className="flex flex-col h-full pt-4">
              <div className="flex items-center justify-between px-4 py-4 border-b border-foreground/10">
                <h2 className="font-heading text-lg uppercase tracking-widest text-foreground">
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] min-w-[44px] rounded text-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => {
                  if (item.label === "Reservation") {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          onClose();
                          onReservationClick();
                        }}
                        className="flex items-center min-h-[48px] px-4 py-3 rounded-lg font-body text-foreground hover:bg-foreground/5 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                      >
                        {item.label}
                      </button>
                    );
                  }
                  if ("external" in item && item.external && "href" in item && item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center min-h-[48px] px-4 py-3 rounded-lg font-body text-foreground hover:bg-foreground/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  if ("internal" in item && item.internal && "href" in item && item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center min-h-[48px] px-4 py-3 rounded-lg font-body text-foreground hover:bg-foreground/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
