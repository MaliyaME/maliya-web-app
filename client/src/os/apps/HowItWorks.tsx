import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleAlert, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOS } from "../OSContext";

type Scenario = "match" | "mismatch";
type Phase = "idle" | "reading" | "checking" | "done";

// Sample figures only, held in cents so the totals are exact.
const rows = [
  { name: "Grocery store", date: "3 Sep", cents: 41250 },
  { name: "Coffee shop", date: "5 Sep", cents: 3600 },
  { name: "Ride", date: "8 Sep", cents: 5875 },
  { name: "Restaurant", date: "12 Sep", cents: 28500, misreadCents: 25800 },
  { name: "Streaming", date: "15 Sep", cents: 5499 },
  { name: "Pharmacy", date: "21 Sep", cents: 13025 },
];

const printedTotal = rows.reduce((sum, row) => sum + row.cents, 0);

function readCents(row: (typeof rows)[number], scenario: Scenario) {
  return scenario === "mismatch" && row.misreadCents ? row.misreadCents : row.cents;
}

function formatAed(cents: number) {
  return `AED ${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function HowItWorks() {
  const { openApp } = useOS();
  const reduceMotion = useReducedMotion();
  const [scenario, setScenario] = useState<Scenario>("match");
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setShown(0);
  };

  const run = () => {
    clearTimers();
    setShown(0);
    setPhase("reading");
    const step = reduceMotion ? 60 : 520;
    rows.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => setShown(index + 1), step * (index + 1)));
    });
    const checkAt = step * (rows.length + 1);
    timers.current.push(window.setTimeout(() => setPhase("checking"), checkAt));
    timers.current.push(window.setTimeout(() => setPhase("done"), checkAt + (reduceMotion ? 120 : 1000)));
  };

  const chooseScenario = (next: Scenario) => {
    setScenario(next);
    reset();
  };

  const running = phase === "reading" || phase === "checking";
  const readTotal = rows.slice(0, shown).reduce((sum, row) => sum + readCents(row, scenario), 0);
  const matches = readTotal === printedTotal;

  return (
    <div className="mx-auto w-full max-w-md px-6 py-7 sm:py-9">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Checked before it is added</p>
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance">
        Watch a statement get checked
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Maliya checks the numbers it reads against the totals printed on your statement. Try both outcomes.
      </p>

      <fieldset className="mt-6" disabled={running}>
        <legend className="sr-only">Sample statement outcome</legend>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
          {(
            [
              ["match", "Totals match"],
              ["mismatch", "Totals don't match"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium text-muted-foreground transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                scenario === value && "bg-background text-foreground shadow-sm",
                running && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type="radio"
                name="scenario"
                value={value}
                checked={scenario === value}
                onChange={() => chooseScenario(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b border-border/60 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Sample statement.pdf</p>
            <p className="text-xs text-muted-foreground">September · sample figures</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Printed total</p>
            <p className="text-sm font-semibold tabular-nums">{formatAed(printedTotal)}</p>
          </div>
        </div>

        <ul>
          {rows.map((row, index) => {
            const read = index < shown;
            return (
              <li
                key={row.name}
                className={cn(
                  "flex items-center gap-3 border-b border-border/40 px-4 py-2.5 transition-colors duration-300 last:border-b-0 motion-reduce:transition-none",
                  read && "bg-primary/5",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    read ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent",
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{row.date}</p>
                </div>
                <span className="text-sm tabular-nums">{read ? formatAed(readCents(row, scenario)) : "—"}</span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Read on your phone</span>
          <span className="font-semibold tabular-nums">{formatAed(readTotal)}</span>
        </div>
      </div>

      <div role="status" aria-live="polite" className="mt-4 min-h-[96px]">
        {phase === "checking" && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 animate-pulse text-primary" aria-hidden="true" />
            Comparing with the printed total…
          </p>
        )}
        {phase === "done" && matches && (
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <p className="flex items-center gap-2 font-semibold text-primary">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              Totals match. Statement added.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Read and checked on your phone. Now you can explore your spending.
            </p>
            <Button variant="ghost" size="sm" onClick={() => openApp("features")} className="-ml-2 mt-2 text-primary">
              Explore your spending
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        )}
        {phase === "done" && !matches && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
              <CircleAlert className="h-4 w-4" aria-hidden="true" />
              Totals don't match. Statement not added.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Maliya only adds a statement after its figures reconcile with the printed totals.
            </p>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={running} className="h-11 rounded-full px-6 font-semibold">
          {phase === "done" ? (
            <>
              <RotateCcw aria-hidden="true" />
              Run it again
            </>
          ) : (
            "Run the check"
          )}
        </Button>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Sample figures for illustration. Nothing is uploaded here. In the app, supported PDFs are read on your phone.
      </p>
    </div>
  );
}
