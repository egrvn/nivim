import { Artboard } from "../components/Artboard";
import { HomeFinalFooter } from "../components/HomeFinalFooter";
import { TopStrip } from "../components/TopStrip";
import { homeContent } from "../content/site";
import { asset, homeAnchor } from "../lib/paths";
import { renderLines } from "../lib/text";

const scenarioPositions = [
  { left: 10, top: 1183 },
  { left: 605, top: 1183 },
  { left: 10, top: 1543 },
  { left: 605, top: 1543 },
] as const;

const benefitPositions = [
  { left: 10, top: 2260 },
  { left: 407, top: 2260 },
  { left: 804, top: 2260 },
] as const;

const featurePositions = [
  { left: 10, top: 4824 },
  { left: 804, top: 4824 },
  { left: 10, top: 5065 },
  { left: 407, top: 5065 },
  { left: 804, top: 5065 },
] as const;

export function HomePage() {
  return (
    <Artboard className="figma-home" height={11308}>
      <div className="figma-home__background" />
      <TopStrip page="home" />

      <section id="top">
        <img alt="" aria-hidden="true" className="home-hero__background" src={asset(homeContent.hero.background)} />
        <img alt="" aria-hidden="true" className="home-hero__star" src={asset(homeContent.hero.star)} />
        <div className="figma-wordmark figma-wordmark--hero figma-wordmark--ghosted" aria-hidden="true">
          <span className="figma-wordmark__ghost">N</span>
          <span>IVI</span>
          <span className="figma-wordmark__ghost">M</span>
        </div>
        <div className="figma-wordmark figma-wordmark--hero" aria-hidden="true">
          <span>N</span>
          <span className="figma-wordmark__ghost">IVI</span>
          <span>M</span>
        </div>

        <h1 className="figma-gradient-heading figma-gradient-heading--center figma-home__hero-title">{homeContent.hero.kicker}</h1>
        <p className="figma-home__hero-lead">{homeContent.hero.lead}</p>
        <a className="figma-light-button figma-light-button--center" href={homeAnchor("product")}>
          {homeContent.hero.cta}
        </a>
        <p className="figma-home__hero-note">{homeContent.hero.note}</p>

        <img alt="" aria-hidden="true" className="home-hero__beam" src={asset(homeContent.hero.beam)} />
        <img alt="VIDEL R1" className="home-hero__device" src={asset(homeContent.hero.device)} />
      </section>

      <section id="product">
        <div className="figma-section-backdrop" style={{ top: 1006, height: 636 }} />
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 969, width: 805, left: 198 }}>
          {renderLines(homeContent.scenarios.title)}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 1091, width: 653, left: 274 }}>
          {homeContent.scenarios.description}
        </p>

        {homeContent.scenarios.cards.map((card, index) => {
          const position = scenarioPositions[index];
          return (
            <article
              key={card.title}
              className={`home-scenario-card home-scenario-card--${card.align}`}
              style={{ left: position.left, top: position.top }}
            >
              <img alt={card.title} className="home-scenario-card__image" src={asset(card.image)} />
              <h3 className="home-scenario-card__title">{card.title}</h3>
              <p className="home-scenario-card__description">{card.description}</p>
              <p className="home-scenario-card__quote">{card.quote}</p>
            </article>
          );
        })}
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 2058, width: 601, left: 300 }}>
          {homeContent.benefits.title}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 2144, width: 643, left: 279 }}>
          {homeContent.benefits.description}
        </p>

        {homeContent.benefits.cards.map((card, index) => {
          const position = benefitPositions[index];
          return (
            <article key={card.title} className={`home-info-card home-info-card--${card.variant ?? "dark"}`} style={{ left: position.left, top: position.top }}>
              {card.icon ? <img alt="" aria-hidden="true" className="home-info-card__icon" src={asset(card.icon)} /> : null}
              <h3 className="home-info-card__title">{card.title}</h3>
              <p className="home-info-card__description">{card.description}</p>
            </article>
          );
        })}
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 2656, width: 601, left: 300 }}>
          {homeContent.steps.title}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 2742, width: 620, left: 300 }}>
          {homeContent.steps.description}
        </p>

        {homeContent.steps.items.map((step, index) => (
          <div key={step.number}>
            <div className="home-step__number-shell" style={{ left: 10, top: 3138 + index * 531 }}>
              <span>{step.number}</span>
            </div>
            <p className="home-step__kicker" style={{ top: 3107 + index * 531 }}>
              {step.kicker}
            </p>
            <h3 className="home-step__title" style={{ top: 3145 + index * 531 }}>
              {step.title}
            </h3>
            <p className="home-step__description" style={{ top: 3218 + index * 531 }}>
              {step.description}
            </p>
            <img alt={step.title} className="home-step__image" src={asset(step.image)} style={{ top: 2912 + index * 540 }} />
          </div>
        ))}
      </section>

      <section id="demo">
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 4622, width: 601, left: 300 }}>
          {renderLines(homeContent.features.title)}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 4708, width: 654, left: 273 }}>
          {homeContent.features.description}
        </p>

        <article className="home-feature-card home-feature-card--media" style={{ left: 407, top: 4824 }}>
          <img alt="" aria-hidden="true" className="home-feature-card__image" src={asset(homeContent.features.mediaCard)} />
        </article>

        {homeContent.features.items.map((feature, index) => {
          const position = featurePositions[index];
          return (
            <article
              key={feature.title}
              className={`home-feature-card home-feature-card--${feature.variant}`}
              style={{ left: position.left, top: position.top }}
            >
              <img alt="" aria-hidden="true" className="home-feature-card__icon" src={asset(feature.icon)} />
              <h3 className="home-feature-card__title">{feature.title}</h3>
              <p className="home-feature-card__description">{feature.description}</p>
            </article>
          );
        })}
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--left" style={{ top: 5461, left: 0, width: 1200 }}>
          {homeContent.video.title}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 5527, width: 627, left: 287 }}>
          {homeContent.video.description}
        </p>
        <div className="home-placeholder home-placeholder--video" style={{ left: 10, top: 5631, width: 1180, height: 548 }}>
          <span>{homeContent.video.placeholder}</span>
        </div>
      </section>

      <section>
        <img alt="" aria-hidden="true" className="home-value__background" src={asset(homeContent.video.background)} />
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 6343, width: 601, left: 300 }}>
          {renderLines(homeContent.value.title)}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 6435, width: 574, left: 313 }}>
          {homeContent.value.description}
        </p>
        <div className="home-value__specs">
          {homeContent.value.specs.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <p className="home-value__price">{homeContent.value.price}</p>
        <a className="figma-light-button figma-light-button--value" href={homeAnchor("demo")}>
          {homeContent.value.cta}
        </a>
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 7458, width: 713, left: 244 }}>
          {renderLines(homeContent.testimonials.title)}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 7544, width: 654, left: 273 }}>
          {renderLines(homeContent.testimonials.description)}
        </p>
        <div className="home-placeholder" style={{ left: 10, top: 7622, width: 1180, height: 548 }}>
          <span>{renderLines(homeContent.testimonials.placeholder)}</span>
        </div>
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 8335, width: 713, left: 244 }}>
          {homeContent.faq.title}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 8386, width: 654, left: 273 }}>
          {renderLines(homeContent.faq.description)}
        </p>
        <div className="home-placeholder" style={{ left: 10, top: 8464, width: 1180, height: 548 }}>
          <span>{renderLines(homeContent.faq.placeholder)}</span>
        </div>
      </section>

      <section>
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 9052, width: 886, left: 157 }}>
          {renderLines(homeContent.support.title)}
        </h2>
        <p className="home-support__description">{homeContent.support.description}</p>
        <a className="figma-light-button figma-light-button--support" href="https://t.me/nivim_support_bot" rel="noreferrer" target="_blank">
          {homeContent.support.button}
        </a>
      </section>

      <section>
        <img alt="" aria-hidden="true" className="home-lower__background" src={asset(homeContent.features.background)} />
        <h2 className="figma-gradient-heading figma-gradient-heading--center figma-home__section-title" style={{ top: 9421, width: 886, left: 157 }}>
          {renderLines(homeContent.editorial.title)}
        </h2>
        <p className="figma-home__section-copy" style={{ top: 9507, width: 507, left: 347 }}>
          {homeContent.editorial.description}
        </p>
        <div className="home-placeholder" style={{ left: 0, top: 9623, width: 1200, height: 548 }}>
          <span>{renderLines(homeContent.editorial.placeholder)}</span>
        </div>
      </section>

      <div id="final-cta" style={{ position: "absolute", inset: "10527px 0 0" }}>
        <HomeFinalFooter />
      </div>
    </Artboard>
  );
}
