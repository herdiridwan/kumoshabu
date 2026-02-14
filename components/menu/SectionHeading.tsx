"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  headingId: string;
  isActive?: boolean;
  isPrevious?: boolean;
};

const DIVIDER_DURATION = 0.3;
const TITLE_DURATION = 0.45;
const SUBTITLE_DURATION = 0.4;
const SUBTITLE_DELAY = 0.12;
const TITLE_Y = 10;

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-[120px] mx-auto" aria-hidden>
      <span className="flex-1 h-px bg-accent min-w-[40px]" />
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
      <span className="flex-1 h-px bg-accent min-w-[40px]" />
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  headingId,
  isActive = false,
  isPrevious = false,
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });

  const opacityState = isActive ? "opacity-100" : isPrevious ? "opacity-80" : "opacity-70";
  const transitionClass = "transition-opacity duration-300";

  const dividerInitial = reducedMotion ? undefined : { opacity: 0 };
  const dividerAnimate = reducedMotion ? undefined : { opacity: 1 };
  const titleInitial = reducedMotion ? undefined : { opacity: 0, y: TITLE_Y };
  const titleAnimate = reducedMotion ? undefined : { opacity: 1, y: 0 };
  const subtitleInitial = reducedMotion ? undefined : { opacity: 0, y: TITLE_Y };
  const subtitleAnimate = reducedMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <div className="pt-12 pb-6 text-center mx-auto max-w-2xl px-4">
      {/* Divider — fades in first */}
      <motion.div
        initial={dividerInitial}
        whileInView={dividerAnimate}
        viewport={{ once: true }}
        transition={{ duration: DIVIDER_DURATION, ease: "easeOut" }}
        className="mb-5"
      >
        <GoldDivider />
      </motion.div>

      {/* Title — large, Trajan-style, then one-time shimmer */}
      <motion.h2
        ref={titleRef}
        id={headingId}
        initial={titleInitial}
        whileInView={titleAnimate}
        viewport={{ once: true }}
        transition={{ duration: TITLE_DURATION, ease: "easeOut" }}
        className={`
          font-heading uppercase tracking-[0.35em] text-foreground
          text-4xl sm:text-5xl md:text-6xl
          ${transitionClass} ${opacityState}
          ${isInView && !reducedMotion ? "section-heading-shimmer" : ""}
        `}
      >
        {title}
      </motion.h2>

      {/* Subtitle — fades up after 120ms */}
      {subtitle && (
        <motion.p
          initial={subtitleInitial}
          whileInView={subtitleAnimate}
          viewport={{ once: true }}
          transition={{
            duration: SUBTITLE_DURATION,
            delay: SUBTITLE_DELAY,
            ease: "easeOut",
          }}
          className={`font-body text-muted text-sm sm:text-base mt-3 ${transitionClass} ${opacityState}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
