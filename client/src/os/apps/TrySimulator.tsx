import { lazy, Suspense } from "react";

const Simulator = lazy(() => import("@/simulator/Simulator"));

export const preloadSimulator = () => import("@/simulator/Simulator");

export default function TrySimulator() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[320px] items-center justify-center bg-[#070b09]" role="status" aria-label="Loading the demo">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        </div>
      }
    >
      <Simulator />
    </Suspense>
  );
}
