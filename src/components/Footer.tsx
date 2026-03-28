import { footerContent, navigation } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Logo } from "./Logo";

type FooterProps = {
  showCta?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Footer({ ctaDescription, ctaHref, ctaLabel, ctaTitle, showCta = false }: FooterProps) {
  return (
    <footer id="contacts" className="site-footer">
      {showCta ? (
        <section className="site-footer__cta">
          <div className="site-footer__cta-copy">
            <h2 className="site-gradient-heading site-gradient-heading--left">{ctaTitle}</h2>
            <p>{ctaDescription}</p>
          </div>
          {ctaHref ? (
            <a className="site-light-button" href={ctaHref}>
              {ctaLabel}
            </a>
          ) : null}
        </section>
      ) : null}

      <section className="site-footer__body">
        <div className="site-footer__brand">
          <Logo light />
          <p>{footerContent.description}</p>
        </div>

        <div className="site-footer__contacts">
          {footerContent.contacts.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>

        <div className="site-footer__nav">
          {navigation.primary.map((item) => (
            <a key={item.label} href={item.href.startsWith("/#") ? homeAnchor(item.href.slice(2)) : route(item.href)}>
              {item.label}
            </a>
          ))}
          <a href={route("/privacy-policy/")}>{footerContent.legal}</a>
        </div>
      </section>

      <section className="site-footer__meta">
        <p>{footerContent.copyright}</p>
        {footerContent.credit ? <p>{footerContent.credit}</p> : null}
      </section>

      <div className="site-footer__wordmark" aria-hidden="true">
        <span>N</span>
        <span className="site-footer__wordmark-ghost">IVI</span>
        <span>M</span>
      </div>
    </footer>
  );
}
