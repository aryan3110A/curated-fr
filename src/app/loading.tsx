import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell space-y-10 py-16">
      <Skeleton className="h-14 w-56" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton className="aspect-[4/5] w-full rounded-[2rem]" key={index} />
        ))}
      </div>
    </div>
  );
}
