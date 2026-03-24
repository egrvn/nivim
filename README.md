# NIVIM

Статический multi-page сайт NIVIM для GitHub Pages. Публикуемая версия больше не зависит от React, Tailwind или Tilda runtime как от основного рендер-слоя: страницы собираются из hand-authored шаблонов, общего брендового CSS и клиентского JS.

## Стек

- `Node.js`
- статическая `MPA`-архитектура
- общий renderer на `ESM`
- `GitHub Pages`

## Локальный запуск

```bash
npm install
npm run dev
```

Локальный preview поднимает простой HTTP-сервер и предварительно собирает `dist/`.

## Production build

Для сборки под GitHub Pages c base path `/nivim/`:

```bash
VITE_BASE_PATH=/nivim/ npm run build
```

Результат оказывается в `dist/`.

## Деплой

Публикация настроена через GitHub Actions в [.github/workflows/deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

- ветка: `main`
- output: `dist`
- base path: `/nivim/`
- маршруты публикуются как реальные HTML-страницы:
  - `/`
  - `/o-kompanii/`
  - `/podderjka/`
  - `/blog/`
  - `/privacy-policy/`

## Исходники

```text
site-src/
  data/        контент и структура страниц
  scripts/     клиентские интерактивы
  styles/      брендовые токены и компоненты
  templates/   HTML renderer и общие partials

scripts/
  build-static-site.mjs
  dev-static-site.mjs

public/assets/
  fonts/
  tilda/
```

## Примечание

Каталог `src/` остаётся в репозитории как след предыдущих итераций, но не участвует в публикации сайта. Канонический publish path собирается только из `site-src/`, `public/assets/` и `scripts/`.
