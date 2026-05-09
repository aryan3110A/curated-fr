"use client";

import type { ApiResponse } from "@/types/api";
import type { BlogDetail, BlogListPayload } from "@/types/blog";

import { apiClient } from "./client";

export type BlogSummaryMetrics = {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  recentBlogs: BlogListPayload["items"];
};

export type BlogPayload = {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categoryId?: string;
  tagIds: string[];
  metaTitle?: string;
  metaDescription?: string;
  pinterestUrl?: string;
  status: "DRAFT" | "PUBLISHED";
  products: Array<{
    title: string;
    description: string;
    image?: string;
    buyUrl: string;
    price?: string;
  }>;
};

export const blogsApi = {
  async list(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: "DRAFT" | "PUBLISHED";
    sort?: "latest" | "trending";
  }) {
    const response = await apiClient.get<ApiResponse<BlogListPayload>>("/blogs", {
      params
    });
    return response.data.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<BlogDetail>>(`/blogs/admin/${id}`);
    return response.data.data;
  },

  async summary() {
    const response = await apiClient.get<ApiResponse<BlogSummaryMetrics>>("/blogs/admin/summary");
    return response.data.data;
  },

  async create(payload: BlogPayload) {
    const response = await apiClient.post<ApiResponse<BlogDetail>>("/blogs", payload);
    return response.data.data;
  },

  async update(id: string, payload: BlogPayload) {
    const response = await apiClient.put<ApiResponse<BlogDetail>>(`/blogs/${id}`, payload);
    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete(`/blogs/${id}`);
  }
};
