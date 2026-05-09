import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryOverview } from "@/services/content";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore curated editorial categories for Pinterest-led home, lifestyle, and affiliate storytelling."
};

export default async function CategoriesPage() {
  const categories = await getCategoryOverview();

  return (
    <div className="section-shell space-y-10 py-12 md:space-y-12 md:py-16">
      <Reveal>
        <SectionHeading
          description="Each category reflects a visual search pattern, giving the platform a clear content architecture for both users and search engines."
          eyebrow="Taxonomy"
          title="Content collections designed for clean discovery"
        />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {categories.map((category) => (
          <Reveal delay={0.04} key={category.id}>
            <Card className="overflow-hidden bg-white/85">
              <CardContent className="space-y-5 p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-stone">Collection</p>
                    <h2 className="mt-3 font-serif text-4xl text-foreground">{category.name}</h2>
                  </div>
                  <span className="rounded-full bg-beige px-4 py-2 text-sm font-semibold text-foreground">
                    {category._count?.blogs ?? 0} posts
                  </span>
                </div>
                <p className="text-sm leading-7 text-stone">
                  {category.preview?.excerpt || "Visual-first stories, product-rich moments, and search-aware editorial structure gathered into one calm collection."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link className="text-sm font-semibold text-foreground underline decoration-stone/30 underline-offset-4" href={`/blog?category=${category.slug}`}>
                    View stories
                  </Link>
                  {category.preview ? (
                    <Link className="text-sm text-stone" href={`/blog/${category.preview.slug}`}>
                      Preview: {category.preview.title}
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
