import type { AppId } from "./types";

// On a phone the demo mirrors "an app is open" and every step inside the simulator as browser history
// entries, so the system Back gesture (iOS edge swipe, Android Back) steps back inside the demo instead
// of leaving the site. The desktop never touches history.

export interface HistoryEntry {
  /** Marks an entry written by this site. */
  m: 1;
  /** Position along the chain: every entry we push is one more than the entry it was pushed from. */
  i: number;
  /** The app open at this entry, or null for the phone home screen. */
  top: AppId | null;
  /** `i` of the home screen entry below the open app. Missing when the app was opened by a link. */
  base?: number;
  /** The simulator's navigation at this entry. Missing means its first screen. */
  nav?: unknown;
}

export function readEntry(): HistoryEntry | null {
  const state: unknown = window.history.state;
  if (typeof state !== "object" || state === null) return null;
  const { m, i, top } = state as Partial<HistoryEntry>;
  return m === 1 && typeof i === "number" && (top === null || typeof top === "string") ? (state as HistoryEntry) : null;
}

function write(method: "pushState" | "replaceState", entry: HistoryEntry, url: string) {
  const clean = Object.fromEntries(Object.entries(entry).filter(([, value]) => value !== undefined));
  try {
    window.history[method](clean, "", url);
  } catch {
    // Browsers cap how often history can change. The demo still works without the extra entry.
  }
}

export function pushEntry(entry: Omit<HistoryEntry, "m" | "i">, url = window.location.href) {
  write("pushState", { m: 1, i: (readEntry()?.i ?? 0) + 1, ...entry }, url);
}

export function replaceEntry(patch: Partial<Omit<HistoryEntry, "m">>, url = window.location.href) {
  write("replaceState", { m: 1, i: 0, top: null, ...readEntry(), ...patch }, url);
}

export function pushApp(top: AppId, url: string, fromApp: boolean) {
  const entry = readEntry();
  pushEntry({ top, base: fromApp ? entry?.base : (entry?.i ?? 0) }, url);
}

export function pushHome() {
  pushEntry({ top: null }, "/");
}

/** Goes back to the home screen entry below the open app. False when the app was opened by a link. */
export function rewindToHome(): boolean {
  const entry = readEntry();
  if (!entry || entry.base === undefined || entry.i <= entry.base) return false;
  try {
    window.history.go(entry.base - entry.i);
  } catch {
    return false;
  }
  return true;
}
