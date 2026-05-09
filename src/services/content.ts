import "server-only";

import { demoBlogCards, demoBlogs, demoCategories, demoTags } from "@/constants/mock-content";
import { siteConfig } from "@/config/site";
import type { ApiResponse, PaginationMeta } from "@/types/api";
import type { BlogCardData, BlogDetail, BlogListPayload, Category, Product, Tag } from "@/types/blog";

const dedupeBlogs = (items: BlogCardData[]) => {
  const seen = new Set<string>();

  return items.filter((blog) => {
    if (seen.has(blog.slug)) {
      return false;
    }

    seen.add(blog.slug);
    return true;
  });
};

const request = async <T>(path: string): Promise<T | null> => {
  try {
    const response = await fetch(`${siteConfig.apiUrl}${path}`, {
      next: {
        revalidate: 120
      }
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as ApiResponse<T>;
    return payload.data;
  } catch {
    return null;
  }
};

const buildFallbackList = (blogs: BlogCardData[], page: number, pageSize: number): BlogListPayload => {
  const total = blogs.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize;

  return {
    items: blogs.slice(startIndex, startIndex + pageSize),
    pagination: {
      page,
      pageSize,
      total,
      pageCount
    }
  };
};

const filterBlogs = (blogs: BlogCardData[], filters?: { search?: string; category?: string; sort?: "latest" | "trending" }) => {
  let filtered = blogs;

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search) ||
        blog.excerpt.toLowerCase().includes(search) ||
        blog.tags.some((tag) => tag.name.toLowerCase().includes(search))
    );
  }

  if (filters?.category) {
    filtered = filtered.filter((blog) => blog.category?.slug === filters.category);
  }

  return [...filtered].sort((left, right) => {
    if (filters?.sort === "trending") {
      return right.views - left.views;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
};

export const getBlogs = async (input?: {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: "latest" | "trending";
}) => {
  const page = input?.page ?? 1;
  const pageSize = input?.pageSize ?? 12;
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  if (input?.search) {
    params.set("search", input.search);
  }

  if (input?.category) {
    params.set("category", input.category);
  }

  if (input?.sort) {
    params.set("sort", input.sort);
  }

  const liveData = await request<BlogListPayload>(`/blogs?${params.toString()}`);
  const fallbackItems = filterBlogs(demoBlogCards, input);
  const fallbackData = buildFallbackList(fallbackItems, page, pageSize);

  if (!liveData) {
    return fallbackData;
  }

  return {
    items: dedupeBlogs([...liveData.items, ...fallbackData.items]).slice(0, Math.max(pageSize, liveData.items.length)),
    pagination: liveData.pagination
  };
};

export const getBlogBySlug = async (slug: string) => {
  const liveData = await request<{ blog: BlogDetail; relatedBlogs: BlogCardData[] }>(`/blogs/${slug}`);

  if (liveData) {
    return liveData;
  }

  const fallbackBlog = demoBlogs.find((blog) => blog.slug === slug);

  if (!fallbackBlog) {
    return null;
  }

  const relatedBlogs = demoBlogCards
    .filter((blog) => blog.slug !== slug && blog.category?.slug === fallbackBlog.category?.slug)
    .slice(0, 3);

  return {
    blog: fallbackBlog,
    relatedBlogs
  };
};

export const getCategories = async () => {
  const liveData = await request<Category[]>("/categories");
  return liveData?.length ? liveData : demoCategories;
};

export const getTags = async () => {
  const liveData = await request<Tag[]>("/tags");
  return liveData?.length ? liveData : demoTags;
};

export const getHomePageData = async () => {
  const blogs = await getBlogs({ pageSize: 9 });
  const categories = await getCategories();

  const featuredBlogs = blogs.items.slice(0, 3);
  const trendingBlogs = [...blogs.items].sort((left, right) => right.views - left.views).slice(0, 4);
  const productShowcase = dedupeBlogs(blogs.items)
    .flatMap((blog) => blog.products.map((product) => ({ ...product, blogSlug: blog.slug })))
    .slice(0, 4) as Array<Product & { blogSlug: string }>;

  return {
    blogs: blogs.items,
    featuredBlogs,
    trendingBlogs,
    categories,
    productShowcase
  };
};

export const getSitemapBlogs = async () => {
  const liveData = await request<BlogListPayload>("/blogs?page=1&pageSize=100&sort=latest");
  return liveData?.items?.length ? liveData.items : demoBlogCards;
};

export const getCategoryOverview = async () => {
  const [categories, blogs] = await Promise.all([getCategories(), getBlogs({ pageSize: 18 })]);

  return categories.map((category) => ({
    ...category,
    preview: blogs.items.find((blog) => blog.category?.slug === category.slug)
  }));
};

export const getSearchSnapshot = async (query?: string) => {
  return getBlogs({
    pageSize: 12,
    search: query,
    sort: query ? "trending" : "latest"
  });
};
