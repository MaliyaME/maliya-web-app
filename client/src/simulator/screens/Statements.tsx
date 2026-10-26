import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CARDS, cardColor, monthLabel, monthShort } from "../data/catalog";
import { aed0, aed2, fmtDayMonth } from "../data/format";
import { filterPurchases, statementRows, sum } from "../data/ledger";
import { MONTH_IDS, type CardKey } from "../data/types";
import { Chevron, PressRow } from "../ui/atoms";
import { Header, Screen } from "../ui/Header";
import { CardNumber } from "../ui/CardNumber";
import { PurchaseRow } from "./PurchaseList";

const CARD_KEYS: CardKey[] = ["v", "t"];

function CardChip({ card }: { card: CardKey }) {
  const { dark } = useSim();
  return (
    <span style={{ background: cardColor(card, dark) }} aria-hidden="true" className="relative flex h-[29px] w-[46px] shrink-0 flex-col justify-end rounded-[8px] p-[6px]">
      <span className="absolute left-[7px] top-[6px] h-[8px] w-[11px] rounded-[2.5px] bg-white/80" />
      <span className="flex gap-[3px]">
        <span className="h-[2px] w-[6px] rounded-full bg-white/50" />
        <span className="h-[2px] w-[6px] rounded-full bg-white/50" />
        <span className="h-[2px] w-[10px] rounded-full bg-white/80" />
      </span>
    </span>
  );
}

export default function Statements() {
  const { ledger, push, openSheet, dark } = useSim();
  const [open, setOpen] = useState<CardKey | null>("v");
  const total = CARD_KEYS.reduce((n, key) => n + statementRows(ledger, key).filter((r) => r.count > 0).length, 0);

  return (
    <Screen header={<Header title={<span className="text-[12.8px] text-sim-muted">{CARD_KEYS.length} cards · {total} statements</span>} />}>
      <div className="flex items-baseline justify-between px-5 pt-[20px]">
        <h1 className="text-[29px] font-semibold leading-9">Statements</h1>
        <button type="button" onClick={() => openSheet({ kind: "add" })} className="relative top-[2.3px] flex items-center gap-[10px] rounded-md py-1 pl-1 text-[14.7px] font-medium leading-5 text-sim-brand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">
          Add <Plus className="h-[16px] w-[16px]" strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      {CARD_KEYS.map((key, index) => {
        const rows = statementRows(ledger, key);
        const expanded = open === key;
        const card = CARDS[key];
        const Icon = expanded ? ChevronUp : ChevronDown;
        return (
          <section key={key} className={index === 0 ? "mt-[48.3px]" : "mt-[35.4px]"}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : key)}
              className="flex w-full items-center gap-[14.7px] px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sim-brand active:opacity-70"
            >
              <CardChip card={key} />
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] leading-[22px]">
                  <span className="font-medium">{card.name}</span> <CardNumber last4={card.last4} className="text-sim-muted" />
                </span>
                <span className="mt-1 block text-[12px] leading-4 text-sim-muted">
                  {rows.length} statements · {monthLabel(MONTH_IDS[0])} – {monthLabel(MONTH_IDS[MONTH_IDS.length - 1])}
                </span>
                <span className="mt-[2.7px] block text-[11.75px] leading-4 text-sim-muted">Originals not attached</span>
              </span>
              <Icon className="h-[15px] w-[15px] shrink-0 text-sim-muted" strokeWidth={1.6} aria-hidden="true" />
            </button>

            {expanded && (
              <div>
                <div className="mt-[13.5px] flex items-center px-5" role="img" aria-label={`Statements covered in 2026: ${rows.length} months`}>
                  <span className="w-[134.6px] text-[11.5px] leading-4 text-sim-muted">2026</span>
                  <span className="flex gap-[3.3px]">
                    {MONTH_IDS.map((month) => (
                      <span key={month} title={monthShort(month)} style={{ background: cardColor(key, dark) }} className="h-[9.7px] w-[27px] rounded-[3px]" />
                    ))}
                  </span>
                </div>
                <ul className="mt-[20px]">
                  {rows.map((row) => (
                    <li key={row.month} className="border-t border-sim-line">
                      <PressRow onClick={() => push({ name: "statement", card: key, month: row.month })} className="h-[69px] items-start px-5 pt-[15px]">
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14.7px] leading-5">{monthLabel(row.month)}</span>
                          <span className="mt-[4.5px] block text-[11.75px] leading-4 text-sim-muted">
                            {fmtDayMonth(row.from)} – {fmtDayMonth(row.to)} · {row.count} transactions
                          </span>
                        </span>
                        <span className="text-[14.7px] font-semibold leading-5 tabular-nums">{aed0(row.cents)}</span>
                        <span className="-mr-[1.3px] ml-[13px] mt-[11.3px]">
                          <Chevron />
                        </span>
                      </PressRow>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </Screen>
  );
}

export function StatementDetail({ card, month }: { card: CardKey; month: (typeof MONTH_IDS)[number] }) {
  const { ledger } = useSim();
  const items = filterPurchases(ledger, { month, card });
  const c = CARDS[card];
  return (
    <Screen header={<Header back="Statements" />}>
      <div className="px-5 pt-[24.7px]">
        <div className="flex items-center gap-[14.7px]">
          <CardChip card={card} />
          <p className="text-[12.7px] text-sim-muted">
            {c.name} <CardNumber last4={c.last4} />
          </p>
        </div>
        <h1 className="mt-[18px] text-[20px] font-semibold leading-[26px]">{monthLabel(month)}</h1>
        <p className="mt-[8px] text-[12.7px] leading-4 text-sim-muted">
          {items.length} transactions · AED {aed2(sum(items))}
        </p>
        <div className="mt-[18px] rounded-2xl border border-sim-line bg-sim-surface p-4 text-[12.7px] leading-[1.5] text-sim-muted">
          <span className="font-medium text-sim-ink">Checked before it was added.</span> The figures matched the totals printed on the statement. The original PDF is not attached in this demo.
        </div>
      </div>
      <ul className="mt-[18px]">
        {items.map((p, i) => (
          <li key={p.id} className={cn("border-sim-line", i > 0 && "border-t")}>
            <PurchaseRow p={p} showDate showCategory />
          </li>
        ))}
      </ul>
    </Screen>
  );
}
