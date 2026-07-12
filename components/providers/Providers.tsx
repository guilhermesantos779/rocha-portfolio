"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "./LenisProvider";
import { CursorProvider } from "./CursorProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <CursorProvider>{children}</CursorProvider>
    </LenisProvider>
  );
}
