import type { PropsWithChildren } from "react";
import { useState } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LeadModal } from "./LeadModal";

type PageShellProps = PropsWithChildren<{
  pageKey: "home" | "about" | "support" | "blog" | "privacy" | "notFound";
}>;

export function PageShell({ children, pageKey }: PageShellProps) {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="site-background-glow" aria-hidden="true" />
      <Header currentPage={pageKey} onLeadOpen={() => setLeadOpen(true)} />
      {children}
      <Footer onLeadOpen={() => setLeadOpen(true)} />
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}
