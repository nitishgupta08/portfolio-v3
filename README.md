# Portfolio v3

A personal portfolio built with Next.js App Router, Tailwind CSS v4, shadcn/ui, Firebase Firestore, and React Query.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Firebase Firestore
- TanStack React Query
- Google Analytics + Vercel Speed Insights

## Prerequisites

- Node.js 20+
- npm
- Firebase project with Firestore collections:
  - `projects`
  - `experiences`
  - `blog_posts`

## Environment Variables

Copy `.env.example` to `.env.local` and provide values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Optional variables:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_USE_FALLBACK_DATA=true` to serve local fallback data instead of Firestore

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Note: `npm run build` may fail in network-restricted environments if external assets are blocked.

## Data Loading Strategy

- Server data interfaces live in `src/lib/server/portfolioData.ts`.
- Home, blog listing, blog post, and projects pages consume server-fetched data first.
- Client interactivity (carousel, counters, analytics events) stays in client components.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
