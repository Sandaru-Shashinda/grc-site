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
| `/verify-certificate`   | Verify Certificate  | Looks a certificate up in gem_tracker_api          |
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

## Certificate verification

`/verify-certificate` takes the number printed on a report, confirms it against
`gem_tracker_api`, and then sends the visitor to the full report view — the same
page the certificate's QR code opens.

```
grc.lk/verify-certificate
  └─ GET {VITE_API_BASE_URL}/reports/{number}/verify
       └─ { _id, reportId, gemId, identification, … }
            └─ redirect to {VITE_REPORT_VIEW_URL}/reports/{_id}
```

Two numbers are accepted, both case-insensitively:

| Number         | Field             | Format               | Who uses it        |
| -------------- | ----------------- | -------------------- | ------------------ |
| GRC Number     | `gem.gemId`       | `GRC-YYYY-MM-NNNNN`  | Printed on the certificate — what customers have |
| Report number  | `report.reportId` | `REP-YYYY-MM-NNNNN`  | Internal reference |

Configure both endpoints in `.env` (see [`.env.example`](.env.example)):

```
VITE_API_BASE_URL=https://gem-tracker-six.vercel.app/api
VITE_REPORT_VIEW_URL=https://gemological-report-ceylon.vercel.app
```

`VITE_REPORT_VIEW_URL` must match the origin whose QR codes are printed on
certificates, so a typed-in number and a scanned QR land on the same page.

## Known gaps

- **Contact form** validates client-side and simulates a send. Wire the
  `handleSubmit` in [`src/pages/Contact.tsx`](src/pages/Contact.tsx) to a real
  endpoint before going live.
- **Posts** are an empty array in `src/data/site.ts`; the listing renders its empty
  state until posts are added or a CMS is connected.

## Deployment

The app uses client-side routing, so the host must serve `index.html` for unknown
paths. `public/.htaccess` covers Apache/Hostinger; add the equivalent rewrite for
other hosts.
