import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LeadModal } from "../components/LeadModal";
import { scrollToHashTarget } from "../lib/scroll";

const LeadModalContext = createContext({ openLeadModal: () => {}, closeLeadModal: () => {} });

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function AppLayout() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    if (location.hash === "#pokupka") {
      setIsLeadModalOpen(true);
      return;
    }

    window.setTimeout(() => {
      scrollToHashTarget(location.hash);
    }, 60);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isLeadModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLeadModalOpen]);

  const modalApi = useMemo(
    () => ({
      openLeadModal: () => setIsLeadModalOpen(true),
      closeLeadModal: () => setIsLeadModalOpen(false),
    }),
    [],
  );

  return (
    <LeadModalContext.Provider value={modalApi}>
      <div className="site-shell">
        <div className="site-background">
          <div className="site-background__orb site-background__orb--left" />
          <div className="site-background__orb site-background__orb--right" />
          <div className="site-background__grid" />
        </div>

        <a className="skip-link" href="#content">
          Перейти к содержимому
        </a>

        <Header />

        <main id="content" className="relative z-10">
          <Outlet />
        </main>

        <Footer />

        <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
      </div>
    </LeadModalContext.Provider>
  );
}
