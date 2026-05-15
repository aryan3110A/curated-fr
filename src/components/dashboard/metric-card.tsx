import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MetricCard = ({
  label,
  value,
  caption,
  isLoading = false,
}: {
  label: string;
  value: string;
  caption: string;
  isLoading?: boolean;
}) => {
  return (
    <Card className="bg-white/85">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-stone">
            {label}
          </p>
          <ArrowUpRight className="h-4 w-4 text-stone" />
        </div>
        {isLoading ? (
          <Skeleton className="h-11 w-20 rounded-2xl" />
        ) : (
          <p className="font-serif text-4xl text-foreground">{value}</p>
        )}
        <p className="text-sm leading-7 text-stone">{caption}</p>
      </CardContent>
    </Card>
  );
};
