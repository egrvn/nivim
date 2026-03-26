import { Button } from "../components/Button";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { blogContent } from "../content/site";
import { asset } from "../lib/paths";
import { renderLines } from "../lib/text";

export function BlogPage() {
  return (
    <PageShell pageKey="blog">
      <main>
        <section className="hero-section hero-section--inner">
          <div className="page-shell grid gap-8 xl:grid-cols-[0.88fr,1.12fr] xl:items-end">
            <div className="space-y-5">
              <Reveal>
                <p className="section-kicker">{blogContent.hero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-title display-title--hero">{renderLines(blogContent.hero.title)}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-copy max-w-[44rem]">{blogContent.hero.lead}</p>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <article className="editorial-card editorial-card--featured">
                <img alt={blogContent.featured.title} className="editorial-card__image editorial-card__image--featured" src={asset(blogContent.featured.image)} />
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    <span>{blogContent.featured.tag}</span>
                    <span>{blogContent.featured.date}</span>
                  </div>
                  <h2 className="display-title text-[2rem] sm:text-[2.5rem]">{blogContent.featured.title}</h2>
                  <p className="body-copy">{blogContent.featured.excerpt}</p>
                  <Button variant="secondary">Открыть материал</Button>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogContent.posts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.04}>
                <article className="editorial-card h-full">
                  <img alt={post.title} className="editorial-card__image" loading="lazy" src={asset(post.image)} />
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
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
      </main>
    </PageShell>
  );
}
