import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Lock, Mail, Moon, ScrollText, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { AppIcon, type IconSpec } from "../AppIcon";
import { APPS, MOBILE_DOCK_ORDER } from "../apps";
import { contact } from "../content";
import { useOS } from "../OSContext";
import { MaliyaWidget } from "../MaliyaWidget";
import type { AppId } from "../types";
import { Wallpaper } from "../Wallpaper";
import { AppSheet } from "./AppSheet";

const privacyIcon: IconSpec = { kind: "glyph", Icon: Lock, from: "#3b9078", to: "#0f4a3b" };
const termsIcon: IconSpec = { kind: "glyph", Icon: ScrollText, from: "#8a9a94", to: "#3b4642" };
const mailIcon: IconSpec = { kind: "glyph", Icon: Mail, from: "#5ccbff", to: "#1f86e6" };

const gridOrder: AppId[] = ["simulator", "howItWorks", "film", "news", "press"];

const labelClass = "text-[12px] font-medium leading-tight text-foreground";
const tileClass =
  "flex w-[76px] flex-col items-center gap-1.5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/80";

function Tile({ label, icon, hideLabel = false }: { label: string; icon: IconSpec; hideLabel?: boolean }) {
  return (
    <>
      <AppIcon spec={icon} className="h-[62px] w-[62px] shadow-lg" />
      {!hideLabel && <span className={labelClass}>{label}</span>}
    </>
  );
}

function GlassButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/65 text-white outline-none ring-1 ring-white/15 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-white/80"
    >
      {children}
    </button>
  );
}

export function MobileHome({
  topId,
  onLaunch,
  onClose,
}: {
  topId: AppId | null;
  onLaunch: (id: AppId) => void;
  onClose: (id: AppId) => void;
}) {
  const { lock } = useOS();
  const { isDark, toggleTheme } = useTheme();
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    homeRef.current?.toggleAttribute("inert", topId !== null);
  }, [topId]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Wallpaper variant="desktop" paused={topId !== null} />

      <div ref={homeRef} className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-4 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <GlassButton label="Lock screen" onClick={lock}>
            <Lock className="h-[18px] w-[18px]" aria-hidden="true" />
          </GlassButton>
          <GlassButton label={isDark ? "Use light mode" : "Use dark mode"} onClick={toggleTheme}>
            {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
          </GlassButton>
        </div>

        <div className="mx-auto mt-4 w-full max-w-[360px]">
          <MaliyaWidget onOpen={() => onLaunch("features")} />
        </div>

        <ul className="mx-auto mb-6 mt-8 grid w-full max-w-[360px] grid-cols-4 justify-items-center gap-y-6">
          {gridOrder.map((id) => (
            <li key={id}>
              <button type="button" onClick={() => onLaunch(id)} aria-label={APPS[id].title} className={tileClass}>
                <Tile label={APPS[id].title} icon={APPS[id].icon} />
              </button>
            </li>
          ))}
          <li>
            <Link href="/privacy" aria-label="Privacy Policy" className={tileClass}>
              <Tile label="Privacy" icon={privacyIcon} />
            </Link>
          </li>
          <li>
            <Link href="/terms" aria-label="Terms of Service" className={tileClass}>
              <Tile label="Terms" icon={termsIcon} />
            </Link>
          </li>
          <li>
            <a href={`mailto:${contact.general}`} aria-label="Email Maliya" className={tileClass}>
              <Tile label="Email" icon={mailIcon} />
            </a>
          </li>
        </ul>

        <nav aria-label="Dock" className="mx-auto mt-auto w-full max-w-[400px]">
          <ul className="flex items-center justify-around rounded-[30px] bg-white/25 px-3 py-3 ring-1 ring-white/25 backdrop-blur-2xl dark:bg-white/10">
            {MOBILE_DOCK_ORDER.map((id) => (
              <li key={id}>
                <button type="button" onClick={() => onLaunch(id)} aria-label={APPS[id].title} className={tileClass}>
                  <Tile label={APPS[id].title} icon={APPS[id].icon} hideLabel />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <AnimatePresence>
        {topId && <AppSheet key={topId} app={APPS[topId]} onClose={() => onClose(topId)} />}
      </AnimatePresence>
    </div>
  );
}
