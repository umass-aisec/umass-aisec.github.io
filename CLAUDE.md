# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for the UMass AI Security Lab, served via **GitHub Pages** from the `main` branch at the custom domain in `CNAME` (`aisec.cs.umass.edu`). It is **pure static HTML / CSS / vanilla JS** — there is no build step, no bundler, no package manager, and no test/lint tooling. Edits to HTML/CSS/JS/JSON go live on push. (There is no `.nojekyll` at the repo root, so GitHub Pages' default Jekyll pass still runs, but the pages have no front matter and are served unchanged. The `.nojekyll` files inside some `demo/<slug>/` folders do nothing, because Pages only checks the root. Don't create files or folders whose names start with `_`, because Jekyll will drop them.)

## Local preview

Serve from the **repository root**, not a subdirectory — shared scripts and `fetch()` calls use absolute paths (`/assets/...`, `/figures/...`) that only resolve when root is the web root:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Architecture

### Content / presentation split (the main pattern)
Each data-driven page (`index.html`, `people/`, `seminar/`, `publications/`; the blog and demo pages are hardcoded HTML) is a static HTML shell containing **empty container `<div>`s**. A small per-page vanilla-JS module in `assets/scripts/` `fetch()`es a JSON file from `assets/data/` and injects rendered markup into those containers. To change content, edit the JSON in `assets/data/`; to change layout/rendering, edit the script.

| Page | Script | Data | Renders into |
|------|--------|------|--------------|
| `index.html` | `news.js` | `news.json` | `#recent-news-list` (4 most recent by date) |
| `people/` | `people.js` | `people.json` | `#students` / `#alumni` (split on `alumnus` flag) |
| `seminar/` | `seminar.js` | `seminar.json` | `#calendar`, `#calendar_control` |
| `publications/` | `publications.js` | `pubs.json` | `#publications` (grouped by year; checkbox `#hide_preprint` filters `venue == "arXiv"`) |

### `common.js` — shared chrome, loaded on every page (main site, blog posts and demos)
It injects the nav header into `#header` and the footer into `#footer`, auto-adds `.active` to the nav item matching the current path, runs IntersectionObserver fade-in animations, and defines the global **`fromHTML()`** helper that the other scripts use to build DOM nodes from template strings. Page scripts depend on `fromHTML` existing, so `common.js` must load first; `people.js` defensively polls for it.

### Project demo pages (`demo/<slug>/`)
Standalone academic-style project pages (Terrarium, web-agent-throttling, bobs-confetti, etc.), each with its own `index.html` and `static/` media. They load the shared `assets/css/custom.css`, Bootstrap and `common.js` (for the site header and footer), but are otherwise self-contained. Add a new demo by creating `demo/<slug>/`, linking it from the cards in `demo/index.html`, and adding it to `sitemap.xml`. (The nav label is "Demos" and the route is `/demo`.)

### Blog (`blog/`)
`blog/index.html` hardcodes the post list as `.blog-card` links; each post is a hand-authored HTML file in `blog/posts/`. Adding a post = new file in `blog/posts/` + a card in `blog/index.html` + an entry in `sitemap.xml`.

## Updating publications

`assets/data/pubs.json` is the source of truth and is **edited manually**. `publications/prepare_pubs.py` queries DBLP's SPARQL endpoint and writes `assets/data/pubs_draft.json` (a draft to merge from by hand — DBLP lags, so manual additions to `pubs.json` are expected). Requires `requests`, `rapidfuzz`, `pandas`; run it from inside `publications/` (it uses relative paths). If faculty/PIs change, update the `profs` dict in the script. Students are matched through `must_have_authors`, which the script reads from the names in `people.json`. `publications/README.md` is out of date: it says the script writes `pubs.json`.

## Conventions & gotchas

- **Theme:** UMass colors live as CSS custom properties in `assets/css/custom.css` (`--umass-maroon`, `--umass-gold`, etc.) — use them rather than hardcoding hex.
- **Cache busting:** shared assets are referenced with `?v=N` query strings (currently `custom.css?v=4`, `common.js?v=5`, `news.js?v=1`, `publications.js?v=1`; `people.js` and `seminar.js` have no version). Bump the version when changing a shared file so clients re-fetch. `custom.css` and `common.js` are referenced from every page, including blog posts, `demo/*/index.html` and the orphaned `publications/index_new.html`, so grep for the old string and update every reference.
- **Seminar data shape:** `seminar.json` is keyed by semester (`"F25"`, `"S25"`); the **first key is treated as the current semester**. Each speaker has both a display `date` and a machine-parseable `date2` (`YYYY/MM/DD`) used for upcoming/highlight logic.
- **Sitemap:** `sitemap.xml` is maintained by hand and lists every public page; update it when adding or removing pages.
- **`404.html`** redirects legacy `/projects/*` URLs to `/demo/*` (the section was renamed); keep it if you restructure routes.
- **Orphaned files** (present but referenced nowhere — don't assume they're live): `assets/scripts/index.js` (targets a `#seminar_event` element that no page contains) and `publications/index_new.html`.
