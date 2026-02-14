"use client";

import {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useId,
} from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

type BrothProfile = {
  tagline: string;
  hint: string;
  extendedDescription: string;
  rating: number;
  chefRecommendation: string;
  suggestedPairing?: string;
};

const BROTH_PROFILES: Record<string, BrothProfile> = {
  Dashi: {
    tagline: "Light & clean",
    hint: "Tap for details",
    extendedDescription:
      "A delicate kombu and bonito broth designed to highlight Wagyu sweetness.",
    rating: 5,
    chefRecommendation: "Premium cuts",
  },
  Shoyu: {
    tagline: "Balanced umami",
    hint: "Tap for details",
    extendedDescription:
      "Classic soy-based broth with rounded depth and balanced saltiness.",
    rating: 4,
    chefRecommendation: "Mixed cuts",
  },
  "Spicy Miso": {
    tagline: "Rich & warming",
    hint: "Tap for details",
    extendedDescription:
      "Fermented miso with gentle spice that adds body and warmth.",
    rating: 4,
    chefRecommendation: "Bold flavor lovers",
  },
};

const ENTER_DURATION = 0.35;
const SLIDER_DURATION_MS = 280;
const SLIDER_DURATION_S = SLIDER_DURATION_MS / 1000;
const CONTENT_ENTER_DELAY_MS = 120;
const CONTENT_ENTER_DELAY_S = CONTENT_ENTER_DELAY_MS / 1000;
const STARS_DELAY_S = 0.1;
const CONTENT_EXIT_MS = 150;
const CONTENT_EXIT_S = CONTENT_EXIT_MS / 1000;

type BrothSelectionProps = {
  brothKeys: string[];
};

