import { useEffect, useMemo, useRef, useState } from "react";

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

type CheckoutStatus = "idle" | "submitting" | "success" | "error";

type SubmittedOrder = {
  summary: string;
  total: number;
  reference: string;
};

const STORAGE_KEY_ORDER = "nivim-last-order";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function formatReference() {
  const now = new Date();
  const stamp = `${now.getFullYear().toString().slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NV-${stamp}-${rand}`;
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
  const formRef = useRef<HTMLFormElement | null>(null);

  const total = subtotal;
  const orderSummary = useMemo(
    () =>
      lines
        .map((line) => `${line.item.title} × ${line.quantity} — ${formatPrice(line.lineTotal)}`)
        .join("\n"),
    [lines],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem("nivim-checkout-form");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<FormState>;
      setForm((current) => ({ ...current, ...parsed }));
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "success") return;
    try {
      window.sessionStorage.setItem("nivim-checkout-form", JSON.stringify(form));
    } catch {
      /* noop */
    }
  }, [form, status]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Укажи имя";
    else if (form.name.trim().length < 2) next.name = "Слишком короткое имя";

    if (!form.phone.trim()) next.phone = "Укажи телефон";
    else if (!validatePhone(form.phone)) next.phone = "Проверь телефон";

    if (!form.email.trim()) next.email = "Укажи email";
    else if (!validateEmail(form.email)) next.email = "Проверь email";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstErrorKey = Object.keys(next)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstErrorKey}"]`);
      el?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lines.length || status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 650));

    const order: SubmittedOrder = {
      summary: orderSummary,
      total,
      reference: formatReference(),
    };

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY_ORDER,
          JSON.stringify({
            ...order,
            form,
            at: new Date().toISOString(),
          }),
        );
        window.sessionStorage.removeItem("nivim-checkout-form");
      }
    } catch {
      /* noop */
    }

    setSubmittedOrder(order);
    setStatus("success");
    clearCart();

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const canSubmit = lines.length > 0 && status !== "submitting";

  return (
    <PageShell page="cart">
      <section className="cart-hero">
        <div className="site-container">
          <div className="cart-hero__frame">
            <h1 className="site-gradient-heading site-gradient-heading--center cart-hero__title">{cartContent.title}</h1>
            <p className="cart-hero__lead">{cartContent.lead}</p>
            <div className="cart-hero__meta" role="status" aria-live="polite">
              <span>товаров: {itemCount}</span>
              <span>итог: {formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cart-section">
        <div className="site-container">
          {status === "success" && submittedOrder ? (
            <div className="cart-success" role="status" aria-live="polite">
              <p className="cart-success__reference">Заказ №{submittedOrder.reference}</p>
              <h2 className="site-gradient-heading site-gradient-heading--center">{cartContent.successTitle}</h2>
              <p>{cartContent.successBody}</p>
              <div className="cart-success__summary">
                <p>Состав заказа</p>
                <pre>{submittedOrder.summary}</pre>
                <strong>{formatPrice(submittedOrder.total)}</strong>
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
                          <div className="cart-item-card__stepper" role="group" aria-label={`Количество ${line.item.title}`}>
                            <button
                              type="button"
                              aria-label="Уменьшить количество"
                              onClick={() => setQuantity(line.item.id, line.quantity - 1)}
                              disabled={line.quantity <= 1}
                            >
                              −
                            </button>
                            <span aria-live="polite">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label="Увеличить количество"
                              onClick={() => setQuantity(line.item.id, line.quantity + 1)}
                              disabled={line.quantity >= 99}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="cart-item-card__remove"
                            type="button"
                            onClick={() => removeItem(line.item.id)}
                            aria-label={`Удалить ${line.item.title} из корзины`}
                          >
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
                    <span>Доставка</span>
                    <strong>рассчитывается после заявки</strong>
                  </div>
                  <div>
                    <span>Итоговая сумма</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>

                <form className="cart-checkout-form" ref={formRef} onSubmit={handleSubmit} noValidate>
                  {(
                    [
                      ["name", "Имя", "Как к вам обращаться", "text", "name"],
                      ["phone", "Телефон", "+7 (...)", "tel", "tel"],
                      ["email", "Email", "example@mail.com", "email", "email"],
                    ] as const
                  ).map(([key, label, placeholder, type, autoComplete]) => (
                    <label key={key} className={errors[key] ? "cart-checkout-form__field cart-checkout-form__field--error" : "cart-checkout-form__field"}>
                      <span>{label}</span>
                      <input
                        data-field={key}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        value={form[key]}
                        aria-invalid={errors[key] ? "true" : "false"}
                        aria-describedby={errors[key] ? `${key}-error` : undefined}
                        disabled={status === "submitting"}
                        onChange={(event) => updateField(key, event.target.value)}
                      />
                      {errors[key] ? (
                        <em id={`${key}-error`} role="alert">
                          {errors[key]}
                        </em>
                      ) : null}
                    </label>
                  ))}

                  <label className="cart-checkout-form__field">
                    <span>Адрес</span>
                    <input
                      type="text"
                      placeholder="Город, улица, дом"
                      autoComplete="street-address"
                      value={form.address}
                      disabled={status === "submitting"}
                      onChange={(event) => updateField("address", event.target.value)}
                    />
                  </label>

                  <label className="cart-checkout-form__field">
                    <span>Комментарий</span>
                    <textarea
                      placeholder="Этаж, удобное время звонка или любой комментарий"
                      value={form.note}
                      disabled={status === "submitting"}
                      onChange={(event) => updateField("note", event.target.value)}
                    />
                  </label>

                  <div className="cart-checkout-form__actions">
                    <button
                      className="site-light-button"
                      type="submit"
                      disabled={!canSubmit}
                      aria-busy={status === "submitting"}
                    >
                      {status === "submitting" ? "Оформляем…" : "Оформить заказ"}
                    </button>
                    <a className="site-outline-button" href={cartContent.telegramUrl} target="_blank" rel="noreferrer">
                      {cartContent.telegramLabel}
                    </a>
                  </div>

                  <p className="cart-checkout-form__hint">
                    Нажимая «Оформить заказ», вы соглашаетесь на обработку персональных данных. Мы не передаём данные третьим лицам.
                  </p>
                </form>
              </aside>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
