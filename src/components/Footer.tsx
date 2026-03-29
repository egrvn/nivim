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

        <div className="site-footer__column">
          <p className="site-footer__label">{footerContent.navTitle}</p>
          <div className="site-footer__nav">
            {navigation.primary.map((item) => (
              <a key={item.label} href={item.href.startsWith("/#") ? homeAnchor(item.href.slice(2)) : route(item.href)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__column">
          <p className="site-footer__label">{footerContent.contactsTitle}</p>
          <div className="site-footer__contacts">
            {footerContent.contacts.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              ) : (
                <p key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </p>
              ),
            )}
          </div>
        </div>

        <div className="site-footer__column">
          <p className="site-footer__label">{footerContent.legalTitle}</p>
          <div className="site-footer__nav">
            <a href={route("/privacy-policy/")}>{footerContent.legal}</a>
          </div>
        </div>
      </section>

      <section className="site-footer__meta">
        <p>{footerContent.copyright}</p>
        {footerContent.credit ? <p>{footerContent.credit}</p> : null}
      </section>
    </footer>
  );
}
