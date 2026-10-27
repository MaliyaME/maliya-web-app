import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { pushEntry, readEntry, replaceEntry } from "@/os/history";
import { buildLedger, type Ledger } from "./data/ledger";
import type { Edit, MonthId, Route, TabId } from "./data/types";
import { atRoot, parseNav, ROOT_NAV } from "./navigation";
import { initialState, navKey, navOf, reducer, type Appearance, type Nav, type SheetState, type SimState } from "./state";

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
  /** On a phone each step is a browser history entry, so the system back gesture and button work. */
  stepHistory: boolean;
  push: (route: Route) => void;
  back: () => void;
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
  stepHistory,
  appearance,
  onAppearance,
  onRestart,
  children,
}: {
  dark: boolean;
  scale: number;
  inset: Inset;
  stepHistory: boolean;
  appearance: Appearance;
  onAppearance: (appearance: Appearance) => void;
  onRestart: () => void;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, appearance, (initial: Appearance) => {
    const fresh = initialState(initial);
    const entry = stepHistory ? readEntry() : null;
    const nav = entry?.top === "simulator" ? parseNav(entry.nav) : null;
    return nav ? { ...fresh, ...nav } : fresh;
  });
  const ledger = useMemo(() => buildLedger(state.edits), [state.edits]);
  const stateRef = useRef(state);
  stateRef.current = state;

  // The navigation the current history entry holds, so a change that came from history is not pushed again.
  const synced = useRef<Nav>(navOf(state));
  const forcePush = useRef(false);
  const pending = useRef(false);
  const timer = useRef(0);

  useEffect(() => {
    if (!stepHistory) return;
    if (readEntry()?.top !== "simulator") replaceEntry({ top: "simulator" });
    const onPopState = () => {
      pending.current = false;
      window.clearTimeout(timer.current);
      const entry = readEntry();
      if (entry?.top !== "simulator") return;
      const nav = parseNav(entry.nav) ?? ROOT_NAV;
      synced.current = nav;
      dispatch({ type: "restore", nav });
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(timer.current);
    };
  }, [stepHistory]);

  useEffect(() => {
    if (!stepHistory) return;
    const nav = navOf(state);
    const previous = synced.current;
    if (navKey(nav) === navKey(previous)) return;
    synced.current = nav;
    // Hopping between tabs is not history; opening a screen or a sheet is, and so is jumping to Ask from a link.
    const hop = !forcePush.current && atRoot(previous) && atRoot(nav);
    forcePush.current = false;
    if (hop) replaceEntry({ nav });
    else pushEntry({ top: "simulator", base: readEntry()?.base, nav });
  }, [stepHistory, state.tab, state.stacks, state.sheet]);

  // Going back on a phone means going back in history; the entry we land on tells the app where it is.
  const goBack = useCallback(
    (apply: () => void) => {
      if (!stepHistory) return apply();
      if (pending.current) return;
      pending.current = true;
      window.history.back();
      timer.current = window.setTimeout(() => {
        if (!pending.current) return;
        pending.current = false;
        apply();
      }, 600);
    },
    [stepHistory],
  );

  const push = useCallback((route: Route) => dispatch({ type: "push", route }), []);
  const back = useCallback(() => goBack(() => dispatch({ type: "pop" })), [goBack]);
  const setTab = useCallback((tab: TabId) => dispatch({ type: "tab", tab }), []);
  const setMonth = useCallback((month: MonthId) => dispatch({ type: "month", month }), []);
  const openSheet = useCallback((sheet: SheetState) => dispatch({ type: "sheet", sheet }), []);
  const closeSheet = useCallback(() => {
    if (stateRef.current.sheet) goBack(() => dispatch({ type: "sheet", sheet: null }));
  }, [goBack]);
  const edit = useCallback((id: number, patch: Edit) => dispatch({ type: "edit", id, patch }), []);
  const ask = useCallback((question: string) => {
    if (stateRef.current.tab !== "ask") forcePush.current = true;
    dispatch({ type: "askPending", question });
    dispatch({ type: "tab", tab: "ask" });
  }, []);
  const setAppearance = useCallback((next: Appearance) => onAppearance(next), [onAppearance]);
  const restart = useCallback(() => {
    if (stepHistory) replaceEntry({ nav: ROOT_NAV });
    onRestart();
  }, [stepHistory, onRestart]);

  const value = useMemo<SimApi>(
    () => ({ state, ledger, month: state.month, dark, scale, inset, stepHistory, push, back, setTab, setMonth, openSheet, closeSheet, edit, ask, setAppearance, restart, dispatch }),
    [state, ledger, dark, scale, inset, stepHistory, push, back, setTab, setMonth, openSheet, closeSheet, edit, ask, setAppearance, restart],
  );

  return <SimContext.Provider value={value}>{children}</SimContext.Provider>;
}
