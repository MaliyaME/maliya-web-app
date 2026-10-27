import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { monthLabel, monthShort } from "../data/catalog";
import { aed0 } from "../data/format";
import type { Series } from "../data/ledger";
import { MONTH_IDS, type MonthId } from "../data/types";

const HEIGHT = 72;

export function MonthChart({
  series,
  selected,
  usual,
  highest,
  onPick,
  years,
  label,
}: {
  series: Series;
  selected: MonthId;
  usual: number;
  highest: MonthId;
  onPick?: (month: MonthId) => void;
  years?: boolean;
  label: string;
}) {
  const [tip, setTip] = useState<MonthId | null>(null);
  const max = Math.max(...MONTH_IDS.map((m) => series[m]), usual) * 1.12;
  const highestIsSelected = highest === selected;

  return (
    <div role="group" aria-label={label} className="px-5">
      <div className="relative" style={{ height: HEIGHT }}>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 z-10 border-t border-dashed border-sim-ink/45"
          initial={false}
          animate={{ bottom: (usual / max) * HEIGHT }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        />
        <div className="absolute inset-0 flex">
          {MONTH_IDS.map((month, i) => {
            const active = month === selected;
            return (
              <button
                key={month}
                type="button"
                aria-label={`${monthLabel(month)}, AED ${aed0(series[month])}`}
                aria-pressed={active}
                onClick={() => (onPick ? onPick(month) : setTip(tip === month ? null : month))}
                className="relative flex h-full flex-1 justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sim-brand"
              >
                <span className="relative h-full w-[12px] overflow-visible rounded-full bg-sim-chart">
                  <motion.span
                    className={cn("absolute inset-x-0 bottom-0 rounded-full", active ? "bg-sim-brand shadow-[0_6px_14px_-3px_rgb(var(--s-brand))]" : "bg-sim-bar")}
                    initial={{ height: 0 }}
                    animate={{ height: Math.max(8, (series[month] / max) * HEIGHT) }}
                    transition={{ type: "spring", stiffness: 170, damping: 22, delay: 0.1 + i * 0.045 }}
                  />
                  {tip === month && !onPick && (
                    <span className="absolute -top-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-sim-ink px-2 py-1 text-[11px] font-medium text-sim-bg">
                      AED {aed0(series[month])}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[11px] flex" aria-hidden="true">
        {MONTH_IDS.map((month) => (
          <span key={month} className={cn("flex-1 text-center text-[11px]", years ? "leading-[15px]" : "leading-[14px]", month === selected ? "font-semibold text-sim-brand" : "text-sim-muted")}>
            {monthShort(month)}
            {years && (
              <>
                <br />
                {month.slice(0, 4)}
              </>
            )}
          </span>
        ))}
      </div>
      <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-4 text-sim-muted", years ? "mt-[26.1px]" : "mt-[27px]")}>
        <span className="inline-flex items-center gap-2">
          <span className="w-[18px] border-t border-dashed border-sim-ink/45" />
          Usual · AED {aed0(usual)}
        </span>
        <span className={highestIsSelected ? "text-sim-faint" : "font-medium text-sim-ink"}>Highest shown · {monthLabel(highest)}</span>
      </p>
    </div>
  );
}
