import menuData from "@/data/menu.json";

export type BeefCut = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type MenuItem = {
  name: string;
  price: number;
  description?: string;
  subItems?: string[];
  recommended?: boolean;
  chef_pick?: boolean;
  serves?: string;
  pairing?: string[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle?: string;
  heroImage?: string;
  soupDescription?: string;
  soupChoice?: string[];
  items: MenuItem[];
};

export type MenuData = {
  beefCuts: BeefCut[];
  categories: MenuCategory[];
};

export function getMenu(): MenuData {
  return menuData as MenuData;
}

export function getBeefCuts(): BeefCut[] {
  return getMenu().beefCuts;
}

export function getCategories(): MenuCategory[] {
  return getMenu().categories;
}

export function getCategory(id: string): MenuCategory | undefined {
  return getCategories().find((c) => c.id === id);
}

export function getChefPick(): MenuItem | undefined {
  for (const cat of getCategories()) {
    const pick = cat.items.find((i) => i.chef_pick);
    if (pick) return { ...pick };
  }
  return undefined;
}

export function getRecommended(): MenuItem[] {
  const items: MenuItem[] = [];
  for (const cat of getCategories()) {
    for (const item of cat.items) {
      if (item.recommended) items.push({ ...item });
    }
  }
  return items;
}
