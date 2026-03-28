import { PageShell } from "../components/PageShell";
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
  return (
    <section className="home-hero">
      <div className="home-hero__background">
        <img alt="" aria-hidden="true" className="home-hero__fvd" src={asset(homeContent.hero.background)} />
        <img alt="" aria-hidden="true" className="home-hero__star" src={asset(homeContent.hero.star)} />
      </div>

      <div className="site-container home-hero__content">
        <p className="site-gradient-heading site-gradient-heading--center home-hero__kicker">{homeContent.hero.kicker}</p>
        <p className="home-hero__lead">{homeContent.hero.lead}</p>
        <a className="site-light-button site-light-button--center" href={homeAnchor("product")}>
          {homeContent.hero.button}
        </a>

        <HomeWordmark />
        <img alt="VIDEL R1" className="home-hero__device" src={asset(homeContent.hero.device)} />

        <p className="home-hero__note">{homeContent.hero.note}</p>
      </div>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section id="product" className="home-section home-section--scenarios">
      <div className="site-container">
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title home-section__title--wide">{homeContent.scenarios.title}</h2>
        <p className="home-section__copy home-section__copy--wide">{homeContent.scenarios.description}</p>

        <div className="scenario-grid">
          {homeContent.scenarios.cards.map((card) => (
            <article key={card.title} className={`scenario-card scenario-card--${card.align ?? "left"}`}>
              <img alt={card.title} className="scenario-card__image" src={asset(card.image)} style={{ objectPosition: card.imagePosition ?? "center" }} />
              <div className="scenario-card__overlay" />
              <div className="scenario-card__content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span>{card.quote}</span>
              </div>
            </article>
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
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.benefits.title}</h2>
        <p className="home-section__copy">{homeContent.benefits.description}</p>

        <div className="benefit-grid">
          {homeContent.benefits.cards.map((card) => (
            <article key={card.title} className={`benefit-card benefit-card--${card.variant ?? "dark"}`}>
              <img alt="" aria-hidden="true" className="benefit-card__icon" src={asset(card.icon)} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
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
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.steps.title}</h2>
        <p className="home-section__copy">{homeContent.steps.description}</p>

        <div className="steps-stack">
          {homeContent.steps.items.map((step) => (
            <article key={step.number} className="step-row">
              <div className="step-row__copy">
                <div className="step-row__number">{step.number}</div>
                <p className="step-row__kicker">{step.kicker}</p>
                <h3>{step.title}</h3>
                <p className="step-row__description">{step.description}</p>
              </div>
              <div className="step-row__media">
                <img alt={step.title} src={asset(step.image)} />
              </div>
            </article>
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
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.features.title}</h2>
        <p className="home-section__copy">{homeContent.features.description}</p>

        <div className="feature-grid">
          <article className={`feature-card feature-card--${homeContent.features.items[0].variant ?? "dark"}`}>
            <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(homeContent.features.items[0].icon)} />
            <h3>{homeContent.features.items[0].title}</h3>
            <p>{homeContent.features.items[0].description}</p>
          </article>

          <article className="feature-card feature-card--media">
            <img alt="" aria-hidden="true" className="feature-card__image" src={asset(homeContent.features.mediaCard)} />
          </article>

          <article className={`feature-card feature-card--${homeContent.features.items[1].variant ?? "dark"}`}>
            <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(homeContent.features.items[1].icon)} />
            <h3>{homeContent.features.items[1].title}</h3>
            <p>{homeContent.features.items[1].description}</p>
          </article>

          {homeContent.features.items.slice(2).map((item) => (
            <article key={item.title} className={`feature-card feature-card--${item.variant ?? "dark"}`}>
              <img alt="" aria-hidden="true" className="feature-card__icon" src={asset(item.icon)} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
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
        <h2 className="site-gradient-heading site-gradient-heading--left home-section__title home-section__title--full">{homeContent.video.title}</h2>
        <p className="home-section__copy home-section__copy--video">{homeContent.video.description}</p>
        <div className="site-placeholder site-placeholder--video">
          <span>{homeContent.video.placeholder}</span>
        </div>
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

        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.value.title}</h2>
        <p className="home-section__copy home-section__copy--narrow">{homeContent.value.description}</p>

        <div className="home-value__grid">
          <div className="home-value__specs">
            {homeContent.value.specs.map((spec) => (
              <p key={spec}>{spec}</p>
            ))}
          </div>

          <div className="home-value__product">
            <p className="home-value__price">{homeContent.value.price}</p>
            <button
              className="site-light-button"
              type="button"
              onClick={() => {
                addItem(PRIMARY_PRODUCT_ID);
                window.location.href = route("/cart/");
              }}
            >
              {homeContent.value.cta}
            </button>
            <img alt="VIDEL R1" className="home-value__image" src={asset(homeContent.value.image)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaceholderSection({
  title,
  description,
  placeholder,
}: {
  title: string;
  description: string;
  placeholder: string;
}) {
  return (
    <section className="home-section">
      <div className="site-container">
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{title}</h2>
        <p className="home-section__copy">{description}</p>
        <div className="site-placeholder">
          <span>{placeholder}</span>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="home-section home-support">
      <div className="site-container">
        <h2 className="site-gradient-heading site-gradient-heading--center home-section__title">{homeContent.support.title}</h2>
        <p className="home-support__copy">{homeContent.support.description}</p>
        <a className="site-light-button site-light-button--center" href={homeContent.support.href} target="_blank" rel="noreferrer">
          {homeContent.support.button}
        </a>
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
      <PlaceholderSection
        title={homeContent.testimonials.title}
        description={homeContent.testimonials.description}
        placeholder={homeContent.testimonials.placeholder}
      />
      <PlaceholderSection title={homeContent.faq.title} description={homeContent.faq.description} placeholder={homeContent.faq.placeholder} />
      <SupportSection />
      <PlaceholderSection
        title={homeContent.editorial.title}
        description={homeContent.editorial.description}
        placeholder={homeContent.editorial.placeholder}
      />
    </PageShell>
  );
}
