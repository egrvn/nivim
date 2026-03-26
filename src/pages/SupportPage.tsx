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
          <div className="page-shell">
            <div className="inner-hero inner-hero--support">
              <img alt="" aria-hidden="true" className="inner-hero__image" src={asset(supportContent.hero.image)} />
              <div className="inner-hero__overlay" />

              <div className="inner-hero__content">
                <Reveal>
                  <p className="section-kicker">{supportContent.hero.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="display-title display-title--hero">{renderLines(supportContent.hero.title)}</h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="lead-copy max-w-[48rem]">{supportContent.hero.lead}</p>
                </Reveal>
              </div>
            </div>
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
                  <article className="support-card h-full">
                    <div className="support-card__number">0{index + 1}</div>
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
                  <article className="feature-panel h-full">
                    <h3 className="card-title">{issue.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{issue.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <Reveal className="support-strip">
              <div className="space-y-4">
                <p className="section-kicker">Техническая поддержка</p>
                <h2 className="display-title display-title--section">Если вопрос не закрыли инструкции — подключаемся быстро</h2>
                <p className="body-copy max-w-[44rem]">
                  Без корпоративного лабиринта и формата “заполните тикет и ждите”. Лучше короткий честный разговор, чем долгий
                  процесс ради процесса.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {supportContent.contacts.map((contact, index) => (
                  <Reveal key={contact.label} delay={index * 0.04}>
                    <article className="support-contact">
                      <p className="section-kicker">{contact.label}</p>
                      {"href" in contact && contact.href ? (
                        <a className="support-contact__value" href={contact.href} rel="noreferrer" target="_blank">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="support-contact__value">{contact.value}</p>
                      )}
                      <p className="body-copy body-copy--small mt-3">{contact.note}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href="https://t.me/nivim_support_bot" target="_blank" rel="noreferrer">
                  Написать в Telegram
                </Button>
                <Button href={route("/privacy-policy/")} variant="secondary">
                  Документы и политика
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
