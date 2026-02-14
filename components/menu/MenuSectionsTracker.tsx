"use client";

import { useRef, useEffect, useState } from "react";
import { MenuList } from "./MenuList";
import { getCategories } from "@/lib/menu";

export function MenuSectionsTracker() {
  const categories = getCategories();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);

  useEffect(() => {
    const refs = sectionRefs.current;
    const ids = categories.map((c) => c.id);
    const ratiosRef: Record<string, number> = {};
    ids.forEach((id) => {
      ratiosRef[id] = 0;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (ids.includes(id)) {
            ratiosRef[id] = entry.intersectionRatio;
          }
        });

        const byRatio = [...ids].sort((a, b) => (ratiosRef[b] ?? 0) - (ratiosRef[a] ?? 0));
        const topId = byRatio[0] && (ratiosRef[byRatio[0]] ?? 0) > 0 ? byRatio[0] : null;
        const topIndex = topId ? ids.indexOf(topId) : -1;
        const prevId = topIndex > 0 ? ids[topIndex - 1] : null;

        setActiveId(topId);
        setPreviousId(prevId);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    const scheduleObserve = requestAnimationFrame(() => {
      ids.forEach((id) => {
        const el = refs[id];
        if (el) observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(scheduleObserve);
      observer.disconnect();
    };
  }, [categories]);

  return (
    <div id="menu" className="px-4 pb-32">
      {categories.map((cat, index) => (
        <MenuList
          key={cat.id}
          category={cat}
          isFirst={index === 0}
          sectionRef={(el) => {
            sectionRefs.current[cat.id] = el;
          }}
          sectionState={{
            isActive: activeId === cat.id,
            isPrevious: previousId === cat.id,
          }}
        />
      ))}
    </div>
  );
}
