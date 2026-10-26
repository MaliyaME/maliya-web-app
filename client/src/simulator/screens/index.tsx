import type { ReactNode } from "react";
import type { Route } from "../data/types";
import Activity from "./Activity";
import Ask from "./Ask";
import Breakdown from "./Breakdown";
import { Category, Subcategory } from "./Category";
import Home from "./Home";
import Naming from "./Naming";
import { PurchaseDetail } from "./PurchaseDetail";
import { PurchaseList } from "./PurchaseList";
import Statements, { StatementDetail } from "./Statements";
import Wellness from "./Wellness";

export function renderRoute(route: Route): ReactNode {
  switch (route.name) {
    case "home":
      return <Home />;
    case "activity":
      return <Activity />;
    case "ask":
      return <Ask />;
    case "statements":
      return <Statements />;
    case "breakdown":
      return <Breakdown />;
    case "category":
      return <Category cat={route.cat} />;
    case "subcategory":
      return <Subcategory cat={route.cat} sub={route.sub} />;
    case "purchases":
      return <PurchaseList title={route.title} subtitle={route.subtitle} filter={route.filter} />;
    case "purchase":
      return <PurchaseDetail id={route.id} />;
    case "wellness":
      return <Wellness />;
    case "naming":
      return <Naming />;
    case "statement":
      return <StatementDetail card={route.card} month={route.month} />;
  }
}
