import { PageShell } from "../components/PageShell";
import { blogContent } from "../content/site";
import { asset } from "../lib/paths";

function BlogHero() {
  return (
    <section className="inner-page-hero">
      <div className="site-container">
        <div className="inner-page-hero__frame">
          <img alt="" aria-hidden="true" className="inner-page-hero__image" src={asset("figma/inner-hero.png")} />
          <div className="inner-page-hero__overlay" />
          <p className="site-gradient-heading site-gradient-heading--center inner-page-hero__title">{blogContent.hero.title}</p>
          <p className="inner-page-hero__description">{blogContent.hero.description}</p>
        </div>
      </div>
    </section>
  );
}

export function BlogPage() {
  return (
    <PageShell page="blog">
      <BlogHero />

      <section className="inner-wave-section">
        <div className="site-container">
          <div className="inner-wave-section__media">
            <img alt="" aria-hidden="true" src={asset("figma/inner-wave.png")} />
          </div>
        </div>
      </section>

      <section className="inner-page-section">
        <div className="site-container">
          <p className="blog-intro">{blogContent.intro}</p>

          <article className="blog-featured">
            <img alt={blogContent.featured.title} className="blog-featured__image" src={asset(blogContent.featured.image)} />
            <div className="blog-featured__overlay" />
            <div className="blog-featured__content">
              <p className="blog-featured__eyebrow">Материал</p>
              <h2>{blogContent.featured.title}</h2>
              <p>{blogContent.featured.description}</p>
            </div>
          </article>

          <div className="blog-grid">
            {blogContent.posts.map((item) => (
              <article key={item.title} className="blog-card">
                <img alt={item.title} className="blog-card__image" src={asset(item.image)} />
                <div className="blog-card__overlay" />
                <div className="blog-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href}>Читать материал</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
