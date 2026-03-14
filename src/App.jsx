import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  articles,
  brand,
  deliveryOptions,
  documentsList,
  faqItems,
  instructions,
  paymentMethods,
  principles,
  products,
  reviews,
} from "./data/site-data";
import { useStore } from "./store/store-context";
import { HeroWordmarkScene } from "./components/HeroWordmarkScene";
import { withBasePath } from "./utils/asset-path";

const NAV_ITEMS = [
  { to: "/", label: "Главная", end: true },
  { to: "/catalog", label: "Каталог" },
  { to: "/about", label: "О бренде" },
  { to: "/blog", label: "Блог" },
  { to: "/documents", label: "Документы" },
  { to: "/instructions", label: "Инструкции" },
  { to: "/contacts", label: "Контакты" },
];

const LEGAL_COPY = {
  privacy: {
    title: "Политика конфиденциальности",
    sections: [
      "NIVIM обрабатывает персональные данные только для связи, оформления заказа, доставки и сервисного сопровождения.",
      "Покупатель предоставляет имя, телефон, email, адрес доставки и комментарии по заказу. Данные используются только в объеме, необходимом для исполнения заказа.",
      "По запросу клиента данные могут быть уточнены, обновлены или удалены в пределах требований законодательства.",
    ],
  },
  offer: {
    title: "Публичная оферта",
    sections: [
      "Размещенный на сайте товар и его цена являются предложением оформить дистанционную покупку на указанных условиях.",
      "Оплата, подтверждение заказа, сроки доставки и возвраты регулируются условиями, опубликованными на этой странице.",
      "Продавец вправе уточнить состав комплекта, способ доставки и финальную доступность до подтверждения заказа оператором.",
    ],
  },
  terms: {
    title: "Пользовательское соглашение",
    sections: [
      "Сайт NIVIM предоставляет доступ к информации о бренде, товарах, поддержке и заказах.",
      "Пользователь обязуется не нарушать работу сайта, не использовать автоматизированный сбор данных и не размещать вредоносный код.",
      "Визуальные и текстовые материалы NIVIM защищены нормами об интеллектуальной собственности.",
    ],
  },
  warranty: {
    title: "Гарантийные обязательства",
    sections: [
      "Базовая гарантия на VIDEL R1 составляет 12 месяцев с даты покупки.",
      "Гарантийное обслуживание не распространяется на механические повреждения, следы влаги, несанкционированный ремонт и нарушение правил эксплуатации.",
      "Расширенный пакет NIVIM Care+ дает приоритетную обработку заявок и ускоренную замену при подтвержденном дефекте.",
    ],
  },
  certificate: {
    title: "Сертификат соответствия",
    sections: [
      "На этой странице публикуются данные о сертификации, партии и подтверждении соответствия устройства.",
      "При необходимости здесь можно разместить ссылку на декларацию, PDF-файл или официальный реестр.",
      "Покупатель может использовать страницу для проверки документов перед заказом и после получения устройства.",
    ],
  },
};

const sceneImages = {
  hero: withBasePath("assets/images/placeholder-gray-01.svg"),
  surface: withBasePath("assets/images/placeholder-gray-02.svg"),
  panel: withBasePath("assets/images/placeholder-gray-03.svg"),
};

const PRODUCT_EXPERIENCES = [
  ["Домашний кинотеатр", "Большая диагональ, тихая работа и быстрый запуск без долгой настройки перед просмотром."],
  ["Игры и стриминг", "Android 12, беспроводное подключение и понятный интерфейс для коротких сессий и вечерних запусков."],
  ["Рабочие сценарии", "Презентации, переговорные и мобильные показы, где важны скорость старта и спокойный внешний вид."],
];

const typeLabel = {
  projector: "Проектор",
  accessory: "Аксессуар",
  service: "Сервис",
};

function usePageMeta(title) {
  useEffect(() => {
    document.title = title ? `${title} | NIVIM` : "NIVIM";
  }, [title]);
}

function useScrollAtmosphere() {
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      const root = document.documentElement;
      const currentY = window.scrollY;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentY / maxScroll));
      const energy = Math.min(1, Math.abs(currentY - lastY) / 180);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-shift", `${(currentY * 0.14).toFixed(2)}px`);
      root.style.setProperty("--scroll-energy", energy.toFixed(4));
      lastY = currentY;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
}

