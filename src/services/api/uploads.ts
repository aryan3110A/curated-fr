"use client";

import type { ApiResponse } from "@/types/api";

import { apiClient } from "./client";

export const uploadsApi = {
  async uploadImage(file: File, folder: "featured" | "content" | "products") {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const response = await apiClient.post<ApiResponse<{ path: string; url: string }>>("/uploads/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data.data;
  }
};
