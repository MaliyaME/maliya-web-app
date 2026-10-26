import { useEffect, type RefObject } from "react";

// Lets a mouse pan a scroll area the way a finger would, with momentum, and swallows the click that ends a drag.
export function useDragScroll(ref: RefObject<HTMLElement>, scale: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pointer = -1;
    let sx = 0;
    let sy = 0;
    let top0 = 0;
    let left0 = 0;
    let moved = false;
    let horizontal: HTMLElement | null = null;
    let axis: "x" | "y" | null = null;
    let lastY = 0;
    let lastT = 0;
    let velocity = 0;
    let frame = 0;

    const stop = () => cancelAnimationFrame(frame);

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [data-no-drag]")) return;
      stop();
      pointer = e.pointerId;
      sx = e.clientX;
      sy = e.clientY;
      top0 = el.scrollTop;
      horizontal = target.closest<HTMLElement>("[data-hscroll]");
      left0 = horizontal?.scrollLeft ?? 0;
      moved = false;
      axis = null;
      lastY = e.clientY;
      lastT = performance.now();
      velocity = 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (!moved) {
        if (Math.hypot(dx, dy) < 6) return;
        moved = true;
        axis = horizontal && Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        el.setPointerCapture(e.pointerId);
      }
      if (axis === "x" && horizontal) {
        horizontal.scrollLeft = left0 - dx / scale;
      } else {
        el.scrollTop = top0 - dy / scale;
        const now = performance.now();
        const dt = Math.max(1, now - lastT);
        velocity = (-(e.clientY - lastY) / scale / dt) * 0.8 + velocity * 0.2;
        lastY = e.clientY;
        lastT = now;
      }
    };

    const up = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      if (!moved) return;
      const swallow = (event: Event) => event.stopPropagation();
      el.addEventListener("click", swallow, { capture: true, once: true });
      window.setTimeout(() => el.removeEventListener("click", swallow, { capture: true }), 60);
      if (axis !== "y" || Math.abs(velocity) < 0.05) return;
      let last = performance.now();
      const glide = (now: number) => {
        const dt = now - last;
        last = now;
        el.scrollTop += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16);
        if (Math.abs(velocity) > 0.02) frame = requestAnimationFrame(glide);
      };
      frame = requestAnimationFrame(glide);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", stop, { passive: true });
    return () => {
      stop();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", stop);
    };
  }, [ref, scale]);
}
