# Globe prototype → index.html migration plan

Status: **planning only** — `index.html` has not been touched. This document exists so that
when you're ready to actually make the swap, it's a checklist instead of a from-scratch
decision-making session. Written after reading both files end to end.

---

## 1. What's actually different (structural mapping)

| Real site (`index.html`) | Globe prototype | Notes |
|---|---|---|
| `#hero` — name, tagline, bio, CTA buttons, contact block (email/phone/GitHub/LinkedIn), headshot | `hero` — "My World" welcome text, one lead paragraph, headshot | **Prototype hero is much thinner.** See §2. |
| `#skills` | `skills` continent | Content roughly equivalent, prototype's is a condensed summary. |
| `#projects` — three cards, each linking to `projects/*.html` | `projects` continent — same three projects mentioned **as plain text, no links** | **Gap** — see §2. |
| *(no dedicated section — resume is just a PDF download link in the navbar/hero)* | `resume` continent — its own section with a download link | **Prototype adds a section that doesn't exist on the live site.** See §2. |
| `#personal` | `personal` continent | Content roughly equivalent. |
| *(none)* | `explore` — free-roam hand-off section | Entirely new, no live-site equivalent — this is fine, it's infrastructure for the globe, not content. |
| Top `#navbar`: logo, in-page links, resume download button, hamburger toggle, `#scrollProgress` bar, `#backToTop` button | Left sidebar (desktop) / top bar (mobile), no logo, no scroll-progress bar, no back-to-top | **Nav is a full redesign, not a port.** Decide whether scroll-progress/back-to-top are worth keeping in spirit. |

## 2. Content gaps — need your input before this can go live, not just code changes

1. **Hero is missing**: bio paragraphs, "View My Work" / "Resume" CTA buttons, phone number, GitHub/LinkedIn icon links. Right now the prototype hero is just a welcome blurb. Either port this content into the new hero layout, or decide some of it belongs elsewhere (e.g., contact info in Personal instead).
2. **Projects section has no links.** The three project mentions (Running Form Analyzer, OmniFlow, Mancala AI) are plain text in the prototype — the live site links each to `projects/running-form.html`, `projects/omniflow.html`, `projects/mancala.html`. These need to become real links (or clickable cards) before this replaces the live site, or visitors lose the ability to reach those pages from the homepage.
3. **Resume is a new section**, not a redesign of an existing one. Confirm you actually want a dedicated "Resume" continent (current copy: *"CS major at CU Boulder (minor in business), graduating summer 2026. Download the full resume (PDF)"*), rather than keeping resume as just a nav-level download link like today.
4. **Fonts aren't actually being loaded.** `globe-prototype.html` has no `<link>` to Google Fonts — `index.html` does (lines 29–31: preconnect + `Inter`/`Newsreader` stylesheet). Right now the prototype *looks* right only because Newsreader/Inter happen to already be installed as system fonts in this dev environment (verified via `document.fonts.check`) — on a visitor's machine without them installed, it'll silently fall back to Georgia/system-ui and look different from what's been reviewed in testing. **Must add the same `<link>` tags before this ships.**
5. **`#scrollProgress` bar and `#backToTop` button** exist on the live site with no prototype equivalent. Decide: drop them (the new nav's active-highlight arguably replaces the "where am I" job of the progress bar), or re-add them.

## 3. Technical reconciliation items (mechanical, no content decisions needed)

- **Styles are inline** in `globe-prototype.html`'s `<style>` block; the live site uses `style.css?v=4` with CSS custom properties (`--ink-black`, `--dark-teal`, etc.) that the prototype's `PALETTE` object already mirrors 1:1. Recommend extracting the prototype's styles into `style.css` (reusing the existing custom properties instead of the hardcoded hex the prototype currently uses) rather than shipping a second inline stylesheet — keeps one source of truth. Remember the standing convention: **bump `style.css?v=N` on any CSS edit.**
- **Asset paths already match** — `assets/headshot.jpg`, `assets/models/*.glb` etc. all resolve correctly relative to `index.html`'s own location (verified, since both files live in the same directory).
- **Git**: `portfolio-website/` is its own git repo. Recommend doing the actual swap on a branch (`git checkout -b globe-redesign`) rather than directly on whatever branch `index.html` currently lives on, so it's a reviewable diff / easy to back out of. (Per your standing preference, you'd run these commands yourself — I'd just flag this step when we get there.)
- **`three.js` / GLTFLoader dependency**: the live `index.html` currently has no JS dependencies at all. Migrating means index.html gains an import-map + ES module `<script>` and a ~few-hundred-KB three.js dependency (CDN-loaded) it didn't have before. Worth confirming you're fine with that page-weight/complexity trade for the homepage specifically.
- **Attribution line** for the CC BY 3.0 models is already written into the prototype's Explore section — no extra work needed there, just carries over.

## 4. Suggested execution order (once you give the go-ahead)

1. Branch off (`git checkout -b globe-redesign`).
2. Add the missing Google Fonts `<link>` tags to the prototype (or wherever they end up).
3. Resolve the content gaps in §2 (at minimum #1, #2, and #4 — those are the ones that lose real functionality/fidelity if skipped).
4. Extract prototype CSS into `style.css`, reusing the existing custom properties; bump `?v=`.
5. Decide on §2.5 (scroll-progress bar / back-to-top).
6. Swap the prototype's body/script into `index.html`, keeping `index.html`'s existing `<head>` (fonts, meta, OG tags, favicon) rather than the prototype's minimal one.
7. Full pass through every section on both desktop and mobile widths.
8. Only then: replace `index.html` for real.

## 5. Open questions for you

- Hero content: port the old bio/CTA/socials in, trim them down, or move some (e.g. contact info) to the Personal section instead?
- Keep Resume as its own continent, or fold it back into being just a download link?
- Want the project cards on the globe to link out to their pages (matching live-site behavior), or is that intentionally being dropped in favor of "click the continent, read about it here"?
- Scroll-progress bar / back-to-top button: keep, drop, or reinvent?
