import { CATEGORIES } from "./data/catalog";
import { MONTH_IDS, TAB_IDS, type PurchaseFilter, type Route, type TabId } from "./data/types";
import { initialState, navOf, type Nav, type SheetState } from "./state";

export const ROOT_NAV: Nav = navOf(initialState());

// A tab showing only its first screen. Switching between two of these is not a step worth going back through.
export const atRoot = ({ tab, stacks, sheet }: Nav) => sheet === null && stacks[tab].length === 1;

const ROUTES: Record<Route["name"], true> = {
  home: true,
  activity: true,
  ask: true,
  statements: true,
  breakdown: true,
  category: true,
  subcategory: true,
  purchases: true,
  purchase: true,
  wellness: true,
  naming: true,
  statement: true,
};
const SHEETS: Record<SheetState["kind"], true> = { months: true, askMonth: true, settings: true, add: true, edit: true };

type Raw = Record<string, unknown>;

const isRaw = (value: unknown): value is Raw => typeof value === "object" && value !== null && !Array.isArray(value);
const has = (table: object, key: unknown) => typeof key === "string" && Object.prototype.hasOwnProperty.call(table, key);
const optional = (value: unknown, ok: (value: unknown) => boolean) => value === undefined || ok(value);
const isText = (value: unknown) => typeof value === "string";
const isMonth = (value: unknown) => MONTH_IDS.some((id) => id === value);
const isCard = (value: unknown) => value === "v" || value === "t";
const isCategory = (value: unknown) => has(CATEGORIES, value);

function isFilter(value: unknown): value is PurchaseFilter {
  return (
    isRaw(value) &&
    optional(value.month, isMonth) &&
    optional(value.cat, isCategory) &&
    optional(value.sub, isText) &&
    optional(value.merchant, isText) &&
    optional(value.card, isCard) &&
    optional(value.ids, (ids) => Array.isArray(ids) && ids.every((id) => Number.isInteger(id)))
  );
}

function isRoute(value: unknown): value is Route {
  if (!isRaw(value) || !has(ROUTES, value.name)) return false;
  switch (value.name) {
    case "category":
      return isCategory(value.cat);
    case "subcategory":
      return isCategory(value.cat) && isText(value.sub);
    case "purchases":
      return isText(value.title) && optional(value.subtitle, isText) && isFilter(value.filter);
    case "purchase":
      return Number.isInteger(value.id);
    case "statement":
      return isCard(value.card) && isMonth(value.month);
    default:
      return true;
  }
}

function isSheet(value: unknown): value is SheetState {
  return isRaw(value) && has(SHEETS, value.kind) && (value.kind !== "edit" || Number.isInteger(value.id));
}

// History can hold navigation from another tab session or an older build, so nothing is trusted until it checks out.
export function parseNav(raw: unknown): Nav | null {
  if (!isRaw(raw) || !isRaw(raw.stacks)) return null;
  const tab = TAB_IDS.find((id) => id === raw.tab);
  if (!tab) return null;
  const stacks = {} as Record<TabId, Route[]>;
  for (const id of TAB_IDS) {
    const stack: unknown = raw.stacks[id];
    if (!Array.isArray(stack) || stack.length < 1 || stack.length > 64 || !stack.every(isRoute) || stack[0].name !== id) return null;
    stacks[id] = stack;
  }
  const sheet = raw.sheet ?? null;
  if (sheet !== null && !isSheet(sheet)) return null;
  return { tab, stacks, sheet };
}
