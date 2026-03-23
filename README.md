# NIVIM

Реконструкция экспортированного сайта из Tilda на `React + Vite + Tailwind CSS`.

## Стек

- `React 19`
- `Vite`
- `Tailwind CSS 4`
- `react-router-dom`
- `GitHub Pages`

## Локальный запуск

```bash
npm install
npm run dev
```

Приложение стартует локально через Vite. Для проверки production-сборки под GitHub Pages:

```bash
VITE_BASE_PATH=/nivim/ npm run build
```

## Форма заявки

Форма использует webhook-адаптер. Для реальной отправки создай `.env.local`:

```bash
VITE_LEAD_WEBHOOK_URL=https://example.com/webhook
```

Если переменная не задана, UI формы работает, но показывает корректное сообщение о временной недоступности отправки.

## Деплой

Публикация настроена через GitHub Actions в `.github/workflows/deploy-pages.yml`.

- ветка: `main`
- output: `dist`
- base path: `/nivim/`
- SPA fallback: `public/404.html`

## Структура

```text
src/
  app/         routing + layout shell
  components/  shared UI blocks
  data/        extracted site content
  lib/         helpers for assets, scroll, reveal, lead submit
  pages/       route-level pages
  sections/    page sections rebuilt from Tilda blocks
  styles/      Tailwind entry + design tokens + globals
```
