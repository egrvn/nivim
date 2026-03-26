import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "../commerce/cart";
import { navigation, secondaryNavigation, siteMeta, type NavItem } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Button } from "./Button";

type HeaderProps = {
  currentPage: "home" | "about" | "support" | "blog" | "privacy" | "cart" | "notFound";
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

function CartIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M3.75 5.25h1.27c.51 0 .96.35 1.08.85l.21.9m0 0 1.37 5.85c.12.5.57.85 1.08.85h7.89c.5 0 .94-.34 1.07-.82l1.09-4.18a1.11 1.11 0 0 0-1.07-1.39H6.31m1 10.44a1.31 1.31 0 1 1-2.63 0 1.31 1.31 0 0 1 2.63 0Zm10.5 0a1.31 1.31 0 1 1-2.63 0 1.31 1.31 0 0 1 2.63 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Header({ currentPage, onLeadOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

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
          backgroundColor: isScrolled ? "rgba(9,11,17,0.92)" : "rgba(9,11,17,0.76)",
          borderColor: isScrolled ? "rgba(229,231,235,0.18)" : "rgba(229,231,235,0.08)",
          boxShadow: isScrolled ? "0 18px 60px rgba(0,0,0,0.35)" : "0 12px 48px rgba(0,0,0,0.18)",
        }}
        className="mx-auto flex h-[72px] w-full max-w-[1248px] items-center justify-between gap-3 rounded-[26px] border px-4 backdrop-blur-xl sm:px-6"
      >
        <a className="flex min-w-0 items-center gap-3" href={route("/")}>
          <span className="brand-mark">NIVIM</span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-white/46 lg:block">
            {siteMeta.modelName}
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 xl:flex">
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

        <div className="hidden items-center gap-2 lg:flex">
          {secondaryNavigation.map((item) => (
            <a key={item.label} className={`nav-link ${item.active === currentPage ? "nav-link--active" : ""}`} href={resolveHref(item)}>
              {item.label}
            </a>
          ))}

          <a
            aria-label={itemCount > 0 ? `Корзина, товаров: ${itemCount}` : "Корзина"}
            className={`cart-link ${currentPage === "cart" ? "cart-link--active" : ""}`}
            href={route("/cart/")}
          >
            <CartIcon />
            <span className="hidden xl:inline">Корзина</span>
            <span className="cart-badge">{itemCount}</span>
          </a>

          <Button onClick={onLeadOpen}>Увидеть вживую</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            aria-label={itemCount > 0 ? `Корзина, товаров: ${itemCount}` : "Корзина"}
            className={`cart-link ${currentPage === "cart" ? "cart-link--active" : ""}`}
            href={route("/cart/")}
          >
            <CartIcon />
            <span className="cart-badge">{itemCount}</span>
          </a>
          <button
            aria-expanded={menuOpen}
            aria-label="Открыть меню"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(7,8,13,0.9)] backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              initial={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mx-4 mt-4 rounded-[28px] border border-white/10 bg-[rgba(9,11,17,0.96)] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.42)]"
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
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-base font-semibold text-white/88"
                    href={resolveHref(item)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 grid gap-2">
                <a
                  className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-base font-semibold text-white/88"
                  href={route("/cart/")}
                  onClick={() => setMenuOpen(false)}
                >
                  Корзина {itemCount > 0 ? `(${itemCount})` : ""}
                </a>
              </div>

              <div className="mt-8 grid gap-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    onLeadOpen();
                  }}
                >
                  Увидеть вживую
                </Button>
                <a className="text-sm text-white/62" href={`mailto:${siteMeta.email}`}>
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
