import { CATEGORIES, monthLabel, monthName } from "./catalog";
import { aed0, fmtDate, percent } from "./format";
import {
  categoryRows,
  compare,
  fixedTotal,
  inMonth,
  monthSeries,
  monthSummary,
  monthTotal,
  repeatingOutsideFixed,
  sum,
  unusualPurchases,
  usualOf,
  type Ledger,
} from "./ledger";
import { MONTH_IDS, type CategoryId, type MonthId, type Route } from "./types";

export interface AnswerRow {
  purchaseId: number;
  title: string;
  note: string;
  cents: number;
}

export interface Answer {
  kind: "category" | "month" | "unusual" | "recurring" | "why" | "largest" | "help";
  month: MonthId;
  title: string;
  headline?: string;
  body: string;
  check?: string;
  rows?: AnswerRow[];
  extra?: { text: string; purchaseId: number };
  link?: { label: string; route: Route };
  next: string[];
}

export const Q = {
  top: "Where did most of my money go?",
  unusual: "Show unusual purchases.",
  recurring: "Which recurring charges appeared?",
};

export const STARTERS = [Q.top, Q.unusual, Q.recurring];

const CHECK = "Calculated from validated purchases, excluding fees and returned money.";

const CATEGORY_WORDS: [CategoryId, RegExp][] = [
  ["dining", /\b(dining|restaurants?|eating|food|cafes?|coffee|delivery)\b/],
  ["groceries", /\b(groceries|grocery|supermarkets?)\b/],
  ["travel", /\b(travel|flights?|hotels?|trips?|holiday)\b/],
  ["housing", /\b(housing|utilit\w+|bills?|dewa|rent)\b/],
  ["transport", /\b(transport|fuel|petrol|taxis?|rides?|parking|tolls?|salik|car)\b/],
  ["subs", /\b(subscriptions?|streaming|digital)\b/],
  ["shopping", /\b(shopping|clothes|clothing|shops?)\b/],
  ["health", /\b(health|fitness|gym|pharmacy)\b/],
  ["entertainment", /\b(entertainment|cinema|movies?|events?)\b/],
  ["personal", /\b(personal care|salon|grooming|barber)\b/],
  ["gifts", /\b(gifts?|donations?|charity|flowers?)\b/],
];

function monthIn(text: string): MonthId | undefined {
  return MONTH_IDS.find((m) => {
    const name = monthName(m).toLowerCase();
    return new RegExp(`\\b(${name}|${name.slice(0, 3)})\\b`).test(text);
  });
}

function categoryAnswer(l: Ledger, cat: CategoryId, month: MonthId, top = false): Answer {
  const rows = categoryRows(l, month);
  const row = rows.find((r) => r.cat === cat);
  const label = monthLabel(month);
  const name = CATEGORIES[cat].name;
  if (!row) {
    return { kind: "category", month, title: `${name} spending`, headline: "AED 0", body: `There were no ${name.toLowerCase()} purchases in ${label}.`, next: [Q.top, Q.unusual] };
  }
  const { delta, tone } = compare(row.cents, row.usual);
  const versus = tone === "inline" ? "That is in line with your usual." : `That is AED ${aed0(Math.abs(delta))} ${tone === "above" ? "above" : "below"} your usual.`;
  return {
    kind: "category",
    month,
    title: `${name} spending`,
    headline: `AED ${aed0(row.cents)}`,
    body: top
      ? `${row.count} purchases contributed to the total in ${label}. Your ${label} spending was AED ${aed0(monthTotal(l, month))}.`
      : `${row.count} purchase${row.count === 1 ? "" : "s"} made up ${percent(row.cents, monthTotal(l, month))}% of ${label}. ${versus}`,
    check: CHECK,
    link: { label: `See ${name} transactions`, route: { name: "purchases", title: name, subtitle: label, filter: { month, cat } } },
    next: top ? [Q.unusual, Q.recurring] : [Q.top, Q.unusual],
  };
}

function monthAnswer(l: Ledger, month: MonthId): Answer {
  const total = monthTotal(l, month);
  const usual = usualOf(monthSeries(l), month);
  const s = monthSummary(total, usual);
  return {
    kind: "month",
    month,
    title: `${monthName(month)} spending`,
    headline: `AED ${aed0(total)}`,
    body: `${s.lead} — AED ${aed0(Math.abs(total - usual))} ${s.tail}. Your usual month is AED ${aed0(usual)}.`,
    check: CHECK,
    link: { label: "Where it went", route: { name: "breakdown" } },
    next: [Q.top, Q.recurring],
  };
}

