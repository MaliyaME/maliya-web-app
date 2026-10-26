import { useRef } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppIcon, type IconSpec } from "../AppIcon";
import { APPS, DOCK_ORDER } from "../apps";
import { contact } from "../content";
import { useMediaQuery } from "../hooks";
import type { AppId } from "../types";

const BASE_SIZE = 54;
const MAX_SIZE = 86;
const REACH = 150;

const mailIcon: IconSpec = { kind: "glyph", Icon: Mail, from: "#5ccbff", to: "#1f86e6" };

interface DockItemProps {
  label: string;
  icon: IconSpec;
  mouseX: MotionValue<number>;
  magnify: boolean;
  running?: boolean;
  onClick?: () => void;
  href?: string;
}

function DockItem({ label, icon, mouseX, magnify, running = false, onClick, href }: DockItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const bounce = useAnimationControls();
  const distance = useTransform(mouseX, (value) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? value - box.x - box.width / 2 : Infinity;
  });
  const targetSize = useTransform(distance, [-REACH, 0, REACH], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 170, damping: 14 });

  const visual = (
    <motion.span
      animate={bounce}
      style={magnify ? { width: size, height: size } : { width: BASE_SIZE, height: BASE_SIZE }}
      className="block"
    >
      <AppIcon spec={icon} className="h-full w-full" />
    </motion.span>
  );

  const focusRing =
    "rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-white/80 block";

  return (
    <li ref={ref} className="group relative flex flex-col items-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/85 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
      >
        {label}
      </span>
      {href ? (
        <a href={href} aria-label={label} className={focusRing}>
          {visual}
        </a>
      ) : (
        <button
          type="button"
          aria-label={running ? `${label} (open)` : label}
          onClick={() => {
            if (!running) {
              bounce.start({ y: [0, -22, 0, -10, 0], transition: { duration: 0.8, ease: "easeOut" } });
            }
            onClick?.();
          }}
          className={focusRing}
        >
          {visual}
        </button>
      )}
      <span
        aria-hidden="true"
        className={cn("mt-[3px] h-1 w-1 rounded-full", running ? "bg-neutral-900/80 dark:bg-white/85" : "bg-transparent")}
      />
    </li>
  );
}

export function Dock({ openIds, onLaunch }: { openIds: Set<AppId>; onLaunch: (id: AppId) => void }) {
  const mouseX = useMotionValue(Infinity);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotion();
  const magnify = canHover && !reduceMotion;

  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-2 z-[800] flex justify-center">
      <motion.ul
        onMouseMove={magnify ? (event) => mouseX.set(event.clientX) : undefined}
        onMouseLeave={magnify ? () => mouseX.set(Infinity) : undefined}
        className="pointer-events-auto flex items-end gap-1.5 rounded-[22px] bg-[rgba(40,40,44,0.32)] px-[7px] pb-[3px] pt-[7px] shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/25 backdrop-blur-2xl"
      >
        {DOCK_ORDER.map((id) => (
          <DockItem
            key={id}
            label={APPS[id].title}
            icon={APPS[id].icon}
            mouseX={mouseX}
            magnify={magnify}
            running={openIds.has(id)}
            onClick={() => onLaunch(id)}
          />
        ))}
        <li aria-hidden="true" className="mx-[3px] mb-[9px] w-px self-stretch bg-white/25" />
        <DockItem
          label="Email Maliya"
          icon={mailIcon}
          mouseX={mouseX}
          magnify={magnify}
          href={`mailto:${contact.general}`}
        />
      </motion.ul>
    </nav>
  );
}
