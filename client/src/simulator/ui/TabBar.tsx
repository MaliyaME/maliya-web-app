import { motion } from "framer-motion";
import { House, Landmark, MessageCircleQuestion, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import type { TabId } from "../data/types";

const TABS: { id: TabId; label: string; icon: typeof House }[] = [
  { id: "home", label: "Home", icon: House },
  { id: "activity", label: "Activity", icon: Receipt },
  { id: "ask", label: "Ask", icon: MessageCircleQuestion },
  { id: "statements", label: "Statements", icon: Landmark },
];

export function TabBar() {
  const { state, setTab, inset } = useSim();
  const index = TABS.findIndex((tab) => tab.id === state.tab);
  return (
    <nav aria-label="Maliya tabs" className="relative z-10 shrink-0 border-t border-sim-border bg-sim-surface" style={{ paddingBottom: Math.max(inset.bottom - 5, 8) }}>
      <div role="tablist" className="relative mx-5 flex pt-[17px]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[17px] w-1/4"
          animate={{ x: `${index * 100}%` }}
          transition={{ type: "spring", stiffness: 520, damping: 40 }}
        >
          <span className="absolute left-1/2 top-0 h-[30px] w-[48px] -translate-x-1/2 rounded-full bg-sim-pill" />
        </motion.div>
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = id === state.tab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className="relative flex flex-1 flex-col items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sim-brand"
            >
              <span className="flex h-[30px] w-[48px] items-center justify-center">
                <Icon className={cn("h-[22px] w-[22px] transition-colors", active ? "text-sim-brand" : "text-sim-muted")} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className={cn("mt-[3px] h-[14px] text-[11px] leading-[14px]", active ? "font-semibold text-sim-ink" : "text-sim-muted")}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
