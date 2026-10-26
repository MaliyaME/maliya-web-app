import { Fragment } from "react";
import { useSim } from "../context";
import { CARDS, CATEGORIES, cardColor } from "../data/catalog";
import { aed2, aedParts, fmtDate, fmtDayHeading } from "../data/format";
import { filterPurchases, needsName, sum } from "../data/ledger";
import type { Purchase, PurchaseFilter } from "../data/types";
import { Chevron, PressRow } from "../ui/atoms";
import { CardNumber } from "../ui/CardNumber";
import { Header, Screen } from "../ui/Header";
import { cn } from "@/lib/utils";

export function PurchaseRow({ p, showDate = false, showCategory = false }: { p: Purchase; showDate?: boolean; showCategory?: boolean }) {
  const { push, ledger } = useSim();
  const unnamed = needsName(ledger, p);
  return (
    <PressRow onClick={() => push({ name: "purchase", id: p.id })} className="items-center gap-3 px-5 py-[14px]">
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.7px] leading-5">{showDate ? fmtDate(p.date) : p.merchant}</span>
        {(showCategory || unnamed) && (
          <span className="mt-0.5 block truncate text-[12px] leading-4 text-sim-muted">
            {unnamed ? "Needs a name" : CATEGORIES[p.cat].name}
            {!showDate ? "" : ` · ${p.merchant}`}
          </span>
        )}
      </span>
      <span className="text-[14.7px] tabular-nums">AED {aed2(p.cents)}</span>
      <Chevron />
    </PressRow>
  );
}

export function PurchaseList({ title, subtitle, filter, byDay = true }: { title: string; subtitle?: string; filter: PurchaseFilter; byDay?: boolean }) {
  const { ledger } = useSim();
  const items = filterPurchases(ledger, filter);
  const days = Array.from(new Set(items.map((p) => p.date)));
  return (
    <Screen header={<Header back="Back" />}>
      <div className="px-5 pt-[24.7px]">
        {subtitle && <p className="text-[12.7px] leading-4 text-sim-muted">{subtitle}</p>}
        <h1 className="mt-[8px] text-[20px] font-semibold leading-[26px]">{title}</h1>
        <p className="mt-[8px] text-[12.7px] leading-4 text-sim-muted">
          {items.length} purchase{items.length === 1 ? "" : "s"} · AED {aed2(sum(items))}
        </p>
      </div>
      <ul className="mt-[14px]">
        {days.map((day) => (
          <Fragment key={day}>
            {byDay && <li className="sticky top-0 z-[1] bg-sim-bg/95 px-5 pb-1.5 pt-4 text-[11px] font-medium uppercase tracking-[0.08em] text-sim-muted backdrop-blur">{fmtDayHeading(day)}</li>}
            {items
              .filter((p) => p.date === day)
              .map((p, i) => (
                <li key={p.id} className={cn("border-sim-line", i > 0 && "border-t")}>
                  <PurchaseRow p={p} showCategory />
                </li>
              ))}
          </Fragment>
        ))}
      </ul>
      {items.length === 0 && <p className="px-5 pt-8 text-[14.7px] text-sim-muted">No purchases here.</p>}
    </Screen>
  );
}

export function CardNote({ card }: { card: Purchase["card"] }) {
  const { dark } = useSim();
  const c = CARDS[card];
  return (
    <span className="inline-flex items-center gap-2">
      <span style={{ background: cardColor(card, dark) }} className="inline-block h-[14px] w-[20px] rounded-[3px]" />
      {c.name} <CardNumber last4={c.last4} />
    </span>
  );
}

export const Money = ({ cents, size = 56 }: { cents: number; size?: number }) => {
  const [whole, decimals] = aedParts(cents);
  return (
    <span className="inline-flex items-baseline gap-2.5 font-bold tracking-[-0.04em]">
      <span style={{ fontSize: size * 0.38 }} className="tracking-normal">AED</span>
      <span style={{ fontSize: size }} className="leading-none">
        {whole}
        <span style={{ fontSize: size * 0.5 }} className="text-sim-muted">.{decimals}</span>
      </span>
    </span>
  );
};
