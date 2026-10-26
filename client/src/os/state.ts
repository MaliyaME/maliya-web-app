import type { AppId, Frame, WindowState } from "./types";

export interface OSState {
  windows: WindowState[];
  zCounter: number;
}

export type OSAction =
  | { type: "open"; id: AppId; frame: Frame; exclusive: boolean }
  | { type: "close"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "minimize"; id: AppId }
  | { type: "toggleMaximize"; id: AppId };

export function initialState(open: { id: AppId; frame: Frame }[]): OSState {
  return {
    zCounter: open.length,
    windows: open.map(({ id, frame }, index) => ({
      ...frame,
      id,
      z: index + 1,
      minimized: false,
      maximized: false,
    })),
  };
}

export function reducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case "open": {
      const z = state.zCounter + 1;
      const existing = state.windows.find((window) => window.id === action.id);
      const base = action.exclusive ? state.windows.filter((window) => window.id === action.id) : state.windows;
      if (existing) {
        return {
          zCounter: z,
          windows: base.map((window) =>
            window.id === action.id ? { ...window, z, minimized: false } : window,
          ),
        };
      }
      return {
        zCounter: z,
        windows: [
          ...base,
          { ...action.frame, id: action.id, z, minimized: false, maximized: false },
        ],
      };
    }
    case "close":
      return { ...state, windows: state.windows.filter((window) => window.id !== action.id) };
    case "focus": {
      const target = state.windows.find((window) => window.id === action.id);
      if (!target) return state;
      if (!target.minimized && target.z === state.zCounter) return state;
      const z = state.zCounter + 1;
      return {
        zCounter: z,
        windows: state.windows.map((window) =>
          window.id === action.id ? { ...window, z, minimized: false } : window,
        ),
      };
    }
    case "minimize":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id ? { ...window, minimized: true } : window,
        ),
      };
    case "toggleMaximize":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id ? { ...window, maximized: !window.maximized } : window,
        ),
      };
  }
}

export function topWindow(state: OSState): WindowState | undefined {
  return state.windows
    .filter((window) => !window.minimized)
    .reduce<WindowState | undefined>((top, window) => (!top || window.z > top.z ? window : top), undefined);
}
