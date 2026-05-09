"use client";

import axios, { type InternalAxiosRequestConfig } from "axios";

import { siteConfig } from "@/config/site";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: siteConfig.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshPromise: Promise<void> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const requestUrl = originalRequest?.url ?? "";

    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !requestUrl.includes("/auth/login") &&
      !requestUrl.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      refreshPromise ??= apiClient
        .post("/auth/refresh")
        .then(() => undefined)
        .finally(() => {
          refreshPromise = null;
        });

      try {
        await refreshPromise;
        return apiClient(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
