export const MONTH_IDS = ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"] as const;
export type MonthId = (typeof MONTH_IDS)[number];

export type CardKey = "v" | "t";

export type CategoryId =
  | "dining"
  | "groceries"
  | "travel"
  | "housing"
  | "transport"
  | "subs"
  | "shopping"
  | "health"
  | "entertainment"
  | "personal"
  | "gifts";

export interface Purchase {
  id: number;
  date: string;
  month: MonthId;
  shop: string;
  merchant: string;
  cat: CategoryId;
  sub: string;
  cents: number;
  card: CardKey;
  descriptor?: string;
  note?: string;
}

export interface Edit {
  merchant?: string;
  cat?: CategoryId;
  note?: string;
  skipped?: boolean;
  personal?: boolean;
}

export type Edits = Record<number, Edit>;

export type Route =
  | { name: "home" }
  | { name: "activity" }
  | { name: "ask" }
  | { name: "statements" }
  | { name: "breakdown" }
  | { name: "category"; cat: CategoryId }
  | { name: "subcategory"; cat: CategoryId; sub: string }
  | { name: "purchases"; title: string; subtitle?: string; filter: PurchaseFilter }
  | { name: "purchase"; id: number }
  | { name: "wellness" }
  | { name: "naming" }
  | { name: "statement"; card: CardKey; month: MonthId };

export interface PurchaseFilter {
  month?: MonthId;
  cat?: CategoryId;
  sub?: string;
  merchant?: string;
  card?: CardKey;
  ids?: number[];
}

export type TabId = "home" | "activity" | "ask" | "statements";

export const TAB_IDS: readonly TabId[] = ["home", "activity", "ask", "statements"];
