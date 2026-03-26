# NIVIM

Literal React MPA implementation of the Figma block `23120:*` from `NIVIM--Copy-`.

The site is intentionally built **1:1 against the selected Figma source**, including the current placeholder zones and the raw `Glamus`/draft copy that exists inside those frames. This repo does not redesign or editorially “fix” that content.

## Stack

- `Vite 8`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

The project is published as a **multi-page app**, not an SPA, so GitHub Pages serves real files for every route.

## Routes

- `/`
- `/o-kompanii/`
- `/instrukcii/`
- `/blog/`
- `/404.html`

## Local run

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:4173/`.

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
  components/   literal artboard/layout components
  content/      Figma-derived text and asset map
  entries/      MPA entry points
  lib/          shared helpers
  pages/        route-level page composition
  styles/       global CSS for the literal Figma shell

index.html
o-kompanii/index.html
instrukcii/index.html
blog/index.html
404.html

public/assets/
  figma/        exported Figma assets used by the implementation
  tilda/        local media already present in the repo
```

## Notes about incomplete Figma areas

The selected `23120:*` set contains intentionally unfinished zones:

- `фото`
- `фото/видео`
- `Анимация код`
- `стандартный блок тильды`

Those blocks are kept visually in place and minimally materialized so the page stays structurally complete without inventing a redesign.

## Deployment

GitHub Pages is published through [deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

Base path is derived automatically in CI from the repository name, or can be forced locally with:

```bash
VITE_BASE_PATH=/nivim/
```
