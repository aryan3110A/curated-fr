import type { Metadata } from "next";

import { MasonryGrid } from "@/components/blog/masonry-grid";
import { CategoryPills } from "@/components/shared/category-pills";
import { Pagination } from "@/components/shared/pagination";
import { Reveal } from "@/components/shared/reveal";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBlogs, getCategories } from "@/services/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse premium Pinterest-inspired editorial stories, affiliate-ready recommendations, and visual content collections."
};

type BlogListingPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export default async function BlogListingPage({ searchParams }: BlogListingPageProps) {
  const filters = await searchParams;
  const currentPage = Number(filters.page ?? 1);

  const [blogs, categories] = await Promise.all([
    getBlogs({
      page: currentPage,
      pageSize: 12,
      search: filters.q,
      category: filters.category,
      sort: filters.q ? "trending" : "latest"
    }),
    getCategories()
  ]);

  return (
    <div className="section-shell space-y-10 py-12 md:space-y-12 md:py-16">
      <Reveal>
        <SectionHeading
          description="Browse all published stories through a clean masonry layout built for visual discovery across mobile, tablet, and desktop."
          eyebrow="Blog"
          title="Searchable collections of save-worthy editorial content"
        />
      </Reveal>
      <Reveal delay={0.05}>
        <SearchBar action="/blog" defaultValue={filters.q} placeholder="Search by title, angle, or tag" />
      </Reveal>
      <Reveal delay={0.08}>
        <CategoryPills activeSlug={filters.category} categories={categories} />
      </Reveal>
      <Reveal delay={0.1}>
        <MasonryGrid blogs={blogs.items} />
      </Reveal>
      <Reveal delay={0.12}>
        <Pagination currentPage={blogs.pagination.page} pageCount={blogs.pagination.pageCount} pathname="/blog" searchParams={{ category: filters.category, q: filters.q }} />
      </Reveal>
    </div>
  );
}
