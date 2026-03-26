export type LeadPayload = {
  name: string;
  method: string;
  contact: string;
  note?: string;
  page: string;
};

export function buildLeadMailto(payload: LeadPayload) {
  const subject = encodeURIComponent(`Запрос на демонстрацию NIVIM — ${payload.name}`);
  const body = encodeURIComponent(
    [
      `Имя: ${payload.name}`,
      `Предпочтительный канал: ${payload.method}`,
      `Контакт: ${payload.contact}`,
      `Страница: ${payload.page}`,
      payload.note ? `Комментарий: ${payload.note}` : "",
      "",
      "Хочу увидеть NIVIM VIDEL R1 вживую и получить консультацию по сценарию использования.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return `mailto:support@nivim.tech?subject=${subject}&body=${body}`;
}
