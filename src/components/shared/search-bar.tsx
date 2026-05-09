import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = ({
  action = "/search",
  defaultValue,
  placeholder = "Search inspiration, products, or categories"
}: {
  action?: string;
  defaultValue?: string;
  placeholder?: string;
}) => {
  return (
    <form action={action} className="flex flex-col gap-3 rounded-[2rem] border border-line bg-card/90 p-3 shadow-card md:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
        <Input className="border-0 bg-transparent pl-11 shadow-none focus:ring-0" defaultValue={defaultValue} name="q" placeholder={placeholder} />
      </div>
      <Button className="w-full md:w-auto" type="submit" variant="default">
        Search
      </Button>
    </form>
  );
};
