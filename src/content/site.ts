export type PageKey = "home" | "about" | "instructions" | "blog" | "notFound";

export type ScenarioCard = {
  title: string;
  description: string;
  quote: string;
  image: string;
  align: "left" | "right";
};

export type InfoCard = {
  title: string;
  description: string;
  icon?: string;
  variant?: "dark" | "purple" | "outlined";
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
  variant: "dark" | "purple" | "outlined";
};

export const siteMeta = {
  siteName: "NIVIM",
  siteUrl: "https://egrvn.github.io/nivim/",
};

export const homeContent = {
  hero: {
    kicker: "Так начинается кино...",
    lead: "VIDEL R1 превращает комнату в кинотеатр — без лишних проводов и сложных настроек",
    note: "Яркость 1000 ANSI, автофокус и Android 12 — всё готово, чтобы просто включить и смотреть",
    cta: "Смотри, что он умеет ↓",
    order: "Заказать",
    background: "figma/home-fvd.png",
    device: "tilda/tild3337-3639-4334-b665-373130313963__magnifics_upscale-ss.png",
    beam: "tilda/tild6266-6634-4362-a265-393038303566__magnifics_upscale-xi.png",
    star: "tilda/tild3166-6436-4531-b163-303164303533__star_3_1.png",
  },
  scenarios: {
    title: "Для тех, \nкто любит моенты,\nа не настройки",
    description: "nivim создан для людей, которые хотят просто смотреть, играть, делиться - без сложностей, проводов и лишних устройств",
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
        quote: "«Играй по-крупному.»",
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
      },
    ] as ScenarioCard[],
  },
  benefits: {
    title: "Дом в котором живет кино",
    description:
      "С VIDEL R1 твой дом становится пространством для эмоций, света и звука. Фильмы, игры, видео — всё выглядит по-новому, будто ты впервые смотришь знакомые вещи",
    cards: [
      {
        title: "Больше, чем экран",
        description: "Проектор создаёт ощущение масштаба — не просто картинку, а сцену",
        icon: "figma/icon-scenery.svg",
        variant: "dark",
      },
      {
        title: "Атмосфера, а не техника",
        description: "Он не выглядит как гаджет, он становится частью пространства",
        icon: "figma/icon-atmosphere.svg",
        variant: "purple",
      },
      {
        title: "Твой вечерний ритуал",
        description: "Каждый день заканчивается не рутиной, а моментами любимого кино",
        icon: "figma/icon-movie.svg",
        variant: "dark",
      },
    ] as InfoCard[],
  },
  steps: {
    title: "Просто включи - и все готово",
    description:
      "VIDEL R1 сам настраивается, фокусируется и подключается к твоим устройствам. Никаких проводов, меню и сложностей — только чистое изображение и звук",
    items: [
      {
        number: "01",
        title: "включи",
        kicker: "никаких передвиганий и регулировок - идеальная резкость через секунду",
        description: "Проектор автоматически определяет расстояние и настраивает автофокус",
        image: "figma/step-01.png",
      },
      {
        number: "02",
        title: "подключи",
        kicker: "Работает без проводов, без ожидания",
        description: "Подключение по Wi-Fi 6 или Bluetooth 5.0. Смартфон, ноутбук, консоль — все соединяется мгновенно",
        image: "figma/step-02.png",
      },
      {
        number: "03",
        title: "Смотри",
        kicker: "КИНОПОИСК, ВК видео. ОККО - все уже внутри",
        description: "Android 12 открывает доступ ко всем стриминговым сервисам прямо с устройства",
        image: "figma/step-03.png",
      },
    ] as StepItem[],
  },
  features: {
    title: "технология,\nкоторая не мешает",
    description:
      "VIDEL R1 делает все, чтобы ты думал не о настройках, а о моменте. Он умный, честный и создан, чтобы просто работать — день за днем, год за годом",
    mediaCard: "figma/features-card-center.png",
    background: "figma/features-bg.png",
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
        title: "Android 12 и Wi-Fi 6",
        description: "Все стриминги внутри — YouTube, Кинопоиск, VK Видео. Работает быстро, без зависаний, без приставок",
        icon: "figma/icon-wifi.svg",
        variant: "purple",
      },
      {
        title: "Защищенная оптика и надежность",
        description: "Герметичный модуль защищает линзу от пыли. Срок службы LED-лампы — до 90 000 часов",
        icon: "figma/icon-circle.svg",
        variant: "outlined",
      },
      {
        title: "Встроенный звук",
        description: "Два динамика по 5 Вт создают чистый объёмный звук. Для вечера кино — всё, что нужно",
        icon: "figma/icon-sound.svg",
        variant: "purple",
      },
    ] as FeatureItem[],
  },
  video: {
    title: "Хочешь увидеть это в живую?",
    description:
      "Посмотри, как VIDEL R1 оживляет пространство. Мы покажем видео, где видно все — свет, звук и ту самую атмосферу, ради которой создавался проектор",
    placeholder: "Анимация код",
    background: "figma/video-bg.png",
  },
  value: {
    title: "Не дороже других.\nПросто лучше",
    description: "VIDEL R1 дает тот же эффект, что и проекторы за 45 000 ₽+, но без переплаты за логотип",
    specs: [
      "Full HD + поддержка 4K",
      "1000 ANSI люменов",
      "Автофокус + моторизированный зум",
      "Android 12 + Wi-Fi 6 + Bluetooth 5.0",
      "Встроенные динамики 2×5 Вт",
      "Гарантия 1 год",
    ],
    price: "Цена: 29 99о ₽",
    cta: "Хочу увидеть в деле",
  },
  testimonials: {
    title: "Уже говорят те,\nкто уже попробовал",
    description: "каждый по-своему, но все - про одно:\nработает, радует, стоит своих денег",
    placeholder: "стандартный\nблок тильды",
  },
  faq: {
    title: "Частые вопросы",
    description: "Отвечаем так,\nкак объяснили бы друзьям",
    placeholder: "стандартный\nблок тильды",
  },
  editorial: {
    title: "Истории, советы\nи вдохновение",
    description:
      "Мы собрали полезные материалы о том, как создать идеальное домашнее кино. От выбора экрана до лучших фильмов для первого вечера с VIDEL",
    placeholder: "стандартный\nблок тильды",
  },
  support: {
    title: "не нашли \nсвой вопрос?",
    description: "Задайте в Telegram-боте поддержки NIVIM",
    button: "Задать вопрос",
  },
  footer: {
    title: "пора смотреть по настоящему",
    description: "VIDEL R1 создает то, чего не дает телевизор — атмосферу. Просто включи, сядь поудобнее и смотри, как дом оживает",
    button: "Посмотреть в деле",
    background: "figma/footer-bg.png",
    email: "Email для связи: support@nivim.tech",
    telegram: "Поддержка в Telegram: @nivim_support_bot",
    hours: "Ежедневно с 9:00 до 21:00 (МСК)",
    legal: "правовая информация",
    credit: "Разработка сайта: South Wind",
    copyright: "© 2025. Все права защищены",
  },
};

export const aboutContent = {
  title: "Мы создаем\nне просто технику\n- мы создаем\nатмосферу",
  description:
    "— это больше чем бренд проекторов, это философия погружения в безграничные возможности домашнего кинотеатра",
};

export const instructionsContent = {
  title: "короткие инструкции\ndля тех,\nкто хочет сразу к делу",
  supportTitle: "Если вы не нашли нужную инструкцию или у вас есть вопросы - обратитесь в нашу техническую службу",
  emailBlock: "Email поддержка:\nsupport@videl.tech\nВремя ответа:\nдо 24 часов",
  telegramBlock: "Telegram бота:\n@videl_support_bot\nБыстрые ответы\nи диагностика",
  emailButton: "Написать на почту",
  telegramButton: "Перейти в бот",
};

export const blogContent = {
  title: "Блог\nпро технологии\nпроекции\nи кино",
  supportTitle: "Если вы не нашли нужную инструкцию или у вас есть вопросы - обратитесь в нашу техническую службу",
};

export const notFoundContent = {
  title: "Страница не найдена",
  description: "В выбранном буквальном наборе Figma такой страницы нет.",
  homeLabel: "На главную",
  blogLabel: "Открыть блог",
};
