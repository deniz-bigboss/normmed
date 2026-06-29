# Normmed Medical — Website

A modern, responsive marketing website for **Normmed Medical**, an Ankara-based
manufacturer of spinal, orthopedic, trauma, arthroscopy and arthroplasty implant
systems. This is a rebuild and enhancement of the original
[norm-med.com](https://norm-med.com), with a refreshed design, richer content,
and an embedded **Google Maps location** plus a **Google-style reviews** section.

## Features

- **Single-page, fully responsive** design (mobile-first) — no build step, no dependencies.
- **Hero** with animated statistics counters.
- **About**, **Innovation** (world-first antibacterial silver-ion coated implants),
  and **Quality / certifications** sections.
- **Product portfolio**: Spine, Trauma, Arthroscopy, Arthroplasty — with full
  sub-category tags and featured signature systems (Trimi™, Z-Rhythm™, Vertelift-C™).
- **Global presence** map of export markets (60+ countries).
- **Google Maps location** — embedded interactive map of the İvedik OSB, Ankara
  headquarters, plus "Open in Google Maps" and "Get directions" links.
- **Google reviews** section — star rating banner with rating distribution and
  review cards styled after Google Business Profile reviews.
- **Contact form** with front-end validation.
- Scroll-reveal animations, sticky nav, mobile menu, back-to-top, SEO meta tags
  and JSON-LD structured data.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup and all content |
| `styles.css` | Design system and responsive styles |
| `script.js`  | Nav, scroll reveals, counters, reviews, form |

## Run locally

It's a static site — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes & next steps

- **Reviews** are representative cards aggregated in the style of the company's
  Google Business Profile. To show *live* Google reviews, wire up the
  [Google Places API](https://developers.google.com/maps/documentation/places/web-service/details)
  (`place/details` with a `reviews` field) on a small backend and replace the
  `reviews` array in `script.js`. A server-side proxy is recommended so the API
  key is never exposed to the browser.
- **Map** uses Google's keyless embed (`?output=embed`). For Maps JavaScript API
  features (custom markers, styling), add a `Maps Embed API` key.
- **Contact form** is front-end only. Connect a mail service (e.g. Formspree,
  SendGrid, or your own endpoint) to deliver submissions.

## Company

**Normmed Medical** — İvedik OSB Mah. Havalandırmacılar Cad. No: 193,
Yenimahalle / Ankara / Türkiye · +90 312 395 61 84 · info@normmed.com.tr
