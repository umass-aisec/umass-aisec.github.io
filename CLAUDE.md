# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for the UMass AI Security Lab, served via **GitHub Pages** from the `main` branch at the custom domain in `CNAME` (`aisec.cs.umass.edu`). It is **pure static HTML / CSS / vanilla JS** — there is no build step, no bundler, no Jekyll (`.nojekyll` files disable it under `demo/`), no package manager, and no test/lint tooling. Edits to HTML/CSS/JS/JSON go live on push.

## Local preview

Serve from the **repository root**, not a subdirectory — shared scripts and `fetch()` calls use absolute paths (`/assets/...`, `/figures/...`) that only resolve when root is the web root:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Architecture

### Content / presentation split (the main pattern)
Each main-site page (`index.html`, `people/`, `seminar/`, `publications/`, `blog/`) is a static HTML shell containing **empty container `<div>`s**. A small per-page vanilla-JS module in `assets/scripts/` `fetch()`es a JSON file from `assets/data/` and injects rendered markup into those containers. To change content, edit the JSON in `assets/data/`; to change layout/rendering, edit the script.

| Page | Script | Data | Renders into |
|------|--------|------|--------------|
| `index.html` | `news.js` | `news.json` | `#recent-news-list` (4 most recent by date) |
| `people/` | `people.js` | `people.json` | `#students` / `#alumni` (split on `alumnus` flag) |
| `seminar/` | `seminar.js` | `seminar.json` | `#calendar`, `#calendar_control` |
| `publications/` | `publications.js` | `pubs.json` | `#publications` (grouped by year; checkbox `#hide_preprint` filters `venue == "arXiv"`) |

### `common.js` — shared chrome, loaded on every main-site page
It injects the nav header into `#header` and the footer into `#footer`, auto-adds `.active` to the nav item matching the current path, runs IntersectionObserver fade-in animations, and defines the global **`fromHTML()`** helper that the other scripts use to build DOM nodes from template strings. Page scripts depend on `fromHTML` existing, so `common.js` must load first; `people.js` defensively polls for it.

### Project demo pages (`demo/<slug>/`)
Standalone academic-style project pages (Terrarium, web-agent-throttling, bobs-confetti, etc.), each with its own `index.html` and `static/` media. They reuse the shared `assets/css/custom.css` and Bootstrap but are otherwise self-contained. Add a new demo by creating `demo/<slug>/` (include `.nojekyll`) and linking it from the cards in `demo/index.html`. (The nav label is "Demos" and the route is `/demo`.)

### Blog (`blog/`)
`blog/index.html` hardcodes the post list as `.blog-card` links; each post is a hand-authored HTML file in `blog/posts/`. Adding a post = new file in `blog/posts/` + a card in `blog/index.html`.

## Updating publications

`assets/data/pubs.json` is the source of truth and is **edited manually**. `publications/prepare_pubs.py` queries DBLP's SPARQL endpoint and writes `assets/data/pubs_draft.json` (a draft to merge from by hand — DBLP lags, so manual additions to `pubs.json` are expected). Requires `requests`, `rapidfuzz`, `pandas`; run it from inside `publications/` (it uses relative paths). If faculty/PIs change, update the `profs` dict and the `must_have_authors` source in the script.

## Conventions & gotchas

- **Theme:** UMass colors live as CSS custom properties in `assets/css/custom.css` (`--umass-maroon`, `--umass-gold`, etc.) — use them rather than hardcoding hex.
- **Cache busting:** shared assets are referenced with `?v=N` query strings (e.g. `custom.css?v=3`, `common.js?v=4`). Bump the version when changing a shared file so clients re-fetch — and keep it consistent across the pages that reference it.
- **Seminar data shape:** `seminar.json` is keyed by semester (`"F25"`, `"S25"`); the **first key is treated as the current semester**. Each speaker has both a display `date` and a machine-parseable `date2` (`YYYY/MM/DD`) used for upcoming/highlight logic.
- **Orphaned files** (present but referenced nowhere — don't assume they're live): `assets/scripts/index.js` (targets a `#seminar_event` element that no page contains) and `publications/index_new.html`.
