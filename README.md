# CuratedCounter Web

The `web` package is the frontend application for CuratedCounter. It contains the public editorial experience and the protected admin interface used to manage blogs, media, AI-assisted content, and analytics.

## Frontend responsibilities

This package is responsible for:

- rendering the public Pinterest-inspired editorial site
- serving public pages such as homepage, blog index, blog detail, categories, search, about, and contact
- hosting the admin dashboard for login, blog creation, editing, analytics, and media management
- fetching live data from the backend and falling back to local mock content when necessary
- managing cookie-based admin auth against the backend
- rendering branded placeholder media when uploaded assets are synthetic or missing
- sending client-side blog visit events so the backend can store total and unique visit counts

## Runtime architecture

### Rendering model

- The app uses Next.js 15 App Router.
- Public routes are primarily server-rendered and load data through `src/services/content.ts`.
- Admin routes are client-heavy and use React Query, Axios, React Hook Form, Zod, and Zustand.
- Global providers install the React Query client and the toast system for the entire app.

### Data flow model

1. Public pages call `src/services/content.ts` from server components.
2. That content layer fetches backend endpoints using `siteConfig.apiUrl`.
3. When the API is unreachable, the content layer falls back to `src/constants/mock-content.ts`.
4. Admin routes use the Axios wrappers in `src/services/api/`.
5. Authenticated client requests retry automatically through the refresh endpoint on 401 responses.

### Auth model

- Login happens through the backend auth endpoints.
- Cookies are HTTP-only and set by the backend.
- `middleware.ts` blocks admin pages when the access-token cookie is missing.
- `use-auth-session.ts` requests `/auth/me` and syncs the user into Zustand.
- Axios requests use `withCredentials: true` so the browser sends cookies to the API.

## Package root reference

| Path                   | Purpose                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `.env.example`         | Example frontend environment configuration for local setup and deployments.                                |
| `.env.local`           | Local frontend runtime configuration. Not for source control.                                              |
| `.gitignore`           | Frontend-local ignore rules for env files, Next build output, and caches.                                  |
| `package.json`         | Frontend scripts and dependency declarations.                                                              |
| `tsconfig.json`        | Frontend TypeScript configuration. It is self-contained so Vercel can build `web` as its own project root. |
| `next.config.ts`       | Next.js configuration, including remote image allowlisting.                                                |
| `next-env.d.ts`        | Next.js ambient type file.                                                                                 |
| `postcss.config.js`    | PostCSS configuration used by Tailwind CSS.                                                                |
| `tailwind.config.ts`   | Tailwind content scanning and design token setup.                                                          |
| `components.json`      | Local component-generator conventions for the UI component set.                                            |
| `middleware.ts`        | Next.js middleware protecting admin routes via auth cookie presence.                                       |
| `README.md`            | This frontend reference document.                                                                          |
| `src/`                 | Frontend source code.                                                                                      |
| `.next/`               | Generated Next.js build output and caches. Local only.                                                     |
| `node_modules/`        | Installed dependencies. Generated locally or by the deploy platform.                                       |
| `tsconfig.tsbuildinfo` | TypeScript incremental cache. Generated locally.                                                           |

## Source tree reference

### `src/app/`

| Path                    | Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `src/app/globals.css`   | Global CSS variables, theme tokens, resets, utilities, and shared visual language. |
| `src/app/layout.tsx`    | Root layout. Sets metadata, fonts, and global providers.                           |
| `src/app/loading.tsx`   | Global loading state UI.                                                           |
| `src/app/not-found.tsx` | Global 404 UI.                                                                     |
| `src/app/robots.ts`     | Robots metadata route.                                                             |
| `src/app/sitemap.ts`    | Sitemap metadata route generated from live or fallback blog data.                  |

### `src/app/(public)/`

| Path                                    | Purpose                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/app/(public)/layout.tsx`           | Shared shell for public pages, typically navbar and footer composition.                                       |
| `src/app/(public)/page.tsx`             | Homepage. Renders featured, trending, and product-focused editorial sections.                                 |
| `src/app/(public)/about/page.tsx`       | About page.                                                                                                   |
| `src/app/(public)/blog/page.tsx`        | Blog listing page with search, category filters, masonry layout, and pagination.                              |
| `src/app/(public)/blog/[slug]/page.tsx` | Blog detail page. Loads the blog by slug, renders related stories and products, and mounts the visit tracker. |
| `src/app/(public)/categories/page.tsx`  | Category overview page.                                                                                       |
| `src/app/(public)/contact/page.tsx`     | Contact page.                                                                                                 |
| `src/app/(public)/login/page.tsx`       | Public login screen used for admin sign-in.                                                                   |
| `src/app/(public)/search/page.tsx`      | Search results page driven by query params.                                                                   |

### `src/app/(admin)/`

| Path                                      | Purpose                                                       |
| ----------------------------------------- | ------------------------------------------------------------- |
| `src/app/(admin)/layout.tsx`              | Shared protected admin layout.                                |
| `src/app/(admin)/analytics/page.tsx`      | Admin analytics page using backend summary and trending data. |
| `src/app/(admin)/blogs/page.tsx`          | Blog management list.                                         |
| `src/app/(admin)/create-blog/page.tsx`    | Blog creation page.                                           |
| `src/app/(admin)/dashboard/page.tsx`      | Admin overview dashboard.                                     |
| `src/app/(admin)/edit-blog/[id]/page.tsx` | Existing blog editing page.                                   |
| `src/app/(admin)/media/page.tsx`          | Media management page.                                        |

### `src/components/blog/`

| Path                                         | Purpose                                                                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/components/blog/blog-card.tsx`          | Blog preview card used in public listings. Shows category, reading time, date, and fallback media handling. |
| `src/components/blog/blog-visit-tracker.tsx` | Client-only tracker that sends a visitor id to the backend when a blog detail page loads.                   |
| `src/components/blog/masonry-grid.tsx`       | Pinterest-style masonry grid for blog collections.                                                          |
| `src/components/blog/product-card.tsx`       | Product recommendation card used in blog detail pages and related surfaces.                                 |

