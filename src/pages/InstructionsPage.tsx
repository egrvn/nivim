import { PageShell } from "../components/PageShell";
import { instructionsContent } from "../content/site";

function InstructionsHero() {
  return (
    <section className="inner-page-hero">
      <div className="site-container">
        <div className="inner-page-hero__frame">
          <div className="inner-page-hero__overlay" aria-hidden="true" />
          <p className="site-gradient-heading site-gradient-heading--center inner-page-hero__title">{instructionsContent.hero.title}</p>
          <p className="inner-page-hero__description">{instructionsContent.hero.description}</p>
        </div>
      </div>
    </section>
  );
}

export function InstructionsPage() {
  return (
    <PageShell page="instructions">
      <InstructionsHero />

      <section className="inner-wave-section">
        <div className="site-container">
          <div className="inner-wave-section__media" aria-hidden="true" />
        </div>
      </section>

      <section className="inner-page-section">
        <div className="site-container">
          <div className="instructions-grid">
            {instructionsContent.quickStart.map((item) => (
              <article key={item.number} className="instruction-card">
                <span className="instruction-card__number">{item.number}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="instructions-diagnostics">
            {instructionsContent.diagnostics.map((item) => (
              <article key={item.title} className="instruction-diagnostic">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="instructions-support">
        <div className="site-container">
          <p className="instructions-support__title">{instructionsContent.supportTitle}</p>

          <div className="instructions-support__grid">
            {instructionsContent.contacts.map((contact) => (
              <article key={contact.title} className="instructions-support__card">
                <p className="instructions-support__heading">{contact.title}</p>
                {contact.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a className="site-light-button site-light-button--small" href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {contact.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
