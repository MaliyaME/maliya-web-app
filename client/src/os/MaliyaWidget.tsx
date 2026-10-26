import { cn } from "@/lib/utils";

const numeralFont = 'ui-serif, "New York", "Iowan Old Style", "Source Serif 4", Georgia, serif';

// Mirrors the demo month shown in the app's Home screen.
export function MaliyaWidget({ onOpen, className }: { onOpen: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "block w-full rounded-[26px] bg-[#0b0e0d]/80 p-4 text-left text-[#f8f6ef] shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-2xl transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        className,
      )}
    >
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <img src="/app_icon.png" alt="" className="h-5 w-5 rounded-[6px]" />
          September 2026
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-[#bdd5c4]">Demo data</span>
      </span>
      <span className="mt-3 block text-[13px] text-[#f8f6ef]/70">Total spent · AED</span>
      <span className="block text-[46px] leading-none tracking-tight" style={{ fontFamily: numeralFont }}>
        23,431
      </span>
      <span className="mt-2 block text-[13px] leading-snug text-[#f8f6ef]/85">Close to your usual month — 844 above.</span>
      <span className="mt-4 flex items-baseline justify-between">
        <span className="text-[12px] text-[#f8f6ef]/70">
          Spending wellness <span className="font-semibold text-[#a4d5c3]">Steady</span>
        </span>
        <span className="text-[#a4d5c3]">
          <span className="text-lg font-semibold">80</span>
          <span className="text-[11px] opacity-80">/100</span>
        </span>
      </span>
      <span className="sr-only">Open features</span>
      <span className="mt-2 flex gap-[3px]" aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} className={cn("h-1.5 flex-1 rounded-full", index < 16 ? "bg-[#a4d5c3]" : "bg-white/15")} />
        ))}
      </span>
    </button>
  );
}
