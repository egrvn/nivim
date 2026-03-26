import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { supportContent } from "../content/site";
import { asset, route } from "../lib/paths";
import { renderLines } from "../lib/text";

export function SupportPage() {
  return (
    <PageShell pageKey="support">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell grid gap-8 xl:grid-cols-[0.95fr,1.05fr] xl:items-center">
            <div className="space-y-5">
              <Reveal>
                <p className="section-kicker">{supportContent.hero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-title display-title--hero">{renderLines(supportContent.hero.title)}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-copy max-w-[44rem]">{supportContent.hero.lead}</p>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="card-surface overflow-hidden p-4 sm:p-6">
                <img alt="Поддержка NIVIM" className="aspect-[16/10] w-full rounded-[24px] object-cover" src={asset(supportContent.hero.image)} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">Быстрый старт</p>
              <h2 className="display-title display-title--section">Маршрут, который не заставляет разбираться лишний раз</h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {supportContent.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <article className="card-surface h-full p-6">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-sm font-semibold text-white">
                      0{index + 1}
                    </div>
                    <h3 className="card-title">{step.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{step.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">Типичные вопросы</p>
              <h2 className="display-title display-title--section">Что проверить до обращения в поддержку</h2>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {supportContent.issues.map((issue, index) => (
                <Reveal key={issue.title} delay={index * 0.05}>
                  <article className="card-surface h-full p-6">
                    <h3 className="card-title">{issue.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{issue.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-4 lg:grid-cols-3">
            {supportContent.contacts.map((contact, index) => (
              <Reveal key={contact.label} delay={index * 0.05}>
                <article className="card-surface h-full p-6">
                  <p className="section-kicker">{contact.label}</p>
                  {"href" in contact && contact.href ? (
                    <a className="mt-3 block text-xl font-semibold text-white" href={contact.href} rel="noreferrer" target="_blank">
                      {contact.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-xl font-semibold text-white">{contact.value}</p>
                  )}
                  <p className="body-copy body-copy--small mt-3">{contact.note}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Button href="https://t.me/nivim_support_bot">Написать в Telegram</Button>
            <Button href={route("/privacy-policy/")} variant="secondary">
              Документы и политика
            </Button>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
