import { BatteryFull, Moon, Sun, Wifi } from "lucide-react";
import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { formatMenuClock } from "../format";
import { useNow } from "../hooks";
import { useOS } from "../OSContext";
import { MENU_BAR_HEIGHT } from "../types";

const itemClass = "rounded-md px-2.5 py-1.5 text-[13px] focus:bg-white/15 focus:text-white";

export function MenuBar({ activeTitle }: { activeTitle: string | null }) {
  const title = activeTitle ?? "Maliya";
  const { openApp, lock } = useOS();
  const { isDark, toggleTheme } = useTheme();
  const [, navigate] = useLocation();
  const now = useNow();
  const themeLabel = isDark ? "Use light mode" : "Use dark mode";

  return (
    <header
      className="absolute inset-x-0 top-0 z-[900] flex items-center justify-between bg-neutral-900/60 px-3 text-[13px] font-medium text-white backdrop-blur-2xl"
      style={{ height: MENU_BAR_HEIGHT }}
    >
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`${title} menu`}
            className="flex h-6 items-center gap-2 rounded px-1.5 outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 data-[state=open]:bg-white/15"
          >
            <img src="/app_icon.png" alt="" className="h-4 w-4 rounded-[4px]" />
            <span className="font-bold tracking-tight">{title}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={2}
            className="min-w-[210px] rounded-xl border-white/15 bg-neutral-900/80 p-1.5 text-white shadow-2xl backdrop-blur-2xl"
          >
            <DropdownMenuItem className={itemClass} onSelect={() => openApp("welcome")}>
              About Maliya
            </DropdownMenuItem>
            <DropdownMenuItem className={itemClass} onSelect={() => openApp("get")}>
              Get the App…
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/15" />
            <DropdownMenuItem className={itemClass} onSelect={() => navigate("/privacy")}>
              Privacy Policy
            </DropdownMenuItem>
            <DropdownMenuItem className={itemClass} onSelect={() => navigate("/terms")}>
              Terms of Service
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/15" />
            <DropdownMenuItem className={itemClass} onSelect={toggleTheme}>
              {isDark ? "Light appearance" : "Dark appearance"}
            </DropdownMenuItem>
            <DropdownMenuItem className={itemClass} onSelect={lock}>
              Lock Screen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3.5 tabular-nums">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
          className="flex h-6 w-6 items-center justify-center rounded outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {isDark ? <Sun className="h-3.5 w-3.5" aria-hidden="true" /> : <Moon className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
        <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
        <BatteryFull className="h-4 w-4" aria-hidden="true" />
        <time dateTime={now.toISOString()}>{formatMenuClock(now)}</time>
      </div>
    </header>
  );
}
