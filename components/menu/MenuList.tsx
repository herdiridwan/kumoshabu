"use client";

import { MenuItem } from "./MenuItem";
import { SignatureCard } from "./SignatureCard";
import { BrothSelection } from "./BrothSelection";
import { SectionHeading } from "./SectionHeading";
import type { MenuCategory, MenuItem as MenuItemType } from "@/lib/menu";

type MenuListProps = {
  category: MenuCategory;
  isFirst?: boolean;
  sectionRef?: (el: HTMLElement | null) => void;
  sectionState?: { isActive: boolean; isPrevious: boolean };
};

function isAddMoreMeat(name: string): boolean {
  return /^Additional\s/i.test(name);
}

export function MenuList({ category, isFirst, sectionRef, sectionState }: MenuListProps) {
  const mainItems: MenuItemType[] = [];
  const addMoreItems: MenuItemType[] = [];
  for (const item of category.items) {
    if (isAddMoreMeat(item.name)) addMoreItems.push(item);
    else mainItems.push(item);
  }

  const firstItem = mainItems[0];
  const restItems = mainItems.slice(1);
  const showAddMoreMeat = addMoreItems.length > 0 && ["shabu-shabu", "sukiyaki"].includes(category.id);

  return (
    <section
      ref={sectionRef}
      id={category.id}
      className={`scroll-mt-24 py-10 ${!isFirst ? "pt-14 border-t border-accent/30" : ""}`}
      aria-labelledby={`category-${category.id}`}
    >
      <SectionHeading
        title={category.name}
        subtitle={category.subtitle}
        headingId={`category-${category.id}`}
        isActive={sectionState?.isActive}
        isPrevious={sectionState?.isPrevious}
      />
      {category.soupChoice && category.soupChoice.length > 0 && (
        <div className="mb-6">
          <BrothSelection brothKeys={category.soupChoice} />
        </div>
      )}

      {firstItem && (
        <SignatureCard item={firstItem} category={category} />
      )}

      <ul className="space-y-0">
        {restItems.map((item, index) => (
          <li
            key={item.name}
            className={index > 0 ? "border-t border-foreground/10" : ""}
          >
            <MenuItem
              item={item}
              align={index % 2 === 0 ? "left" : "right"}
            />
          </li>
        ))}
      </ul>

      {showAddMoreMeat && addMoreItems.length > 0 && (
        <div className="mt-10 pt-6 border-t border-foreground/10">
          <h3 className="font-heading text-xs uppercase tracking-[0.25em] text-muted mb-4">
            Add More Meat
          </h3>
          <div className="space-y-0 text-muted">
            {addMoreItems.map((item, index) => (
              <div
                key={item.name}
                className={index > 0 ? "border-t border-foreground/10 pt-2 mt-2" : ""}
              >
                <MenuItem item={item} variant="addMore" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
