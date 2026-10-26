import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CATEGORIES, monthLabel, monthName, toneFor } from "../data/catalog";
import { aed0, percent } from "../data/format";
import { categoryRows, categorySeries, compare, highestOf, monthTotal, shopRows, subRows, usualOf } from "../data/ledger";
import type { CategoryId } from "../data/types";
import { Bar, CategoryTile, Chevron, Counter, GreenLink, PressRow } from "../ui/atoms";
import { Header, Screen } from "../ui/Header";
import { MonthChart } from "../ui/MonthChart";

export function Category({ cat }: { cat: CategoryId }) {
  const { ledger, month, setMonth, push, dark } = useSim();
  const def = CATEGORIES[cat];
  const series = categorySeries(ledger, cat);
  const row = categoryRows(ledger, month).find((r) => r.cat === cat);
  const cents = series[month];
  const usual = usualOf(series, month);
  const { delta, tone } = compare(cents, usual);
  const total = monthTotal(ledger, month);
  const subs = subRows(ledger, cat, month);
  const tint = toneFor(cat, dark);
  const label = monthLabel(month);

  return (
    <Screen header={<Header back="Where it went" />}>
      <div className="px-5 pt-[23.4px]">
        <div className="flex items-center gap-[11px]">
          <CategoryTile cat={cat} size={40} />
          <h1 className="text-[20px] font-semibold leading-[26px]">{def.name}</h1>
        </div>
        <p className="mt-[18px] text-[12.7px] leading-4 text-sim-muted">{label}</p>
        <p className="mt-[7.3px] text-[12.5px] leading-4 tracking-[0.04em] text-sim-muted">AED</p>
        <p className="-mt-[5px] ml-[2px] text-[58px] font-bold leading-[58px] tracking-[-0.025em]">
          <Counter value={cents / 100} format={(n) => aed0(n * 100)} duration={0.7} />
        </p>
        <p className={cn("mt-[19.7px] flex items-center gap-[9px] text-[17px] font-medium leading-[22px]", tone === "above" ? "text-sim-warn" : tone === "below" ? "text-sim-good" : "text-sim-muted")}>
          {tone === "above" && <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={1.6} aria-hidden="true" />}
          {tone === "below" && <ArrowDownRight className="h-[17px] w-[17px]" strokeWidth={1.6} aria-hidden="true" />}
          {tone === "inline" ? "In line with your usual" : `AED ${aed0(Math.abs(delta))} ${tone === "above" ? "above" : "below"} your usual`}
        </p>
        <div className="mt-[13.7px]">
          <GreenLink onClick={() => push({ name: "purchases", title: def.name, subtitle: label, filter: { month, cat } })} className="text-[12.5px]">
            {row?.count ?? 0} purchases · {percent(cents, total)}% of {monthName(month)}
          </GreenLink>
        </div>
      </div>

      <h2 className="mt-[56.9px] px-5 text-[20px] font-semibold leading-[26px]">Monthly spending</h2>
      <div className="mt-[21.8px]">
        <MonthChart series={series} selected={month} usual={usual} highest={highestOf(series)} onPick={setMonth} years label={`Monthly ${def.name.toLowerCase()} spending. Tap a month to open it.`} />
      </div>
      <p className="mt-[26.9px] px-5 text-[11.7px] leading-4 text-sim-muted">Complete months only</p>

      <h2 className="mt-[33.3px] px-5 text-[20px] font-semibold leading-[26px]">Subcategories</h2>
      <ul className="mt-[23.1px]">
        {subs.map((sub, i) => (
          <li key={sub.sub}>
            <PressRow onClick={() => push({ name: "subcategory", cat, sub: sub.sub })} className="items-start gap-[10px] px-5 pb-[35px]">
              <span className="mt-[6.6px]">
                <CategoryTile cat={cat} size={40} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex h-5 items-baseline justify-between">
                  <span className="text-[14.7px] leading-5">{sub.name}</span>
                  <span className="text-[14.7px] font-semibold tabular-nums">{aed0(sub.cents)}</span>
                </span>
                <span className="mt-[8.7px] block text-[12px] leading-4 text-sim-muted">
                  {sub.count} purchase{sub.count === 1 ? "" : "s"} · {percent(sub.cents, cents)}% of {def.name}
                </span>
                <span className="mt-[7.3px] block">
                  <Bar share={sub.share} color={tint.fg} delay={i * 50} thin />
                </span>
              </span>
              <span className="ml-[3px] mt-[18.4px]">
                <Chevron />
              </span>
            </PressRow>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

export function Subcategory({ cat, sub }: { cat: CategoryId; sub: string }) {
  const { ledger, month, push, dark } = useSim();
  const def = CATEGORIES[cat];
  const name = def.subs[sub] ?? def.name;
  const shops = shopRows(ledger, cat, sub, month);
  const total = shops.reduce((a, s) => a + s.cents, 0);
  const tint = toneFor(cat, dark);
  return (
    <Screen header={<Header back={def.name} />}>
      <div className="px-5 pt-[23.4px]">
        <p className="text-[12.7px] leading-4 text-sim-muted">{def.name} · {monthLabel(month)}</p>
        <h1 className="mt-[8px] text-[20px] font-semibold leading-[26px]">{name}</h1>
        <p className="mt-[20px] text-[12.5px] leading-4 tracking-[0.04em] text-sim-muted">AED</p>
        <p className="-mt-[6.3px] text-[58px] font-bold leading-[58px] tracking-[-0.025em]">{aed0(total)}</p>
        <div className="mt-[16.7px]">
          <GreenLink onClick={() => push({ name: "purchases", title: name, subtitle: `${def.name} · ${monthLabel(month)}`, filter: { month, cat, sub } })} className="text-[12.7px]">
            View all purchases
          </GreenLink>
        </div>
      </div>
      <h2 className="mt-[44px] px-5 text-[20px] font-semibold leading-[26px]">Shops</h2>
      <ul className="mt-[23.1px]">
        {shops.map((shop, i) => (
          <li key={shop.merchant}>
            <PressRow
              onClick={() => push({ name: "purchases", title: shop.merchant, subtitle: monthLabel(month), filter: { month, cat, sub, merchant: shop.merchant } })}
              className="items-start gap-[10px] px-5 pb-[35px]"
            >
              <span className="min-w-0 flex-1">
                <span className="flex h-5 items-baseline justify-between">
                  <span className="truncate text-[14.7px] leading-5">{shop.merchant}</span>
                  <span className="text-[14.7px] font-semibold tabular-nums">{aed0(shop.cents)}</span>
                </span>
                <span className="mt-[8.7px] block text-[12px] leading-4 text-sim-muted">
                  {shop.count} purchase{shop.count === 1 ? "" : "s"} · {percent(shop.cents, total)}% of {name}
                </span>
                <span className="mt-[7.3px] block">
                  <Bar share={shop.share} color={tint.fg} delay={i * 50} thin />
                </span>
              </span>
              <span className="ml-[3px] mt-[6px]">
                <Chevron />
              </span>
            </PressRow>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
