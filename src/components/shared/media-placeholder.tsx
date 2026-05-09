import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { createPlaceholderPalette } from "@/lib/media";

export const MediaPlaceholder = ({
  seed,
  label,
  className,
  compact = false,
}: {
  seed: string;
  label: string;
  className?: string;
  compact?: boolean;
}) => {
  const palette = createPlaceholderPalette(seed);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        palette.shell,
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-[10%] top-[12%] h-28 w-28 rounded-full blur-2xl",
          palette.orbA,
        )}
      />
      <div
        className={cn(
          "absolute bottom-[14%] right-[10%] h-36 w-36 rounded-full blur-3xl",
          palette.orbB,
        )}
      />
      <div
        className={cn(
          "absolute right-[35%] top-[48%] h-20 w-20 rounded-full blur-2xl",
          palette.orbC,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_45%)]" />
      <div className="relative flex h-full flex-col items-start justify-end gap-3 p-6">
        <div className="rounded-full bg-white/70 p-3 text-foreground shadow-sm backdrop-blur-sm">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div className="max-w-[16rem] rounded-[1.25rem] bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
            Image placeholder
          </p>
          <p
            className={cn(
              "mt-2 font-serif leading-tight text-foreground",
              compact ? "text-xl" : "text-2xl",
            )}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};
