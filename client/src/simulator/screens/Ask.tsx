import { ArrowUp, Check, ChevronDown, PieChart, Repeat, ScanLine } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { answer, helpAnswer, STARTERS, type Answer } from "../data/ask";
import { monthLabel } from "../data/catalog";
import { aed2 } from "../data/format";
import { GreenLink } from "../ui/atoms";
import { Header } from "../ui/Header";

const CHIP_ICONS = [PieChart, ScanLine, Repeat];

function Thinking() {
  return (
    <div className="flex items-center gap-1.5 py-3" role="status" aria-label="Working it out">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-2 w-2 rounded-full bg-sim-faint" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

function AnswerView({ a, onAsk }: { a: Answer; onAsk: (question: string) => void }) {
  const { push } = useSim();
  return (
    <div>
      {a.kind !== "help" && (
        <p className="flex h-[30px] items-center gap-[10.7px] text-[11.7px] text-sim-muted">
          <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#f1ecf7] text-[#6f5193] dark:bg-[#2d2739] dark:text-[#cfb7ed]">
            <PieChart className="h-[15px] w-[15px]" strokeWidth={1.4} />
          </span>
          Calculated · {monthLabel(a.month)}
        </p>
      )}
      {a.headline && <p className="mt-[18.2px] text-[58px] font-bold leading-[58px] tracking-[-0.02em]">{a.headline}</p>}
      <h2 className={cn("font-semibold", a.headline ? "mt-[19.7px] text-[20px] leading-[26px]" : "mt-1 text-[20px] leading-[26px]")}>{a.title}</h2>
      <p className="mt-[13.1px] text-[14.75px] leading-6 text-sim-muted">{a.body}</p>
      {a.check && (
        <p className="mt-[11.7px] flex items-start gap-[6px] text-[11.75px] leading-[17px] text-sim-muted">
          <Check className="mt-px h-[15px] w-[15px] shrink-0 text-sim-good" strokeWidth={1.8} aria-hidden="true" />
          {a.check}
        </p>
      )}
      {a.rows && (
        <ul className="mt-5 divide-y divide-sim-line rounded-[18px] border border-sim-border bg-sim-surface">
          {a.rows.map((r) => (
            <li key={r.purchaseId}>
              <button type="button" onClick={() => push({ name: "purchase", id: r.purchaseId })} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sim-brand active:bg-sim-press">
                <span className="min-w-0">
                  <span className="block truncate text-[14.7px]">{r.title}</span>
                  <span className="mt-0.5 block truncate text-[11.75px] text-sim-muted">{r.note}</span>
                </span>
                <span className="text-[14.7px] tabular-nums">AED {aed2(r.cents)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {a.extra && (
        <button type="button" onClick={() => push({ name: "purchase", id: a.extra!.purchaseId })} className="mt-4 block text-left text-[12.7px] leading-5 text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand">
          {a.extra.text}
        </button>
      )}
      {a.link && (
        <div className="mt-[21.6px]">
          <GreenLink onClick={() => push(a.link!.route)} className="text-[14.5px]">{a.link.label}</GreenLink>
        </div>
      )}
      <p className="mt-[28px] text-[11.75px] leading-4 text-sim-muted">{a.kind === "help" ? "Try asking" : "Ask next"}</p>
      <div className="mt-[10.5px] flex flex-col items-start gap-[10px]">
        {a.next.map((question, i) => {
          const Icon = CHIP_ICONS[STARTERS.indexOf(question)] ?? PieChart;
          return (
            <button key={question} type="button" onClick={() => onAsk(question)} className="flex h-[43px] items-center gap-[9px] rounded-full bg-sim-bubble pl-[15.3px] pr-[15.4px] text-left text-[13.8px] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-sim-brand active:scale-[0.98]">
              <Icon className={cn("h-[15px] w-[15px] shrink-0", i % 2 ? "text-[#a35f2f]" : "text-[#994b2d]")} strokeWidth={1.4} aria-hidden="true" />
              {question}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Ask() {
  const { state, dispatch, ledger, openSheet } = useSim();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const counter = useRef(0);

  const submit = (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setText("");
    setBusy(true);
    const id = ++counter.current;
    dispatch({ type: "askAdd", entry: { id, question: q, answer: helpAnswer(state.askMonth) } });
    timer.current = window.setTimeout(() => {
      dispatch({ type: "askReplace", id, answer: answer(ledger, q, state.askMonth) });
      setBusy(false);
    }, 650);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (state.pendingAsk) {
      const q = state.pendingAsk;
      dispatch({ type: "askPending", question: null });
      submit(q);
    }
  }, [state.pendingAsk]);

  useEffect(() => {
    const box = scroller.current;
    const last = box?.querySelector<HTMLElement>("[data-entry]:last-of-type");
    if (!box || !last) return;
    box.scrollTo({ top: Math.max(0, last.offsetTop - 12), behavior: "smooth" });
  }, [state.ask.length]);

  const empty = state.ask.length === 0;

  return (
    <div className="absolute inset-0 flex flex-col bg-sim-bg">
      <Header
        title={<span className="text-[12.5px] font-medium uppercase tracking-[0.1em] text-sim-muted">Ask Maliya</span>}
        right={
          <button type="button" onClick={() => dispatch({ type: "askClear" })} className="sim-hit mr-[4.7px] rounded-md px-1 py-2 text-[12.6px] [--hit-x:8px] [--hit-y:2px] font-medium text-sim-brand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">
            Start over
          </button>
        }
      />
      <div ref={scroller} className="sim-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-[24.9px]">
        {empty ? (
          <div className="pt-[6px]">
            <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-sim-pill text-sim-brand">
              <PieChart className="h-[15px] w-[15px]" strokeWidth={1.4} />
            </span>
            <h1 className="mt-[18px] text-[20px] font-semibold leading-[26px]">Ask about a month, category, repeat charge or unusual purchase.</h1>
            <p className="mt-[12px] text-[14.75px] leading-6 text-sim-muted">Every answer shows the purchases behind it, and suggests what to ask next.</p>
            <p className="mt-[28px] text-[11.75px] leading-4 text-sim-muted">Try asking</p>
            <div className="mt-[10.5px] flex flex-col items-start gap-[9px]">
              {STARTERS.map((question, i) => {
                const Icon = CHIP_ICONS[i];
                return (
                  <button key={question} type="button" onClick={() => submit(question)} className="flex h-[43px] items-center gap-[9px] rounded-full bg-sim-bubble pl-[15.3px] pr-[15.4px] text-left text-[13.8px] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-sim-brand active:scale-[0.98]">
                    <Icon className="h-[15px] w-[15px] shrink-0 text-[#994b2d]" strokeWidth={1.4} aria-hidden="true" />
                    {question}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div role="log" aria-live="polite" className="flex flex-col gap-9">
            <AnimatePresence initial={false}>
              {state.ask.map((entry, i) => {
                const pending = busy && i === state.ask.length - 1;
                return (
                  <motion.div key={entry.id} data-entry initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="flex justify-end">
                      <p className="max-w-[85%] rounded-[18px] bg-sim-bubble px-[16.7px] py-[12.3px] text-[14.75px] leading-5">{entry.question}</p>
                    </div>
                    <div className="mt-[21px]">{pending ? <Thinking /> : <AnswerView a={entry.answer} onAsk={submit} />}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-sim-line bg-sim-bg px-5 pb-[8.4px] pt-[11px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(text);
          }}
          className="flex h-[60.6px] items-center rounded-full border border-sim-border bg-sim-surface pl-[18.7px] pr-[12.3px] focus-within:border-sim-brand"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-label="Ask about a month, category or charge"
            placeholder="Ask about a month, category or charge"
            enterKeyHint="send"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-sim-faint"
          />
          <button type="submit" aria-label="Send" disabled={!text.trim() || busy} className={cn("flex h-[33.7px] w-[33.7px] shrink-0 items-center justify-center rounded-full text-sim-onbrand outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sim-brand focus-visible:ring-offset-2 focus-visible:ring-offset-sim-surface", text.trim() && !busy ? "bg-sim-brand" : "bg-sim-brand/45")}>
            <ArrowUp className="h-[17px] w-[17px]" strokeWidth={1.9} aria-hidden="true" />
          </button>
        </form>
        <button type="button" onClick={() => openSheet({ kind: "askMonth" })} className="sim-hit mt-[20.5px] flex items-center gap-1.5 rounded-md text-[11.8px] leading-4 text-sim-muted outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60">
          Answers cover <span className="font-medium text-sim-ink">{monthLabel(state.askMonth)}</span>
          <ChevronDown className="h-[14px] w-[14px] text-sim-ink" strokeWidth={1.6} aria-hidden="true" />
        </button>
        <p className="mt-[8.1px] text-[11.7px] leading-4 text-sim-muted">Calculated on this device. No external AI.</p>
      </div>
    </div>
  );
}
