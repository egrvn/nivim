import { Artboard } from "../components/Artboard";
import { TopStrip } from "../components/TopStrip";
import { aboutContent } from "../content/site";
import { asset } from "../lib/paths";
import { renderLines } from "../lib/text";

export function AboutPage() {
  return (
    <Artboard className="figma-inner-page" height={2212}>
      <div className="figma-inner-page__background" />
      <TopStrip page="about" />

      <section>
        <img alt="" aria-hidden="true" className="inner-hero-image" src={asset("figma/inner-hero.png")} />
        <h1 className="figma-gradient-heading figma-gradient-heading--center figma-inner-page__title" style={{ top: 86, width: 1014, left: 93 }}>
          {renderLines(aboutContent.title)}
        </h1>

        <div className="figma-wordmark figma-wordmark--inner figma-wordmark--inner-ghosted" aria-hidden="true">
          <span className="figma-wordmark__ghost">N</span>
          <span>IVI</span>
          <span className="figma-wordmark__ghost">M</span>
        </div>
        <div className="figma-wordmark figma-wordmark--inner" aria-hidden="true">
          <span>N</span>
          <span className="figma-wordmark__ghost">IVI</span>
          <span>M</span>
        </div>
        <p className="figma-inner-page__description" style={{ top: 510, width: 593, left: 303 }}>
          {aboutContent.description}
        </p>
      </section>

      <section>
        <img alt="" aria-hidden="true" className="inner-wave-image" src={asset("figma/inner-wave.png")} />
        <div className="inner-dark-slab" />
      </section>
    </Artboard>
  );
}
