# Routr Network design system

Taken from the implemented source: `src/styles.css` (all tokens and component classes), `src/App.tsx` (page structure), `src/components/*` (reusable pieces), `src/config.ts` (launch switch). Values below are copied from those files. Rendered appearance was not inspected in a browser (see `VALIDATION.md`, Limitations).

## Overview

A one-page site for Routr Network ($ROUTR), the routing layer for AI agent swarms, for people who follow early token launches on Ethereum. The look is a dark terminal: near-black green-tinted background, monospace for headings, labels, numbers and controls, a sans-serif for reading copy, and one lime accent for the things that matter (the accent word in the headline, the primary button, the chosen route, the pool share, status badges).

Composition rules that apply to any future page:

- One centred column (`.wrap`, max 72rem) with sections separated by a single hairline on top and 64px of vertical padding.
- Each section is a heading pair: a short mono `h2`, then one plain sentence (`.section__lead`) in secondary text.
- Content blocks are flat bordered panels on `--color-surface`; there are no shadows anywhere.
- Anything that is not live is marked with the `Coming soon` badge or says "coming soon" in plain text. No prices, volumes, holder counts or partners are shown.

## Colors

Defined in `src/styles.css:2-58`. Primitives (`--neutral-*`, `--lime-*`) are never used in components; components use only the semantic tokens. Dark only (`color-scheme: dark`); there is no light theme.

| Token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `--neutral-950` `#090c09` | Page background |
| `--color-surface` | `--neutral-900` `#0f140f` | Panels: steps, features, roadmap rows, terminal |
| `--color-surface-raised` | `--neutral-850` `#141b14` | Reserved raised surface (declared, not used by a component yet) |
| `--color-border` | `--neutral-700` `#253025` | Panel borders, section and row dividers |
| `--color-border-strong` | `--neutral-500` `#5c6c5c` | Borders that outline a control (secondary button, segmented options, demo frame); team swatch |
| `--color-text` | `--neutral-100` `#e8eee8` | Body and heading text |
| `--color-text-secondary` | `--neutral-300` `#a3b0a3` | Leads, descriptions, captions, nav links; swarm swatch |
| `--color-accent` | `--lime-400` `#c4f04a` | Primary fill, accent words, chosen route, badges, pool swatch |
| `--color-accent-hover` | `--lime-300` `#d6f77f` | Primary button hover |
| `--color-accent-subtle` | `--lime-900` `#1c2610` | Fill of the disabled "BUY · SOON" button |
| `--color-on-accent` | `--neutral-950` | Text on an accent fill |
| `--color-focus` | `--lime-400` | Focus ring |

Contrast computed from these declared pairs (WCAG formula, `test/scratch/static.mjs`; not measured on a rendered page): text on bg 16.69:1, text on surface 15.81:1, secondary on bg 8.70:1, secondary on surface 8.25:1, accent on bg 14.89:1, accent on accent-subtle 11.93:1, on-accent on accent 14.89:1, border-strong on bg 3.52:1 (non-text, needs 3:1).

The accent means "this matters / this is the action". Do not use it for decorative text.

## Typography

Fonts are bundled locally from `@fontsource` (imported in `src/main.tsx`): latin subsets of Inter 400/700 and JetBrains Mono 400/700, as woff2 with woff fallback.

- `--font-sans`: `"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` for reading copy (leads, descriptions, table text).
- `--font-mono`: `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` for headings, logo, buttons, nav X link, badges, numbers (`.num`), CA line, terminal and route output. Never for paragraphs.
- Weights: `--weight-regular` 400, `--weight-bold` 700. Nothing else.

Type scale (five sizes, `src/styles.css:34-38`):

| Token | Value | Used for |
| --- | --- | --- |
| `--text-display` | `clamp(2.5rem, 1.5rem + 4.4vw, 4.5rem)` | `h1` only. Line-height 1.02, letter-spacing -0.04em |
| `--text-xl` | `clamp(1.75rem, 1.45rem + 1.2vw, 2.25rem)` | `h2`. Line-height 1.15, letter-spacing -0.02em |
| `--text-lg` | `1.25rem` | `h3`, hero lead, logo, step numbers |
| `--text-base` | `1rem` | Body (line-height 1.55), buttons |
| `--text-sm` | `0.875rem` | Nav links, badges, CA line, table, captions, terminal, footer legal |

Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Leads are capped at 36rem (hero) and 40rem (sections). Changing numbers use `.num` (mono, `tabular-nums`). Copy is stored in natural case; the only all-caps label is the brief's required "BUY · SOON".

## Layout

- Container: `.wrap` (`src/styles.css:166`): `max-width: 72rem`, inline padding `clamp(1rem, 0.6rem + 2vw, 2rem)`.
- Spacing tokens on a 4px base: `--space-1` 4px, `-2` 8px, `-3` 12px, `-4` 16px, `-6` 24px, `-8` 32px, `-12` 48px, `-16` 64px, `-24` 96px. Inside a group 8 to 16px; between groups 24px; between sections 64px.
- Logical properties throughout (`padding-inline`, `border-block-start`, `inset-inline-start`).

Breakpoints (chosen where content stops fitting):

