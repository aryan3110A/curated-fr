import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { MasonryGrid } from "@/components/blog/masonry-grid";
import { ProductCard } from "@/components/blog/product-card";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { Reveal } from "@/components/shared/reveal";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getHomePageData } from "@/services/content";

export default async function HomePage() {
  const { blogs, categories, featuredBlogs, trendingBlogs, productShowcase } = await getHomePageData();

  return (
    <div className="space-y-24 py-10 md:space-y-32 md:py-14">
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <div className="space-y-8 rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-float md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-beige px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone">
                <Sparkles className="h-4 w-4" /> Pinterest-first editorial engine
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-foreground md:text-7xl">
                  Premium visual blogging built for saves, clicks, and elegant conversions.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone md:text-xl">
                  CuratedCounter merges Pinterest-inspired layouts, SEO-focused storytelling, and affiliate-ready product surfaces into one calm, high-conviction editorial platform.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/blog">
                    Explore stories <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/login">Enter admin workspace</Link>
                </Button>
              </div>
              <SearchBar action="/search" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {featuredBlogs.map((blog, index) => (
                <Card className="overflow-hidden bg-card/95" key={blog.id}>
                  <CardContent className="space-y-4 p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone">Featured story {String(index + 1).padStart(2, "0")}</p>
                    <h2 className="font-serif text-3xl leading-tight text-foreground">{blog.title}</h2>
                    <p className="text-sm leading-7 text-stone">{blog.excerpt}</p>
                    <Link className="text-sm font-semibold text-foreground underline decoration-stone/30 underline-offset-4" href={`/blog/${blog.slug}`}>
                      Read article
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell space-y-8">
        <Reveal>
          <SectionHeading
            description="A curated mix of visual-first articles designed to convert Pinterest curiosity into longer reading sessions."
            eyebrow="Latest"
            title="Editorial posts arranged like a living inspiration board"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <MasonryGrid blogs={blogs} />
        </Reveal>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            description="Categories are structured around Pinterest-worthy content themes that still read like polished editorial sections."
            eyebrow="Browse"
            title="Collections built around visual search intent"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                className="rounded-[2rem] border border-line bg-card/90 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-float"
                href={`/blog?category=${category.slug}`}
                key={category.id}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-stone">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-3xl text-foreground">{category.name}</h3>
                <p className="mt-2 text-sm leading-7 text-stone">Pins, product moments, and stories shaped for readers who click through from visual inspiration.</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell space-y-8">
        <Reveal>
          <SectionHeading
            description="These are the stories currently earning the strongest attention signals and click-ready momentum."
            eyebrow="Trending"
            title="High-performing posts with strong save and revisit energy"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-6 lg:grid-cols-4">
            {trendingBlogs.map((blog) => (
              <Card className="bg-white/85" key={blog.id}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone">{blog.views} views</span>
                    <span className="rounded-full bg-sage/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                      {blog.readingTime} min
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">{blog.title}</h3>
                  <p className="text-sm leading-7 text-stone">{blog.excerpt}</p>
                  <Link className="text-sm font-semibold text-foreground" href={`/blog/${blog.slug}`}>
                    View story
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell space-y-8">
        <Reveal>
          <SectionHeading
            description="Product cards are woven into stories without breaking the editorial tone, making affiliate content feel considered instead of pushy."
            eyebrow="Products"
            title="Elegant buying moments designed for editorial trust"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productShowcase.map((product) => (
              <ProductCard blogHref={`/blog/${product.blogSlug}`} key={`${product.blogSlug}-${product.id}`} product={product} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <Reveal>
          <NewsletterCard />
        </Reveal>
      </section>
    </div>
  );
}
