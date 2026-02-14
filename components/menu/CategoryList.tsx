"use client";

import Link from "next/link";
import { getCategories } from "@/lib/menu";

export function CategoryList() {
  const categories = getCategories();
  return (
    <nav id="menu" className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-foreground/10 px-4 py-3" aria-label="Menu categories">
      <ul className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`#${cat.id}`}
              className="block font-body text-foreground/80 hover:text-accent text-sm whitespace-nowrap py-2 px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] flex items-center"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
