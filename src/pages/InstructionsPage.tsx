import { Artboard } from "../components/Artboard";
import { TopStrip } from "../components/TopStrip";
import { instructionsContent } from "../content/figma23120";
import { asset } from "../lib/paths";
import { renderLines } from "../lib/text";

export function InstructionsPage() {
  return (
    <Artboard className="figma-inner-page" height={2212}>
      <div className="figma-inner-page__background" />
      <TopStrip page="instructions" />

      <section>
        <div className="inner-hero-frame" aria-hidden="true">
          <img alt="" className="inner-hero-image" src={asset("figma-literal/instructions-hero.png")} />
        </div>
        <h1 className="figma-gradient-heading figma-gradient-heading--center figma-inner-page__title" style={{ top: 86, width: 1014, left: 93 }}>
          {renderLines(instructionsContent.title)}
        </h1>
      </section>

      <section>
        <div className="inner-wave-frame" aria-hidden="true">
          <img alt="" className="inner-wave-image" src={asset("figma-literal/instructions-wave.png")} />
        </div>
        <div className="inner-dark-slab inner-dark-slab--tall" />
      </section>

      <section className="instructions-support">
        <p className="instructions-support__title">{instructionsContent.supportTitle}</p>
        <div className="instructions-support__column instructions-support__column--email">
          <p className="instructions-support__accent">Email поддержка:</p>
          <a className="instructions-support__link" href="mailto:support@videl.tech">
            support@videl.tech
          </a>
          <p className="instructions-support__accent">Время ответа:</p>
          <p className="instructions-support__accent">до 24 часов</p>
        </div>

        <div className="instructions-support__column instructions-support__column--telegram">
          <p className="instructions-support__accent">Telegram бота:</p>
          <a className="instructions-support__link" href="https://t.me/videl_support_bot" rel="noreferrer" target="_blank">
            @videl_support_bot
          </a>
          <p className="instructions-support__accent">Быстрые ответы</p>
          <p className="instructions-support__accent">и диагностика</p>
        </div>

        <a className="figma-light-button figma-light-button--small instructions-support__button instructions-support__button--email" href="mailto:support@videl.tech">
          {instructionsContent.emailButton}
        </a>
        <a
          className="figma-light-button figma-light-button--small instructions-support__button instructions-support__button--telegram"
          href="https://t.me/videl_support_bot"
          rel="noreferrer"
          target="_blank"
        >
          {instructionsContent.telegramButton}
        </a>
      </section>
    </Artboard>
  );
}
