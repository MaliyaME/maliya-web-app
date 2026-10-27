import { animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSim } from "../context";
import { CATEGORIES, SMALLER_ICON, toneFor } from "../data/catalog";
import type { CategoryId } from "../data/types";

export function Counter({ value, format, from, duration = 0.9 }: { value: number; format: (n: number) => string; from?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(from ?? value);
  const current = useRef(from ?? value);

  useEffect(() => {
    if (reduce) {
      current.current = value;
      setShown(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        current.current = v;
        setShown(v);
      },
    });
    return () => controls.stop();
  }, [value, duration, reduce]);

  return <>{format(shown)}</>;
}

export function CategoryTile({ cat, size = 40 }: { cat: CategoryId | "smaller"; size?: number }) {
  const { dark } = useSim();
  const tone = toneFor(cat, dark);
  const Icon = cat === "smaller" ? SMALLER_ICON : CATEGORIES[cat].icon;
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: tone.bg, color: tone.fg }}
      className="flex shrink-0 items-center justify-center rounded-[12px]"
    >
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.5} />
    </span>
  );
}

export function Segments({ filled, total = 20 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-[5px]" role="img" aria-label={`${filled} of ${total} segments`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${i * 22}ms` }}
          className={cn("h-[7.7px] flex-1 rounded-[3px] transition-colors duration-300", i < filled ? "bg-sim-good" : "bg-sim-track")}
        />
      ))}
    </div>
  );
}

export function GreenLink({ children, onClick, className }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("sim-hit inline-flex items-center gap-[9px] rounded-md text-left text-[14.7px] font-medium leading-5 text-sim-brand outline-none focus-visible:ring-2 focus-visible:ring-sim-brand active:opacity-60", className)}
    >
      {children}
      <ArrowRight className="h-[15px] w-[15px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}

export function PressRow({ children, onClick, label, className }: { children: ReactNode; onClick: () => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn("flex w-full items-center text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sim-brand active:bg-sim-press", className)}
    >
      {children}
    </button>
  );
}

export function Chevron() {
  return <ChevronRight className="h-[16px] w-[16px] shrink-0 text-sim-muted" strokeWidth={1.6} aria-hidden="true" />;
}

export const Hairline = ({ className }: { className?: string }) => <div className={cn("h-px bg-sim-line", className)} />;

export function Bar({ share, color, delay = 0, thin = false }: { share: number; color: string; delay?: number; thin?: boolean }) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={cn("overflow-hidden rounded-full bg-sim-track", thin ? "h-[3px]" : "h-[4px]")}>
      <div
        style={{ width: grown ? `${Math.max(1.5, share * 100)}%` : "0%", background: color, transitionDelay: `${delay}ms` }}
        className="h-full rounded-full transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
      />
    </div>
  );
}
