import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { AppDef } from "../apps";

export function AppSheet({ app, onClose }: { app: AppDef; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { Component } = app;
  const titleId = `sheet-title-${app.id}`;

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      transition={reduceMotion ? { duration: 0.1 } : { type: "spring", damping: 34, stiffness: 340 }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="fixed inset-0 z-[1000] flex flex-col bg-background text-foreground outline-none"
    >
      {app.immersive ? (
        <>
          <div id={titleId} className="sr-only">
            {app.title}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <Component />
          </div>
        </>
      ) : (
        <>
          <header className="relative flex h-12 shrink-0 items-center border-b border-border/60 bg-background/90 px-1.5 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 items-center rounded-lg pl-1 pr-3 text-[15px] font-medium text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              Home
            </button>
            <div id={titleId} className="pointer-events-none absolute inset-x-20 truncate text-center text-[15px] font-semibold">
              {app.title}
            </div>
          </header>

          <div
            tabIndex={0}
            role="region"
            aria-label={`${app.title} content`}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <Component />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Go to Home Screen"
            className="flex h-8 shrink-0 items-center justify-center outline-none focus-visible:bg-muted"
          >
            <span className="h-1 w-32 rounded-full bg-foreground/30" aria-hidden="true" />
          </button>
        </>
      )}
    </motion.div>
  );
}
