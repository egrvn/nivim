import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { Tabs } from "../components/Tabs";
import { privacyContent } from "../content/site";
import { renderLines } from "../lib/text";

export function PrivacyPage() {
  return (
    <PageShell pageKey="privacy">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell space-y-5">
            <Reveal>
              <p className="section-kicker">{privacyContent.hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-title display-title--hero">{renderLines(privacyContent.hero.title)}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead-copy max-w-[50rem]">{privacyContent.hero.lead}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <Reveal>
              <Tabs tabs={privacyContent.tabs} />
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
