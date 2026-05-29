export const siteConfig = {
  name: "CuratedCounter",
  description:
    "A premium Pinterest-driven editorial platform for visual blogging, AI-assisted publishing, and affiliate-ready product storytelling.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    // { label: "Categories", href: "/categories" },
    // { label: "Search", href: "/search" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  adminNavigation: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blogs", href: "/blogs" },
    { label: "Create Blog", href: "/create-blog" },
    { label: "Media", href: "/media" },
    { label: "Analytics", href: "/analytics" }
  ]
} as const;
