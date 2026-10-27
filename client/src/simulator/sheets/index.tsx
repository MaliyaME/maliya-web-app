import { Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiApple } from "react-icons/si";
import { useSim } from "../context";
import { CATEGORIES, CATEGORY_ORDER, monthLabel, monthShort } from "../data/catalog";
import { aed0, aed2, fmtDate } from "../data/format";
import { monthSeries } from "../data/ledger";
import { MONTH_IDS, type CategoryId } from "../data/types";
import type { Appearance, SheetState } from "../state";
import { Sheet } from "../ui/Sheet";
import { appStoreUrl } from "@/os/content";
import { useOS } from "@/os/OSContext";

function MonthList({ value, onPick, title }: { value: string; onPick: (month: (typeof MONTH_IDS)[number]) => void; title: string }) {
  const { ledger, closeSheet } = useSim();
  const series = monthSeries(ledger);
  return (
    <Sheet title={title} onClose={closeSheet}>
      <h2 className="mb-2 text-[22px] font-semibold tracking-[-0.02em]">{title}</h2>
      <ul className="divide-y divide-sim-line">
        {[...MONTH_IDS].reverse().map((month) => (
          <li key={month}>
            <button
              type="button"
              onClick={() => {
                onPick(month);
                closeSheet();
              }}
              className="flex w-full items-center justify-between py-3.5 text-left text-[17px] outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60"
            >
              <span className={cn(month === value && "font-semibold")}>{monthLabel(month)}</span>
              <span className="flex items-center gap-3 text-sim-muted">
                <span className="tabular-nums">AED {aed0(series[month])}</span>
                {month === value ? <Check className="h-5 w-5 text-sim-brand" aria-label={`${monthShort(month)} selected`} /> : <span className="w-5" />}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly (readonly [T, string])[]; onChange: (value: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[14px] font-medium text-sim-muted">{label}</legend>
      <div className="grid gap-1 rounded-[14px] bg-sim-bubble p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map(([id, text]) => (
          <label key={id} className={cn("cursor-pointer rounded-[11px] px-1.5 py-2.5 text-center text-[15px] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sim-brand", value === id ? "bg-sim-surface shadow-sm" : "text-sim-muted")}>
            <input type="radio" name={label} checked={value === id} onChange={() => onChange(id)} className="sr-only" />
            {text}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function QuickMenu() {
  const { closeSheet, state, setAppearance, restart } = useSim();
  const { layout, closeApp } = useOS();
  return (
    <Sheet title="Quick menu" onClose={closeSheet}>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Quick menu</h2>
      <div className="mt-5">
        <Segmented<Appearance>
          label="Appearance"
          value={state.appearance}
          options={[["auto", "Match site"], ["light", "Light"], ["dark", "Dark"]]}
          onChange={setAppearance}
        />
      </div>
      <p className="mt-6 rounded-2xl bg-sim-bubble p-4 text-[14.5px] leading-[1.5] text-sim-muted">
        This is a demo with sample data. Nothing you do here is saved or sent anywhere, and restarting brings everything back to how it started.
      </p>
      {layout === "mobile" && (
        <button type="button" onClick={() => closeApp("simulator")} className="mt-4 h-12 w-full rounded-full border border-sim-border text-[16.5px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press">
          Back to the home screen
        </button>
      )}
      <button type="button" onClick={restart} className="mt-4 h-12 w-full rounded-full border border-sim-line text-[16.5px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press">
        Restart the demo
      </button>
      <a href={appStoreUrl} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sim-brand text-[16.5px] font-semibold text-sim-onbrand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand focus-visible:ring-offset-2 focus-visible:ring-offset-sim-surface">
        <SiApple className="h-[18px] w-[18px]" aria-hidden="true" />
        Get Maliya on the App Store
      </a>
    </Sheet>
  );
}

function AddStatements() {
  const { closeSheet } = useSim();
  const steps: [string, string][] = [
    ["Choose statements", "Add the monthly credit card PDFs you already get, from your files, Gmail, personal Outlook or Yahoo."],
    ["Read and check on your phone", "Maliya reads each PDF on your phone and only adds statements that match their printed totals."],
    ["Explore your spending", "Monthly comparisons, category and purchase stories, and answers worked out on your phone."],
  ];
  return (
    <Sheet title="Add statements" onClose={closeSheet}>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Add statements</h2>
      <p className="mt-2 text-[15.5px] leading-[1.45] text-sim-muted">Supported HSBC, FAB, Emirates NBD and ADCB Islamic credit card PDFs. No bank login needed.</p>
      <ol className="mt-5 space-y-4">
        {steps.map(([title, body], i) => (
          <li key={title} className="flex gap-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sim-brand text-[14px] font-bold text-sim-onbrand">{i + 1}</span>
            <span>
              <span className="block text-[17px] font-semibold">{title}</span>
              <span className="mt-0.5 block text-[14.5px] leading-[1.45] text-sim-muted">{body}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-5 rounded-2xl bg-sim-bubble p-4 text-[14px] leading-[1.5] text-sim-muted">The demo already holds twelve sample statements, so nothing is read or uploaded here.</p>
      <a href={appStoreUrl} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sim-brand text-[16.5px] font-semibold text-sim-onbrand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand focus-visible:ring-offset-2 focus-visible:ring-offset-sim-surface">
        <SiApple className="h-[18px] w-[18px]" aria-hidden="true" />
        Get Maliya on the App Store
      </a>
    </Sheet>
  );
}

function EditPurchase({ id }: { id: number }) {
  const { ledger, closeSheet, edit } = useSim();
  const p = ledger.byId.get(id);
  const [name, setName] = useState(p?.merchant ?? "");
  const [cat, setCat] = useState<CategoryId>(p?.cat ?? "dining");
  const [note, setNote] = useState(p?.note ?? "");
  const [scope, setScope] = useState<"this" | "shop">("this");
  if (!p) return null;
  const sameShop = ledger.purchases.filter((q) => q.shop === p.shop);

  const save = () => {
    const targets = scope === "shop" ? sameShop : [p];
    const trimmed = name.trim();
    for (const target of targets) {
      edit(target.id, {
        ...(trimmed && trimmed !== target.merchant ? { merchant: trimmed } : {}),
        ...(cat !== target.cat ? { cat } : {}),
      });
    }
    if (note.trim() !== (p.note ?? "")) edit(p.id, { note: note.trim() });
    closeSheet();
  };

  return (
    <Sheet title="Edit purchase" onClose={closeSheet}>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Edit purchase</h2>
      <p className="mt-1 text-[14.5px] text-sim-muted">{fmtDate(p.date)} · AED {aed2(p.cents)}</p>

      <label htmlFor="sim-edit-name" className="mt-5 block text-[14px] font-medium text-sim-muted">Merchant name</label>
      <input id="sim-edit-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" className="mt-2 h-12 w-full rounded-[14px] border border-sim-line bg-sim-bg px-4 text-[17px] outline-none focus:border-sim-brand" />

      <fieldset className="mt-5">
        <legend className="mb-2 text-[14px] font-medium text-sim-muted">Category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((id) => (
            <label key={id} className={cn("cursor-pointer rounded-full px-3.5 py-2 text-[14.5px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sim-brand", cat === id ? "bg-sim-brand font-medium text-sim-onbrand" : "bg-sim-bubble")}>
              <input type="radio" name="edit-category" checked={cat === id} onChange={() => setCat(id)} className="sr-only" />
              {CATEGORIES[id].name}
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="sim-edit-note" className="mt-5 block text-[14px] font-medium text-sim-muted">Private note</label>
      <textarea id="sim-edit-note" value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Only you can see this" className="mt-2 w-full resize-none rounded-[14px] border border-sim-line bg-sim-bg px-4 py-3 text-[16.5px] outline-none placeholder:text-sim-faint focus:border-sim-brand" />

      {sameShop.length > 1 && (
        <div className="mt-5">
          <Segmented<"this" | "shop"> label="Apply to" value={scope} options={[["this", "This purchase"], ["shop", `All ${sameShop.length} here`]]} onChange={setScope} />
        </div>
      )}
      <button type="button" onClick={save} className="mt-6 h-12 w-full rounded-full bg-sim-brand text-[17px] font-semibold text-sim-onbrand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand focus-visible:ring-offset-2 focus-visible:ring-offset-sim-surface active:scale-[0.98]">Save</button>
      <button type="button" onClick={closeSheet} className="mt-2 h-11 w-full rounded-full text-[16px] text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">Cancel</button>
    </Sheet>
  );
}

export function SheetHost({ sheet }: { sheet: SheetState }): ReactNode {
  const { month, setMonth, state, dispatch } = useSim();
  switch (sheet.kind) {
    case "months":
      return <MonthList title="Choose a month" value={month} onPick={setMonth} />;
    case "askMonth":
      return <MonthList title="Answers cover" value={state.askMonth} onPick={(m) => dispatch({ type: "askMonth", month: m })} />;
    case "settings":
      return <QuickMenu />;
    case "add":
      return <AddStatements />;
    case "edit":
      return <EditPurchase id={sheet.id} />;
  }
}
