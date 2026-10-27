import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSim } from "./context";
import { renderRoute } from "./screens";
import { TAB_IDS, type TabId } from "./data/types";
import { SheetHost } from "./sheets";
import { Stack } from "./ui/Stack";
import { TabBar } from "./ui/TabBar";

function TabLayer({ tab, active }: { tab: TabId; active: boolean }) {
  const { state, back } = useSim();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.toggleAttribute("inert", !active);
  }, [active]);
  return (
    <div ref={ref} aria-hidden={!active} className="absolute inset-0" style={{ visibility: active ? "visible" : "hidden" }}>
      <Stack routes={state.stacks[tab]} onPop={back} renderRoute={renderRoute} />
    </div>
  );
}

export function AppRoot() {
  const { state, back } = useSim();
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    content.current?.toggleAttribute("inert", state.sheet !== null);
  }, [state.sheet]);
  const canGoBack = state.stacks[state.tab].length > 1;
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-sim-bg text-sim-ink"
      onKeyDown={(event) => {
        // Escape steps back inside the app; from a tab's first screen it falls through and closes the window.
        if (event.key !== "Escape" || state.sheet || !canGoBack) return;
        event.stopPropagation();
        back();
      }}
    >
      <div ref={content} className="absolute inset-0 flex flex-col">
        <div className="relative min-h-0 flex-1">
          {TAB_IDS.map((tab) => (
            <TabLayer key={tab} tab={tab} active={tab === state.tab} />
          ))}
        </div>
        <TabBar />
      </div>
      <AnimatePresence>{state.sheet && <SheetHost key={state.sheet.kind} sheet={state.sheet} />}</AnimatePresence>
    </div>
  );
}
