import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format price in IDR thousands: 128 -> "128.000" */
export function formatPrice(priceInThousands: number): string {
  return `${priceInThousands.toLocaleString("id-ID")}.000`;
}

/** Split "SET A Short Plate" into primary "SET A" and secondary "Short Plate" */
export function splitItemName(name: string): { primary: string; secondary: string | null } {
  const match = name.match(/^(SET [A-D])\s+(.+)$/i);
  if (match) return { primary: match[1], secondary: match[2] };
  return { primary: name, secondary: null };
}
