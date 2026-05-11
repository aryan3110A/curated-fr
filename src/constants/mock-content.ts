import type {
  BlogCardData,
  BlogDetail,
  Category,
  Product,
  Tag,
} from "@/types/blog";

const demoAuthor = {
  id: "author-demo",
  name: "CuratedCounter Editorial",
  email: "editorial@curatedcounter.com",
};

export const demoCategories: Category[] = [
  { id: "cat-1", name: "Home Decor", slug: "home-decor", _count: { blogs: 3 } },
  {
    id: "cat-2",
    name: "Slow Living",
    slug: "slow-living",
    _count: { blogs: 2 },
  },
  { id: "cat-3", name: "Workspaces", slug: "workspaces", _count: { blogs: 2 } },
  {
    id: "cat-4",
    name: "Seasonal Styling",
    slug: "seasonal-styling",
    _count: { blogs: 1 },
  },
];

export const demoTags: Tag[] = [
  { id: "tag-1", name: "Minimal", slug: "minimal" },
  { id: "tag-2", name: "Pinterest", slug: "pinterest" },
  { id: "tag-3", name: "Affiliate", slug: "affiliate" },
  { id: "tag-4", name: "Organic Traffic", slug: "organic-traffic" },
  { id: "tag-5", name: "Warm Neutrals", slug: "warm-neutrals" },
  { id: "tag-6", name: "Editorial", slug: "editorial" },
];

const buildContent = (lead: string, points: string[]) =>
  `<section><p>${lead}</p>${points
    .map(
      (point, index) =>
        `<h2>${index + 1}. ${point}</h2><p>${point} is strongest when the visual promise and the practical tip appear together. Use soft materials, clean compositions, and product placements that feel native to the story instead of interrupting it.</p>`,
    )
    .join("")}</section>`;

const sharedProducts: Product[] = [
  {
    id: "prod-1",
    title: "Travertine Accent Table",
    description: "Muted stone texture for premium editorial corners.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
    buyUrl: "https://example.com/products/travertine-accent-table",
    price: "$259",
  },
  {
    id: "prod-2",
    title: "Boucle Reading Chair",
    description: "A sculptural seat that softens minimal spaces.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    buyUrl: "https://example.com/products/boucle-reading-chair",
    price: "$399",
  },
];

const createBlog = (input: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  categorySlug: string;
  tagSlugs: string[];
  views: number;
  uniqueViews?: number;
  createdAt: string;
  readingTime: number;
  content: string;
  products?: Product[];
}): BlogDetail => ({
  id: input.id,
  slug: input.slug,
  title: input.title,
  excerpt: input.excerpt,
  featuredImage: input.featuredImage,
  status: "PUBLISHED",
  readingTime: input.readingTime,
  views: input.views,
  uniqueViews: input.uniqueViews ?? input.views,
  createdAt: input.createdAt,
  updatedAt: input.createdAt,
  metaTitle: input.title,
  metaDescription: input.excerpt,
  pinterestUrl: "https://www.pinterest.com/",
  author: demoAuthor,
  category:
    demoCategories.find((category) => category.slug === input.categorySlug) ??
    null,
  tags: demoTags.filter((tag) => input.tagSlugs.includes(tag.slug)),
  products: input.products ?? [],
  content: input.content,
});

