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
          <div className="page-shell space-y-5">
            <Reveal>
              <p className="section-kicker">{notFoundContent.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-title display-title--hero">{renderLines(notFoundContent.title)}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead-copy max-w-[42rem]">{notFoundContent.lead}</p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <Button href={route("/")}>На главную</Button>
              <Button href={route("/blog/")} variant="secondary">
                В журнал
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
