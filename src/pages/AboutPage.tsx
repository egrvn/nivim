import { PageShell } from "../components/PageShell";
import { aboutContent } from "../content/site";
import { asset } from "../lib/paths";

function InnerHero({ description, title }: { title: string; description: string }) {
  return (
    <section className="inner-page-hero">
      <div className="site-container">
        <div className="inner-page-hero__frame">
          <img alt="" aria-hidden="true" className="inner-page-hero__image" src={asset("figma/inner-hero.png")} />
          <div className="inner-page-hero__overlay" />
          <p className="site-gradient-heading site-gradient-heading--center inner-page-hero__title">{title}</p>
          <HomeWordmark />
          <p className="inner-page-hero__description">{description}</p>
        </div>
      </div>
    </section>
  );
}

function HomeWordmark() {
  return (
    <div className="site-wordmark site-wordmark--inner" aria-hidden="true">
      <span>N</span>
      <span className="site-wordmark__ghost">IVI</span>
      <span>M</span>
    </div>
  );
}

export function AboutPage() {
  return (
    <PageShell page="about">
      <InnerHero title={aboutContent.hero.title} description={aboutContent.hero.description} />

      <section className="inner-wave-section">
        <div className="site-container">
          <div className="inner-wave-section__media">
            <img alt="" aria-hidden="true" src={asset("figma/inner-wave.png")} />
          </div>
        </div>
      </section>

      <section className="inner-page-section">
        <div className="site-container">
          <div className="inner-manifesto">
            {aboutContent.manifesto.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="inner-value-grid">
            {aboutContent.values.map((item) => (
              <article key={item.title} className={`benefit-card benefit-card--${item.variant ?? "dark"}`}>
                <img alt="" aria-hidden="true" className="benefit-card__icon" src={asset(item.icon)} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
