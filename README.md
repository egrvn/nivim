# NIVIM

Literal Figma-driven React MPA for `NIVIM / VIDEL R1`.

The current implementation follows the `23120:*` block from the Figma file `Wqxtf3Cd7vatdGp0rN5BQC` as the canonical source for:

- `/` → `23120:218`
- `/o-kompanii/` → `23120:146`
- `/instrukcii/` → `23120:169`
- `/blog/` → `23120:197`

The only screen that is not present in the source Figma block is `/cart/`. It is implemented separately, but in the same visual language and with working client-side cart + checkout form behavior.

The site is built as a **React multi-page app**, so GitHub Pages serves real files per route instead of an SPA shell.

## Stack

- `Vite 8`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`

## Routes

Routes:

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

The local app runs on `http://localhost:4173/`.

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
  components/   shared UI and page shell
  commerce/     cart state and checkout helpers
  content/      typed content and Figma-derived asset map
  entries/      MPA entry points
  lib/          route + asset helpers
  pages/        route-level page composition
  styles/       global tokens and shared CSS

index.html
o-kompanii/index.html
instrukcii/index.html
podderjka/index.html
blog/index.html
cart/index.html
privacy-policy/index.html
404.html

public/assets/
  figma/        exported assets used by the literal home build
  figma-literal/ exact exported screenshots from Figma inner pages
  tilda/        local media kept from the original repo
```

## Notes

- Desktop fidelity is prioritized.
- `privacy-policy` and `404` are utility pages and do not have literal counterparts inside `23120:*`.
- The cart screen is a new route with:
  - add/remove items
  - quantity changes
  - subtotal / total
  - checkout form
  - basic validation
  - `mailto` submission + Telegram backup CTA

## Deployment

GitHub Pages is published through [deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

Base path is derived automatically in CI from the repository name, or can be forced locally with:

```bash
VITE_BASE_PATH=/nivim/
```
