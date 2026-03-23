import aboutBody from "./files/page120459556body.html?raw";
import blogBody from "./files/page120464476body.html?raw";
import homeBody from "./files/page120333936body.html?raw";
import notFoundBody from "./files/page120334076body.html?raw";
import privacyBody from "./files/page120334036body.html?raw";
import supportBody from "./files/page120426526body.html?raw";

export const tildaPages = {
  about: {
    description:
      "NIVIM - это больше чем бренд проекторов, это философия погружения в безграничные возможности домашнего кинотеатра",
    html: aboutBody,
    title: "Мы создаем не просто технику - мы создаем атмосферу",
  },
  blog: {
    description: "Про технологии проекции и кино",
    html: blogBody,
    title: "Блог",
  },
  home: {
    description: "VIDEL R1 превращает комнату в кинотеатр — без лишних проводов и сложных настроек",
    html: homeBody,
    title: "NIVIM - Так начинается кино...",
  },
  notFound: {
    description: "",
    html: notFoundBody,
    title: "404",
  },
  privacy: {
    description: "",
    html: privacyBody,
    title: "Документы на сайт",
  },
  support: {
    description: "Короткие инструкции для тех, кто хочет сразу к делу",
    html: supportBody,
    title: "Инструкции",
  },
};
