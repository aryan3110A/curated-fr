import Link from "next/link";

import { Button } from "@/components/ui/button";

const buildHref = (pathname: string, params: URLSearchParams, page: number) => {
  params.set("page", String(page));
  return `${pathname}?${params.toString()}`;
};

export const Pagination = ({
  pathname,
  currentPage,
  pageCount,
  searchParams
}: {
  pathname: string;
  currentPage: number;
  pageCount: number;
  searchParams?: Record<string, string | undefined>;
}) => {
  if (pageCount <= 1) {
    return null;
  }

  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value && key !== "page") {
      params.set(key, value);
    }
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-line bg-card/90 px-5 py-4 shadow-card">
      <p className="text-sm text-stone">
        Page {currentPage} of {pageCount}
      </p>
      <div className="flex gap-3">
        <Button asChild disabled={currentPage <= 1} variant="secondary">
          <Link aria-disabled={currentPage <= 1} href={buildHref(pathname, new URLSearchParams(params), Math.max(1, currentPage - 1))}>
            Previous
          </Link>
        </Button>
        <Button asChild disabled={currentPage >= pageCount} variant="default">
          <Link aria-disabled={currentPage >= pageCount} href={buildHref(pathname, new URLSearchParams(params), Math.min(pageCount, currentPage + 1))}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};
