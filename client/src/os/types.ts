export type AppId =
  | "welcome"
  | "simulator"
  | "features"
  | "howItWorks"
  | "film"
  | "get"
  | "security"
  | "news"
  | "press";

export interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState extends Frame {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export type Layout = "desktop" | "mobile";

export const MENU_BAR_HEIGHT = 28;
export const DOCK_CLEARANCE = 96;
