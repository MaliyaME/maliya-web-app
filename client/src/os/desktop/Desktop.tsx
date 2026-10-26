import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FileText, Lock } from "lucide-react";
import { Link } from "wouter";
import { APPS } from "../apps";
import { MaliyaWidget } from "../MaliyaWidget";
import { MENU_BAR_HEIGHT, type AppId, type WindowState } from "../types";
import { Wallpaper } from "../Wallpaper";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Window } from "./Window";

interface DesktopProps {
  windows: WindowState[];
  topId: AppId | null;
  onLaunch: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onToggleMaximize: (id: AppId) => void;
}

function DesktopFile({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex w-24 flex-col items-center gap-1.5 rounded-lg p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <span
          aria-hidden="true"
          className="flex h-[58px] w-[46px] items-center justify-center rounded-[6px] bg-gradient-to-b from-white to-[#e9eee9] shadow-[0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-black/10 transition-transform group-hover:-translate-y-0.5"
        >
          <FileText className="h-6 w-6 text-[#005b46]" strokeWidth={1.6} />
        </span>
        <span className="rounded px-1.5 py-0.5 text-center text-[12px] font-medium leading-tight text-foreground group-hover:bg-foreground/10 group-focus-visible:bg-foreground/10">
          {label}
        </span>
      </Link>
    </li>
  );
}

export function Desktop({
  windows,
  topId,
  onLaunch,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
}: DesktopProps) {
  const workRef = useRef<HTMLDivElement>(null);
  const openIds = new Set(windows.map((window) => window.id));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Wallpaper variant="desktop" />
      <MenuBar activeTitle={topId ? APPS[topId].title : null} />

      <div ref={workRef} className="absolute inset-x-0 bottom-0" style={{ top: MENU_BAR_HEIGHT }}>
        <ul aria-label="Documents" className="absolute left-4 top-4 flex flex-col gap-2">
          <DesktopFile href="/privacy" label="Privacy Policy" />
          <DesktopFile href="/terms" label="Terms of Service" />
        </ul>

        <div className="absolute right-5 top-4 hidden w-[300px] flex-col gap-3 xl:flex">
          <MaliyaWidget onOpen={() => onLaunch("features")} />
          <button
            type="button"
            onClick={() => onLaunch("security")}
            className="flex items-center gap-3 rounded-[22px] bg-[#0b0e0d]/80 p-4 text-left text-[#f8f6ef] shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-2xl transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#a4d5c3]">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-[13px] leading-snug">
              <span className="block font-semibold">Stays on your phone</span>
              <span className="block text-[#f8f6ef]/70">No bank login · No account · No cloud sync</span>
            </span>
          </button>
        </div>

        <AnimatePresence>
          {windows.map((state) => (
            <Window
              key={state.id}
              app={APPS[state.id]}
              state={state}
              focused={state.id === topId}
              constraintsRef={workRef}
              onFocus={() => onFocus(state.id)}
              onClose={() => onClose(state.id)}
              onMinimize={() => onMinimize(state.id)}
              onToggleMaximize={() => onToggleMaximize(state.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <Dock openIds={openIds} onLaunch={onLaunch} />
    </div>
  );
}
