import { Artboard } from "../components/Artboard";
import { TopStrip } from "../components/TopStrip";
import { instructionsContent } from "../content/site";
import { asset } from "../lib/paths";
import { renderLines } from "../lib/text";

export function InstructionsPage() {
  return (
    <Artboard className="figma-inner-page" height={2212}>
      <div className="figma-inner-page__background" />
      <TopStrip page="instructions" />

      <section>
        <img alt="" aria-hidden="true" className="inner-hero-image" src={asset("figma/inner-hero.png")} />
        <h1 className="figma-gradient-heading figma-gradient-heading--center figma-inner-page__title" style={{ top: 86, width: 1014, left: 93 }}>
          {renderLines(instructionsContent.title)}
        </h1>
      </section>

      <section>
        <img alt="" aria-hidden="true" className="inner-wave-image" src={asset("figma/inner-wave.png")} />
        <div className="inner-dark-slab inner-dark-slab--tall" />
      </section>

      <section className="instructions-support">
        <p className="instructions-support__title">{instructionsContent.supportTitle}</p>

        <div className="instructions-support__columns">
          <div className="instructions-support__column">
            <p>{renderLines(instructionsContent.emailBlock)}</p>
            <a className="figma-light-button figma-light-button--small" href="mailto:support@videl.tech">
              {instructionsContent.emailButton}
            </a>
          </div>

          <div className="instructions-support__column">
            <p>{renderLines(instructionsContent.telegramBlock)}</p>
            <a className="figma-light-button figma-light-button--small" href="https://t.me/videl_support_bot" rel="noreferrer" target="_blank">
              {instructionsContent.telegramButton}
            </a>
          </div>
        </div>
      </section>
    </Artboard>
  );
}
