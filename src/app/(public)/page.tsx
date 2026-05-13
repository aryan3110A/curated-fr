import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/blog/product-card";
import { NewsletterCard } from "@/components/shared/newsletter-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { isRenderableImageUrl } from "@/lib/media";
import { formatCompactDate } from "@/lib/utils";
import { getHomePageData } from "@/services/content";

export default async function HomePage() {
  const { blogs, categories, featuredBlogs, trendingBlogs, productShowcase } =
    await getHomePageData();
  const latestPost = featuredBlogs[0] ?? blogs[0] ?? null;
  const categoryLinks = categories.slice(0, 4);
  const latestFeatured = blogs[0] ?? null;
  const latestGrid = blogs.slice(1, 4);
  const latestList = blogs.slice(4, 6);
  const heroImages = [
    {
      alt: "Elegant neutral living room with linen textures",
      className: "left-6 right-20 top-8 bottom-40",
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    },
    {
      alt: "Minimal cozy bedroom",
      className: "right-4 top-8 bottom-[200px] w-[100px]",
      src: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80",
    },
    {
      alt: "Styled shelf with ceramic decor",
      className:
        "bottom-6 left-6 h-40 w-[200px] border-[3px] border-[rgb(var(--hero-warm-white))]",
      src: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=400&q=80",
    },
    {
      alt: "Workspace desk styling",
      className: "bottom-6 right-4 h-40 w-[140px]",
      src: "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=400&q=80",
    },
  ] as const;

  return (
    <div className="space-y-24 pb-10 md:space-y-32 md:pb-14">
      <section className="relative overflow-hidden bg-[rgb(var(--hero-warm-white))] pb-0 pt-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(197,212,191,0.18)_0%,transparent_70%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(201,131,110,0.07)_0%,transparent_60%)]"
        />
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[88px] bg-[radial-gradient(circle_at_10%_50%,rgba(232,217,181,0.26),transparent_22%),radial-gradient(circle_at_28%_50%,rgba(232,217,181,0.18),transparent_20%),radial-gradient(circle_at_46%_50%,rgba(232,217,181,0.12),transparent_18%),radial-gradient(circle_at_64%_50%,rgba(232,217,181,0.12),transparent_18%),radial-gradient(circle_at_82%_50%,rgba(232,217,181,0.14),transparent_18%)] opacity-80"
        /> */}
        <div className="relative z-10 px-[35px]">
          <h2 className="sr-only">
            The Curated Counter home decor hero section
          </h2>

          <div className="grid min-h-[calc(100vh-96px)] items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="relative flex flex-col justify-center pb-8 pl-0 pr-0 pt-4 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-9">
              <svg
                aria-hidden="true"
                className="hero-fade-up pointer-events-none absolute -left-14 bottom-0 hidden opacity-[0.9] lg:block"
                fill="none"
                height="320"
                style={{ animationDelay: "0.6s" }}
                viewBox="0 0 60 320"
                width="60"
              >
                <path
                  d="M30 320 Q30 280 30 240"
                  stroke="#8FA68A"
                  strokeLinecap="round"
                  strokeWidth="1"
                />
                <ellipse
                  cx="20"
                  cy="200"
                  fill="#8FA68A"
                  rx="14"
                  ry="8"
                  transform="rotate(-30 20 200)"
                />
                <ellipse
                  cx="38"
                  cy="180"
                  fill="#8FA68A"
                  rx="14"
                  ry="7"
                  transform="rotate(25 38 180)"
                />
                <ellipse
                  cx="16"
                  cy="155"
                  fill="#8FA68A"
                  rx="12"
                  ry="7"
                  transform="rotate(-35 16 155)"
                />
                <ellipse
                  cx="40"
                  cy="135"
                  fill="#8FA68A"
                  rx="13"
                  ry="6"
                  transform="rotate(30 40 135)"
                />
                <ellipse
                  cx="18"
                  cy="110"
                  fill="#8FA68A"
                  rx="11"
                  ry="6"
                  transform="rotate(-40 18 110)"
                />
                <ellipse
                  cx="36"
                  cy="92"
                  fill="#8FA68A"
                  rx="11"
                  ry="5"
                  transform="rotate(35 36 92)"
                />
                <ellipse
                  cx="22"
                  cy="70"
                  fill="#8FA68A"
                  rx="10"
                  ry="5"
                  transform="rotate(-25 22 70)"
                />
                <ellipse
                  cx="34"
                  cy="52"
                  fill="#8FA68A"
                  rx="9"
                  ry="5"
                  transform="rotate(40 34 52)"
                />
                <path
                  d="M30 240 Q30 200 30 60"
                  stroke="#8FA68A"
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                  strokeWidth="0.8"
                />
              </svg>

              <div className="hero-fade-up mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[rgb(var(--hero-gold))]" />
                <span className="font-jost text-[11px] font-normal uppercase tracking-[0.25em] text-[rgb(var(--hero-gold))]">
                  Welcome to the counter
                </span>
              </div>

              <h1
                className="hero-fade-up font-playfair text-[52px] font-normal leading-[1.15] text-[rgb(var(--hero-charcoal))]"
                style={{ animationDelay: "0.1s" }}
              >
                Your Home,
                <br />
                <em className="font-playfair text-[52px] font-normal italic text-[rgb(var(--hero-rose))]">
                  Thoughtfully
                </em>
              </h1>

              <div
                className="hero-fade-up font-cormorant mb-8 mt-0 text-[36px] font-light italic leading-[1.2] text-[rgb(var(--hero-sage-dark))]"
                style={{ animationDelay: "0.18s" }}
              >
                Styled &amp; Curated
              </div>

              <div
                className="hero-fade-up mb-7 flex items-center gap-8"
                style={{ animationDelay: "0.24s" }}
              >
                <span className="text-[13px] text-[rgb(var(--hero-sage))]">
                  *
                </span>
                <div className="flex max-w-[84px] flex-1 items-center gap-[6px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      className="h-[3px] w-[3px] rounded-full bg-[rgb(var(--hero-sage-light))]"
                      key={index}
                    />
                  ))}
                </div>
                <span className="text-[13px] text-[rgb(var(--hero-sage))]">
                  *
                </span>
              </div>

              <p
                className="hero-fade-up font-jost mb-10 max-w-[400px] text-[15px] font-light leading-[1.85] text-[rgb(var(--hero-muted))]"
                style={{ animationDelay: "0.3s" }}
              >
                Discover warm, intentional spaces from linen layers and slow
                mornings to boucle chairs and minimal rooms that still feel like
                home. Pinterest-inspired, editorial at heart.
              </p>

              <div
                className="hero-fade-up flex flex-wrap items-center gap-6"
                style={{ animationDelay: "0.38s" }}
              >
                <Link
                  className="font-jost inline-flex items-center rounded-[2px] bg-[rgb(var(--hero-charcoal))] px-[28px] py-[13px] text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(var(--hero-cream))] transition hover:-translate-y-px hover:bg-[rgb(var(--hero-rose))]"
                  href="/blog"
                >
                  Explore Stories
                </Link>
                <Link
                  className="font-jost inline-flex items-center gap-3 border-b border-[rgba(197,212,191,1)] pb-[6px] text-[11px] font-normal tracking-[0.12em] text-[rgb(var(--hero-muted))] transition hover:border-[rgb(var(--hero-sage-dark))] hover:text-[rgb(var(--hero-sage-dark))]"
                  href={latestPost ? `/blog/${latestPost.slug}` : "/blog"}
                >
                  Latest Post
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div
                className="hero-fade-up mt-10 flex flex-wrap gap-2.5"
                style={{ animationDelay: "0.46s" }}
              >
                {categoryLinks.map((category) => (
                  <Link
                    className="font-jost rounded-full border border-[rgba(143,166,138,0.35)] bg-[rgba(143,166,138,0.08)] px-5 py-[7px] text-[10px] font-normal uppercase tracking-[0.18em] text-[rgb(var(--hero-sage-dark))] transition hover:border-[rgb(var(--hero-sage))] hover:bg-[rgb(var(--hero-sage))] hover:text-white"
                    href={`/blog?category=${category.slug}`}
                    key={category.id}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative h-[calc(100vh-120px)] min-h-[620px] overflow-hidden">
              <div className="pointer-events-none absolute -right-[88px] -top-[46px] h-[300px] w-[300px] rounded-full border border-[rgba(196,162,90,0.18)]" />
              <div className="pointer-events-none absolute -right-[42px] -top-[2px] h-[220px] w-[220px] rounded-full border border-[rgba(196,162,90,0.1)]" />

              {heroImages.map((image, index) => (
                <div
                  className={`hero-slide-in absolute overflow-hidden rounded bg-[rgb(var(--hero-cream))] ${image.className}`}
                  key={image.src}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    src={image.src}
                  />
                  {index === 0 ? (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(44,42,38,0.72)] to-transparent px-[18px] pb-4 pt-5 text-white">
                      <div className="font-jost mb-2 text-[11px] font-normal uppercase tracking-[0.2em] text-[rgb(var(--hero-gold-light))]">
                        Home Decor - 5 min read
                      </div>
                      <div className="font-playfair text-[16px] font-normal leading-[1.3] text-white">
                        Linen Layering Ideas for
                        <br />
                        an Effortless Summer Home
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}

              <div
                className="hero-fade-up absolute bottom-7 right-6 z-10 flex flex-col gap-1.5 text-right"
                style={{ animationDelay: "0.55s" }}
              >
                <div>
                  <div className="font-playfair text-[22px] font-normal leading-none text-[rgb(var(--hero-charcoal))]">
                    318+
                  </div>
                  <div className="font-jost text-[9px] font-light uppercase tracking-[0.18em] text-[rgb(var(--hero-muted))]">
                    Pinterest saves
                  </div>
                </div>
                <div className="h-px w-full bg-[rgba(143,166,138,0.25)]" />
                <div>
                  <div className="font-playfair text-[22px] font-normal leading-none text-[rgb(var(--hero-charcoal))]">
                    {blogs.length || 6}
                  </div>
                  <div className="font-jost text-[9px] font-light uppercase tracking-[0.18em] text-[rgb(var(--hero-muted))]">
                    Editorial posts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 px-10">
        <Reveal>
          <div className="border-b border-[rgba(143,166,138,0.22)] px-0 pb-7">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[480px]">
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="h-px w-7 bg-[rgb(var(--hero-gold))]" />
                  <span className="font-jost text-[10px] font-normal uppercase tracking-[0.28em] text-[rgb(var(--hero-gold))]">
                    Latest from the blog
                  </span>
                </div>
                <h2 className="font-playfair text-[38px] font-normal leading-[1.15] text-[rgb(var(--hero-charcoal))]">
                  Stories worth{" "}
                  <em className="italic text-[rgb(var(--hero-rose))]">
                    saving
                  </em>
                </h2>
                <p className="font-cormorant mt-2 text-[17px] font-light italic leading-[1.6] text-[rgb(var(--hero-muted))]">
                  Editorial posts arranged like a living inspiration board
                </p>
              </div>

              <div className="flex flex-col gap-3.5 lg:items-end">
                <Link
                  className="font-jost inline-flex items-center gap-1.5 border-b border-[rgb(var(--hero-sage-light))] pb-0.5 text-[11px] font-normal uppercase tracking-[0.16em] text-[rgb(var(--hero-sage-dark))] transition hover:border-[rgb(var(--hero-rose))] hover:text-[rgb(var(--hero-rose))]"
                  href="/blog"
                >
                  View all stories
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {latestFeatured ? (
          <Reveal delay={0.08}>
            <Link
              className="grid overflow-hidden rounded-2xl border border-[rgba(143,166,138,0.22)] bg-[rgb(var(--hero-warm-white))] transition hover:border-[rgba(143,166,138,0.45)] lg:grid-cols-[1.1fr_1fr]"
              href={`/blog/${latestFeatured.slug}`}
            >
              <div className="relative h-[320px] overflow-hidden bg-[rgb(var(--hero-cream))] md:h-[400px]">
                {isRenderableImageUrl(latestFeatured.featuredImage) ? (
                  <Image
                    alt={latestFeatured.title}
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    src={latestFeatured.featuredImage as string}
                  />
                ) : (
                  <div className="h-full w-full bg-[rgb(var(--hero-cream))]" />
                )}
                <div className="font-jost absolute left-5 top-5 rounded-sm bg-[rgb(var(--hero-rose))] px-3.5 py-[5px] text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                  Featured
                </div>
              </div>

              <div className="flex flex-col justify-center bg-[rgb(var(--hero-cream))] px-8 py-10 md:px-10 md:py-11">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-jost rounded-full border border-[rgba(143,166,138,0.3)] bg-[rgba(143,166,138,0.13)] px-3 py-1 text-[10px] font-normal uppercase tracking-[0.18em] text-[rgb(var(--hero-sage-dark))]">
                    {latestFeatured.category?.name ?? "Editorial"}
                  </span>
                  <span className="h-[3px] w-[3px] rounded-full bg-[rgb(var(--hero-sage-light))]" />
                  <span className="font-jost text-[11px] font-light tracking-[0.05em] text-[rgb(var(--hero-muted))]">
                    {formatCompactDate(latestFeatured.createdAt)}
                  </span>
                  <span className="h-[3px] w-[3px] rounded-full bg-[rgb(var(--hero-sage-light))]" />
                  <span className="font-jost text-[11px] font-light text-[rgb(var(--hero-muted))]">
                    {latestFeatured.readingTime} min read
                  </span>
                </div>

                <h3 className="font-playfair mb-3.5 text-[26px] font-normal leading-[1.3] text-[rgb(var(--hero-charcoal))]">
                  {latestFeatured.title}
                </h3>
                <p className="font-jost mb-7 text-[14px] font-light leading-[1.75] text-[rgb(var(--hero-muted))]">
                  {latestFeatured.excerpt}
                </p>

                <div className="font-jost inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[rgb(var(--hero-charcoal))] transition hover:text-[rgb(var(--hero-rose))]">
                  <span className="h-px w-6 bg-current transition-all duration-300 hover:w-9" />
                  Read article
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {latestFeatured.tags.slice(0, 3).map((tag) => (
                    <span
                      className="font-jost rounded-full border border-[rgba(143,166,138,0.22)] px-2.5 py-[3px] text-[10px] font-light tracking-[0.1em] text-[rgb(var(--hero-muted))]"
                      key={tag.id}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <Reveal delay={0.12}>
          <div className="grid gap-5 lg:grid-cols-3">
            {latestGrid.map((blog) => (
              <Link
                className="overflow-hidden rounded-xl border border-[rgba(143,166,138,0.22)] bg-[rgb(var(--hero-warm-white))] transition hover:border-[rgba(143,166,138,0.45)]"
                href={`/blog/${blog.slug}`}
                key={blog.id}
              >
                <div className="relative h-[200px] overflow-hidden bg-[rgb(var(--hero-cream))]">
                  {isRenderableImageUrl(blog.featuredImage) ? (
                    <Image
                      alt={blog.title}
                      className="object-cover transition duration-500 hover:scale-105"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      src={blog.featuredImage as string}
                    />
                  ) : (
                    <div className="h-full w-full bg-[rgb(var(--hero-cream))]" />
                  )}
                </div>
                <div className="px-[22px] pb-[22px] pt-5">
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <span className="font-jost text-[9px] font-normal uppercase tracking-[0.2em] text-[rgb(var(--hero-sage-dark))]">
                      {blog.category?.name ?? "Editorial"}
                    </span>
                    <span className="font-jost text-[10px] font-light text-[rgb(var(--hero-muted))]">
                      {blog.readingTime} min
                    </span>
                  </div>
                  <h3 className="font-playfair mb-2 text-[16px] font-normal leading-[1.4] text-[rgb(var(--hero-charcoal))]">
                    {blog.title}
                  </h3>
                  <p className="font-jost mb-4 text-[12px] font-light leading-[1.7] text-[rgb(var(--hero-muted))]">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-[rgba(143,166,138,0.22)] pt-3.5">
                    <span className="font-jost text-[10px] font-light tracking-[0.05em] text-[rgb(var(--hero-muted))]">
                      {formatCompactDate(blog.createdAt)}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(143,166,138,0.22)] text-[rgb(var(--hero-sage-dark))] transition hover:bg-[rgb(var(--hero-sage))] hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        {latestList.length ? (
          <Reveal delay={0.16}>
            <div className="grid gap-4 lg:grid-cols-2">
              {latestList.map((blog) => (
                <Link
                  className="flex gap-4 rounded-md border border-[rgba(143,166,138,0.22)] bg-[rgb(var(--hero-warm-white))] p-4 transition hover:border-[rgba(143,166,138,0.45)]"
                  href={`/blog/${blog.slug}`}
                  key={blog.id}
                >
                  <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded">
                    {isRenderableImageUrl(blog.featuredImage) ? (
                      <Image
                        alt={blog.title}
                        className="object-cover transition duration-500 hover:scale-105"
                        fill
                        sizes="88px"
                        src={blog.featuredImage as string}
                      />
                    ) : (
                      <div className="h-full w-full bg-[rgb(var(--hero-cream))]" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-[5px]">
                    <span className="font-jost text-[9px] font-normal uppercase tracking-[0.2em] text-[rgb(var(--hero-sage-dark))]">
                      {blog.category?.name ?? "Editorial"}
                    </span>
                    <span className="font-playfair text-[14px] font-normal leading-[1.35] text-[rgb(var(--hero-charcoal))]">
                      {blog.title}
                    </span>
                    <div className="font-jost flex items-center gap-1.5 text-[10px] font-light text-[rgb(var(--hero-muted))]">
                      <span>{formatCompactDate(blog.createdAt)}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-[rgb(var(--hero-sage-light))]" />
                      <span>{blog.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}
      </section>

      {/* <section className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            description="Categories are structured around Pinterest-worthy content themes that still read like polished editorial sections."
            eyebrow="Browse"
            title="Collections built around visual search intent"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                className="rounded-[2rem] border border-line bg-card/90 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-float"
                href={`/blog?category=${category.slug}`}
                key={category.id}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-stone">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-3xl text-foreground">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone">
                  Pins, product moments, and stories shaped for readers who
                  click through from visual inspiration.
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section> */}

      {/* <section className="section-shell space-y-8">
        <Reveal>
          <SectionHeading
            description="These are the stories currently earning the strongest attention signals and click-ready momentum."
            eyebrow="Trending"
            title="High-performing posts with strong save and revisit energy"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-6 lg:grid-cols-4">
            {trendingBlogs.map((blog) => (
              <Card className="bg-white/85" key={blog.id}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone">
                      {blog.views} views
                    </span>
                    <span className="rounded-full bg-sage/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                      {blog.readingTime} min read
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {blog.title}
                  </h3>
                  <p className="text-sm leading-7 text-stone">{blog.excerpt}</p>
                  <Link
                    className="text-sm font-semibold text-foreground"
                    href={`/blog/${blog.slug}`}
                  >
                    View story
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </section> */}

      <section className="section-shell space-y-8">
        <Reveal>
          <SectionHeading
            description="Product cards are woven into stories without breaking the editorial tone, making affiliate content feel considered instead of pushy."
            eyebrow="Products"
            title="Elegant buying moments designed for editorial trust"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productShowcase.map((product) => (
              <ProductCard
                blogHref={`/blog/${product.blogSlug}`}
                key={`${product.blogSlug}-${product.id}`}
                product={product}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <Reveal>
          <NewsletterCard />
        </Reveal>
      </section>
    </div>
  );
}
