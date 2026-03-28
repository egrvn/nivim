import { useCart } from "../commerce/cart";
import { homeContent } from "../content/figma23120";
import { PRIMARY_PRODUCT_ID } from "../content/cart";
import { asset, route } from "../lib/paths";
import { renderLines } from "../lib/text";

export function HomeFinalFooter() {
  const footer = homeContent.footer;
  const { addItem } = useCart();

  return (
    <section className="home-final-footer" id="contacts">
      <img alt="" aria-hidden="true" className="home-final-footer__background" src={asset(footer.background)} />
      <div className="home-final-footer__content">
        <h2 className="figma-gradient-heading figma-gradient-heading--left">{renderLines(footer.title)}</h2>
        <p className="figma-footer-copy">{footer.description}</p>
        <button
          className="figma-light-button figma-light-button--left"
          type="button"
          onClick={() => {
            addItem(PRIMARY_PRODUCT_ID);
            window.location.href = route("/cart/");
          }}
        >
          {footer.button}
        </button>
      </div>

      <div className="home-final-footer__contacts">
        <p className="figma-footer-link">{renderLines(footer.email)}</p>
        <p className="figma-footer-link">{renderLines(footer.telegram)}</p>
        <p className="figma-footer-note">{footer.hours}</p>
        <p className="figma-footer-legal">{footer.legal}</p>
        <p className="figma-footer-credit">{footer.credit}</p>
        <p className="figma-footer-note figma-footer-note--copyright">{footer.copyright}</p>
      </div>

      <div className="figma-wordmark figma-wordmark--footer figma-wordmark--footer-ghosted" aria-hidden="true">
        <span className="figma-wordmark__ghost">N</span>
        <span>IVI</span>
        <span className="figma-wordmark__ghost">M</span>
      </div>
      <div className="figma-wordmark figma-wordmark--footer" aria-hidden="true">
        <span>N</span>
        <span className="figma-wordmark__ghost">IVI</span>
        <span>M</span>
      </div>
    </section>
  );
}
