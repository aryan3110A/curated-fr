import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/blog";

export const CategoryPills = ({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition",
          !activeSlug ? "border-foreground bg-foreground text-background" : "border-line bg-card text-stone hover:bg-white"
        )}
        href="/blog"
      >
        All stories
      </Link>
      {categories.map((category) => (
        <Link
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            activeSlug === category.slug ? "border-foreground bg-foreground text-background" : "border-line bg-card text-stone hover:bg-white"
          )}
          href={`/blog?category=${category.slug}`}
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
