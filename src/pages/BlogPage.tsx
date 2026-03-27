import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { blogContent } from "../content/site";
import { asset } from "../lib/paths";

function BlogHero() {
  return (
    <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto grid max-w-[1220px] gap-8 rounded-[2.6rem] px-6 py-12 lg:grid-cols-2 lg:items-end sm:px-10">
        <Reveal>
          <SectionHeading eyebrow="Редакция NIVIM" title={blogContent.hero.title} description={blogContent.hero.description} />
        </Reveal>
        <Reveal delay={0.12}>
          <a className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d17]" href={blogContent.featured.href}>
            <div className="relative aspect-[1.14] overflow-hidden">
              <img
                alt={blogContent.featured.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={asset(blogContent.featured.image)}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,19,0.02),rgba(9,10,19,0.54))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(26,62,114,0.24),transparent_30%)]" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/44">Featured</p>
              <h2 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.03em] text-white">{blogContent.featured.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/66">{blogContent.featured.description}</p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function PostsGrid() {
  return (
    <section className="section-spacing px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading eyebrow="Материалы" title="Истории, советы и сценарии использования" />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogContent.posts.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="surface-glass group overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[1.08] overflow-hidden">
                  <img alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={asset(item.image)} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,19,0.06),rgba(9,10,19,0.72))]" />
                </div>
                <div className="p-6">
                  <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.description}</p>
                  <a className="mt-6 inline-flex text-sm font-semibold text-white/82 transition-colors duration-200 hover:text-white" href={item.href}>
                    Читать материал
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPage() {
  return (
    <PageShell page="blog">
      <BlogHero />
      <PostsGrid />
    </PageShell>
  );
}
