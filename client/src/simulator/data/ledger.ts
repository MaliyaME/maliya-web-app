import { CATEGORIES, CATEGORY_ORDER, SHOPS, daysInMonth } from "./catalog";
import { PURCHASE_ROWS } from "./purchases";
import { MONTH_IDS, type CardKey, type CategoryId, type Edits, type MonthId, type Purchase, type PurchaseFilter } from "./types";

export interface Ledger {
  purchases: Purchase[];
  byId: Map<number, Purchase>;
  edits: Edits;
}

export function buildLedger(edits: Edits): Ledger {
  const purchases = PURCHASE_ROWS.map(([date, shop, cents, card], id): Purchase => {
    const base = SHOPS[shop];
    const edit = edits[id];
    const cat = edit?.cat ?? base.cat;
    return {
      id,
      date,
      month: date.slice(0, 7) as MonthId,
      shop,
      merchant: edit?.merchant?.trim() || base.name,
      cat,
      sub: cat === base.cat ? base.sub : CATEGORIES[cat].defaultSub,
      cents,
      card,
      descriptor: base.unnamed ? base.name : undefined,
      note: edit?.note,
    };
  });
  return { purchases, byId: new Map(purchases.map((p) => [p.id, p])), edits };
}

export const sum = (ps: Purchase[]) => ps.reduce((total, p) => total + p.cents, 0);
export const inMonth = (l: Ledger, m: MonthId) => l.purchases.filter((p) => p.month === m);
export const monthTotal = (l: Ledger, m: MonthId) => sum(inMonth(l, m));

export type Series = Record<MonthId, number>;

export function seriesOf(l: Ledger, match: (p: Purchase) => boolean): Series {
  const out = Object.fromEntries(MONTH_IDS.map((m) => [m, 0])) as Series;
  for (const p of l.purchases) if (match(p)) out[p.month] += p.cents;
  return out;
}

export const monthSeries = (l: Ledger) => seriesOf(l, () => true);
export const categorySeries = (l: Ledger, cat: CategoryId) => seriesOf(l, (p) => p.cat === cat);

export function usualOf(series: Series, m: MonthId) {
  const others = MONTH_IDS.filter((id) => id !== m);
  return others.reduce((total, id) => total + series[id], 0) / others.length;
}

export function highestOf(series: Series): MonthId {
  return MONTH_IDS.reduce((best, id) => (series[id] > series[best] ? id : best));
}

export type Tone = "above" | "below" | "inline";

export function compare(value: number, usual: number, tolerance = 0.01): { delta: number; tone: Tone } {
  const delta = value - usual;
  if (usual === 0 || Math.abs(delta) <= usual * tolerance) return { delta, tone: "inline" };
  return { delta, tone: delta > 0 ? "above" : "below" };
}

export function monthSummary(total: number, usual: number): { lead: string; tail: string; tone: Tone } {
  const { delta, tone } = compare(total, usual, 0.05);
  const direction = delta >= 0 ? "above" : "below";
  const lead = tone === "inline" ? "Close to your usual month" : tone === "above" ? "Higher than your usual month" : "Lower than your usual month";
  return { lead, tail: direction, tone };
}

export interface CategoryRow {
  cat: CategoryId;
  cents: number;
  count: number;
  share: number;
  usual: number;
  delta: number;
  tone: Tone;
}

export function categoryRows(l: Ledger, m: MonthId): CategoryRow[] {
  const total = monthTotal(l, m);
  const ps = inMonth(l, m);
  return CATEGORY_ORDER.map((cat) => {
    const mine = ps.filter((p) => p.cat === cat);
    const cents = sum(mine);
    const usual = usualOf(categorySeries(l, cat), m);
    return { cat, cents, count: mine.length, share: total ? cents / total : 0, usual, ...compare(cents, usual) };
  })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.cents - a.cents);
}

export type HomeRow = ({ kind: "category" } & CategoryRow) | { kind: "smaller"; cents: number; count: number; share: number };

export function homeRows(l: Ledger, m: MonthId): HomeRow[] {
  const rows = categoryRows(l, m);
  if (rows.length <= 8) return rows.map((row) => ({ kind: "category", ...row }));
  const rest = rows.slice(7);
  return [
    ...rows.slice(0, 7).map((row): HomeRow => ({ kind: "category", ...row })),
    { kind: "smaller", cents: rest.reduce((a, r) => a + r.cents, 0), count: rest.reduce((a, r) => a + r.count, 0), share: rest.reduce((a, r) => a + r.share, 0) },
  ];
}

