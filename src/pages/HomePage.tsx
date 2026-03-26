import { useMemo, useState } from "react";

import { motion } from "framer-motion";

import { useCart } from "../commerce/cart";
import { Accordion } from "../components/Accordion";
import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { catalog, homeContent, siteMeta } from "../content/site";
import { formatPrice } from "../lib/format";
import { asset, homeAnchor, route } from "../lib/paths";
import { renderLines } from "../lib/text";

const product = catalog[0];

export function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const { addItem, getQuantity } = useCart();
  const productQuantity = getQuantity(product.id);
  const activeStepData = useMemo(() => homeContent.steps.items[activeStep], [activeStep]);

  return (
    <PageShell pageKey="home">
      <main>
        <section className="hero-section hero-section--home">
          <div className="page-shell">
            <div className="hero-grid">
              <div className="space-y-6">
                <Reveal>
                  <p className="section-kicker">{homeContent.hero.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.04}>
                  <h1 className="display-title display-title--hero">{renderLines(homeContent.hero.title)}</h1>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="lead-copy max-w-[41rem]">{homeContent.hero.lead}</p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="body-copy max-w-[39rem]">{homeContent.hero.body}</p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="caption-copy max-w-[35rem]">{homeContent.hero.supporting}</p>
                </Reveal>

                <Reveal delay={0.2} className="flex flex-wrap gap-3">
                  <Button onClick={() => addItem(product.id)}>{productQuantity > 0 ? "Добавить ещё" : "В корзину"}</Button>
                  <Button href={homeAnchor("demo")} variant="secondary">
                    Посмотреть в деле
                  </Button>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {homeContent.hero.metrics.map((metric) => (
                      <article key={metric.label} className="metric-card">
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.18}>
                <div className="hero-stage">
                  <img alt="" aria-hidden="true" className="hero-stage__beam" src={asset(homeContent.hero.beam)} />
                  <img alt="" aria-hidden="true" className="hero-stage__world" src={asset(homeContent.hero.stageImage)} />
                  <div className="hero-stage__wordmark">NIVIM</div>
                  <div className="hero-stage__eyebrow">VIDEL R1</div>
                  <img alt="Домашний проектор NIVIM VIDEL R1" className="hero-stage__device" src={asset(homeContent.hero.image)} />
                  <div className="hero-stage__price">
                    <span>Цена</span>
                    <strong>{sitePrice()}</strong>
                    <p>Сильнее по ощущению, чем многие модели дороже 45 000 ₽.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-pad" id="product">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">{homeContent.scenarios.title}</p>
              <h2 className="display-title display-title--section">Сценарии, в которых устройство выглядит убедительно</h2>
              <p className="body-copy max-w-[50rem]">{homeContent.scenarios.intro}</p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {homeContent.scenarios.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.05}>
                  <article className="scenario-card">
                    <div className="scenario-card__media">
                      <img alt={card.title} className="scenario-card__image" loading="lazy" src={asset(card.image)} />
                    </div>
                    <div className="space-y-3">
                      <div className="scenario-card__meta">
                        <h3 className="card-title">{card.title}</h3>
                        <p>{card.quote}</p>
                      </div>
                      <p className="body-copy body-copy--small">{card.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell grid gap-4 xl:grid-cols-[0.84fr,1.16fr]">
            <Reveal className="feature-panel">
              <p className="section-kicker">Дом, в котором живёт кино</p>
              <h2 className="display-title display-title--section">{homeContent.benefits.title}</h2>
              <p className="body-copy mt-4">{homeContent.benefits.intro}</p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {homeContent.benefits.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.06}>
                  <article className="feature-panel h-full">
                    <p className="section-kicker">NIVIM</p>
                    <h3 className="card-title mt-4">{card.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{card.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-6 lg:grid-cols-[0.88fr,1.12fr] lg:items-start">
            <Reveal className="space-y-5">
              <p className="section-kicker">Просто включи</p>
              <h2 className="display-title display-title--section">{homeContent.steps.title}</h2>
              <p className="body-copy max-w-[34rem]">{homeContent.steps.intro}</p>

              <div className="grid gap-3">
                {homeContent.steps.items.map((step, index) => {
                  const active = activeStep === index;

                  return (
                    <button
                      key={step.number}
                      className={`step-card ${active ? "step-card--active" : ""}`}
                      onClick={() => setActiveStep(index)}
                      type="button"
                    >
                      <span className="step-card__number">{step.number}</span>
                      <span className="step-card__copy">
                        <strong>{step.title}</strong>
                        <em>{step.kicker}</em>
                        <span>{step.text}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <motion.article
                key={activeStepData.number}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0.72, y: 18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="step-stage"
              >
                <img alt={activeStepData.title} className="step-stage__image" src={asset(activeStepData.image)} />
                <div className="step-stage__overlay" />
                <div className="step-stage__content">
                  <span className="section-kicker">Шаг {activeStepData.number}</span>
                  <h3 className="display-title text-[1.7rem] sm:text-[2.2rem]">{activeStepData.title}</h3>
                  <p className="body-copy max-w-[28rem]">{activeStepData.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.specs.slice(0, 3).map((spec) => (
                      <span key={spec} className="mini-chip">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">Технология, которая не мешает</p>
              <h2 className="display-title display-title--section">Функции собраны вокруг реального сценария, а не ради списка</h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homeContent.features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <article className="feature-panel h-full">
                    <img alt="" aria-hidden="true" className="mb-5 h-11 w-11" loading="lazy" src={asset(feature.icon)} />
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{feature.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="demo">
          <div className="page-shell">
            <Reveal className="demo-stage">
              <div className="demo-stage__copy">
                <p className="section-kicker">Видео-сценарий</p>
                <h2 className="display-title display-title--section">{homeContent.demo.title}</h2>
                <p className="body-copy">{homeContent.demo.body}</p>
                <div className="flex flex-wrap gap-3">
                  <Button href={homeAnchor("contacts")}>Запросить демонстрацию</Button>
                  <Button href={siteMeta.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                    Спросить в Telegram
                  </Button>
                </div>
              </div>
              <div className="demo-stage__media">
                <img alt="Сценарий демонстрации NIVIM VIDEL R1" className="demo-stage__image" src={asset(homeContent.demo.image)} />
                <div className="demo-stage__play" aria-hidden="true">
                  <span>Видео-презентация</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-6 xl:grid-cols-[0.92fr,1.08fr] xl:items-start">
            <Reveal className="space-y-5">
              <p className="section-kicker">Спецификации и цена</p>
              <h2 className="display-title display-title--section">{homeContent.specs.title}</h2>
              <p className="body-copy max-w-[38rem]">{homeContent.specs.intro}</p>
              <p className="caption-copy max-w-[34rem]">{homeContent.specs.note}</p>

              <ul className="grid gap-3">
                {homeContent.specs.highlights.map((item) => (
                  <li key={item} className="highlight-item">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button onClick={() => addItem(product.id)}>{productQuantity > 0 ? "Добавить ещё один" : "Добавить в корзину"}</Button>
                <Button href={route("/cart/")} variant="secondary">
                  Перейти в корзину
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="feature-panel overflow-hidden p-5 sm:p-6">
                <div className="spec-card__media">
                  <img alt="VIDEL R1" className="mx-auto max-h-[320px] object-contain" loading="lazy" src={asset(homeContent.specs.image)} />
                </div>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="section-kicker">NIVIM VIDEL R1</p>
                    <h3 className="card-title mt-3">Честная конфигурация без визуальной каши</h3>
                  </div>
                  <p className="spec-card__price">{formatPrice(product.price)}</p>
                </div>
                <dl className="spec-grid">
                  {homeContent.specs.rows.map(([label, value]) => (
                    <div key={label} className="spec-row">
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">{homeContent.testimonials.eyebrow}</p>
              <h2 className="display-title display-title--section">{homeContent.testimonials.title}</h2>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {homeContent.testimonials.items.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.06}>
                  <article className="testimonial-card">
                    <div className="mb-5 flex items-center gap-4">
                      <img alt={item.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" src={asset(item.image)} />
                      <div>
                        <h3 className="text-base font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-white/54">{item.role}</p>
                      </div>
                    </div>
                    <p className="body-copy body-copy--small">“{item.quote}”</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-8 xl:grid-cols-[0.8fr,1.2fr]">
            <Reveal className="space-y-4">
              <p className="section-kicker">{homeContent.faq.eyebrow}</p>
              <h2 className="display-title display-title--section">Частые вопросы</h2>
              <p className="body-copy max-w-[32rem]">
                Если вопрос не вошёл в список, не мучайтесь. Лучше написать сразу — так вы быстрее поймёте, подходит ли вам
                именно ваш сценарий с NIVIM.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={homeContent.faq.items} />
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <Reveal className="support-banner">
              <div className="space-y-3">
                <p className="section-kicker">Поддержка NIVIM</p>
                <h2 className="display-title display-title--section">Не нашли свой вопрос?</h2>
                <p className="body-copy max-w-[36rem]">
                  Задайте его в Telegram-боте поддержки NIVIM. Быстро ответим и не заставим продираться через корпоративный
                  лабиринт.
                </p>
              </div>
              <Button href={siteMeta.telegramUrl} target="_blank" rel="noreferrer">
                Задать вопрос
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">{homeContent.editorial.eyebrow}</p>
              <h2 className="display-title display-title--section">{homeContent.editorial.title}</h2>
              <p className="body-copy max-w-[48rem]">{homeContent.editorial.intro}</p>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {homeContent.editorial.posts.map((post, index) => (
                <Reveal key={post.title} delay={index * 0.05}>
                  <article className="editorial-card">
                    <img alt={post.title} className="editorial-card__image" loading="lazy" src={asset(post.image)} />
                    <div className="space-y-3">
                      <div className="editorial-card__meta">
                        <span>{post.tag}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="card-title">{post.title}</h3>
                      <p className="body-copy body-copy--small">{post.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Button href={route("/blog/")} variant="secondary">
                Перейти в журнал
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="section-pad pb-0">
          <div className="page-shell">
            <Reveal className="cta-panel">
              <div className="space-y-4">
                <p className="section-kicker">{homeContent.cta.eyebrow}</p>
                <h2 className="display-title text-3xl sm:text-4xl">{homeContent.cta.title}</h2>
                <p className="body-copy max-w-[42rem]">{homeContent.cta.body}</p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button onClick={() => addItem(product.id)}>{productQuantity > 0 ? "Открыть корзину" : "Добавить в корзину"}</Button>
                <Button href={homeAnchor("contacts")} variant="secondary">
                  Связаться
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function sitePrice() {
  return formatPrice(product.price);
}
