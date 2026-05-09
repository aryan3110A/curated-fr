"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCompactDate } from "@/lib/utils";
import { blogsApi } from "@/services/api/blogs";

const selectClassName =
  "h-12 rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-stone/30 focus:ring-2 focus:ring-stone/10";

export default function BlogsAdminPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");
  const deferredSearch = useDeferredValue(search);

  const blogsQuery = useQuery({
    queryKey: ["admin", "blogs", deferredSearch, status],
    queryFn: () =>
      blogsApi.list({
        page: 1,
        pageSize: 24,
        search: deferredSearch || undefined,
        status: status === "ALL" ? undefined : status,
        sort: "latest"
      })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogsApi.remove(id),
    onSuccess: () => {
      toast.success("Blog removed.");
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
    onError: () => {
      toast.error("Unable to delete this blog.");
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-stone">Management</p>
          <h1 className="mt-3 font-serif text-5xl text-foreground">Blogs</h1>
        </div>
        <Button asChild>
          <Link href="/create-blog">New blog</Link>
        </Button>
      </div>

      <Card className="bg-white/85">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Library</CardTitle>
          <CardDescription>Filter, edit, or delete posts from the editorial queue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
            <Input onChange={(event) => setSearch(event.target.value)} placeholder="Search blogs by title or excerpt" value={search} />
            <select className={selectClassName} onChange={(event) => setStatus(event.target.value as "ALL" | "DRAFT" | "PUBLISHED")} value={status}>
              <option value="ALL">All statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
          <div className="space-y-4">
            {blogsQuery.data?.items.map((blog) => (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-card/70 px-5 py-4" key={blog.id}>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{blog.title}</p>
                  <p className="text-sm text-stone">
                    {formatCompactDate(blog.createdAt)} · {blog.views} views
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={blog.status === "PUBLISHED" ? "sage" : "rose"}>{blog.status}</Badge>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/edit-blog/${blog.id}`}>Edit</Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete blog</DialogTitle>
                        <DialogDescription>This removes the post and its attached product recommendations. The action cannot be undone.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => deleteMutation.mutate(blog.id)} type="button">
                          Confirm delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
