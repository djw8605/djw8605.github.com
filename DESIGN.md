---
name: Derek Weitzel
description: An engineering notebook for distributed research infrastructure — precise, dense, dark-native.
colors:
  sky: "#0ea5e9"
  sky-deep: "#0284c7"
  sky-focus: "#38bdf8"
  cyan-tag-ink: "#164e63"
  cyan-tag-ink-dark: "#a5f3fc"
  rose-selection: "#f43f5e"
  paper: "#f5f7fc"
  surface: "#ffffff"
  night: "#050b17"
  ink: "#0f172a"
  ink-dark: "#e5edf8"
  ink-secondary: "#334155"
  ink-secondary-dark: "#c8d6e5"
  rule: "#e2e8f0"
  rule-dark: "#475569"
  slate-50: "#f8fafc"
  slate-500: "#64748b"
  slate-800: "#1e293b"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.45rem–3rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem–2.8rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.95rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  subtitle:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, calc(0.97rem + 0.2vw), 1.08rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  prose:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.82
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  chip: "0.25rem"
  sm: "0.375rem"
  md: "0.5rem"
  icon: "0.6rem"
  code: "0.45rem"
  image: "0.85rem"
  block: "0.9rem"
  full: "9999px"
spacing:
  gutter: "1rem"
  gutter-lg: "1.5rem"
  card: "1.4rem"
  card-sm: "1.2rem"
  panel: "1.5rem"
  panel-md: "2rem"
  panel-lg: "2.5rem"
  section: "4rem"
  section-sm: "2.25rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.slate-50}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.35rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.slate-800}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.slate-800}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.35rem"
    height: "44px"
  button-compact:
    backgroundColor: "transparent"
    textColor: "{colors.slate-800}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.95rem"
    height: "38px"
  panel:
    backgroundColor: "transparent"
    rounded: "{rounded.md}"
    padding: "{spacing.panel}"
  card-project:
    backgroundColor: "transparent"
    rounded: "{rounded.sm}"
    padding: "{spacing.card}"
  card-post:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  tag-pill:
    textColor: "{colors.cyan-tag-ink}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.65rem"
  tech-badge:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.875rem"
    height: "44px"
---

# Design System: Derek Weitzel

## Overview

**Creative North Star: "The Engineering Notebook"**

This is a record before it is a presentation. The system behaves like a well-kept lab notebook: everything is dated, everything is labeled, nothing is claimed that isn't written down. Panels are pages — hairline-ruled rectangles that hold one coherent unit of content. Monospace runs in the margins as annotation: dates, section eyebrows, tags, the footer colophon. The sans face carries the substance. The separation is strict and it is the system's core discipline.

The register is precise, quiet, and technical, and it is comfortable being dense. Information-forward is a feature here: a page may carry a lot at once, and scanability comes from consistent rhythm and hard hierarchy rather than from breathing room. Restraint is doing credibility work — an infrastructure engineer's site earns trust by being exact, not by being impressive.

Two anti-references bound this from both sides. It is **not a startup landing page**: no gradient headline text, no floating testimonial cards, no funnel energy, no persuasion architecture. It is equally **not an academic default**: no serif CV page, no unstyled bullet lists, no 1990s faculty-homepage plainness. The system sits deliberately between them — contemporary and carefully built, but pointed at the record rather than at the reader's decision.

Dark mode is a first-class state, not an inversion afterthought. It ships with its own hand-tuned text ramp because the utility-layer defaults were not good enough.

**Key Characteristics:**
- Hairline rings, not shadows, do the structural separating
- Monospace is reserved entirely for metadata; it never carries prose
- Flat at rest — depth appears only as a response to interaction
- Space Grotesk + IBM Plex Mono, no third face
- Negative letter-spacing on every heading (`-0.015em` global, tighter on display)
- Motion is one duration and one curve, applied uniformly
- Both themes are authored, neither is derived

## Colors

A slate-dominant neutral field with a single blue accent reserved for interaction, one cyan wash for taxonomy, and two colors that appear so rarely they function as punctuation.

