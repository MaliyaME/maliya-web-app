import type { Answer } from "./data/ask";
import type { Edit, Edits, MonthId, Route, TabId } from "./data/types";

export type Appearance = "auto" | "light" | "dark";

export type SheetState =
  | { kind: "months" }
  | { kind: "askMonth" }
  | { kind: "settings" }
  | { kind: "add" }
  | { kind: "edit"; id: number };

export interface AskEntry {
  id: number;
  question: string;
  answer: Answer;
}

export interface SimState {
  tab: TabId;
  stacks: Record<TabId, Route[]>;
  month: MonthId;
  askMonth: MonthId;
  sheet: SheetState | null;
  edits: Edits;
  appearance: Appearance;
  ask: AskEntry[];
  pendingAsk: string | null;
}

export type Action =
  | { type: "push"; route: Route }
  | { type: "pop" }
  | { type: "tab"; tab: TabId }
  | { type: "month"; month: MonthId }
  | { type: "askMonth"; month: MonthId }
  | { type: "sheet"; sheet: SheetState | null }
  | { type: "edit"; id: number; patch: Edit }
  | { type: "appearance"; appearance: Appearance }
  | { type: "askAdd"; entry: AskEntry }
  | { type: "askReplace"; id: number; answer: Answer }
  | { type: "askClear" }
  | { type: "askPending"; question: string | null };

export const LATEST_MONTH: MonthId = "2026-09";

export function initialState(appearance: Appearance = "auto"): SimState {
  return {
    tab: "home",
    stacks: { home: [{ name: "home" }], activity: [{ name: "activity" }], ask: [{ name: "ask" }], statements: [{ name: "statements" }] },
    month: LATEST_MONTH,
    askMonth: LATEST_MONTH,
    sheet: null,
    edits: {},
    appearance,
    ask: [],
    pendingAsk: null,
  };
}

export function reducer(state: SimState, action: Action): SimState {
  switch (action.type) {
    case "push":
      return { ...state, stacks: { ...state.stacks, [state.tab]: [...state.stacks[state.tab], action.route] } };
    case "pop": {
      const stack = state.stacks[state.tab];
      return stack.length > 1 ? { ...state, stacks: { ...state.stacks, [state.tab]: stack.slice(0, -1) } } : state;
    }
    case "tab": {
      if (action.tab !== state.tab) return { ...state, tab: action.tab };
      const stack = state.stacks[action.tab];
      return stack.length > 1 ? { ...state, stacks: { ...state.stacks, [action.tab]: stack.slice(0, 1) } } : state;
    }
    case "month":
      return { ...state, month: action.month };
    case "askMonth":
      return { ...state, askMonth: action.month };
    case "sheet":
      return { ...state, sheet: action.sheet };
    case "edit":
      return { ...state, edits: { ...state.edits, [action.id]: { ...state.edits[action.id], ...action.patch } } };
    case "appearance":
      return { ...state, appearance: action.appearance };
    case "askAdd":
      return { ...state, ask: [...state.ask, action.entry] };
    case "askReplace":
      return { ...state, ask: state.ask.map((entry) => (entry.id === action.id ? { ...entry, answer: action.answer } : entry)) };
    case "askClear":
      return { ...state, ask: [] };
    case "askPending":
      return { ...state, pendingAsk: action.question };
  }
}
