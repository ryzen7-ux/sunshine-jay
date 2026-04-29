"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" /> Light
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" /> Dark
        </>
      )}
    </button>
  );
}
