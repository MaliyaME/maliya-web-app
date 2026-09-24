import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "maliya-theme";
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

type ThemePreference = "light" | "dark";

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function storedTheme(): ThemePreference | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(preference = storedTheme()) {
  const isDark = preference ? preference === "dark" : colorScheme.matches;
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  return isDark;
}

export function initializeTheme() {
  applyTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => applyTheme());

  useEffect(() => {
    const syncTheme = () => setIsDark(applyTheme());
    colorScheme.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      colorScheme.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemePreference = isDark ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The in-memory preference still applies when storage is unavailable.
    }
    setIsDark(applyTheme(nextTheme));
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider is missing.");
  return value;
}
