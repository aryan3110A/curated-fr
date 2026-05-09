"use client";

import { create } from "zustand";

import type { AuthUser } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  status: "idle" | "authenticated" | "anonymous";
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  setUser: (user) =>
    set({
      user,
      status: "authenticated"
    }),
  clearUser: () =>
    set({
      user: null,
      status: "anonymous"
    })
}));
