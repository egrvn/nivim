export type PageKey = "home" | "about" | "instructions" | "blog" | "privacy" | "cart" | "notFound";

export type NavItem = {
  label: string;
  href: string;
};

export type ScenarioCard = {
  title: string;
  description: string;
  quote: string;
  image: string;
  align?: "left" | "right";
  imagePosition?: string;
};

export type BenefitCard = {
  title: string;
  description: string;
  icon: string;
  variant?: "dark" | "accent" | "outline";
};

export type StepItem = {
  number: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  variant?: "dark" | "accent" | "outline";
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type EditorialCard = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export type ContactCard = {
  title: string;
  body: string[];
  cta: string;
  href: string;
};

export const siteMeta = {
  siteName: "NIVIM",
  siteUrl: "https://egrvn.github.io/nivim/",
  modelName: "VIDEL R1",
  description: "VIDEL R1 превращает комнату в кинотеатр — без лишних проводов и сложных настроек.",
};

export const navigation = {
  primary: [
    { label: "Продукт", href: "/#product" },
    { label: "О компании", href: "/o-kompanii/" },
    { label: "Инструкции", href: "/instrukcii/" },
    { label: "Блог", href: "/blog/" },
    { label: "Контакты", href: "/#contacts" },
  ] as NavItem[],
  utility: [{ label: "Правовая информация", href: "/privacy-policy/" }] as NavItem[],
};

export const homeContent = {
  hero: {
    kicker: "Так начинается кино...",
    lead: "VIDEL R1 превращает комнату в кинотеатр — без лишних проводов и сложных настроек",
    button: "Смотри, что он умеет ↓",
    note: "Яркость 1000 ANSI, автофокус и Android 12 — всё готово, чтобы просто включить и смотреть",
    background: "figma/home-fvd.png",
    star: "tilda/tild3166-6436-4531-b163-303164303533__star_3_1.png",
    beam: "tilda/tild3130-3663-4233-a362-656463333632__magnifics_upscale-9t.png",
    device: "tilda/tild3337-3639-4334-b665-373130313963__magnifics_upscale-ss.png",
  },
  scenarios: {
    title: "Для тех, кто любит моменты, а не настройки",
    description: "NIVIM создан для людей, которые хотят просто смотреть, играть, делиться — без сложностей, проводов и лишних устройств.",
    cards: [
      {
        title: "Домашние вечера",
        description: "Тёплый свет, мягкий диван, звук шагов и первый кадр фильма",
        quote: "«Каждый вечер — как в кино»",
        image: "figma/scenario-01.png",
        align: "left",
      },
      {
        title: "Игры на большом экране",
        description: "Контроллер, быстрый отклик, масштаб и детализация",
        quote: "«Играй по-крупному»",
        image: "figma/scenario-02.png",
        align: "right",
      },
      {
        title: "Семейные выходные",
        description: "Дети, мультики, смех и спонтанные киносеансы",
        quote: "«Кино без ограничений — для всех»",
        image: "figma/scenario-03.png",
        align: "left",
      },
      {
        title: "Презентации и контент",
        description: "Рабочий сценарий: чистая картинка, простое подключение",
        quote: "«Когда важно, чтобы всё просто работало»",
        image: "figma/scenario-04.png",
        align: "right",
        imagePosition: "82% center",
      },
    ] as ScenarioCard[],
  },
  benefits: {
    title: "Дом в котором живет кино",
    description:
      "С VIDEL R1 твой дом становится пространством для эмоций, света и звука. Фильмы, игры, видео — всё выглядит по-новому, будто ты впервые смотришь знакомые вещи.",
    cards: [
      {
        title: "Больше, чем экран",
        description: "Проектор создаёт ощущение масштаба — не просто картинку, а сцену",
        icon: "figma/icon-scenery.svg",
      },
      {
        title: "Атмосфера, а не техника",
        description: "Он не выглядит как гаджет, он становится частью пространства",
        icon: "figma/icon-atmosphere.svg",
        variant: "accent",
      },
      {
        title: "Твой вечерний ритуал",
        description: "Каждый день заканчивается не рутиной, а моментами любимого кино",
        icon: "figma/icon-movie.svg",
      },
    ] as BenefitCard[],
  },
  steps: {
    title: "Просто включи - и все готово",
    description:
      "VIDEL R1 сам настраивается, фокусируется и подключается к твоим устройствам. Никаких проводов, меню и сложностей — только чистое изображение и звук.",
    items: [
      {
        number: "01",
        title: "включи",
        kicker: "никаких передвиганий и регулировок — идеальная резкость через секунду",
        description: "Проектор автоматически определяет расстояние и настраивает автофокус",
        image: "figma/step-01.png",
      },
      {
        number: "02",
        title: "подключи",
        kicker: "Работает без проводов, без ожидания",
        description: "Подключение по Wi‑Fi 6 или Bluetooth 5.0. Смартфон, ноутбук, консоль — всё соединяется мгновенно",
        image: "figma/step-02.png",
      },
      {
        number: "03",
        title: "Смотри",
        kicker: "Кинопоиск, VK Видео, OKKO — всё уже внутри",
        description: "Android 12 открывает доступ ко всем стриминговым сервисам прямо с устройства",
        image: "figma/step-03.png",
      },
    ] as StepItem[],
  },
  features: {
    title: "технология, которая не мешает",
    description:
      "VIDEL R1 делает всё, чтобы ты думал не о настройках, а о моменте. Он умный, честный и создан, чтобы просто работать — день за днем, год за годом.",
    mediaCard: "figma/features-card-center.png",
    items: [
      {
        title: "Честная яркость 1000 ANSI",
        description: "Картинка остаётся чёткой даже при дневном свете",
        icon: "figma/icon-brightness.svg",
        variant: "dark",
      },
      {
        title: "Автофокус, зум и автонастройка",
        description: "Он всё делает сам: фокусируется, выравнивает картинку, адаптируется к стене.",
        icon: "figma/icon-zoom.svg",
        variant: "dark",
      },
      {
        title: "Android 12 и Wi‑Fi 6",
        description: "Все стриминги внутри — YouTube, Кинопоиск, VK Видео. Работает быстро, без зависаний, без приставок",
        icon: "figma/icon-wifi.svg",
        variant: "accent",
      },
      {
        title: "Защищенная оптика и надежность",
        description: "Герметичный модуль защищает линзу от пыли. Срок службы LED‑лампы — до 90 000 часов",
        icon: "figma/icon-circle.svg",
        variant: "outline",
      },
      {
        title: "Встроенный звук",
        description: "Два динамика по 5 Вт создают чистый объёмный звук. Для вечера кино — всё, что нужно",
        icon: "figma/icon-sound.svg",
        variant: "accent",
      },
    ] as FeatureItem[],
  },
  video: {
    title: "Хочешь увидеть это в живую?",
    description:
      "Посмотри, как VIDEL R1 оживляет пространство. Мы покажем видео, где видно всё — свет, звук и ту самую атмосферу, ради которой создавался проектор.",
    placeholder: "Анимация код",
    background: "figma/features-bg.png",
  },
  value: {
    title: "Не дороже других. Просто лучше",
    description: "VIDEL R1 дает тот же эффект, что и проекторы за 45 000 ₽+, но без переплаты за логотип",
    specs: [
      "Full HD + поддержка 4K",
      "1000 ANSI люменов",
      "Автофокус + моторизированный зум",
      "Android 12 + Wi‑Fi 6 + Bluetooth 5.0",
      "Встроенные динамики 2×5 Вт",
      "Гарантия 1 год",
    ],
    price: "Цена: 29 990 ₽",
    cta: "Добавить в корзину",
    image: "tilda/tild3337-3639-4334-b665-373130313963__magnifics_upscale-ss.png",
    background: "tilda/tild6166-6333-4363-a231-636636633838__magnifics_upscale-zt.png",
  },
  testimonials: {
    title: "Уже говорят те, кто уже попробовал",
    description: "каждый по-своему, но все — про одно: работает, радует, стоит своих денег",
    placeholder: "стандартный блок тильды",
  },
  faq: {
    title: "Частые вопросы",
    description: "Отвечаем так, как объяснили бы друзьям",
    placeholder: "стандартный блок тильды",
    items: [
      {
        question: "Нужно ли покупать приставку или ТВ-бокс?",
        answer: "Нет. Android 12 уже внутри, поэтому основные стриминги запускаются прямо с проектора.",
      },
      {
        question: "Можно ли подключить телефон без проводов?",
        answer: "Да. VIDEL R1 поддерживает Wi‑Fi и Bluetooth, а трансляция работает через привычные беспроводные сценарии.",
      },
      {
        question: "Сколько служит лампа?",
        answer: "LED‑источник рассчитан на длительный срок службы и подходит для ежедневных вечерних просмотров.",
      },
      {
        question: "Что идёт в комплекте?",
        answer: "Проектор, пульт, кабели для базового запуска и инструкция для первого включения.",
      },
    ] as FaqItem[],
  },
  support: {
    title: "не нашли свой вопрос?",
    description: "Задайте в Telegram-боте поддержки NIVIM",
    button: "Задать вопрос",
    href: "https://t.me/nivim_support_bot",
  },
  editorial: {
    title: "Истории, советы и вдохновение",
    description:
      "Мы собрали полезные материалы о том, как создать идеальное домашнее кино. От выбора экрана до лучших фильмов для первого вечера с VIDEL.",
    placeholder: "стандартный блок тильды",
  },
  finalCta: {
    title: "пора смотреть по настоящему",
    description:
      "VIDEL R1 создает то, чего не дает телевизор — атмосферу. Просто включи, сядь поудобнее и смотри, как дом оживает.",
    button: "Посмотреть в деле",
  },
};

export const aboutContent = {
  hero: {
    title: "Мы создаём не просто технику — мы создаём атмосферу",
    description:
      "NIVIM — это не просто бренд проекторов. Это философия погружения в безграничные возможности домашнего кинотеатра и техника, которая быстрее приводит к моменту, а не к настройкам.",
  },
  manifesto: [
    "Мы создаём устройства, которые не требуют долгого старта и не спорят с интерьером.",
    "Для нас домашнее кино — это не сложный сетап, а ощущение масштаба, света и вовлечения уже в первые минуты.",
    "Поэтому NIVIM соединяет честную картинку, аккуратный дизайн и повседневную простоту использования.",
  ],
  values: [
    {
      title: "Честная технология",
      description: "Без показной сложности и без функций ради галочки. Всё, что есть в устройстве, нужно реальному пользователю.",
      icon: "figma/icon-circle.svg",
    },
    {
      title: "Атмосфера как результат",
      description: "Проектор должен менять восприятие пространства, а не просто занимать место на полке.",
      icon: "figma/icon-movie.svg",
      variant: "accent",
    },
    {
      title: "Простота без потерь",
      description: "Автонастройка, беспроводное подключение и понятный запуск — чтобы техника не мешала контенту.",
      icon: "figma/icon-wifi.svg",
    },
  ] as BenefitCard[],
};

export const instructionsContent = {
  hero: {
    title: "Короткие инструкции для тех, кто хочет сразу к делу",
    description: "Собрали стартовый маршрут и типовые подсказки, которые помогают быстро запустить VIDEL R1 без лишней бюрократии.",
  },
  quickStart: [
    {
      number: "01",
      title: "Поставьте проектор",
      description: "Выберите устойчивую поверхность, направьте устройство на стену или экран и подключите питание.",
    },
    {
      number: "02",
      title: "Подключите сеть",
      description: "После первого запуска подключитесь к Wi‑Fi, чтобы открыть приложения и обновления.",
    },
    {
      number: "03",
      title: "Запустите контент",
      description: "Войдите в нужные сервисы и сохраните привычный набор приложений на домашнем экране.",
    },
  ],
  diagnostics: [
    {
      title: "Если картинка не в фокусе",
      description: "Переставьте проектор на более стабильную поверхность и повторно запустите автофокус.",
    },
    {
      title: "Если не находится Wi‑Fi",
      description: "Проверьте частоту сети, перезапустите подключение и убедитесь, что сигнал достаточно сильный.",
    },
    {
      title: "Если нет звука",
      description: "Проверьте активное устройство вывода в настройках Bluetooth или HDMI ARC и переподключите акустику.",
    },
  ],
  supportTitle: "Если проблема не решилась, подключаемся лично — спокойно и без лишней переписки.",
  contacts: [
    {
      title: "Email поддержка",
      body: ["support@nivim.tech", "Время ответа: до 24 часов", "Подходит для диагностики и сервисных вопросов"],
      cta: "Написать на почту",
      href: "mailto:support@nivim.tech",
    },
    {
      title: "Telegram бот",
      body: ["@nivim_support_bot", "Быстрые ответы и диагностика", "Подходит для стартовых вопросов и помощи по запуску"],
      cta: "Перейти в бот",
      href: "https://t.me/nivim_support_bot",
    },
  ] as ContactCard[],
};

export const blogContent = {
  hero: {
    title: "Блог про технологии проекции и кино",
    description: "Материалы NIVIM о домашнем кино, сценариях использования и о том, как проектор раскрывается в реальной жизни.",
  },
  intro:
    "Если вы не нашли нужную инструкцию или у вас есть вопросы — обратитесь в нашу техническую службу. А ниже собрали редакционные материалы, которые помогают лучше раскрыть проектор дома.",
  featured: {
    title: "Как выбрать правильное место для проектора дома",
    description: "Свет, расстояние, высота изображения и простые интерьерные решения, которые сильнее всего влияют на впечатление от просмотра.",
    image: "tilda/tild6336-6431-4139-a164-653434353562__valentin-lacoste-eqc.jpg",
    href: "#setup",
  },
  posts: [
    {
      title: "Первый вечер с проектором",
      description: "Короткий чек-лист, который поможет быстро подготовить комнату и сразу получить нормальную картинку.",
      image: "figma/scenario-03.png",
      href: "#first-night",
    },
    {
      title: "Когда проектор выигрывает у телевизора",
      description: "Разбираем сценарии, где большой экран действительно меняет ощущение от контента.",
      image: "figma/scenario-02.png",
      href: "#compare",
    },
    {
      title: "Свет, шторы и стены",
      description: "Что влияет на изображение сильнее всего и какие бытовые детали дают самый заметный результат.",
      image: "tilda/tild6537-6531-4637-b266-366362396435__magnifics_upscale-ji.png",
      href: "#light",
    },
  ] as EditorialCard[],
};

export const privacyContent = {
  title: "Правовая информация",
  intro:
    "Ниже собраны основные положения о конфиденциальности, обработке обращений и реквизитах NIVIM. Это техническая страница, оформленная в общей системе сайта.",
  tabs: [
    {
      id: "policy",
      label: "Политика",
      sections: [
        {
          title: "Какие данные мы получаем",
          body:
            "Когда вы оставляете заявку, мы можем получить имя, телефон, email, Telegram-контакт и детали обращения. Эти данные нужны только для связи по заказу, поддержке или консультации.",
        },
        {
          title: "Как мы используем данные",
          body:
            "Данные используются для ответа на обращение, сопровождения заказа, сервисной коммуникации и улучшения поддержки. Мы не продаём и не передаём их третьим лицам вне задач обслуживания.",
        },
        {
          title: "Как запросить удаление",
          body: "Если нужно удалить активное обращение или персональные данные, напишите на support@nivim.tech — мы обработаем запрос в разумный срок.",
        },
      ],
    },
    {
      id: "details",
      label: "Реквизиты",
      sections: [
        {
          title: "Контакты",
          body: "Email: support@nivim.tech\nTelegram: @nivim_support_bot\nЕжедневно с 9:00 до 21:00 (МСК)",
        },
        {
          title: "Правообладатель",
          body: "ИП Шрамко Вадим Владленович\nИНН 773014239133",
        },
      ],
    },
  ],
};

export const footerContent = {
  description: "Проектор, который делает домашний просмотр масштабным, чистым и простым в запуске.",
  contacts: [
    "Email для связи: support@nivim.tech",
    "Поддержка в Telegram: @nivim_support_bot",
    "Ежедневно с 9:00 до 21:00 (МСК)",
  ],
  legal: "Правовая информация",
  credit: "Разработка сайта: South Wind",
  copyright: "© 2025. Все права защищены",
};

export const notFoundContent = {
  title: "Такой страницы здесь нет",
  description: "Похоже, адрес устарел или ссылка ведёт не туда. Вернитесь на главную — оттуда проще попасть в нужный раздел.",
  homeLabel: "На главную",
  blogLabel: "Открыть блог",
};
