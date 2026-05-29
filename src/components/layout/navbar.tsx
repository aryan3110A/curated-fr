"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  // Commented out search and category tab from the nav bar (commented out in siteConfig.navigation)
  const navItems = siteConfig.navigation;

  return (
    <header
      className= "sticky top-0 z-40 border-b border-[rgba(143,166,138,0.25)] bg-[rgb(var(--hero-warm-white)/0.92)] backdrop-blur-xl"
      
    >
      <div
        className= "mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-[18px] md:px-6 lg:px-8"
        
      >
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border border-[rgba(143,166,138,0.3)] bg-[rgb(var(--hero-cream))]">
            <svg
              className="h-11 w-11"
              fill="none"
              viewBox="0 0 44 44"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="22" cy="22" r="21" stroke="#8FA68A" strokeWidth="0.8" />
              <line
                stroke="#C4A25A"
                strokeLinecap="round"
                strokeWidth="1.5"
                x1="10"
                x2="34"
                y1="26"
                y2="26"
              />
              <line
                stroke="#C4A25A"
                strokeLinecap="round"
                strokeWidth="1.2"
                x1="10"
                x2="34"
                y1="12"
                y2="12"
              />
              <line stroke="#C4A25A" strokeWidth="0.8" x1="17" x2="17" y1="12" y2="18" />
              <line stroke="#C4A25A" strokeWidth="0.8" x1="22" x2="22" y1="12" y2="17" />
              <line stroke="#C4A25A" strokeWidth="0.8" x1="27" x2="27" y1="12" y2="16" />
              <rect fill="#8FA68A" fillOpacity="0.8" height="4" rx="1" width="5" x="20" y="17" />
              <rect fill="#C9836E" fillOpacity="0.7" height="4" rx="1" width="4" x="11" y="22" />
              <rect fill="#C9836E" fillOpacity="0.5" height="5" rx="1" width="4" x="16" y="21" />
              <rect fill="#8FA68A" fillOpacity="0.8" height="3" rx="1" width="4" x="25" y="23" />
              <ellipse
                cx="8"
                cy="18"
                fill="#8FA68A"
                fillOpacity="0.25"
                rx="3"
                ry="5"
                transform="rotate(-20 8 18)"
              />
              <ellipse
                cx="36"
                cy="18"
                fill="#8FA68A"
                fillOpacity="0.25"
                rx="3"
                ry="5"
                transform="rotate(20 36 18)"
              />
            </svg>
          </div>
          <div className="leading-none">
            <p className="font-cormorant text-[13px] italic text-[rgb(var(--hero-sage-dark))]">
              The
            </p>
            <p className="font-playfair text-[15px] font-medium uppercase tracking-[0.08em] text-[rgb(var(--hero-charcoal))]">
              Curated Counter
            </p>
            <p className="font-jost mt-0.5 text-[9px] font-light uppercase tracking-[0.2em] text-[rgb(var(--hero-muted))]">
              A Home Decor Blog
            </p>
          </div>
        </Link>
        <nav className="ml-auto hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              className="font-jost text-[12px] font-normal uppercase tracking-[0.15em] text-[rgb(var(--hero-muted))] transition hover:text-[rgb(var(--hero-charcoal))]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