| Width | Change |
| --- | --- |
| below 36rem | Router demo uses 16px padding and 4px cell padding so the four-column table fits at 320px |
| 36rem (576px) | Demo padding 24px, cell padding 8px |
| 44rem (704px) | Allocation rows become one line: name, share, amount, note |
| 52rem (832px) | Header section nav appears; steps and swarm features go to three columns; footer goes to two columns |
| 60rem (960px) | Hero becomes two columns (copy 1.25fr, terminal 1fr), larger hero padding |

Mobile first screen (by source order): header (logo, X link), headline, one-sentence lead, BUY · SOON and Follow @routr_network buttons, CA line; the example terminal follows. There is no section nav below 52rem; the page is one scrolling column.

## Elevation & Depth

Flat. No `box-shadow` is used. Depth comes from tone (`--color-surface` panels on `--color-bg`) plus a 1px `--color-border` outline. The router demo frame uses `--color-border-strong` and no fill, to read as an interactive area rather than a content card. Only the skip link has a `z-index` (10).

## Shapes

- `--radius-md` 8px: buttons, panels, demo frame, segmented options.
- `--radius-sm` 4px: focus ring corners, skip link.
- 2px: allocation bar segments and swatches.
- 999px: `.badge` pill.

## Components

| Component | Source | Use and states |
| --- | --- | --- |
| Button | `.btn` + `.btn--primary` / `.btn--secondary`, `src/styles.css:254-307` | 48px min height, mono bold. Primary: accent fill; hover `--color-accent-hover` (hover devices only); press `scale: 0.96`. `:disabled` primary: subtle fill, dashed accent border, accent text, `not-allowed` cursor. Secondary: transparent with `--color-border-strong` outline; hover turns border and text accent. Transitions name only `background-color, border-color, color, scale`, 150ms `cubic-bezier(0.2, 0, 0, 1)` |
| BuyButton | `src/components/BuyButton.tsx` | Native `<button disabled>` "BUY · SOON" while `BUY_URL` is null; an `<a class="btn btn--primary">` "Buy $ROUTR" once configured |
| ContractAddress | `src/components/ContractAddress.tsx`, `.ca` | "CA: coming soon" while `CONTRACT_ADDRESS` is null; then the full address (wraps with `overflow-wrap: anywhere`, never truncated), linked if `EXPLORER_URL` is set. Used in hero and footer |
| XLink | `src/components/XLink.tsx` | Always `https://x.com/routr_network`, new tab, `rel="noopener noreferrer"`. `variant="button"` (secondary button) or `"plain"` (`.link`, mono, 44px min height) |
| Logo | `src/components/Logo.tsx`, `.logo` | "routr/" with lime slash; links to `#top` |
| Badge | `.badge` | Pill, accent outline and text, mono 14px, sentence case. Use only for status ("Coming soon") |
| Numbered row | `.steps`/`.step`, `.roadmap`/`.roadmap__item` | Surface panel with a 2.5rem number column beside the content. The number sits beside the heading, never above it |
| Feature card | `.features li` | Surface panel with `h3` and one description |
| RouterDemo | `src/components/RouterDemo.tsx`, `.segmented`, `.demo__*` | Native radio group in a `fieldset` with a visible `legend`; inputs overlay their visible chips so arrow keys, Space and click work natively. Checked chip: accent fill. Focus: ring drawn on the chip via `input:focus-visible + span`. Result line is a `role="status"` region; the chosen table row gets accent bold name and the word "routed" (not colour alone). Sample values come from `src/routing.ts` and are captioned as illustration |
| Terminal figure | `.terminal`, `figcaption.terminal__caption` | Surface panel with a `pre > code` block and a caption saying it is an example. Blinking cursor only under `prefers-reduced-motion: no-preference` |
| Allocation | `.alloc-bar`, `.alloc`, `.swatch--{pool,swarm,team}` | Decorative bar (`aria-hidden`) plus a `dl` that carries every value as text |
| Facts | `.facts` | `dl` grid, label in secondary sans, value in mono |
| Skip link | `.skip-link` | First focusable element; appears on focus, targets `main#main` |

Focus: every focusable element gets `outline: 2px solid var(--color-focus); outline-offset: 3px` on `:focus-visible` (`src/styles.css:123`).

## Do's and Don'ts

- Do start a new section with `<section class="section wrap">`, an `h2`, and a `.section__lead` sentence.
- Do put a number, status or ticker in mono (`.num`, `.badge`); keep sentences in Inter.
- Do mark anything not live with the `Coming soon` badge; never fill it with a sample figure.
- Do switch the token live only through `src/config.ts` (`CONTRACT_ADDRESS`, `BUY_URL`, `EXPLORER_URL`), then rebuild.
- Do keep one filled accent action per view (BUY). Other actions are secondary or plain links.
- Don't add a label above a heading (kicker/eyebrow); put numbers or badges beside or inside it.
- Don't add a font size outside the five tokens or a weight other than 400/700.
- Don't combine a border and a shadow on one surface, or nest a panel inside a panel.
- Don't use `transition: all`; don't add motion that runs under reduced motion.

Recipe for one more page or section: wrap it in `.section.wrap` with `aria-labelledby` on its `h2`, list items as `.features` cards or `.steps` rows, use `.btn--secondary` or `XLink` for actions, take colours only from the semantic tokens above, add a nav entry to `NAV` in `src/App.tsx`, then `npm run build`.
