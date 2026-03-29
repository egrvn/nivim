import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Accordion } from "../components/Accordion";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { useCart } from "../commerce/cart";
import { PRIMARY_PRODUCT_ID } from "../content/cart";
import { homeContent } from "../content/site";
import { asset, homeAnchor, route } from "../lib/paths";

function HomeWordmark({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`site-wordmark ${footer ? "site-wordmark--footer" : ""}`} aria-hidden="true">
      <span>N</span>
      <span className="site-wordmark__ghost">IVI</span>
      <span>M</span>
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const wordmarkY = useTransform(scrollY, [0, 520], [0, -22]);
  const auroraY = useTransform(scrollY, [0, 520], [0, 28]);
  const deviceY = useTransform(scrollY, [0, 520], [0, 18]);

  return (
    <section className="home-hero">
      <div className="home-hero__background">
        <img alt="" aria-hidden="true" className="home-hero__fvd" src={asset(homeContent.hero.background)} />
        <motion.img
          alt=""
          aria-hidden="true"
          className="home-hero__star"
          src={asset(homeContent.hero.star)}
          style={reduceMotion ? undefined : { y: auroraY }}
        />
        <div className="home-hero__aurora home-hero__aurora--left" aria-hidden="true" />
        <div className="home-hero__aurora home-hero__aurora--right" aria-hidden="true" />
        <div className="home-hero__pulse" aria-hidden="true" />
      </div>

      <div className="site-container home-hero__content">
        <div className="home-hero__copy">
          <Reveal>
            <p className="site-gradient-heading site-gradient-heading--center home-hero__kicker">{homeContent.hero.kicker}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="home-hero__lead">{homeContent.hero.lead}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="home-hero__actions">
              <a className="site-light-button site-light-button--center" href={homeAnchor("product")}>
                {homeContent.hero.button}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="home-hero__visual">
          <motion.div className="home-hero__wordmark-shell" style={reduceMotion ? undefined : { y: wordmarkY }}>
            <HomeWordmark />
          </motion.div>
          <motion.div className="home-hero__device-shell" style={reduceMotion ? undefined : { y: deviceY }}>
            <img alt="Проектор VIDEL R1" className="home-hero__device" src={asset(homeContent.hero.device)} fetchPriority="high" />
          </motion.div>
        </div>

        <Reveal delay={0.14}>
          <p className="home-hero__note">{homeContent.hero.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section id="product" className="home-section home-section--scenarios">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title home-section__title--wide">{homeContent.scenarios.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy home-section__copy--wide">{homeContent.scenarios.description}</p>
        </Reveal>

        <div className="scenario-grid">
          {homeContent.scenarios.cards.map((card, index) => (
            <Reveal key={card.title} delay={0.06 + index * 0.05}>
              <article className={`scenario-card scenario-card--${card.align ?? "left"}`}>
                <img
                  alt={card.title}
                  className="scenario-card__image"
                  src={asset(card.image)}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: card.imagePosition ?? "center" }}
                />
                <div className="scenario-card__overlay" />
                <div className="scenario-card__content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span>{card.quote}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="home-section">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.benefits.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.benefits.description}</p>
        </Reveal>

        <div className="benefit-grid">
          {homeContent.benefits.cards.map((card, index) => (
            <Reveal key={card.title} delay={0.08 + index * 0.05}>
              <article className={`benefit-card benefit-card--${card.variant ?? "dark"}`}>
                <img alt="" aria-hidden="true" className="benefit-card__icon" src={asset(card.icon)} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
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
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.steps.title}</h2>
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
  return (
    <section className="home-section">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.features.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.features.description}</p>
        </Reveal>

        <div className="feature-grid">
          <Reveal delay={0.08}>
            <article className={`feature-card feature-card--${homeContent.features.items[0].variant ?? "dark"}`}>
              <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(homeContent.features.items[0].icon)} />
              <h3>{homeContent.features.items[0].title}</h3>
              <p>{homeContent.features.items[0].description}</p>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="feature-card feature-card--media">
              <img alt="" aria-hidden="true" className="feature-card__image" src={asset(homeContent.features.mediaCard)} loading="lazy" decoding="async" />
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article className={`feature-card feature-card--${homeContent.features.items[1].variant ?? "dark"}`}>
              <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(homeContent.features.items[1].icon)} />
              <h3>{homeContent.features.items[1].title}</h3>
              <p>{homeContent.features.items[1].description}</p>
            </article>
          </Reveal>

          {homeContent.features.items.slice(2).map((item, index) => (
            <Reveal key={item.title} delay={0.2 + index * 0.05}>
              <article className={`feature-card feature-card--${item.variant ?? "dark"}`}>
                <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(item.icon)} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
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
          <h2 className="site-gradient-heading site-gradient-heading--left home-section__title home-section__title--full">{homeContent.video.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy home-section__copy--video">{homeContent.video.description}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="video-card">
            <img alt="Демонстрация VIDEL R1" className="video-card__image" src={asset(homeContent.video.background)} loading="lazy" decoding="async" />
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

  return (
    <section className="home-section home-value">
      <div className="site-container">
        <div className="home-value__background" aria-hidden="true">
          <img alt="" src={asset(homeContent.value.background)} />
        </div>

        <div className="home-value__grid">
          <Reveal delay={0.04} className="home-value__copy-shell">
            <p className="home-value__eyebrow">{homeContent.value.eyebrow}</p>
            <h2 className="site-gradient-heading site-gradient-heading--left home-value__title">{homeContent.value.title}</h2>
            <p className="home-value__description">{homeContent.value.description}</p>

            <div className="home-value__highlights">
              {homeContent.value.highlights.map((item) => (
                <article key={item.title} className="home-value__highlight">
                  <img alt="" aria-hidden="true" src={asset(item.icon)} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-value__specs">
              {homeContent.value.specs.map((spec) => (
                <p key={spec}>{spec}</p>
              ))}
            </div>

            <div className="home-value__action">
              <div className="home-value__price-block">
                <span>Стоимость</span>
                <p className="home-value__price">{homeContent.value.price}</p>
                <small>{homeContent.value.caption}</small>
              </div>
              <button
                className="site-light-button home-value__cta"
                type="button"
                onClick={() => {
                  addItem(PRIMARY_PRODUCT_ID);
                  window.location.href = route("/cart/");
                }}
              >
                {homeContent.value.cta}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="home-value__product">
            <div className="home-value__visual-shell">
              <img alt="" aria-hidden="true" className="home-value__stage" src={asset(homeContent.value.background)} loading="lazy" decoding="async" />
              <img alt="Проектор NIVIM VIDEL R1" className="home-value__image" src={asset(homeContent.value.image)} loading="lazy" decoding="async" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="home-section">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.testimonials.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-section__copy">{homeContent.testimonials.description}</p>
        </Reveal>
        <div className="testimonial-grid">
          {homeContent.testimonials.items.map((item, index) => (
            <Reveal key={item.name} delay={0.08 + index * 0.05}>
              <article className="testimonial-card">
                <p className="testimonial-card__quote">“{item.quote}”</p>
                <div className="testimonial-card__meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            </Reveal>
          ))}
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
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.faq.title}</h2>
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

function SupportSection() {
  return (
    <section className="home-section home-support">
      <div className="site-container">
        <Reveal>
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.support.title}</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="home-support__copy">{homeContent.support.description}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <a className="site-light-button site-light-button--center" href={homeContent.support.href} target="_blank" rel="noreferrer">
            {homeContent.support.button}
          </a>
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
          <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.editorial.title}</h2>
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
      <ScenariosSection />
      <BenefitsSection />
      <StepsSection />
      <FeaturesSection />
      <VideoSection />
      <ValueSection />
      <TestimonialsSection />
      <FaqSection />
      <SupportSection />
      <EditorialSection />
    </PageShell>
  );
}
