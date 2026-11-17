# Validation: Routr Network website

Worker report for the `routr-network` build (2026-11-17). This is the worker's own record, not an independent certification.

## 1. Scope and assumptions

- Scope: the single page in `src/App.tsx` (header, hero, how routing works with an interactive demo, the swarm, tokenomics, roadmap, footer), exported to `dist/`.
- Stack: Vite 7 + React 19 + TypeScript, `base: "./"`, fonts bundled locally. No wallet code; the brief is a token website, not a dapp.
- Brief constraints applied: no contract address anywhere ("CA: coming soon" in hero and footer); no Etherscan or DEX links; BUY is a disabled button labelled "BUY · SOON"; CA kept in one config value (`src/config.ts:13`, with `BUY_URL` and `EXPLORER_URL` beside it so no link template ships in the bundle); X is `@routr_network` / `https://x.com/routr_network` everywhere; English only; dark terminal look, mono accents, lime highlights.
- Inferred choices: headline is the brief's tagline ("The swarm is coming…", rendered with the ellipsis character); the name sits in the one-sentence lead under it and in the logo. The routing demo uses three anonymous sample providers with relative values, captioned "for illustration only", so no real provider, price or partner is implied. Everything not live carries a "Coming soon" badge or text.
- Not applicable: forms, dialogs, theme switching, localization, data loading, wallet flows (none exist in the product).

## 2. Coverage (Better Interface, six domains)

| Domain | Status | Evidence | Not performed |
| --- | --- | --- | --- |
| Accessibility | Checked (source + jsdom) | Native `button`/`a`/radio inputs; skip link first (`src/App.tsx:47`) to `main#main`; one `h1`, no skipped levels (test); `:focus-visible` 2px ring (`src/styles.css:123`); ring drawn on radio chips (`input:focus-visible + span`); all targets ≥44px (`.btn` 48px, `.link`/nav 44px, chips 44px); labelled `nav`, sections `aria-labelledby`; demo result `role="status"`; chosen row marked by the word "routed" plus colour; decorative icon/bar/cursor `aria-hidden`; motion only under `prefers-reduced-motion: no-preference`; viewport meta allows zoom; `lang="en"` | Real keyboard walk in a browser, rendered focus-ring visibility, screen-reader session, 200% zoom, forced-colors mode |
| Layout | Checked (source) | Single `.wrap` column; logical properties; content-driven breakpoints 36/44/52/60rem; first-screen order at 390: header, h1, lead, BUY · SOON + X buttons, CA line; demo table padding reduced below 36rem to fit 320px; long CA wraps (`overflow-wrap: anywhere`), never truncated | Rendered overflow at 320/390/1440, RTL mirror, actual first-screen screenshot |
| Writing | Checked (source) | Verb-first X action ("Follow @routr_network"); sentence case except the required "BUY · SOON"; consistent "Coming soon" term; no invented figures; no em dashes or emoji (static scan); hero lead is one sentence (29 words) | none (source is sufficient per guide) |
| Typography | Checked (source) | Five size tokens, two families, two weights (static scan); headings descend display → xl → lg; line-heights 1.02/1.15/1.25/1.55; `text-wrap: balance` on headings, `pretty` on paragraphs; measure capped (36rem/40rem); `tabular-nums` on numbers; font smoothing on `body`; woff2 local fonts | Rendered wrapping/widows at real widths; confirmation that the webfonts (not fallbacks) render |
| Colors | Checked (computed from declared tokens) | Semantic token tier over primitives; one accent; contrast computed with the WCAG formula from declared pairs: text/bg 16.69, text/surface 15.81, secondary/bg 8.70, secondary/surface 8.25, accent/bg 14.89, accent/surface 14.11, accent/accent-subtle 11.93, on-accent/accent 14.89, on-accent/accent-hover 16.36, focus ring/bg 14.89, border-strong/bg 3.52 (after fix) | Contrast measured on the rendered page (no browser) |
| UI | Checked (source) | No shadows, no border+shadow pairs, no cards in cards; consistent 8px radius; named transition properties, 150ms `cubic-bezier(0.2, 0, 0, 1)`; press `scale: 0.96`; hover gated by `(hover: hover)`; icons use `currentColor`; disabled BUY has a distinct dashed style and `not-allowed` cursor | Motion replay, hover/active states in a browser |

