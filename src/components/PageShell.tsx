import { createContext, type PropsWithChildren, useContext, useMemo, useState } from "react";

import type { PageKey } from "../content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LeadModal } from "./LeadModal";

type PageShellProps = PropsWithChildren<{
  page: Exclude<PageKey, "notFound">;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  showFooterCta?: boolean;
}>;

const LeadModalContext = createContext<(() => void) | null>(null);

export function useLeadModal() {
  const value = useContext(LeadModalContext);

  if (!value) {
    throw new Error("useLeadModal must be used inside PageShell");
  }

  return value;
}

export function PageShell({ children, ctaDescription, ctaLabel, ctaTitle, page, showFooterCta = false }: PageShellProps) {
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = useMemo(() => () => setLeadOpen(true), []);

  return (
    <LeadModalContext.Provider value={openLead}>
      <div className="relative min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
        <div className="page-noise" aria-hidden="true" />
        <div className="page-glow page-glow--left" aria-hidden="true" />
        <div className="page-glow page-glow--right" aria-hidden="true" />

        <Header onOpenLead={openLead} page={page} />

        <main>{children}</main>

        <Footer
          ctaDescription={ctaDescription}
          ctaLabel={ctaLabel}
          ctaTitle={ctaTitle}
          onOpenLead={showFooterCta ? openLead : undefined}
          showCta={showFooterCta}
        />

        <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      </div>
    </LeadModalContext.Provider>
  );
}
