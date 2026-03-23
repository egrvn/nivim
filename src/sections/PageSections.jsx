import { Link } from "react-router-dom";

import { Button } from "../components/Button";
import { MediaFrame } from "../components/MediaFrame";
import { NeonWordmark } from "../components/NeonWordmark";
import { Reveal } from "../components/Reveal";
import { Tabs } from "../components/Tabs";
import { asset } from "../lib/assets";

export function PageHero({ description, image, kicker, title }) {
  return (
    <section className="hero-shell hero-shell--inner">
      <div className="layout-shell">
        <div className="page-hero">
          <div className="page-hero__copy">
            <Reveal>
              <p className="section-kicker">{kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="hero-title gradient-text">{title}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-copy max-w-2xl">{description}</p>
            </Reveal>
          </div>
          <div className="page-hero__visual">
            <NeonWordmark compact />
            {image ? <img alt="" aria-hidden="true" className="page-hero__image" src={asset(image)} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutValues({ image, manifesto, sideImage, values }) {
  return (
    <section className="section-shell">
      <div className="layout-shell space-y-5">
        <div className="grid gap-4 lg:grid-cols-[0.95fr,1.05fr]">
          <Reveal>
            <MediaFrame alt="NIVIM" className="h-full" src={asset(image)} />
          </Reveal>
          <Reveal className="about-card" delay={120}>
            <div className="space-y-4">
              <p className="section-kicker">наша миссия</p>
              <p className="section-copy">{manifesto}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {values.map((value) => (
                <article className="feature-card feature-card--dense" key={value.title}>
                  <h3 className="text-[1.05rem] leading-tight font-normal text-white">{value.title}</h3>
                  <p className="section-copy section-copy--muted">{value.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <MediaFrame alt="NIVIM интерьер" className="h-full" src={asset(sideImage)} />
        </Reveal>
      </div>
    </section>
  );
}

export function SupportResources({ image, resources, supportContacts }) {
  return (
    <section className="section-shell">
      <div className="layout-shell space-y-5">
        <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
          <Reveal>
            <MediaFrame alt="Поддержка NIVIM" className="h-full" src={asset(image)} />
          </Reveal>
          <div className="grid gap-4">
            {resources.map((resource, index) => (
              <Reveal delay={index * 60} key={resource.title}>
                <article className="feature-card feature-card--dense">
                  <div className="space-y-3">
                    <p className="section-kicker">Название</p>
                    <h3 className="text-[1.2rem] leading-tight font-normal text-white">{resource.title}</h3>
                    <p className="section-copy section-copy--muted">{resource.description}</p>
                  </div>
                  <Button variant="secondary">{resource.action}</Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {supportContacts.map((contact, index) => (
            <Reveal className="h-full" delay={index * 70} key={contact.title}>
              <article className="feature-card h-full">
                <p className="section-kicker">{contact.title}</p>
                {contact.href ? (
                  <a className="text-[1.25rem] leading-tight font-normal text-white" href={contact.href} rel="noreferrer" target="_blank">
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-[1.25rem] leading-tight font-normal text-white">{contact.value}</p>
                )}
                <p className="section-copy section-copy--muted">{contact.caption}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogGrid({ posts }) {
  return (
    <section className="section-shell">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">Собрано статически вместо Tilda feed</p>
            <h2 className="section-title">Карточки статей с сохранением визуального ритма страницы</h2>
            <p className="section-copy section-copy--muted">
              В экспорте есть только `feeduid` и конфиг блока без реального HTML карточек, поэтому сетка воссоздана нативно
              и готова к дальнейшей интеграции с реальным CMS или API.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal className="h-full" delay={index * 60} key={post.title}>
              <article className="blog-card h-full">
                <MediaFrame alt={post.title} className="blog-card__media" src={asset(post.image)} />
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-white/60">
                    <span>{post.date}</span>
                    <span>{post.tag}</span>
                  </div>
                  <h3 className="text-[1.4rem] leading-none font-normal text-white">{post.title}</h3>
                  <p className="section-copy section-copy--muted">{post.excerpt}</p>
                </div>
                <div>
                  <Button variant="secondary">Смотреть все статьи</Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalTabsSection({ tabs }) {
  return (
    <section className="section-shell">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">Документы на сайт</p>
            <h2 className="section-title">Тильдовские табы заменены на доступные React tabs</h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Tabs tabs={tabs} />
        </Reveal>
      </div>
    </section>
  );
}

export function NotFoundSection() {
  return (
    <section className="hero-shell hero-shell--inner">
      <div className="layout-shell">
        <div className="page-hero">
          <div className="page-hero__copy space-y-4">
            <p className="section-kicker">404</p>
            <h1 className="hero-title gradient-text">Страница не найдена</h1>
            <p className="section-copy max-w-xl">
              В оригинальном экспорте здесь почти ничего нет. Я не стал повторять пустоту один в один и дал нормальную
              точку возврата на сайт.
            </p>
            <div className="flex gap-3">
              <Button to="/">На главную</Button>
              <Link className="button button--ghost" to="/blog">
                В блог
              </Link>
            </div>
          </div>
          <div className="page-hero__visual">
            <NeonWordmark compact />
          </div>
        </div>
      </div>
    </section>
  );
}
