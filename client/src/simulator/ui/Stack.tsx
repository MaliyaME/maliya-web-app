import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import type { Route } from "../data/types";
import { useSim } from "../context";

const IOS_EASE = [0.32, 0.72, 0, 1] as const;
const PARALLAX = "-28%";

interface StackNav {
  back: () => void;
  canGoBack: boolean;
}

const StackNavContext = createContext<StackNav>({ back: () => {}, canGoBack: false });
export const useStackNav = () => useContext(StackNavContext);

function Layer({ role, name, p, children }: { role: "top" | "below" | "hidden"; name: string; p: MotionValue<number>; children: ReactNode }) {
  const topX = useTransform(p, [0, 1], ["0%", "100%"]);
  const belowX = useTransform(p, [0, 1], [PARALLAX, "0%"]);
  const dim = useTransform(p, [0, 1], [0.12, 0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.toggleAttribute("inert", role !== "top");
  }, [role]);

  return (
    <motion.div
      ref={ref}
      data-route={name}
      data-top={role === "top"}
      tabIndex={role === "top" ? -1 : undefined}
      aria-hidden={role !== "top"}
      style={{ x: role === "top" ? topX : role === "below" ? belowX : PARALLAX, visibility: role === "hidden" ? "hidden" : undefined }}
      className="absolute inset-0 overflow-hidden bg-sim-bg outline-none"
    >
      {children}
      {role === "below" && <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />}
      {role === "top" && <div className="pointer-events-none absolute inset-y-0 -left-5 w-5 bg-gradient-to-r from-transparent to-black/10" />}
    </motion.div>
  );
}

export function Stack({
  routes,
  onPop,
  renderRoute,
}: {
  routes: Route[];
  onPop: () => void;
  renderRoute: (route: Route) => ReactNode;
}) {
  const { scale } = useSim();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const previous = useRef(routes.length);
  const busy = useRef(false);
  const drag = useRef<{ x: number; t: number; v: number } | null>(null);

  useLayoutEffect(() => {
    if (routes.length > previous.current) {
      if (reduce) p.set(0);
      else {
        p.set(1);
        animate(p, 0, { duration: 0.42, ease: IOS_EASE });
      }
    } else if (routes.length < previous.current) {
      p.set(0);
      busy.current = false;
    }
    previous.current = routes.length;
  }, [routes.length, reduce, p]);

  // After a screen is pushed or popped, move focus onto the new top screen so keyboard and screen reader users keep their place.
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    const top = box.current?.querySelector<HTMLElement>('[data-top="true"]');
    const active = document.activeElement;
    if (top && (!active || active === document.body || !active.isConnected || active.closest("[inert]"))) {
      top.focus({ preventScroll: true });
    }
  }, [routes.length]);

  const finishPop = useCallback(
    (from: number) => {
      busy.current = true;
      if (reduce) return onPop();
      animate(p, 1, { duration: 0.14 + (1 - from) * 0.3, ease: IOS_EASE, onComplete: onPop });
    },
    [onPop, p, reduce],
  );

  const back = useCallback(() => {
    if (busy.current || routes.length < 2) return;
    finishPop(0);
  }, [finishPop, routes.length]);

  const width = () => (box.current?.getBoundingClientRect().width ?? 393 * scale) / scale;

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (busy.current || routes.length < 2) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, t: performance.now(), v: 0 };
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const fraction = Math.min(1, Math.max(0, (e.clientX - d.x) / scale / width()));
    const now = performance.now();
    d.v = (fraction - p.get()) / Math.max(1, now - d.t);
    d.t = now;
    p.set(fraction);
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const progress = p.get();
    if (progress > 0.35 || d.v > 0.0012) finishPop(progress);
    else animate(p, 0, { duration: 0.28, ease: IOS_EASE });
  };

  return (
    <StackNavContext.Provider value={{ back, canGoBack: routes.length > 1 }}>
      <div ref={box} className="absolute inset-0 overflow-hidden">
        {routes.map((route, index) => (
          <Layer key={`${index}:${JSON.stringify(route)}`} name={route.name} role={index === routes.length - 1 ? "top" : index === routes.length - 2 ? "below" : "hidden"} p={p}>
            {renderRoute(route)}
          </Layer>
        ))}
        {routes.length > 1 && (
          <div
            data-no-drag
            aria-hidden="true"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="absolute inset-y-0 left-0 z-20 w-[18px] touch-none"
          />
        )}
      </div>
    </StackNavContext.Provider>
  );
}
