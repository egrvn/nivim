import { useMemo, useState } from "react";

import { motion } from "framer-motion";

import { Accordion } from "../components/Accordion";
import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { homeContent } from "../content/site";
import { asset, homeAnchor, route } from "../lib/paths";
import { renderLines } from "../lib/text";

export function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepData = useMemo(() => homeContent.steps.items[activeStep], [activeStep]);

  return (
    <PageShell pageKey="home">
      <main>
        <section className="hero-section">
          <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-7">
              <Reveal>
                <p className="section-kicker">{homeContent.hero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-title display-title--hero">{renderLines(homeContent.hero.title)}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-copy max-w-[46rem]">{homeContent.hero.lead}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="body-copy max-w-[42rem]">{homeContent.hero.body}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="caption-copy max-w-[40rem]">{homeContent.hero.supporting}</p>
              </Reveal>
              <Reveal delay={0.25} className="flex flex-wrap gap-3">
                <Button href={homeAnchor("product")}>Смотреть продукт</Button>
                <Button href={homeAnchor("contacts")} variant="secondary">
                  Связаться
                </Button>
              </Reveal>

              <Reveal delay={0.3}>
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
              <div className="product-stage">
                <div className="product-stage__beam" aria-hidden="true" />
                <img alt="" aria-hidden="true" className="product-stage__halo" src={asset(homeContent.hero.halo)} />
                <img alt="Проектор NIVIM VIDEL R1" className="product-stage__device" src={asset(homeContent.hero.image)} />
                <div className="product-stage__wordmark">NIVIM</div>
                <div className="product-stage__price">
                  <span>Цена</span>
                  <strong>29 990 ₽</strong>
                  <p>С честной ценой без лишней наценки за шумный маркетинг.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad" id="product">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">{homeContent.scenarios.title}</p>
              <h2 className="display-title display-title--section">Сценарии, где продукт выглядит убедительно</h2>
              <p className="body-copy max-w-[50rem]">{homeContent.scenarios.intro}</p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {homeContent.scenarios.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.05}>
                  <article className="media-card">
                    <div className="media-card__image-wrap">
                      <img alt={card.title} className="media-card__image" loading="lazy" src={asset(card.image)} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="card-title">{card.title}</h3>
                      <p className="body-copy body-copy--small">{card.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell grid gap-4 xl:grid-cols-[0.85fr,1.15fr]">
            <Reveal className="card-surface p-6 sm:p-8">
              <p className="section-kicker">{homeContent.benefits.title}</p>
              <h2 className="display-title text-[2rem] sm:text-[2.4rem]">{homeContent.benefits.title}</h2>
              <p className="body-copy mt-4">{homeContent.benefits.intro}</p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {homeContent.benefits.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.06}>
                  <article className="card-surface h-full p-6">
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
          <div className="page-shell grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
            <Reveal className="space-y-4">
              <p className="section-kicker">Просто включи</p>
              <h2 className="display-title display-title--section">Три шага от коробки до готового вечера</h2>
              <p className="body-copy max-w-[34rem]">{homeContent.steps.intro}</p>
              <div className="grid gap-3">
                {homeContent.steps.items.map((step, index) => {
                  const active = activeStep === index;
                  return (
                    <button
                      key={step.number}
                      className={`step-selector ${active ? "step-selector--active" : ""}`}
                      onClick={() => setActiveStep(index)}
                      type="button"
                    >
                      <span className="step-selector__number">{step.number}</span>
                      <span className="step-selector__content">
                        <strong>{step.title}</strong>
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
                initial={{ opacity: 0.75, y: 18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="card-surface interactive-stage overflow-hidden p-6 sm:p-8"
              >
                <div className="interactive-stage__glow" aria-hidden="true" />
                <div className="relative z-10 grid gap-6">
                  <span className="section-kicker">Шаг {activeStepData.number}</span>
                  <h3 className="display-title text-[1.8rem] sm:text-[2.2rem]">{activeStepData.title}</h3>
                  <p className="body-copy max-w-[32rem]">{activeStepData.text}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="mini-chip">Автофокус</div>
                    <div className="mini-chip">Быстрое подключение</div>
                    <div className="mini-chip">Android 12</div>
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
              <h2 className="display-title display-title--section">Функции, собранные вокруг сценария, а не ради списка</h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homeContent.features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <article className="card-surface h-full p-6">
                    <img alt="" aria-hidden="true" className="mb-5 h-10 w-10" loading="lazy" src={asset(feature.icon)} />
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{feature.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-6 xl:grid-cols-[0.95fr,1.05fr] xl:items-start">
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
                <Button href={homeAnchor("contacts")}>Запросить консультацию</Button>
                <Button href={route("/podderjka/")} variant="secondary">
                  Перейти в поддержку
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="card-surface overflow-hidden p-5 sm:p-6">
                <div className="mb-5 overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(16,21,34,0.92),rgba(10,11,16,0.96))] p-5">
                  <img alt="VIDEL R1" className="mx-auto max-h-[280px] object-contain" loading="lazy" src={asset(homeContent.specs.image)} />
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
                  <article className="card-surface h-full p-6">
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
              <h2 className="display-title display-title--section">{homeContent.faq.title}</h2>
              <p className="body-copy max-w-[32rem]">
                Если вопрос не вошёл в список, не мучайтесь. Лучше написать сразу — так вы быстрее поймёте, подходит ли вам
                сценарий с NIVIM.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={homeContent.faq.items} />
            </Reveal>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">{homeContent.editorial.eyebrow}</p>
              <h2 className="display-title display-title--section">{homeContent.editorial.title}</h2>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {homeContent.editorial.posts.map((post, index) => (
                <Reveal key={post.title} delay={index * 0.05}>
                  <article className="editorial-card">
                    <img alt={post.title} className="editorial-card__image" loading="lazy" src={asset(post.image)} />
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
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
            <Reveal className="card-surface relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
              <div className="cta-grid">
                <div className="space-y-4">
                  <p className="section-kicker">{homeContent.cta.eyebrow}</p>
                  <h2 className="display-title text-3xl sm:text-4xl">{homeContent.cta.title}</h2>
                  <p className="body-copy max-w-[42rem]">{homeContent.cta.body}</p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Button href={homeAnchor("contacts")}>Оставить контакт</Button>
                  <Button href={route("/podderjka/")} variant="secondary">
                    Сначала задать вопрос
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
