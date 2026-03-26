import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { aboutContent } from "../content/site";
import { homeAnchor } from "../lib/paths";
import { renderLines } from "../lib/text";

export function AboutPage() {
  return (
    <PageShell pageKey="about">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell grid gap-8 xl:grid-cols-[1fr,0.8fr] xl:items-end">
            <div className="space-y-5">
              <Reveal>
                <p className="section-kicker">{aboutContent.hero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-title display-title--hero">{renderLines(aboutContent.hero.title)}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-copy max-w-[44rem]">{aboutContent.hero.lead}</p>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="card-surface h-full p-6 sm:p-8">
                <p className="section-kicker">NIVIM</p>
                <p className="body-copy">
                  Мы делаем проекторы для людей, которым нужен не культ гаджета, а честный визуальный опыт: спокойный,
                  предсказуемый и по-настоящему встроенный в повседневную жизнь.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
            <Reveal className="card-surface p-6 sm:p-8">
              <p className="section-kicker">{aboutContent.mission.title}</p>
              <h2 className="display-title text-[2rem] sm:text-[2.4rem]">Наша миссия</h2>
              <div className="mt-6 grid gap-4">
                {aboutContent.mission.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="body-copy body-copy--small">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {aboutContent.mission.values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.05}>
                  <article className="card-surface h-full p-6">
                    <p className="section-kicker">Ценность</p>
                    <h3 className="card-title mt-4">{value.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{value.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell grid gap-4 lg:grid-cols-2">
            {aboutContent.story.map((block, index) => (
              <Reveal key={block.title} delay={index * 0.07}>
                <article className="card-surface h-full p-6 sm:p-8">
                  <p className="section-kicker">Подход</p>
                  <h2 className="display-title text-[1.75rem] sm:text-[2rem]">{block.title}</h2>
                  <p className="body-copy mt-4">{block.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell space-y-8">
            <Reveal className="section-heading-shell">
              <p className="section-kicker">Принципы бренда</p>
              <h2 className="display-title display-title--section">То, как NIVIM собирает доверие</h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {aboutContent.principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.05}>
                  <article className="card-surface h-full p-6">
                    <h3 className="card-title">{principle.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{principle.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="pt-2">
              <Button href={homeAnchor("product")}>Вернуться к продукту</Button>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
