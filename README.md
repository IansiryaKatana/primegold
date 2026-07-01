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

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Emerald Deep | `#003D2B` | Header, footer, primary buttons |
| Emerald Dark | `#001F17` | Top ticker, hero overlay |
| Gold | `#D6A43B` | CTAs, accents, highlights |
| Cream | `#F8F6EF` | Section backgrounds |
