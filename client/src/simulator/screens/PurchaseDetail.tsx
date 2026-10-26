import { useSim } from "../context";
import { CATEGORIES, cardColor, monthLabel } from "../data/catalog";
import { aed0, aed2, aedParts, fmtDate } from "../data/format";
import { categoryRows, filterPurchases, needsName, purchaseInsight, shopHistory, sum } from "../data/ledger";
import { GreenLink, Chevron, PressRow } from "../ui/atoms";
import { useBackLabel } from "../ui/backLabel";
import { Header, Screen } from "../ui/Header";
import { CardNote } from "./PurchaseList";
import { cn } from "@/lib/utils";

export function PurchaseDetail({ id }: { id: number }) {
  const { ledger, push, openSheet, dark } = useSim();
  const back = useBackLabel((route) => route.name === "purchase" && route.id === id);
  const p = ledger.byId.get(id);
  if (!p) {
    return (
      <Screen header={<Header back={back} />}>
        <p className="p-5 text-[14.7px] text-sim-muted">This purchase is not available.</p>
      </Screen>
    );
  }

  const insight = purchaseInsight(ledger, p);
  const monthPurchases = filterPurchases(ledger, { month: p.month, cat: p.cat });
  const history = shopHistory(ledger, p);
  const catCents = sum(monthPurchases);
  const rowsInMonth = categoryRows(ledger, p.month).find((r) => r.cat === p.cat);
  const unnamed = needsName(ledger, p);
  const [whole, decimals] = aedParts(p.cents);

  return (
    <Screen
      header={
        <Header
          back={back}
          right={
            <button
              type="button"
              onClick={() => openSheet({ kind: "edit", id: p.id })}
              className="mr-[8px] rounded-md px-1 py-2 text-[12.5px] text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60"
            >
              Edit
            </button>
          }
        />
      }
    >
      <div className="px-5 pt-[24.7px]">
        <h1 className="text-[20px] font-semibold leading-[26px]">{p.merchant}</h1>
        {unnamed && p.descriptor && <p className="mt-1 text-[12px] leading-4 text-sim-muted">Bank description · {p.descriptor}</p>}
        <p className="mt-[11.2px] flex h-[44px] items-baseline gap-[12px] font-bold leading-none">
          <span className="text-[17px] tracking-[-0.01em]">AED</span>
          <span className="text-[41px] leading-none tracking-[-0.005em]">
            {whole}.<span className="text-[24px] leading-none tracking-normal text-sim-muted">{decimals}</span>
          </span>
        </p>
        <p className="mt-[23.5px] text-[12.7px] leading-4 text-sim-muted">{fmtDate(p.date)}</p>
        <p className={cn("mt-[17.8px] text-[18.9px] font-medium leading-6", insight.tone === "warn" ? "text-sim-warn" : insight.tone === "good" ? "text-sim-good" : "text-sim-ink")}>{insight.text}</p>
        <p className="mt-[10.2px] text-[12.7px] leading-4 text-sim-muted">
          AED {aed0(p.cents)} of AED {aed0(catCents)} {CATEGORIES[p.cat].name.toLowerCase()} this month.
        </p>
        <div className="mt-[20.4px]">
          <GreenLink onClick={() => push({ name: "purchases", title: CATEGORIES[p.cat].name, subtitle: monthLabel(p.month), filter: { month: p.month, cat: p.cat } })}>
            View this month's {rowsInMonth?.count ?? monthPurchases.length} purchases
          </GreenLink>
        </div>
      </div>

      <div className="mx-5 mt-[33.6px] h-px bg-sim-line" />

      <section className="mt-[23.7px]">
        <h2 className="px-5 text-[20px] font-semibold leading-[26px]">Recent purchases here</h2>
        <p className="mt-[5.7px] px-5 text-[12.7px] leading-4 text-sim-muted">
          {history.count === 0 ? "No earlier purchases" : `Before this purchase · Latest ${history.latest.length} of ${history.count}`}
        </p>
        <ul className="mx-5 mt-[12.5px]">
          {history.latest.map((q) => (
            <li key={q.id} className="border-b border-sim-line">
              <PressRow onClick={() => push({ name: "purchase", id: q.id })} className="h-[55px] items-center justify-between">
                <span className="text-[14.7px]">{fmtDate(q.date)}</span>
                <span className="flex items-center gap-[8px]">
                  <span className="text-[14.7px] tabular-nums">AED {aed2(q.cents)}</span>
                  <Chevron />
                </span>
              </PressRow>
            </li>
          ))}
        </ul>
        {history.count > 0 && (
          <div className="mt-[20.8px] px-5">
            <GreenLink onClick={() => push({ name: "purchases", title: p.merchant, subtitle: "All purchases here", filter: { merchant: p.merchant } })}>View all purchases here</GreenLink>
          </div>
        )}
      </section>

      <section className="mt-[36px] px-5">
        <h2 className="text-[14.7px] font-medium leading-5 text-sim-muted">Paid with</h2>
        <div className="mt-3 flex items-center gap-3.5">
          <span style={{ background: cardColor(p.card, dark) }} className="flex h-[34px] w-[48px] items-end rounded-[7px] p-1.5">
            <span className="h-[3px] w-4 rounded-full bg-white/70" />
          </span>
          <button
            type="button"
            onClick={() => push({ name: "statement", card: p.card, month: p.month })}
            className="flex-1 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60"
          >
            <span className="block text-[14.7px]">
              <CardNote card={p.card} />
            </span>
            <span className="mt-1 block text-[12.7px] text-sim-brand">Open the {monthLabel(p.month)} statement →</span>
          </button>
        </div>
        {p.note && (
          <div className="mt-6 rounded-2xl bg-sim-bubble p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-sim-muted">Private note</p>
            <p className="mt-1.5 text-[14.7px] leading-[1.4]">{p.note}</p>
          </div>
        )}
      </section>
    </Screen>
  );
}
