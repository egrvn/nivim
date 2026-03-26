# NIVIM

React multi-page сайт NIVIM, собранный на `Vite + React + TypeScript + Tailwind CSS + Framer Motion` и адаптированный под GitHub Pages.

## Что внутри

- `React MPA`, а не SPA: каждая страница публикуется как отдельный HTML-файл
- единый UI-слой с общими layout-компонентами, modal, accordion и tabs
- контентный слой на базе текущего продукта и структуры из Figma-блока `Дизайн`
- базовая SEO-обвязка: meta tags, Open Graph, favicon, manifest

## Стек

- `Vite`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`

## Маршруты

- `/`
- `/o-kompanii/`
- `/podderjka/`
- `/blog/`
- `/privacy-policy/`
- `/404.html`

## Локальный запуск

```bash
npm install
npm run dev
```

По умолчанию dev server поднимается на `http://localhost:4173/`.

## Проверка и сборка

Обычная проверка:

```bash
npm run check
```

Сборка под GitHub Pages с base path `/nivim/`:

```bash
VITE_BASE_PATH=/nivim/ npm run build
```

## Деплой

GitHub Pages публикуется через workflow:

[`/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml`](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml)

Логика простая:

1. `npm ci`
2. `npm run build`
3. публикация `dist/` в GitHub Pages

## Структура проекта

```text
src/
  app/         bootstrap и page shell
  components/  shared UI
  content/     контент и маршруты
  entries/     entry points для каждой HTML-страницы
  lib/         helpers
  pages/       page-level composition
  styles/      global design system

public/assets/
  tilda/       изображения, иконки и favicon
  site.webmanifest
```

## Примечание

`site-src/data/site-data.mjs` оставлен как transitional source для части контентных данных и copy blocks. Старый static renderer и Tilda-based publish path из проекта убраны.
