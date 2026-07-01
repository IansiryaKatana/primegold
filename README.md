# Prime Gold Trading

A luxury precious metals ecommerce and lead-generation landing page built with TanStack Start, React 19, TypeScript, Tailwind CSS v4, and shadcn/Radix-style UI components.

## Tech Stack

- **TanStack Start** — Full-stack React framework with SSR and server functions
- **React 19** + **TypeScript**
- **Vite 7** — Build tool
- **Tailwind CSS v4** — Utility-first styling with custom brand tokens
- **shadcn/ui** (Radix primitives) — Button, Card, Input, Select, Accordion, Table, Calendar, Sheet, Popover
- **Framer Motion** — Premium scroll and entrance animations
- **TanStack Query** — Client-side data fetching
- **React Hook Form + Zod** — Appointment form validation
- **Embla Carousel** — Gold insights carousel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the next available port).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── components/
│   ├── home/          # Homepage sections (hero, products, calculator, etc.)
│   ├── layout/        # Header, footer, market ticker
│   ├── shared/        # Reusable primitives (SectionHeading, TrustBadge, etc.)
│   └── ui/            # shadcn-style UI components
├── data/              # Static content (branches, FAQs, testimonials)
├── lib/               # Utils, types, motion tokens
├── routes/            # TanStack Router file routes
├── server/            # Server functions (market prices, appointments, etc.)
└── styles/            # Tailwind v4 global styles
```

## Features

- Live market ticker with gold/silver prices (server-computed)
- Dynamic product pricing based on live spot prices
- Investment return calculator (server-side)
- Geolocation-based branch finder
- Appointment booking with form validation
- FAQ accordion, comparison table, testimonials
- Fully responsive (mobile → desktop)
- Framer Motion animations throughout

## Deploy to Vercel

This app uses [TanStack Start with Nitro](https://vercel.com/docs/frameworks/full-stack/tanstack-start) for Vercel deployment.

### 1. Connect GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import [IansiryaKatana/primegold](https://github.com/IansiryaKatana/primegold)
3. Vercel should auto-detect **TanStack Start** (via `vercel.json` + Nitro plugin)
4. Build command: `npm run build` (default)
5. Deploy

### 2. Environment variables

Add these in **Project → Settings → Environment Variables** (copy from `.env.example`):

| Variable | Notes |
|----------|--------|
| `VITE_SUPABASE_URL` | Client + server |
| `VITE_SUPABASE_ANON_KEY` | Client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only |
| `STRIPE_SECRET_KEY` | Server only |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Client |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook route |
| `RESEND_API_KEY` | Email |
| `RESEND_FROM` | Sender address |
| `VITE_APP_URL` | Your Vercel URL, e.g. `https://primegold.vercel.app` |
| `METALS_API_KEY` | Live spot prices (optional) |

Redeploy after adding env vars.

### 3. CLI (optional)

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Emerald Deep | `#003D2B` | Header, footer, primary buttons |
| Emerald Dark | `#001F17` | Top ticker, hero overlay |
| Gold | `#D6A43B` | CTAs, accents, highlights |
| Cream | `#F8F6EF` | Section backgrounds |
