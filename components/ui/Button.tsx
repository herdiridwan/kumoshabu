"use client";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
};

export function Button({
  variant = "gold",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "font-heading uppercase tracking-[0.2em] text-sm min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants = {
    gold: "bg-accent text-background hover:bg-accent/90",
    outline: "border border-accent text-accent hover:bg-accent/10",
    ghost: "text-foreground hover:bg-white/5",
  };
  return (
    <button
      type="button"
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
