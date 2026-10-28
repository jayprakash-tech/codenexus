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

The app is ready for zero-config Vercel deployment — import the repository and
Vercel will detect the Next.js settings automatically (`next build` / `next start`).

## Roadmap

- **Sprint 2:** Monaco editor integration
- **Sprint 3:** Code runner + real judge results
- **Sprint 4+:** Auth, problem database, XP/streak persistence
