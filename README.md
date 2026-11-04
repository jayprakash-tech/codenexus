# CodeNexus

A gamified coding learning platform with a LeetCode-style interface.

**Sprint 1** delivers the UI shell only: hardcoded demo data, no auth, no
database, no code execution, and no Monaco editor yet.

## Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) (dark theme only)
- [lucide-react](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Two Sum problem
shell: top nav bar, problem description panel (with XP/Streak strip), editor
placeholder, and results/console panel.

## Deploy on Vercel

The app is ready for zero-config Vercel deployment:

1. Publish this repository to GitHub (e.g. the "Publish to GitHub" button).
2. In Vercel, choose **Add New → Project → Import** the repo.
3. Vercel auto-detects Next.js (`vercel.json` pins framework/build/install
   commands explicitly). No environment variables are required. Click **Deploy**.

Or from the terminal:

```bash
npm i -g vercel
vercel --prod
```

A production build is verified with:

```bash
npm ci && npm run build && npm start
```

## PWA / branding notes

- `public/icon.svg` + `public/manifest.webmanifest` provide the app icon and
  theme colors (gray-900 chrome) for installable/PWA contexts.
- All routes are statically prerendered, so deployments serve instantly from
  Vercel's edge CDN.

## Roadmap

- **Sprint 2:** Monaco editor integration
- **Sprint 3:** Code runner + real judge results
- **Sprint 4+:** Auth, problem database, XP/streak persistence
