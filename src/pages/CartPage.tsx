import { useMemo, useState } from "react";

import { useCart } from "../commerce/cart";
import { cartContent } from "../content/cart";
import { homeContent } from "../content/figma23120";
import { formatPrice } from "../lib/format";
import { buildOrderMailto } from "../lib/mailto";
import { asset, route } from "../lib/paths";

type FormState = {
  name: string;
  phone: string;
  email: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function CartButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "light",
}: {
  children: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "light" | "ghost";
}) {
  const className =
    variant === "light"
      ? "inline-flex h-[35px] min-w-[189px] items-center justify-center rounded-[5px] bg-[var(--figma-white)] px-4 text-[11px] font-semibold tracking-[1.1px] text-transparent"
      : "inline-flex h-[35px] min-w-[189px] items-center justify-center rounded-[5px] border border-white/20 px-4 text-[11px] font-semibold tracking-[1.1px] text-white transition-colors hover:bg-white/10";
  const lightStyle =
    variant === "light"
      ? {
          backgroundImage: "var(--figma-button-gradient)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }
      : undefined;

  if (href) {
    return (
      <a className={className} href={href} style={lightStyle}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${className} disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={onClick}
      style={lightStyle}
      type={type}
    >
      {children}
    </button>
  );
}

export function CartPage() {
  const { clearCart, itemCount, lines, removeItem, setQuantity, subtotal } = useCart();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const total = subtotal;

  const mailto = useMemo(
    () =>
      buildOrderMailto({
        ...form,
        total,
        lines,
      }),
    [form, lines, total],
  );

  const validate = () => {
    const next: FormErrors = {};

    if (!form.name.trim()) {
      next.name = "Укажи имя";
    }

    if (!form.phone.trim()) {
      next.phone = "Укажи телефон";
    }

    if (!form.email.trim()) {
      next.email = "Укажи email";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email.trim())) {
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

    setSubmitted(true);
    window.location.href = mailto;
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#030308_0%,#0d081d_100%)] text-white">
      <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-3 pb-20 pt-3 sm:px-4">
        <div className="h-[36px] rounded-[5px] bg-[var(--figma-white)]" />

        <div className="absolute inset-x-0 top-[38px] h-[570px] overflow-hidden">
          <img alt="" aria-hidden="true" className="h-full w-full object-cover" src={asset("figma/inner-hero.png")} />
        </div>

        <section className="relative z-10 mx-auto max-w-[1014px] pt-[72px] text-center">
          <h1
            className="mx-auto bg-[image:var(--figma-gradient)] bg-clip-text font-[var(--font-display)] text-[40px] leading-[0.9] tracking-[-0.8px] text-transparent"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Корзина
            <br />
            и оформление
            <br />
            заказа
          </h1>
          <p className="mx-auto mt-8 max-w-[593px] text-[16px] leading-[1.2] tracking-[-0.16px] text-white">
            {cartContent.lead}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[1.1px] text-white/60">
            <span>товаров: {itemCount}</span>
            <span>•</span>
            <span>итог: {formatPrice(total)}</span>
          </div>
        </section>

        <section className="relative z-10 mt-[260px] grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {lines.length ? (
              lines.map((line) => (
                <article
                  key={line.item.id}
                  className="grid gap-4 rounded-[10px] border border-[#100338] bg-[#0d081d] p-4 shadow-[-5px_-5px_20px_0px_#241551] md:grid-cols-[220px_1fr]"
                >
                  <div className="overflow-hidden rounded-[8px] bg-black">
                    <img alt={line.item.title} className="h-full w-full object-cover" src={asset(line.item.image)} />
                  </div>

                  <div className="grid gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="font-[var(--font-display)] text-[24px] leading-[1] tracking-[-0.24px] text-white">
                          {line.item.title}
                        </h2>
                        {line.item.subtitle ? <p className="mt-2 text-[12px] uppercase tracking-[0.24em] text-white/60">{line.item.subtitle}</p> : null}
                      </div>
                      <strong className="font-[var(--font-display)] text-[28px] leading-[0.95] tracking-[-0.56px] text-white">
                        {formatPrice(line.item.price)}
                      </strong>
                    </div>

                    <p className="text-[14px] leading-[1.5] text-white/72">{line.item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {line.item.specs.map((spec) => (
                        <span key={spec} className="rounded-[5px] border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/60">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-[5px] border border-white/10 bg-black/20">
                        <button className="h-10 w-10 text-xl text-white" type="button" onClick={() => setQuantity(line.item.id, line.quantity - 1)}>
                          −
                        </button>
                        <span className="flex h-10 min-w-10 items-center justify-center text-[14px]">{line.quantity}</span>
                        <button className="h-10 w-10 text-xl text-white" type="button" onClick={() => setQuantity(line.item.id, line.quantity + 1)}>
                          +
                        </button>
                      </div>

                      <button className="text-[11px] uppercase tracking-[0.18em] text-white/60 underline-offset-4 hover:text-white hover:underline" type="button" onClick={() => removeItem(line.item.id)}>
                        Удалить
                      </button>

                      <strong className="font-[var(--font-display)] text-[24px] leading-[0.95] tracking-[-0.48px] text-white">
                        {formatPrice(line.lineTotal)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[10px] border border-[#100338] bg-[#0d081d] p-8 shadow-[-5px_-5px_20px_0px_#241551]">
                <h2 className="bg-[image:var(--figma-gradient)] bg-clip-text font-[var(--font-display)] text-[40px] leading-[0.9] tracking-[-0.8px] text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  {cartContent.emptyTitle}
                </h2>
                <p className="mt-4 max-w-[32rem] text-[16px] leading-[1.4] text-white/72">{cartContent.emptyBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CartButton href={route("/")}>На главную</CartButton>
                  <CartButton href={cartContent.telegramUrl} variant="ghost">
                    {cartContent.telegramLabel}
                  </CartButton>
                </div>
              </div>
            )}

            {lines.length ? (
              <div className="flex flex-wrap gap-3">
                <CartButton href={route("/")}>Продолжить покупки</CartButton>
                <CartButton onClick={() => clearCart()} variant="ghost">
                  Очистить корзину
                </CartButton>
              </div>
            ) : null}
          </div>

          <aside className="rounded-[10px] border border-[#100338] bg-[#0d081d] p-6 shadow-[5px_-5px_20px_0px_#241551]">
            <p
              className="bg-[image:var(--figma-gradient)] bg-clip-text font-[var(--font-display)] text-[40px] leading-[0.9] tracking-[-0.8px] text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            >
              {cartContent.checkoutTitle}
            </p>

            <div className="mt-6 space-y-3 text-[14px] text-white/72">
              <div className="flex items-center justify-between">
                <span>Промежуточный итог</span>
                <strong className="text-white">{formatPrice(subtotal)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Итоговая сумма</span>
                <strong className="font-[var(--font-display)] text-[24px] leading-none tracking-[-0.48px] text-white">{formatPrice(total)}</strong>
              </div>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit} noValidate>
              {(
                [
                  ["name", "Имя", "Как к вам обращаться"],
                  ["phone", "Телефон", "+7 (...)"],
                  ["email", "Email", "example@mail.com"],
                ] as const
              ).map(([key, label, placeholder]) => (
                <label key={key} className="grid gap-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">{label}</span>
                  <input
                    className="h-11 rounded-[5px] border border-white/12 bg-black/20 px-3 text-white outline-none transition-colors focus:border-white/40"
                    type={key === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  />
                  {errors[key] ? <span className="text-[12px] text-[#ffb6d9]">{errors[key]}</span> : null}
                </label>
              ))}

              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Адрес / комментарий</span>
                <textarea
                  className="min-h-[110px] rounded-[5px] border border-white/12 bg-black/20 px-3 py-3 text-white outline-none transition-colors focus:border-white/40"
                  placeholder="Квартира, этаж, удобное время или любой комментарий"
                  value={form.note}
                  onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                />
              </label>

              <div className="mt-2 flex flex-wrap gap-3">
                <CartButton type="submit">{submitted ? "Открываем письмо..." : "Оформить заказ"}</CartButton>
                <CartButton href={cartContent.telegramUrl} variant="ghost">
                  {cartContent.telegramLabel}
                </CartButton>
              </div>
            </form>

            <p className="mt-6 text-[12px] leading-[1.5] text-white/60">{cartContent.summaryNote}</p>
          </aside>
        </section>

        <section className="relative z-10 mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-[10px] border border-[#100338] bg-[#0d081d] p-5 shadow-[-5px_-5px_20px_0px_#241551]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Товар</p>
            <div className="mt-4 flex items-center gap-4">
              <img alt="" aria-hidden="true" className="h-[108px] w-[150px] rounded-[5px] object-cover" src={asset(homeContent.hero.device)} />
              <div>
                <h3 className="font-[var(--font-display)] text-[24px] leading-[1] tracking-[-0.24px] text-white">VIDEL R1</h3>
                <p className="mt-3 text-[14px] leading-[1.5] text-white/72">Основной товар формируется из контекста literal-лендинга `23120:218`.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[10px] border border-[#100338] bg-[#0d081d] p-5 shadow-[5px_-5px_20px_0px_#241551]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Переходы</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <CartButton href={route("/")}>Вернуться на главную</CartButton>
              <CartButton href={route("/instrukcii/")} variant="ghost">
                Открыть инструкции
              </CartButton>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
