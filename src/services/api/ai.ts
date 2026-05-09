"use client";

import type { ApiResponse } from "@/types/api";

import { apiClient } from "./client";

type BlogGenerationResponse = {
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  pinterestCaption: string;
  content: string;
};

export const aiApi = {
  async generateBlog(payload: { topic: string; keywords: string[]; tone: string; audience?: string }) {
    const response = await apiClient.post<ApiResponse<BlogGenerationResponse>>("/ai/generate-blog", payload);
    return response.data.data;
  },

  async generateSeo(payload: { title: string; excerpt?: string; content?: string }) {
    const response = await apiClient.post<ApiResponse<{ seoTitle: string; metaDescription: string }>>("/ai/generate-seo", payload);
    return response.data.data;
  },

  async generateCaption(payload: { title: string; keywords: string[] }) {
    const response = await apiClient.post<ApiResponse<{ caption: string; hashtags: string[] }>>("/ai/generate-caption", payload);
    return response.data.data;
  }
};
