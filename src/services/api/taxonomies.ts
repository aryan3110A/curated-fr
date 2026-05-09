"use client";

import type { ApiResponse } from "@/types/api";
import type { Category, Tag } from "@/types/blog";

import { apiClient } from "./client";

export const taxonomiesApi = {
  async categories() {
    const response = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return response.data.data;
  },

  async tags() {
    const response = await apiClient.get<ApiResponse<Tag[]>>("/tags");
    return response.data.data;
  }
};
