import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SCREEN_W = 440;
export const SCREEN_H = 956;
export const BEZEL = 11;
export const FRAME_W = SCREEN_W + BEZEL * 2;
export const FRAME_H = SCREEN_H + BEZEL * 2;
export const INSET = { top: 62, bottom: 34 };

function StatusBar() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-50 h-[54px] text-sim-ink">
      <span className="absolute left-0 top-[21px] w-[162px] text-center text-[19.5px] font-semibold leading-[22px] tracking-[0.015em]">9:41</span>
      <span className="absolute right-[-2px] top-[24px] flex w-[162px] items-center justify-center gap-[6px]">
        <svg width="24" height="15" viewBox="0 0 19 12" fill="currentColor">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.9" />
          <rect x="5" y="5" width="3.2" height="7" rx="0.9" />
          <rect x="10" y="2.5" width="3.2" height="9.5" rx="0.9" />
          <rect x="15" y="0" width="3.2" height="12" rx="0.9" />
        </svg>
        <svg width="24" height="16" viewBox="0 0 17 12" fill="currentColor">
          <path d="M8.5 2.3c2.3 0 4.4.9 6 2.4.1.1.3.1.4 0l1-1a.4.4 0 0 0 0-.6A11.2 11.2 0 0 0 8.5 0C5.6 0 3 1.1 1 3.1a.4.4 0 0 0 0 .6l1 1c.1.1.3.1.4 0a8.6 8.6 0 0 1 6.1-2.4Z" />
          <path d="M8.5 6.2c1.3 0 2.5.5 3.5 1.3.1.1.3.1.4 0l1-1a.4.4 0 0 0 0-.6 7.4 7.4 0 0 0-9.8 0 .4.4 0 0 0 0 .6l1 1c.1.1.3.1.4 0 1-.8 2.2-1.3 3.5-1.3Z" />
          <path d="M8.5 10c.6 0 1.2.2 1.6.6.1.1.1.3 0 .4l-1.4 1.4a.3.3 0 0 1-.4 0L6.9 11a.3.3 0 0 1 0-.4c.4-.4 1-.6 1.6-.6Z" />
        </svg>
        <svg width="38" height="17" viewBox="0 0 28 13" fill="none">
          <rect x="0.5" y="0.5" width="23.5" height="12" rx="3.8" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="20.5" height="9" rx="2.5" fill="currentColor" />
          <path d="M25.3 4.4v4.2c.9-.3 1.5-1.2 1.5-2.1s-.6-1.8-1.5-2.1Z" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

function SideButton({ side, top, height }: { side: "left" | "right"; top: number; height: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        top,
        height,
        [side]: -3,
        background: side === "left" ? "linear-gradient(90deg,#5f5b54,#d2cdc2 50%,#8a857b)" : "linear-gradient(270deg,#5f5b54,#d2cdc2 50%,#8a857b)",
      }}
      className={cn("absolute w-[4px]", side === "left" ? "rounded-l-[2px]" : "rounded-r-[2px]")}
    />
  );
}

export function DeviceFrame({ dark, children }: { dark: boolean; children: ReactNode }) {
  return (
    <div className="relative select-none" style={{ width: FRAME_W, height: FRAME_H }}>
      <SideButton side="left" top={122} height={30} />
      <SideButton side="left" top={182} height={58} />
      <SideButton side="left" top={252} height={58} />
      <SideButton side="right" top={206} height={92} />

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[71px]"
        style={{
          background: "conic-gradient(from 215deg at 50% 50%, #8e897f, #e6e2d8 14%, #8a857b 30%, #d6d2c8 48%, #7f7a71 62%, #dcd8ce 80%, #8e897f)",
          boxShadow: "0 60px 110px -34px rgba(0,0,0,0.75), 0 28px 56px -22px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.55), inset 0 0 0 3px rgba(0,0,0,0.28)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-[4px] rounded-[67px] bg-[#09090a]" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.09)" }} />

      <div className={cn("sim absolute overflow-hidden bg-sim-bg", dark && "sim-dark")} style={{ inset: BEZEL, borderRadius: 60 }}>
        {children}
        <StatusBar />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[14px] z-50 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black">
          <span className="absolute right-[17px] top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#34456f,#070a14_70%)] ring-1 ring-white/5" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[8px] left-1/2 z-50 h-[5px] w-[148px] -translate-x-1/2 rounded-full bg-sim-ink/90" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[60]"
        style={{
          inset: BEZEL,
          borderRadius: 60,
          background: "linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.025) 30%, transparent 46%, transparent 70%, rgba(255,255,255,0.05) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}
