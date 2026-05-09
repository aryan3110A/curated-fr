import type { Metadata } from "next";

import { MasonryGrid } from "@/components/blog/masonry-grid";
import { Pagination } from "@/components/shared/pagination";
import { Reveal } from "@/components/shared/reveal";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSearchSnapshot } from "@/services/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Pinterest-inspired editorial stories, product recommendations, and topic collections."
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = await searchParams;
  const page = Number(filters.page ?? 1);
  const results = await getSearchSnapshot(filters.q);

  return (
    <div className="section-shell space-y-10 py-12 md:space-y-12 md:py-16">
      <Reveal>
        <SectionHeading
          description="Search the platform for content angles, categories, and visual storytelling ideas aligned with Pinterest-style discovery."
          eyebrow="Search"
          title={filters.q ? `Results for “${filters.q}”` : "Start with a keyword, mood, or room idea"}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <SearchBar action="/search" defaultValue={filters.q} />
      </Reveal>
      <Reveal delay={0.08}>
        <MasonryGrid blogs={results.items} />
      </Reveal>
      <Reveal delay={0.1}>
        <Pagination currentPage={page} pageCount={results.pagination.pageCount} pathname="/search" searchParams={{ q: filters.q }} />
      </Reveal>
    </div>
  );
}
