import type { CartLine } from "../commerce/cart";

type OrderPayload = {
  name: string;
  phone: string;
  email: string;
  note: string;
  total: number;
  lines: CartLine[];
};

export function buildOrderMailto(payload: OrderPayload) {
  const subject = encodeURIComponent(`Заказ NIVIM — ${payload.name}`);
  const body = encodeURIComponent(
    [
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      `Email: ${payload.email}`,
      payload.note ? `Адрес / комментарий: ${payload.note}` : "",
      "",
      "Состав заказа:",
      ...payload.lines.map((line) => `- ${line.item.title} × ${line.quantity} = ${line.lineTotal} ₽`),
      "",
      `Итог: ${payload.total} ₽`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return `mailto:support@nivim.tech?subject=${subject}&body=${body}`;
}