function unusualAnswer(l: Ledger, month: MonthId): Answer {
  const items = unusualPurchases(l, month);
  const label = monthLabel(month);
  if (items.length === 0) {
    return { kind: "unusual", month, title: "Nothing unusual", body: `No purchase stood out against your usual spend at the same shops in ${label}.`, next: [Q.recurring, Q.top] };
  }
  const total = sum(items.map((i) => i.purchase));
  return {
    kind: "unusual",
    month,
    title: `${items.length} purchase${items.length === 1 ? "" : "s"} stood out`,
    headline: `AED ${aed0(total)}`,
    body: `These were well above what you usually spend at the same shops in ${label}.`,
    check: CHECK,
    rows: items.map(({ purchase, ratio }) => ({
      purchaseId: purchase.id,
      title: purchase.merchant,
      note: `${fmtDate(purchase.date)} · ${ratio.toFixed(1)}× your usual`,
      cents: purchase.cents,
    })),
    next: [Q.recurring, Q.top],
  };
}

function recurringAnswer(l: Ledger, month: MonthId): Answer {
  const fixed = fixedTotal(l, month);
  const label = monthLabel(month);
  const gym = repeatingOutsideFixed(l, month)[0];
  return {
    kind: "recurring",
    month,
    title: "Recurring costs",
    headline: `AED ${aed0(fixed.cents)}`,
    body: `${fixed.count} recurring charges made up ${Math.round(fixed.share * 100)}% of your ${label} purchases.`,
    check: CHECK,
    rows: [...fixed.purchases]
      .sort((a, b) => b.cents - a.cents)
      .map((p) => ({ purchaseId: p.id, title: p.merchant, note: `${CATEGORIES[p.cat].name} · ${fmtDate(p.date)}`, cents: p.cents })),
    extra: gym ? { text: `Also repeating outside the fixed categories: ${gym.merchant}, AED ${aed0(gym.cents)}.`, purchaseId: gym.id } : undefined,
    next: [Q.unusual, Q.top],
  };
}

function whyAnswer(l: Ledger, month: MonthId, merchantHint?: string): Answer {
  const target =
    repeatingOutsideFixed(l, month).find((p) => !merchantHint || p.merchant.toLowerCase().includes(merchantHint)) ?? repeatingOutsideFixed(l, month)[0];
  if (!target) return helpAnswer(month);
  const key = target.merchant.toLowerCase();
  const months = new Set(l.purchases.filter((p) => p.merchant.toLowerCase() === key).map((p) => p.month)).size;
  return {
    kind: "why",
    month,
    title: target.merchant,
    headline: `AED ${aed0(target.cents)}`,
    body: `Charged once a month at the same amount for ${months} months in a row, so it repeats outside your fixed categories.`,
    check: CHECK,
    link: { label: `Open ${target.merchant}`, route: { name: "purchase", id: target.id } },
    next: [Q.recurring, Q.unusual],
  };
}

function largestAnswer(l: Ledger, month: MonthId): Answer {
  const biggest = [...inMonth(l, month)].sort((a, b) => b.cents - a.cents)[0];
  return {
    kind: "largest",
    month,
    title: biggest.merchant,
    headline: `AED ${aed0(biggest.cents)}`,
    body: `Your largest purchase in ${monthLabel(month)}, on ${fmtDate(biggest.date)}.`,
    check: CHECK,
    link: { label: `Open ${biggest.merchant}`, route: { name: "purchase", id: biggest.id } },
    next: [Q.unusual, Q.recurring],
  };
}

export function helpAnswer(month: MonthId): Answer {
  return { kind: "help", month, title: "Ask about a month, category, repeat charge or unusual purchase.", body: "Try one of these.", next: STARTERS };
}

export function answer(l: Ledger, question: string, selectedMonth: MonthId): Answer {
  const text = question.toLowerCase();
  const month = monthIn(text) ?? selectedMonth;
  if (/\b(why|worth noticing)\b/.test(text) && /(gym|warehouse|repeat)/.test(text)) return whyAnswer(l, month, /gym|warehouse/.test(text) ? "warehouse" : undefined);
  if (/\b(recurring|repeating|repeat)\b/.test(text)) return recurringAnswer(l, month);
  if (/\b(unusual|stand out|stood out|odd|unusually)\b/.test(text)) return unusualAnswer(l, month);
  if (/\b(biggest|largest|most expensive)\b.*\b(purchase|charge|transaction)\b/.test(text)) return largestAnswer(l, month);
  const category = CATEGORY_WORDS.find(([, pattern]) => pattern.test(text))?.[0];
  if (category) return categoryAnswer(l, category, month);
  if (/\b(most of my money|where did|top category|biggest category|biggest spend)\b/.test(text)) {
    const top = categoryRows(l, month)[0];
    return categoryAnswer(l, top.cat, month, true);
  }
  if (/\b(how much|total|spend|spent|spending)\b/.test(text) || monthIn(text)) return monthAnswer(l, month);
  return helpAnswer(month);
}

