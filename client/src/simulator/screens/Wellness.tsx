import { ChevronDown, Repeat, ShieldCheck, Target, Waves } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { monthLabel } from "../data/catalog";
import { aed0 } from "../data/format";
import { fixedTotal, wellness } from "../data/ledger";
import { Counter, GreenLink, Segments } from "../ui/atoms";
import { Header, Screen } from "../ui/Header";

function Factor({ icon, name, score, detail, open, onToggle, first, children }: { icon: ReactNode; name: string; score: number; detail: string; open: boolean; onToggle: () => void; first?: boolean; children?: ReactNode }) {
  return (
    <li className={cn("border-sim-line", !first && "border-t")}>
      <button type="button" aria-expanded={open} onClick={onToggle} className="block w-full px-5 pb-[18.1px] pt-[24px] text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sim-brand active:bg-sim-press">
        <span className="flex h-5 items-center">
          <span aria-hidden="true" className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-sim-tile text-sim-muted">
            {icon}
          </span>
          <span className="ml-[10.7px] flex-1 text-[14.7px] leading-5">{name}</span>
          <span className="text-[15px] font-semibold tabular-nums">{score}</span>
          <ChevronDown className={cn("ml-[14px] h-[15px] w-[15px] text-sim-muted transition-transform", open && "rotate-180")} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="mt-[15px] block h-[4px] overflow-hidden rounded-full bg-sim-track">
          <span style={{ width: `${score}%` }} className="block h-full rounded-full bg-sim-brand transition-[width] duration-700 ease-out" />
        </span>
        <span className="mt-[10.9px] block text-[12.7px] leading-4 text-sim-muted">{detail}</span>
      </button>
      {open && <div className="px-5 pb-5 pt-1">{children}</div>}
    </li>
  );
}

export default function Wellness() {
  const { ledger, month, push } = useSim();
  const [open, setOpen] = useState<string | null>(null);
  const w = wellness(ledger, month);
  const fixed = fixedTotal(ledger, month);
  const toggle = (id: string) => setOpen((current) => (current === id ? null : id));
  const icon = "h-[15px] w-[15px]";

  return (
    <Screen header={<Header back={monthLabel(month)} />}>
      <div className="px-5 pt-[24.4px]">
        <h1 className="text-[20px] font-semibold leading-[26px]">Spending wellness</h1>
        <div className="mt-[22.4px] flex items-start justify-between">
          <span className="flex items-baseline gap-[10.9px]">
            <span className="font-numeral text-[70px] font-medium leading-[70px] text-sim-good">
              <Counter value={w.score} format={(n) => String(Math.round(n))} duration={0.9} from={0} />
            </span>
            <span className="text-[14.7px] leading-5 text-sim-muted">/100</span>
          </span>
          <span className="mt-[13.6px] text-right">
            <span className="block text-[20px] font-semibold leading-[26px] text-sim-good">{w.label}</span>
            <span className="mt-[6px] block text-[12.7px] leading-4 text-sim-muted">Your monthly rhythm</span>
          </span>
        </div>
        <div className="mt-[26.7px]">
          <Segments key={month} filled={Math.round(w.score / 5)} />
        </div>
        <p className="mt-[18.3px] text-[14.7px] leading-5 text-sim-muted">A guide to your rhythm, not a grade.</p>
        <p className="mt-[6.9px] text-[12.7px] leading-4 text-sim-muted">Compared with your own complete history.</p>
      </div>

      <h2 className="mt-[33px] px-5 text-[20px] font-semibold leading-[26px]">Behind your score</h2>
      <p className="mt-[10px] px-5 text-[12.7px] leading-4 text-sim-muted">Tap a factor to see what is behind it.</p>
      <ul className="mt-[8.1px]">
        <Factor
          first
          icon={<Target className={icon} strokeWidth={1.4} />}
          name="Goal alignment"
          score={w.goal.score}
          detail={`AED ${aed0(w.goal.total)} in purchases against AED ${aed0(w.goal.target)} suggested target.`}
          open={open === "goal"}
          onToggle={() => toggle("goal")}
        >
          <GreenLink onClick={() => push({ name: "purchases", title: "All purchases", subtitle: monthLabel(month), filter: { month } })}>See the purchases behind it</GreenLink>
        </Factor>
        <Factor
          icon={<Waves className={icon} strokeWidth={1.4} />}
          name="Spending stability"
          score={w.stability.score}
          detail={`Average distance from your own monthly baseline: AED ${aed0(w.stability.distance)}.`}
          open={open === "stability"}
          onToggle={() => toggle("stability")}
        >
          <GreenLink onClick={() => push({ name: "breakdown" })}>See where it went</GreenLink>
        </Factor>
        <Factor
          icon={<ShieldCheck className={icon} strokeWidth={1.4} />}
          name="Avoidable fees"
          score={w.fees.score}
          detail="AED 0 in debit fees and interest this month."
          open={open === "fees"}
          onToggle={() => toggle("fees")}
        >
          <p className="text-[12.7px] leading-[1.5] text-sim-muted">Fees and interest are left out of your purchase totals, so they show up here instead.</p>
        </Factor>
        <Factor
          icon={<Repeat className={icon} strokeWidth={1.4} />}
          name="Recurring-cost health"
          score={w.recurring.score}
          detail={`AED ${aed0(w.recurring.cents)} recurring, ${Math.round(w.recurring.share * 100)}% of purchases.`}
          open={open === "recurring"}
          onToggle={() => toggle("recurring")}
        >
          <GreenLink onClick={() => push({ name: "purchases", title: "Recurring costs", subtitle: monthLabel(month), filter: { month, ids: fixed.purchases.map((p) => p.id) } })}>
            See the {fixed.count} recurring charges
          </GreenLink>
        </Factor>
      </ul>
      <p className="mx-5 mt-2 border-t border-sim-line pt-5 text-[11.7px] leading-[1.5] text-sim-faint">
        Spending wellness is a guide, not financial advice. In the app it can follow a personal monthly goal that stays on your phone.
      </p>
    </Screen>
  );
}
