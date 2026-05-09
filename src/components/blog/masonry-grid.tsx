import type { BlogCardData } from "@/types/blog";

import { BlogCard } from "./blog-card";

export const MasonryGrid = ({ blogs }: { blogs: BlogCardData[] }) => {
  return (
    <div className="columns-1 gap-6 md:columns-2 xl:columns-3 [&>*:not(:first-child)]:mt-6">
      {blogs.map((blog) => (
        <div className="break-inside-avoid" key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};
