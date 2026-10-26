import { motion, useDragControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useSim } from "../context";

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const { inset } = useSim();
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.current?.focus({ preventScroll: true });
    return () => opener?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--s-scrim)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
        onClick={onClose}
      />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 flex max-h-[90%] flex-col rounded-t-[28px] bg-sim-surface text-sim-ink shadow-[0_-12px_40px_rgba(0,0,0,0.28)] outline-none"
        style={{ paddingBottom: inset.bottom + 6 }}
        initial={reduce ? { opacity: 0 } : { y: "100%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        exit={reduce ? { opacity: 0 } : { y: "100%" }}
        transition={reduce ? { duration: 0.1 } : { type: "spring", damping: 34, stiffness: 380 }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 600) onClose();
        }}
      >
        <div data-no-drag onPointerDown={(event) => controls.start(event)} className="flex h-7 shrink-0 cursor-grab touch-none items-center justify-center">
          <span className="h-1 w-10 rounded-full bg-sim-line" />
        </div>
        <div className="sim-scroll min-h-0 flex-1 overflow-y-auto px-5 pb-4">{children}</div>
      </motion.div>
    </div>
  );
}
