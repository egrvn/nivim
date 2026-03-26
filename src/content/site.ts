import { siteConfig as legacySiteConfig } from "../../site-src/data/site-data.mjs";

export type NavItem = {
  label: string;
  href: string;
  active?: "home" | "about" | "support" | "blog" | "privacy";
};

export type Metric = {
  value: string;
  label: string;
};

export type ScenarioCard = {
  title: string;
  text: string;
  image: string;
};

export type BenefitCard = {
  title: string;
  text: string;
};

export type StepItem = {
  number: string;
  title: string;
  text: string;
};

export type FeatureItem = {
  title: string;
  body: string;
  icon: string;
};

export type QuoteItem = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

type LegalTab = {
  id: string;
  label: string;
  content: string;
};

type LegacyConfig = {
  siteName: string;
  modelName: string;
  siteUrl: string;
  email: string;
  telegramHandle: string;
  telegramUrl: string;
  supportHours: string;
  price: string;
  pages: {
    home: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
        body: string;
        primaryCta: string;
        secondaryCta: string;
        image: string;
        metrics: Metric[];
      };
      scenarios: {
        title: string;
        intro: string;
        cards: ScenarioCard[];
      };
      benefits: {
        title: string;
        intro: string;
        cards: BenefitCard[];
      };
      steps: {
        title: string;
        intro: string;
        items: StepItem[];
      };
      specs: {
        title: string;
        intro: string;
        note: string;
        image: string;
        rows: [string, string][];
        highlights: string[];
      };
      cta: {
        eyebrow: string;
        title: string;
        body: string;
      };
    };
    about: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
      };
      mission: {
        title: string;
        paragraphs: string[];
        values: { title: string; text: string }[];
      };
      principles: { title: string; text: string }[];
    };
    support: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
        image: string;
      };
      steps: { title: string; text: string }[];
      issues: { title: string; text: string }[];
    };
    blog: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
      };
      posts: BlogPost[];
    };
    privacy: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
      };
      tabs: LegalTab[];
    };
    notFound: {
      hero: {
        eyebrow: string;
        title: string;
        lead: string;
      };
    };
  };
  socialProof: QuoteItem[];
  faq: FaqItem[];
};

const config = legacySiteConfig as unknown as LegacyConfig;

export const siteMeta = {
  siteName: config.siteName,
  modelName: config.modelName,
  email: config.email,
  telegramHandle: config.telegramHandle,
  telegramUrl: config.telegramUrl,
  supportHours: config.supportHours,
  price: config.price,
};

export const navigation: NavItem[] = [
  { label: "Продукт", href: "/#product" },
  { label: "О бренде", href: "/o-kompanii/", active: "about" },
  { label: "Поддержка", href: "/podderjka/", active: "support" },
  { label: "Журнал", href: "/blog/", active: "blog" },
  { label: "Контакты", href: "/#contacts" },
];

export const secondaryNavigation: NavItem[] = [{ label: "Документы", href: "/privacy-policy/", active: "privacy" }];

export const leadMethods = [
  { value: "Телефон", placeholder: "+7 900 000-00-00" },
  { value: "Telegram", placeholder: "@username" },
  { value: "WhatsApp", placeholder: "+7 900 000-00-00" },
  { value: "Email", placeholder: "mail@example.com" },
];

