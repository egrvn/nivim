import { Icon } from "../components/Icon";
import { PageShell } from "../components/PageShell";
import { aboutContent } from "../content/site";

function InnerHero({ description, title }: { title: string; description: string }) {
  return (
    <section className="inner-page-hero">
      <div className="site-container">
        <div className="inner-page-hero__frame">
          <div className="inner-page-hero__overlay" aria-hidden="true" />
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
          <div className="inner-wave-section__media" aria-hidden="true" />
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
                <span className={`site-icon-frame ${item.variant === "accent" ? "site-icon-frame--accent" : ""}`}>
                  <Icon name={item.icon} size="md" tone="frost" />
                </span>
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
