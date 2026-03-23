import { Link } from "react-router-dom";

import { Accordion } from "../components/Accordion";
import { Button } from "../components/Button";
import { MediaFrame } from "../components/MediaFrame";
import { NeonWordmark } from "../components/NeonWordmark";
import { Reveal } from "../components/Reveal";
import { asset } from "../lib/assets";

export function HomeHeroSection({ hero, onLeadOpen }) {
  return (
    <section className="hero-shell">
      <div className="layout-shell">
        <div className="hero-panel">
          <div className="hero-panel__copy">
            <Reveal>
              <p className="section-kicker">{hero.badge}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="hero-title gradient-text">{hero.title}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-copy max-w-xl">{hero.body}</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="section-copy section-copy--muted max-w-lg">{hero.supporting}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-3">
                <Button href="#umeet" variant="secondary">
                  {hero.cta}
                </Button>
                <Button onClick={onLeadOpen}>Заказать</Button>
              </div>
            </Reveal>
          </div>

          <div className="hero-panel__visual">
            <NeonWordmark className="hero-panel__wordmark" />
            <img alt="VIDEL R1" className="hero-panel__product" src={asset(hero.image)} />
            <img alt="" aria-hidden="true" className="hero-panel__light" src={asset(hero.lightImage)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScenarioSection({ scenarios }) {
  return (
    <section className="section-shell">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">Для тех, кто любит моменты, а не настройки</p>
            <h2 className="section-title">Сценарии, где VIDEL R1 раскрывается без лишней драмы</h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, index) => (
            <Reveal className="h-full" delay={index * 70} key={scenario.title}>
              <article className="feature-card h-full">
                <MediaFrame alt={scenario.title} src={asset(scenario.image)} />
                <div className="space-y-3">
                  <p className="section-kicker">{scenario.title}</p>
                  <h3 className="text-[1.15rem] leading-tight font-normal text-white">{scenario.quote}</h3>
                  <p className="section-copy section-copy--muted">{scenario.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StorySection({ blocks }) {
  return (
    <section className="section-shell section-shell--tight">
      <div className="layout-shell grid gap-5 lg:grid-cols-3">
        {blocks.map((block, index) => (
          <Reveal className="h-full" delay={index * 80} key={block.title}>
            <article className="story-card h-full">
              <MediaFrame alt={block.heading} className="story-card__media" src={asset(block.image)} />
              <div className="space-y-3">
                <p className="section-kicker">{block.title}</p>
                <h3 className="text-[1.35rem] leading-tight font-normal text-white">{block.heading}</h3>
                <p className="section-copy section-copy--muted">{block.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SetupSection({ steps }) {
  return (
    <section className="section-shell" id="umeet">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">Просто включи и все готово</p>
            <h2 className="section-title">Tilda-шные step-блоки пересобраны в нормальную систему</h2>
            <p className="section-copy max-w-2xl">
              Автофокус, беспроводное подключение и Android 12 теперь живут в чистых React-компонентах, а не в абсолютных
              t396-артбордах.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal className="h-full" delay={index * 90} key={step.number}>
              <article className="step-card h-full">
                <img alt="" aria-hidden="true" className="h-12 w-12" src={asset(step.icon)} />
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="step-card__number">{step.number}</span>
                    <span className="step-card__action">{step.action}</span>
                  </div>
                  <h3 className="text-[1.2rem] leading-tight font-normal text-white">{step.title}</h3>
                  <p className="section-copy section-copy--muted">{step.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureSection({ features }) {
  return (
    <section className="section-shell section-shell--accent">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">технология, которая не мешает</p>
            <h2 className="section-title">Чистые фичи без тильдовского сахара</h2>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal className="h-full" delay={index * 70} key={feature.title}>
              <article className="feature-card h-full">
                <img alt="" aria-hidden="true" className="h-12 w-12" src={asset(feature.icon)} />
                <div className="space-y-3">
                  <h3 className="text-[1.15rem] leading-tight font-normal text-white">{feature.title}</h3>
                  <p className="section-copy section-copy--muted">{feature.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductSection({ product, onLeadOpen }) {
  return (
    <section className="section-shell" id="pokupka">
      <div className="layout-shell">
        <div className="product-panel">
          <Reveal className="space-y-5">
            <div className="space-y-3">
              <p className="section-kicker">{product.title}</p>
              <h2 className="section-title">{product.subtitle}</h2>
              <p className="product-panel__price">{product.price}</p>
              <p className="section-copy section-copy--muted max-w-xl">{product.description}</p>
            </div>

            <ul className="product-panel__specs">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button onClick={onLeadOpen}>Хочу увидеть в деле</Button>
              <Link className="button button--ghost" to="/podderjka">
                Поддержка
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative" delay={120}>
            <MediaFrame alt="VIDEL R1" className="product-panel__media" src={asset(product.image)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ReviewSection({ blogStrip, reviews }) {
  return (
    <section className="section-shell section-shell--tight">
      <div className="layout-shell space-y-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">Что говорят те, кто уже попробовал</p>
            <h2 className="section-title">Отзывы без мыла и псевдо-рейтинг-плагинов</h2>
            <p className="section-copy section-copy--muted">{blogStrip.body}</p>
          </div>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal className="h-full" delay={index * 70} key={review.author}>
              <article className="review-card h-full">
                <h3 className="text-[1.1rem] leading-tight font-normal text-white">{review.title}</h3>
                <p className="section-copy section-copy--muted">{review.body}</p>
                <p className="section-kicker text-[var(--color-accent)]">{review.author}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faq }) {
  return (
    <section className="section-shell">
      <div className="layout-shell grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <Reveal className="space-y-4">
          <p className="section-kicker">Отвечаем так, как объяснили бы друзьям</p>
          <h2 className="section-title">Частые вопросы</h2>
          <p className="section-copy section-copy--muted">
            Все основные механики Tilda FAQ заменены на нормальный semantic accordion с сохранением структуры, hover-state и
            плотности блока.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Accordion items={faq} />
        </Reveal>
      </div>
    </section>
  );
}
