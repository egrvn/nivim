# NIVIM

NIVIM — multi-page React-сайт с premium dark UI, собранный на `Vite + React + TypeScript + Tailwind CSS + Framer Motion` и подготовленный для GitHub Pages.

Проект опирается на Figma-блок `Дизайн`, но не копирует его механически: home следует утверждённой структуре, внутренние страницы собраны в том же визуальном языке, а корзина спроектирована как новый product-grade экран.

## Что реализовано

- `React MPA`, а не SPA: каждый route публикуется как отдельный HTML entrypoint
- единая дизайн-система: display/body typography, color tokens, card surfaces, motion, inputs и CTA
- полноценный storefront flow:
  - добавление товара с главной
  - cart badge в header/footer
  - отдельная страница корзины `/cart/`
  - хранение корзины в `localStorage`
  - prototype checkout state без сервера и фейковой оплаты
- общие product/UI-компоненты:
  - sticky header
  - mobile drawer
  - lead modal
  - FAQ accordion
  - legal tabs
  - reveal-анимации и hover/focus/active states
- SEO-обвязка:
  - meta tags
  - Open Graph
  - favicon
  - manifest

## Стек

- `Vite 8`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`

Такой стек здесь рационален: он даёт быстрый MPA-build под GitHub Pages, нормальную компонентную архитектуру, типизацию контента и состояний, а также аккуратную анимацию без перегруза зависимостями.

## Маршруты

- `/`
- `/o-kompanii/`
- `/podderjka/`
- `/blog/`
- `/privacy-policy/`
- `/cart/`
- `/404.html`

## Локальный запуск

```bash
npm install
npm run dev
```

Dev server поднимается на `http://localhost:4173/`.

## Проверка и сборка

Полная локальная проверка:

```bash
npm run check
```

Сборка под GitHub Pages с base path `/nivim/`:

```bash
VITE_BASE_PATH=/nivim/ npm run build
```

Локальный preview production-сборки:

```bash
VITE_BASE_PATH=/nivim/ npm run build
npm run preview
```

## Деплой

GitHub Pages публикуется через workflow [deploy-pages.yml](/Users/egorovn/Desktop/Проекты/NIVIM/.github/workflows/deploy-pages.yml).

Схема деплоя:

1. `npm ci`
2. `npm run build`
3. публикация `dist/` через GitHub Pages Actions

Base path автоматически подхватывается из имени GitHub-репозитория в CI, поэтому отдельные серверные маршруты не нужны.

## Структура проекта

```text
src/
  commerce/    cart state и storefront logic
  components/  shared UI
  content/     typed content/config
  entries/     page entry points для MPA
  lib/         helpers
  pages/       page-level composition
  styles/      global design system

cart/
blog/
o-kompanii/
podderjka/
privacy-policy/
  index.html   HTML entrypoints для GitHub Pages

public/assets/
  tilda/       брендовые ассеты, изображения, favicon
  site.webmanifest
```

## Основные сценарии

- Добавить `NIVIM VIDEL R1` в корзину с home CTA
- Открыть `/cart/`, изменить количество, удалить товар, посмотреть subtotal/total
- Открыть prototype checkout preview без реального order/payment flow
- Использовать lead modal для `mailto`-контакта или перейти в Telegram

## Публикация

- Production URL: [https://egrvn.github.io/nivim/](https://egrvn.github.io/nivim/)
- Репозиторий: [https://github.com/egrvn/nivim](https://github.com/egrvn/nivim)
