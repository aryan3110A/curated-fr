import { Badge } from "@/components/ui/badge";

export const SectionHeading = ({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge variant="sage">{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{title}</h2>
        <p className="text-base leading-7 text-stone md:text-lg">{description}</p>
      </div>
    </div>
  );
};
