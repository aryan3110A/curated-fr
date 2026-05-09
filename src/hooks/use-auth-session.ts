"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { authApi } from "@/services/api/auth";
import { useAuthStore } from "@/store/auth-store";

export const useAuthSession = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }

    if (query.isError) {
      clearUser();
    }
  }, [clearUser, query.data, query.isError, setUser]);

  return {
    ...query,
    user,
    status
  };
};
