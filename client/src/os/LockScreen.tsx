import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppIcon";
import { formatLockDate, formatLockTime } from "./format";
import { useMediaQuery, useNow } from "./hooks";
import type { AppId } from "./types";
import { Wallpaper } from "./Wallpaper";

interface LockNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  opens: AppId;
}

const notifications: LockNotification[] = [
  {
    id: "get",
    title: "Maliya is free on the App Store",
    body: "Add your credit card statements and see where your money went. No bank login. No account.",
    time: "now",
    opens: "get",
  },
  {
    id: "try",
    title: "Try Maliya right here",
    body: "Explore a sample month in a working copy of the app. Nothing is saved or sent.",
    time: "2m ago",
    opens: "simulator",
  },
  {
    id: "private",
    title: "Stays on your phone",
    body: "No bank login. No account. No cloud sync. Tap to see what is shared, and when.",
    time: "5m ago",
    opens: "security",
  },
];

const appIcon = { kind: "image", src: "/app_icon.png" } as const;

export function LockScreen({ onUnlock }: { onUnlock: (open?: AppId) => void }) {
  const now = useNow();
  const reduceMotion = useReducedMotion();
  const dragged = useRef(false);
  const unlocked = useRef(false);
  const onUnlockRef = useRef(onUnlock);
  onUnlockRef.current = onUnlock;

  // Fewer notifications and a smaller clock keep the unlock hint on screen on short phones.
  const short = useMediaQuery("(max-height: 450px)");
  const medium = useMediaQuery("(min-height: 600px)");
  const tall = useMediaQuery("(min-height: 660px)");
  const roomy = useMediaQuery("(min-height: 760px) and (min-width: 640px)");
  const visibleNotifications = notifications.slice(0, tall ? 3 : medium ? 2 : 1);
  const clockSize = roomy ? "text-[112px]" : short ? "text-[56px]" : medium ? "text-[88px]" : "text-[72px]";

  const unlock = (open?: AppId) => {
    if (unlocked.current) return;
    unlocked.current = true;
    onUnlockRef.current(open);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("button, a, [role='button']")) return;
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowUp") {
        event.preventDefault();
        unlock();
      }
    };
    let wheelDistance = 0;
    const onWheel = (event: WheelEvent) => {
      wheelDistance += Math.abs(event.deltaY);
      if (wheelDistance > 120) unlock();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <motion.section
      aria-label="Lock screen"
      className="fixed inset-0 z-[2000] touch-none select-none overflow-hidden text-white"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 1, bottom: 0.08 }}
      dragMomentum={false}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -110 || info.velocity.y < -500) unlock();
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }}
      exit={{
        y: "-100%",
        opacity: 0.6,
        transition: { duration: reduceMotion ? 0.15 : 0.5, ease: [0.32, 0.72, 0, 1] },
      }}
    >
      <Wallpaper variant="lock" />

      <div className="relative z-10 flex h-dvh flex-col items-center">
        <div className={cn("flex flex-col items-center text-center", short ? "mt-3" : "mt-[9dvh]")}>
          {!short && <Lock className="mb-3 h-4 w-4 opacity-80" aria-hidden="true" />}
          <p className="text-lg font-medium drop-shadow-sm">{formatLockDate(now)}</p>
          <p className={cn(clockSize, "mt-1 font-semibold leading-none tracking-tight tabular-nums drop-shadow-md")}>
            {formatLockTime(now)}
          </p>
        </div>

        <ul className={cn("mt-auto flex w-full max-w-[400px] flex-col gap-2 px-3", short ? "mb-2" : "mb-4")}>
          {visibleNotifications.map((notification, index) => (
            <motion.li
              key={notification.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.35, type: "spring", stiffness: 260, damping: 26 }}
            >
              <button
                type="button"
                onClick={() => {
                  if (!dragged.current) unlock(notification.opens);
                }}
                className="flex w-full items-start gap-3 rounded-[22px] bg-[rgba(28,34,31,0.55)] p-3.5 text-left ring-1 ring-white/10 backdrop-blur-2xl transition-colors hover:bg-[rgba(46,56,51,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <AppIcon spec={appIcon} className="mt-0.5 h-[38px] w-[38px] shrink-0" />
                <span className="min-w-0 flex-1 text-[14px] leading-snug">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold">{notification.title}</span>
                    <span className="shrink-0 text-[12px] text-white/60">{notification.time}</span>
                  </span>
                  <span className="mt-0.5 block text-white/90">{notification.body}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => unlock()}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-medium tracking-wide text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            short ? "mb-2" : "mb-8",
          )}
        >
          <ChevronUp className="h-5 w-5 motion-safe:animate-bounce" aria-hidden="true" />
          Swipe up to unlock
        </button>
      </div>
    </motion.section>
  );
}
