"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" />

      {children}
    </HeroUIProvider>
  );
}
