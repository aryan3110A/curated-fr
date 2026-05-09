import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-xs uppercase tracking-[0.24em] text-stone">404</p>
      <h1 className="max-w-2xl font-serif text-5xl leading-tight text-foreground md:text-6xl">This story slipped off the board.</h1>
      <p className="max-w-xl text-lg leading-8 text-stone">
        The page could not be found. Try browsing the latest editorial posts or return to the homepage.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/blog">Browse blog</Link>
        </Button>
      </div>
    </div>
  );
}