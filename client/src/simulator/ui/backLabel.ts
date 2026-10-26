import { useSim } from "../context";
import { CATEGORIES, monthLabel } from "../data/catalog";
import type { Route } from "../data/types";

function labelOf(route: Route, month: string, merchantOf: (id: number) => string | undefined): string {
  switch (route.name) {
    case "home":
      return "Home";
    case "activity":
      return "Activity";
    case "ask":
      return "Ask";
    case "statements":
      return "Statements";
    case "breakdown":
      return "Where it went";
    case "category":
      return CATEGORIES[route.cat].name;
    case "subcategory":
      return CATEGORIES[route.cat].subs[route.sub] ?? CATEGORIES[route.cat].name;
    case "purchases":
      return route.title;
    case "purchase":
      return merchantOf(route.id) ?? "Back";
    case "wellness":
      return "Spending wellness";
    case "naming":
      return "Name merchants";
    case "statement":
      return monthLabel(route.month) || month;
  }
}

// The label of the screen this one was opened from, like the back button in the real app.
export function useBackLabel(self: (route: Route) => boolean): string {
  const { state, ledger, month } = useSim();
  const stack = state.stacks[state.tab];
  let index = -1;
  for (let i = stack.length - 1; i >= 0; i--) {
    if (self(stack[i])) {
      index = i;
      break;
    }
  }
  const previous = index > 0 ? stack[index - 1] : undefined;
  return previous ? labelOf(previous, month, (id) => ledger.byId.get(id)?.merchant) : "Back";
}
