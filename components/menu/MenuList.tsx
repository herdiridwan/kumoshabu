"use client";

import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { SignatureCard } from "./SignatureCard";
import type { MenuCategory, MenuItem as MenuItemType } from "@/lib/menu";

type MenuListProps = {
  category: MenuCategory;
  isFirst?: boolean;
};

function isAddMoreMeat(name: string): boolean {
  return /^Additional\s/i.test(name);
}

export function MenuList({ category, isFirst }: MenuListProps) {
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
      id={category.id}
      className={`scroll-mt-24 py-16 ${!isFirst ? "pt-24 border-t border-accent/30" : ""}`}
      aria-labelledby={`category-${category.id}`}
    >
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h2
          id={`category-${category.id}`}
          className="font-heading text-xl sm:text-2xl uppercase tracking-[0.2em] text-foreground"
        >
          {category.name}
        </h2>
        {category.subtitle && (
          <p className="mt-2 font-body text-muted text-sm">{category.subtitle}</p>
        )}
        {category.soupChoice && category.soupChoice.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-foreground/5 border border-foreground/10">
            <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-foreground mb-2">
              Soup choice
            </h3>
            {category.soupDescription && (
              <p className="font-body text-muted text-sm mb-3">
                {category.soupDescription}
              </p>
            )}
            <ul className="flex flex-wrap gap-2 font-body text-sm text-foreground">
              {category.soupChoice.map((soup) => (
                <li
                  key={soup}
                  className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground"
                >
                  {soup}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

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
        <div className="mt-16 pt-10 border-t border-foreground/10">
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
