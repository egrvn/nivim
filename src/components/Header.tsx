import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useCart } from "../commerce/cart";
import type { PageKey } from "../content/site";
import { navigation } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Logo } from "./Logo";

type HeaderProps = {
  page: Exclude<PageKey, "notFound">;
};

function normalizeHref(href: string) {
  if (href.startsWith("/#")) {
    return homeAnchor(href.slice(2));
  }

  return route(href);
}

export function Header({ page }: HeaderProps) {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<"product" | "contacts">("product");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [page]);

  useEffect(() => {
    if (page !== "home") {
      return;
    }

    const onScroll = () => {
      const footer = document.getElementById("contacts");

      if (!footer) {
        setActiveAnchor("product");
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight || 0;
      setActiveAnchor(footerTop < viewportHeight * 0.55 ? "contacts" : "product");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  return (
    <>
      <header className="site-header">
        <div className={`site-header__shell ${scrolled ? "site-header__shell--scrolled" : ""}`}>
          <Logo />

          <nav className="site-header__nav" aria-label="Основная навигация">
            {navigation.primary.map((item) => {
              const href = normalizeHref(item.href);
              const active =
                (page === "home" && item.href === `/#${activeAnchor}`) ||
                (page === "about" && item.href === "/o-kompanii/") ||
                (page === "instructions" && item.href === "/instrukcii/") ||
                (page === "blog" && item.href === "/blog/");

              return (
                <a key={item.label} className={`site-header__link ${active ? "site-header__link--active" : ""}`} href={href}>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <a className="site-header__cart" href={route("/cart/")} aria-label={`Корзина, товаров: ${itemCount}`}>
              <span>Корзина</span>
              <span className="site-header__cart-count">{itemCount}</span>
            </a>

            <button
              className="site-header__toggle"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Открыть меню"
            >
              <span className={`site-header__toggle-line ${open ? "site-header__toggle-line--top" : ""}`} />
              <span className={`site-header__toggle-line ${open ? "site-header__toggle-line--middle" : ""}`} />
              <span className={`site-header__toggle-line ${open ? "site-header__toggle-line--bottom" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="site-mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="site-mobile-nav__panel"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <nav className="site-mobile-nav__links" aria-label="Мобильная навигация">
                {navigation.primary.map((item) => (
                  <a key={item.label} className="site-mobile-nav__link" href={normalizeHref(item.href)} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <a className="site-mobile-nav__link" href={route("/cart/")} onClick={() => setOpen(false)}>
                  Корзина ({itemCount})
                </a>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
