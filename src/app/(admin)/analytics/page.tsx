"use client";

import { useQuery } from "@tanstack/react-query";

import { MetricCard } from "@/components/dashboard/metric-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogsApi } from "@/services/api/blogs";

export default function AnalyticsPage() {
  const summaryQuery = useQuery({
    queryKey: ["admin", "summary"],
    queryFn: blogsApi.summary,
  });
  const trendingQuery = useQuery({
    queryKey: ["admin", "trending"],
    queryFn: () => blogsApi.list({ page: 1, pageSize: 6, sort: "trending" }),
  });

  const topViews = Math.max(
    ...(trendingQuery.data?.items.map((blog) => blog.views) ?? [1]),
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-stone">
          Analytics
        </p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">
          Performance overview
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          caption="Current size of the searchable editorial library."
          isLoading={summaryQuery.isLoading}
          label="Catalog"
          value={String(summaryQuery.data?.totalBlogs ?? 0)}
        />
        <MetricCard
          caption="Stories actively attracting visits from search and social distribution."
          isLoading={summaryQuery.isLoading}
          label="Active stories"
          value={String(summaryQuery.data?.publishedBlogs ?? 0)}
        />
        <MetricCard
          caption="Total accumulated views stored against published posts."
          isLoading={summaryQuery.isLoading}
          label="View volume"
          value={String(summaryQuery.data?.totalViews ?? 0)}
        />
        <MetricCard
          caption="Draft inventory waiting for manual refinement or scheduling."
          isLoading={summaryQuery.isLoading}
          label="Draft queue"
          value={String(summaryQuery.data?.draftBlogs ?? 0)}
        />
      </div>

      <Card className="bg-white/85">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">
            Top posts by views
          </CardTitle>
          <CardDescription>
            A quick view of the stories currently carrying the most attention.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingQuery.data?.items.map((blog) => (
            <div className="space-y-2" key={blog.id}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">
                  {blog.title}
                </span>
                <span className="text-stone">{blog.views} views</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-beige">
                <div
                  className="h-full rounded-full bg-foreground"
                  style={{ width: `${(blog.views / topViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
