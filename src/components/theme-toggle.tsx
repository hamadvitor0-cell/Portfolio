"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color mode"
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/70 text-foreground shadow-sm backdrop-blur-xl transition hover:border-accent/50 hover:bg-accentSoft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <SunMoon className="size-4" />
    </button>
  );
}
