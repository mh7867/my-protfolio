/**
 * Every case study on the site, as data. A new project is one more entry here:
 * the home page block, /work/[slug], the footer list, the sitemap and the
 * next-project link all read from this list.
 */

export type Frame = "browser" | "phone" | "none";

export type Media = {
  type: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The chrome drawn around it. */
  frame?: Frame;
  /** Shown in the browser frame's address bar. */
  url?: string;
  caption?: string;
  /** CSS object-position when the media is cropped to fill a box. Top by default. */
  focus?: string;
  /** Videos only. */
  poster?: string;
  /** Videos only: a narrated film gets controls instead of a silent loop. */
  sound?: boolean;
};

export type Feature = { title: string; body: string };

export type Note = {
  title: string;
  body: string;
  code?: { file: string; lang: string; source: string };
};

export type Theme = { bg: string; fg: string; muted: string; accent: string; line: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  client: string;
  role: string;
  platform: string;
  summary: string;
  intro: string;
  theme: Theme;
  links: { label: string; href: string }[];
  stack: string[];
  facts: { value: string; label: string }[];
  tags: string[];
  /** On the home page. */
  cover: Media;
  /** At the top of the case study; the cover when absent. */
  hero?: Media;
  brief: string;
  built: string;
  pipeline: { title: string; caption: string; steps: { label: string; detail: string }[]; loop?: string };
  features: { group: string; items: Feature[] }[];
  gallery: Media[];
  notes: Note[];
};

const D = { width: 2880, height: 1620 }; // 1920×1080 captures @2x
const L = { width: 1600, height: 900 }; // App Store listing art
const M = { width: 900, height: 1948 }; // phone captures

const img = (src: string, alt: string, size: { width: number; height: number }, extra: Partial<Media> = {}): Media => ({
  type: "image",
  src,
  alt,
  ...size,
  frame: "browser",
  ...extra,
});

