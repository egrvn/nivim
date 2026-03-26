import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { navigation, secondaryNavigation, siteMeta, type NavItem } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Button } from "./Button";

type HeaderProps = {
  currentPage: "home" | "about" | "support" | "blog" | "privacy" | "notFound";
  onLeadOpen: () => void;
};

function resolveHref(item: NavItem) {
  if (item.href === "/#product") {
    return homeAnchor("product");
  }

  if (item.href === "/#contacts") {
    return homeAnchor("contacts");
  }

  return route(item.href);
}

export function Header({ currentPage, onLeadOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [...navigation, ...secondaryNavigation];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "rgba(10,11,16,0.82)" : "rgba(10,11,16,0.54)",
          borderColor: isScrolled ? "rgba(227,239,239,0.16)" : "rgba(227,239,239,0.08)",
          y: 0,
        }}
        className="mx-auto flex h-[72px] w-full max-w-[1248px] items-center justify-between gap-4 rounded-[28px] border px-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:px-6"
      >
        <a className="flex min-w-0 items-center gap-3" href={route("/")}>
          <span className="brand-mark">NIVIM</span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:block">
            {siteMeta.modelName}
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = item.active === currentPage;
            return (
              <a
                key={item.label}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
                href={resolveHref(item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {secondaryNavigation.map((item) => (
            <a key={item.label} className={`nav-link ${item.active === currentPage ? "nav-link--active" : ""}`} href={resolveHref(item)}>
              {item.label}
            </a>
          ))}
          <Button onClick={onLeadOpen}>Увидеть вживую</Button>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label="Открыть меню"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <span className="sr-only">Меню</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(10,11,16,0.86)] backdrop-blur-xl lg:hidden"
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              initial={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-4 mt-4 rounded-[28px] border border-white/10 bg-[rgba(10,11,16,0.95)] p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="brand-mark">NIVIM</span>
                <button
                  aria-label="Закрыть меню"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  ×
                </button>
              </div>

              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-base font-semibold text-white/88"
                    href={resolveHref(item)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 grid gap-3">
                <Button className="w-full" onClick={onLeadOpen}>
                  Увидеть вживую
                </Button>
                <a className="text-sm text-white/64" href={`mailto:${siteMeta.email}`}>
                  {siteMeta.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