### `src/components/dashboard/`

| Path                                       | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| `src/components/dashboard/metric-card.tsx` | Compact analytics and dashboard metric card. |

### `src/components/forms/`

| Path                                          | Purpose                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/forms/ai-generator-panel.tsx` | Admin-side AI tool panel for generating blog body, SEO text, and related writing assistance.                                                           |
| `src/components/forms/blog-form.tsx`          | Main authoring form for create/edit blog flows. Handles slug preview, generated public URL preview, uploads, tags, products, SEO, and save operations. |
| `src/components/forms/image-upload-field.tsx` | Upload field that posts images to the backend and renders either a real preview or placeholder state.                                                  |
| `src/components/forms/login-form.tsx`         | Admin login form.                                                                                                                                      |
| `src/components/forms/rich-editor.tsx`        | Tiptap-based rich text authoring surface.                                                                                                              |

### `src/components/layout/`

| Path                                    | Purpose                                                      |
| --------------------------------------- | ------------------------------------------------------------ |
| `src/components/layout/admin-shell.tsx` | Shared admin navigation shell.                               |
| `src/components/layout/footer.tsx`      | Public footer.                                               |
| `src/components/layout/navbar.tsx`      | Public navbar driven by the configured navigation structure. |

### `src/components/shared/`

| Path                                          | Purpose                                                    |
| --------------------------------------------- | ---------------------------------------------------------- |
| `src/components/shared/category-pills.tsx`    | Category filter and selector UI for public pages.          |
| `src/components/shared/media-placeholder.tsx` | Branded placeholder block for synthetic or missing images. |
| `src/components/shared/newsletter-card.tsx`   | Editorial callout card component.                          |
| `src/components/shared/pagination.tsx`        | Pagination controls for paginated content lists.           |
| `src/components/shared/providers.tsx`         | Client-side provider wrapper for React Query and toasts.   |
| `src/components/shared/reveal.tsx`            | Motion wrapper for staged reveal animations.               |
| `src/components/shared/search-bar.tsx`        | Search form component used on content discovery pages.     |
| `src/components/shared/section-heading.tsx`   | Reusable title and subtitle wrapper for major sections.    |
| `src/components/shared/share-buttons.tsx`     | Share and copy-link controls for blog detail pages.        |

### `src/components/ui/`

| Path                             | Purpose                                    |
| -------------------------------- | ------------------------------------------ |
| `src/components/ui/badge.tsx`    | Shared badge primitive.                    |
| `src/components/ui/button.tsx`   | Shared button primitive.                   |
| `src/components/ui/card.tsx`     | Shared card primitive.                     |
| `src/components/ui/dialog.tsx`   | Shared dialog primitive based on Radix UI. |
| `src/components/ui/input.tsx`    | Shared input primitive.                    |
| `src/components/ui/skeleton.tsx` | Shared loading placeholder primitive.      |
| `src/components/ui/textarea.tsx` | Shared textarea primitive.                 |

### `src/config/`

| Path                 | Purpose                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `src/config/site.ts` | Central frontend runtime configuration: site URL, API URL, public navigation, and admin navigation. |

### `src/constants/`

| Path                            | Purpose                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `src/constants/mock-content.ts` | Fallback blog, product, category, and tag content used when the backend is unavailable. |

### `src/hooks/`

| Path                            | Purpose                                                             |
| ------------------------------- | ------------------------------------------------------------------- |
| `src/hooks/use-auth-session.ts` | Loads the current backend session and syncs it into the auth store. |

### `src/lib/`

| Path                      | Purpose                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `src/lib/api-error.ts`    | Extracts readable user-facing error messages from Axios and backend response shapes.      |
| `src/lib/firebase.ts`     | Frontend Firebase app initialization helper for the configured public project settings.   |
| `src/lib/media.ts`        | Media helpers for identifying valid renderable image URLs and powering placeholder logic. |
| `src/lib/query-client.ts` | Shared React Query client factory.                                                        |
| `src/lib/utils.ts`        | Shared frontend utilities such as class merging and date formatting.                      |

### `src/services/`

| Path                      | Purpose                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/services/content.ts` | Server-side content aggregation layer for public pages. Fetches live API data and falls back to mock content. |

