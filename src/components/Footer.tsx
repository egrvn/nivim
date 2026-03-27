import { footerContent, navigation } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Logo } from "./Logo";

type FooterProps = {
  showCta?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onOpenLead?: () => void;
};

export function Footer({ ctaDescription, ctaHref, ctaLabel, ctaTitle, onOpenLead, showCta = false }: FooterProps) {
  const primaryAction = ctaHref ?? homeAnchor("demo");

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-white/8 bg-[#090a13]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.28),transparent_60%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(26,62,114,0.08))]" aria-hidden="true" />

      {showCta ? (
        <section className="mx-auto flex w-full max-w-[1220px] flex-col gap-8 px-4 pb-18 pt-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-[42rem] space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--text-muted)]">Финальный CTA</p>
            <h2 className="font-[var(--font-display)] text-[2.5rem] leading-[0.92] tracking-[0.05em] text-[var(--accent-soft)] sm:text-[3.4rem]">{ctaTitle}</h2>
            <p className="max-w-[36rem] text-base leading-8 text-[var(--text-soft)]">{ctaDescription}</p>
          </div>

          {onOpenLead ? (
            <button
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent-soft)] px-7 text-sm font-semibold text-[var(--page-bg)] transition-transform duration-200 hover:-translate-y-0.5"
              type="button"
              onClick={onOpenLead}
            >
              {ctaLabel}
            </button>
          ) : (
            <a
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent-soft)] px-7 text-sm font-semibold text-[var(--page-bg)] transition-transform duration-200 hover:-translate-y-0.5"
              href={primaryAction}
            >
              {ctaLabel}
            </a>
          )}
        </section>
      ) : null}

      <div className="mx-auto grid w-full max-w-[1220px] gap-12 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.2fr,0.9fr,0.8fr] lg:px-8">
        <div className="space-y-5">
          <Logo light />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">Projection aesthetics</p>
          <p className="max-w-[24rem] text-sm leading-7 text-[var(--text-soft)]">{footerContent.description}</p>
        </div>

        <div className="grid gap-4 text-sm text-[var(--text-soft)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">Контакты</p>
          {footerContent.contacts.map((line) => (
            <p key={line} className="leading-7">
              {line}
            </p>
          ))}
        </div>

        <div className="grid gap-3 text-sm text-[var(--text-muted)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">Навигация</p>
          {navigation.primary.map((item) => (
            <a
              key={item.label}
              className="transition-colors duration-200 hover:text-[var(--accent-soft)]"
              href={item.href.startsWith("/#") ? homeAnchor(item.href.slice(2)) : route(item.href)}
            >
              {item.label}
            </a>
          ))}
          <a className="transition-colors duration-200 hover:text-[var(--accent-soft)]" href={route("/privacy-policy/")}>
            {footerContent.legal}
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-3 border-t border-white/8 px-4 py-6 text-sm text-[var(--text-muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{footerContent.copyright}</p>
        <p>{footerContent.credit}</p>
      </div>
    </footer>
  );
}
