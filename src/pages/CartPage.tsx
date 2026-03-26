import { useMemo, useState } from "react";

import { useCart } from "../commerce/cart";
import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { cartContent, promoRules, siteMeta } from "../content/site";
import { formatPrice } from "../lib/format";
import { asset, homeAnchor } from "../lib/paths";
import { renderLines } from "../lib/text";

export function CartPage() {
  const { lines, itemCount, subtotal, removeItem, setQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutPreview, setCheckoutPreview] = useState(false);

  const discount = useMemo(() => {
    if (!appliedPromo) {
      return 0;
    }

    const promo = promoRules.find((rule) => rule.code.toLowerCase() === appliedPromo.toLowerCase());

    if (!promo) {
      return 0;
    }

    if (promo.type === "percent") {
      return Math.round((subtotal * promo.value) / 100);
    }

    return Math.min(subtotal, promo.value);
  }, [appliedPromo, subtotal]);

  const total = subtotal - discount;

  const handlePromoApply = () => {
    if (!promoCode.trim()) {
      setPromoMessage("Введите промокод, если он у вас есть.");
      return;
    }

    if (!promoRules.length) {
      setPromoMessage("Сейчас активных промокодов нет. Если они появятся, мы пришлём код напрямую через поддержку.");
      setAppliedPromo(null);
      return;
    }

    const promo = promoRules.find((rule) => rule.code.toLowerCase() === promoCode.trim().toLowerCase());

    if (!promo) {
      setPromoMessage("Такой промокод не найден.");
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo(promo.code);
    setPromoMessage(promo.description ?? "Промокод применён.");
  };

  return (
    <PageShell pageKey="cart">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell">
            <Reveal className="cart-hero">
              <div className="space-y-4">
                <p className="section-kicker">{cartContent.hero.eyebrow}</p>
                <h1 className="display-title display-title--hero">{renderLines(cartContent.hero.title)}</h1>
                <p className="lead-copy max-w-[48rem]">{cartContent.hero.lead}</p>
              </div>

              <div className="cart-hero__actions">
                <div className="mini-chip">Товаров: {itemCount}</div>
                <Button href={homeAnchor("product")} variant="secondary">
                  Продолжить покупки
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad pt-0">
          <div className="page-shell">
            {lines.length === 0 ? (
              <Reveal className="empty-cart">
                <div className="empty-cart__media">
                  <img alt="NIVIM VIDEL R1" className="empty-cart__image" src={asset("assets/tilda/tild3337-3639-4334-b665-373130313963__magnifics_upscale-ss.png")} />
                </div>
                <div className="space-y-4">
                  <p className="section-kicker">Пустое состояние</p>
                  <h2 className="display-title display-title--section">{cartContent.empty.title}</h2>
                  <p className="body-copy max-w-[36rem]">{cartContent.empty.body}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button href={homeAnchor("product")}>К продукту</Button>
                    <Button href={siteMeta.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                      Спросить в Telegram
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr] xl:items-start">
                <div className="grid gap-4">
                  {lines.map((line, index) => (
                    <Reveal key={line.item.id} delay={index * 0.04}>
                      <article className="cart-line">
                        <div className="cart-line__media">
                          <img alt={line.item.title} className="cart-line__image" src={asset(line.item.image)} />
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <h2 className="card-title">{line.item.title}</h2>
                                {line.item.subtitle ? <p className="caption-copy mt-2">{line.item.subtitle}</p> : null}
                              </div>
                              <strong className="cart-line__price">{formatPrice(line.item.price)}</strong>
                            </div>
                            <p className="body-copy body-copy--small">{line.item.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {line.item.specs.slice(0, 4).map((spec) => (
                              <span key={spec} className="mini-chip">
                                {spec}
                              </span>
                            ))}
                          </div>

                          <div className="cart-line__footer">
                            <div className="quantity-control" aria-label={`Изменить количество для ${line.item.title}`}>
                              <button onClick={() => setQuantity(line.item.id, line.quantity - 1)} type="button">
                                −
                              </button>
                              <span>{line.quantity}</span>
                              <button onClick={() => setQuantity(line.item.id, line.quantity + 1)} type="button">
                                +
                              </button>
                            </div>

                            <button className="cart-line__remove" onClick={() => removeItem(line.item.id)} type="button">
                              Удалить
                            </button>

                            <strong className="cart-line__total">{formatPrice(line.lineTotal)}</strong>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}

                  <Reveal className="flex flex-wrap gap-3">
                    <Button onClick={() => clearCart()} variant="secondary">
                      Очистить корзину
                    </Button>
                    <Button href={homeAnchor("product")} variant="secondary">
                      Продолжить покупки
                    </Button>
                  </Reveal>
                </div>

                <Reveal delay={0.08}>
                  <aside className="checkout-card">
                    <div className="space-y-2">
                      <p className="section-kicker">Итог</p>
                      <h2 className="display-title text-[1.8rem] sm:text-[2.1rem]">Спокойная проверка перед следующим шагом</h2>
                    </div>

                    <div className="checkout-card__rows">
                      <div className="checkout-row">
                        <span>Промежуточная сумма</span>
                        <strong>{formatPrice(subtotal)}</strong>
                      </div>
                      <div className="checkout-row">
                        <span>Скидка</span>
                        <strong>{discount ? `− ${formatPrice(discount)}` : "—"}</strong>
                      </div>
                      <div className="checkout-row checkout-row--total">
                        <span>Итог</span>
                        <strong>{formatPrice(total)}</strong>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <label className="grid gap-2">
                        <span className="text-sm font-semibold text-white/82">Промокод</span>
                        <div className="promo-row">
                          <input
                            className="field-input"
                            onChange={(event) => setPromoCode(event.target.value)}
                            placeholder="Если есть код — введите его"
                            type="text"
                            value={promoCode}
                          />
                          <Button className="min-w-[136px]" onClick={handlePromoApply} variant="secondary">
                            Применить
                          </Button>
                        </div>
                      </label>
                      {promoMessage ? <p className="caption-copy">{promoMessage}</p> : null}
                    </div>

                    <p className="caption-copy">{cartContent.summaryNote}</p>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => setCheckoutPreview((current) => !current)}>
                        {checkoutPreview ? "Скрыть превью заказа" : "Перейти к оформлению"}
                      </Button>
                      <Button href={siteMeta.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                        Спросить в Telegram
                      </Button>
                    </div>

                    {checkoutPreview ? (
                      <div className="checkout-preview">
                        <p className="section-kicker">Prototype checkout</p>
                        <h3 className="card-title mt-3">Онлайн-оформление подключим позже</h3>
                        <p className="body-copy body-copy--small mt-3">
                          Сейчас это фронтенд-превью заказа: можно проверить состав корзины, итоговую сумму и дальше перейти в
                          поддержку для консультации или подтверждения сценария покупки.
                        </p>
                        <ul className="mt-4 grid gap-2">
                          {lines.map((line) => (
                            <li key={line.item.id} className="checkout-preview__item">
                              <span>
                                {line.item.title} × {line.quantity}
                              </span>
                              <strong>{formatPrice(line.lineTotal)}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </aside>
                </Reveal>
              </div>
            )}
          </div>
        </section>

        <section className="section-pad pt-0">
          <div className="page-shell grid gap-4 lg:grid-cols-2">
            {cartContent.journeyCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.04}>
                <article className="feature-panel h-full">
                  <p className="section-kicker">Следующий шаг</p>
                  <h2 className="display-title text-[1.8rem] sm:text-[2.1rem]">{card.title}</h2>
                  <p className="body-copy mt-4">{card.text}</p>
                  <div className="mt-6">
                    <Button
                      href={card.href.startsWith("http") ? card.href : homeAnchor(card.href === "/#product" ? "product" : "contacts")}
                      rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      variant="secondary"
                    >
                      {card.action}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