function Reveal({ children, className = "", delay = 0, amount = 0.2 }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Wordmark({ className = "" }) {
  return <img className={className} src={withBasePath("assets/images/nivim-wordmark-white.png")} alt="NIVIM" />;
}

function SymbolMark({ className = "" }) {
  return <img className={className} src={withBasePath("assets/images/nivim-symbol-white.png")} alt="" aria-hidden="true" />;
}

function Button({ children, to, href, secondary = false, ghost = false, onClick, type = "button" }) {
  const className = `button${secondary ? " button--secondary" : ""}${ghost ? " button--ghost" : ""}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function Metric({ value, label }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Scene({ children, className = "", image = sceneImages.surface }) {
  return (
    <div className={`scene ${className}`}>
      <img className="scene__image" src={image} alt="" aria-hidden="true" />
      <div className="scene__noise" />
      <div className="scene__beam scene__beam--one" />
      <div className="scene__beam scene__beam--two" />
      <div className="scene__grid" />
      <div className="scene__ring scene__ring--one" />
      <div className="scene__ring scene__ring--two" />
      <div className="scene__flare" />
      {children}
    </div>
  );
}

function Panel({ children, className = "" }) {
  return <div className={`panel ${className}`}>{children}</div>;
}

function Header() {
  const { cartCount } = useStore();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="shell">
        <motion.div
          className="site-header__inner"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link className="brand-link" to="/">
            <Wordmark className="brand-link__wordmark" />
          </Link>

          <button
            className="menu-button"
            type="button"
            aria-label="Открыть меню"
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
          </button>

          <nav className={`site-nav${open ? " site-nav--open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `site-nav__link${isActive ? " is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="cart-chip" to="/cart">
            Корзина
            <span>{cartCount}</span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__panel">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <Wordmark className="site-footer__wordmark" />
              <h2 className="title-lg">Проектор, аксессуары, доставка и поддержка в одном месте.</h2>
              <p className="body-lg">
                Выберите VIDEL R1, добавьте аксессуары, проверьте документы, откройте инструкции и оформите заказ в одном маршруте.
              </p>
            </div>

            <div className="site-footer__support">
              <SymbolMark className="footer-symbol" />
              <div className="site-footer__contact-stack">
                <p className="title-sm">Поддержка</p>
                <p className="body-sm">{brand.hours}</p>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                <a href="/contacts">{brand.phone}</a>
                <a href="https://t.me/nivim_support_bot" target="_blank" rel="noreferrer">
                  {brand.telegram}
                </a>
              </div>
            </div>
          </div>

          <div className="footer-links-grid">
            <div>
              <p className="title-sm">Навигация</p>
              <div className="footer-links">
                <Link to="/">Главная</Link>
                <Link to="/catalog">Каталог</Link>
                <Link to="/about">О бренде</Link>
                <Link to="/blog">Блог</Link>
              </div>
            </div>
            <div>
              <p className="title-sm">Покупка</p>
              <div className="footer-links">
                <Link to="/product/videl-r1">VIDEL R1</Link>
                <Link to="/cart">Корзина</Link>
                <Link to="/documents">Документы</Link>
                <Link to="/instructions">Инструкции</Link>
              </div>
            </div>
            <div>
              <p className="title-sm">Документы</p>
              <div className="footer-links">
                {documentsList.slice(0, 4).map((item) => (
                  <Link key={item.href} to={toRoute(item.href)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <p className="site-footer__meta">
            © {new Date().getFullYear()} NIVIM. Материалы сайта посвящены продукту, покупке и сервисной поддержке.
          </p>
        </div>
      </div>
    </footer>
  );
}

function IntroOverlay() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") return;
    try {
      if (window.sessionStorage.getItem("nivim-intro-seen") === "1") return;
    } catch (error) {
      return;
    }

    setVisible(true);
    const timeout = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("nivim-intro-seen", "1");
    }, 1700);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="intro-overlay__ray intro-overlay__ray--one" />
          <div className="intro-overlay__ray intro-overlay__ray--two" />
          <div className="intro-overlay__ray intro-overlay__ray--three" />
          <motion.div
            className="intro-overlay__symbol"
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <SymbolMark />
          </motion.div>
          <motion.div
            className="intro-overlay__wordmark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Wordmark />
            <p>пространство для восприятия</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SiteLayout() {
  const location = useLocation();
  useScrollAtmosphere();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <ScrollManager />
      <IntroOverlay />
      <div className="ambient-backdrop" aria-hidden="true">
        <div className="ambient-backdrop__column ambient-backdrop__column--one" />
        <div className="ambient-backdrop__column ambient-backdrop__column--two" />
        <div className="ambient-backdrop__column ambient-backdrop__column--three" />
        <div className="ambient-backdrop__halo ambient-backdrop__halo--one" />
        <div className="ambient-backdrop__halo ambient-backdrop__halo--two" />
      </div>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="main-content"
          className="page-shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function HomePage() {
  usePageMeta("Главная");
  const { addToCart, formatPrice } = useStore();
  const heroProduct = products[0];

  return (
    <>
      <section className="section section--hero">
        <div className="shell">
          <Reveal>
            <HeroWordmarkScene>
              <div className="hero-copy">
                <p className="eyebrow">NIVIM / пространство для восприятия</p>
                <h1 className="display">Свет как материал. Техника как часть комнаты.</h1>
                <p className="body-lg hero-wordmark-scene__lede">
                  NIVIM создает технику для визуального опыта: мягкий поток света, строгая геометрия, тишина интерфейса
                  и ощущение цельной сцены в интерьере.
                </p>
                <div className="button-row">
                  <Button to="/catalog">Смотреть каталог</Button>
                  <Button to="/about" secondary>
                    О бренде
                  </Button>
                </div>
              </div>
            </HeroWordmarkScene>
          </Reveal>
        </div>
      </section>

      <section className="section section--manifesto">
        <div className="shell manifesto-layout">
          <Reveal>
            <Panel className="story-panel manifesto-panel">
              <p className="eyebrow">Философия бренда</p>
              <h2 className="title-lg">Мы продаем не просто устройство, а способ организовать визуальное пространство.</h2>
              <p className="body-lg">
                NIVIM строит опыт на сочетании аккуратной техники, глубокой визуальной среды и понятного пользовательского
                сценария: выбрать, подключить, смотреть, возвращаться к этому снова.
              </p>
              <div className="manifesto-panel__marks">
                <span>темная сцена</span>
                <span>мягкий свет</span>
                <span>спокойный интерфейс</span>
              </div>
            </Panel>
          </Reveal>
          <div className="principles-grid principles-grid--manifesto">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={0.08 * (index + 1)}>
                <Panel className="principle-card">
                  <span className="principle-card__index">0{index + 1}</span>
                  <h3 className="title-sm">{item.title}</h3>
                  <p className="body-sm">{item.text}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flagship">
        <div className="shell feature-grid">
          <Reveal className="runway-feature">
            <Scene className="runway-feature__scene" image={sceneImages.surface}>
              <div className="runway-feature__marker">
                <p className="eyebrow">VIDEL R1</p>
                <p className="body-sm">Компактный проектор для дома, игр и рабочих сценариев с быстрым стартом и спокойной подачей.</p>
              </div>
              <div className="runway-feature__line runway-feature__line--one" />
              <div className="runway-feature__line runway-feature__line--two" />
            </Scene>
            <div className="runway-feature__copy">
              <p className="eyebrow">Ключевая модель</p>
              <h2 className="title-lg">VIDEL R1. Большой экран без сложной инсталляции.</h2>
              <p className="body-lg">
                Компактный smart-проектор для фильмов, игр и рабочих сценариев. Быстрый старт, автофокус, Android 12 и
                честная яркость 1000 ANSI в clean-object подаче.
              </p>
              <div className="metric-grid">
                <Metric value={formatPrice(heroProduct.price)} label="цена на старте продаж" />
                <Metric value="до 120 градусов" label="угол проекции" />
                <Metric value="90 000 ч" label="ресурс LED-модуля" />
              </div>
              <div className="runway-feature__rail">
                <div className="support-card support-card--muted">
                  <p className="title-sm">Для дома</p>
                  <p className="body-sm">Большая диагональ, тихая работа и быстрый вечерний запуск без сложной настройки.</p>
                </div>
                <div className="support-card support-card--muted">
                  <p className="title-sm">Для покупки</p>
                  <p className="body-sm">Документы, инструкции, аксессуары и сервисная поддержка собраны рядом с товаром.</p>
                </div>
              </div>
              <div className="button-row">
                <Button to={`/product/${heroProduct.id}`}>Подробнее о VIDEL R1</Button>
                <Button secondary onClick={() => addToCart(heroProduct.id)}>
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--stats">
        <div className="shell scenario-block">
          <Reveal>
            <div className="scenario-block__intro">
              <p className="eyebrow">Сценарии использования</p>
              <h2 className="title-md">Один проектор для дома, игр, презентаций и мобильных показов.</h2>
              <p className="body-sm">
                VIDEL R1 закрывает повседневные задачи без сложной подготовки: от вечернего кино до рабочих встреч и
                демонстраций в дороге.
              </p>
            </div>
          </Reveal>
          <div className="stats-grid scenario-grid">
            {PRODUCT_EXPERIENCES.map(([title, text], index) => (
              <Reveal key={title} delay={0.08 * (index + 1)}>
                <Panel className="stat-card stat-card--scenario">
                  <p className="eyebrow">Сценарий 0{index + 1}</p>
                  <h3 className="title-sm">{title}</h3>
                  <p className="body-sm">{text}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--journal">
        <div className="shell split-grid split-grid--blog">
          <Reveal>
            <Panel className="story-panel">
              <p className="eyebrow">Гайды и блог</p>
              <h2 className="title-lg">Помогаем выбрать, настроить и использовать проектор дома.</h2>
              <p className="body-lg">
                В блоге собраны материалы про домашний кинотеатр, настройку изображения, расстояние до стены и быстрый
                запуск без сложной инсталляции.
              </p>
              <Button to="/blog" secondary>
                Открыть блог
              </Button>
            </Panel>
          </Reveal>
          <div className="article-grid">
            {articles.slice(0, 2).map((article, index) => (
              <Reveal key={article.slug} delay={0.08 * (index + 1)}>
                <ArticleCard article={article} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--faqwrap">
        <div className="shell split-grid split-grid--faq">
          <Reveal>
            <Panel className="story-panel">
              <p className="eyebrow">FAQ</p>
              <h2 className="title-lg">Коротко отвечаем на главные вопросы перед покупкой.</h2>
              <p className="body-lg">
                Если нужен совет по аксессуарам, доставке или настройке, можно перейти в инструкции или сразу написать в поддержку.
              </p>
              <div className="button-row">
                <Button to="/instructions" secondary>
                  Инструкции
                </Button>
                <Button to="/contacts" ghost>
                  Поддержка
                </Button>
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={0.12}>
            <Panel className="faq-panel">
              <FaqList items={faqItems.slice(0, 4)} />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--checkout">
        <div className="shell">
          <Reveal>
            <Panel className="checkout-band">
              <div>
                <p className="eyebrow">Оформление заказа</p>
                <h2 className="title-lg">Соберите комплект и завершите покупку за несколько шагов.</h2>
                <p className="body-lg">
                  Откройте карточку VIDEL R1, добавьте аксессуары, выберите доставку и оплату, примените промокод и
                  отправьте заказ без лишней навигации между страницами.
                </p>
              </div>
              <div className="button-row">
                <Button to="/cart">Перейти к заказу</Button>
                <Button to="/documents" secondary>
                  Документы и гарантия
                </Button>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CatalogPage() {
  usePageMeta("Каталог");
  const { addToCart } = useStore();
  const [filter, setFilter] = useState("all");
  const filtered = products.filter((item) => (filter === "all" ? true : item.type === filter));
  const featured = products[0];
  const featuredGallery = featured.gallery?.length ? featured.gallery : [featured.image];
  const [catalogImageIndex, setCatalogImageIndex] = useState(0);

  useEffect(() => {
    setCatalogImageIndex(0);
  }, [featured.id]);

  const handleCatalogPrev = () => {
    setCatalogImageIndex((current) => (current - 1 + featuredGallery.length) % featuredGallery.length);
  };

  const handleCatalogNext = () => {
    setCatalogImageIndex((current) => (current + 1) % featuredGallery.length);
  };

  return (
    <>
      <section className="section section--catalog-hero">
        <div className="shell">
          <Reveal>
            <Panel className="catalog-hero">
              <div className="catalog-hero__copy">
                <p className="eyebrow">Каталог NIVIM</p>
                <h1 className="title-lg">
                  VIDEL R1, аксессуары и сервис в одном каталоге.
                </h1>
                <p className="body-lg">
                  Каталог собран вокруг одной центральной модели и связанных позиций. Здесь легко собрать комплект,
                  проверить характеристики и пройти путь покупки без рассыпания на отдельные страницы.
                </p>
                <div className="metric-grid metric-grid--compact">
                  <Metric value="1 флагман" label="центральная модель" />
                  <Metric value="3 категории" label="товары и сервис" />
                  <Metric value="доставка и оплата" label="оформление заказа" />
                </div>
              </div>
              <Scene className="catalog-hero__scene" image={sceneImages.panel}>
                <div className="catalog-hero__badge">
                  <SymbolMark />
                </div>
                <div className="catalog-hero__footer-mark">
                  <Wordmark />
                </div>
                <div className="catalog-hero__line" />
                <div className="catalog-hero__tag">Витрина NIVIM</div>
              </Scene>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--catalog-main">
        <div className="shell catalog-stack">
          <Reveal>
            <Panel className="catalog-filter-bar">
              <p className="title-sm">Фильтр</p>
              <div className="tag-row">
                {[
                  ["all", "Все"],
                  ["projector", "Проектор"],
                  ["accessory", "Аксессуары"],
                  ["service", "Сервис"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={`tag-button${filter === value ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="support-card support-card--muted">
                <p className="title-sm">Подсказка</p>
                <p className="body-sm">
                  Сначала откройте VIDEL R1, затем добавьте экран, крепление или сервисный пакет к одному заказу.
                </p>
              </div>
            </Panel>
          </Reveal>

          <div className="catalog-main">
            {(filter === "all" || filter === "projector") && (
              <Reveal>
                <Panel className="catalog-feature">
                  <div className="catalog-feature__copy">
                    <p className="eyebrow">Флагман NIVIM</p>
                    <h2 className="title-lg">{featured.name}. Главный экранный сценарий бренда.</h2>
                    <p className="body-lg">
                      Компактный smart-проектор с быстрым стартом, автонастройкой и большим изображением без сложной
                      инсталляции. Подходит для дома, игр и рабочих сценариев.
                    </p>
                    <div className="metric-grid metric-grid--compact">
                      <Metric value="1000 ANSI" label="честная яркость" />
                      <Metric value="до 120°" label="угол проекции" />
                      <Metric value="Android 12" label="система" />
                    </div>
                    <div className="button-row">
                      <Button to={`/product/${featured.id}`}>Открыть карточку</Button>
                      <Button secondary onClick={() => addToCart(featured.id)}>
                        Добавить в корзину
                      </Button>
                    </div>
                  </div>
                  <Scene className="catalog-feature__scene" image={featuredGallery[catalogImageIndex]}>
                    <div className="catalog-feature__badge">
                      <SymbolMark />
                    </div>
                    <Panel className="catalog-feature__callout">
                      <p className="eyebrow">VIDEL R1</p>
                      <p className="body-sm">К модели можно сразу добавить аксессуары, выбрать доставку и перейти к оформлению заказа.</p>
                    </Panel>
                    <div className="catalog-feature__carousel-controls">
                      <button type="button" className="carousel-button" onClick={handleCatalogPrev} aria-label="Предыдущее изображение">
                        ←
                      </button>
                      <div className="carousel-dots" aria-hidden="true">
                        {featuredGallery.map((item, index) => (
                          <span key={item} className={index === catalogImageIndex ? "is-active" : ""} />
                        ))}
                      </div>
                      <button type="button" className="carousel-button" onClick={handleCatalogNext} aria-label="Следующее изображение">
                        →
                      </button>
                    </div>
                  </Scene>
                </Panel>
              </Reveal>
            )}

            <div className="catalog-grid">
              {filtered.map((product, index) => (
                <Reveal key={product.id} delay={0.04 * (index % 6)}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductPage() {
  const { sku = "videl-r1" } = useParams();
  const product = products.find((item) => item.id === sku) || products[0];
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, formatPrice } = useStore();

  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const activeImage = gallery[activeIndex] || product.image;

  const handlePrevImage = () => {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = () => {
    setActiveIndex((current) => (current + 1) % gallery.length);
  };

  usePageMeta(product.name);

  return (
    <>
      <section className="section section--product-intro">
        <div className="shell">
          <Reveal className="showcase-intro product-showcase-intro">
            <div className="product-showcase-intro__copy">
              <p className="eyebrow">Карточка товара</p>
              <h1 className="title-lg">{product.name}</h1>
              <p className="body-lg">{product.description}</p>
            </div>
            <div className="metric-grid metric-grid--compact">
              <Metric value="1000 ANSI" label="яркость" />
              <Metric value="до 90 000 ч" label="ресурс LED" />
              <Metric value="Wi-Fi 6" label="подключение" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--product-stage">
        <div className="shell product-layout">
          <Reveal className="product-gallery">
            <Scene className="product-stage" image={activeImage}>
              <div className="product-stage__label">VIDEL R1</div>
              <div className="product-stage__thumbs">
                {gallery.map((item, index) => (
                  <button
                    key={item}
                    className={`thumb-button${activeIndex === index ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Выбрать сцену ${product.name}`}
                  >
                    <img src={item} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="product-stage__carousel-controls">
                <button type="button" className="carousel-button" onClick={handlePrevImage} aria-label="Предыдущее изображение">
                  ←
                </button>
                <div className="carousel-dots" aria-hidden="true">
                  {gallery.map((item, index) => (
                    <span key={item} className={index === activeIndex ? "is-active" : ""} />
                  ))}
                </div>
                <button type="button" className="carousel-button" onClick={handleNextImage} aria-label="Следующее изображение">
                  →
                </button>
              </div>
              <Panel className="product-stage__caption">
                <p className="eyebrow">NIVIM / {product.name}</p>
                <p className="body-sm">
                  Компактная подача, чистая геометрия и спокойный акцент на сценариях использования дома, в играх и работе.
                </p>
              </Panel>
            </Scene>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="product-meta">
              <p className="eyebrow">{product.stock}</p>
              <h2 className="title-lg">{product.name}</h2>
              <p className="body-lg">{product.subtitle}</p>
              <div className="price-block">
                <strong>{formatPrice(product.price)}</strong>
                <span>{formatPrice(product.oldPrice || product.price)}</span>
              </div>
              <div className="tag-row">
                {(product.badges || []).map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
              <div className="metric-grid metric-grid--compact">
                <Metric value="1000 ANSI" label="яркость для домашнего просмотра" />
                <Metric value="до 120°" label="угол проекции без монтажа" />
                <Metric value="Android 12" label="приложения внутри системы" />
              </div>
              <div className="support-card support-card--muted">
                <p className="body-sm">
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p className="body-sm">
                  <strong>Рейтинг:</strong> {product.rating} / 5
                </p>
                <p className="body-sm">
                  <strong>Отзывы:</strong> {product.reviews}
                </p>
              </div>
              <div className="button-row">
                <Button onClick={() => addToCart(product.id)}>Добавить в корзину</Button>
                <Button to="/cart" secondary>
                  Перейти к заказу
                </Button>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--product-uses">
        <div className="shell experience-grid">
          {PRODUCT_EXPERIENCES.map(([title, text], index) => (
            <Reveal key={title} delay={0.06 * index}>
              <Panel className="experience-card">
                <p className="eyebrow">сценарий 0{index + 1}</p>
                <h2 className="title-md">{title}</h2>
                <p className="body-sm">{text}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--product-detail">
        <div className="shell split-grid">
          <Reveal>
            <Panel className="story-panel">
              <p className="eyebrow">Описание</p>
              <h2 className="title-md">Почему {product.name} подходит для дома и работы</h2>
              <p className="body-sm">{product.description}</p>
              <ul className="check-list">
                {(product.shortSpecs || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="eyebrow">В комплекте</p>
              <h2 className="title-md">Что получает покупатель</h2>
              <ul className="check-list">
                {(product.included || ["Товар", "Базовая гарантия", "Поддержка NIVIM"]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="support-card support-card--muted">
                <p className="title-sm">После покупки</p>
                <p className="body-sm">После заказа можно открыть инструкции, FAQ, документы и быстро связаться с поддержкой.</p>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--product-specs">
        <div className="shell split-grid">
          <Reveal>
            <Panel className="spec-panel">
              <p className="eyebrow">Спецификация</p>
              <h2 className="title-lg">Параметры и подключение.</h2>
              <div className="spec-table">
                {(product.specs || []).map(([label, value]) => (
                  <div className="spec-row" key={label}>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="reviews-panel">
              <p className="eyebrow">Отзывы</p>
              <div className="reviews-grid">
                {reviews.map((item) => (
                  <div className="review-card" key={item.name}>
                    <div className="review-card__meta">
                      <span>{item.role}</span>
                      <strong>5.0</strong>
                    </div>
                    <h3 className="title-sm">{item.name}</h3>
                    <p className="body-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--product-related">
        <div className="shell">
          <Reveal>
            <Panel className="related-panel">
              <p className="eyebrow">Добавить к заказу</p>
              <div className="catalog-grid">
                {related.map((item) => (
                  <ProductCard compact key={item.id} product={item} />
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CartPage() {
  usePageMeta("Корзина");
  const { detailedCart, subtotal, formatPrice, updateQuantity, removeFromCart, applyPromo, createOrder } = useStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoState, setPromoState] = useState(null);
  const [deliveryId, setDeliveryId] = useState(deliveryOptions[0]?.id || "");
  const [paymentId, setPaymentId] = useState(paymentMethods[0]?.id || "");
  const [order, setOrder] = useState(null);

  const delivery = deliveryOptions.find((item) => item.id === deliveryId) || deliveryOptions[0];
  const discount = promoState?.valid ? promoState.discount : 0;
  const total = Math.max(0, subtotal - discount + (delivery?.price || 0));

  const handlePromo = () => {
    const next = applyPromo(promoCode, subtotal);
    setPromoState(next.valid ? next : { valid: false, discount: 0, title: "Промокод не найден" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!detailedCart.length) return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      city: formData.get("city"),
      address: formData.get("address"),
      deliveryId,
      paymentId,
      promoCode: promoState?.valid ? promoCode : "",
      total,
    };

    setOrder(createOrder(payload));
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="section">
        <div className="shell split-grid">
          <Reveal>
            <div className="page-intro">
              <p className="eyebrow">Корзина и заказ</p>
              <h1 className="title-lg">Покупка без лишних шагов.</h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="body-lg">
                Здесь можно собрать заказ, применить промокод, выбрать доставку и оплату, а затем отправить заявку на покупку.
              </p>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell cart-layout">
          <div className="cart-list">
            {detailedCart.length ? (
              detailedCart.map((item) => (
                <Reveal key={item.productId}>
                  <Panel className="cart-item">
                    <img className="cart-item__media" src={item.product.image} alt={item.product.name} />
                    <div className="cart-item__content">
                      <p className="eyebrow">{typeLabel[item.product.type] || item.product.type}</p>
                      <h2 className="title-md">{item.product.name}</h2>
                      <p className="body-sm">{item.product.subtitle}</p>
                      <div className="cart-item__actions">
                        <label>
                          Количество
                          <input
                            className="field"
                            min="1"
                            type="number"
                            value={item.quantity}
                            onChange={(event) => updateQuantity(item.productId, event.target.value)}
                          />
                        </label>
                        <button className="text-button" type="button" onClick={() => removeFromCart(item.productId)}>
                          Удалить
                        </button>
                      </div>
                    </div>
                    <strong className="cart-item__price">{formatPrice(item.total)}</strong>
                  </Panel>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <Panel className="empty-state">
                  <p className="eyebrow">Пусто</p>
                  <h2 className="title-md">Корзина пока не собрана.</h2>
                  <p className="body-sm">Откройте каталог и добавьте VIDEL R1 или аксессуары к заказу.</p>
                  <Button to="/catalog">Перейти в каталог</Button>
                </Panel>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.08}>
            <Panel className="summary-panel">
              <p className="eyebrow">Итого</p>
              <div className="summary-row">
                <span>Товары</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Скидка</span>
                <strong>{formatPrice(discount)}</strong>
              </div>
              <div className="summary-row">
                <span>Доставка</span>
                <strong>{formatPrice(delivery?.price || 0)}</strong>
              </div>
              <div className="summary-row summary-row--total">
                <span>К оплате</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <div className="summary-promo">
                <input
                  className="field"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Промокод"
                />
                <Button secondary onClick={handlePromo}>
                  Применить
                </Button>
              </div>
              <div className="support-card support-card--muted">
                <p className="body-sm">
                  {promoState?.valid
                    ? `${promoState.title}. Скидка применена.`
                    : "Промокод можно проверить на этой странице. Тестовый код: NIVIM10."}
                </p>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <Panel className="checkout-form-panel">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <p className="eyebrow">Оформление заказа</p>
                <div className="form-grid form-grid--two">
                  <label className="field-label">
                    <span>Имя и фамилия</span>
                    <input className="field" name="name" placeholder="Имя и фамилия…" autoComplete="name" required />
                  </label>
                  <label className="field-label">
                    <span>Телефон</span>
                    <input className="field" name="phone" type="tel" inputMode="tel" placeholder="+7 999 000-00-00…" autoComplete="tel" required />
                  </label>
                </div>
                <div className="form-grid form-grid--two">
                  <label className="field-label">
                    <span>Email</span>
                    <input className="field" type="email" name="email" placeholder="name@example.com…" autoComplete="email" spellCheck={false} required />
                  </label>
                  <label className="field-label">
                    <span>Город</span>
                    <input className="field" name="city" placeholder="Москва…" autoComplete="off" required />
                  </label>
                </div>
                <label className="field-label">
                  <span>Адрес доставки или комментарий</span>
                  <textarea className="field field--area" name="address" placeholder="Улица, дом, квартира, комментарий…" autoComplete="off" required />
                </label>
                <div className="form-grid form-grid--two">
                  <div>
                    <p className="title-sm">Доставка</p>
                    <div className="choice-grid">
                      {deliveryOptions.map((option) => (
                        <label className="choice-card" key={option.id}>
                          <input
                            checked={deliveryId === option.id}
                            name="delivery"
                            type="radio"
                            onChange={() => setDeliveryId(option.id)}
                          />
                          <span>
                            <strong>{option.title}</strong>
                            <small>
                              {option.eta} · {option.price ? formatPrice(option.price) : "Бесплатно"}
                            </small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="title-sm">Оплата</p>
                    <div className="choice-grid">
                      {paymentMethods.map((option) => (
                        <label className="choice-card" key={option.id}>
                          <input
                            checked={paymentId === option.id}
                            name="payment"
                            type="radio"
                            onChange={() => setPaymentId(option.id)}
                          />
                          <span>
                            <strong>{option.title}</strong>
                            <small>{option.text}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <label className="choice-card choice-card--checkbox">
                  <input required name="agree" type="checkbox" />
                  <span>
                    <strong>Подтверждаю согласие</strong>
                    <small>
                      С <Link to="/legal/privacy">политикой конфиденциальности</Link> и{" "}
                      <Link to="/legal/offer">условиями оферты</Link>.
                    </small>
                  </span>
                </label>
                <Button type="submit">Подтвердить заказ</Button>
              </form>
            </Panel>
          </Reveal>

          {order ? (
            <Reveal delay={0.08}>
              <Panel className="success-panel">
                <p className="eyebrow">Заказ создан</p>
                <h2 className="title-md">Номер {order.id}</h2>
                <p className="body-sm">Заявка принята. Менеджер NIVIM свяжется для подтверждения заказа, доставки и оплаты.</p>
              </Panel>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  usePageMeta("О бренде");

  return (
    <>
      <section className="section section--about-hero">
        <div className="shell">
          <Reveal>
            <div className="about-atmosphere">
              <div className="orb-stage orb-stage--background" aria-hidden="true">
                <div className="orb-stage__grain" />
                <div className="orb-stage__glow orb-stage__glow--one" />
                <div className="orb-stage__glow orb-stage__glow--two" />
                <div className="orb-stage__sphere" />
                <div className="orb-stage__ring orb-stage__ring--one" />
                <div className="orb-stage__ring orb-stage__ring--two" />
              </div>
              <div className="about-atmosphere__content">
                <p className="eyebrow">О компании</p>
                <h1 className="title-lg">NIVIM создает технику для большого экрана дома, в офисе и в мобильных сценариях.</h1>
                <p className="body-lg">
                  Фокус бренда сосредоточен на одном флагманском проекторе, понятной покупке, сервисе и спокойной визуальной
                  подаче без избыточного шума.
                </p>
                <div className="principles-grid">
                  {principles.map((item, index) => (
                    <Panel key={item.title} className="principle-card">
                      <span className="principle-card__index">0{index + 1}</span>
                      <h3 className="title-sm">{item.title}</h3>
                      <p className="body-sm">{item.text}</p>
                    </Panel>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell timeline-grid">
          {[
            ["2025", "Запуск бренда", "NIVIM формирует компактную линейку техники для фильмов, игр и рабочих сценариев."],
            ["2026", "VIDEL R1", "Флагманский smart-проектор выходит в каталог NIVIM вместе с аксессуарами и сервисной поддержкой."],
            ["Дальше", "Экосистема", "Следующий этап включает аксессуары, инструкции, сервис и расширение линейки."],
          ].map(([label, title, text], index) => (
            <Reveal key={label} delay={0.08 * index}>
              <Panel className="timeline-card">
                <p className="eyebrow">{label}</p>
                <h2 className="title-md">{title}</h2>
                <p className="body-sm">{text}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  usePageMeta("Блог");
  const categories = useMemo(
    () => ["Все", ...new Set(articles.map((item) => item.category))],
    []
  );
  const [category, setCategory] = useState("Все");

  const filtered = articles.filter((article) => (category === "Все" ? true : article.category === category));

  return (
    <>
      <section className="section">
        <div className="shell split-grid">
          <Reveal>
            <div className="page-intro">
              <p className="eyebrow">Блог NIVIM</p>
              <h1 className="title-lg">Гайды по выбору, установке и использованию проектора.</h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="body-lg">
                Здесь собраны материалы о домашнем кинотеатре, расстоянии до стены, настройке изображения и сценариях использования VIDEL R1.
              </p>
              <div className="tag-row">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`tag-button${category === item ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell article-grid article-grid--wide">
          {filtered.map((article, index) => (
            <Reveal key={article.slug} delay={0.06 * (index % 6)}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug) || articles[0];
  usePageMeta(article.title);

  return (
    <>
      <section className="section">
        <div className="shell">
          <Reveal>
            <Panel className="article-hero">
              <p className="eyebrow">
                {article.category} / {article.time}
              </p>
              <h1 className="title-lg">{article.title}</h1>
              <p className="body-lg">{article.excerpt}</p>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal>
            <Panel className="article-body">
              {article.body.map((block) => (
                <section key={block.heading}>
                  <h2 className="title-md">{block.heading}</h2>
                  {block.paragraphs.map((paragraph) => (
                    <p className="body-sm" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
              <Button to="/blog" secondary>
                Вернуться в блог
              </Button>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function DocumentsPage() {
  usePageMeta("Документы");

  return (
    <>
      <section className="section">
        <div className="shell split-grid">
          <Reveal>
            <div className="page-intro">
              <p className="eyebrow">Документы</p>
              <h1 className="title-lg">Условия покупки, гарантии и обработки данных.</h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="body-lg">
                В этом разделе собраны страницы, которые нужны покупателю до оформления заказа и после получения устройства:
                оферта, политика, гарантия и сертификат.
              </p>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell article-grid article-grid--wide">
          {documentsList.map((item, index) => (
            <Reveal key={item.title} delay={0.06 * index}>
              <Panel className="article-card">
                <p className="eyebrow">{item.tag}</p>
                <h2 className="title-md">{item.title}</h2>
                <p className="body-sm">{item.text}</p>
                <Button to={toRoute(item.href)} secondary>
                  Открыть
                </Button>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function InstructionsPage() {
  usePageMeta("Инструкции");

  return (
    <>
      <section className="section">
        <div className="shell split-grid">
          <Reveal>
            <div className="page-intro">
              <p className="eyebrow">Инструкции</p>
              <h1 className="title-lg">Как быстро запустить VIDEL R1 после покупки.</h1>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="body-lg">
                Раздел помогает с первым включением, настройкой изображения, подключением Wi-Fi и обращением в поддержку.
              </p>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell timeline-grid">
          {instructions.map((item, index) => (
            <Reveal key={item.step} delay={0.06 * index}>
              <Panel className="timeline-card">
                <p className="eyebrow">Шаг {item.step}</p>
                <h2 className="title-md">{item.title}</h2>
                <p className="body-sm">{item.text}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell split-grid">
          <Reveal>
            <Panel className="story-panel">
              <p className="eyebrow">Видео по VIDEL R1</p>
              <h2 className="title-md">В этом разделе будет встроенный плеер с настройкой и первым запуском.</h2>
              <div className="media-placeholder" aria-hidden="true" />
              <p className="body-sm">Видео покажет подключение, автонастройку и быстрый старт без ручной калибровки.</p>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="eyebrow">PDF-инструкция</p>
              <h2 className="title-md">Отдельная карточка с руководством пользователя в формате PDF.</h2>
              <div className="media-placeholder media-placeholder--pdf" aria-hidden="true" />
              <p className="body-sm">После публикации можно открыть документ в один клик и сохранить офлайн-версию.</p>
              <Button to="/documents" secondary>
                Перейти к документам
              </Button>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell split-grid split-grid--faq">
          <Reveal>
            <Panel className="faq-panel">
              <p className="eyebrow">FAQ</p>
              <FaqList items={faqItems} />
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="story-panel">
              <p className="eyebrow">Поддержка</p>
              <h2 className="title-md">Нужна помощь с первым запуском?</h2>
              <ul className="check-list">
                <li>Telegram-бот для быстрого ответа</li>
                <li>Email для сервисных обращений</li>
                <li>Гарантийная диагностика и замена</li>
                <li>Помощь с подключением и настройкой</li>
              </ul>
              <Button href="https://t.me/nivim_support_bot">Открыть Telegram</Button>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactsPage() {
  usePageMeta("Контакты");
  const { saveLead } = useStore();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    saveLead({
      name: formData.get("name"),
      contact: formData.get("contact"),
      message: formData.get("message"),
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="section">
        <div className="shell contact-grid">
          <Reveal>
            <Panel className="story-panel">
              <p className="eyebrow">Контакты</p>
              <h1 className="title-lg">Поддержка, продажа и сервис в одном месте.</h1>
              <ul className="contact-list">
                <li>{brand.phone}</li>
                <li>{brand.email}</li>
                <li>{brand.telegram}</li>
                <li>{brand.address}</li>
              </ul>
              <p className="body-sm">{brand.hours}</p>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="contact-form-panel">
              <p className="eyebrow">Обратная связь</p>
              <form className="checkout-form" onSubmit={handleSubmit}>
                <label className="field-label">
                  <span>Ваше имя</span>
                  <input className="field" name="name" placeholder="Ваше имя…" autoComplete="name" required />
                </label>
                <label className="field-label">
                  <span>Телефон или Telegram</span>
                  <input className="field" name="contact" placeholder="@username или +7…" autoComplete="off" required />
                </label>
                <label className="field-label">
                  <span>Сообщение</span>
                  <textarea className="field field--area" name="message" placeholder="Что хотите обсудить…" required />
                </label>
                <Button type="submit">Отправить обращение</Button>
              </form>
              {saved ? (
                <div className="support-card support-card--muted">
                  <p className="body-sm">Сообщение отправлено. Команда NIVIM свяжется с вами по указанному контакту.</p>
                </div>
              ) : null}
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell article-grid article-grid--wide">
          {[
            [
              "Продажа и консультация",
              "Поможем выбрать комплект, аксессуары и сценарий использования под интерьер и задачи.",
            ],
            ["Сервис и гарантия", "Принимаем обращения по диагностике, замене и сопровождению устройства после покупки."],
            ["B2B и презентации", "Подберем конфигурацию для переговорных, шоурумов и временных инсталляций."],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={0.06 * index}>
              <Panel className="article-card">
                <h2 className="title-md">{title}</h2>
                <p className="body-sm">{text}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function LegalPage() {
  const { kind = "privacy" } = useParams();
  const info = LEGAL_COPY[kind] || LEGAL_COPY.privacy;
  usePageMeta(info.title);

  return (
    <section className="section">
      <div className="shell split-grid">
        <Reveal>
          <Panel className="story-panel">
            <p className="eyebrow">Юридическая информация</p>
            <h1 className="title-lg">{info.title}</h1>
            <p className="body-lg">
              Страница содержит основную юридическую информацию, связанную с покупкой, использованием сайта и сервисной поддержкой.
            </p>
          </Panel>
        </Reveal>
        <Reveal delay={0.08}>
          <Panel className="article-body">
            {info.sections.map((item) => (
              <p className="body-sm" key={item}>
                {item}
              </p>
            ))}
            <Button to="/documents" secondary>
              Назад к документам
            </Button>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

function NotFoundPage() {
  usePageMeta("Страница не найдена");

  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <Panel className="empty-state">
            <p className="eyebrow">404</p>
            <h1 className="title-lg">Страница не найдена.</h1>
            <p className="body-lg">Вернитесь на главную или откройте каталог, чтобы продолжить работу с магазином.</p>
            <Button to="/">На главную</Button>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product, compact = false }) {
  const { addToCart, formatPrice } = useStore();

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
      <Panel className={`product-card${compact ? " product-card--compact" : ""}`}>
        <Scene className="product-card__scene" image={product.image}>
          <div className="product-card__meta">
            <span>{typeLabel[product.type] || product.type}</span>
            <span>{product.stock}</span>
          </div>
        </Scene>
        <div className="product-card__body">
          <p className="eyebrow">{typeLabel[product.type] || product.type}</p>
          <h2 className="title-md">{product.name}</h2>
          <p className="body-sm">{product.subtitle}</p>
          <div className="price-block">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice ? <span>{formatPrice(product.oldPrice)}</span> : null}
          </div>
          <div className="tag-row">
            {(product.shortSpecs || []).slice(0, 3).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
          <div className="button-row">
            <Button to={`/product/${product.id}`} secondary>
              Подробнее
            </Button>
            <Button onClick={() => addToCart(product.id)}>В корзину</Button>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}

function ArticleCard({ article, compact = false }) {
  return (
    <Panel className={`article-card${compact ? " article-card--compact" : ""}`}>
      <div className="article-card__media">
        <img src={article.cover || sceneImages.surface} alt="" aria-hidden="true" />
      </div>
      <p className="eyebrow">
        {article.category} / {article.time}
      </p>
      <h3 className="title-sm">{article.title}</h3>
      <p className="body-sm">{article.excerpt}</p>
      <Button to={`/article/${article.slug}`} secondary>
        Читать
      </Button>
    </Panel>
  );
}

function FaqList({ items }) {
  const [active, setActive] = useState(items[0]?.q || "");

  return (
    <div className="faq-list">
      {items.map((item) => {
        const isOpen = item.q === active;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
            <button type="button" onClick={() => setActive(isOpen ? "" : item.q)}>
              <span>{item.q}</span>
              <strong>{isOpen ? "−" : "+"}</strong>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="body-sm">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function toRoute(href) {
  if (!href) return "/";
  if (href.startsWith("legal/")) {
    return `/${href.replace(".html", "")}`;
  }
  return `/${href.replace(".html", "")}`;
}

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:sku" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/legal/:kind" element={<LegalPage />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/catalog.html" element={<Navigate to="/catalog" replace />} />
        <Route path="/product.html" element={<Navigate to="/product/videl-r1" replace />} />
        <Route path="/cart.html" element={<Navigate to="/cart" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
        <Route path="/article.html" element={<Navigate to={`/article/${articles[0].slug}`} replace />} />
        <Route path="/documents.html" element={<Navigate to="/documents" replace />} />
        <Route path="/instructions.html" element={<Navigate to="/instructions" replace />} />
        <Route path="/contacts.html" element={<Navigate to="/contacts" replace />} />
        <Route path="/legal/:kind.html" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
