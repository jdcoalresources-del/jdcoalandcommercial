# JD COAL & COMMERCIAL

A premium, professional marketing website for JD COAL & COMMERCIAL — a leading coal supplier in India.

## About

This site showcases JD COAL & COMMERCIAL's products, services, industries served, and company profile with a focus on premium design, smooth animations, and easy customer engagement via WhatsApp.

## Key Technologies

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS animations |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Features

- Full-screen hero with coal-industry dark theme and gold accents
- Animated statistics counters (scroll-triggered via IntersectionObserver)
- 6 coal product cards (Steam Coal, Coking Coal, Pet Coke, Coal Fines, Lignite, Imported Coal) with specs
- Industries served section (Power, Steel, Cement, Textile, Brick Kilns, Paper, Ceramic, Chemical)
- "Why Choose Us" feature highlights
- Contact section with WhatsApp enquiry form
- Floating WhatsApp button (appears on all pages)
- Fully responsive (mobile hamburger menu)

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000` (or port 8888 if using Netlify CLI).

Using Netlify CLI for full feature emulation:

```bash
netlify dev
```

## Environment Variables

No environment variables are required for the base marketing site.

## Deployment

Deployed automatically on Netlify. Build command: `vite build`. Publish directory: `dist/client`.
