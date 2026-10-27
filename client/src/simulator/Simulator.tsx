import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Moon, RotateCcw, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { CHROME } from "@/os/chrome";
import { useOS } from "@/os/OSContext";
import { useElementSize } from "@/os/hooks";
import { AppRoot } from "./AppRoot";
import { SimProvider, useSim } from "./context";
import type { Route } from "./data/types";
import { DeviceFrame, FRAME_H, FRAME_W, INSET } from "./DeviceFrame";
import { HomeIndicator } from "./ui/HomeIndicator";
import type { Appearance } from "./state";

const TIPS: Record<Route["name"], string> = {
  home: "Tap a category, the wellness score, or a month in the chart.",
  breakdown: "Every category, ranked by what you spent.",
  category: "Open a subcategory, or tap a bar to see its amount.",
  subcategory: "Tap a shop to see its purchases.",
  purchases: "Tap any purchase to open its story.",
  purchase: "Swipe from the left edge to go back, or tap Edit.",
  wellness: "Tap a factor to open it.",
  naming: "Name a merchant, skip it, or mark it as not a business.",
  activity: "Search by shop, category or amount.",
  ask: "Try a suggestion, or type your own question.",
  statements: "Open a statement to see the purchases behind it.",
  statement: "Tap a purchase to open its story.",
};

function TouchCursor({ scale }: { scale: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    parent.style.cursor = "none";
    const place = (e: PointerEvent) => {
      const box = parent.getBoundingClientRect();
      x.set((e.clientX - box.left) / scale);
      y.set((e.clientY - box.top) / scale);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      place(e);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const press = (e: PointerEvent) => e.pointerType === "mouse" && setDown(true);
    const release = () => setDown(false);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    parent.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      parent.style.cursor = "";
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      parent.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [scale, x, y]);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none absolute left-0 top-0 z-[70] -ml-[17px] -mt-[17px] block h-[34px] w-[34px]"
    >
      <motion.span
        animate={{ scale: down ? 0.78 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
        className="block h-full w-full rounded-full border-[1.5px] border-white/80 bg-[rgba(96,102,108,0.42)] shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
      />
    </motion.span>
  );
}

function Splash({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="absolute inset-0 z-[55] flex items-center justify-center bg-[#02281f]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.img
            src="/app_icon.png"
            alt=""
            className="h-[96px] w-[96px] rounded-[24px] shadow-2xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Caption({ compact }: { compact: boolean }) {
  const { state } = useSim();
  const route = state.stacks[state.tab][state.stacks[state.tab].length - 1];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 flex flex-col items-center gap-1.5 px-4 text-center">
      {!compact && (
        <p key={route.name} className="animate-in fade-in slide-in-from-bottom-1 text-[13px] font-medium text-white/80 duration-300">
          {TIPS[route.name]}
        </p>
      )}
      <p className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] text-white/55 ring-1 ring-white/10">Sample data · nothing here is saved or sent</p>
    </div>
  );
}

function Toolbar({ dark, onToggle, onRestart }: { dark: boolean; onToggle: () => void; onRestart: () => void }) {
  const button = "flex h-10 w-10 items-center justify-center rounded-full text-white/85 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 active:bg-white/15";
  return (
    <div role="toolbar" aria-label="Simulator controls" className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-1 rounded-full bg-white/[0.07] p-1 ring-1 ring-white/10 backdrop-blur-xl">
      <button type="button" className={button} onClick={onToggle} aria-label={dark ? "Switch the app to light appearance" : "Switch the app to dark appearance"} title={dark ? "Light appearance" : "Dark appearance"}>
        {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
      </button>
      <button type="button" className={button} onClick={onRestart} aria-label="Restart the demo" title="Restart the demo">
        <RotateCcw className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </div>
  );
}

function Stage({ scale, dark, compact, onAppearance, onRestart, booted }: { scale: number; dark: boolean; compact: boolean; onAppearance: (a: Appearance) => void; onRestart: () => void; booted: boolean }) {
  return (
    <>
      <div className={cn("absolute inset-0 flex items-center justify-center", compact ? "pb-[40px]" : "pb-[60px]")}>
        <div style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
          <div style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <DeviceFrame dark={dark}>
              <AppRoot />
              <Splash show={!booted} />
              <TouchCursor scale={scale} />
            </DeviceFrame>
          </div>
        </div>
      </div>
      <Toolbar dark={dark} onToggle={() => onAppearance(dark ? "light" : "dark")} onRestart={onRestart} />
      <Caption compact={compact} />
    </>
  );
}

// On a real phone the browser provides the status bar, so only the home indicator needs room.
const PHONE_INSET = { top: 0, bottom: 22 };

export default function Simulator() {
  const { layout, setChromeColor } = useOS();
  const { isDark: siteDark } = useTheme();
  const reduce = useReducedMotion();
  const [appearance, setAppearance] = useState<Appearance>("auto");
  const [run, setRun] = useState(0);
  const [booted, setBooted] = useState(false);
  const [ref, size] = useElementSize<HTMLDivElement>();
  const dark = appearance === "auto" ? siteDark : appearance === "dark";
  const framed = layout === "desktop";

  // On a phone the app fills the screen, so the browser's bars take its colour, which can differ from the site's.
  useEffect(() => {
    if (framed) return;
    setChromeColor(dark ? CHROME.dark : CHROME.light);
    return () => setChromeColor(null);
  }, [framed, dark, setChromeColor]);

  useEffect(() => {
    setBooted(false);
    const timer = window.setTimeout(() => setBooted(true), reduce ? 150 : 950);
    return () => window.clearTimeout(timer);
  }, [run, reduce]);

  const compact = size.height < 700;
  const scale = framed && size.width > 0 ? Math.min(1.15, Math.max(0.5, Math.min((size.width - 128) / FRAME_W, (size.height - (compact ? 52 : 84)) / FRAME_H))) : 1;

  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full overflow-hidden", framed && "min-h-[420px] bg-[#070b09]")}
      style={framed ? { backgroundImage: "radial-gradient(55% 45% at 50% 42%, rgba(24,140,108,0.30), transparent 72%), radial-gradient(40% 30% at 50% 100%, rgba(0,91,70,0.35), transparent 70%)" } : undefined}
    >
      <MotionConfig transformPagePoint={(point) => ({ x: point.x / scale, y: point.y / scale })}>
        <SimProvider key={run} dark={dark} scale={scale} inset={framed ? INSET : PHONE_INSET} stepHistory={!framed} appearance={appearance} onAppearance={setAppearance} onRestart={() => setRun((n) => n + 1)}>
          {framed ? (
            size.width > 0 && <Stage scale={scale} dark={dark} compact={compact} onAppearance={setAppearance} onRestart={() => setRun((n) => n + 1)} booted={booted} />
          ) : (
            <div className={cn("sim relative h-full w-full overflow-hidden bg-sim-bg", dark && "sim-dark")}>
              <AppRoot />
              <HomeIndicator />
            </div>
          )}
        </SimProvider>
      </MotionConfig>
    </div>
  );
}
