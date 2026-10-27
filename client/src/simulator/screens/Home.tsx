import { ChevronDown, ChevronLeft, ChevronRight, Lightbulb, PieChart, Store } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CATEGORIES, monthLabel, monthName, toneFor } from "../data/catalog";
import { aed0, percent } from "../data/format";
import {
  biggestIncrease,
  highestOf,
  homeRows,
  monthSeries,
  monthSummary,
  monthTotal,
  namingStats,
  repeatingOutsideFixed,
  usualOf,
  wellness,
} from "../data/ledger";
import { MONTH_IDS } from "../data/types";
import { Bar, CategoryTile, Chevron, Counter, GreenLink, PressRow, Segments } from "../ui/atoms";
import { Header, Screen } from "../ui/Header";
import { MonthChart } from "../ui/MonthChart";

export default function Home() {
  const { ledger, month, setMonth, push, openSheet, ask, dark } = useSim();
  const [more, setMore] = useState(false);
  const series = monthSeries(ledger);
  const total = monthTotal(ledger, month);
  const usual = usualOf(series, month);
  const summary = monthSummary(total, usual);
  const well = wellness(ledger, month);
  const repeating = repeatingOutsideFixed(ledger, month)[0];
  const increase = biggestIncrease(ledger, month);
  const rows = homeRows(ledger, month);
  const naming = namingStats(ledger, month);
  const index = MONTH_IDS.indexOf(month);
  const label = monthLabel(month);

  const step = (direction: -1 | 1) => {
    const next = MONTH_IDS[index + direction];
    if (next) setMonth(next);
  };

  return (
    <Screen
      scrollHeader
      header={
        <Header
          inScroll
          title={
            <button
              type="button"
              onClick={() => openSheet({ kind: "months" })}
              aria-label={`${label}. Choose a month`}
              className="-ml-1 flex items-center gap-[8px] whitespace-nowrap rounded-lg px-1 py-1 text-[19px] font-semibold tracking-[-0.02em] outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60"
            >
              {label}
              <ChevronDown className="mt-px h-[15px] w-[15px]" strokeWidth={1.8} aria-hidden="true" />
            </button>
          }
          right={
            <span className="flex items-center">
              {([-1, 1] as const).map((direction) => {
                const disabled = !MONTH_IDS[index + direction];
                const Icon = direction < 0 ? ChevronLeft : ChevronRight;
                return (
                  <button
                    key={direction}
                    type="button"
                    disabled={disabled}
                    aria-label={direction < 0 ? "Previous month" : "Next month"}
                    onClick={() => step(direction)}
                    className={cn("sim-hit flex h-10 w-9 items-center justify-center rounded-full outline-none min-[360px]:w-[44px] focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press", disabled ? "text-sim-faint/60" : "text-sim-muted")}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
                  </button>
                );
              })}
            </span>
          }
        />
      }
    >
      <section className="px-5 pt-[28.8px]">
        <p className="h-5 text-[14.7px] leading-5 text-sim-muted">Total spent</p>
        <p className="mt-[13.7px] h-4 text-[12px] leading-4 tracking-[0.05em] text-sim-muted">AED</p>
        <p className="font-numeral text-[62px] font-medium leading-[66px] tracking-[0]">
          <Counter value={total / 100} from={month === "2026-09" ? total / 140 : undefined} format={(n) => aed0(n * 100)} />
        </p>
        <p className="mt-[32px] text-[16.85px] leading-6 text-sim-ink">
          {summary.lead} — {aed0(Math.abs(total - usual))} {summary.tail}.
        </p>
      </section>

      <section className="mt-[26.4px] px-5">
        <PressRow onClick={() => push({ name: "wellness" })} className="-mx-2 w-[calc(100%+16px)] items-center justify-between rounded-xl px-2 py-1">
          <span>
            <span className="block text-[12.75px] leading-4 text-sim-muted">Spending wellness</span>
            <span className="mt-[3px] block text-[17px] font-semibold leading-[22px] text-sim-good">{well.label}</span>
          </span>
          <span className="flex items-center gap-[2px]">
            <span className="relative -top-[2.6px] font-numeral text-[32px] font-medium leading-[30px] text-sim-good">
              <Counter value={well.score} format={(n) => String(Math.round(n))} from={0} duration={0.9} />
            </span>
            <span className="relative -top-[2.6px] mt-[9px] text-[12.7px] leading-4 text-sim-muted">/100</span>
            <ChevronRight className="ml-[14.6px] h-[15px] w-[15px] text-sim-muted" strokeWidth={1.6} aria-hidden="true" />
          </span>
        </PressRow>
        <div className="mt-[10px]">
          <Segments key={month} filled={Math.round(well.score / 5)} />
        </div>
      </section>

      {repeating && (
        <section className="mt-[32px] px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold leading-[26px]">Worth noticing</h2>
            <Lightbulb className="h-[19px] w-[19px] text-sim-muted" strokeWidth={1.4} aria-hidden="true" />
          </div>
          <p className="mt-[16px] text-[14.85px] leading-6 text-sim-muted">
            Your largest repeating charge outside the fixed categories is {repeating.merchant}, at AED {aed0(repeating.cents)} in {monthName(month)}.
          </p>
          <div className="mt-[24px] flex flex-wrap gap-x-[22px] gap-y-2">
            <GreenLink onClick={() => push({ name: "purchase", id: repeating.id })}>Open {repeating.merchant}</GreenLink>
            <GreenLink onClick={() => ask(`Why is ${repeating.merchant} worth noticing?`)}>Ask why</GreenLink>
          </div>
          {increase && (
            <>
              <button
                type="button"
                aria-expanded={more}
                onClick={() => setMore((value) => !value)}
                className="sim-hit mt-[40.4px] flex items-center gap-1.5 rounded-md text-[14.7px] leading-5 text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60"
              >
                {more ? "See less" : "See 1 more"}
                <ChevronDown className={cn("h-[15px] w-[15px] transition-transform", more && "rotate-180")} strokeWidth={1.6} aria-hidden="true" />
              </button>
              {more && (
                <div className="mt-3 border-t border-sim-line pt-4">
                  <p className="text-[14.7px] leading-6 text-sim-muted">
                    {CATEGORIES[increase.cat].name} was AED {aed0(increase.delta)} above your usual, the biggest increase in {monthName(month)}.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-[23px] gap-y-2">
                    <GreenLink onClick={() => push({ name: "category", cat: increase.cat })}>Open {CATEGORIES[increase.cat].name}</GreenLink>
                    <GreenLink onClick={() => ask(`Why is ${CATEGORIES[increase.cat].name.toLowerCase()} above my usual?`)}>Ask why</GreenLink>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <section className="mt-[45.3px]">
        <MonthChart series={series} selected={month} usual={usual} highest={highestOf(series)} onPick={setMonth} label="Monthly spending. Tap a month to open it." />
      </section>

      <section className="mt-[45.4px]">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-[20px] font-semibold leading-[26px]">Where it went</h2>
          <button type="button" aria-label="Open the full breakdown" onClick={() => push({ name: "breakdown" })} className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-sim-ink outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press">
            <PieChart className="h-[21px] w-[21px]" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        {naming.count > 0 && (
          <button
            type="button"
            onClick={() => push({ name: "naming" })}
            className="mx-[8.6px] mt-[16.3px] flex w-[calc(100%-17.2px)] items-center gap-[11px] rounded-[24px] border border-sim-border bg-sim-surface py-[12.9px] pl-[10.4px] pr-[12.1px] text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-sim-brand active:scale-[0.985]"
          >
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-sim-pill text-sim-brand">
              <Store className="h-[17px] w-[17px]" strokeWidth={1.4} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.7px] font-medium leading-5">
                {naming.count} merchant{naming.count === 1 ? "" : "s"} to name in {monthName(month)}
              </span>
              <span className="mt-[8.4px] block h-[4px] overflow-hidden rounded-full bg-sim-track">
                <span style={{ width: `${naming.done}%` }} className="block h-full rounded-full bg-sim-brand transition-[width] duration-700" />
              </span>
              <span className="mt-2 block text-[12px] leading-4 text-sim-muted">
                AED {aed0(naming.left)} left to name · {naming.done}% done
              </span>
            </span>
            <Chevron />
          </button>
        )}

        <ul className="mt-[6.7px]">
          {rows.map((row, i) => {
            const cat = row.kind === "category" ? row.cat : "smaller";
            const tone = toneFor(cat, dark);
            const name = row.kind === "category" ? CATEGORIES[row.cat].name : "Smaller categories";
            return (
              <li key={`${month}-${cat}`}>
                <PressRow
                  onClick={() => push(row.kind === "category" ? { name: "category", cat: row.cat } : { name: "breakdown" })}
                  className="items-center gap-[10px] px-5 py-[13px]"
                >
                  <CategoryTile cat={cat} size={40} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between">
                      <span className="truncate text-[14.7px] leading-5">{name}</span>
                      <span className="flex items-baseline gap-[14px]">
                        <span className="text-[12.7px] text-sim-muted">{percent(row.cents, total)}%</span>
                        <span className="min-w-[44px] text-right text-[14.7px] font-semibold tabular-nums">{aed0(row.cents)}</span>
                      </span>
                    </span>
                    <span className="mt-[10.7px] block">
                      <Bar share={row.share} color={tone.fg} delay={i * 40} />
                    </span>
                  </span>
                </PressRow>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 px-5">
          <GreenLink onClick={() => push({ name: "breakdown" })}>Open the full breakdown</GreenLink>
        </div>
      </section>
    </Screen>
  );
}
