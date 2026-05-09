import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-sm font-bold uppercase tracking-[0.3em] text-background">
            CC
          </div>
          <div>
            <p className="font-serif text-2xl leading-none text-foreground">CuratedCounter</p>
            <p className="text-xs uppercase tracking-[0.24em] text-stone">Pinterest-driven editorial</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link className="text-sm font-medium text-stone transition hover:text-foreground" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="secondary">
          <Link href="/login">Admin Login</Link>
        </Button>
      </div>
    </header>
  );
};