### Primary
- **Sky** (#0ea5e9): The interaction color. Body-copy links, card-title hovers, and the sole accent a visitor is trained to associate with "this does something." Used as text; as a background it appears only as a ≤15% wash on icon-button hover.
- **Sky Deep** (#0284c7): Link hover, paired with an underline that appears only on hover. The darker step keeps AA contrast on light backgrounds where sky-500 alone is marginal.
- **Sky Focus** (#38bdf8): Focus rings exclusively (`ring-sky-400/85`), plus the global `outline: 2px solid rgba(14,165,233,0.85)` with a 3px offset. Never decorative.

### Secondary
- **Cyan Tag Ink** (#164e63): Tag-pill text on light, over a `cyan-700/15` wash. The one place taxonomy is allowed its own hue instead of borrowing slate.
- **Cyan Tag Ink Dark** (#a5f3fc): The dark-theme counterpart, over a `cyan-300/15` wash.

### Tertiary
- **Rose Selection** (#f43f5e): Text selection only, at 28% (`::selection`). It appears nowhere else in the system, which is exactly why it reads as a highlighter stroke rather than a brand color.
- Two ambient orbs sit behind all content at very low opacity — cyan at 10% and fuchsia at 10% (5% in dark), both `blur-3xl` and `pointer-events-none`. They are atmosphere, not palette. Nothing in the foreground may sample them.

### Neutral
- **Paper** (#f5f7fc): The light page field, set on `:root` as `--bg-primary`.
- **Surface** (#ffffff): Raised panel and post-card fill, usually at 90% opacity so the field shows through.
- **Night** (#050b17): The dark page field. This is the effective value — see the Do's and Don'ts note about the `night-*` scale.
- **Ink** (#0f172a) / **Ink Dark** (#e5edf8): Primary text and all headings.
- **Ink Secondary** (#334155) / **Ink Secondary Dark** (#c8d6e5): Body paragraphs, set globally on `p`.
- **Rule** (#e2e8f0) / **Rule Dark** (#475569): The hairline that separates everything. `ring-slate-200` appears on 14 surfaces.
- The full slate ramp (50–950) is in active use for borders, muted text, and mobile-menu states. In dark mode, seven slate *text* steps are re-mapped to hand-tuned values in `assets/css/main.scss` (e.g. `.text-slate-600` → `#b2c5d8`) because Tailwind's dark variants do not flip inside utility-heavy sections. Those overrides are load-bearing, not cruft.

### Named Rules

**The Sky-Is-Interaction Rule.** Sky means "this responds." It is never a heading color, never a section-header decoration, never a fill for a static surface. If an element is not clickable or focused, it is not sky.

**The Two-Authored-Themes Rule.** Light and dark are both designed, and neither is derived from the other by filter or inversion. Any new color must be specified in both, and the dark value must be checked against the `main.scss` override block before being assumed.

## Typography

**Display Font:** Space Grotesk (with `ui-sans-serif`, `system-ui`, `sans-serif`)
**Body Font:** Space Grotesk — the same face, differentiated by weight and tracking rather than by family
**Label/Mono Font:** IBM Plex Mono (with `ui-monospace`, `SFMono-Regular`, `monospace`)

**Character:** A two-face system doing three jobs. Space Grotesk's slightly mechanical geometry keeps headings from reading as either corporate or scholarly — it is contemporary without being trendy. IBM Plex Mono is the annotation voice: every date, eyebrow, tag, and code span. The pairing is what makes the notebook metaphor legible; drop the mono and the system reads as a generic Tailwind site.

Both load from Google Fonts with `preconnect`, a `preload` hint, and a `media="print"` / `onload` swap, with a `<noscript>` fallback. Weights are deliberately narrow: 400/500/600/700 for the sans, 400/500/600 for the mono.

### Hierarchy
- **Display** (700, 2.45rem → 2.75rem @sm → 3rem @lg, line-height 1.05, tracking -0.01em): The home hero name. Exactly one per site.
- **Headline** (700, 2.25rem → 2.8rem @sm, tracking-tight): Page titles — post titles, archive titles, project titles.
- **Title** (700, 1.95rem–2rem, tracking-tight): Home section headings ("Projects", "Technologies", "Blog").
- **Subtitle** (700–800, 1.25rem–1.4rem, line-height tight): Card titles. Post cards use `font-extrabold` with `-0.01em`; archive cards use `font-bold` at 1.4rem.
- **Body** (400, `clamp(1rem, calc(0.97rem + 0.2vw), 1.08rem)`, line-height 1.7): The global default set on `body`.
- **Prose** (400, 1.05rem, line-height 1.82): Long-form article and project content. The looser leading is deliberate — this is where the 17-year archive lives and it is read, not scanned.
- **Label** (400, 0.75rem, uppercase, letter-spacing 0.16em–0.28em): Mono metadata. Tracking scales with prominence: 0.28em for home section eyebrows, 0.2em for page eyebrows, 0.18em for dates and sidebar headings, 0.16em for archive dates.

In-prose headings run 2.2rem / 1.9rem / 1.45rem at line-height 1.2 with `mt-8 mb-3`, well below the page-title scale so an article's internal structure never competes with its title.

### Named Rules

**The Mono-Is-Metadata Rule.** IBM Plex Mono carries dates, section eyebrows, tag chips, inline code, code blocks, and the footer colophon. It never sets a heading, never sets body copy, and never runs longer than a short phrase. If mono is carrying meaning rather than labeling it, it is being misused.

**The Tight-Heading Rule.** Every heading carries negative tracking — `-0.015em` globally on `h1`–`h6`, tightening toward `-0.025em` (`tracking-tight`) at title sizes and up. Headings never sit at default tracking.

## Layout

A single centered column at `max-w-7xl` (80rem) with `px-4` gutters stepping to `px-6` at `sm`. Every page uses it; there is no full-bleed surface except the fixed ambient-orb layer and the sticky header's background.

**Vertical rhythm.** Home sections run `py-16`, compressing to `py-9` below `sm`, separated by a full-width hairline (`border-t-2` on mobile, `border-t` from `sm` up — heavier on small screens where the section spacing is tighter). Content pages use `py-10` stepping to `py-12`/`py-16` at `lg`. Panel interiors step `p-6` → `p-8` @sm → `p-10` @lg.

**Grids.** Two-column content pages put the sidebar on a fixed track: `lg:grid-cols-[minmax(0,1fr)_300px]` for post TOCs and `[minmax(0,1fr)_320px]` for project pages, both with `lg:sticky lg:top-24` on the aside. The home hero inverts the usual weighting with `lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]` — the photograph is deliberately the smaller half. Card grids vary by density: projects go `sm:2 → xl:3`, home project chips go `sm:2 → lg:3 → xl:4`, and the blog splits `lg:[minmax(0,2fr)_minmax(280px,1fr)]`.

**Density.** Information-forward by intent. The home page stacks hero, projects, technologies, and blog with a sidebar; project pages carry two sidebar panels. The system does not use whitespace to signal importance — hierarchy comes from type scale and the hairline grid.

**Breakpoints.** Tailwind defaults, unmodified: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. `md` is the navigation breakpoint (desktop nav and theme toggle appear; hamburger disappears). `sm` is the layout breakpoint for nearly everything else. Several components use `max-sm:` to *increase* weight on small screens rather than reduce it — borders thicken to 1.5px, shadows deepen, padding tightens.

## Elevation & Depth

**Flat at rest; depth is a response.** Surfaces sit flush in the field and are separated by a 1px ring, not by a shadow. The shadows that exist at rest are almost subliminal — a 1–3px offset at 6–8% opacity — present only to keep a white card from dissolving into a near-white field. Real depth is reserved for interaction: cards lift, buttons press, and the ring brightens.

Behind everything sits a fixed, non-interactive atmosphere layer: two large blurred orbs (cyan and fuchsia, `blur-3xl`, 10% light / 5% dark). This is the only ambient depth in the system and it never moves or responds.

The sticky header is the one element using material rather than geometry: `bg-white/80` with `backdrop-blur`, so content dissolves under it rather than colliding with it.

### Shadow Vocabulary
- **Panel rest** (`box-shadow: 0 1px 2px rgba(15,23,42,0.06)`; dark `0 1px 2px rgba(2,6,23,0.28)`): Post and archive cards. Barely visible by design.
- **Card rest** (`box-shadow: 0 1px 3px rgba(15,23,42,0.08)`): Project cards. On mobile this deepens to `0 2px 6px rgba(15,23,42,0.1)` where the ring alone reads too faintly.
- **Figure frame** (`box-shadow: 0 4px 10px rgba(15,23,42,0.1)`; dark `0 5px 12px rgba(2,6,23,0.32)`): The home hero photograph — the only element in the system permitted a genuine drop shadow.
- **Hover lift** (`translateY(-4px)` on project cards, `-2px` on the theme toggle, plus `shadow-md`): The primary depth signal.
- **Press** (`scale(0.99)`): Every primary and secondary button.

### Named Rules

**The Ring-First Rule.** Structural separation is a 1px ring (`ring-1 ring-slate-200`, `dark:ring-slate-600/75`), never a shadow. If a new surface needs to be distinguished from the field, it gets a ring. Reach for a shadow only when the surface is also lifting.

**The Flat-At-Rest Rule.** A surface at rest carries at most a 3px, ≤8%-opacity shadow. Anything heavier must be justified by a state change — hover, focus, or the sticky header's material.

## Shapes

Rectilinear and calm, with a radius scale that is genuinely functional rather than uniform. Corners get rounder as content gets softer: buttons and project cards are crisp at `0.375rem`, panels and post cards sit at `0.5rem`, and embedded media rounds further — prose images at `0.85rem`, code blocks at `0.9rem` (dropping to `0.5rem` below `sm`, where a large radius on a narrow block wastes width).

Fully-round (`9999px`) is reserved for things that are conceptually tokens rather than containers: tag pills, technology badges, and the theme toggle. Archive tag chips are the deliberate exception — they use the smallest radius (`0.25rem`) with mono 10px uppercase text, reading as terminal output rather than as pills.

Borders are hairlines, almost always expressed as a ring or a low-opacity border (`border-slate-900/15`, `border-slate-600/40`). Solid full-opacity borders do not appear. Below `sm`, project cards thicken to `1.5px` to survive the smaller viewport.

The home hero figure is the one framed object in the system: a bordered container with the image on a 16:10 crop (16:9 from `sm`) at `saturate(0.92)`, capped with a bordered, centered mono caption bar — a plate in a notebook.

## Components

### Buttons
- **Shape:** Crisply rounded (`0.375rem`), never pill-shaped.
- **Primary:** Solid ink fill (#0f172a) with near-white text (#f8fafc), `0.72rem 1.35rem` padding, `font-semibold` at 0.94rem with `leading-[1.1]`. Inverts in dark mode to a light fill with dark text.
- **Secondary:** Transparent with a hairline border (`border-slate-600/40`) and ink text. Same geometry as primary.
- **Compact:** The card-footer variant — `0.55rem 0.95rem` padding at 0.86rem, `min-h-[38px]`. The only place the 44px floor is relaxed, and only for a secondary action adjacent to a primary one.
- **Ghost:** Borderless, no padding, used for "View All Projects." It gains a focus radius (`0.35rem`) only when focused.
- **Hover / Focus:** 190ms colour transition on the expo-out curve; `scale(0.99)` on press; a 2px sky focus ring at 85% with a 2px offset, offset-coloured per theme.

### Chips
- **Tag pill:** Cyan wash over a hairline border, fully round, `0.2rem 0.65rem` at 0.78rem. Hover is a simple `opacity: 0.8`.
- **Archive tag chip:** The terminal variant — `0.25rem` radius, mono 10px uppercase, slate wash. Capped at three per card.
- **Technology badge:** White pill with a hairline border, a 20px logo in a 32px well, and a 0.875rem label. Enforces `min-h-[44px]`. Above six badges on mobile it collapses to a preview plus a `<details>` disclosure labeled with the full count.

### Cards / Containers
- **Corner Style:** `0.5rem` for content panels and post cards; `0.375rem` for project cards.
- **Background:** Panels are transparent or `white/90`; project cards are fully transparent so the page field and orbs show through. Dark mode fills panels at `slate-950/60`–`/70`.
- **Shadow Strategy:** See Elevation — rest shadows are near-invisible; the ring does the work.
- **Border:** `ring-1 ring-slate-200` on panels; `border-slate-900/15` on project cards.
- **Internal Padding:** `1.4rem` for project cards (`1.2rem` below `sm`); `1.5rem → 2rem → 2.5rem` for panels; `1rem → 1.25rem` for archive cards.
- **Hover:** Project cards lift 4px, brighten their border to `slate-500/50`, and tint their background. Post cards brighten the ring to `slate-400` and tint, without lifting.

### Navigation
- **Desktop** (`md` and up): Text links at 0.98rem `font-medium` with `0.012em` tracking, `min-h-[44px]`, in a `gap-8` row. Each carries a pseudo-element underline 1.5px tall, pre-scaled to `0.42` at zero opacity, expanding to full width at 55% opacity on hover and focus. The active link is `font-semibold`, near-black, with the underline at `scale-x-1` and 95% opacity.
- **Mobile** (below `md`): A hamburger toggling a bordered panel of full-width `0.5rem`-radius rows with a slate hover wash. The theme toggle joins the stack as the last row.
- **Theme toggle:** A fully-round bordered button with a sun/moon icon and a text label that names the *destination* state ("Dark" when light). Carries `aria-pressed` and stays in sync across both instances. Hidden below `md`; lifts 2px on hover.

### Diagrams
A ```` ```mermaid ```` fence in a post renders as a `<figure>` (usage in `README.md`).
- **Plate:** The SVG sits on a surface plate: white in light, `slate-950` (#020617) in dark, with a `rule` hairline, a `0.85rem` radius and `1.25rem` padding (`0.5rem` and `0.75rem` below `sm`). The prose figcaption sits underneath, as it does for images.
- **Palette:** Slate only. Sky stays off diagrams under the Sky-Is-Interaction Rule. Nodes fill `slate-50` / `slate-900` with a `slate-400` / `slate-500` border; edges are `slate-500` / `slate-400`; subgraphs are hairline frames with no fill.
- **Type:** Node labels use Space Grotesk. Subgraph titles and edge labels are annotations, so they use IBM Plex Mono; subgraph titles are uppercase and tracked, like an eyebrow.
- **Source of truth:** Both palettes live in `_includes/mermaid.html`. The plate colors in `assets/css/main.scss` must match the palettes' `background`, `clusterBkg` and `edgeLabelBackground`, or edge labels show as boxes.

### Charts
The `chart.html` include renders a Chart.js `<figure>` from a `_data` file (usage in `README.md`).
- **Plate:** The diagram plate. The title, subtitle, legend, plot and data-table disclosure sit on it; the prose figcaption sits underneath.
- **Text:** The title states the finding, in bold `ink` at 1.2rem. The subtitle says what is counted and over what span, in `slate-500` (#9db2c8 in dark). Ticks, legend and series labels are `ink-secondary`; callouts are `ink-secondary`, and the headline callout is semibold `ink`. Everything is Space Grotesk. Text never takes a series color, so it keeps its contrast.
- **Marks:** The series a chart is about is sky (#0ea5e9) in both themes, turning sky-deep (#0284c7) under the pointer. This is the one sanctioned exception to the Sky-Is-Interaction Rule: a chart responds to hover, and one focal hue keeps everything else quiet. Context series are 2px lines with small points, `slate-500` in light and `slate-400` in dark (the diagram edge pairing), so they read above the gridlines. Gridlines are horizontal `rule` hairlines (#475569 at 60% in dark), with no vertical grid and no axis lines. Light-mode sky is 2.65:1 against the plate, so a sky series always gets a legend entry, a direct label or callout, and the data table.
- **Identity:** An HTML legend above the plot names every series. From a 560px plot width each series is also named at its right-hand end.
- **Fallback:** The canvas carries an `aria-label` summarizing the finding. Every value is in a collapsible table under the plot, which is what feeds, readers without JavaScript and screen readers get.
- **Source of truth:** Both palettes are the `--chart-*` custom properties in `assets/css/main.scss`. The chart script reads them, so the legend and the canvas can't drift apart. A new series color needs a token in both themes.

### Inputs / Fields
The site has no forms. If one is added, it inherits the global transition and the global focus outline (`2px solid rgba(14,165,233,0.85)`, 3px offset); match panel geometry — `0.5rem` radius with a `slate-200` hairline — rather than inventing a field style.

### Signature Component: the mono section eyebrow

Major sections are introduced by a mono, uppercase, wide-tracked line prefixed with a double slash — `// research infrastructure`, `// systems`, `// writing`, `// project`. It sits directly above the heading in a muted slate, borrowing a code comment to label a region of the page. It appears on seven sections today and is the most recognizable move in the system.

This is a house pattern, **not an invariant**: use it where a section benefits from a label, and leave it off where it would be noise. Do not require one on every new section, and do not let its frequency creep to the point where it stops reading as an annotation.

## Do's and Don'ts

### Do:
- **Do** separate surfaces with a 1px ring (`ring-1 ring-slate-200`, `dark:ring-slate-600/75`) before reaching for a shadow.
- **Do** keep every transition on the house motion pair: `190ms` with `cubic-bezier(0.22, 1, 0.36, 1)`, exposed as `--motion-duration` and `--motion-ease`. Card hovers may use `200ms ease-out` and image scales `500ms`; nothing else invents a timing.
- **Do** author both themes explicitly, and check the `html.dark` override block in `assets/css/main.scss` before assuming a `dark:` utility will win.
- **Do** hold the 44px minimum interactive target. The 38px compact button is the single sanctioned exception.
- **Do** give every interactive element a visible focus state — the global sky outline or the `focus-visible:ring-2 ring-sky-400/85` pair with a theme-correct `ring-offset` color.
- **Do** use mono for metadata only: dates, eyebrows, tags, code, colophon.
- **Do** thicken borders and deepen shadows below `sm` (`max-sm:border-[1.5px]`, deeper card shadow) where hairlines stop reading.
- **Do** keep the accent scarce. Sky earns its meaning by appearing only on things that respond.

### Don't:
- **Don't** use sky as a fill, a heading color, or a decorative accent. Text and focus rings only, plus ≤15% hover washes.
- **Don't** let rose or fuchsia leave their posts. Rose is `::selection` at 28%; fuchsia is a 5–10% blurred orb. Neither is available to components.
- **Don't** set body copy or headings in IBM Plex Mono.
- **Don't** ship a heading at default tracking — headings are always negatively tracked.
- **Don't** add a rest-state shadow heavier than 3px at 8% opacity. Depth is earned by interaction.
- **Don't** introduce a third typeface. Two faces and a narrow weight set are the system.
- **Don't** exceed the `max-w-7xl` container or introduce a full-bleed section. The only full-width layers are the ambient orbs and the sticky header's material.
- **Don't** trust the `night-*` scale in `tailwind.config.js`. `night-900` and `night-800` are defined but used **zero** times, `shadow-glow` is likewise unused, and the single `night-950` (#050a1a) usage is overridden by `html.dark body { background: #050b17 !important }`. The effective dark field is **#050b17**. Treat that config block as dead until it is either wired up or removed — do not build new work on those tokens.
- **Don't** reach for startup-landing-page moves: gradient headline text, testimonial cards, oversized CTA blocks, or persuasion sections. This surface is a record.
- **Don't** fall back to academic-default plainness either: unstyled lists, serif body text, or naked link-lists are equally off-system.
