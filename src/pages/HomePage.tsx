import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

import { Accordion } from "../components/Accordion";
import { Icon } from "../components/Icon";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { useCart } from "../commerce/cart";
import { PRIMARY_PRODUCT_ID } from "../content/cart";
import { homeContent } from "../content/site";
import { asset, homeAnchor, route } from "../lib/paths";

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const auroraY = useTransform(scrollY, [0, 520], [0, 28]);
  const deviceY = useTransform(scrollY, [0, 520], [0, -10]);

  return (
    <section className="home-hero">
      <div className="home-hero__background" aria-hidden="true">
        <motion.div
          className="home-hero__aurora home-hero__aurora--left"
          style={reduceMotion ? undefined : { y: auroraY }}
        />
        <motion.div
          className="home-hero__aurora home-hero__aurora--right"
          style={reduceMotion ? undefined : { y: auroraY }}
        />
        <div className="home-hero__pulse" />
        <div className="home-hero__grid-overlay" />
      </div>

      <div className="site-container home-hero__content">
        <div className="home-hero__copy">
          <Reveal>
            <p className="site-eyebrow home-hero__eyebrow">{homeContent.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="site-gradient-heading site-gradient-heading--center home-hero__kicker">
              {homeContent.hero.kicker}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="home-hero__lead">{homeContent.hero.lead}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="home-hero__actions">
              <a className="site-light-button site-light-button--primary" href={homeAnchor("product")}>
                <span>{homeContent.hero.button}</span>
                <span className="site-light-button__icon" aria-hidden="true">↓</span>
              </a>
              <a className="site-ghost-button" href={route("/cart/")}>
                {homeContent.hero.secondary}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="home-hero__stage" aria-hidden={false}>
          <div className="home-hero__wordmark" aria-hidden="true">
            NIVIM
          </div>
          <motion.div
            className="home-hero__device-shell"
            initial={{ opacity: 0, y: 40 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={reduceMotion ? undefined : { y: deviceY }}
          >
            <img
              alt="Проектор VIDEL R1"
              className="home-hero__device"
              src={asset(homeContent.hero.device)}
              fetchPriority="high"
            />
            <div className="home-hero__device-shadow" aria-hidden="true" />
          </motion.div>
        </div>

        <Reveal delay={0.2}>
          <div className="home-hero__chips" role="list">
            {homeContent.hero.chips.map((chip) => (
              <span key={chip} className="home-hero__chip" role="listitem">
                {chip}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="home-hero__note">{homeContent.hero.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="home-section home-story">
      <div className="home-story__ambient" aria-hidden="true">
        <div className="home-story__ambient-beam" />
        <div className="home-story__ambient-haze" />
      </div>

      <div className="site-container">
        <div className="home-story__head">
          <Reveal>
            <p className="site-eyebrow">{homeContent.story.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="site-gradient-heading site-gradient-heading--left home-story__title">
              {homeContent.story.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="home-section__copy home-section__copy--left">{homeContent.story.description}</p>
          </Reveal>
        </div>

        <div className="home-story__stage">
          {homeContent.story.chapters.map((chapter, index) => (
            <Reveal key={chapter.title} delay={0.1 + index * 0.07}>
              <motion.article
                className="home-story__panel"
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="home-story__panel-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="home-story__panel-kicker">{chapter.kicker}</p>
                <h3 className="home-story__panel-title">{chapter.title}</h3>
                <p className="home-story__panel-body">{chapter.body}</p>
                <div className="home-story__panel-metric">
                  <span aria-hidden="true" />
                  <p>{chapter.metric}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="home-section home-problem">
      <div className="site-container">
        <Reveal>
          <p className="site-eyebrow">{homeContent.problem.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="site-gradient-heading site-gradient-heading--left home-problem__title">
            {homeContent.problem.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="home-problem__description">{homeContent.problem.description}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="home-problem__compare">
            <div className="home-problem__legend">
              <span className="home-problem__legend-cell home-problem__legend-cell--old">
                <span className="home-problem__legend-dot" aria-hidden="true" />
                {homeContent.problem.legend.old}
              </span>
              <span className="home-problem__legend-cell home-problem__legend-cell--next">
                <span className="home-problem__legend-dot" aria-hidden="true" />
                {homeContent.problem.legend.next}
              </span>
            </div>

            <div className="home-problem__rows">
              {homeContent.problem.rows.map((row, index) => (
                <Reveal key={row.title} delay={0.16 + index * 0.05}>
                  <article className="home-problem__row">
                    <header className="home-problem__row-head">
                      <span className="home-problem__row-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{row.title}</h3>
                    </header>
                    <div className="home-problem__row-body">
                      <p className="home-problem__row-old">{row.before}</p>
                      <p className="home-problem__row-new">{row.after}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="home-section home-benefits">
      <div className="site-container">
        <Reveal>
          <p className="site-eyebrow">{homeContent.benefits.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="site-gradient-heading site-gradient-heading--left home-benefits__title">
            {homeContent.benefits.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="home-benefits__description">{homeContent.benefits.description}</p>
        </Reveal>

        <div className="home-benefits__grid">
          {homeContent.benefits.cards.map((card, index) => (
            <Reveal key={card.title} delay={0.12 + index * 0.07}>
              <motion.article
                className={`home-benefits__card ${card.variant === "accent" ? "home-benefits__card--accent" : ""}`}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="home-benefits__card-head">
                  <span className={`site-icon-frame ${card.variant === "accent" ? "site-icon-frame--accent" : ""}`}>
                    <Icon name={card.icon} size="md" tone="frost" />
                  </span>
                  {card.metric ? <span className="home-benefits__card-metric">{card.metric}</span> : null}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="home-benefits__card-glow" aria-hidden="true" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="home-section">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">
            {homeContent.steps.title}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.steps.description}</p>
        </Reveal>

        <div className="steps-stack">
          {homeContent.steps.items.map((step, index) => (
            <Reveal key={step.number} delay={0.08 + index * 0.06}>
              <article className="step-row">
                <div className="step-row__copy">
                  <div className="step-row__number">{step.number}</div>
                  <p className="step-row__kicker">{step.kicker}</p>
                  <h3>{step.title}</h3>
                  <p className="step-row__description">{step.description}</p>
                </div>
                <div className="step-row__media">
                  <img alt={step.title} src={asset(step.image)} loading="lazy" decoding="async" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="product" className="home-section home-features">
      <div className="site-container">
        <Reveal>
          <p className="site-eyebrow">{homeContent.features.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="site-gradient-heading site-gradient-heading--left home-features__title">
            {homeContent.features.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="home-features__description">{homeContent.features.description}</p>
        </Reveal>

        <div className="home-features__grid">
          {homeContent.features.items.map((item, index) => (
            <Reveal key={item.title} delay={0.12 + index * 0.05}>
              <motion.article
                className={`home-features__card ${item.variant === "accent" ? "home-features__card--accent" : ""}`}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <header className="home-features__card-head">
                  <span className={`site-icon-frame ${item.variant === "accent" ? "site-icon-frame--accent" : ""}`}>
                    <Icon name={item.icon} size="md" tone="frost" />
                  </span>
                  {item.spec ? <span className="home-features__card-spec">{item.spec}</span> : null}
                </header>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="demo" className="home-section home-section--wide-title">
      <div className="site-container site-container--wide">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--left home-section__title home-section__title--full">
            {homeContent.video.title}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy home-section__copy--video">{homeContent.video.description}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="video-card">
            <div className="video-card__background" aria-hidden="true" />
            <div className="video-card__overlay" />
            <div className="video-card__content">
              <p className="video-card__eyebrow">{homeContent.video.eyebrow}</p>
              <h3>Один проектор. Один световой центр. Никакой лишней техники вокруг.</h3>
              <a className="site-light-button" href={route("/blog/")}>
                {homeContent.video.cta}
              </a>
            </div>
            <div className="video-card__play" aria-hidden="true">
              <span />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ValueSection() {
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(PRIMARY_PRODUCT_ID);
    setAdded(true);
    window.setTimeout(() => {
      window.location.href = route("/cart/");
    }, 720);
  };

  return (
    <section className="home-section home-value">
      <div className="site-container">
        <div className="home-value__shell">
          <div className="home-value__copy">
            <Reveal>
              <p className="site-eyebrow">{homeContent.value.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="site-gradient-heading site-gradient-heading--left home-value__title">
                {homeContent.value.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="home-value__description">{homeContent.value.description}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="home-value__highlights">
                {homeContent.value.highlights.map((item) => (
                  <article key={item.title} className="home-value__highlight">
                    <span className="site-icon-frame">
                      <Icon name={item.icon} size="md" tone="frost" />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="home-value__specs">
                {homeContent.value.specs.map((spec) => (
                  <p key={spec}>{spec}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="home-value__action">
                <div className="home-value__price-block">
                  <span>Стоимость</span>
                  <p className="home-value__price">{homeContent.value.price}</p>
                  <small>{homeContent.value.caption}</small>
                </div>
                <button
                  className="site-light-button home-value__cta"
                  type="button"
                  onClick={handleAdd}
                  disabled={added}
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.24 }}
                      >
                        Добавлено — открываем корзину
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.24 }}
                      >
                        {homeContent.value.cta}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </Reveal>
          </div>

          <div className="home-value__product">
            <div className="home-value__visual-shell">
              <motion.div
                className="home-value__sphere"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.62, 0.86, 0.62] }}
                transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.div
                className="home-value__sphere-ring"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { rotate: [0, 360] }}
                transition={{ duration: 38, ease: "linear", repeat: Infinity }}
              />
              <motion.img
                alt="Проектор NIVIM VIDEL R1"
                className="home-value__image"
                src={asset(homeContent.value.image)}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.15 }}
              />
              <div className="home-value__sphere-base" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="home-section home-voices">
      <div className="site-container">
        <div className="home-voices__shell">
          <Reveal>
            <p className="site-eyebrow">{homeContent.voices.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="site-gradient-heading site-gradient-heading--center home-voices__title">
              {homeContent.voices.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="home-voices__description">{homeContent.voices.description}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="home-voices__actions">
              <a
                className="site-light-button site-light-button--primary"
                href={homeContent.voices.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{homeContent.voices.button}</span>
                <span className="site-light-button__icon" aria-hidden="true">→</span>
              </a>
              <a
                className="site-ghost-button"
                href={homeContent.voices.secondaryHref}
                target="_blank"
                rel="noreferrer"
              >
                {homeContent.voices.secondaryLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="home-section">
      <div className="site-container site-container--wide">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">
            {homeContent.faq.title}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.faq.description}</p>
        </Reveal>
        <Reveal delay={0.08} className="faq-block">
          <Accordion items={homeContent.faq.items} />
        </Reveal>
      </div>
    </section>
  );
}

function EditorialSection() {
  return (
    <section className="home-section">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">
            {homeContent.editorial.title}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.editorial.description}</p>
        </Reveal>
        <div className="editorial-grid">
          {homeContent.editorial.cards.map((item, index) => (
            <Reveal key={item.title} delay={0.08 + index * 0.05}>
              <article className="editorial-card">
                <img alt={item.title} className="editorial-card__image" src={asset(item.image)} loading="lazy" decoding="async" />
                <div className="editorial-card__overlay" />
                <div className="editorial-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={route(item.href)}>Читать</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageShell
      page="home"
      ctaDescription={homeContent.finalCta.description}
      ctaHref={route("/cart/")}
      ctaLabel={homeContent.finalCta.button}
      ctaTitle={homeContent.finalCta.title}
      showFooterCta
    >
      <HeroSection />
      <StorySection />
      <ProblemSection />
      <BenefitsSection />
      <StepsSection />
      <FeaturesSection />
      <VideoSection />
      <ValueSection />
      <VoicesSection />
      <FaqSection />
      <EditorialSection />
    </PageShell>
  );
}
