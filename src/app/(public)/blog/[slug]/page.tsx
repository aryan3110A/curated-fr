import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { ProductCard } from "@/components/blog/product-card";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { isRenderableImageUrl } from "@/lib/media";
import { formatLongDate } from "@/lib/utils";
import { getBlogBySlug } from "@/services/content";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data) {
    return {
      title: "Story not found",
    };
  }

  const { blog } = data;
  const featuredImageUrl = isRenderableImageUrl(blog.featuredImage)
    ? blog.featuredImage
    : undefined;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${blog.slug}`,
      images: featuredImageUrl ? [{ url: featuredImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: featuredImageUrl ? [featuredImageUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data) {
    notFound();
  }

  const { blog, relatedBlogs } = data;
  const canonicalUrl = `${siteConfig.url}/blog/${blog.slug}`;
  const featuredImageUrl = isRenderableImageUrl(blog.featuredImage)
    ? blog.featuredImage
    : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: featuredImageUrl,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <div className="space-y-16 py-10 md:space-y-20 md:py-14">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-8">
            <Badge variant="rose">
              {blog.category?.name ?? "Editorial story"}
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-foreground md:text-7xl">
                {blog.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone md:text-xl">
                {blog.excerpt}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone">
              <span>{blog.author.name}</span>
              <span className="h-1 w-1 rounded-full bg-stone" />
              <span>{formatLongDate(blog.createdAt)}</span>
              <span className="h-1 w-1 rounded-full bg-stone" />
              <span>{blog.readingTime} min read</span>
            </div>
            <ShareButtons title={blog.title} url={canonicalUrl} />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-float">
            {featuredImageUrl ? (
              <Image
                alt={blog.title}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                src={featuredImageUrl}
              />
            ) : (
              <MediaPlaceholder
                className="h-full w-full"
                label={blog.title}
                seed={blog.slug}
              />
            )}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-card md:p-12">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <div className="space-y-6 lg:sticky lg:top-28">
          <Card className="bg-card/90">
            <CardContent className="space-y-4 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone">
                Story snapshot
              </p>
              <div className="space-y-3 text-sm leading-7 text-stone">
                <p>{blog.views} total views</p>
                <p>{blog.products.length} linked product recommendations</p>
                <p>{blog.tags.length} topic tags</p>
                {blog.pinterestUrl ? (
                  <Link
                    className="font-semibold text-foreground underline decoration-stone/30 underline-offset-4"
                    href={blog.pinterestUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View original Pinterest pin
                  </Link>
                ) : null}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/90">
            <CardContent className="space-y-4 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    className="rounded-full bg-beige px-3 py-1 text-xs text-stone"
                    key={tag.id}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {blog.products.length ? (
        <section className="section-shell space-y-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="gold">Shop the edit</Badge>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Products woven into the story
            </h2>
            <p className="text-base leading-7 text-stone md:text-lg">
              Each product is chosen to support the editorial idea without
              overwhelming the reading experience.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blog.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedBlogs.length ? (
        <section className="section-shell space-y-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="sage">Related</Badge>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Continue through adjacent stories
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard blog={relatedBlog} key={relatedBlog.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
