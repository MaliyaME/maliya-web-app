import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { buildLedger, type Ledger } from "./data/ledger";
import type { Edit, MonthId, Route, TabId } from "./data/types";
import { initialState, reducer, type Appearance, type SheetState, type SimState } from "./state";

export interface Inset {
  top: number;
  bottom: number;
}

interface SimApi {
  state: SimState;
  ledger: Ledger;
  month: MonthId;
  dark: boolean;
  scale: number;
  inset: Inset;
  push: (route: Route) => void;
  setTab: (tab: TabId) => void;
  setMonth: (month: MonthId) => void;
  openSheet: (sheet: SheetState) => void;
  closeSheet: () => void;
  edit: (id: number, patch: Edit) => void;
  ask: (question: string) => void;
  setAppearance: (appearance: Appearance) => void;
  restart: () => void;
  dispatch: React.Dispatch<import("./state").Action>;
}

const SimContext = createContext<SimApi | null>(null);

export function useSim() {
  const value = useContext(SimContext);
  if (!value) throw new Error("SimProvider is missing.");
  return value;
}

export function SimProvider({
  dark,
  scale,
  inset,
  appearance,
  onAppearance,
  onRestart,
  children,
}: {
  dark: boolean;
  scale: number;
  inset: Inset;
  appearance: Appearance;
  onAppearance: (appearance: Appearance) => void;
  onRestart: () => void;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, appearance, initialState);
  const ledger = useMemo(() => buildLedger(state.edits), [state.edits]);

  const push = useCallback((route: Route) => dispatch({ type: "push", route }), []);
  const setTab = useCallback((tab: TabId) => dispatch({ type: "tab", tab }), []);
  const setMonth = useCallback((month: MonthId) => dispatch({ type: "month", month }), []);
  const openSheet = useCallback((sheet: SheetState) => dispatch({ type: "sheet", sheet }), []);
  const closeSheet = useCallback(() => dispatch({ type: "sheet", sheet: null }), []);
  const edit = useCallback((id: number, patch: Edit) => dispatch({ type: "edit", id, patch }), []);
  const ask = useCallback((question: string) => {
    dispatch({ type: "askPending", question });
    dispatch({ type: "tab", tab: "ask" });
  }, []);
  const setAppearance = useCallback((next: Appearance) => onAppearance(next), [onAppearance]);

  const value = useMemo<SimApi>(
    () => ({ state, ledger, month: state.month, dark, scale, inset, push, setTab, setMonth, openSheet, closeSheet, edit, ask, setAppearance, restart: onRestart, dispatch }),
    [state, ledger, dark, scale, inset, push, setTab, setMonth, openSheet, closeSheet, edit, ask, setAppearance, onRestart],
  );

  return <SimContext.Provider value={value}>{children}</SimContext.Provider>;
}
