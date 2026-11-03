# Hamza — portfolio

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion · Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # static build: home + one page per case study
npm run start
```

## Before you deploy

| What | Where |
| --- | --- |
| Real domain for metadata + sitemap | env `NEXT_PUBLIC_SITE_URL` |
| Email, GitHub accounts, company, location | `src/content/site.ts` |
| Work history (from the CV) | `src/content/experience.ts` |

## Where things live

- `src/content/projects.ts` — every case study as data: copy, facts, features (the A–Z list), pipeline, gallery, engineering notes with code. **Adding a project = adding one entry**; the home card, `/work/[slug]`, the footer list, the sitemap and the next-project link all follow.
- `src/content/skills.ts` — skill groups and specialties.
- `src/content/experience.ts` — jobs, newest first.
- `src/components/home/*` — hero (with the screen capsule), the screenshot reel, full-colour work blocks, experience, skills.
- `src/components/work/*` — case-study pieces: pipeline, gallery + lightbox, code blocks, next-project link.
- `public/work/<project>/` — screenshots (WebP, 2400px, q90) and videos (`.mp4`).

## Media notes

- Every screenshot is a 1440×900 capture at 2× (phones 390×844 at 3×), saved as 2400px WebP at quality 90 and served by `next/image` at quality 90.
- Admin screens (SmartSyncLink, Hanstaiger X1, Finanças LMS) were captured from logged-in sessions. Pages with customer data were skipped; the one reservation shown has its name, email and phone blurred.
- Cove screens come from the theme prototype in `C:\MyWork\Theme\design\v13`.
# my-protfolio
