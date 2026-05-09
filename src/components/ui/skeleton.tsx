import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={cn("animate-pulse rounded-3xl bg-beige/80", className)} />;
};
