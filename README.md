# NIVIM

Polished Figma-led landing for `NIVIM / VIDEL R1`.

The current implementation uses:

- layout and section rhythm from the main site Figma file `Wqxtf3Cd7vatdGp0rN5BQC`
  - primary home reference: `22927:70`
- brand palette, logo behavior, and typography roles from the additional brand-style file `FOLwB1LoXNl01mTSEbCNOq`

The site is built as a **React multi-page app**, so GitHub Pages serves real files per route instead of a fragile SPA shell.

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
  content/      typed content and asset map
  entries/      MPA entry points
  lib/          route + asset helpers
  pages/        route-level page composition
  styles/       global tokens and shared CSS

index.html
o-kompanii/index.html
instrukcii/index.html
podderjka/index.html
blog/index.html
privacy-policy/index.html
404.html

public/assets/
  figma/        exported Figma assets used by the implementation
  tilda/        local media kept from the original repo
```

## Figma workspaces

The implementation now also writes back into the main Figma file:

- page `Codex polished`
  - `Главная / polished ref`
  - `Brand bridge`
  - `UI polish kit`

This page is used as a working polish layer on top of the raw design sources.

## Deployment

GitHub Pages is published through [deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

Base path is derived automatically in CI from the repository name, or can be forced locally with:

```bash
VITE_BASE_PATH=/nivim/
```