### `src/services/api/`

| Path                             | Purpose                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/services/api/ai.ts`         | Frontend wrapper for backend AI endpoints.                                                 |
| `src/services/api/auth.ts`       | Login, logout, refresh, and current-user API helpers.                                      |
| `src/services/api/blogs.ts`      | Blog CRUD and summary API wrapper.                                                         |
| `src/services/api/client.ts`     | Shared Axios instance with `withCredentials` enabled and automatic refresh retry behavior. |
| `src/services/api/taxonomies.ts` | Category and tag API helpers.                                                              |
| `src/services/api/uploads.ts`    | Upload API helpers used by image fields.                                                   |

### `src/store/`

| Path                      | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `src/store/auth-store.ts` | Zustand store holding user and auth status. |

### `src/types/`

| Path                | Purpose                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `src/types/api.ts`  | Shared API response and pagination types.                              |
| `src/types/auth.ts` | Auth-related frontend types.                                           |
| `src/types/blog.ts` | Shared blog, category, tag, and product types used throughout the app. |

## Detailed frontend architecture

### Public content pipeline

`src/services/content.ts` is the core read layer for the public site.

- It requests blog, category, and tag data from the backend.
- It uses Next.js fetch revalidation so public pages can cache and refresh over time.
- It falls back to curated local mock content when the backend is unavailable.
- It powers the homepage, blog listing, blog detail pages, category overview, search pages, sitemap generation, and some metadata flows.

### Admin application pipeline

The admin application combines:

- React Hook Form and Zod for validation and form state
- React Query for reads, writes, and invalidation
- Zustand for shared auth state
- Axios for API calls and refresh-aware retries
- Tiptap for rich-text authoring

The main authoring surface is `src/components/forms/blog-form.tsx`.

Key current publishing behavior:

- title can auto-drive slug generation
- the form previews the eventual public URL using the current slug
- the form no longer asks the editor for a Pinterest destination URL
- after create succeeds, the final saved public blog URL is copied to the clipboard

### Blog detail and visit tracking pipeline

1. The public blog card links to `/blog/[slug]`.
2. The detail page loads the blog through `getBlogBySlug`.
3. The page renders story content, related posts, and product recommendations.
4. `BlogVisitTracker` runs in the browser and posts a visitor id to the backend.
5. The backend increments total views for every visit and increments unique views only for first-time visitors to that blog.

### Media fallback strategy

The frontend works with two classes of image references:

- real HTTP(S) URLs from Firebase Storage or other allowed sources
- synthetic placeholder URLs returned by the backend when Firebase is unavailable

`src/lib/media.ts` detects which case applies. Components such as `blog-card.tsx`, `product-card.tsx`, `image-upload-field.tsx`, and `media-placeholder.tsx` render branded placeholder blocks instead of broken images.

### Auth protection model

- `middleware.ts` blocks admin pages when the access-token cookie is missing.
- `use-auth-session.ts` calls `/auth/me` and syncs the result to Zustand.
- `src/services/api/client.ts` retries 401s by calling `/auth/refresh` once before replaying the original request.
- This flow depends on the backend setting cross-site-safe cookies in production.

## Environment variables

The frontend mainly relies on:

- `NEXT_PUBLIC_SITE_URL`: canonical site URL and base used for runtime blog URL generation
- `NEXT_PUBLIC_API_URL`: backend base URL used by public fetches and admin API calls
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase public config value
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase public config value
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project id
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase public config value
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase public config value
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: Firebase public config value

## Build and deployment notes

### Vercel

- Root Directory: `web`
- Build Command: `npm run build`
- The package `tsconfig.json` is self-contained so Vercel can build `web` without needing a parent workspace config file.

### Generic Node hosts or Render web services

- Root Directory: `web`
- Build Command: `npm install; npm run build`
- Start Command: `npm start`

## Latest implemented frontend changes

- Self-contained `tsconfig.json` for single-app cloud builds.
- Blog detail pages now show total views and unique visitors.
- `BlogVisitTracker` sends client-side visit events to the backend.
- Admin blog create/edit form now previews the direct public blog URL.
- The Pinterest destination field was removed from the current blog publish flow.
- Successful blog creation copies the final public blog URL to the clipboard.
- Media placeholder handling is integrated across listing cards, detail pages, products, and upload previews.

## Build and operations

| Command             | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Starts the Next.js development server.  |
| `npm run build`     | Produces the production Next.js build.  |
| `npm run start`     | Runs the production build.              |
| `npm run lint`      | Runs the Next.js lint workflow.         |
| `npm run typecheck` | Runs TypeScript without emitting files. |

## Relationship to the rest of the monorepo

- The frontend depends on the backend for live auth, editorial content, taxonomies, uploads, and AI generation.
- It does not talk directly to PostgreSQL, Firebase Admin, or OpenAI.
- Public pages are designed to remain useful even when the backend is unavailable, thanks to the mock-content fallback layer.
