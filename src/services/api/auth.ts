"use client";

import type { AuthUser } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

import { apiClient } from "./client";

export const authApi = {
  async login(payload: { email: string; password: string }) {
    const response = await apiClient.post<ApiResponse<{ user: AuthUser }>>("/auth/login", payload);
    return response.data.data.user;
  },

  async me() {
    const response = await apiClient.get<ApiResponse<AuthUser>>("/auth/me");
    return response.data.data;
  },

  async logout() {
    await apiClient.post("/auth/logout");
  }
};
