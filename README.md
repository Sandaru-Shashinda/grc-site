# GRC — Gemological Report of Ceylon

React + TypeScript + Vite rebuild of [grc.lk](https://grc.lk/), replacing the
WordPress (Astra + Elementor) site with the same content and visual identity.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run lint
npm run preview
```

## Routes

| Path                    | Page                | Notes                                            |
| ----------------------- | ------------------- | ------------------------------------------------ |
| `/`                     | Home                | Hero, "Let's talk about GRC", verify band, gallery |
| `/about`                | About               | Est. 2025, founder, mission, vision, services     |
| `/services`             | Services            | Three services, alternating rows                  |
| `/contact`              | Contact             | Details, message form, Google Maps embed          |
| `/verify-certificate`   | Verify Certificate  | Placeholder — matches the live site               |
| `/post`                 | Posts               | Empty state; no posts published yet               |
| `/category/:slug`       | Posts (filtered)    | `blog`, `grc-news`, `uncategorized`               |
| `*`                     | Not found           |                                                   |

## Structure

```
src/
  data/site.ts        # navigation, contact details, services, posts — single source of content
  components/         # Header, Footer, Layout, PageHero, ScrollToTop
  pages/              # one .tsx + .css per route
  index.css           # design tokens, base styles, buttons, layout primitives
public/images/        # logo and photography pulled from the live site
```

Content lives in [`src/data/site.ts`](src/data/site.ts) — nav items, phone, email,
business hours, services and posts. Edit there rather than in the page components.

## Design tokens

Taken from the live Astra theme globals, defined in `src/index.css`:

| Token          | Value     | Use                       |
| -------------- | --------- | ------------------------- |
| `--gold`       | `#DCA54A` | Primary / buttons         |
| `--gold-dark`  | `#D09A40` | Hover, links, eyebrows    |
| `--navy`       | `#0F172A` | Headings                  |
| `--body-text`  | `#4A4A4A` | Body copy                 |
| `--cream`      | `#FAF5E5` | Alternating sections      |
| `--cream-deep` | `#F0E6C5` | Hero gradient, accents    |
| `--ink`        | `#141004` | Dark button hover         |

Typeface is Montserrat, loaded from Google Fonts in `index.html`.

## Known gaps

- **Contact form** validates client-side and simulates a send. Wire the
  `handleSubmit` in [`src/pages/Contact.tsx`](src/pages/Contact.tsx) to a real
  endpoint before going live.
- **Certificate verification** is a placeholder, mirroring the current live page.
- **Posts** are an empty array in `src/data/site.ts`; the listing renders its empty
  state until posts are added or a CMS is connected.

## Deployment

The app uses client-side routing, so the host must serve `index.html` for unknown
paths. `public/.htaccess` covers Apache/Hostinger; add the equivalent rewrite for
other hosts.
