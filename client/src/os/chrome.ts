// The browser's own bars (address bar, status bar tint) follow <meta name="theme-color">. The page ships one per
// colour scheme; while the OS is running they follow what is on screen instead, and are restored on the way out.

export const CHROME = { light: "#f8f6ef", dark: "#0b0e0d", lock: "#02281f" } as const;

const originals = new Map<HTMLMetaElement, string>();

export function paintChrome(color: string) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    if (!originals.has(meta)) originals.set(meta, meta.content);
    meta.content = color;
  });
}

export function restoreChrome() {
  originals.forEach((color, meta) => {
    meta.content = color;
  });
  originals.clear();
}
