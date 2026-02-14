"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { formatPrice, splitItemName } from "@/lib/utils";
import type { MenuItem as MenuItemType } from "@/lib/menu";

const MOTION_DURATION = 0.3;
const MOTION_Y = 8;

type MenuItemProps = {
  item: MenuItemType;
  align?: "left" | "right";
  variant?: "default" | "addMore";
};

function buildDescriptor(item: MenuItemType): string | null {
  if (item.description) return item.description;
  const parts: string[] = [];
  if (item.serves) parts.push(`Good for ${item.serves}`);
  if (item.pairing?.length) parts.push(item.pairing.join(", "));
  return parts.length ? parts.join(" · ") : null;
}

export function MenuItem({ item, align = "left", variant = "default" }: MenuItemProps) {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const hasSubItems = !!item.subItems?.length;
  const hasDetail = !!(item.description || item.serves || (item.pairing && item.pairing.length > 0) || hasSubItems);
  const isExpandable = hasDetail;
  const showAccentBar = !!(item.chef_pick || item.recommended);
  const textAlign = align === "left" ? "text-left" : "text-right";
  const barSide = align === "left" ? "border-l-2 border-accent pl-4" : "border-r-2 border-accent pr-4";

  if (variant === "addMore") {
    const displayName = item.name.replace(/^Additional\s+/i, "").trim();
    return (
      <div className="py-2 font-body text-muted text-sm">
        <span>{displayName}</span>
        <span className="mx-2">·</span>
        <span className="tabular-nums">{formatPrice(item.price)}</span>
      </div>
    );
  }

  const { primary, secondary } = splitItemName(item.name);
  const descriptor = buildDescriptor(item);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: MOTION_Y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATION, ease: "easeOut" },
    },
  };

  const content = (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <motion.span
        className={`font-heading text-foreground text-lg uppercase tracking-[0.12em] flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}
        variants={reducedMotion ? undefined : itemVariants}
      >
        {primary}
        {isExpandable && (
          <span className="text-accent text-sm font-body normal-case tracking-normal" style={{ color: "var(--accent, #c9a227)" }} aria-hidden>
            &gt;
          </span>
        )}
      </motion.span>
      {secondary && (
        <motion.span
          className="font-body text-foreground/90 text-sm mt-0.5 block"
          variants={reducedMotion ? undefined : itemVariants}
        >
          {secondary}
        </motion.span>
      )}
      {descriptor && (
        <motion.p
          className="font-body text-muted text-sm mt-1 leading-relaxed max-w-md"
          variants={reducedMotion ? undefined : itemVariants}
        >
          {descriptor}
        </motion.p>
      )}
      <motion.span
        className="font-body text-accent text-lg tabular-nums tracking-wider mt-4 block"
        style={{ color: "var(--accent, #c9a227)" }}
        variants={reducedMotion ? undefined : itemVariants}
      >
        {formatPrice(item.price)}
      </motion.span>
    </div>
  );

  return (
    <div className={`py-8 ${showAccentBar ? barSide : ""}`}>
      <motion.div
        initial={reducedMotion ? undefined : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true }}
        variants={reducedMotion ? undefined : containerVariants}
      >
        <button
          type="button"
          onClick={() => isExpandable && setExpanded((e) => !e)}
          className={`w-full min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded ${textAlign}`}
          aria-expanded={isExpandable ? expanded : undefined}
        >
          {content}
        </button>
      </motion.div>
      <AnimatePresence>
        {expanded && hasDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
            className={`overflow-hidden ${align === "right" ? "text-right" : "text-left"}`}
          >
            <div className="pb-4 pt-2 space-y-2 font-body text-muted text-sm">
              {item.description && <p className="leading-relaxed">{item.description}</p>}
              {item.serves && <p>Serves: {item.serves}</p>}
              {item.pairing && item.pairing.length > 0 && (
                <p>Pairs well with: {item.pairing.join(", ")}</p>
              )}
              {hasSubItems && (
                <ul className="space-y-1">
                  {item.subItems!.map((sub) => (
                    <li key={sub}>– {sub}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
