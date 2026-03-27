import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { PageKey } from "../content/site";
import { navigation } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Logo } from "./Logo";

type HeaderProps = {
  page: Exclude<PageKey, "notFound">;
  onOpenLead: () => void;
};

function normalizeHref(href: string) {
  if (href.startsWith("/#")) {
    return homeAnchor(href.slice(2));
  }

  return route(href);
}

export function Header({ onOpenLead, page }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [page]);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 px-4 pb-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto mx-auto flex max-w-[1220px] items-center justify-between gap-4 rounded-full px-4 py-3.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "nav-shell"
              : "border-[rgba(227,239,239,0.08)] bg-[rgba(227,239,239,0.04)] backdrop-blur-lg"
          }`}
        >
          <Logo light />

          <nav className="hidden items-center gap-7 md:flex">
            {navigation.primary.map((item) => {
              const activeRoute =
                (page === "home" && item.href === "/#product") ||
                (page === "about" && item.href === "/o-kompanii/") ||
                (page === "instructions" && item.href === "/instrukcii/") ||
                (page === "blog" && item.href === "/blog/");

              return (
                <a
                  key={item.label}
                  className={`text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${activeRoute ? "text-[var(--accent-soft)]" : "text-[var(--text-soft)] hover:text-[var(--accent-soft)]"}`}
                  href={normalizeHref(item.href)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="hidden rounded-full bg-[var(--accent-soft)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--page-bg)] transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex"
              type="button"
              onClick={onOpenLead}
            >
              Заказать
            </button>
            <button
              className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(227,239,239,0.08)] bg-[rgba(227,239,239,0.05)] text-[var(--accent-soft)] md:hidden"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Открыть меню"
            >
              <span className="flex flex-col gap-1.5">
                <span className={`h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-px w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(10,11,16,0.8)] backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-4 top-24 rounded-[30px] border border-[rgba(227,239,239,0.12)] bg-[rgba(10,11,16,0.96)] p-6 shadow-[0_32px_96px_rgba(4,6,20,0.48)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24 }}
            >
              <nav className="flex flex-col gap-2">
                {navigation.primary.map((item) => (
                  <a
                    key={item.label}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-soft)] transition-colors duration-200 hover:bg-white/8 hover:text-[var(--accent-soft)]"
                    href={normalizeHref(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <button
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent-soft)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--page-bg)]"
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenLead();
                }}
              >
                Заказать
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
