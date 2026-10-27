import { ChevronLeft, Settings2 } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useSim } from "../context";
import { useStackNav } from "./Stack";
import { useDragScroll } from "./useDragScroll";

export function Header({
  back,
  title,
  right,
  hideSettings,
  inScroll = false,
}: {
  back?: string;
  title?: ReactNode;
  right?: ReactNode;
  hideSettings?: boolean;
  inScroll?: boolean;
}) {
  const { inset, openSheet } = useSim();
  const nav = useStackNav();
  return (
    <header style={{ paddingTop: inScroll ? 0 : inset.top }} className="shrink-0 bg-sim-bg">
      <div className="mx-5 flex h-[55.5px] items-center justify-between border-b border-sim-line">
        <div className="flex min-w-0 items-center">
          {back !== undefined && (
            <button
              type="button"
              onClick={nav.back}
              className="sim-hit -ml-[3.7px] flex h-10 items-center gap-[7px] rounded-lg pl-1 pr-2.5 text-[13.1px] text-sim-muted [--hit-x:4px] [--hit-y:2px] outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press"
            >
              <ChevronLeft className="h-[20px] w-[20px] text-sim-ink/80" strokeWidth={1.6} aria-hidden="true" />
              {back}
            </button>
          )}
          {title}
        </div>
        <div className="-mr-[9.7px] flex items-center gap-[10px]">
          {right}
          {!hideSettings && (
            <button
              type="button"
              aria-label="Settings"
              onClick={() => openSheet({ kind: "settings" })}
              className="sim-hit flex h-10 w-10 items-center justify-center rounded-full text-sim-ink outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:bg-sim-press [--hit-x:2px] [--hit-y:2px]"
            >
              <Settings2 className="h-[24px] w-[24px]" strokeWidth={1.4} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Screen({ header, children, scrollHeader = false }: { header: ReactNode; children: ReactNode; scrollHeader?: boolean }) {
  const { scale, inset } = useSim();
  const ref = useRef<HTMLDivElement>(null);
  useDragScroll(ref, scale);
  return (
    <div className="absolute inset-0 flex flex-col bg-sim-bg" style={scrollHeader ? { paddingTop: inset.top } : undefined}>
      {!scrollHeader && header}
      <div ref={ref} tabIndex={0} role="region" aria-label="Screen content" className="sim-scroll min-h-0 flex-1 select-none overflow-y-auto overscroll-contain outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sim-brand">
        {scrollHeader && header}
        {children}
        <div className="h-8" />
      </div>
    </div>
  );
}
