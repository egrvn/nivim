export type CatalogItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  specs: string[];
  price: number;
  image: string;
};

export type PromoRule = {
  code: string;
  type: "fixed" | "percent";
  value: number;
  description?: string;
};

export const PRIMARY_PRODUCT_ID = "videl-r1";

export const catalog: CatalogItem[] = [
  {
    id: PRIMARY_PRODUCT_ID,
    title: "VIDEL R1",
    subtitle: "Проектор NIVIM",
    description: "Full HD проектор с поддержкой 4K, автофокусом, Android 12 и беспроводным подключением для домашнего кино без лишних настроек.",
    specs: [
      "Full HD + поддержка 4K",
      "1000 ANSI люменов",
      "Автофокус + моторизированный зум",
      "Android 12 + Wi‑Fi 6 + Bluetooth 5.0",
      "Встроенные динамики 2×5 Вт",
      "Гарантия 1 год",
    ],
    price: 29990,
    image: "tilda/tild3337-3639-4334-b665-373130313963__magnifics_upscale-ss.png",
  },
];

export const promoRules: PromoRule[] = [];

export const cartContent = {
  title: "Корзина и оформление заказа",
  lead: "Проверь состав заказа, измени количество при необходимости и оставь контакты для подтверждения.",
  emptyTitle: "В корзине пока пусто",
  emptyBody: "Добавь VIDEL R1 с главной страницы, и здесь появится состав заказа с оформлением.",
  checkoutTitle: "Оформление",
  telegramUrl: "https://t.me/nivim_support_bot",
  telegramLabel: "Написать в Telegram",
  successTitle: "Заявка отправлена",
  successBody:
    "Мы сохранили заказ локально как оформленный и показали подтверждение на странице. Дальше можно вернуться на главную или сразу перейти в поддержку NIVIM.",
};
