# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four confirmed audiences, all treated as primary:

- **Research collaborators and PIs** — people inside OSG, PATh, NRP, IRIS-HEP, FabAID, GP-ENGINE, GP-STOR, SciTokens and at peer institutions, sizing Derek up for a collaboration, a proposal, or co-authorship. They arrive knowing the domain and needing to place him in it quickly.
- **Engineers hitting the same problem** — practitioners who land from a search on an XRootD, OSDF/StashCache, SciTokens, GRACC, OpenSearch, GeoIP, or Kubernetes problem and reach a single blog post cold, with no prior context about the author.
- **Promotion, hiring, and funding reviewers** — committees and program officers verifying the record: role, publications, awards, deployed systems, impact.
- **Students and prospective advisees** — grad students and early-career researchers deciding whether they want to work with him.

The first three arrive with a specific verification or evaluation job. The engineer audience arrives mid-task on a deep page and may never see the home page.

## Product Purpose

Derek Weitzel's personal professional site at derekweitzel.com. It exists to be the authoritative, current, complete public record of his work: who he is, what he has built and operates, what he has published, and which collaborations he belongs to.

**Success, as confirmed by the user:** a visitor leaves with an accurate impression of the record. Not traffic, not conversion, not outreach volume — accuracy and credibility of the picture. Every other benefit (someone reaching out, a post getting cited, a reviewer finding a paper) is downstream of the record being right and legible.

This makes staleness the primary failure mode. A missing recent publication, an unlisted project, or an outdated title damages the product more than any aesthetic shortfall.

## Positioning

Derek is a Research Associate Professor in the School of Computing at the University of Nebraska–Lincoln, working with the Holland Computing Center and national cyberinfrastructure collaborations.

The claim a neighboring academic site could not truthfully copy: he sits on both sides of the research/operations line. He publishes peer-reviewed work *and* runs the production systems that work describes — OSDF/StashCache, XRootD monitoring, SciAuth/SciTokens, NRP's multi-tenant Kubernetes. The site's distinctive substance is deployed, load-bearing national infrastructure, not proposals about it. He serves on the OSG executive team.

## Operating Context

- Content is authored as Markdown in a Jekyll repository and published by pushing to `master`; there is no CMS. Anything that raises the cost of adding a post, project, or publication works against the product's core purpose.
- Publications are maintained as a single hand-curated Markdown list in reverse-chronological order, in full citation form with DOI links.
- Projects are a Jekyll collection (`_projects/`), each with a summary, external website, logo, technology list, ordering, and NSF award numbers.
- The blog is a long archive — 114 posts spanning 2009 to 2026 — of operational and debugging writeups. Most are old; the value is in being findable, not in being recent.
- Traffic to blog posts is substantially inbound from search onto a single deep page.

## Capabilities and Constraints

**Confirmed constraints (binding):**

- **Static Jekyll on GitHub Pages.** No server-side runtime. Jekyll 4.4 with Tailwind CSS 3.4 (`jekyll-tailwind`), deployed by GitHub Actions to `derekweitzel.com` via the `CNAME` file. The CI build (`.github/workflows/ci.yml`, `jekyll.yml`) must keep passing.
- **WCAG AA accessibility is required.** University-affiliated site; contrast, keyboard navigation, and screen-reader support are non-negotiable. See `## Accessibility & Inclusion`.

**Existing surfaces:** home (`index.html`), About, Blog archives (year / category / tag / collection), Projects index and per-project pages, Publications, 404.

**Existing build capabilities:** responsive images with WebP via `jekyll_picture_tag`, HTML/CSS/JS minification in production via `jekyll-minifier`, sitemap, Atom feed, gists, emoji, include caching, light/dark theming via Tailwind `dark:` variants.

**Third-party embeds currently present, not confirmed as durable commitments:** Disqus comments (`djw8605githubio`) and Google Universal Analytics (`UA-34747953-1`). The user did not mark these as must-keep when asked; treat removal or replacement as an open question, not a free action.

**Current post permalink:** `/:categories/:year/:month/:day/:title/`. The user did not confirm URL stability as binding when asked. Given the search-arrival audience, changing permalinks is still a decision to raise explicitly rather than take silently.

**Undecided / not established:** whether the legacy `changelog.md` (inherited from an old theme, unrelated to this site) and `atom.xml.bak` should remain; whether a CV/résumé download, talks/presentations index (a `presentations/` directory exists), or contact surface should exist.

## Brand Commitments

- **Name and identity:** Derek Weitzel. Site title "Dereks Web", tagline "Thoughts from Derek", both inherited from the config and not confirmed as deliberate brand choices.
- **Assets on hand:** author avatar `/images/bio-photo.png`, hero photo `derek-pearc-25.jpg` (Derek at PEARC 2025), per-project logos under `/images/projects/`, a technology-badge system driven by `_data/technologies.yml`.
- **Profiles:** GitHub `djw8605`, Stack Overflow `3357060/derek`, Twitter/X `DerekWeitzel`.
- **Voice as written today:** plain, factual, operationally specific. Claims are attached to systems, awards, or papers. No promotional register.

No aesthetic direction, palette, or typography was specified by the user during init.

## Evidence on Hand

Real, verifiable, and already in the repository:

- **Publications:** a long list of peer-reviewed papers with DOIs — PEARC, CHEP/EPJ Web of Conferences, CCGrid, INDIS, ANTS, SNTA — dating from 2014 through 2025.
- **Dissertation:** *Enabling Distributed Scientific Computing on the Campus*, UNL, 2015 (`digitalcommons.unl.edu/computerscidiss/88/`).
- **Promotion announcement:** UNL School of Computing, April 9, 2025 (`computing.unl.edu/news/weitzel-yu-receive-promotions/`) and UNL Newsroom.
- **Named projects with external sites and NSF award numbers:** OSG, PATh, NRP, IRIS-HEP, FabAID (OAC-2609485), GP-ENGINE, GP-STOR, SciTokens.
- **114 blog posts, 2009–2026**, on real operational work.
- **Photography:** PEARC 2025 hero image, bio photo.

**Absences future work must not fabricate:** there are no testimonials, no customer quotes, no adoption or usage metrics on the site, no pricing, no product claims. Do not invent scale figures ("X petabytes moved", "Y institutions served") — where such numbers exist they belong to the papers and must be sourced from them. Do not invent awards, titles, or affiliations beyond those listed above.

## Product Principles

1. **Accuracy is the product.** The record must be current and verifiable. Prefer a plain, correct fact to a compelling, approximate one.
2. **Substance over self-promotion.** The work is the argument. Claims attach to deployed systems, DOIs, and award numbers; the register stays factual.
3. **Every page is a landing page.** Search-arriving engineers hit deep pages with zero context. Any page must independently identify whose site this is and route onward.
4. **The archive stays findable.** 114 posts spanning seventeen years are an asset only if they remain reachable, indexed, and legible. Depth is worth as much as recency here.
5. **Publishing must stay cheap.** Adding a post, project, or publication is a Markdown edit and a push. Anything that adds ceremony to that loop eventually degrades the record.

## Accessibility & Inclusion

WCAG 2.1 AA is a confirmed requirement, as a university-affiliated site. Specifically: color contrast in both light and dark themes, full keyboard navigation with visible focus states, correct semantics and heading order for screen readers, and adequate touch targets. The existing code already reaches for this (44px minimum tap targets, `focus-visible` rings, `aria-label`s on icon links) — that floor must be held, not regressed.
