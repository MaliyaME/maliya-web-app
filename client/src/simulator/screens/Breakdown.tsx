import { ArrowDown, ArrowUp } from "lucide-react";
import { useSim } from "../context";
import { CATEGORIES, monthLabel, monthName, toneFor } from "../data/catalog";
import { aed0, percent } from "../data/format";
import { categoryRows, monthTotal, type CategoryRow } from "../data/ledger";
import { Bar, CategoryTile, PressRow } from "../ui/atoms";
import { Header, Screen } from "../ui/Header";

export function ToneNote({ row, word = "your normal spend" }: { row: Pick<CategoryRow, "tone" | "delta">; word?: string }) {
  if (row.tone === "inline") return <>In line with {word}</>;
  const Icon = row.tone === "above" ? ArrowUp : ArrowDown;
  return (
    <>
      <Icon className="mb-px inline h-[10px] w-[8px] align-middle" strokeWidth={1.8} aria-hidden="true" />
      AED {aed0(Math.abs(row.delta))} {row.tone === "above" ? "above" : "below"} {word}
    </>
  );
}

export default function Breakdown() {
  const { ledger, month, push, dark } = useSim();
  const rows = categoryRows(ledger, month);
  const total = monthTotal(ledger, month);
  return (
    <Screen header={<Header back={monthLabel(month)} />}>
      <div className="px-5 pt-[20.6px]">
        <h1 className="text-[30px] font-semibold leading-[34px] tracking-[-0.025em]">Every category in {monthName(month)}</h1>
        <p className="mt-[11.7px] text-[12.7px] leading-[21px] text-sim-muted">Ranked by purchase amount. Unclassified purchases are included when present.</p>
      </div>
      <ul className="mt-[16.2px]">
        {rows.map((row, i) => {
          const tone = toneFor(row.cat, dark);
          return (
            <li key={row.cat}>
              <PressRow onClick={() => push({ name: "category", cat: row.cat })} className="items-start gap-[10px] px-5 pb-[28.1px]">
                <span className="mt-[9.9px]">
                  <CategoryTile cat={row.cat} size={40} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex h-5 items-baseline justify-between">
                    <span className="truncate text-[14.7px] leading-5">{CATEGORIES[row.cat].name}</span>
                    <span className="flex items-baseline gap-[14px]">
                      <span className="text-[12.7px] text-sim-muted">{percent(row.cents, total)}%</span>
                      <span className="text-[14.7px] font-semibold tabular-nums">{aed0(row.cents)}</span>
                    </span>
                  </span>
                  <span className="mt-3 block text-[12px] leading-4 text-sim-muted">
                    {row.count} purchase{row.count === 1 ? "" : "s"} <ToneNote row={row} />
                  </span>
                  <span className="mt-[8.4px] block">
                    <Bar share={row.share} color={tone.fg} delay={i * 35} />
                  </span>
                </span>
              </PressRow>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}