export const demoBlogs: BlogDetail[] = [
  createBlog({
    id: "blog-1",
    slug: "minimal-living-room-ideas",
    title: "Minimal Living Room Ideas That Still Feel Warm",
    excerpt:
      "A Pinterest-friendly guide to creating a serene living room with texture, warmth, and restrained product styling.",
    featuredImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "home-decor",
    tagSlugs: ["minimal", "pinterest", "warm-neutrals"],
    views: 172,
    createdAt: "2026-04-10T10:00:00.000Z",
    readingTime: 4,
    products: sharedProducts,
    content: buildContent(
      "Minimal interiors work best when every surface has room to breathe. This post turns that visual instinct into a blog structure that Pinterest readers actually stay with.",
      [
        "Lead with a calm neutral base",
        "Layer texture instead of color noise",
        "Use products as quiet proof points",
      ],
    ),
  }),
  createBlog({
    id: "blog-2",
    slug: "small-bedroom-pinterest-ideas",
    title: "Small Bedroom Pinterest Ideas With Boutique-Hotel Energy",
    excerpt:
      "Turn a compact bedroom into a high-save Pinterest visual with soft lighting, layered textiles, and smarter vertical styling.",
    featuredImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home-decor",
    tagSlugs: ["pinterest", "editorial", "warm-neutrals"],
    views: 241,
    createdAt: "2026-04-21T10:00:00.000Z",
    readingTime: 5,
    content: buildContent(
      "Pinterest bedroom content lands best when the room feels escapist but still achievable. Make every corner feel quiet, elevated, and lightly styled.",
      [
        "Use one hero textile",
        "Choose lighting with shape",
        "Keep bedside styling disciplined",
      ],
    ),
  }),
  createBlog({
    id: "blog-3",
    slug: "desk-styling-ideas-for-productivity",
    title: "Desk Styling Ideas That Make Home Offices Feel Focused",
    excerpt:
      "A visual editorial on cleaner desks, warmer workspaces, and affiliate-friendly accessories that do not clutter the frame.",
    featuredImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "workspaces",
    tagSlugs: ["minimal", "affiliate", "editorial"],
    views: 197,
    createdAt: "2026-03-30T10:00:00.000Z",
    readingTime: 6,
    products: [sharedProducts[0]],
    content: buildContent(
      "Workspace content converts when it balances atmosphere with utility. Keep the scene composed enough for Pinterest, then make every recommendation useful enough for a click-through.",
      [
        "Anchor the desk with one stone or wood texture",
        "Hide visual noise before you style",
        "Recommend tools that improve the routine",
      ],
    ),
  }),
  createBlog({
    id: "blog-4",
    slug: "slow-morning-routine-ideas",
    title: "Slow Morning Routine Ideas for a Softer Home Aesthetic",
    excerpt:
      "Build Pinterest-worthy rituals into your mornings with calm surfaces, beautiful utility, and soothing visual repetition.",
    featuredImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "slow-living",
    tagSlugs: ["slow-living", "editorial", "pinterest"],
    views: 164,
    createdAt: "2026-04-03T10:00:00.000Z",
    readingTime: 4,
    content: buildContent(
      "Slow-living content thrives when it feels believable. Focus on small rituals, intentional tools, and visual consistency that makes the entire home feel quieter.",
      [
        "Create one calm preparation zone",
        "Use tactile materials readers can imagine",
        "Close with a repeatable ritual",
      ],
    ),
  }),
  createBlog({
    id: "blog-5",
    slug: "spring-entryway-refresh",
    title: "Spring Entryway Refresh Ideas for High-Save Pinterest Pins",
    excerpt:
      "Freshen your entryway with airy florals, warm woods, and compact styling decisions that read beautifully on mobile screens.",
    featuredImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "seasonal-styling",
    tagSlugs: ["pinterest", "warm-neutrals", "affiliate"],
    views: 318,
    createdAt: "2026-03-18T10:00:00.000Z",
    readingTime: 5,
    products: [sharedProducts[1]],
    content: buildContent(
      "Entryways are strong Pinterest performers because the transformation is immediate. Keep the palette optimistic and the styling compact enough to feel achievable in one afternoon.",
      [
        "Use height for visual rhythm",
        "Let one seasonal object lead the scene",
        "Pair mood with a product recommendation",
      ],
    ),
  }),
  createBlog({
    id: "blog-6",
    slug: "linen-layering-ideas-for-summer",
    title: "Linen Layering Ideas for an Effortless Summer Home",
    excerpt:
      "Soft cream layers, muted stone accents, and breathable styling moves that keep visual rooms feeling airy and premium.",
    featuredImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    categorySlug: "slow-living",
    tagSlugs: ["minimal", "warm-neutrals", "editorial"],
    views: 289,
    createdAt: "2026-04-28T10:00:00.000Z",
    readingTime: 5,
    content: buildContent(
      "Summer styling performs best when it feels relaxed instead of sparse. Linen, bleached woods, and tonal palettes help the room feel expansive while still giving readers something to buy into.",
      [
        "Start with cream and oatmeal fabrics",
        "Add one cooler stone accent",
        "Keep every product recommendation tactile",
      ],
    ),
  }),
];

export const demoBlogCards: BlogCardData[] = demoBlogs.map(
  ({ content: _content, ...blog }) => blog,
);