export function BrothSelection({ brothKeys }: BrothSelectionProps) {
  const [activeKey, setActiveKey] = useState<string>(brothKeys[0] ?? "");
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderLayout, setSliderLayout] = useState({
    left: 0,
    width: 0,
  });
  const sectionId = useId();
  const panelId = useId();

  const activeIndex = brothKeys.indexOf(activeKey);
  const firstKey = brothKeys[0];
  const showChefSuggestion = activeKey === firstKey;

  useLayoutEffect(() => {
    const track = trackRef.current;
    const segment =
      activeIndex >= 0 ? segmentRefs.current[activeIndex] : null;
    if (!track || !segment) return;
    const trackRect = track.getBoundingClientRect();
    const segmentRect = segment.getBoundingClientRect();
    setSliderLayout({
      left: segmentRect.left - trackRect.left,
      width: segmentRect.width,
    });
  }, [activeKey, activeIndex, brothKeys.length]);

  const handleSegmentClick = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      let next = activeIndex;
      if (e.key === "ArrowLeft")
        next = activeIndex <= 0 ? brothKeys.length - 1 : activeIndex - 1;
      if (e.key === "ArrowRight")
        next = activeIndex >= brothKeys.length - 1 ? 0 : activeIndex + 1;
      const nextKey = brothKeys[next];
      if (nextKey) {
        setActiveKey(nextKey);
        segmentRefs.current[next]?.focus();
      }
    },
    [activeIndex, brothKeys]
  );

  const sliderTransition = {
    duration: reducedMotion ? 0 : SLIDER_DURATION_S,
    ease: [0.33, 0, 0.2, 1] as const,
  };

  return (
    <div
      className="mt-6 mb-8"
      role="group"
      aria-label="Select your broth"
      id={sectionId}
    >
      <motion.h3
        className="font-heading text-xs uppercase tracking-[0.2em] text-foreground"
        initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: ENTER_DURATION, ease: "easeOut" }}
      >
        SELECT YOUR BROTH
      </motion.h3>
      <motion.p
        className="mt-2 font-body text-muted text-sm"
        initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: ENTER_DURATION,
          ease: "easeOut",
          delay: reducedMotion ? 0 : 0.05,
        }}
      >
        Crafted to complement the texture of Wagyu.
      </motion.p>

      <div className="mt-6 flex flex-col items-center">
        {/* Track: dark matte, engraved slot; segment buttons with engraved labels */}
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Broth options"
          onKeyDown={handleKeyDown}
          className="relative w-full max-w-2xl flex rounded-full bg-[#1a1f2e] p-1.5"
          style={{
            boxShadow:
              "inset 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,0,0,0.2)",
          }}
        >
          {brothKeys.map((key, i) => {
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                ref={(el) => {
                  segmentRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                id={`${sectionId}-tab-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSegmentClick(key)}
                className="relative flex-1 flex items-center justify-center py-3 px-4 font-heading text-sm tracking-wide
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1f2e]
                  border-0 bg-transparent cursor-pointer min-w-0"
                style={{
                  color: "rgba(163, 158, 148, 0.7)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                }}
              >
                <span className="truncate">{key}</span>
              </button>
            );
          })}

          {/* Wooden slider: moves over the track */}
          <motion.div
            aria-hidden
            className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none flex items-center justify-center overflow-hidden"
            style={{
              left: sliderLayout.left,
              width: sliderLayout.width,
              backgroundImage: "url(/assets/WoodBackground.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.35)",
            }}
            initial={false}
            animate={{
              left: sliderLayout.left,
              width: sliderLayout.width,
            }}
            transition={sliderTransition}
          >
            <span
              className="font-heading text-sm tracking-wide text-foreground truncate px-2"
              style={{
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {activeKey}
            </span>
          </motion.div>
        </div>

        {/* Content panel */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${sectionId}-tab-${activeIndex}`}
          className="w-full max-w-2xl rounded-b-lg border border-t-0 border-foreground/5 bg-linear-to-b from-foreground/6 to-foreground/4 backdrop-blur-sm px-6 py-5 min-h-40 mt-4"
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeKey && BROTH_PROFILES[activeKey] && (
              <BrothPanelContent
                key={activeKey}
                profile={BROTH_PROFILES[activeKey]}
                showChefSuggestion={showChefSuggestion}
                reducedMotion={!!reducedMotion}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.p
        className="mt-6 font-body text-muted text-sm"
        initial={reducedMotion ? undefined : { opacity: 0 }}
        whileInView={reducedMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Pairs best with your selected cut.
      </motion.p>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  const filled = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return (
    <span className="font-body text-accent text-sm tracking-wide" aria-hidden>
      {filled}
      {empty}
    </span>
  );
}

type BrothPanelContentProps = {
  profile: BrothProfile;
  showChefSuggestion: boolean;
  reducedMotion: boolean;
};

function BrothPanelContent({
  profile,
  showChefSuggestion,
  reducedMotion,
}: BrothPanelContentProps) {
  const { extendedDescription, rating, chefRecommendation } = profile;
  const enterDelay = reducedMotion ? 0 : CONTENT_ENTER_DELAY_S;
  const starsDelay = reducedMotion ? 0 : CONTENT_ENTER_DELAY_S + STARS_DELAY_S;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        enter: {
          duration: reducedMotion ? 0 : 0.25,
          delay: enterDelay,
          ease: "easeOut",
        },
        exit: {
          duration: reducedMotion ? 0 : CONTENT_EXIT_S,
          delay: 0,
          ease: "easeOut",
        },
      }}
      className="space-y-3"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 0.25,
          delay: enterDelay,
          ease: "easeOut",
        }}
      >
        {showChefSuggestion && (
          <span className="font-body text-accent text-xs tracking-[0.2em] uppercase block">
            Chef Suggestion
          </span>
        )}
        <p className="font-body text-foreground/90 text-sm leading-relaxed">
          {extendedDescription}
        </p>
        <p className="font-body text-muted text-sm">
          Chef recommends for: {chefRecommendation}
        </p>
      </motion.div>
      <motion.div
        className="pt-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 0.25,
          delay: starsDelay,
          ease: "easeOut",
        }}
      >
        <StarRow rating={rating} />
      </motion.div>
    </motion.div>
  );
}
