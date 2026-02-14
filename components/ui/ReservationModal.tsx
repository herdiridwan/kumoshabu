"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "628211016272";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setPhoneDigits(digits);
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Required";
    if (!phoneDigits.trim()) next.phone = "Required";
    else if (phoneDigits.length < 9) next.phone = "Enter a valid number";
    if (!date) next.date = "Required";
    if (!pax) next.pax = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const localPhone = "0" + phoneDigits;
    const waPhone = "62" + phoneDigits;
    const message = [
      "Hello, I would like to make a reservation at Kumo",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${localPhone}`,
      `Date: ${date}`,
      `Pax: ${pax}`,
      description.trim() ? `Notes: ${description.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    onClose();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contentTransition = {
    duration: reducedMotion ? 0 : 0.25,
    ease: "easeOut" as const,
  };

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal
              aria-labelledby="reservation-modal-title"
              className={cn(
                "pointer-events-auto w-full max-w-sm rounded-xl bg-background text-foreground shadow-2xl border border-accent/30 p-6"
              )}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96 }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96 }
              }
              transition={contentTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  id="reservation-modal-title"
                  className="font-heading text-lg uppercase tracking-widest text-foreground"
                >
                  Reserve a table
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="res-name" className="block font-body text-sm text-foreground mb-1.5">
                    Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded border border-foreground/20 bg-background text-foreground font-body focus:border-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-accent">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-phone" className="block font-body text-sm text-foreground mb-1.5">
                    Phone
                  </label>
                  <div className="flex rounded border border-foreground/20 overflow-hidden focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
                    <span className="flex items-center px-3 py-2.5 bg-foreground/5 text-muted font-body text-sm border-r border-foreground/20">
                      +62
                    </span>
                    <input
                      id="res-phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={phoneDigits}
                      onChange={handlePhoneChange}
                      className="flex-1 px-3 py-2.5 bg-background text-foreground font-body focus:outline-none min-w-0"
                      placeholder="8123456789"
                      autoComplete="tel-national"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-accent">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-date" className="block font-body text-sm text-foreground mb-1.5">
                    Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded border border-foreground/20 bg-background text-foreground font-body focus:border-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-accent">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-pax" className="block font-body text-sm text-foreground mb-1.5">
                    Pax
                  </label>
                  <select
                    id="res-pax"
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded border border-foreground/20 bg-background text-foreground font-body focus:border-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                  {errors.pax && (
                    <p className="mt-1 text-sm text-accent">{errors.pax}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-description" className="block font-body text-sm text-foreground mb-1.5">
                    Description <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="res-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 rounded border border-foreground/20 bg-background text-foreground font-body focus:border-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
                    placeholder="Notes or special requests"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] mt-2 font-heading uppercase tracking-[0.12em] text-sm bg-accent text-background rounded-full hover:opacity-90 active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-opacity"
                >
                  SEND RESERVATION
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
