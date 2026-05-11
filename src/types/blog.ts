export type BlogStatus = "DRAFT" | "PUBLISHED";

export type Author = {
  id: string;
  name: string;
  email?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    blogs: number;
  };
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    blogs: number;
  };
};

export type Product = {
  id: string;
  blogId?: string;
  title: string;
  description: string;
  image?: string | null;
  buyUrl: string;
  price?: string | null;
  createdAt?: string;
};

export type BlogCardData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string | null;
  status: BlogStatus;
  readingTime: number;
  views: number;
  uniqueViews: number;
  createdAt: string;
  updatedAt?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  pinterestUrl?: string | null;
  author: Author;
  category?: Category | null;
  tags: Tag[];
  products: Product[];
};

export type BlogDetail = BlogCardData & {
  content: string;
};

export type BlogListPayload = {
  items: BlogCardData[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
};
