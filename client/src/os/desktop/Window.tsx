import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { animate, motion, useDragControls, useMotionValue, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppDef } from "../apps";
import { DOCK_CLEARANCE, type WindowState } from "../types";

// AnimatePresence stops mounting new windows after a zero-duration exit, so reduced motion uses a near-instant one.
const INSTANT = 0.01;

interface WindowProps {
  app: AppDef;
  state: WindowState;
  focused: boolean;
  constraintsRef: RefObject<HTMLDivElement>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}

export function Window({
  app,
  state,
  focused,
  constraintsRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
}: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const savedOffset = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const { Component } = app;
  const titleId = `window-title-${app.id}`;
  const duration = reduceMotion ? 0 : 0.28;

  useEffect(() => {
    if (!focused || state.minimized) return;
    if (!ref.current?.contains(document.activeElement)) ref.current?.focus({ preventScroll: true });
  }, [focused, state.minimized]);

  useEffect(() => {
    if (state.maximized) {
      savedOffset.current = { x: dragX.get(), y: dragY.get() };
      animate(dragX, 0, { duration });
      animate(dragY, 0, { duration });
    } else {
      animate(dragX, savedOffset.current.x, { duration });
      animate(dragY, savedOffset.current.y, { duration });
    }
  }, [state.maximized]);

  const frame: CSSProperties = state.maximized
    ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${DOCK_CLEARANCE}px)` }
    : { left: state.x, top: state.y, width: state.width, height: state.height };

  const lights = [
    { label: `Close ${app.title}`, color: "#ff5f57", Icon: X, onClick: onClose },
    { label: `Minimize ${app.title}`, color: "#febc2e", Icon: Minus, onClick: onMinimize },
    {
      label: `${state.maximized ? "Restore" : "Zoom"} ${app.title}`,
      color: "#28c840",
      Icon: state.maximized ? Minimize2 : Maximize2,
      onClick: onToggleMaximize,
    },
  ];

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      tabIndex={-1}
      drag={!state.maximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        state.minimized
          ? { opacity: 0, scale: 0.55, transitionEnd: { visibility: "hidden" } }
          : { opacity: 1, scale: 1, visibility: "visible" }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: reduceMotion ? INSTANT : 0.15 } }}
      transition={reduceMotion ? { duration: INSTANT } : { type: "spring", stiffness: 380, damping: 32 }}
      style={{
        ...frame,
        x: dragX,
        y: dragY,
        zIndex: 10 + state.z,
        transformOrigin: state.minimized ? "50% 100%" : "50% 50%",
      }}
      onPointerDownCapture={onFocus}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-xl border bg-background text-foreground outline-none transition-[left,top,width,height] duration-300 ease-out",
        focused
          ? "border-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.38)] dark:border-white/20"
          : "border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.22)] dark:border-white/10",
      )}
    >
      <div
        onPointerDown={(event) => {
          if (!state.maximized) controls.start(event);
        }}
        onDoubleClick={onToggleMaximize}
        className="relative flex h-10 shrink-0 touch-none select-none items-center border-b border-border/60 bg-muted/80 px-2 backdrop-blur"
      >
        <div className="group flex items-center" onPointerDown={(event) => event.stopPropagation()}>
          {lights.map(({ label, color, Icon, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              onDoubleClick={(event) => event.stopPropagation()}
              style={{ "--light": color } as CSSProperties}
              className="flex h-6 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "flex h-3 w-3 items-center justify-center rounded-full ring-1 ring-black/15 transition-colors group-hover:bg-[var(--light)] group-has-[:focus-visible]:bg-[var(--light)]",
                  focused ? "bg-[var(--light)]" : "bg-neutral-400/70 dark:bg-neutral-600",
                )}
              >
                <Icon
                  className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </span>
            </button>
          ))}
        </div>
        <div
          id={titleId}
          className={cn(
            "pointer-events-none absolute inset-x-20 truncate text-center text-[13px] font-semibold",
            focused ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {app.title}
        </div>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label={`${app.title} content`}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <Component />
      </div>
    </motion.div>
  );
}
