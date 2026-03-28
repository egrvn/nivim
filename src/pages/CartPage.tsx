import { useMemo, useState } from "react";

import { PageShell } from "../components/PageShell";
import { useCart } from "../commerce/cart";
import { cartContent } from "../content/cart";
import { homeContent } from "../content/site";
import { formatPrice } from "../lib/format";
import { asset, route } from "../lib/paths";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type CheckoutStatus = "idle" | "success";

type SubmittedOrder = {
  summary: string;
  total: number;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function CartPage() {
  const { clearCart, itemCount, lines, removeItem, setQuantity, subtotal } = useCart();
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  const total = subtotal;
  const orderSummary = useMemo(
    () =>
      lines
        .map((line) => `${line.item.title} × ${line.quantity} — ${formatPrice(line.lineTotal)}`)
        .join("\n"),
    [lines],
  );

  const validate = () => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Укажи имя";
    if (!form.phone.trim()) next.phone = "Укажи телефон";
    if (!form.email.trim()) {
      next.email = "Укажи email";
    } else if (!validateEmail(form.email)) {
      next.email = "Проверь email";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lines.length || !validate()) {
      return;
    }

    setSubmittedOrder({
      summary: orderSummary,
      total,
    });
    setStatus("success");
    clearCart();
  };

  return (
    <PageShell page="cart">
      <section className="cart-hero">
        <div className="site-container">
          <div className="cart-hero__frame">
            <h1 className="site-gradient-heading site-gradient-heading--center cart-hero__title">{cartContent.title}</h1>
            <p className="cart-hero__lead">{cartContent.lead}</p>
            <div className="cart-hero__meta">
              <span>товаров: {itemCount}</span>
              <span>итог: {formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cart-section">
        <div className="site-container">
          {status === "success" ? (
            <div className="cart-success">
              <h2 className="site-gradient-heading site-gradient-heading--center">{cartContent.successTitle}</h2>
              <p>{cartContent.successBody}</p>
              <div className="cart-success__summary">
                <p>Состав заказа</p>
                <pre>{submittedOrder?.summary ?? ""}</pre>
                <strong>{formatPrice(submittedOrder?.total ?? 0)}</strong>
              </div>
              <div className="cart-success__actions">
                <a className="site-light-button" href={route("/")}>
                  На главную
                </a>
                <a className="site-outline-button" href={cartContent.telegramUrl} target="_blank" rel="noreferrer">
                  {cartContent.telegramLabel}
                </a>
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-layout__items">
                {lines.length ? (
                  lines.map((line) => (
                    <article key={line.item.id} className="cart-item-card">
                      <div className="cart-item-card__media">
                        <img alt={line.item.title} src={asset(line.item.image)} />
                      </div>

                      <div className="cart-item-card__body">
                        <div className="cart-item-card__top">
                          <div>
                            <p className="cart-item-card__subtitle">{line.item.subtitle}</p>
                            <h2>{line.item.title}</h2>
                          </div>
                          <strong>{formatPrice(line.item.price)}</strong>
                        </div>

                        <p className="cart-item-card__description">{line.item.description}</p>

                        <div className="cart-item-card__specs">
                          {line.item.specs.map((spec) => (
                            <span key={spec}>{spec}</span>
                          ))}
                        </div>

                        <div className="cart-item-card__bottom">
                          <div className="cart-item-card__stepper">
                            <button type="button" onClick={() => setQuantity(line.item.id, line.quantity - 1)}>
                              −
                            </button>
                            <span>{line.quantity}</span>
                            <button type="button" onClick={() => setQuantity(line.item.id, line.quantity + 1)}>
                              +
                            </button>
                          </div>

                          <button className="cart-item-card__remove" type="button" onClick={() => removeItem(line.item.id)}>
                            Удалить
                          </button>

                          <strong className="cart-item-card__total">{formatPrice(line.lineTotal)}</strong>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <article className="cart-empty">
                    <h2 className="site-gradient-heading site-gradient-heading--left">{cartContent.emptyTitle}</h2>
                    <p>{cartContent.emptyBody}</p>
                    <div className="cart-empty__actions">
                      <a className="site-light-button" href={route("/")}>
                        На главную
                      </a>
                      <a className="site-outline-button" href={cartContent.telegramUrl} target="_blank" rel="noreferrer">
                        {cartContent.telegramLabel}
                      </a>
                    </div>
                  </article>
                )}

                {lines.length ? (
                  <div className="cart-journey-card">
                    <div>
                      <p className="cart-journey-card__eyebrow">Товар</p>
                      <h3>VIDEL R1</h3>
                      <p>Основной товар формируется из контекста главной страницы и использует те же характеристики, что и лендинг.</p>
                    </div>
                    <img alt="" aria-hidden="true" src={asset(homeContent.hero.device)} />
                  </div>
                ) : null}
              </div>

              <aside className="cart-summary">
                <h2 className="site-gradient-heading site-gradient-heading--left">{cartContent.checkoutTitle}</h2>

                <div className="cart-summary__totals">
                  <div>
                    <span>Промежуточный итог</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Итоговая сумма</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>

                <form className="cart-checkout-form" onSubmit={handleSubmit} noValidate>
                  {(
                    [
                      ["name", "Имя", "Как к вам обращаться"],
                      ["phone", "Телефон", "+7 (...)"],
                      ["email", "Email", "example@mail.com"],
                    ] as const
                  ).map(([key, label, placeholder]) => (
                    <label key={key}>
                      <span>{label}</span>
                      <input
                        type={key === "email" ? "email" : "text"}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                      />
                      {errors[key] ? <em>{errors[key]}</em> : null}
                    </label>
                  ))}

                  <label>
                    <span>Адрес</span>
                    <input
                      type="text"
                      placeholder="Город, улица, дом"
                      value={form.address}
                      onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                    />
                  </label>

                  <label>
                    <span>Комментарий</span>
                    <textarea
                      placeholder="Этаж, удобное время звонка или любой комментарий"
                      value={form.note}
                      onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                    />
                  </label>

                  <div className="cart-checkout-form__actions">
                    <button className="site-light-button" type="submit" disabled={!lines.length}>
                      Оформить заказ
                    </button>
                    <a className="site-outline-button" href={cartContent.telegramUrl} target="_blank" rel="noreferrer">
                      {cartContent.telegramLabel}
                    </a>
                  </div>
                </form>
              </aside>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
