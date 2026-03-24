import { siteConfig } from "../data/site-data.mjs";

export function createRenderer(basePath = "/") {
  const normalizedBase = normalizeBase(basePath);

  const helpers = {
    basePath: normalizedBase,
    pageUrl,
    assetUrl,
    absoluteUrl,
  };

  return {
    pages: Object.values(siteConfig.pages),
    renderPage,
  };

  function pageUrl(route) {
    if (!route || route === "/") {
      return normalizedBase;
    }

    const cleanRoute = route.replace(/^\//, "");
    return `${normalizedBase}${cleanRoute}`;
  }

  function assetUrl(relativePath) {
    return pageUrl(`/${relativePath.replace(/^\//, "")}`);
  }

  function absoluteUrl(relativePath) {
    const cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
    const strippedBase = normalizedBase === "/" ? "" : normalizedBase.replace(/\/$/, "");
    return `${siteConfig.siteUrl}${strippedBase ? cleanPath.replace(/^\//, "/") : cleanPath}`;
  }

  function renderPage(page) {
    const content = renderMain(page, helpers);
    const heroImage =
      page.hero?.image ||
      siteConfig.pages.home.hero.image;

    return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#0A0B10" />
    <link rel="canonical" href="${absoluteUrl(page.route)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${absoluteUrl(page.route)}" />
    <meta property="og:image" content="${absoluteUrl(`/${heroImage}`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${absoluteUrl(`/${heroImage}`)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="icon" href="${assetUrl("assets/tilda/tild6631-3264-4661-a335-376231633163__frame_13.svg")}" type="image/svg+xml" />
    <link rel="stylesheet" href="${pageUrl("/styles/brand.css")}" />
    <link rel="stylesheet" href="${pageUrl("/styles/components.css")}" />
    <script src="${pageUrl("/scripts/site.js")}" defer></script>
  </head>
  <body class="site-body page-${escapeHtml(page.key)}">
    <div class="site-chrome">
      ${renderHeader(page.route)}
      ${content}
      ${renderFooter()}
      ${renderModal()}
    </div>
  </body>
</html>`;
  }

  function renderHeader(activeRoute) {
    const nav = siteConfig.navigation
      .map((item) => {
        const isActive = activeRoute === item.href;
        return `<a class="site-nav__link${isActive ? " is-active" : ""}" href="${pageUrl(item.href)}">${escapeHtml(item.label)}</a>`;
      })
      .join("");

    const mobileNav = siteConfig.navigation
      .map((item) => `<a class="mobile-panel__link" href="${pageUrl(item.href)}">${escapeHtml(item.label)}</a>`)
      .join("");

    return `<header class="site-header" data-header>
  <div class="shell shell--header">
    <a class="brand-lockup" href="${pageUrl("/")}">
      <span class="brand-lockup__mark">NIVIM</span>
      <span class="brand-lockup__model">${escapeHtml(siteConfig.modelName)}</span>
    </a>
    <nav class="site-nav" aria-label="Основная навигация">
      ${nav}
    </nav>
    <div class="site-header__actions">
      <a class="button button--ghost button--compact" href="${pageUrl("/privacy-policy/")}">Документы</a>
      <button class="button button--primary button--compact" type="button" data-modal-open>Увидеть вживую</button>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-panel">
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
  <div class="mobile-panel" id="mobile-panel" data-mobile-panel hidden>
    <div class="mobile-panel__inner">
      <div class="mobile-panel__head">
        <span class="brand-lockup__mark">NIVIM</span>
        <button class="menu-close" type="button" data-menu-close aria-label="Закрыть меню">Закрыть</button>
      </div>
      <nav class="mobile-panel__nav" aria-label="Мобильная навигация">
        ${mobileNav}
      </nav>
      <div class="mobile-panel__footer">
        <a class="meta-link" href="${siteConfig.telegramUrl}" target="_blank" rel="noreferrer">${escapeHtml(siteConfig.telegramHandle)}</a>
        <a class="meta-link" href="mailto:${siteConfig.email}">${escapeHtml(siteConfig.email)}</a>
      </div>
    </div>
  </div>
</header>`;
  }

  function renderFooter() {
    const nav = siteConfig.navigation
      .map((item) => `<a class="footer-nav__link" href="${pageUrl(item.href)}">${escapeHtml(item.label)}</a>`)
      .join("");

    return `<footer class="site-footer">
  <div class="shell shell--footer">
    <div class="footer-hero">
      <p class="eyebrow">NIVIM</p>
      <h2 class="display-title display-title--footer">Премиальный просмотр начинается с ясного опыта</h2>
      <p class="body-text body-text--wide">
        Спокойный интерфейс, честные характеристики и поддержка по делу. NIVIM закрывает сайт чисто и уверенно, без лишней графической перегрузки.
      </p>
      <button class="button button--primary" type="button" data-modal-open>Оставить контакт</button>
    </div>
    <div class="footer-grid">
      <div>
        <p class="footer-caption">Контакты</p>
        <a class="footer-link" href="mailto:${siteConfig.email}">${escapeHtml(siteConfig.email)}</a>
        <a class="footer-link" href="${siteConfig.telegramUrl}" target="_blank" rel="noreferrer">${escapeHtml(siteConfig.telegramHandle)}</a>
        <p class="footer-meta">${escapeHtml(siteConfig.supportHours)}</p>
      </div>
      <div>
        <p class="footer-caption">Навигация</p>
        <nav class="footer-nav" aria-label="Футерная навигация">
          ${nav}
        </nav>
      </div>
      <div>
        <p class="footer-caption">Модель</p>
        <p class="footer-meta">${escapeHtml(siteConfig.modelName)}</p>
        <p class="footer-meta">Full HD, Android 12, 1000 ANSI</p>
        <p class="footer-meta">© 2026 NIVIM. Все права защищены.</p>
      </div>
    </div>
  </div>
</footer>`;
  }

  function renderModal() {
    const contactMethods = [
      { value: "phone", label: "Телефон" },
      { value: "telegram", label: "Telegram" },
      { value: "whatsapp", label: "WhatsApp" },
      { value: "max", label: "Max" },
    ]
      .map(
        (item, index) => `<label class="choice-pill">
  <input type="radio" name="contactMethod" value="${item.value}" ${index === 0 ? "checked" : ""} />
  <span>${escapeHtml(item.label)}</span>
</label>`,
      )
      .join("");

    return `<div class="modal" data-modal hidden>
  <div class="modal__backdrop" data-modal-close></div>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
    <button class="modal__close" type="button" data-modal-close aria-label="Закрыть форму">×</button>
    <p class="eyebrow">Запросить демонстрацию</p>
    <h2 class="display-title display-title--modal" id="lead-modal-title">Покажем NIVIM в понятном формате</h2>
    <p class="body-text body-text--wide">
      Оставьте удобный способ связи. Мы подготовим письмо с вашим запросом и поможем быстро перейти к диалогу.
    </p>
    <form class="lead-form" data-lead-form>
      <label class="field">
        <span class="field__label">Как к вам обращаться</span>
        <input class="field__input" type="text" name="name" placeholder="Имя" required />
      </label>
      <fieldset class="field field--choices">
        <legend class="field__label">Удобный способ связи</legend>
        <div class="choice-grid">
          ${contactMethods}
        </div>
      </fieldset>
      <label class="field">
        <span class="field__label">Контакт</span>
        <input class="field__input" type="text" name="contactValue" placeholder="+7 900 000-00-00 или @username" required />
      </label>
      <label class="consent">
        <input type="checkbox" name="consent" required />
        <span>
          Я ознакомлен(а) с <a href="${pageUrl("/privacy-policy/")}">политикой конфиденциальности</a> и согласен(на) на обработку данных для обратной связи.
        </span>
      </label>
      <div class="lead-form__actions">
        <button class="button button--primary" type="submit">Подготовить письмо</button>
        <a class="button button--ghost" href="${siteConfig.telegramUrl}" target="_blank" rel="noreferrer">Написать в Telegram</a>
      </div>
      <p class="form-note" data-form-status aria-live="polite"></p>
    </form>
  </div>
</div>`;
  }

  function renderMain(page) {
    switch (page.key) {
      case "home":
        return renderHome(page);
      case "about":
        return renderAbout(page);
      case "support":
        return renderSupport(page);
      case "blog":
        return renderBlog(page);
      case "privacy":
        return renderPrivacy(page);
      case "notFound":
        return renderNotFound(page);
      default:
        return `<main class="site-main"><section class="section"><div class="shell"><p>Страница не найдена.</p></div></section></main>`;
    }
  }

  function renderHome(page) {
    const scenarios = page.scenarios.cards
      .map(
        (card) => `<article class="media-card reveal">
  <div class="media-card__image-wrap">
    <img class="media-card__image" src="${assetUrl(card.image)}" alt="${escapeHtml(card.title)}" loading="lazy" />
  </div>
  <div class="media-card__content">
    <h3 class="card-title">${escapeHtml(card.title)}</h3>
    <p class="body-text">${escapeHtml(card.text)}</p>
  </div>
</article>`,
      )
      .join("");

    const benefits = page.benefits.cards
      .map(
        (item) => `<article class="value-card reveal">
  <p class="value-card__marker">NIVIM</p>
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    const steps = page.steps.items
      .map(
        (item) => `<article class="step-card reveal">
  <span class="step-card__number">${escapeHtml(item.number)}</span>
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    const specsTable = page.specs.rows
      .map(
        ([label, value]) => `<div class="spec-row">
  <dt>${escapeHtml(label)}</dt>
  <dd>${escapeHtml(value)}</dd>
</div>`,
      )
      .join("");

    const highlightList = page.specs.highlights
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const testimonials = siteConfig.socialProof
      .map(
        (item) => `<article class="quote-card reveal">
  <div class="quote-card__person">
    <img class="quote-card__avatar" src="${assetUrl(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" />
    <div>
      <h3 class="card-title">${escapeHtml(item.name)}</h3>
      <p class="meta-text">${escapeHtml(item.role)}</p>
    </div>
  </div>
  <p class="body-text">“${escapeHtml(item.quote)}”</p>
</article>`,
      )
      .join("");

    const faq = siteConfig.faq
      .map(
        (item, index) => `<article class="faq-item reveal" data-accordion-item ${index === 0 ? 'data-open="true"' : ""}>
  <button class="faq-item__button" type="button" data-accordion-trigger aria-expanded="${index === 0 ? "true" : "false"}">
    <span>${escapeHtml(item.question)}</span>
    <span class="faq-item__icon" aria-hidden="true"></span>
  </button>
  <div class="faq-item__content" data-accordion-content ${index === 0 ? "" : "hidden"}>
    <p class="body-text">${escapeHtml(item.answer)}</p>
  </div>
</article>`,
      )
      .join("");

    return `<main class="site-main">
  <section class="hero-section">
    <div class="shell hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
        <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
        <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
        <p class="body-text body-text--wide">${escapeHtml(page.hero.body)}</p>
        <div class="button-row">
          <button class="button button--primary" type="button" data-modal-open>${escapeHtml(page.hero.primaryCta)}</button>
          <a class="button button--ghost" href="#specs">${escapeHtml(page.hero.secondaryCta)}</a>
        </div>
        <dl class="metric-grid">
          ${page.hero.metrics
            .map(
              (metric) => `<div class="metric-card">
            <dt>${escapeHtml(metric.label)}</dt>
            <dd>${escapeHtml(metric.value)}</dd>
          </div>`,
            )
            .join("")}
        </dl>
      </div>
      <div class="hero-visual reveal">
        <div class="product-stage">
          <span class="product-stage__wordmark" aria-hidden="true">NIVIM</span>
          <div class="product-stage__halo"></div>
          <img class="product-stage__device" src="${assetUrl(page.hero.image)}" alt="Проектор NIVIM VIDEL R1" />
          <div class="price-card">
            <p class="price-card__label">Цена</p>
            <p class="price-card__value">${escapeHtml(siteConfig.price)}</p>
            <p class="price-card__meta">Full HD, Android 12, честная яркость</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--deep" id="scenarios">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Сценарии</p>
        <h2 class="display-title display-title--section">${escapeHtml(page.scenarios.title)}</h2>
        <p class="body-text body-text--wide">${escapeHtml(page.scenarios.intro)}</p>
      </div>
      <div class="media-grid">
        ${scenarios}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Образ жизни</p>
        <h2 class="display-title display-title--section">${escapeHtml(page.benefits.title)}</h2>
        <p class="body-text body-text--wide">${escapeHtml(page.benefits.intro)}</p>
      </div>
      <div class="value-grid">
        ${benefits}
      </div>
    </div>
  </section>

  <section class="section section--accent">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Простой старт</p>
        <h2 class="display-title display-title--section">${escapeHtml(page.steps.title)}</h2>
        <p class="body-text body-text--wide">${escapeHtml(page.steps.intro)}</p>
      </div>
      <div class="step-grid">
        ${steps}
      </div>
    </div>
  </section>

  <section class="section section--deep" id="specs">
    <div class="shell spec-layout">
      <div class="spec-copy reveal">
        <p class="eyebrow">Характеристики</p>
        <h2 class="display-title display-title--section">${escapeHtml(page.specs.title)}</h2>
        <p class="body-text body-text--wide">${escapeHtml(page.specs.intro)}</p>
        <p class="lead-text">${escapeHtml(page.specs.note)}</p>
        <ul class="bullet-list">
          ${highlightList}
        </ul>
      </div>
      <div class="spec-panel reveal">
        <div class="spec-panel__visual">
          <img src="${assetUrl(page.specs.image)}" alt="Деталь проектора NIVIM VIDEL R1" loading="lazy" />
        </div>
        <div class="spec-panel__price">
          <span class="spec-panel__price-label">Цена</span>
          <strong>${escapeHtml(siteConfig.price)}</strong>
        </div>
        <dl class="spec-table">
          ${specsTable}
        </dl>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Социальное доказательство</p>
        <h2 class="display-title display-title--section">Отзывы владельцев</h2>
        <p class="body-text body-text--wide">Каждый по-своему, но все про одно: устройство работает уверенно, быстро становится частью дома и оправдывает цену реальным опытом.</p>
      </div>
      <div class="quote-grid">
        ${testimonials}
      </div>
    </div>
  </section>

  <section class="section section--deep" id="faq">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Вопросы</p>
        <h2 class="display-title display-title--section">Частые вопросы</h2>
        <p class="body-text body-text--wide">Собрали ответы на вопросы, которые чаще всего возникают перед покупкой и в первые дни использования.</p>
      </div>
      <div class="faq-list">
        ${faq}
      </div>
    </div>
  </section>

  <section class="section section--cta" id="pokupka">
    <div class="shell">
      <div class="cta-panel reveal">
        <div class="cta-panel__copy">
          <p class="eyebrow">Демонстрация и консультация</p>
          <h2 class="display-title display-title--section">${escapeHtml(page.cta.title)}</h2>
          <p class="body-text body-text--wide">${escapeHtml(page.cta.body)}</p>
        </div>
        <div class="cta-panel__actions">
          <button class="button button--primary" type="button" data-modal-open>Оставить контакт</button>
          <a class="button button--ghost" href="${siteConfig.telegramUrl}" target="_blank" rel="noreferrer">Написать в Telegram</a>
        </div>
      </div>
    </div>
  </section>
</main>`;
  }

  function renderAbout(page) {
    const values = page.mission.values
      .map(
        (item) => `<article class="value-card reveal">
  <p class="value-card__marker">Ценность</p>
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    const principles = page.principles
      .map(
        (item) => `<article class="principle-card reveal">
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    return `<main class="site-main">
  <section class="hero-section hero-section--inner">
    <div class="shell inner-hero reveal">
      <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
      <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
      <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
    </div>
  </section>

  <section class="section section--deep">
    <div class="shell manifesto-grid">
      <div class="manifesto-copy reveal">
        <p class="eyebrow">Миссия</p>
        <h2 class="display-title display-title--section">${escapeHtml(page.mission.title)}</h2>
      </div>
      <div class="manifesto-body reveal">
        ${page.mission.paragraphs.map((paragraph) => `<p class="body-text body-text--wide">${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </div>
    <div class="shell value-grid value-grid--tight">
      ${values}
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Принципы бренда</p>
        <h2 class="display-title display-title--section">Как мы думаем о продукте</h2>
        <p class="body-text body-text--wide">Продукт, визуальный язык и коммуникация NIVIM строятся на одних и тех же принципах: ясность, сдержанность и уважение к реальному опыту пользователя.</p>
      </div>
      <div class="principle-grid">
        ${principles}
      </div>
    </div>
  </section>

  <section class="section section--cta">
    <div class="shell">
      <div class="cta-panel reveal">
        <div class="cta-panel__copy">
          <p class="eyebrow">NIVIM</p>
          <h2 class="display-title display-title--section">Если нужен проектор без фальши, начнем с честного разговора</h2>
          <p class="body-text body-text--wide">Покажем устройство, объясним сценарии и поможем выбрать удобный формат знакомства с NIVIM.</p>
        </div>
        <div class="cta-panel__actions">
          <button class="button button--primary" type="button" data-modal-open>Запросить демонстрацию</button>
          <a class="button button--ghost" href="${pageUrl("/podderjka/")}">Перейти в поддержку</a>
        </div>
      </div>
    </div>
  </section>
</main>`;
  }

  function renderSupport(page) {
    const steps = page.steps
      .map(
        (item, index) => `<article class="step-card reveal">
  <span class="step-card__number">0${index + 1}</span>
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    const issues = page.issues
      .map(
        (item) => `<article class="issue-card reveal">
  <h3 class="card-title">${escapeHtml(item.title)}</h3>
  <p class="body-text">${escapeHtml(item.text)}</p>
</article>`,
      )
      .join("");

    return `<main class="site-main">
  <section class="hero-section hero-section--support">
    <div class="shell support-hero">
      <div class="support-hero__copy reveal">
        <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
        <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
        <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
      </div>
      <div class="support-hero__visual reveal">
        <div class="floating-device">
          <img src="${assetUrl(page.hero.image)}" alt="Деталь проектора NIVIM" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <section class="section section--deep">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Быстрый старт</p>
        <h2 class="display-title display-title--section">Сначала самое важное</h2>
        <p class="body-text body-text--wide">Собрали ключевые шаги и контакты так, чтобы нужный ответ можно было найти быстро и без лишнего напряжения.</p>
      </div>
      <div class="step-grid">
        ${steps}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Диагностика</p>
        <h2 class="display-title display-title--section">Что проверить в первую очередь</h2>
      </div>
      <div class="principle-grid">
        ${issues}
      </div>
    </div>
  </section>

  <section class="section section--accent">
    <div class="shell contact-layout">
      <div class="contact-card reveal">
        <p class="eyebrow">Email</p>
        <a class="contact-card__link" href="mailto:${siteConfig.email}">${escapeHtml(siteConfig.email)}</a>
        <p class="body-text">Для подробных вопросов, диагностики, гарантийных обращений и спокойной письменной коммуникации.</p>
      </div>
      <div class="contact-card reveal">
        <p class="eyebrow">Telegram</p>
        <a class="contact-card__link" href="${siteConfig.telegramUrl}" target="_blank" rel="noreferrer">${escapeHtml(siteConfig.telegramHandle)}</a>
        <p class="body-text">Для быстрых уточнений, оперативной поддержки и первичного маршрута диагностики.</p>
      </div>
      <div class="contact-card reveal">
        <p class="eyebrow">График</p>
        <p class="contact-card__link contact-card__link--static">${escapeHtml(siteConfig.supportHours)}</p>
        <p class="body-text">Если вопрос пришел вне рабочего окна, мы вернемся с ответом в ближайший доступный слот.</p>
      </div>
    </div>
  </section>
</main>`;
  }

  function renderBlog(page) {
    const posts = page.posts
      .map(
        (post, index) => `<article class="post-card reveal${index > 2 ? " is-hidden" : ""}" ${index > 2 ? 'data-feed-hidden="true"' : ""}>
  <img class="post-card__image" src="${assetUrl(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />
  <div class="post-card__meta">
    <span>${escapeHtml(post.tag)}</span>
    <span>${escapeHtml(post.date)}</span>
  </div>
  <h2 class="card-title">${escapeHtml(post.title)}</h2>
  <p class="body-text">${escapeHtml(post.excerpt)}</p>
</article>`,
      )
      .join("");

    return `<main class="site-main">
  <section class="hero-section hero-section--inner">
    <div class="shell inner-hero reveal">
      <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
      <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
      <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
    </div>
  </section>

  <section class="section section--deep">
    <div class="shell">
      <div class="section-intro reveal">
        <p class="eyebrow">Материалы</p>
        <h2 class="display-title display-title--section">Лента знаний о домашнем просмотре</h2>
        <p class="body-text body-text--wide">Материалы помогают быстрее понять сценарии использования, нюансы изображения и культуру домашнего просмотра.</p>
      </div>
      <div class="post-grid" data-feed-list>
        ${posts}
      </div>
      <div class="feed-actions">
        <button class="button button--ghost" type="button" data-feed-more>Показать ещё</button>
      </div>
    </div>
  </section>
</main>`;
  }

  function renderPrivacy(page) {
    const tabs = page.tabs
      .map(
        (tab, index) => `<button class="tab-button${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="tab-panel-${tab.id}" id="tab-${tab.id}" data-tab-trigger="${tab.id}">
  ${escapeHtml(tab.label)}
</button>`,
      )
      .join("");

    const panels = page.tabs
      .map(
        (tab, index) => `<section class="tab-panel${index === 0 ? " is-active" : ""}" role="tabpanel" id="tab-panel-${tab.id}" aria-labelledby="tab-${tab.id}" ${index === 0 ? "" : "hidden"} data-tab-panel="${tab.id}">
  ${tab.content}
</section>`,
      )
      .join("");

    return `<main class="site-main">
  <section class="hero-section hero-section--inner">
    <div class="shell inner-hero reveal">
      <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
      <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
      <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
    </div>
  </section>

  <section class="section section--deep">
    <div class="shell legal-shell">
      <div class="tabs" role="tablist" aria-label="Документы NIVIM">
        ${tabs}
      </div>
      <div class="tab-panels reveal">
        ${panels}
      </div>
    </div>
  </section>
</main>`;
  }

  function renderNotFound(page) {
    return `<main class="site-main">
  <section class="hero-section hero-section--inner hero-section--not-found">
    <div class="shell inner-hero reveal">
      <p class="eyebrow">${escapeHtml(page.hero.eyebrow)}</p>
      <h1 class="display-title display-title--hero">${renderMultilineTitle(page.hero.title)}</h1>
      <p class="lead-text">${escapeHtml(page.hero.lead)}</p>
      <div class="button-row">
        <a class="button button--primary" href="${pageUrl("/")}">Вернуться на главную</a>
        <a class="button button--ghost" href="${pageUrl("/podderjka/")}">Открыть поддержку</a>
      </div>
    </div>
  </section>
</main>`;
  }
}

function renderMultilineTitle(value) {
  return value
    .split("\n")
    .map((line) => `<span>${escapeHtml(line)}</span>`)
    .join("");
}

function normalizeBase(value) {
  if (!value || value === "/") {
    return "/";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
