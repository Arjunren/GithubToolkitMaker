"use client";

import { MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = root.classList.toggle("dark");
    try {
      localStorage.setItem("gmt-theme", dark ? "dark" : "light");
    } catch {
      /* optional preference */
    }
  }
  return (
    <Button
      className="icon-button button-secondary"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      <MoonStar size={18} />
      <span>B/W theme</span>
    </Button>
  );
}
