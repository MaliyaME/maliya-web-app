import { createContext, useContext } from "react";
import type { AppId } from "./types";

interface OSContextValue {
  openApp: (id: AppId) => void;
  lock: () => void;
}

export const OSContext = createContext<OSContextValue | null>(null);

export function useOS() {
  const value = useContext(OSContext);
  if (!value) throw new Error("OSContext is missing.");
  return value;
}
