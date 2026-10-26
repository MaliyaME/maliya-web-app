import { createContext, useContext } from "react";
import type { AppId, Layout } from "./types";

interface OSContextValue {
  layout: Layout;
  openApp: (id: AppId) => void;
  lock: () => void;
}

export const OSContext = createContext<OSContextValue | null>(null);

export function useOS() {
  const value = useContext(OSContext);
  if (!value) throw new Error("OSContext is missing.");
  return value;
}
