# Routr Network ($ROUTR) website

Site label: `routr-network`. One static page for Routr Network, the routing layer for AI agent swarms: a token on Ethereum mainnet paired with IMD on Uniswap v4. Tagline: "The swarm is coming…". X: [@routr_network](https://x.com/routr_network).

Stack: Vite 7, React 19, TypeScript 5. Fonts (Inter, JetBrains Mono) are bundled from `@fontsource`; nothing loads from a third-party host. The finished export is committed in `dist/` with relative asset URLs (`base: "./"`), so it works from any static host, an IPFS gateway subpath or an ENS name.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Document head: title, description, favicon, og/twitter tags |
| `src/config.ts` | Launch switch (`CONTRACT_ADDRESS`, `BUY_URL`, `EXPLORER_URL`), token facts, X handle |
| `src/App.tsx` | Page: header, hero, how routing works, the swarm, tokenomics, roadmap, footer |
| `src/components/` | `BuyButton`, `ContractAddress`, `XLink`, `Logo`, `XIcon`, `RouterDemo` |
| `src/routing.ts` | Illustrative routing rule used by the demo (sample values, not live data) |
| `src/styles.css` | Design tokens and all styles (documented in `DESIGN.md`) |
| `src/*.test.ts(x)` | Vitest unit and interaction tests |
| `public/` | `favicon.svg`, `og.png` (1200×630 share image) |
| `dist/` | Committed production export |

## Install, preview, rebuild

Requires Node 20+ (built with Node 24.21, npm 11.19).

```sh
npm ci                 # install exact versions from package-lock.json
npm run dev            # local dev server with hot reload
npm run build          # tsc --noEmit, then vite build into dist/
npm run preview        # serve the built dist/ locally
npm run typecheck      # tsc --noEmit only
npm test               # vitest run (unit + interaction tests in jsdom)
```

After any source change run `npm run build` and commit `dist/` together with the source; the publisher serves `dist/` as committed and does not rebuild.

## Turning the contract on later

Until launch the site shows "CA: coming soon" in the hero and the footer, renders no Etherscan or DEX link, and shows a disabled "BUY · SOON" button. All three are driven by `src/config.ts`:

```ts
export const CONTRACT_ADDRESS: string | null = null; // 0x + 40 hex chars once deployed
export const BUY_URL: string | null = null;          // swap page URL (https)
export const EXPLORER_URL: string | null = null;     // Etherscan token page (https)
```

A well-formed `CONTRACT_ADDRESS` replaces "CA: coming soon" with the full address in both places (linked when `EXPLORER_URL` is set). An `https` `BUY_URL` turns the button into a "Buy $ROUTR" link. Malformed values are ignored and the coming-soon state stays. Rebuild after editing.

## Validation (worker run, 2026-11-17)

Commands run on the final source, with results:

| Command | Result |
| --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | Pass, no errors |
| `npm run build` | Pass. `dist/index.html` 1.7 kB, JS 233 kB (73 kB gzip), CSS 13 kB, 8 font files, `og.png`, `favicon.svg`; about 0.5 MB total |
| `npm test` (`vitest run`) | 18/18 pass across `src/config.test.ts`, `src/routing.test.ts`, `src/App.test.tsx` |
| Static export check (worker scratch script) | 28/28 pass: title, description, og:title, og:image, favicon present; every asset URL in `index.html` and CSS is relative and exists; no `0x…` address and no Etherscan/Uniswap/DEX URL anywhere in the export; X URL present; no em dash or emoji in copy; 5 font-size tokens; 2 weights; no `transition: all`; computed token contrast pairs all meet WCAG |
| Launch-switch check (worker scratch test) | 3/3 pass: valid address goes live; CA without buy URL keeps BUY disabled; non-https buy URL rejected |

Interactions covered by `src/App.test.tsx` (jsdom): "CA: coming soon" appears exactly twice (hero, footer) and no address renders; no Etherscan/DEX links; BUY · SOON is a disabled native button; every X mention links to `https://x.com/routr_network` with `rel="noopener"`; every nav/skip/logo hash link targets an existing section id; one `h1` and no skipped heading levels; tokenomics figures (1,000,000,000, 80%, 800,000,000, two 10% rows, $ROUTR / IMD, Uniswap v4); roadmap lists the agents marketplace paid in $ROUTR with three "Coming soon" badges; the routing demo switches Cheapest → Provider A, Fastest → Provider B, Balanced → Provider C, updates the `role="status"` line and marks exactly one row.

### Limitations

- **No browser rendering was performed.** Chromium on this machine could not start (missing system libraries such as `libnspr4.so`/`libnss3.so`), and the loader-path override needed to use separately downloaded copies was not approved, so it was not used. As a result the design-critic probe (`taste.mjs`) did **not** run, and there are no screenshots at 320/390/1440, no measured rendered contrast, no overflow measurement, no real keyboard walk and no console/network check in a browser. Layout at 320/390 was reviewed from source only.
- jsdom does not do layout or native radio arrow-key movement; arrow-key behaviour relies on native `<input type="radio">` and was not exercised.
- No screen-reader, physical-device, 200% zoom or WebKit testing.
- `og:image` is a relative path (`./og.png`); some unfurlers want an absolute URL, which can only be set once the hosted address is known.

The full Better Interface review (coverage, findings, fixes) is in `VALIDATION.md` (copy in `artifacts/validation.md`); the design system is in `DESIGN.md`.
