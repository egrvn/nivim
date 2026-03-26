import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { blogContent } from "../content/site";
import { asset, homeAnchor } from "../lib/paths";
import { renderLines } from "../lib/text";

export function BlogPage() {
  return (
    <PageShell pageKey="blog">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell">
            <div className="inner-hero inner-hero--blog">
              <img alt="" aria-hidden="true" className="inner-hero__image" src={asset(blogContent.hero.image)} />
              <div className="inner-hero__overlay" />

              <div className="inner-hero__content">
                <Reveal>
                  <p className="section-kicker">{blogContent.hero.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1 className="display-title display-title--hero">{renderLines(blogContent.hero.title)}</h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="lead-copy max-w-[46rem]">{blogContent.hero.lead}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <Reveal>
              <article className="editorial-card editorial-card--featured">
                <img alt={blogContent.featured.title} className="editorial-card__image editorial-card__image--featured" src={asset(blogContent.featured.image)} />
                <div className="space-y-4">
                  <div className="editorial-card__meta">
                    <span>{blogContent.featured.tag}</span>
                    <span>{blogContent.featured.date}</span>
                  </div>
                  <h2 className="display-title text-[2rem] sm:text-[2.6rem]">{blogContent.featured.title}</h2>
                  <p className="body-copy">{blogContent.featured.excerpt}</p>
                  <Button href={homeAnchor("contacts")} variant="secondary">
                    Обсудить продукт
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section-pad section-pad--soft">
          <div className="page-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogContent.posts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.04}>
                <article className="editorial-card h-full">
                  <img alt={post.title} className="editorial-card__image" loading="lazy" src={asset(post.image)} />
                  <div className="space-y-3">
                    <div className="editorial-card__meta">
                      <span>{post.tag}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="body-copy body-copy--small">{post.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-pad pb-0">
          <div className="page-shell">
            <Reveal className="cta-panel">
              <div className="space-y-4">
                <p className="section-kicker">Продолжение истории</p>
                <h2 className="display-title text-3xl sm:text-4xl">Когда хочется не только читать, но и увидеть продукт в контексте</h2>
                <p className="body-copy max-w-[42rem]">
                  Вернитесь к продукту, сравните сценарии и решите, подходит ли NIVIM именно вашему дому, а не абстрактной
                  картинке из магазина.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href={homeAnchor("product")}>Вернуться к продукту</Button>
                <Button href={homeAnchor("contacts")} variant="secondary">
                  Написать нам
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
