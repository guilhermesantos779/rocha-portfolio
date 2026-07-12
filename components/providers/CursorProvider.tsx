"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useHasFinePointer } from "@/lib/device";

export type CursorVariant = "default" | "hover" | "text";

interface CursorContextValue {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  enabled: boolean;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor(): CursorContextValue | null {
  return useContext(CursorContext);
}

/** Sets the hover variant while the pointer is over an interactive element. */
export function useCursorHover() {
  const cursor = useCursor();

  return {
    onPointerEnter: () => cursor?.setVariant("hover"),
    onPointerLeave: () => cursor?.setVariant("default"),
  };
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const enabled = useHasFinePointer();

  return (
    <CursorContext.Provider value={{ variant, setVariant, enabled }}>
      {children}
    </CursorContext.Provider>
  );
}
