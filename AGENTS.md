# AGENTS.md

This document describes the project architecture for AI agents and developers working on this codebase.

## Project Overview

A premium marketing website for **JD COAL & COMMERCIAL**, a coal supplier. Built with TanStack Start and deployed on Netlify. The site is a single-page marketing presence with animated sections, coal product showcases, and WhatsApp-based enquiry flows.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS keyframes in `src/styles.css` |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Directory Structure

```
public/
  favicon.ico
  placeholder.png
src/
  data/
    coal-products.ts    # All product specs, industry list, and stats data
  routes/
    __root.tsx          # Root layout: SEO meta, WhatsApp floating button, Outlet
    index.tsx           # Full homepage (hero, stats, products, contact, etc.)
    products/
      $productId.tsx    # Individual product detail page (scaffold)
  router.tsx            # TanStack Router setup
  styles.css            # Tailwind imports + all CSS animation keyframes
netlify.toml            # Build config: vite build, publish dist/client
vite.config.ts          # Vite plugins: TanStack Start, Tailwind, Netlify
tsconfig.json           # Strict TS, @/* → src/*
```

## Key Architectural Decisions

### Data in `src/data/coal-products.ts`
All business data — coal product specs (GCV, moisture, ash), industries served, and statistics — live in one typed file. Update this file to change product listings; no component changes needed.

### WhatsApp as Primary Contact Channel
There is no backend form submission. The contact form in `index.tsx` builds a WhatsApp message URL on submit (`window.open('https://wa.me/...')`). Individual product cards also have per-product WhatsApp deep links. The floating WhatsApp button is in `__root.tsx` (renders on all pages).

### Animation Strategy
- CSS keyframes defined in `src/styles.css` (fadeInUp, shimmer, whatsapp-pulse, particle-float, etc.)
- `IntersectionObserver` inside a `useReveal()` hook toggles `.section-visible` class on scroll entry
- `useCounter()` hook animates statistics from 0 to target value when the stats section enters the viewport
- No external animation library (Framer Motion, GSAP, etc.) is used

### Scroll-to Navigation
The navbar links (Products, Industries, Contact) use `document.getElementById().scrollIntoView()` via `onClick` handlers, not separate routes. This keeps the UX smooth on a single page.

## Coding Conventions

- **Components**: PascalCase, defined as plain functions in route files (no separate component files unless large)
- **Hooks**: camelCase, defined at top of route file (`useCounter`, `useReveal`)
- **Styling**: Tailwind utility classes preferred; `style={{}}` props for dynamic values (e.g., animation delay)
- **TypeScript**: Strict mode, `type` keyword for type-only imports, no `any`
- **Path alias**: `@/` maps to `src/`

## WhatsApp Contact Number

Placeholder: `+91 92742 23940` → encoded as `919274223940` in wa.me URLs. Search for `919274223940` to update it across all files.

## Extending the Site

- **Add a product**: Add an entry to the `coalProducts` array in `src/data/coal-products.ts`
- **Add a page**: Create a new file in `src/routes/` following TanStack Router file-based conventions
- **Add a form backend**: Use Netlify Forms skill (has an activation script that must be run)
- **Add auth**: Use Netlify Identity skill (has an activation script that must be run)
