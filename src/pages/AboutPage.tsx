import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { aboutContent, siteMeta } from "../content/site";
import { asset, homeAnchor } from "../lib/paths";
import { renderLines } from "../lib/text";

export function AboutPage() {
  return (
    <PageShell pageKey="about">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell">
            <div className="inner-hero">
              <img alt="" aria-hidden="true" className="inner-hero__image" src={asset(aboutContent.hero.image)} />
              <div className="inner-hero__overlay" />
              <div className="inner-hero__wordmark">NIVIM</div>

              <div className="inner-hero__content">
                <Reveal>
                  <p className="section-kicker">{aboutContent.hero.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="display-title display-title--hero">{renderLines(aboutContent.hero.title)}</h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="lead-copy max-w-[48rem]">{aboutContent.hero.lead}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
            <Reveal className="mission-panel">
              <p className="section-kicker">{aboutContent.mission.title}</p>
              <h2 className="display-title display-title--section">Мы строим тихий премиум</h2>
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
                  <article className="feature-panel h-full">
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
              <Reveal key={block.title} delay={index * 0.06}>
                <article className="story-card h-full">
                  <p className="section-kicker">Подход</p>
                  <h2 className="display-title text-[1.8rem] sm:text-[2.2rem]">{block.title}</h2>
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
              <p className="body-copy max-w-[48rem]">
                Нам важен не образ “технологичного бренда”, а ощущение от взаимодействия: с экраном, с пространством, с
                поддержкой и с каждым следующим вечером дома.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {aboutContent.principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.05}>
                  <article className="feature-panel h-full">
                    <h3 className="card-title">{principle.title}</h3>
                    <p className="body-copy body-copy--small mt-3">{principle.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="about-strip">
              <div className="space-y-3">
                <p className="section-kicker">Контакт</p>
                <h3 className="card-title text-[1.35rem] sm:text-[1.55rem]">Если хотите обсудить продукт или бренд — пишите напрямую</h3>
                <p className="body-copy body-copy--small">
                  {siteMeta.email} · {siteMeta.telegramHandle}
                </p>
              </div>
              <Button href={homeAnchor("product")}>Вернуться к продукту</Button>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
