"use client";

import { useState } from "react";
import { getBeefCuts } from "@/lib/menu";
import { BeefCard } from "./BeefCard";
import { BeefDetailOverlay } from "./BeefDetailOverlay";

export function BeefCutsGrid() {
  const [selectedCut, setSelectedCut] = useState<ReturnType<typeof getBeefCuts>[0] | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const cuts = getBeefCuts();

  const handleSelect = (cut: (typeof cuts)[0]) => {
    setSelectedCut(cut);
    setOverlayOpen(true);
  };

  return (
    <section id="beef-cuts" className="px-4 py-16" aria-labelledby="beef-cuts-heading">
      <h2
        id="beef-cuts-heading"
        className="font-heading text-xl uppercase tracking-widest text-foreground mb-10"
      >
        Beef Cuts Catalogue
      </h2>
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {cuts.map((cut, i) => (
          <BeefCard key={cut.id} cut={cut} onSelect={() => handleSelect(cut)} index={i} />
        ))}
      </div>
      <BeefDetailOverlay cut={selectedCut} isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </section>
  );
}
