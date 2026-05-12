import Link from "next/link";

import { siteConfig } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="border-t border-line bg-card/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="font-serif text-3xl text-foreground">A visual blogging stack for premium content teams.</p>
          <p className="max-w-xl text-sm leading-7 text-stone">
            CuratedCounter blends Pinterest-first storytelling, search-minded blog architecture, and elegant product placement for modern affiliate content ecosystems.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">Navigate</p>
            {siteConfig.navigation.map((item) => (
              <Link className="block text-sm text-foreground/80 transition hover:text-foreground" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">Platform</p>
            <p className="text-sm text-foreground/80">hello@curatedcounter.com</p>
            <p className="text-sm text-foreground/80">Pinterest-ready content, elegant conversions.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
