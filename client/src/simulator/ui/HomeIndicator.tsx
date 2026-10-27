import { useRef } from "react";
import { useOS } from "@/os/OSContext";

// The iPhone home indicator. Swipe up to return to the phone's home screen; Enter or Space works too.
export function HomeIndicator() {
  const { closeApp } = useOS();
  const startY = useRef<number | null>(null);
  const home = () => closeApp("simulator");

  return (
    <button
      type="button"
      aria-label="Go to the home screen"
      style={{ touchAction: "none" }}
      onPointerDown={(event) => {
        startY.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        const from = startY.current;
        startY.current = null;
        if (from !== null && from - event.clientY > 32) home();
      }}
      onPointerCancel={() => {
        startY.current = null;
      }}
      onClick={(event) => {
        if (event.detail === 0) home();
      }}
      className="absolute bottom-0 left-1/2 z-[60] flex h-4 w-40 -translate-x-1/2 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-sim-brand"
    >
      <span aria-hidden="true" className="h-[5px] w-[134px] rounded-full bg-sim-ink/35" />
    </button>
  );
}
