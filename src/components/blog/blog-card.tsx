"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { isRenderableImageUrl } from "@/lib/media";
import { formatCompactDate } from "@/lib/utils";
import type { BlogCardData } from "@/types/blog";

export const BlogCard = ({ blog }: { blog: BlogCardData }) => {
  const featuredImageUrl = isRenderableImageUrl(blog.featuredImage)
    ? blog.featuredImage
    : undefined;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.2, 1, 0.2, 1] }}
    >
      <Card className="group overflow-hidden rounded-[2rem] border-white/60 bg-white/90 transition hover:shadow-float">
        <Link className="block" href={`/blog/${blog.slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden">
            {featuredImageUrl ? (
              <Image
                alt={blog.title}
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={featuredImageUrl}
              />
            ) : (
              <MediaPlaceholder
                className="h-full w-full"
                compact
                label={blog.title}
                seed={blog.slug}
              />
            )}
            <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
              <Badge variant="gold">{blog.category?.name ?? "Editorial"}</Badge>
              <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
                {blog.readingTime} min
              </span>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-stone">
                {formatCompactDate(blog.createdAt)}
              </p>
              <h3 className="font-serif text-2xl leading-tight text-foreground">
                {blog.title}
              </h3>
              <p className="line-clamp-3 text-sm leading-7 text-stone">
                {blog.excerpt}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  className="rounded-full bg-beige px-3 py-1 text-xs text-stone"
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};
