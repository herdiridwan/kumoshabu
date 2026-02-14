"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { LazyImage } from "@/components/ui/LazyImage";
import type { BeefCut } from "@/lib/menu";

type BeefDetailOverlayProps = {
  cut: BeefCut | null;
  isOpen: boolean;
  onClose: () => void;
};

export function BeefDetailOverlay({ cut, isOpen, onClose }: BeefDetailOverlayProps) {
  if (!cut) return null;
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={cut.name}>
      <div className="space-y-4">
        <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
          <LazyImage src={cut.image} alt={cut.name} aspectRatio="4/3" sizes="100vw" />
        </div>
        <p className="font-body text-foreground/90 text-base leading-relaxed">{cut.description}</p>
      </div>
    </BottomSheet>
  );
}
