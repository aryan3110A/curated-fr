import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const MetricCard = ({ label, value, caption }: { label: string; value: string; caption: string }) => {
  return (
    <Card className="bg-white/85">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-stone">{label}</p>
          <ArrowUpRight className="h-4 w-4 text-stone" />
        </div>
        <p className="font-serif text-4xl text-foreground">{value}</p>
        <p className="text-sm leading-7 text-stone">{caption}</p>
      </CardContent>
    </Card>
  );
};
