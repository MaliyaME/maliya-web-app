import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface ScreenshotPlaceholderProps {
  imageSrc?: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export function ScreenshotPlaceholder({ imageSrc, alt, className, overlay = true }: ScreenshotPlaceholderProps) {
  if (imageSrc) {
    return (
      <div className={cn("relative group rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-background", className)}>
        {/* Browser chrome / Header bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-muted/80 backdrop-blur-sm border-b border-border/50 flex items-center px-4 gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        
        {/* Actual Image from user assets */}
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-auto mt-8 object-cover" 
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