## 3. Findings and fixes

| # | Severity | Location | Evidence | Change | Recheck |
| --- | --- | --- | --- | --- | --- |
| 1 | Medium | `src/styles.css:8` (`--neutral-500`, used by `--color-border-strong`) | Computed 2.61:1 against `--color-bg` for the outline of the secondary button, segmented options and demo frame; WCAG 1.4.11 needs 3:1 for control boundaries | `#4a584a` → `#5c6c5c` | Computed 3.52:1 on bg, 3.33:1 on surface; static check passes |
| 2 | Medium | `src/styles.css` `.step` desktop rule (removed; now `src/styles.css:482`) | At ≥52rem the step number was moved into a single column directly above each `h3`: a mono label above a heading (kicker pattern the review counts against) on every step | Removed the single-column override; the number stays in its own column beside the heading at every width | Source shows `.step` keeps `grid-template-columns: 2.5rem 1fr` |
| 3 | Medium | `src/components/RouterDemo.tsx:54`, `src/styles.css:489`, `:574` | Width budget at 320px: 24px demo padding and 8px cell padding plus "← routed" left about 0px slack for the four-column table, risking horizontal overflow | Pick label shortened to "routed"; demo padding 16px and cell padding 4px below 36rem, restored above (`src/styles.css:617`) | Estimated ~18px slack at 320px; not rendered (no browser) |
| 4 | Low | `src/App.tsx:80-93` | `aria-label` on a `<pre>` (generic role) is not a supported accessible name, and the example log did not say it was not live | Wrapped in `<figure>` with a visible `figcaption`: "Example route. Live routing: coming soon." | jsdom render shows caption; tests pass |
| 5 | Low | `src/config.ts` | First version derived Etherscan/Uniswap URLs from the address, so those URL templates shipped in the JS bundle even though no link rendered | Replaced with separate `BUY_URL` and `EXPLORER_URL` config values (null) | Static scan: no Etherscan/DEX URL anywhere in `dist/` |

Remaining known items: none open from source review. Rendered-only checks are listed below as not performed.

Brief override noted: "BUY · SOON" is all caps by the brief's own wording; kept.

## 4. Verification

| Command | Outcome |
| --- | --- |
| `npm run typecheck` | Pass (no output from `tsc --noEmit`) |
| `npm run build` | Pass; `dist/` about 0.5 MB |
| `npm test` | 18/18 pass (`src/config.test.ts` 4, `src/routing.test.ts` 5, `src/App.test.tsx` 9) |
| Scratch static check of `dist/` and source | 28/28 pass (share tags, relative and existing asset URLs, no address, no Etherscan/DEX URL, X URL, no em dash/emoji, 5 sizes, 2 weights, no `transition: all`, 11 contrast pairs) |
| Scratch launch-switch test | 3/3 pass |
| `node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste` | **Did not run.** Playwright 1.64 (matching the installed Chromium 1248) was installed outside the repository, but Chromium exited 127: `libnspr4.so` and 12 other system libraries are missing. Using downloaded copies needed a loader-path override that was not approved, so it was not attempted another way |
| `og.png` | Rendered from an SVG with resvg using the bundled font files; inspected visually as an image file |

Browser viewports, screenshots, console/resource checks, and a real keyboard walk: **not performed** (no working browser).

## 5. Completion

**Incomplete for rendered verification; complete for build, typecheck, tests and source review.** The site builds, its primary interactions pass jsdom tests, and all source-level checks pass. The design-critic probe, screenshots at 320/390/1440, the 390 first-screen confirmation, rendered contrast and overflow checks could not run on this machine for the reason above and remain unverified.
