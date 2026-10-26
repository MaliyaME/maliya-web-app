import { Check, Store } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CATEGORIES, monthName } from "../data/catalog";
import { aed0, aed2, fmtDate } from "../data/format";
import { namingStats, unnamedList } from "../data/ledger";
import type { CategoryId } from "../data/types";
import { Header, Screen } from "../ui/Header";

const SUGGESTIONS: Partial<Record<CategoryId, string[]>> = {
  entertainment: ["Marina Cinema", "City Cinemas"],
  gifts: ["Rahma Charity", "Gift shop"],
};

export default function Naming() {
  const { ledger, month, edit } = useSim();
  const list = unnamedList(ledger, month);
  const stats = namingStats(ledger, month);
  const current = list[0];
  const [value, setValue] = useState("");
  const [scope, setScope] = useState<"this" | "all">("this");
  const input = useRef<HTMLInputElement>(null);
  const [named, setNamed] = useState(0);

  useEffect(() => {
    setValue("");
    setScope("this");
  }, [current?.id]);

  const apply = (action: "save" | "skip" | "personal") => {
    if (!current) return;
    if (action === "save") {
      const name = value.trim();
      if (!name) return input.current?.focus();
      const targets = scope === "all" ? ledger.purchases.filter((p) => p.shop === current.shop) : [current];
      targets.forEach((p) => edit(p.id, { merchant: name }));
      setNamed((n) => n + 1);
    } else if (action === "skip") edit(current.id, { skipped: true });
    else edit(current.id, { personal: true });
  };

  return (
    <Screen header={<Header back="Home" />}>
      <div className="px-5 pt-6">
        <p className="text-[16px] text-sim-muted">Where it went · {monthName(month)}</p>
        <h1 className="mt-1.5 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em]">Name your merchants</h1>
        <p className="mt-3 text-[16.5px] leading-[1.45] text-sim-muted">The biggest unnamed charges come first. Name them one at a time, skip any, or mark a charge as not a business.</p>
        <div className="mt-6">
          <div className="h-[4px] overflow-hidden rounded-full bg-sim-track">
            <div style={{ width: `${stats.done}%` }} className="h-full rounded-full bg-sim-brand transition-[width] duration-700" />
          </div>
          <p className="mt-2.5 text-[14.5px] text-sim-muted">AED {aed0(stats.left)} left to name · {stats.done}% done</p>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="mx-5 mt-7 rounded-[24px] border border-sim-line bg-sim-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-sim-muted">On your statement</p>
            <p className="mt-2 break-words font-mono text-[16px] tracking-tight">{current.descriptor}</p>
            <p className="mt-3 flex items-baseline justify-between text-[15px] text-sim-muted">
              <span>{fmtDate(current.date)} · {CATEGORIES[current.cat].name}</span>
              <span className="text-[20px] font-semibold tabular-nums text-sim-ink">AED {aed2(current.cents)}</span>
            </p>

            <label htmlFor="sim-merchant-name" className="mt-6 block text-[14px] font-medium text-sim-muted">Merchant name</label>
            <input
              id="sim-merchant-name"
              ref={input}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && apply("save")}
              placeholder="What is this place called?"
              enterKeyHint="done"
              autoComplete="off"
              className="mt-2 h-12 w-full rounded-[14px] border border-sim-line bg-sim-bg px-4 text-[17px] outline-none placeholder:text-sim-faint focus:border-sim-brand"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {(SUGGESTIONS[current.cat] ?? []).map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setValue(suggestion)} className="rounded-full bg-sim-bubble px-3.5 py-1.5 text-[14px] outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">
                  {suggestion}
                </button>
              ))}
            </div>

            <fieldset className="mt-5">
              <legend className="sr-only">Apply the name to</legend>
              <div className="grid grid-cols-2 gap-1 rounded-[14px] bg-sim-bubble p-1">
                {([["this", "This purchase"], ["all", "All like it"]] as const).map(([id, label]) => (
                  <label key={id} className={cn("cursor-pointer rounded-[11px] px-3 py-2 text-center text-[14.5px] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sim-brand", scope === id ? "bg-sim-surface shadow-sm" : "text-sim-muted")}>
                    <input type="radio" name="scope" checked={scope === id} onChange={() => setScope(id)} className="sr-only" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="mt-3 text-[13.5px] leading-[1.45] text-sim-muted">
              {scope === "this" ? "A name for a single purchase stays on your phone." : "In the app, a name for every purchase like it is sent for review. Nothing is sent from this demo."}
            </p>

            <button type="button" onClick={() => apply("save")} className="mt-5 h-12 w-full rounded-full bg-sim-brand text-[17px] font-semibold text-sim-onbrand outline-none transition-transform focus-visible:ring-2 focus-visible:ring-sim-brand focus-visible:ring-offset-2 focus-visible:ring-offset-sim-surface active:scale-[0.98]">
              Save name
            </button>
            <div className="mt-3 flex justify-center gap-6">
              <button type="button" onClick={() => apply("skip")} className="rounded-md px-2 py-2 text-[15.5px] text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">Skip</button>
              <button type="button" onClick={() => apply("personal")} className="rounded-md px-2 py-2 text-[15.5px] text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">Not a business</button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-5 mt-9 rounded-[24px] bg-sim-pill p-7 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sim-brand text-sim-onbrand">
              <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden="true" />
            </span>
            <p className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">All named for {monthName(month)}</p>
            <p className="mt-1.5 text-[15.5px] text-sim-muted">{named > 0 ? `You named ${named} ${named === 1 ? "merchant" : "merchants"}. ` : ""}Your categories now use the names you chose.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="mx-5 mt-6 flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-sim-faint">
        <Store className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        Only in this demo: names you choose are forgotten when you restart.
      </p>
    </Screen>
  );
}
