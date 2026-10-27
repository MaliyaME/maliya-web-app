import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Desktop } from "./desktop/Desktop";
import { APPS, appForPath } from "./apps";
import { CHROME, paintChrome, restoreChrome } from "./chrome";
import { pushApp, pushHome, readEntry, rewindToHome } from "./history";
import { useMediaQuery } from "./hooks";
import { LockScreen } from "./LockScreen";
import { MobileHome } from "./mobile/MobileHome";
import { preloadSimulator } from "./apps/TrySimulator";
import { OSContext } from "./OSContext";
import { initialState, reducer, topWindow } from "./state";
import { DOCK_CLEARANCE, MENU_BAR_HEIGHT, type AppId, type Frame, type Layout } from "./types";

const UNLOCKED_KEY = "maliya-os-unlocked";

function wasUnlocked() {
  try {
    return window.sessionStorage.getItem(UNLOCKED_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberUnlocked(unlocked: boolean) {
  try {
    if (unlocked) window.sessionStorage.setItem(UNLOCKED_KEY, "1");
    else window.sessionStorage.removeItem(UNLOCKED_KEY);
  } catch {
    // The lock state still works for this page view when storage is unavailable.
  }
}

// The desktop widgets (300px wide, shown from 1280px) keep clear of newly opened windows.
const WIDGET_GUTTER = 340;

function frameFor(id: AppId, openCount: number): Frame {
  const areaWidth = window.innerWidth >= 1280 ? window.innerWidth - WIDGET_GUTTER : window.innerWidth;
  const areaHeight = window.innerHeight - MENU_BAR_HEIGHT;
  const width = Math.min(APPS[id].size.width, areaWidth - 32);
  const height = Math.min(APPS[id].size.height, areaHeight - DOCK_CLEARANCE);
  const cascade = (openCount % 5) * 30;
  const centerX = (areaWidth - width) / 2;
  const centerY = Math.max(8, (areaHeight - DOCK_CLEARANCE - height) / 2 + 12);
  return {
    width,
    height,
    x: Math.round(Math.min(Math.max(8, centerX + cascade - 60), Math.max(8, areaWidth - width - 8))),
    y: Math.round(Math.min(Math.max(8, centerY + cascade - 40), Math.max(8, areaHeight - height - 8))),
  };
}

export default function MaliyaOS() {
  const [location, navigate] = useLocation();
  const layout: Layout = useMediaQuery("(min-width: 768px) and (min-height: 500px)") ? "desktop" : "mobile";
  const reduceMotion = useReducedMotion();
  const { isDark } = useTheme();
  const shellRef = useRef<HTMLDivElement>(null);
  const [appChrome, setAppChrome] = useState<string | null>(null);

  const [linkedApp] = useState(() => (location === "/" ? null : appForPath(location)));
  const [locked, setLocked] = useState(() => linkedApp === null && !wasUnlocked());
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    if (linkedApp) return initialState([{ id: linkedApp, frame: frameFor(linkedApp, 0) }]);
    if (!locked && layout === "desktop") return initialState([{ id: "welcome", frame: frameFor("welcome", 0) }]);
    return initialState([]);
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const top = topWindow(state)?.id ?? null;
  const topRef = useRef(top);
  topRef.current = top;
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const homeTimer = useRef(0);

  // On a phone, opening an app is a history entry, so the system Back gesture returns to the home screen.
  const openApp = useCallback((id: AppId) => {
    const mobile = layoutRef.current === "mobile";
    if (mobile && topRef.current !== id) pushApp(id, APPS[id].route, topRef.current !== null);
    dispatch({ type: "open", id, frame: frameFor(id, stateRef.current.windows.length), exclusive: mobile });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    if (layoutRef.current === "mobile" && topRef.current === id) {
      if (rewindToHome()) {
        // The history change that follows closes the app. If the browser never reports it, close it anyway.
        homeTimer.current = window.setTimeout(() => dispatch({ type: "close", id }), 700);
        return;
      }
      pushHome();
    }
    dispatch({ type: "close", id });
  }, []);

  const lock = useCallback(() => {
    rememberUnlocked(false);
    setLocked(true);
  }, []);

  const unlock = useCallback(
    (open?: AppId) => {
      rememberUnlocked(true);
      setLocked(false);
      if (open) openApp(open);
      else if (layout === "desktop" && stateRef.current.windows.length === 0) openApp("welcome");
    },
    [layout, openApp],
  );

  useEffect(() => {
    const target = top ? APPS[top].route : "/";
    if (window.location.pathname !== target) navigate(target, { replace: true, state: window.history.state });
  }, [top]);

  useEffect(() => {
    const onPopState = () => {
      window.clearTimeout(homeTimer.current);
      if (layoutRef.current !== "mobile") return;
      const entry = readEntry();
      const path = window.location.pathname;
      const wanted = entry ? entry.top : path === "/" ? null : appForPath(path);
      const id = wanted !== null && Object.prototype.hasOwnProperty.call(APPS, wanted) ? wanted : null;
      const current = topRef.current;
      if (id === current) return;
      if (id) dispatch({ type: "open", id, frame: frameFor(id, stateRef.current.windows.length), exclusive: true });
      else if (current) dispatch({ type: "close", id: current });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(homeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.title = top && top !== "welcome" ? `${APPS[top].title} · Maliya` : "Maliya";
    return () => {
      document.title = "Maliya";
    };
  }, [top]);

  useEffect(() => {
    document.documentElement.classList.add("os-active");
    return () => document.documentElement.classList.remove("os-active");
  }, []);

  useEffect(() => {
    shellRef.current?.toggleAttribute("inert", locked);
  }, [locked]);

  const chrome = locked ? CHROME.lock : layout === "mobile" && top && appChrome ? appChrome : isDark ? CHROME.dark : CHROME.light;
  useEffect(() => {
    paintChrome(chrome);
  }, [chrome]);
  useEffect(() => restoreChrome, []);

  useEffect(() => {
    if (locked) return;
    const id = window.setTimeout(() => void preloadSimulator(), 1500);
    return () => window.clearTimeout(id);
  }, [locked]);

  return (
    <OSContext.Provider value={{ layout, openApp, closeApp, lock, setChromeColor: setAppChrome }}>
      <main className="fixed inset-0 overflow-hidden bg-[#02281f]">
        <h1 className="sr-only">Maliya: your money, in focus</h1>

        <motion.div
          ref={shellRef}
          className="absolute inset-0"
          initial={false}
          animate={{ scale: locked && !reduceMotion ? 1.05 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {layout === "desktop" ? (
            <Desktop
              windows={state.windows}
              topId={top}
              onLaunch={openApp}
              onFocus={(id) => dispatch({ type: "focus", id })}
              onClose={closeApp}
              onMinimize={(id) => dispatch({ type: "minimize", id })}
              onToggleMaximize={(id) => dispatch({ type: "toggleMaximize", id })}
            />
          ) : (
            <MobileHome topId={top} onLaunch={openApp} onClose={closeApp} />
          )}
        </motion.div>

        <AnimatePresence>{locked && <LockScreen key="lock" onUnlock={unlock} />}</AnimatePresence>
      </main>
    </OSContext.Provider>
  );
}
