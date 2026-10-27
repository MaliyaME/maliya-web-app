import { createContext, useContext } from "react";
import type { AppId, Layout } from "./types";

interface OSContextValue {
  layout: Layout;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  lock: () => void;
  /** An open phone app can say what colour the browser's bars should be, or null to use the site's. */
  setChromeColor: (color: string | null) => void;
}

export const OSContext = createContext<OSContextValue | null>(null);

export function useOS() {
  const value = useContext(OSContext);
  if (!value) throw new Error("OSContext is missing.");
  return value;
}
