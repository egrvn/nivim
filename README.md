# NIVIM

Semantic Figma-led React MPA for `NIVIM / VIDEL R1`.

The project is rebuilt around the `23120:*` block from the Figma file `Wqxtf3Cd7vatdGp0rN5BQC`, but implemented as a real website instead of a scaled artboard. The visual structure of the canonical pages comes from:

- `/` → `23120:218`
- `/o-kompanii/` → `23120:146`
- `/instrukcii/` → `23120:169`
- `/blog/` → `23120:197`

The cart screen `/cart/` does not exist in the source Figma block, so it is implemented as a separate site page in the same visual language, with working client-side cart state and a local checkout success flow.

The site is built as a **React multi-page app**, so GitHub Pages serves real route files instead of an SPA shell or a fixed canvas.

## Stack

- `Vite 8`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`

## Routes

Canonical routes:

- `/`
- `/o-kompanii/`
- `/instrukcii/`
- `/blog/`
- `/cart/`
- `/privacy-policy/`
- `/404.html`

Compatibility alias:

- `/podderjka/` → same screen as `/instrukcii/`

## Local run

```bash
npm install
npm run dev
```

The local app runs on `http://localhost:4173/` by default.

## Checks and build

Type-check + production build:

```bash
npm run check
```

GitHub Pages build with `/nivim/` base path:

```bash
VITE_BASE_PATH=/nivim/ npm run build
```

Local production preview:

```bash
VITE_BASE_PATH=/nivim/ npm run build
npm run preview
```

## Project structure

```text
src/
  app/          mount helper
  components/   shared layout and semantic sections
  commerce/     cart state and checkout helpers
  content/      typed content and route data
  entries/      MPA entry points
  lib/          route + asset helpers
  pages/        route-level page composition
  styles/       tokens and shared site CSS

index.html
o-kompanii/index.html
instrukcii/index.html
podderjka/index.html
blog/index.html
cart/index.html
privacy-policy/index.html
404.html

public/assets/
  figma/        exported assets reused from the design file
  figma-literal/ reference exports used for exact inner-page media
  tilda/        legacy media still used where it matches the product
```

## Notes

- Desktop fidelity is prioritized, but the implementation uses normal semantic web structure:
  - `header`
  - `nav`
  - `main`
  - `section`
  - `footer`
- `privacy-policy` and `404` are utility pages and do not have literal counterparts inside `23120:*`.
- The cart screen is a new route with:
  - add/remove items
  - quantity changes
  - subtotal / total
  - checkout form
  - basic validation
  - local success-state after submit
  - Telegram backup CTA

## Design decisions

- The old artboard/canvas implementation was removed from the publish path.
- The white top strip from `23120:*` is implemented as a real functional header.
- Inner pages keep the geometry and visual language of `23120:*`, but raw foreign content is replaced with NIVIM copy.

## Deployment

GitHub Pages is published through [deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

Base path is derived automatically in CI from the repository name, or can be forced locally with:

```bash
VITE_BASE_PATH=/nivim/
```
