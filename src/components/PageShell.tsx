import type { PropsWithChildren } from "react";

import type { PageKey } from "../content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PageShellProps = PropsWithChildren<{
  page: Exclude<PageKey, "notFound">;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showFooterCta?: boolean;
}>;

export function PageShell({ children, ctaDescription, ctaHref, ctaLabel, ctaTitle, page, showFooterCta = false }: PageShellProps) {
  return (
    <div className="site-page">
      <div className="page-noise" aria-hidden="true" />
      <Header page={page} />
      <main className="site-main">{children}</main>
      <Footer ctaDescription={ctaDescription} ctaHref={ctaHref} ctaLabel={ctaLabel} ctaTitle={ctaTitle} showCta={showFooterCta} />
    </div>
  );
}
