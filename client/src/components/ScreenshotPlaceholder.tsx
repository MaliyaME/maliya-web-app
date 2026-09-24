import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/hooks/use-theme";

interface ScreenshotPlaceholderProps {
  imageSrc?: string;
  darkImageSrc?: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export function ScreenshotPlaceholder({ imageSrc, darkImageSrc, alt, className, overlay = true }: ScreenshotPlaceholderProps) {
  const { isDark } = useTheme();

  if (imageSrc) {
    return (
      <div className={cn("relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px] rounded-[2.5rem] overflow-hidden border-[6px] border-foreground/20 shadow-2xl bg-background", className)}>
        <img 
          src={isDark && darkImageSrc ? darkImageSrc : imageSrc}
          alt={alt} 
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {/* Premium Overlay Effect */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
        )}
      </div>
    );
  }

  // Fallback Skeleton if no image provided
  return (
    <div className={cn("relative rounded-3xl overflow-hidden border border-border/50 shadow-xl bg-card", className)}>
      <div className="h-8 bg-muted border-b border-border/50 flex items-center px-4 gap-2">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
      </div>
      <div className="p-8 space-y-4">
        <Skeleton className="h-12 w-3/4 rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl mt-8" />
      </div>
    </div>
  );
}