export const homeContent = {
  hero: {
    ...config.pages.home.hero,
    title: "Так начинается кино...\nNIVIM VIDEL R1",
    supporting:
      "Премиальный визуальный опыт складывается из честных характеристик, продуманного сценария запуска и спокойной эстетики без лишнего техношума.",
    halo: "assets/tilda/tild6266-6634-4362-a265-393038303566__magnifics_upscale-xi.png",
  },
  scenarios: config.pages.home.scenarios,
  benefits: {
    ...config.pages.home.benefits,
    title: "Дом, в котором живёт кино",
  },
  steps: config.pages.home.steps,
  features: [
    {
      title: "Честная яркость 1000 ANSI",
      body: "Световой запас ощущается не на коробке, а в реальном вечернем просмотре: картинка держит глубину и не рассыпается в полутон.",
      icon: "assets/tilda/tild6430-6538-4161-a134-353438353263__frame_6.svg",
    },
    {
      title: "Android 12 внутри",
      body: "Основные сервисы запускаются с устройства сразу, без приставок и дополнительного интерфейсного мусора.",
      icon: "assets/tilda/tild3639-3466-4533-a161-343535343135__frame_7.svg",
    },
    {
      title: "Wi-Fi 6 и Bluetooth 5.0",
      body: "Подключение телефона, консоли, ноутбука и акустики не превращается в отдельный сценарий настройки.",
      icon: "assets/tilda/tild6634-3835-4761-b337-643536363864__frame_8.svg",
    },
    {
      title: "Автофокус и геометрия",
      body: "Проектор быстро собирает аккуратную картинку и не требует постоянной ручной коррекции после каждого перемещения.",
      icon: "assets/tilda/tild6265-3631-4033-a431-666236386539__frame_9.svg",
    },
    {
      title: "Поддержка 4K input",
      body: "Контент выглядит масштабно и чисто, а Full HD-матрица работает предсказуемо и без агрессивного маркетингового шума.",
      icon: "assets/tilda/tild3234-3861-4566-a537-313630663037__frame_10.svg",
    },
    {
      title: "Ресурс до 50 000 часов",
      body: "Это техника на каждый вечер, а не игрушка на пару месяцев. Долговечность здесь часть доверия к продукту.",
      icon: "assets/tilda/tild3662-3630-4639-b137-343839613033__frame_11.svg",
    },
  ] as FeatureItem[],
  specs: config.pages.home.specs,
  testimonials: {
    eyebrow: "Отзывы владельцев",
    title: "Когда продукт хвалят не за обещания, а за то, как он живёт дома",
    items: config.socialProof,
  },
  faq: {
    eyebrow: "Частые вопросы",
    title: "Ответы без маркетинговой пыли",
    items: config.faq,
  },
  editorial: {
    eyebrow: "Истории, советы и вдохновение",
    title: "Материалы, которые помогают выжать максимум из домашней проекции",
    posts: config.pages.blog.posts.slice(0, 3),
  },
  cta: config.pages.home.cta,
};

export const aboutContent = {
  hero: config.pages.about.hero,
  mission: config.pages.about.mission,
  principles: config.pages.about.principles,
  story: [
    {
      title: "Мы проектируем спокойный опыт",
      text: "NIVIM нужен не для демонстрации количества функций, а для того, чтобы техника перестала тянуть внимание на себя и начала работать на атмосферу.",
    },
    {
      title: "Честность важнее шумного маркетинга",
      text: "Мы не прячем продукт за декоративными цифрами. Нам важнее, чтобы заявленные возможности выдерживали реальный вечерний просмотр, а не только лендинг.",
    },
  ],
};

export const supportContent = {
  hero: config.pages.support.hero,
  steps: config.pages.support.steps,
  issues: config.pages.support.issues,
  contacts: [
    {
      label: "Telegram-бот",
      value: config.telegramHandle,
      href: config.telegramUrl,
      note: "Быстрый старт, диагностика и живая коммуникация без длинной переписки.",
    },
    {
      label: "Email-поддержка",
      value: config.email,
      href: `mailto:${config.email}`,
      note: "Гарантийные вопросы, документы, подробные обращения и сопровождение покупки.",
    },
    {
      label: "График ответа",
      value: config.supportHours,
      note: "Если ситуация срочная, лучше сразу оставить номер телефона и кратко описать проблему.",
    },
  ],
};

export const blogContent = {
  hero: config.pages.blog.hero,
  featured: config.pages.blog.posts[0],
  posts: config.pages.blog.posts.slice(1),
};

export const privacyContent = {
  hero: config.pages.privacy.hero,
  tabs: config.pages.privacy.tabs,
};

export const notFoundContent = config.pages.notFound.hero;