export interface SubRow {
  sub: string;
  name: string;
  cents: number;
  count: number;
  share: number;
}

export function subRows(l: Ledger, cat: CategoryId, m: MonthId): SubRow[] {
  const mine = inMonth(l, m).filter((p) => p.cat === cat);
  const total = sum(mine);
  return Object.entries(CATEGORIES[cat].subs)
    .map(([sub, name]) => {
      const ps = mine.filter((p) => p.sub === sub);
      return { sub, name, cents: sum(ps), count: ps.length, share: total ? sum(ps) / total : 0 };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.cents - a.cents);
}

export interface ShopRow {
  merchant: string;
  cents: number;
  count: number;
  share: number;
}

export function shopRows(l: Ledger, cat: CategoryId, sub: string, m: MonthId): ShopRow[] {
  const mine = inMonth(l, m).filter((p) => p.cat === cat && p.sub === sub);
  const total = sum(mine);
  const groups = new Map<string, Purchase[]>();
  for (const p of mine) groups.set(p.merchant, [...(groups.get(p.merchant) ?? []), p]);
  return Array.from(groups.entries())
    .map(([merchant, ps]) => ({ merchant, cents: sum(ps), count: ps.length, share: total ? sum(ps) / total : 0 }))
    .sort((a, b) => b.cents - a.cents);
}

const byRecent = (a: Purchase, b: Purchase) => (a.date === b.date ? b.id - a.id : a.date < b.date ? 1 : -1);

export function filterPurchases(l: Ledger, f: PurchaseFilter): Purchase[] {
  return l.purchases
    .filter(
      (p) =>
        (!f.month || p.month === f.month) &&
        (!f.cat || p.cat === f.cat) &&
        (!f.sub || p.sub === f.sub) &&
        (!f.merchant || p.merchant === f.merchant) &&
        (!f.card || p.card === f.card) &&
        (!f.ids || f.ids.includes(p.id)),
    )
    .sort(byRecent);
}

export function shopHistory(l: Ledger, p: Purchase) {
  const key = p.merchant.toLowerCase();
  const before = l.purchases
    .filter((q) => q.merchant.toLowerCase() === key && (q.date < p.date || (q.date === p.date && q.id < p.id)))
    .sort(byRecent);
  return { count: before.length, latest: before.slice(0, 5) };
}

export interface Insight {
  text: string;
  tone: "warn" | "good" | "neutral";
}

export function purchaseInsight(l: Ledger, p: Purchase): Insight {
  const sameMonth = inMonth(l, p.month).filter((q) => q.cat === p.cat);
  if (sameMonth.length >= 3 && sameMonth.every((q) => q.cents <= p.cents)) {
    return { text: `Your largest ${CATEGORIES[p.cat].name.toLowerCase()} purchase this month.`, tone: "warn" };
  }
  const { count, latest } = shopHistory(l, p);
  if (count === 0) return { text: "The first purchase here.", tone: "neutral" };
  const average = sum(latest) / latest.length;
  const ratio = p.cents / average;
  if (ratio >= 1.25) return { text: `Higher than your usual at ${p.merchant}.`, tone: "warn" };
  if (ratio <= 0.8) return { text: `Lower than your usual at ${p.merchant}.`, tone: "good" };
  return { text: `In line with your usual at ${p.merchant}.`, tone: "neutral" };
}

export const needsName = (l: Ledger, p: Purchase) => {
  const e = l.edits[p.id];
  return !!p.descriptor && !e?.merchant && !e?.skipped && !e?.personal;
};

export function unnamedList(l: Ledger, m: MonthId) {
  return inMonth(l, m)
    .filter((p) => needsName(l, p))
    .sort((a, b) => b.cents - a.cents);
}

export function namingStats(l: Ledger, m: MonthId) {
  const left = sum(unnamedList(l, m));
  const base = sum(inMonth(l, m).filter((p) => CATEGORIES[p.cat].nameable));
  return { count: unnamedList(l, m).length, left, done: base ? Math.round((1 - left / base) * 100) : 100 };
}

export function fixedTotal(l: Ledger, m: MonthId) {
  const ps = inMonth(l, m).filter((p) => CATEGORIES[p.cat].fixed);
  const total = monthTotal(l, m);
  return { cents: sum(ps), count: ps.length, share: total ? sum(ps) / total : 0, purchases: ps };
}

// A repeating charge is a single purchase per month at a steady amount, like a membership.
export function repeatingOutsideFixed(l: Ledger, m: MonthId): Purchase[] {
  const perMonth = (key: string, month: MonthId) => l.purchases.filter((q) => q.month === month && q.merchant.toLowerCase() === key);
  return inMonth(l, m)
    .filter((p) => {
      const key = p.merchant.toLowerCase();
      if (CATEGORIES[p.cat].fixed || p.cat === "travel" || perMonth(key, m).length !== 1) return false;
      const steady = MONTH_IDS.filter((id) => {
        const hits = id === m ? [] : perMonth(key, id);
        return hits.length === 1 && Math.abs(hits[0].cents - p.cents) <= p.cents * 0.03;
      });
      return steady.length >= 3;
    })
    .sort((a, b) => b.cents - a.cents);
}

export function biggestIncrease(l: Ledger, m: MonthId): CategoryRow | undefined {
  return categoryRows(l, m)
    .filter((row) => row.tone === "above")
    .sort((a, b) => b.delta - a.delta)[0];
}

const WELLNESS: Record<MonthId, { score: number; stability: number; distance: number }> = {
  "2026-04": { score: 79, stability: 71, distance: 386000 },
  "2026-05": { score: 78, stability: 69, distance: 401000 },
  "2026-06": { score: 76, stability: 66, distance: 432000 },
  "2026-07": { score: 72, stability: 55, distance: 612000 },
  "2026-08": { score: 81, stability: 68, distance: 412000 },
  "2026-09": { score: 80, stability: 64, distance: 453000 },
};

export function wellness(l: Ledger, m: MonthId) {
  const total = monthTotal(l, m);
  const usual = usualOf(monthSeries(l), m);
  const target = Math.round(usual * 0.95);
  const over = Math.max(0, (total - target) / target);
  const fixed = fixedTotal(l, m);
  return {
    score: WELLNESS[m].score,
    label: "Steady",
    goal: { score: Math.max(0, Math.min(100, Math.round(100 - 185 * over))), total, target },
    stability: { score: WELLNESS[m].stability, distance: WELLNESS[m].distance },
    fees: { score: 100, cents: 0 },
    recurring: { score: Math.round(100 - fixed.share * 100), cents: fixed.cents, share: fixed.share, count: fixed.count },
  };
}

export interface StatementRow {
  card: CardKey;
  month: MonthId;
  cents: number;
  count: number;
  from: string;
  to: string;
}

export function statementRows(l: Ledger, card: CardKey): StatementRow[] {
  return [...MONTH_IDS].reverse().map((month) => {
    const ps = inMonth(l, month).filter((p) => p.card === card);
    return { card, month, cents: sum(ps), count: ps.length, from: `${month}-01`, to: `${month}-${String(daysInMonth(month)).padStart(2, "0")}` };
  });
}

export function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export interface UnusualItem {
  purchase: Purchase;
  ratio: number;
  typical: number;
}

export function unusualPurchases(l: Ledger, m: MonthId): UnusualItem[] {
  const items: UnusualItem[] = [];
  for (const p of inMonth(l, m)) {
    if (p.cents < 15000 || CATEGORIES[p.cat].fixed) continue;
    const prior = l.purchases.filter((q) => q.merchant.toLowerCase() === p.merchant.toLowerCase() && q.date < p.date);
    let typical: number;
    let needed: number;
    if (prior.length >= 3) {
      typical = median(prior.map((q) => q.cents));
      needed = 1.5;
    } else {
      const peers = l.purchases.filter((q) => q.cat === p.cat && q.sub === p.sub && q.id !== p.id);
      if (peers.length < 3) continue;
      typical = median(peers.map((q) => q.cents));
      needed = 3;
    }
    const ratio = p.cents / typical;
    if (ratio >= needed) items.push({ purchase: p, ratio, typical });
  }
  return items.sort((a, b) => b.purchase.cents - a.purchase.cents).slice(0, 4);
}
