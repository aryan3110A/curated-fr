"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { MetricCard } from "@/components/dashboard/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactDate } from "@/lib/utils";
import { blogsApi } from "@/services/api/blogs";

export default function DashboardPage() {
  const summaryQuery = useQuery({
    queryKey: ["admin", "summary"],
    queryFn: blogsApi.summary,
  });

  const summary = summaryQuery.data;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-stone">
            Overview
          </p>
          <h1 className="mt-3 font-serif text-5xl text-foreground">
            Dashboard
          </h1>
        </div>
        <Button asChild>
          <Link href="/create-blog">Create a blog</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          caption="All stories currently stored in the platform."
          isLoading={summaryQuery.isLoading}
          label="Total blogs"
          value={String(summary?.totalBlogs ?? 0)}
        />
        <MetricCard
          caption="Published posts visible on the public site."
          isLoading={summaryQuery.isLoading}
          label="Published"
          value={String(summary?.publishedBlogs ?? 0)}
        />
        <MetricCard
          caption="Drafts waiting for refinement or scheduling."
          isLoading={summaryQuery.isLoading}
          label="Drafts"
          value={String(summary?.draftBlogs ?? 0)}
        />
        <MetricCard
          caption="Total recorded public views across published posts."
          isLoading={summaryQuery.isLoading}
          label="Views"
          value={String(summary?.totalViews ?? 0)}
        />
      </div>

      <Card className="bg-white/85">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Recent activity</CardTitle>
          <CardDescription>
            The latest stories touched by the editorial team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {summary?.recentBlogs?.map((blog) => (
            <div
              className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-line bg-card/70 px-5 py-4"
              key={blog.id}
            >
              <div>
                <p className="font-medium text-foreground">{blog.title}</p>
                <p className="text-sm text-stone">
                  {formatCompactDate(blog.createdAt)} · {blog.status}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={blog.status === "PUBLISHED" ? "sage" : "rose"}>
                  {blog.status}
                </Badge>
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/edit-blog/${blog.id}`}>Edit</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
