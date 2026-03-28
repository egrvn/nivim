import { Artboard } from "../components/Artboard";
import { TopStrip } from "../components/TopStrip";
import { blogContent } from "../content/figma23120";
import { asset } from "../lib/paths";
import { renderLines } from "../lib/text";

export function BlogPage() {
  return (
    <Artboard className="figma-inner-page" height={2212}>
      <div className="figma-inner-page__background" />
      <TopStrip page="blog" />

      <section>
        <div className="inner-hero-frame" aria-hidden="true">
          <img alt="" className="inner-hero-image" src={asset("figma-literal/blog-hero.png")} />
        </div>
        <h1 className="figma-gradient-heading figma-gradient-heading--center figma-inner-page__title" style={{ top: 86, width: 1014, left: 93 }}>
          {renderLines(blogContent.title)}
        </h1>
      </section>

      <section>
        <div className="inner-wave-frame" aria-hidden="true">
          <img alt="" className="inner-wave-image" src={asset("figma-literal/blog-wave.png")} />
        </div>
        <div className="inner-dark-slab inner-dark-slab--blog" />
        <p className="figma-inner-page__body figma-inner-page__body--center" style={{ top: 1592, left: 347, width: 504 }}>
          {blogContent.supportTitle}
        </p>
      </section>
    </Artboard>
  );
}