export const projects: Project[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "smartsynclink",
    name: "SmartSyncLink",
    kind: "Marketing site + AI CMS",
    year: "2026",
    client: "SmartSyncLink, lead-automation agency (US)",
    role: "Full-stack: site, CMS, AI, integrations",
    platform: "Next.js 16 · Neon Postgres · Vercel",
    summary:
      "The public site and the whole CMS behind it: a visual page builder, AI that writes and designs sections, a blog that publishes itself, and bookings straight into GoHighLevel.",
    intro:
      "SmartSyncLink sells AI receptionists, smart inboxes and booking funnels to local businesses. They wanted a fast, animated site that their own team could edit — every page, section and post — without a developer. I built the site and a complete admin for it, with AI available in every editor.",
    theme: { bg: "#2b23e8", fg: "#ffffff", muted: "#cfccff", accent: "#fde047", line: "rgba(255,255,255,.2)" },
    links: [
      { label: "Live site", href: "https://smartsynclink.com" },
      { label: "Source", href: "https://github.com/hamzasispn/smartsynclink" },
    ],
    tags: ["Next.js 16", "Page builder", "Claude API", "Postgres", "GoHighLevel"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Neon Postgres", "Better Auth", "Anthropic SDK", "OpenAI-compatible APIs", "Zod", "GSAP", "Swiper", "sharp", "GoHighLevel API", "Pexels API", "Vercel Cron"],
    facts: [
      { value: "42", label: "blog posts written and published by the AI autopilot" },
      { value: "26", label: "section types in the page builder" },
      { value: "16", label: "widgets for custom sections" },
      { value: "10", label: "AI tasks across the admin" },
    ],
    cover: img("/work/smartsynclink/builder-ai.webp", "SmartSyncLink page builder with Customize with AI open on the selected section", D, { url: "smartsynclink.com/admin/builder" }),
    brief:
      "Every change to the old site needed a developer: new industry pages, pricing edits, blog posts. The team wanted to run the site themselves, keep the design consistent, and publish content every week without writing it by hand.",
    built:
      "A Next.js 16 app with two parts. The public site has twenty-plus animated pages, industry landing pages, a blog with filters and a table of contents, and a booking popup that reads live slots from GoHighLevel. The admin has a Shopify-style page builder with a live preview, drafts and version history, a media library, and AI that writes posts, rewrites fields and builds new sections from a description.",
    pipeline: {
      title: "From an AI prompt to the live page",
      caption: "AI output is checked against the section's own fields before it can change anything.",
      steps: [
        { label: "Prompt", detail: "The editor describes a change or a new section, optionally with images." },
        { label: "Model", detail: "Claude or any OpenAI-compatible model, chosen in Settings." },
        { label: "Schema", detail: "The model must answer in a Zod schema built from the section's fields." },
        { label: "conform()", detail: "Unknown keys are dropped; links and media are checked against the library." },
        { label: "Draft", detail: "Applied as a normal edit: undoable, autosaved, not visible to visitors." },
        { label: "Publish", detail: "One click. The last five published versions can be restored." },
      ],
    },
    features: [
      {
        group: "Page builder",
        items: [
          { title: "Structure panel", body: "Add, reorder, rename and hide sections. Header and footer are shared by every page." },
          { title: "Live preview", body: "The real site in an iframe. Click a section to select it, double-click text to edit it in place." },
          { title: "Device preview", body: "Desktop, tablet and mobile views, and per-device visibility for every section." },
          { title: "Page conditions", body: "Show a section on all pages, on some pages, or on all except some." },
          { title: "Global sections", body: "Pricing, steps and the final call to action are shared — edit once, updated everywhere." },
          { title: "Custom sections", body: "Column layouts filled from 16 widgets: headings, media, cards, feature grids, FAQs, stats, logos and more." },
          { title: "Drafts and history", body: "Changes autosave to a draft. Publish when ready, restore any of the last five versions." },
        ],
      },
      {
        group: "AI",
        items: [
          { title: "AI Section Builder", body: "Describe a section and it is built from the site's own widgets, so it matches the design." },
          { title: "Customize with AI", body: "Select a section, the header or the footer and describe what to change." },
          { title: "Rewrite", body: "A rewrite button under every text field." },
          { title: "Any provider", body: "Anthropic's SDK plus one OpenAI-compatible path for OpenAI, Gemini, Groq, DeepSeek, OpenRouter and self-hosted models." },
          { title: "Connection test", body: "Checks the key, base URL, model and JSON support in one request." },
          { title: "Post assists", body: "Write the whole post, suggest titles, write the excerpt, suggest tags." },
        ],
      },
      {
        group: "Blog autopilot",
        items: [
          { title: "Scheduled posts", body: "A Vercel cron runs daily; the autopilot writes every N hours from a topic list, tone, audience and length." },
          { title: "Topic suggestions", body: "AI suggests new topics that don't repeat published posts." },
          { title: "Publish or review", body: "Posts go live automatically or wait as drafts." },
          { title: "Cover images", body: "Pulled from Pexels, resized with sharp and stored in the media library." },
          { title: "No duplicate runs", body: "Each run is claimed by a single SQL statement, so overlapping cron calls can't both write." },
        ],
      },
      {
        group: "Site",
        items: [
          { title: "Industry pages", body: "Contractors, aesthetics, real estate and realtors, each with its own hero, problems, journey and video reels." },
          { title: "Booking popup", body: "Custom UI over the GoHighLevel API: free slots, contact upsert, appointment. Falls back to the GHL widget without keys." },
          { title: "Blog", body: "Category filters, generated table of contents, related posts, newsletter signup." },
          { title: "Media library", body: "Uploads resized to 1920px and served with type-aware URLs." },
          { title: "Inbox", body: "Form submissions and bookings are listed in the admin." },
          { title: "Animation", body: "GSAP reveals, a scrolling website mockup, inbox and phone demos, a funnel slider." },
        ],
      },
    ],
    gallery: [
      img("/work/smartsynclink/builder-ai.webp", "Customize with AI on the bento section", D, { url: "smartsynclink.com/admin/builder", caption: "Page builder: the selected section's fields, each with Rewrite, and Customize with AI." }),
      img("/work/smartsynclink/builder-create.webp", "AI Section Builder dialog", D, { url: "smartsynclink.com/admin/builder", caption: "AI Section Builder: describe a section and it's built from the site's widgets." }),
      img("/work/smartsynclink/builder-mobile.webp", "Builder in mobile preview", D, { url: "smartsynclink.com/admin/builder", caption: "Mobile preview inside the builder." }),
      img("/work/smartsynclink/builder.webp", "Builder with the home page", D, { url: "smartsynclink.com/admin/builder", caption: "The home page in the builder. Global sections are marked in the structure list." }),
      img("/work/smartsynclink/admin-autopilot.webp", "Blog autopilot settings", D, { url: "smartsynclink.com/admin/autopilot", caption: "Blog autopilot: schedule, length, topics, audience, tone and model." }),
      img("/work/smartsynclink/admin-post.webp", "Blog post editor", D, { url: "smartsynclink.com/admin/blog", caption: "Post editor with AI assists, cover image and Markdown toolbar." }),
      img("/work/smartsynclink/admin-overview.webp", "Admin overview", D, { url: "smartsynclink.com/admin", caption: "Overview: 42 published posts, all written by the autopilot." }),
      img("/work/smartsynclink/admin-blog.webp", "Blog list", D, { url: "smartsynclink.com/admin/blog", caption: "Blog list with status and AI badges." }),
      img("/work/smartsynclink/admin-pages.webp", "Pages list", D, { url: "smartsynclink.com/admin/pages", caption: "Every page the site serves." }),
      img("/work/smartsynclink/admin-services.webp", "Services list", D, { url: "smartsynclink.com/admin/services", caption: "Services, each with its own page." }),
      img("/work/smartsynclink/site-hero.webp", "Home page hero", D, { url: "smartsynclink.com", caption: "Home page." }),
      img("/work/smartsynclink/site-bento.webp", "Product bento", D, { url: "smartsynclink.com", caption: "Voice AI, smart inbox and campaigns." }),
      img("/work/smartsynclink/site-suite.webp", "Suite section", D, { url: "smartsynclink.com", caption: "Smart inbox and one-click campaigns." }),
      img("/work/smartsynclink/site-inbox.webp", "Inbox demo", D, { url: "smartsynclink.com", caption: "The inbox and a client site on desktop and phone." }),
      img("/work/smartsynclink/site-website.webp", "Website section", D, { url: "smartsynclink.com", caption: "A client website scrolling inside a browser and a phone." }),
      img("/work/smartsynclink/site-funnel.webp", "Funnel section", D, { url: "smartsynclink.com", caption: "Funnel editor screens in a slider." }),
      img("/work/smartsynclink/site-industries.webp", "Industry cards", D, { url: "smartsynclink.com", caption: "Industry cards linking to their landing pages." }),
      img("/work/smartsynclink/site-pricing.webp", "Pricing", D, { url: "smartsynclink.com", caption: "Pricing plans." }),
    ],
    notes: [
      {
        title: "Validating AI output",
        body: "Model answers can have extra keys, wrong types or broken links. Each answer is compared with the section's default shape: anything that doesn't fit falls back to the current value, images must already be in the media library and links must parse. A bad answer can't break the page.",
        code: {
          file: "lib/builder/conform.ts",
          lang: "ts",
          source: `const fallback = current !== undefined && kind(current) === kind(shape) ? current : shape;
if (kind(next) !== kind(shape)) return fallback;
if (typeof next !== "string") return next;
if (key === "src") return next === "" || media.has(next) ? next : fallback;
if (key === "href") return next === "" || LINK.test(next.trim()) ? next.trim() : fallback;
return next.slice(0, MAX_TEXT);`,
        },
      },
      {
        title: "Preventing duplicate autopilot runs",
        body: "Writing a post can take longer than a serverless function is allowed to run. The run now claims its slot before writing starts, in one statement, so two cron calls arriving together can't both write a post.",
        code: {
          file: "lib/autopilot.ts",
          lang: "sql",
          source: `update blog_autopilot set
  last_run_at = now(),
  next_run_at = now() + make_interval(hours => every_hours),
  last_error  = 'started — no result recorded, the run did not finish'
where id = 1
  and enabled
  and (next_run_at is null
       or next_run_at <= now() + make_interval(hours => every_hours) / 10)
returning id`,
        },
      },
      {
        title: "One integration for all AI providers",
        body: "Most providers support OpenAI's chat completions format, so there are two code paths — Anthropic's SDK and a generic one configured by base URL — and both must return data that matches the caller's schema.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "autorank",
    name: "AutoRank",
    kind: "Shopify app: SEO, content, CRO",
    year: "2026",
    client: "Product — embedded Shopify app",
    role: "Product, design, full-stack, AI",
    platform: "Shopify Admin · React Router 7 · Fly.io",
    summary:
      "An embedded Shopify app that turns one keyword into a topical content plan, writes and publishes the articles, fixes on-page SEO, tracks rankings and audits the store for conversion problems.",
    intro:
      "AutoRank replaces the separate blogging, meta-tag, schema and CRO apps a Shopify store usually installs. Every article goes through one content engine, and every number on screen comes from a real source — Search Console, ShopifyQL, Keyword Planner or a live SERP.",
    theme: { bg: "#0d2a22", fg: "#ecf7f1", muted: "#9cc7b4", accent: "#7ee2b8", line: "rgba(126,226,184,.22)" },
    links: [],
    tags: ["Shopify app", "React Router 7", "Polaris", "Search Console", "Puppeteer"],
    stack: ["React Router 7", "Shopify Polaris", "App Bridge", "Admin GraphQL", "ShopifyQL", "Theme app extension", "Prisma", "PostgreSQL", "Redis + BullMQ", "Puppeteer", "Search Console API", "Keyword Planner", "PageSpeed Insights", "DataForSEO", "Vitest", "Playwright", "Docker", "Fly.io"],
    facts: [
      { value: "1", label: "content engine behind every article" },
      { value: "18", label: "SEO checks per product, post or page" },
      { value: "~40", label: "conversion checks per storefront scan" },
      { value: "83", label: "test files" },
    ],
    cover: img("/work/autorank/app-plan.webp", "AutoRank content plan with its topical map, inside the Shopify admin", D, { url: "admin.shopify.com — AutoRank" }),
    hero: {
      type: "video",
      src: "/work/autorank/promo.mp4",
      poster: "/work/autorank/promo-poster.webp",
      alt: "AutoRank promo film",
      width: 1280,
      height: 720,
      frame: "none",
      sound: true,
      caption: "AutoRank's launch film, made alongside the app.",
    },
    brief:
      "Content is the slowest SEO lever and the one merchants skip. The app had to turn a keyword into a plan, write in the store's voice, publish on a schedule, and then use Search Console data to decide which articles to refresh, expand or drop.",
    built:
      "A full embedded admin app: onboarding with an AI key test, a dashboard, a content planner that draws a topical map, an article engine, a bulk SEO optimizer with live Google preview, rank tracking, technical SEO, alt text from vision models, a headless-Chromium CRO scanner with screenshots and click heatmaps, Google Shopping checks, multi-language SEO, llms.txt, brand-voice training and metered plans — plus a background worker for the schedule.",
    pipeline: {
      title: "The content loop",
      caption: "Every article — manual or scheduled — goes through the same engine and records where it came from: strategy, plan, topic, keyword, cluster.",
      steps: [
        { label: "Seed", detail: "Keywords from the merchant, or suggested from the catalog." },
        { label: "Research", detail: "Catalog, Search Console, Keyword Planner volume and live SERP results." },
        { label: "Topical map", detail: "Clusters, keywords, suggested titles and an FAQ for each cluster." },
        { label: "Plan", detail: "Topics, cadence and duration; activating it versions the strategy." },
        { label: "Write", detail: "Brand voice, outline, internal links, image, FAQ and JSON-LD." },
        { label: "Publish", detail: "To the Shopify blog, or saved as a draft." },
        { label: "Measure", detail: "Daily Search Console data per article decides the next step." },
      ],
      loop: "After about three weeks of data, the next strategy version starts from the articles that performed.",
    },
    features: [
      {
        group: "Content",
        items: [
          { title: "Content planner", body: "Seed keywords become a topical map with clusters, metrics, suggested titles and FAQs." },
          { title: "Keyword opportunities", body: "A 0–100 score from relevance, impressions, position, volume, difficulty and coverage. AI only explains it." },
          { title: "Cannibalization warnings", body: "Shown only when two or more articles target the same primary keyword." },
          { title: "Article engine", body: "Research, outline, writing, featured image, visible FAQ and BlogPosting/FAQPage schema." },
          { title: "Feedback loop", body: "Improve CTR, refresh, continue the cluster or deprioritize — decided by fixed thresholds." },
          { title: "Brand voice", body: "Guidelines, sample content and words to avoid, used in every generation." },
        ],
      },
      {
        group: "On-page SEO",
        items: [
          { title: "Content optimization", body: "Products, posts, collections and pages with score, meta, keywords and per-URL Search Console data." },
          { title: "Bulk fixes", body: "Fill missing meta or optimize a selection, batched to stay inside request limits." },
          { title: "Item editor", body: "Google preview, robots, focus keyword metafield, 18-check audit and an editable FAQ." },
          { title: "Structured data", body: "Product, Organization, Breadcrumb and Article JSON-LD through a theme app embed." },
          { title: "Alt text", body: "Vision models see the actual photo; the app says so when the model can't see." },
          { title: "Languages and links", body: "SEO metadata per locale, internal link suggestions, and a curated llms.txt." },
        ],
      },
      {
        group: "Rankings",
        items: [
          { title: "Rank tracker", body: "Search Console first, weekly live-SERP checks for the rest, a Check now button and 90-day trends." },
          { title: "Opportunities", body: "Queries the store already shows up for but doesn't track." },
          { title: "Keyword research", body: "Ideas with intent and difficulty for any country and language, with real volume." },
          { title: "Technical SEO", body: "Broken links with redirects, HTML sitemap, IndexNow, verification tags, PageSpeed." },
        ],
      },
      {
        group: "Conversion",
        items: [
          { title: "Funnel", body: "Visits, cart, checkout and purchase from ShopifyQL, with the biggest drop-off." },
          { title: "Deep scan", body: "Headless Chromium renders six page types and runs about 40 checks." },
          { title: "Screenshots and heatmap", body: "Desktop and mobile captures with highlighted elements, plus real shopper clicks." },
          { title: "AI audit", body: "Runs only with real screenshots and a vision model. Every fix has a reason and exact steps." },
        ],
      },
      {
        group: "Platform",
        items: [
          { title: "Onboarding", body: "Six steps; you can't continue until the AI key passes a test." },
          { title: "Encrypted keys", body: "AES-256-GCM for stored credentials." },
          { title: "Plans and credits", body: "Monthly caps per AI feature plus a token limit; running out shows a message." },
          { title: "Worker", body: "Redis + BullMQ jobs for content, next cycles and rank snapshots. GDPR and billing webhooks." },
        ],
      },
    ],
    gallery: [
      img("/work/autorank/app-plan.webp", "Topical map", D, { url: "admin.shopify.com — AutoRank", caption: "A content plan: the topical map, then topics with KD, volume and keywords." }),
      img("/work/autorank/app-dash.webp", "Dashboard", D, { url: "admin.shopify.com — AutoRank", caption: "Dashboard: SEO health, PageSpeed, quick actions and real store visitors." }),
      img("/work/autorank/app-hub.webp", "AI content", D, { url: "admin.shopify.com — AutoRank", caption: "AI Content: the Content Planner and Blog Generator with suggested seed keywords." }),
      img("/work/autorank/app-planner.webp", "Content planner", D, { url: "admin.shopify.com — AutoRank", caption: "Planner step one: seed keywords, with AI suggestions from the catalog." }),
      img("/work/autorank/app-seo.webp", "Content optimization", D, { url: "admin.shopify.com — AutoRank", caption: "Content Optimization: every product, post, collection and page with its SEO score." }),
      img("/work/autorank/app-keywords.webp", "Keyword research", D, { url: "admin.shopify.com — AutoRank", caption: "Keyword research and the rank tracker." }),
      img("/work/autorank/app-technical.webp", "Technical SEO", D, { url: "admin.shopify.com — AutoRank", caption: "Technical SEO: broken links, structured data, crawling and verification." }),
      img("/work/autorank/app-cro.webp", "Conversion audit", D, { url: "admin.shopify.com — AutoRank", caption: "CRO: the funnel, deep-scan results and the AI conversion audit." }),
      img("/work/autorank/app-audit.webp", "Site audit", D, { url: "admin.shopify.com — AutoRank", caption: "Site audit with the top issues and one-click fixes." }),
      img("/work/autorank/app-images.webp", "Image optimization", D, { url: "admin.shopify.com — AutoRank", caption: "Image optimization and alt text." }),
      img("/work/autorank/app-shopping.webp", "Google Shopping", D, { url: "admin.shopify.com — AutoRank", caption: "Google Shopping readiness per product." }),
      img("/work/autorank/app-generator.webp", "Blog generator", D, { url: "admin.shopify.com — AutoRank", caption: "Blog Generator: one keyword to a full article." }),
      img("/work/autorank/app-billing.webp", "Plans", D, { url: "admin.shopify.com — AutoRank", caption: "Plans and monthly AI credits." }),
      img("/work/autorank/listing-feature.webp", "AutoRank feature graphic", L, { frame: "none", caption: "App Store feature graphic." }),
    ],
    notes: [
      {
        title: "The feedback loop is deterministic",
        body: "The decision for each article is a pure function over real Search Console numbers with documented thresholds. A model writes the article and the explanation, never the decision or the metric.",
        code: {
          file: "services/performance/analyzer.ts",
          lang: "ts",
          source: `// 1. Ranking but under-clicked → the title/meta is the lever.
if (m.impressions >= cfg.minImpr && m.position <= cfg.ctrPosMax && m.ctr < cfg.weakCtr)
  return { decision: "IMPROVE_CTR", reason: \`Ranks at \${pos(m.position)} but only \${pct(m.ctr)} CTR.\` };
// 2. Striking distance with real demand → refresh and expand.
if (m.position >= cfg.refreshLo && m.position <= cfg.refreshHi && m.impressions >= cfg.minImpr)
  return { decision: "REFRESH_EXPAND", reason: \`Position \${pos(m.position)} — push into page one.\` };
// 3. Winning → double down on the cluster.
if (m.position <= cfg.strongPosMax && m.clicks >= cfg.minClicks)
  return { decision: "CONTINUE_CLUSTER", reason: \`Strong at \${pos(m.position)}. Add supporting articles.\` };`,
        },
      },
      {
        title: "No data, no number",
        body: "If Search Console isn't connected the app shows a dash. If the volume API isn't configured, the column is hidden. If a keyword isn't ranking, the position is empty rather than zero.",
      },
      {
        title: "AI usage is metered",
        body: "The app provides the AI, so every feature has a monthly cap and every call counts against a token limit that also covers features added later. Trials use the free allowance until the first charge.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "hanstaiger-x1",
    name: "Hanstaiger X1",
    kind: "Yacht charter booking system",
    year: "2026",
    client: "Hanstaiger, yacht charters (Mediterranean)",
    role: "Full-stack: Figma to code, payments, admin",
    platform: "Next.js 16 · Supabase · Stripe",
    summary:
      "A four-step booking flow for chartering the X1, built from the Figma prototype, with prices calculated on the server, a Stripe deposit and an admin for yachts, services, availability and reservations.",
    intro:
      "Hanstaiger wanted their own booking flow instead of a third-party widget. It had to match the Figma design exactly and handle the pricing rules of a charter: seasons, minimum nights, included guests, extra-guest charges, optional services and a deposit.",
    theme: { bg: "#16212a", fg: "#eef3f6", muted: "#a2b4c1", accent: "#ff6a1a", line: "rgba(255,255,255,.15)" },
    links: [{ label: "Source", href: "https://github.com/hamzasispn/hanstainger-booking-app" }],
    tags: ["Next.js 16", "Supabase", "Stripe", "Server Actions", "Figma"],
    stack: ["Next.js 16", "Server Actions", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase Postgres", "Supabase Auth", "Row Level Security", "Stripe Checkout", "Stripe webhooks", "Resend", "ICS / Google Calendar", "Vitest", "Playwright", "Figma MCP"],
    facts: [
      { value: "4", label: "booking steps, from dates to deposit" },
      { value: "7", label: "Postgres tables, all behind RLS" },
      { value: "30 min", label: "date hold during checkout" },
      { value: "2", label: "emails per booking: client and team" },
    ],
    cover: img("/work/hanstaiger-x1/book-calendar.webp", "Selecting dates in the Hanstaiger X1 booking flow", D, { url: "hanstaiger — /book/x1" }),
    brief:
      "Charter pricing has many rules: minimum and maximum nights, a season window, blocked days, a number of guests included in the base price, a charge per extra guest, services with per-yacht prices, and a deposit that is a percentage on one yacht and a fixed amount on another. None of it can be trusted to the browser.",
    built:
      "A Next.js App Router app on Supabase. Each step of the wizard saves a booking draft through a Server Action and gets the price back from the server. Checkout validates everything again and opens a Stripe Checkout Session for the deposit. Stripe's signed webhook — not the redirect — confirms the booking, blocks the dates and sends the emails. The admin manages yachts, services, availability and reservations.",
    pipeline: {
      title: "How a booking is confirmed",
      caption: "Prices and availability are recalculated on the server at every step and once more before payment.",
      steps: [
        { label: "Dates", detail: "Checked against min/max nights, the season and blocked days." },
        { label: "Guests", detail: "Included guests, charge per extra guest, maximum capacity." },
        { label: "Services", detail: "Catalog options like a private chef, priced per yacht." },
        { label: "Draft", detail: "Each step saves a booking draft and returns the server total." },
        { label: "Checkout", detail: "Validated again, then a Stripe session for the deposit." },
        { label: "Webhook", detail: "The signed event confirms, blocks the dates and sends emails." },
        { label: "Calendar", detail: "Add-to-calendar for the client, an ICS feed for the team." },
      ],
    },
    features: [
      {
        group: "Booking flow",
        items: [
          { title: "Date range picker", body: "Two months side by side with live availability and a reason when a range isn't allowed." },
          { title: "Guests", body: "Knows the included guests, the extra-guest charge and the yacht's capacity." },
          { title: "Services", body: "A global catalog with options, enabled and priced per yacht." },
          { title: "Running total", body: "Base price, guest extras and services, with the deposit as a percentage or fixed amount." },
          { title: "Resume", body: "The draft lives on the server, linked by a cookie, so a refresh doesn't lose anything." },
          { title: "Pixel-perfect", body: "Desktop and mobile built from the Figma prototype through the Figma MCP server." },
        ],
      },
      {
        group: "Payments",
        items: [
          { title: "Deposit checkout", body: "Stripe Checkout collects the deposit only." },
          { title: "Integer cents", body: "All amounts are stored as integer cents in EUR." },
          { title: "Saved line items", body: "Each booking stores its line items, so later price changes don't affect it." },
          { title: "Webhook confirmation", body: "Only the signed Stripe event can confirm a booking." },
        ],
      },
      {
        group: "Admin",
        items: [
          { title: "Dashboard", body: "Pending payments, confirmed bookings, upcoming charters and deposits collected." },
          { title: "Yachts", body: "Gallery, prices, guests, nights, season and deposit settings." },
          { title: "Services", body: "Catalog, options and per-yacht prices." },
          { title: "Availability", body: "Block days as booked, maintenance or hold." },
          { title: "Reservations", body: "Calendar, list and detail with line items, calendar export and cancellation." },
        ],
      },
      {
        group: "Quality",
        items: [
          { title: "Unit tests", body: "Pricing, money, availability, re-pricing, line items and ICS output in Vitest." },
          { title: "End-to-end test", body: "A Playwright test from date selection to Stripe." },
          { title: "Emails", body: "Resend confirmation for the client and a new-booking email for the team." },
        ],
      },
    ],
    gallery: [
      img("/work/hanstaiger-x1/book-dates.webp", "Step one: select dates", D, { url: "hanstaiger — /book/x1", caption: "Step 1: dates, with the running total on the left." }),
      img("/work/hanstaiger-x1/book-calendar.webp", "Range calendar", D, { url: "hanstaiger — /book/x1", caption: "Two-month range picker." }),
      img("/work/hanstaiger-x1/book-guests.webp", "Guests step", D, { url: "hanstaiger — /book/x1", caption: "Step 2: guests above the included number add a charge." }),
      img("/work/hanstaiger-x1/book-services.webp", "Services step", D, { url: "hanstaiger — /book/x1", caption: "Step 3: private chef, jet skis, spa and water toys." }),
      img("/work/hanstaiger-x1/book-details.webp", "Details step", D, { url: "hanstaiger — /book/x1", caption: "Step 4: details, then the Stripe deposit." }),
      img("/work/hanstaiger-x1/admin-dashboard.webp", "Admin dashboard", D, { url: "hanstaiger — /admin", caption: "Admin dashboard." }),
      img("/work/hanstaiger-x1/admin-reservation.webp", "Reservation detail", D, { url: "hanstaiger — /admin/reservations", caption: "A reservation with its saved line items (contact details blurred)." }),
      img("/work/hanstaiger-x1/admin-yacht-edit.webp", "Yacht settings", D, { url: "hanstaiger — /admin/yachts", caption: "Yacht settings: prices, guests, nights, season and deposit." }),
      img("/work/hanstaiger-x1/admin-services.webp", "Services catalog", D, { url: "hanstaiger — /admin/services", caption: "Services and their options." }),
      img("/work/hanstaiger-x1/admin-availability.webp", "Availability blocks", D, { url: "hanstaiger — /admin/availability", caption: "Blocked days, including dates held by bookings." }),
      img("/work/hanstaiger-x1/book-mobile.webp", "Booking on mobile", M, { frame: "phone", caption: "The flow on a phone." }),
    ],
    notes: [
      {
        title: "Pricing in one function",
        body: "The whole price model is one small function the server runs at every step. It's the most tested code in the app.",
        code: {
          file: "lib/pricing.ts",
          lang: "ts",
          source: `export function computeBreakdown(yacht: YachtPricing, guests: number, options: SelectedOption[]) {
  const base = yacht.basePrice;
  const extraGuests = Math.max(0, guests - yacht.includedGuests);
  const guestExtra = extraGuests * yacht.extraGuestPrice;
  const servicesSum = options.reduce((sum, o) => sum + o.price, 0);
  const total = base + guestExtra + servicesSum;
  const deposit = yacht.depositMode === "percent"
    ? Math.round((total * yacht.depositValue) / 100)
    : yacht.depositValue;
  return { base, guestExtra, servicesSum, total, deposit };
}`,
        },
      },
      {
        title: "A reason for every rejected range",
        body: "When a date range isn't allowed, the API says why — too short, too long, out of season or overlapping a block — and the UI shows it.",
        code: {
          file: "lib/availability.ts",
          lang: "ts",
          source: `const nights = nightsBetween(start, end);
if (nights <= 0) return { ok: false, reason: "invalid_range" };
if (nights < cfg.minNights) return { ok: false, reason: "min_nights" };
if (nights > cfg.maxNights) return { ok: false, reason: "max_nights" };
if (cfg.seasonStart && Date.parse(start) < Date.parse(cfg.seasonStart))
  return { ok: false, reason: "out_of_season" };
for (const b of blocks)
  if (rangesOverlap(start, end, b.start, b.end)) return { ok: false, reason: "unavailable" };
return { ok: true };`,
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "cove",
    name: "Cove",
    kind: "Shopify Theme Store theme",
    year: "2026",
    client: "Product — for the Shopify Theme Store",
    role: "Research, design system, prototype, Liquid build",
    platform: "Shopify OS 2.0 · Liquid · Skeleton theme",
    summary:
      "A multi-industry Shopify theme built on rounded slabs, notched action buttons and glass navigation. Thirteen prototype rounds, 78 sections and 240 layouts, now being built in Liquid.",
    intro:
      "Cove is a theme for brands that sell a small, considered range: skincare, sneakers, furniture, outdoor gear. I took it from niche research and competitor teardowns through thirteen design versions to a working prototype, and I'm building it on Shopify's Skeleton theme for Theme Store review.",
    theme: { bg: "#2a1820", fg: "#f8ece8", muted: "#c9aab3", accent: "#ff4f87", line: "rgba(248,236,232,.16)" },
    links: [],
    tags: ["Shopify theme", "Liquid", "Design system", "Prototype", "4 presets"],
    stack: ["Shopify Liquid", "Online Store 2.0", "Skeleton theme", "Theme blocks", "JavaScript", "CSS custom properties", "Shopify CLI", "Theme Check", "Playwright visual QA"],
    facts: [
      { value: "78", label: "sections in the prototype" },
      { value: "240", label: "section layouts" },
      { value: "4", label: "industry presets" },
      { value: "13", label: "design versions" },
    ],
    cover: img("/work/cove/home-d-0.webp", "Cove theme home page, MIRA skincare preset", D, { url: "Cove — MIRA preset" }),
    brief:
      "Theme Store reviewers reject themes that look like existing ones. The first concept, a candle theme in cream and serif, looked like many others. Cove puts its identity in the interface itself: it has to be recognisable with every photo and word removed, and it has to work for any industry.",
    built:
      "A high-fidelity prototype with home, collection, product, about, contact, cart and search templates; 78 sections in 240 layouts; four industry presets; a library page with every section; and review states for the cart, search, mega menus, quick view and sticky add-to-cart. A design-check script ran on 7 page types × 4 presets at 1440px and 390px with no errors. The Liquid build on Shopify's Skeleton theme has 38 sections so far.",
    pipeline: {
      title: "From research to Liquid",
      caption: "Each version was reviewed in screenshots at desktop and mobile sizes before the next one started.",
      steps: [
        { label: "Research", detail: "Niche selection and teardowns of existing Theme Store themes." },
        { label: "First concept", detail: "A candle theme — dropped for looking like other themes." },
        { label: "Identity", detail: "Slabs on a solid canvas, notched actions, glass only on navigation." },
        { label: "Prototype", detail: "Thirteen versions, 78 sections, 240 layouts, four presets." },
        { label: "Audit", detail: "Design checks on every page type and preset, desktop and mobile." },
        { label: "Liquid build", detail: "Sections, snippets and settings on Shopify's Skeleton theme." },
      ],
    },
    features: [
      {
        group: "Design system",
        items: [
          { title: "Canvas and slabs", body: "One solid preset color behind everything; every section is a rounded slab with a fixed gutter." },
          { title: "Coves", body: "A concave notch in the corner of a slab, tile or card holds its action: next, add, zoom, play." },
          { title: "Glass on navigation only", body: "The floating header, mega menus, dock and labels over photos use glass; content never does." },
          { title: "Four radius tokens", body: "Slab, card, row and tiny — chosen by role and nested concentrically." },
          { title: "Small type scale", body: "Five sizes under 24px plus fluid display sizes capped by slab width." },
          { title: "One accent", body: "The accent marks the next action only." },
        ],
      },
      {
        group: "Buying tools",
        items: [
          { title: "Shop the scene", body: "Hotspots on lifestyle photos that open the product." },
          { title: "Color explorer", body: "The stage takes the color of the selected finish." },
          { title: "Finders and quizzes", body: "Shop by concern, skin type quiz, shop by price." },
          { title: "Compare and bundles", body: "Before/after compare, bundle builder, pairs-well-with." },
          { title: "Quick add from the cove", body: "Opens as a glass sheet from the card's notch." },
          { title: "Sticky add to cart", body: "A compact bar with variant and price on long product pages." },
        ],
      },
      {
        group: "Templates",
        items: [
          { title: "Product page", body: "Three main layouts, subscriptions, pickup availability, accordions." },
          { title: "Collection page", body: "Three filter styles and a promo tile in the grid." },
          { title: "Side cart", body: "Recently viewed tab, gift wrap, order note and upsells." },
          { title: "Mega menus and search", body: "Image mega menus, predictive search overlay." },
          { title: "Localization", body: "Country, currency and language selectors in the footer, mobile menu and some headers." },
        ],
      },
      {
        group: "Presets",
        items: [
          { title: "MIRA", body: "Skincare: soft canvas, plum and rose." },
          { title: "STRIDE", body: "Sneakers: dark, loud display type, orange accent." },
          { title: "HOLM", body: "Furniture: warm neutrals, room scenes." },
          { title: "KINN", body: "The default preset for general stores." },
        ],
      },
    ],
    gallery: [
      img("/work/cove/home-d-0.webp", "MIRA home", D, { url: "Cove — MIRA preset", caption: "MIRA preset: home page." }),
      img("/work/cove/home-pace-d-0.webp", "STRIDE home", D, { url: "Cove — STRIDE preset", caption: "STRIDE preset: the same theme for a sneaker brand." }),
      img("/work/cove/home-hearth-d-0.webp", "HOLM home", D, { url: "Cove — HOLM preset", caption: "HOLM preset: furniture." }),
      img("/work/cove/product-d-0.webp", "Product page", D, { url: "Cove — product", caption: "Product page with subscription option and sticky buy box." }),
      img("/work/cove/collection-d-0.webp", "Collection page", D, { url: "Cove — collection", caption: "Collection page with filters." }),
      img("/work/cove/mega-d-0.webp", "Mega menu", D, { url: "Cove — menu", caption: "Glass mega menu." }),
      img("/work/cove/cart-d-0.webp", "Side cart", D, { url: "Cove — cart", caption: "Side cart with gift wrap and recently viewed." }),
      img("/work/cove/qv-d-0.webp", "Quick view", D, { url: "Cove — quick view", caption: "Quick view." }),
      img("/work/cove/home-d-3.webp", "Skin type quiz", D, { url: "Cove — MIRA preset", caption: "Skin type finder and shop by price." }),
      img("/work/cove/home-d-6.webp", "Before and after", D, { url: "Cove — MIRA preset", caption: "Before/after compare and results." }),
      img("/work/cove/home-hearth-d-1.webp", "Categories and room", D, { url: "Cove — HOLM preset", caption: "Category list with a room scene." }),
      img("/work/cove/home-pace-d-1.webp", "Sneaker drops", D, { url: "Cove — STRIDE preset", caption: "Product rail on the dark STRIDE canvas." }),
      img("/work/cove/library-d-0.webp", "Section library", D, { url: "Cove — library", caption: "The library page: every section and layout." }),
      img("/work/cove/home-m-0.webp", "MIRA on mobile", M, { frame: "phone", caption: "MIRA on mobile." }),
      img("/work/cove/home-pace-m-0.webp", "STRIDE on mobile", M, { frame: "phone", caption: "STRIDE on mobile." }),
      img("/work/cove/product-m-0.webp", "Product on mobile", M, { frame: "phone", caption: "Product page on mobile." }),
    ],
    notes: [
      {
        title: "The cove snippet",
        body: "The notch is one snippet used by slabs, tiles and cards. It takes the color behind the slab through a CSS custom property, so it looks like a cut rather than a button, and it becomes a link, a button or decoration depending on what it's given.",
        code: {
          file: "snippets/cove.liquid",
          lang: "liquid",
          source: `<span class="cove cove--{{ size | default: 'md' }}"{% if label == blank %} aria-hidden="true"{% endif %}>
  {%- if url != blank -%}
    <a class="cove__b" href="{{ url }}" aria-label="{{ label | escape }}">
      {%- render 'icon', name: icon -%}
    </a>
  {%- elsif label != blank -%}
    <button class="cove__b" type="button" aria-label="{{ label | escape }}" {{ attrs }}>
      {%- render 'icon', name: icon -%}
    </button>
  {%- else -%}
    <span class="cove__b">{%- render 'icon', name: icon -%}</span>
  {%- endif -%}
</span>`,
        },
      },
      {
        title: "Recognisable without content",
        body: "Every version was tested with photos and text removed. If the page still looked like stacked slabs with notched corners, the identity was in the theme and not in the demo content — that's the test the first concept failed.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: "shotbook",
    name: "Shotbook",
    kind: "Group memory-book platform",
    year: "2026",
    client: "Shotbook (shopshotbook.com)",
    role: "Full-stack: API, React app, payments, security, QA",
    platform: "FastAPI · React 19 · MongoDB · Render",
    summary:
      "Friends each add a page, Shotbook puts the pages into one print-ready book, the creator approves a proof, and the book is printed and shipped. Contributors don't need an account.",
    intro:
      "Shotbook makes a printed book from pages made by a group of friends. The creator invites people with a link, everyone uploads a page, and the creator reviews and orders the book. The work was making it safe: other people's photos, payments, and a physical product that can't be changed after printing.",
    theme: { bg: "#13203d", fg: "#f6f1e8", muted: "#aeb7cc", accent: "#f5b8cb", line: "rgba(255,255,255,.15)" },
    links: [{ label: "Live app", href: "https://shotbook.onrender.com" }],
    tags: ["Python", "FastAPI", "React 19", "MongoDB", "Stripe"],
    stack: ["Python 3.11", "FastAPI", "Pydantic v2", "MongoDB (motor)", "GridFS", "pikepdf", "React 19", "Vite", "TypeScript (strict)", "Tailwind CSS v4", "shadcn/ui", "Stripe", "Resend", "pytest", "Vitest", "Playwright", "Docker", "Render"],
    facts: [
      { value: "0", label: "accounts needed to contribute" },
      { value: "67", label: "pytest test files" },
      { value: "3", label: "book sizes: 23, 30 or 45 pages" },
      { value: "1", label: "print-ready PDF per book" },
    ],
    cover: img("/work/shotbook/hero.webp", "Shotbook home page", D, { url: "shotbook.onrender.com" }),
    brief:
      "In the prototype, every contributor link carried the same credential and anyone in the group could replace a friend's page. Uploads were trusted on the browser's word and nothing separated a test payment from a real one. The backend needed to be rebuilt to be trusted with people's photos and money.",
    built:
      "A FastAPI service with thin routers over domain modules — pricing, commerce, shipping, proofs, print files, approvals, tokens, signed URLs, rate limits — and a strict-TypeScript React app. Contributors get one token per slot, uploads are parsed on the server, the print file follows the creator's order, and only a verified Stripe webhook can mark an order paid.",
    pipeline: {
      title: "From invite link to printed book",
      caption: "The server decides prices, totals and order status; the browser never sends them.",
      steps: [
        { label: "Create", detail: "Choose the occasion and size: 23, 30 or 45 pages." },
        { label: "Invite", detail: "Each friend gets a link tied to one page slot." },
        { label: "Contribute", detail: "A page PDF, parsed with pikepdf before it's accepted." },
        { label: "Arrange", detail: "Order the pages; request changes with one-time revision links." },
        { label: "Proof", detail: "One print-ready PDF in the saved order, approved before payment." },
        { label: "Pay", detail: "Server-priced checkout; only the signed webhook marks it paid." },
        { label: "Print", detail: "Internal print queue with history and packing sheets." },
      ],
    },
    features: [
      {
        group: "Creator",
        items: [
          { title: "Create a book", body: "Three sizes from one server-side price list." },
          { title: "People and pages", body: "Who's invited, who's done, and every page as it arrives." },
          { title: "Request changes", body: "A one-time revision link for a single page, which can be withdrawn." },
          { title: "Print order", body: "Arrange pages; the print file follows the saved order." },
          { title: "Proof and checkout", body: "Approve the proof, pay, and track the order." },
        ],
      },
      {
        group: "Contributors",
        items: [
          { title: "No account", body: "A random token resolves on the server to exactly one book and one slot." },
          { title: "Upload checks", body: "Quick feedback in the browser; the real check with pikepdf on the server." },
          { title: "Revision links", body: "Tied to one page and cycle, stored only as SHA-256 hashes." },
          { title: "Thank-you emails", body: "Sent with Resend when a page is submitted." },
        ],
      },
      {
        group: "Security",
        items: [
          { title: "Signed media URLs", body: "Uploads are readable only by the owner's session or a short-lived signed link." },
          { title: "Safe deletion", body: "Files are deleted only by exact id and only when nothing references them." },
          { title: "Payment safeguards", body: "Payments are off by default and live Stripe keys are refused by their prefix." },
          { title: "Headers and cookies", body: "Secure cookies and security headers in production, rate limits on sensitive routes." },
        ],
      },
      {
        group: "Operations",
        items: [
          { title: "Print queue", body: "A role-protected queue of paid orders with append-only history." },
          { title: "Packing sheets", body: "A printable sheet for each job." },
          { title: "Tracking", body: "USPS, UPS and FedEx tracking links." },
          { title: "Email outbox", body: "Test mode keeps emails in an in-app outbox." },
        ],
      },
    ],
    gallery: [
      img("/work/shotbook/hero.webp", "Shotbook home", D, { url: "shotbook.onrender.com", caption: "Home page." }),
      img("/work/shotbook/steps.webp", "How it works", D, { url: "shotbook.onrender.com", caption: "Six steps from link to printed book." }),
      img("/work/shotbook/pricing.webp", "Pricing", D, { url: "shotbook.onrender.com/pricing", caption: "Three sizes from one price list." }),
      img("/work/shotbook/faq.webp", "FAQ", D, { url: "shotbook.onrender.com/faq", caption: "FAQ." }),
      img("/work/shotbook/cta.webp", "Closing call to action", D, { url: "shotbook.onrender.com", caption: "Closing call to action and footer." }),
      img("/work/shotbook/mobile-00.webp", "Mobile home", M, { frame: "phone", caption: "Mobile home." }),
      img("/work/shotbook/mobile-02.webp", "Mobile steps", M, { frame: "phone", caption: "How it works on a phone." }),
    ],
    notes: [
      {
        title: "Prices come from the server",
        body: "Every price comes from one catalog module, and the price saved on an order is never rewritten.",
        code: {
          file: "backend/lib/pricing.py",
          lang: "py",
          source: `def unit_price(tier_id: str) -> float:
    """Server-authoritative price. A client never gets to name its own number."""
    return tier(tier_id).price`,
        },
      },
      {
        title: "File deletion after an incident",
        body: "A one-off cleanup script once missed a reference field and deleted a real upload. Deletion now goes through one module: files are removed only by exact id and only when proven unreferenced.",
      },
      {
        title: "One invite token per slot",
        body: "Contributor links used to be the book's share token plus ?friend=N, so everyone had the same key. Slot tokens are now random strings that map to exactly one book and one slot on the server.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: "financas-lms",
    name: "Finanças Para Todos",
    kind: "WordPress LMS plugin",
    year: "2026",
    client: "Finanças Para Todos, financial education (Portuguese)",
    role: "Architecture, PHP back end, front end, tests",
    platform: "WordPress · PHP 8.3 · MySQL",
    summary:
      "A Khan Academy-style learning platform built from scratch as a WordPress plugin: course paths, video lessons, quizzes, streaks, a certificate designer and a separate admin app.",
    intro:
      "A Portuguese personal-finance education site wanted a Khan Academy-like learning experience on WordPress without an off-the-shelf LMS. I designed and built the whole system as one plugin, with no LMS framework underneath.",
    theme: { bg: "#123b24", fg: "#f3f1e4", muted: "#abc5b0", accent: "#f2c230", line: "rgba(242,194,48,.25)" },
    links: [
      { label: "Live course", href: "https://financasparatodos.org/courses/educacao-financeira/" },
      { label: "Source", href: "https://github.com/hamzasispn/lms-plugin" },
    ],
    tags: ["WordPress", "PHP 8.3", "Alpine.js", "MySQL", "Playwright"],
    stack: ["PHP 8.3", "WordPress REST API", "MySQL", "Vite", "Tailwind CSS", "Alpine.js", "Chart.js", "Dompdf", "TCPDF", "FPDI", "OAuth 2.0", "Playwright"],
    facts: [
      { value: "23", label: "learners started the course" },
      { value: "11", label: "certificates issued" },
      { value: "7", label: "custom MySQL tables" },
      { value: "13", label: "Playwright end-to-end tests" },
    ],
    cover: img("/work/lms/lesson.webp", "A video lesson in the Educação financeira course", D, { url: "financasparatodos.org/lesson" }),
    brief:
      "Off-the-shelf LMS plugins store every learner action in wp_postmeta and slow down as the audience grows. The site also needed things they don't do well: mastery-based progress, streaks, and certificates anyone can verify.",
    built:
      "Course content stays in WordPress custom post types so editors keep the normal tools, while all learner data lives in seven MySQL tables. On top: a REST API, a Vite + Tailwind + Alpine learner front end, a certificate designer, social login, guest progress, and a full-screen admin app outside wp-admin.",
    pipeline: {
      title: "How the data is split",
      caption: "Content stays where editors work; learner data goes where queries are fast.",
      steps: [
        { label: "Content", detail: "Courses, chapters, lessons and quizzes as custom post types." },
        { label: "Learner data", detail: "Progress, attempts, streaks and certificates in 7 custom tables." },
        { label: "REST API", detail: "WordPress REST endpoints for the learner app." },
        { label: "Learner UI", detail: "Course path, video lessons with transcripts, quizzes." },
        { label: "Certificate", detail: "Branded PDF template + field positions → QR-coded PDF." },
        { label: "Verify", detail: "Anyone can scan the QR code to verify a certificate." },
      ],
    },
    features: [
      {
        group: "Learning",
        items: [
          { title: "Mastery progress", body: "Units are locked, available or completed; completing a quiz is permanent." },
          { title: "Daily streaks", body: "A streak engine with an activity heatmap." },
          { title: "YouTube transcripts", body: "Transcripts extracted automatically, with click-to-seek." },
          { title: "Guest progress", body: "Visitors can start before signing up; progress carries over." },
        ],
      },
      {
        group: "Certificates",
        items: [
          { title: "Certificate designer", body: "Upload a branded PDF and position the name, course, date and QR code." },
          { title: "Any template size", body: "Positions are saved as fractions of the page." },
          { title: "Verification", body: "Each certificate has a QR code to a public verification page." },
        ],
      },
      {
        group: "Admin",
        items: [
          { title: "Course builder", body: "Courses and chapters with drag-to-reorder in a separate admin app." },
          { title: "Analytics", body: "Course starts, completions, completion rate and certificates, with CSV export." },
          { title: "Social login", body: "Google, Facebook and X over OAuth 2.0, with a student role." },
        ],
      },
      {
        group: "Quality",
        items: [
          { title: "13 E2E tests", body: "Playwright tests for sign-in, learning, quizzes, certificates and admin." },
          { title: "No postmeta load", body: "Learner data never touches wp_postmeta." },
        ],
      },
    ],
    gallery: [
      img("/work/lms/lesson.webp", "Video lesson", D, { url: "financasparatodos.org/lesson", caption: "A video lesson with the chapter path on the left." }),
      img("/work/lms/quiz.webp", "Quiz", D, { url: "financasparatodos.org/quiz", caption: "A quiz with skip and check." }),
      img("/work/lms/course.webp", "Course page", D, { url: "financasparatodos.org/courses/educacao-financeira", caption: "Course page with progress per module." }),
      img("/work/lms/admin-certificates.webp", "Certificate designer", D, { url: "financasparatodos.org/lms-admin", caption: "Certificate designer: a branded PDF template with positioned fields." }),
      img("/work/lms/admin-analytics.webp", "Analytics", D, { url: "financasparatodos.org/lms-admin", caption: "Analytics: 23 starts, 10 completions, 11 certificates." }),
      img("/work/lms/admin-course.webp", "Course builder", D, { url: "financasparatodos.org/lms-admin", caption: "Course builder with drag-to-reorder chapters." }),
      img("/work/lms/home.webp", "Site home", D, { url: "financasparatodos.org", caption: "The site the plugin runs on." }),
      img("/work/lms/mobile-00.webp", "Course on mobile", M, { frame: "phone", caption: "Course page on a phone." }),
      img("/work/lms/mobile-01.webp", "Modules on mobile", M, { frame: "phone", caption: "Module progress." }),
    ],
    notes: [
      {
        title: "Certificate field positions",
        body: "A field placed 40% across and 62% down lands in the same spot on any template size. The designer saves fractions and the PDF renderer multiplies them by the page size, so a new template doesn't need fields placed again.",
      },
      {
        title: "Content in WordPress, learner data in custom tables",
        body: "Editors write lessons in WordPress like any other post. Everything a learner does goes to tables designed for the queries the app runs.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    slug: "hanstaiger-world",
    name: "Hanstaiger World",
    kind: "Custom Shopify theme",
    year: "2026",
    client: "Hanstaiger, hydration and gear brand",
    role: "Theme architecture and front-end build",
    platform: "Shopify OS 2.0 · Liquid · Vite",
    summary:
      "A custom Online Store 2.0 theme for a brand that tests its products on the X1 trimaran: 44 configurable sections, a bundle builder, shoppable videos and GSAP animation, built with Vite and Tailwind v4.",
    intro:
      "Hanstaiger World sells bottles, electrolytes and apparel. The store needed to feel as calm and premium as the yacht, let the team build pages in the theme editor, and sell bundles and subscriptions without page reloads.",
    theme: { bg: "#e8e3da", fg: "#16130f", muted: "#6b645a", accent: "#f26522", line: "rgba(22,19,15,.14)" },
    links: [
      { label: "Live store", href: "https://hanstaigerbottles.com" },
      { label: "Source", href: "https://github.com/hamzasispn/hanstaigerbottles" },
    ],
    tags: ["Shopify", "Liquid", "Tailwind v4", "Alpine.js", "GSAP"],
    stack: ["Shopify Liquid", "Online Store 2.0", "JSON templates", "Vite", "Tailwind CSS v4", "Alpine.js", "GSAP", "Swiper", "Sass", "Ajax Cart API", "Shopify CLI", "Theme Check"],
    facts: [
      { value: "44", label: "Liquid sections with schemas" },
      { value: "41", label: "snippets" },
      { value: "1", label: "Vite build for all assets" },
      { value: "0", label: "page reloads to build a bundle" },
    ],
    cover: {
      type: "video",
      src: "/work/hanstaiger-bottles/reel.mp4",
      poster: "/work/hanstaiger-bottles/reel-poster.webp",
      alt: "Scrolling the Hanstaiger World storefront",
      width: 1920,
      height: 1080,
      frame: "browser",
      url: "hanstaigerbottles.com",
    },
    brief:
      "Stock themes looked like every other store. The team wanted a storefront with big imagery, quiet type and orange accents, and wanted to build pages themselves from flexible sections.",
    built:
      "A theme built up from Shopify's Skeleton. Tailwind v4, Sass, Alpine components and GSAP animations compile through Vite into theme assets. Every section has a schema so pages are built in the editor. Products are output as JSON in Liquid and read by Alpine, so the bundle builder and configurator update instantly and add to cart over Ajax.",
    pipeline: {
      title: "Theme build",
      caption: "Modern front-end tooling compiled into what Shopify serves.",
      steps: [
        { label: "Source", detail: "Tailwind v4, Sass, Alpine components and GSAP in /src." },
        { label: "Vite", detail: "Bundled into theme assets." },
        { label: "Sections", detail: "44 Liquid sections with schemas, editable in the theme editor." },
        { label: "Data", detail: "Products output as JSON in Liquid, read by Alpine." },
        { label: "Cart", detail: "Ajax Cart API for bundles and variants." },
      ],
    },
    features: [
      {
        group: "Selling",
        items: [
          { title: "Bundle builder", body: "Choose products and variants with min/max items and an automatic discount, set in section settings." },
          { title: "Product configurator", body: "Variant options with per-variant images, availability and compare-at prices." },
          { title: "Bundles and subscriptions", body: "Ready-made bundles and a 30-day electrolyte subscription." },
          { title: "Shoppable videos", body: "Video cards linked to their products." },
        ],
      },
      {
        group: "Sections",
        items: [
          { title: "Heroes and banners", body: "Hero, split hero for B2B, split banners, image boxes, brochure." },
          { title: "Collections", body: "Collection tabs, explore grid, product showcase, related products." },
          { title: "Social proof", body: "Testimonials wall, brand slider, marquee." },
          { title: "Content", body: "Blog, article, gallery, video, custom text and product accordions." },
        ],
      },
      {
        group: "Experience",
        items: [
          { title: "Mobile dock", body: "A bottom navigation bar on phones." },
          { title: "Header", body: "Overview menu, language selector, account and cart." },
          { title: "Animation", body: "GSAP scroll animations and Swiper carousels." },
          { title: "Newsletter popup", body: "Configured in the theme editor." },
        ],
      },
    ],
    gallery: [
      img("/work/hanstaiger-bottles/hero.webp", "Home hero", D, { url: "hanstaigerbottles.com", caption: "Home page." }),
      img("/work/hanstaiger-bottles/developed.webp", "Bottle section", D, { url: "hanstaigerbottles.com", caption: "The X1 bottle." }),
      img("/work/hanstaiger-bottles/yacht.webp", "The X1 trimaran", D, { url: "hanstaigerbottles.com", caption: "The X1, where the products are tested." }),
      img("/work/hanstaiger-bottles/hydration.webp", "Collection tabs", D, { url: "hanstaigerbottles.com", caption: "Collection tabs." }),
      img("/work/hanstaiger-bottles/electrolytes.webp", "Electrolytes", D, { url: "hanstaigerbottles.com", caption: "Electrolytes and bottle carousel." }),
      img("/work/hanstaiger-bottles/bundles.webp", "Bundles", D, { url: "hanstaigerbottles.com", caption: "Bundles added to cart without leaving the page." }),
      img("/work/hanstaiger-bottles/replenish.webp", "Subscription", D, { url: "hanstaigerbottles.com", caption: "30-day replenishment subscription." }),
      img("/work/hanstaiger-bottles/apparel.webp", "Apparel", D, { url: "hanstaigerbottles.com", caption: "Apparel." }),
      img("/work/hanstaiger-bottles/products.webp", "Product grid", D, { url: "hanstaigerbottles.com", caption: "Product grid with quick add." }),
      img("/work/hanstaiger-bottles/mobile-00.webp", "Mobile home", M, { frame: "phone", caption: "Mobile home." }),
      img("/work/hanstaiger-bottles/mobile-05.webp", "Mobile bundles", M, { frame: "phone", caption: "Bundles on a phone." }),
    ],
    notes: [
      {
        title: "Liquid renders the data, Alpine handles the UI",
        body: "The bundle builder outputs products and variants as JSON in Liquid. Alpine reads it once, then counts, discounts and limits update instantly and the cart call happens over Ajax.",
        code: {
          file: "sections/bundle-builder.liquid",
          lang: "liquid",
          source: `<section x-data="bundleBuilder({ min: {{ min_items }}, max: {{ max_items }}, percent: {{ percent }} })">
  <script type="application/json" data-bundle-products>
    [{%- for product in source limit: limit -%}
      { "id": {{ product.id }}, "title": {{ product.title | json }},
        "variants": [{%- for v in product.variants -%}
          { "id": {{ v.id }}, "price": {{ v.price }}, "available": {{ v.available | json }} }
        {%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}] }
    {%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]
  </script>`,
        },
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
