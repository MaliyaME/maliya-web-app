import { cn } from "@/lib/utils";

const grain = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

const lockBackground = [
  "radial-gradient(70% 55% at 85% 92%, rgba(24,140,108,0.50) 0%, rgba(24,140,108,0) 70%)",
  "radial-gradient(60% 45% at 5% 0%, rgba(0,91,70,0.50) 0%, rgba(0,91,70,0) 70%)",
  "linear-gradient(175deg, #02281f 0%, #003d2f 38%, #012219 72%, #06130e 100%)",
].join(", ");

const desktopLight = [
  "radial-gradient(60% 60% at 12% 8%, rgba(189,213,196,0.95) 0%, rgba(189,213,196,0) 62%)",
  "radial-gradient(55% 55% at 92% 92%, rgba(0,91,70,0.30) 0%, rgba(0,91,70,0) 66%)",
  "linear-gradient(155deg, #faf8f1 0%, #e6eee4 52%, #cadccf 100%)",
].join(", ");

const desktopDark = [
  "radial-gradient(60% 55% at 85% 95%, rgba(24,140,108,0.40) 0%, rgba(24,140,108,0) 70%)",
  "radial-gradient(50% 45% at 8% 5%, rgba(0,91,70,0.38) 0%, rgba(0,91,70,0) 70%)",
  "linear-gradient(165deg, #06140f 0%, #0a1f18 55%, #0b0e0d 100%)",
].join(", ");

function Rings({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMaxYMax slice"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {[190, 340, 510, 700, 910, 1140].map((radius, index) => (
        <circle key={radius} cx="1480" cy="760" r={radius} strokeWidth="1.25" strokeOpacity={0.95 - index * 0.13} />
      ))}
    </svg>
  );
}

export function Wallpaper({ variant, paused = false }: { variant: "lock" | "desktop"; paused?: boolean }) {
  if (variant === "lock") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#02281f]" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: lockBackground }} />
        <Rings className="text-[#bdd5c4]/[0.17]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: grain }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 dark:hidden" style={{ background: desktopLight }} />
      <div className="absolute inset-0 hidden dark:block" style={{ background: desktopDark }} />
      <div className={cn("os-breathe absolute -bottom-[30vmax] -right-[18vmax] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(0,91,70,0.26),transparent)] dark:bg-[radial-gradient(closest-side,rgba(24,140,108,0.30),transparent)]", paused && "os-paused")} />
      <Rings className="text-[#005b46]/[0.15] dark:text-[#bdd5c4]/[0.14]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: grain }} />
    </div>
  );
}
