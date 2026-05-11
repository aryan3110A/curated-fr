"use client";

import { useEffect } from "react";

import { siteConfig } from "@/config/site";

const VISITOR_ID_KEY = "curatedcounter:visitor-id";
const PAGE_MARKER_PREFIX = "curatedcounter:visit-sent:";

const createVisitorId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
};

const getVisitorId = () => {
  const existingVisitorId = window.localStorage.getItem(VISITOR_ID_KEY);

  if (existingVisitorId) {
    return existingVisitorId;
  }

  const nextVisitorId = createVisitorId();
  window.localStorage.setItem(VISITOR_ID_KEY, nextVisitorId);
  return nextVisitorId;
};

export const BlogVisitTracker = ({ slug }: { slug: string }) => {
  useEffect(() => {
    const pageMarker = `${PAGE_MARKER_PREFIX}${slug}`;

    if (window.sessionStorage.getItem(pageMarker)) {
      return;
    }

    const visitorId = getVisitorId();
    window.sessionStorage.setItem(pageMarker, "1");

    const clearMarker = () => {
      window.sessionStorage.removeItem(pageMarker);
    };

    window.addEventListener("pagehide", clearMarker, { once: true });

    void fetch(`${siteConfig.apiUrl}/blogs/${slug}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visitorId }),
      keepalive: true,
    }).catch(() => {
      window.sessionStorage.removeItem(pageMarker);
    });

    return () => {
      window.removeEventListener("pagehide", clearMarker);
    };
  }, [slug]);

  return null;
};
