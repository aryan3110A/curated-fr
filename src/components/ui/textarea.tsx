import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full rounded-[1.5rem] border border-line bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-stone focus:border-stone/30 focus:ring-2 focus:ring-stone/10",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
