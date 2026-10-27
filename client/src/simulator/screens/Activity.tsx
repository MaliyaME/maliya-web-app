import { Search, X } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CATEGORIES, CATEGORY_ORDER, monthLabel } from "../data/catalog";
import { aed2, fmtDayHeading } from "../data/format";
import { inMonth, sum } from "../data/ledger";
import type { CategoryId } from "../data/types";
import { Header, Screen } from "../ui/Header";
import { PurchaseRow } from "./PurchaseList";

export default function Activity() {
  const { ledger, month } = useSim();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inMonth(ledger, month)
      .filter((p) => (cat === "all" || p.cat === cat) && (!q || p.merchant.toLowerCase().includes(q) || CATEGORIES[p.cat].name.toLowerCase().includes(q) || (p.descriptor ?? "").toLowerCase().includes(q) || String(p.cents / 100).includes(q)))
      .sort((a, b) => (a.date === b.date ? b.id - a.id : a.date < b.date ? 1 : -1));
  }, [ledger, month, query, cat]);

  const days = Array.from(new Set(items.map((p) => p.date)));
  const present = CATEGORY_ORDER.filter((id) => inMonth(ledger, month).some((p) => p.cat === id));

  return (
    <Screen header={<Header title={<span className="text-[13.5px] font-medium uppercase tracking-[0.1em] text-sim-muted">Activity</span>} />}>
      <div className="px-5 pt-5">
        <h1 className="text-[34px] font-semibold tracking-[-0.03em]">Activity</h1>
        <p className="mt-1.5 text-[16px] text-sim-muted">{monthLabel(month)}</p>
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-sim-muted" strokeWidth={1.7} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a shop, category or amount"
            aria-label="Search purchases"
            className="h-12 w-full rounded-full border border-sim-line bg-sim-surface pl-11 pr-11 text-[16.5px] outline-none placeholder:text-sim-faint focus:border-sim-brand [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-sim-muted active:bg-sim-press">
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          )}
        </div>
        <div data-hscroll role="group" aria-label="Filter by category" className="sim-scroll -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
          {(["all", ...present] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={cat === id}
              onClick={() => setCat(id)}
              className={cn("sim-hit shrink-0 rounded-full px-4 py-2 text-[15px] outline-none [--hit-x:2px] [--hit-y:4px] transition-colors focus-visible:ring-2 focus-visible:ring-sim-brand", cat === id ? "bg-sim-brand font-medium text-sim-onbrand" : "bg-sim-bubble text-sim-ink")}
            >
              {id === "all" ? "All" : CATEGORIES[id].name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[15px] text-sim-muted" role="status">
          {items.length} purchase{items.length === 1 ? "" : "s"} · AED {aed2(sum(items))}
        </p>
      </div>
      <ul className="mt-1">
        {days.map((day) => (
          <Fragment key={day}>
            <li className="sticky top-0 z-[1] bg-sim-bg/95 px-5 pb-1.5 pt-4 text-[13.5px] font-medium uppercase tracking-[0.08em] text-sim-muted backdrop-blur">{fmtDayHeading(day)}</li>
            {items.filter((p) => p.date === day).map((p, i) => (
              <li key={p.id} className={cn("border-sim-line", i > 0 && "border-t")}>
                <PurchaseRow p={p} showCategory />
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      {items.length === 0 && <p className="px-5 pt-8 text-[16px] text-sim-muted">Nothing matches that search.</p>}
    </Screen>
  );
}
