import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { notFoundContent } from "../content/site";
import { route } from "../lib/paths";
import { renderLines } from "../lib/text";

export function NotFoundPage() {
  return (
    <PageShell pageKey="notFound">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell">
            <Reveal className="mission-panel max-w-[48rem]">
              <p className="section-kicker">{notFoundContent.eyebrow}</p>
              <h1 className="display-title display-title--hero">{renderLines(notFoundContent.title)}</h1>
              <p className="lead-copy mt-5">{notFoundContent.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={route("/")}>На главную</Button>
                <Button href={route("/blog/")} variant="secondary">
                  В журнал
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
