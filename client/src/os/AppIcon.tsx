import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconSpec =
  | { kind: "image"; src: string }
  | { kind: "glyph"; Icon: LucideIcon; from: string; to: string };

export function AppIcon({ spec, className }: { spec: IconSpec; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block aspect-square overflow-hidden rounded-[22.5%] shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {spec.kind === "image" ? (
        <img src={spec.src} alt="" draggable={false} className="h-full w-full object-cover" />
      ) : (
        <>
          <span
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${spec.from} 0%, ${spec.to} 100%)` }}
          />
          <span className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/25 to-transparent" />
          <spec.Icon className="absolute inset-0 m-auto h-[56%] w-[56%] text-white drop-shadow-sm" strokeWidth={1.75} />
        </>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
    </span>
  );
}
