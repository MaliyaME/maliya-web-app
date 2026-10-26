import type { ComponentType } from "react";
import { ArrowDownToLine, FileCheck2, LayoutGrid, Newspaper, Play, ShieldCheck, Sparkles } from "lucide-react";
import type { IconSpec } from "./AppIcon";
import type { AppId } from "./types";
import Features from "./apps/Features";
import GetApp from "./apps/GetApp";
import HowItWorks from "./apps/HowItWorks";
import LaunchFilm from "./apps/LaunchFilm";
import PressKit from "./apps/PressKit";
import Security from "./apps/Security";
import Welcome from "./apps/Welcome";
import WhatsNew from "./apps/WhatsNew";

export interface AppDef {
  id: AppId;
  title: string;
  route: string;
  icon: IconSpec;
  size: { width: number; height: number };
  Component: ComponentType;
}

export const APPS: Record<AppId, AppDef> = {
  welcome: {
    id: "welcome",
    title: "Maliya",
    route: "/",
    icon: { kind: "image", src: "/app_icon.png" },
    size: { width: 900, height: 580 },
    Component: Welcome,
  },
  features: {
    id: "features",
    title: "Features",
    route: "/product",
    icon: { kind: "glyph", Icon: LayoutGrid, from: "#35a283", to: "#0a6b52" },
    size: { width: 960, height: 620 },
    Component: Features,
  },
  howItWorks: {
    id: "howItWorks",
    title: "How it works",
    route: "/how-it-works",
    icon: { kind: "glyph", Icon: FileCheck2, from: "#9887e6", to: "#5a46b0" },
    size: { width: 500, height: 660 },
    Component: HowItWorks,
  },
  film: {
    id: "film",
    title: "Launch Film",
    route: "/film",
    icon: { kind: "glyph", Icon: Play, from: "#43474d", to: "#131517" },
    size: { width: 360, height: 690 },
    Component: LaunchFilm,
  },
  get: {
    id: "get",
    title: "Get the App",
    route: "/download",
    icon: { kind: "glyph", Icon: ArrowDownToLine, from: "#52b0ff", to: "#1a6be0" },
    size: { width: 780, height: 640 },
    Component: GetApp,
  },
  security: {
    id: "security",
    title: "Security",
    route: "/security",
    icon: { kind: "glyph", Icon: ShieldCheck, from: "#55655f", to: "#1b2421" },
    size: { width: 780, height: 620 },
    Component: Security,
  },
  news: {
    id: "news",
    title: "What's New",
    route: "/changelog",
    icon: { kind: "glyph", Icon: Sparkles, from: "#f5ad62", to: "#c8643a" },
    size: { width: 660, height: 620 },
    Component: WhatsNew,
  },
  press: {
    id: "press",
    title: "Press Kit",
    route: "/press",
    icon: { kind: "glyph", Icon: Newspaper, from: "#df7a96", to: "#a0405f" },
    size: { width: 740, height: 600 },
    Component: PressKit,
  },
};

export const DOCK_ORDER: AppId[] = [
  "welcome",
  "features",
  "howItWorks",
  "film",
  "get",
  "security",
  "news",
  "press",
];

export const MOBILE_DOCK_ORDER: AppId[] = ["welcome", "get", "features", "security"];

// Routes that open the OS. /privacy and /terms stay plain pages.
export const OS_PATH_PATTERN =
  /^\/(?:product|download|waitlist|changelog|security|press|film|how-it-works)?\/?$/;

export function appForPath(path: string): AppId | null {
  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (normalized === "/waitlist") return "get";
  return DOCK_ORDER.find((id) => APPS[id].route === normalized) ?? null;
}
